import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { filterOutliersIQR, calculatePercentiles } from '@/lib/salary-engine';
import { z } from 'zod';

const SALT = 'PIYASA_KVKK_COMPLIANT_HASH_SALT_2026';
const COOLDOWN_DAYS = 7;
const COOLDOWN_SECONDS = COOLDOWN_DAYS * 24 * 60 * 60;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const submitSchema = z.object({
      professionSlug: z.string().min(2).max(100).regex(/^[a-z0-9-]+$/),
      salaryAmount: z.number().min(15000, 'Minimum geçerli net maaş 15.000 TL olmalıdır.').max(2000000, 'Tutar sınırların dışındadır.'),
      grossOrNet: z.enum(['GROSS', 'NET']).default('NET'),
      city: z.string().max(100).default('İstanbul'),
      sector: z.string().max(100).default('Genel'),
      experienceYears: z.number().min(0).max(50).default(3),
      employmentType: z.string().max(50).default('FULL_TIME'),
      companySize: z.string().max(50).default('51-250'),
      bonusIncluded: z.boolean().default(false),
      optionalComment: z.string().max(500).default(''),
    });

    const parsed = submitSchema.safeParse({
      ...body,
      salaryAmount: Number(body.salaryAmount),
      experienceYears: Number(body.experienceYears || 0),
    });

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.errors[0]?.message || 'Geçersiz parametreler.' },
        { status: 400 }
      );
    }

    const {
      professionSlug,
      salaryAmount,
      grossOrNet,
      city,
      sector,
      experienceYears,
      employmentType,
      companySize,
      bonusIncluded,
      optionalComment,
    } = parsed.data;

    const rawAmount = salaryAmount;

    // 1. Client-Side Cookie Check (Cihaz Bazlı Kilit)
    const cookieHeader = req.headers.get('cookie') || '';
    const cookieMatch = cookieHeader.match(/piyasa_sub_lock=([^;]+)/);
    if (cookieMatch) {
      const parts = cookieMatch[1].split(':');
      const lockedSlug = parts[0];
      const lockedTime = Number(parts[1]) || 0;
      const daysPassed = (Date.now() - lockedTime) / (1000 * 60 * 60 * 24);

      if (lockedSlug === professionSlug && daysPassed < COOLDOWN_DAYS) {
        const remainingDays = Math.ceil(COOLDOWN_DAYS - daysPassed);
        return NextResponse.json(
          {
            success: false,
            error: `Veri manipülasyonunu önlemek amacıyla bu meslek için son ${COOLDOWN_DAYS} gün içinde zaten bildirim yaptınız. Yeni bildirim için kalan süre: ${remainingDays} gün.`,
          },
          { status: 429 }
        );
      }
    }

    // 2. Client IP & KVKK Salted Hash Check (Ağ / IP Bazlı Kilit)
    const clientIp =
      req.headers.get('cf-connecting-ip') ||
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      '127.0.0.1';

    // IP adresini açık kaydetmiyoruz (KVKK/GDPR uyumlu tek yönlü hash)
    const ipHash = crypto
      .createHash('sha256')
      .update(clientIp + ':' + SALT + ':' + professionSlug)
      .digest('hex');

    // Convert GROSS to NET approximation (~0.72) if user submitted GROSS
    const netAmount = grossOrNet === 'GROSS' ? Math.round(rawAmount * 0.72) : rawAmount;

    // Minimum sensible wage check (below 15,000 TL in 2026 is considered invalid)
    if (netAmount < 15000 || netAmount > 2000000) {
      return NextResponse.json(
        { success: false, error: 'Girdiğiniz tutar mantıklı piyasa sınırları dışındadır (15.000 TL - 2.000.000 TL).' },
        { status: 400 }
      );
    }

    const d1Dir = path.join(process.cwd(), 'editorial', '.wrangler', 'state', 'v3', 'd1', 'miniflare-D1DatabaseObject');
    if (!fs.existsSync(d1Dir)) {
      return NextResponse.json({ success: false, error: 'Veritabanı bağlantısı bulunamadı.' }, { status: 500 });
    }

    const sqliteFiles = fs.readdirSync(d1Dir).filter(f => f.endsWith('.sqlite') && !f.startsWith('metadata'));
    if (sqliteFiles.length === 0) {
      return NextResponse.json({ success: false, error: 'D1 SQLite dosyası bulunamadı.' }, { status: 500 });
    }

    const { DatabaseSync } = await import('node:sqlite');
    const dbPath = path.join(d1Dir, sqliteFiles[0]);
    const db = new DatabaseSync(dbPath);

    // Verify profession exists in database
    const existingProf = db.prepare(`SELECT slug FROM ec_professions WHERE slug = ?`).get(professionSlug);
    if (!existingProf) {
      return NextResponse.json(
        { success: false, error: 'Belirtilen meslek platform veri tabanında bulunamadı.' },
        { status: 400 }
      );
    }

    // 3. Veritabanı IP Hash 7 Gün Kontrolü
    const recentSub = db.prepare(`
      SELECT created_at FROM salary_submissions
      WHERE ip_hash = ? AND profession_slug = ? AND datetime(created_at) > datetime('now', '-7 days')
      ORDER BY created_at DESC LIMIT 1
    `).get(ipHash, professionSlug) as any;

    if (recentSub) {
      return NextResponse.json(
        {
          success: false,
          error: `Bu ağ üzerinden '${professionSlug}' mesleği için son ${COOLDOWN_DAYS} gün içinde bildirim yapılmıştır. Piyasa veri tarafsızlığını korumak amacıyla haftada yalnızca bir bildirime izin verilmektedir.`,
        },
        { status: 429 }
      );
    }

    const submissionId = 'SUB_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);

    // 4. Insert into salary_submissions with ip_hash
    db.prepare(`
      INSERT INTO salary_submissions (
        id, profession_slug, salary_amount, gross_or_net, city, sector,
        experience_years, employment_type, company_size, bonus_included, status, ip_hash, created_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, 'APPROVED', ?, datetime('now')
      )
    `).run(
      submissionId,
      professionSlug,
      netAmount,
      grossOrNet,
      city,
      sector,
      Number(experienceYears) || 0,
      employmentType,
      companySize,
      bonusIncluded ? 1 : 0,
      ipHash
    );

    // 5. Fetch all approved submissions for this profession
    const allRows = db.prepare(`
      SELECT salary_amount FROM salary_submissions
      WHERE profession_slug = ? AND status = 'APPROVED'
    `).all(professionSlug) as any[];

    const amounts = allRows.map(r => Number(r.salary_amount));
    
    // 6. Apply Tukey IQR algorithm
    const cleanAmounts = filterOutliersIQR(amounts);
    const stats = calculatePercentiles(cleanAmounts);

    // 7. Update ec_professions with new sample count and recalculated percentiles
    db.prepare(`
      UPDATE ec_professions
      SET sample_count = sample_count + 1,
          min_salary = ?,
          median_salary = ?,
          max_salary = ?,
          updated_at = datetime('now')
      WHERE slug = ?
    `).run(
      Math.round(stats.p25),
      Math.round(stats.median),
      Math.round(stats.p75),
      professionSlug
    );

    const updatedProf = db.prepare(`
      SELECT title, sample_count, min_salary, median_salary, max_salary
      FROM ec_professions
      WHERE slug = ?
    `).get(professionSlug) as any;

    // 8. Set 7-day Cookie Lock
    const response = NextResponse.json({
      success: true,
      message: 'Maaş bildiriminiz kaydedildi, Tukey IQR filtresinden geçirilerek meslek havuzu güncellendi.',
      data: {
        professionSlug,
        professionTitle: updatedProf?.title || professionSlug,
        sampleCount: updatedProf?.sample_count || cleanAmounts.length,
        minSalary: updatedProf?.min_salary || Math.round(stats.p25),
        medianSalary: updatedProf?.median_salary || Math.round(stats.median),
        maxSalary: updatedProf?.max_salary || Math.round(stats.p75),
        submissionId
      }
    });

    response.headers.set(
      'Set-Cookie',
      `piyasa_sub_lock=${professionSlug}:${Date.now()}; Path=/; Max-Age=${COOLDOWN_SECONDS}; HttpOnly; SameSite=Lax`
    );

    return response;
  } catch (error: any) {
    console.error('Salary submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Maaş bildirimi işlenirken bir hata oluştu: ' + error.message },
      { status: 500 }
    );
  }
}
