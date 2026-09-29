import path from 'path';
import fs from 'fs';

function getD1Db() {
  const d1Dir = path.join(process.cwd(), 'editorial', '.wrangler', 'state', 'v3', 'd1', 'miniflare-D1DatabaseObject');
  if (!fs.existsSync(d1Dir)) return null;
  const files = fs.readdirSync(d1Dir).filter(f => f.endsWith('.sqlite') && !f.startsWith('metadata'));
  if (files.length === 0) return null;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { DatabaseSync } = require('node:sqlite');
  return new DatabaseSync(path.join(d1Dir, files[0]));
}

export interface MajorLead {
  id: number;
  faculty_name: string;
  major_name: string;
  major_slug: string;
  email: string;
  created_at: string;
}

export function getPendingLeadsForMajor(majorSlug: string): MajorLead[] {
  try {
    const db = getD1Db();
    if (!db) return [];

    const rows = db.prepare(`
      SELECT id, faculty_name, major_name, major_slug, email, created_at
      FROM major_demand_requests
      WHERE major_slug = ? AND email IS NOT NULL AND email != '' AND status = 'pending'
    `).all(majorSlug) as any[];

    return rows || [];
  } catch (err) {
    console.error('getPendingLeadsForMajor error:', err);
    return [];
  }
}

export function markLeadsAsNotified(majorSlug: string): void {
  try {
    const db = getD1Db();
    if (!db) return;
    db.prepare(`
      UPDATE major_demand_requests
      SET status = 'published', updated_at = datetime('now')
      WHERE major_slug = ?
    `).run(majorSlug);
  } catch (err) {
    console.error('markLeadsAsNotified error:', err);
  }
}

export function generateMajorNotificationEmail(majorName: string, majorSlug: string, email: string) {
  const targetUrl = `https://piyasa.work/hangi-bolum-ne-is-yapar#${majorSlug}`;
  return {
    to: email,
    subject: `🎓 Müjde: ${majorName} Mezunları Ne İş Yapar Raporu Yayınlandı!`,
    text: `Merhaba,\n\nPiyasa.work üzerinde talep ettiğiniz ${majorName} için 2026 maaş analizleri, mezunların çalıştığı başlıca meslekler ve okulda öğretilmeyen yetkinlikler Piyasa Araştırma Ekibimiz tarafından incelenerek yayınlandı.\n\nRaporu ve güncel meslekleri incelemek için aşağıdaki bağlantıya tıklayabilirsiniz:\n${targetUrl}\n\nİyi bir kariyer dileriz,\nPiyasa.work Veri Ekibi`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
        <div style="border-bottom: 2px solid #0d9488; padding-bottom: 12px; margin-bottom: 20px;">
          <h2 style="color: #0f172a; margin: 0;">Piyasa<span style="color: #0d9488;">.WORK</span></h2>
          <p style="color: #64748b; font-size: 13px; margin: 4px 0 0 0;">2026 Üniversite & Kariyer Atlası</p>
        </div>
        <h3 style="color: #0f172a;">🎓 Merak ettiğiniz ${majorName} kariyer rehberi hazır!</h3>
        <p style="color: #334155; font-size: 14px; line-height: 1.6;">
          Daha önce platformumuzda talep ettiğiniz <strong>${majorName}</strong> bölümü mezunlarının iş piyasasındaki karşılıkları, 2026 başlangıç ve medyan maaşları, aranan kritik yetkinlikler ve önerilen sertifikalar listelendi.
        </p>
        <div style="margin: 28px 0; text-align: center;">
          <a href="${targetUrl}" style="background-color: #0f766e; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px; display: inline-block;">
            ${majorName} Raporunu Hemen İncele →
          </a>
        </div>
        <p style="color: #94a3b8; font-size: 12px; border-top: 1px solid #f1f5f9; padding-top: 16px; margin-top: 32px;">
          Bu e-posta, piyasa.work üzerinde talepte bulunduğunuz için iletilmiştir.
        </p>
      </div>
    `
  };
}
