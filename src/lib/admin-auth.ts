import crypto from 'crypto';

export const ADMIN_USER = process.env.ADMIN_USER || 'kyhnayas';
export const ADMIN_PASS = process.env.ADMIN_PASS || '1453Kayhan.';
const JWT_SECRET = process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET || 'piyasa-super-secure-admin-secret-2026';

export function createAdminToken(): string {
  const payload = JSON.stringify({ user: ADMIN_USER, timestamp: Date.now() });
  const hmac = crypto.createHmac('sha256', JWT_SECRET).update(payload).digest('hex');
  return Buffer.from(payload).toString('base64') + '.' + hmac;
}

export function verifyAdminToken(token: string): boolean {
  try {
    const [b64, hmac] = token.split('.');
    if (!b64 || !hmac) return false;
    const payload = Buffer.from(b64, 'base64').toString('utf8');
    const expectedHmac = crypto.createHmac('sha256', JWT_SECRET).update(payload).digest('hex');
    if (hmac !== expectedHmac) return false;
    const data = JSON.parse(payload);
    // Token valid for 7 days
    return data.user === ADMIN_USER && Date.now() - data.timestamp < 7 * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}
