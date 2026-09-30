import nodemailer from 'nodemailer';

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: SendEmailParams) {
  const user = process.env.SMTP_USER || 'kyhnayas@gmail.com';
  const pass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT) || 465;
  const fromName = process.env.SMTP_FROM_NAME || 'Piyasa.work';
  const fromEmail = process.env.SMTP_FROM_EMAIL || 'info@piyasa.work';

  if (!pass) {
    console.warn(`[Mailer Simulation] SMTP_PASS / GMAIL_APP_PASSWORD tanımlanmamış. Alıcı: ${to}, Konu: ${subject}`);
    return {
      success: true,
      simulated: true,
      message: 'SMTP şifresi henüz tanımlanmadığı için e-posta simüle edildi ve loglandı.',
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to,
      subject,
      text: text || html.replace(/<[^>]+>/g, ''),
      html,
    });

    return {
      success: true,
      simulated: false,
      messageId: info.messageId,
    };
  } catch (error: any) {
    console.error('[Mailer Error] E-posta gönderilemedi:', error.message);
    return {
      success: false,
      simulated: false,
      error: error.message,
    };
  }
}

export function generateMajorPublishedEmailHtml({
  majorName,
  majorSlug,
  typicalJobs = [],
}: {
  majorName: string;
  majorSlug: string;
  typicalJobs?: string[];
}): string {
  const jobsListHtml = typicalJobs.length > 0
    ? typicalJobs
        .slice(0, 4)
        .map(
          (j) =>
            `<li style="padding: 6px 0; color: #334155; font-size: 14px;">🎯 <strong>${j}</strong></li>`
        )
        .join('')
    : '<li style="padding: 6px 0; color: #334155; font-size: 14px;">🎯 Sektörel Uzmanlık ve Yönetici Pozisyonları</li>';

  return `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <title>${majorName} 2026 Kariyer ve Maaş Raporu Yayında</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #042f2e 0%, #0d9488 100%); padding: 32px 28px; text-align: left;">
      <div style="display: inline-block; background-color: rgba(255, 255, 255, 0.15); border: 1px solid rgba(255, 255, 255, 0.2); padding: 4px 12px; border-radius: 20px; color: #ffffff; font-size: 11px; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 12px;">
        PİYASA.WORK TALEP BİLDİRİMİ
      </div>
      <h1 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 0 0 8px 0; line-height: 1.3;">
        Müjde! ${majorName} İçin 2026 Maaş & Kariyer Raporu Hazırlandı
      </h1>
      <p style="color: #ccfbf1; font-size: 14px; margin: 0;">
        Daha önce Piyasa.work üzerinden bildirim talebinde bulunduğunuz bölüm için piyasa analizleri tamamlandı.
      </p>
    </div>

    <!-- Content -->
    <div style="padding: 28px;">
      <p style="font-size: 15px; line-height: 1.6; color: #334155; margin-top: 0;">
        Merhaba,
      </p>
      <p style="font-size: 14px; line-height: 1.6; color: #334155;">
        <strong>${majorName}</strong> mezunlarının 2026 yılı Türkiye iş piyasasındaki güncel net maaş aralıkları, pozisyon dağılımı, deneyim basamakları ve en çok tercih edilen çalışma alanları bağımsız verilerle incelenerek yayına alınmıştır.
      </p>

      <div style="background-color: #f0fdfa; border: 1px solid #99f6e4; border-radius: 12px; padding: 18px; margin: 20px 0;">
        <div style="font-size: 12px; font-weight: 700; color: #0f766e; text-transform: uppercase; margin-bottom: 8px;">
          Öne Çıkan Mezun Kariyer Alanları
        </div>
        <ul style="margin: 0; padding-left: 18px; list-style-type: none;">
          ${jobsListHtml}
        </ul>
      </div>

      <!-- CTA Button -->
      <div style="text-align: center; margin: 28px 0;">
        <a href="https://piyasa.work/hangi-bolum-ne-is-yapar" target="_blank" style="display: inline-block; background-color: #0f766e; color: #ffffff; font-size: 15px; font-weight: 700; text-decoration: none; padding: 14px 28px; border-radius: 10px; box-shadow: 0 2px 4px rgba(15, 118, 110, 0.3);">
          Bölüm Maaş ve Kariyer Rehberini İncele →
        </a>
      </div>

      <p style="font-size: 12px; line-height: 1.5; color: #64748b; margin-bottom: 0;">
        💡 <strong>Not:</strong> Piyasa.work bağımsız bir veri araştırma girişimidir. Şeffaf ücret ve kariyer rehberimizi arkadaşlarınızla paylaşarak iş gücü şeffaflığına destek olabilirsiniz.
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 18px 28px; text-align: center;">
      <p style="font-size: 11px; color: #94a3b8; margin: 0 0 6px 0;">
        Bu e-posta, <strong>piyasa.work/hangi-bolum-ne-is-yapar</strong> sayfasında e-posta adresinizi bıraktığınız için otomatik olarak iletilmiştir.
      </p>
      <p style="font-size: 11px; color: #94a3b8; margin: 0;">
        © 2026 Piyasa.work • Türkiye İş Piyasası Veri Platformu • <a href="https://piyasa.work" style="color: #0f766e; text-decoration: none;">piyasa.work</a>
      </p>
    </div>
  </div>
</body>
</html>
  `;
}
