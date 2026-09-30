import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { z } from 'zod';

const demandSchema = z.object({
  majorSlug: z.string().min(2).max(100).regex(/^[a-z0-9-]+$/, 'Geçersiz bölüm slug biçimi'),
  majorName: z.string().min(2).max(150),
  facultyName: z.string().min(2).max(150),
  email: z.string().email('Geçerli bir e-posta adresi giriniz').max(100).optional().or(z.literal('')),
});

import { queryCloudD1 } from '@/lib/cloud-d1';

export async function GET() {
  try {
    const rows = await queryCloudD1<{ major_slug: string; vote_count: number }>(
      'SELECT major_slug, vote_count FROM major_demand_counts'
    );
    const counts: Record<string, number> = {};
    for (const r of rows) {
      counts[r.major_slug] = r.vote_count;
    }

    return NextResponse.json({ success: true, counts });
  } catch (error: any) {
    console.error('Error fetching major demand counts:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parseResult = demandSchema.safeParse(json);

    if (!parseResult.success) {
      const firstError = parseResult.error.errors[0]?.message || 'Geçersiz parametreler.';
      return NextResponse.json({ success: false, error: firstError }, { status: 400 });
    }

    const { majorSlug, majorName, facultyName, email } = parseResult.data;

    // Secure IP retrieval (prioritize Cloudflare proxy connecting IP to stop spoofing)
    const clientIp =
      req.headers.get('cf-connecting-ip') ||
      req.headers.get('x-real-ip') ||
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      '127.0.0.1';

    const salt = 'piyasa-major-demand-salt-2026';
    const ipHash = crypto.createHash('sha256').update(clientIp + ':' + salt + ':' + majorSlug).digest('hex');

    // 7-day IP Cooldown check to prevent vote manipulation and database flooding
    const recentRequests = await queryCloudD1<{ created_at: string }>(
      "SELECT created_at FROM major_demand_requests WHERE ip_hash = ? AND major_slug = ? AND datetime(created_at) > datetime('now', '-7 days') LIMIT 1",
      [ipHash, majorSlug]
    );

    if (recentRequests.length > 0) {
      const currentCounts = await queryCloudD1<{ vote_count: number }>(
        'SELECT vote_count FROM major_demand_counts WHERE major_slug = ?',
        [majorSlug]
      );
      const votes = currentCounts[0]?.vote_count || 1;
      return NextResponse.json(
        {
          success: false,
          updatedVotes: votes,
          error: `Bu ağ üzerinden '${majorName}' için son 7 gün içinde talep iletilmiştir. Veri tarafsızlığını korumak amacıyla haftada tek talebe izin verilmektedir.`,
        },
        { status: 429 }
      );
    }

    // Increment vote count in major_demand_counts
    await queryCloudD1(
      `INSERT INTO major_demand_counts (major_slug, major_name, faculty_name, vote_count, updated_at)
       VALUES (?, ?, ?, 1, datetime('now'))
       ON CONFLICT(major_slug) DO UPDATE SET
         vote_count = vote_count + 1,
         updated_at = datetime('now')`,
      [majorSlug, majorName, facultyName]
    );

    // Save lead request
    await queryCloudD1(
      `INSERT INTO major_demand_requests (faculty_name, major_name, major_slug, email, ip_hash, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, 'pending', datetime('now'), datetime('now'))`,
      [facultyName, majorName, majorSlug, email ? email.trim() : null, ipHash]
    );

    const updatedCounts = await queryCloudD1<{ vote_count: number }>(
      'SELECT vote_count FROM major_demand_counts WHERE major_slug = ?',
      [majorSlug]
    );
    const votes = updatedCounts[0]?.vote_count || 1;

    return NextResponse.json({
      success: true,
      updatedVotes: votes,
      message: email
        ? `Talebiniz alındı! ${majorName} için mezun kariyer ve maaş raporu yayınlandığında ${email} adresine bildirim iletilecektir.`
        : `Talebiniz kaydedildi! ${majorName} inceleme sırasına alındı (${votes} kişi talep etti).`
    });
  } catch (error: any) {
    console.error('Error processing major demand vote:', error);
    return NextResponse.json({ success: false, error: 'İşlem sırasında bir hata oluştu.' }, { status: 500 });
  }
}
