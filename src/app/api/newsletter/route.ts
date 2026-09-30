import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { z } from 'zod';
import { queryCloudD1 } from '@/lib/cloud-d1';

const newsletterSchema = z.object({
  email: z.string().email('Lütfen geçerli bir e-posta adresi giriniz.').max(150),
  source: z.string().max(50).optional().default('homepage_footer'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const parseResult = newsletterSchema.safeParse(body);

    if (!parseResult.success) {
      const errMsg = parseResult.error.errors[0]?.message || 'Geçersiz e-posta adresi.';
      return NextResponse.json({ success: false, error: errMsg }, { status: 400 });
    }

    const email = parseResult.data.email.trim().toLowerCase();
    const source = parseResult.data.source || 'homepage_footer';

    // Client IP hashing for KVKK compliant rate protection
    const clientIp =
      req.headers.get('cf-connecting-ip') ||
      req.headers.get('x-real-ip') ||
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      '127.0.0.1';

    const salt = 'piyasa-newsletter-salt-2026';
    const ipHash = crypto.createHash('sha256').update(clientIp + ':' + salt).digest('hex');

    // Insert or update subscriber in Cloudflare D1
    await queryCloudD1(
      `INSERT INTO newsletter_subscribers (email, source, status, ip_hash, created_at, updated_at)
       VALUES (?, ?, 'active', ?, datetime('now'), datetime('now'))
       ON CONFLICT(email) DO UPDATE SET
         status = 'active',
         updated_at = datetime('now')`,
      [email, source, ipHash]
    );

    return NextResponse.json({
      success: true,
      message: 'Tebrikler! Bülten aboneliğiniz başarıyla oluşturuldu. İlk piyasa raporu salı günü gelen kutunuzda olacak.',
    });
  } catch (error: any) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { success: false, error: 'Abonelik işlemi sırasında bir hata oluştu: ' + error.message },
      { status: 500 }
    );
  }
}
