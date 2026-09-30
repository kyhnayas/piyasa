import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/admin-auth';
import { queryCloudD1, executeCloudD1 } from '@/lib/cloud-d1';
import { z } from 'zod';

const professionSchema = z.object({
  title: z.string().min(2).max(100),
  slug: z.string().min(2).max(100).optional(),
  category: z.string().min(2).max(50),
  isco_code: z.string().max(20).default('0000'),
  description: z.string().max(1000).optional(),
  min_salary: z.number().min(10000).max(2000000),
  median_salary: z.number().min(15000).max(3000000),
  max_salary: z.number().min(20000).max(5000000),
  sample_count: z.number().min(1).default(150),
  grade: z.string().default('Grade B'),
  status: z.string().default('published'),
});

function slugify(text: string): string {
  const trMap: Record<string, string> = {
    'ç': 'c', 'Ç': 'c', 'ğ': 'g', 'Ğ': 'g', 'ı': 'i', 'İ': 'i',
    'ö': 'o', 'Ö': 'o', 'ş': 's', 'Ş': 's', 'ü': 'u', 'Ü': 'u',
  };
  return text
    .split('')
    .map(c => trMap[c] || c)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('piyasa_admin_token')?.value;

  if (!token || !verifyAdminToken(token)) {
    return NextResponse.json({ success: false, error: 'Yetkisiz erişim' }, { status: 401 });
  }

  const rows = await queryCloudD1(`
    SELECT id, slug, title, isco_code, category, description,
           min_salary, median_salary, max_salary, sample_count, grade, status, updated_at
    FROM ec_professions
    ORDER BY title ASC
  `);

  return NextResponse.json({ success: true, data: rows });
}

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('piyasa_admin_token')?.value;

  if (!token || !verifyAdminToken(token)) {
    return NextResponse.json({ success: false, error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = professionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.errors[0]?.message || 'Geçersiz parametreler' },
        { status: 400 }
      );
    }

    const {
      title,
      category,
      isco_code,
      description,
      min_salary,
      median_salary,
      max_salary,
      sample_count,
      grade,
      status,
    } = parsed.data;

    const slug = parsed.data.slug || slugify(title);
    const id = 'prof_' + slug.replace(/-/g, '_');
    const desc = description || `${title} 2026 yılı Türkiye piyasa maaş verileri ve kariyer rehberi.`;

    const success = await executeCloudD1(`
      INSERT INTO ec_professions (
        id, slug, title, isco_code, category, description,
        min_salary, median_salary, max_salary, sample_count, grade, status,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
      ON CONFLICT(slug) DO UPDATE SET
        title = excluded.title,
        category = excluded.category,
        isco_code = excluded.isco_code,
        description = excluded.description,
        min_salary = excluded.min_salary,
        median_salary = excluded.median_salary,
        max_salary = excluded.max_salary,
        sample_count = excluded.sample_count,
        grade = excluded.grade,
        status = excluded.status,
        updated_at = datetime('now');
    `, [id, slug, title, isco_code, category, desc, min_salary, median_salary, max_salary, sample_count, grade, status]);

    if (!success) {
      return NextResponse.json({ success: false, error: 'Cloudflare D1 veritabanına kayıt başarısız.' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `'${title}' başarıyla kaydedildi ve canlı yayına alındı.`,
      slug
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('piyasa_admin_token')?.value;

  if (!token || !verifyAdminToken(token)) {
    return NextResponse.json({ success: false, error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ success: false, error: 'Slug belirtilmedi' }, { status: 400 });
    }

    const success = await executeCloudD1('DELETE FROM ec_professions WHERE slug = ?', [slug]);

    if (!success) {
      return NextResponse.json({ success: false, error: 'Silme işlemi başarısız' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: `'${slug}' başarıyla silindi.` });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
