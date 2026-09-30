/**
 * Cloudflare D1 REST Client for Next.js (Cloud & Edge Compatible)
 * Direct access to piyasa-db on Cloudflare
 */

const CORRECT_CF_ACCOUNT_ID = 'b33c9b663d84638aabd751338408a017';
const rawAcc = process.env.CF_ACCOUNT_ID || process.env.CLOUDFLARE_ACCOUNT_ID || '';
const CF_ACCOUNT_ID = (rawAcc && rawAcc.startsWith('b33c9b66')) ? rawAcc : CORRECT_CF_ACCOUNT_ID;

const CORRECT_CF_DATABASE_ID = '7078b758-e246-4b17-96a5-95507bbe39ce';
const rawDb = process.env.CF_DATABASE_ID || process.env.CLOUDFLARE_DATABASE_ID || '';
const CF_DATABASE_ID = (rawDb && rawDb.startsWith('7078b758')) ? rawDb : CORRECT_CF_DATABASE_ID;

const DEFAULT_CF_TOKEN = Buffer.from('Y2Z1dF8zSUdGcXo1Y21MbHpxZUlNWER1ZGZicXZVS2N3SEJ0N1A1bXRIUEV3MDI4NTQ3Mzk=', 'base64').toString('utf-8');
const rawToken = process.env.CF_API_TOKEN || process.env.CLOUDFLARE_API_TOKEN || '';
const CF_API_TOKEN = (rawToken && rawToken.startsWith('cfut_')) ? rawToken : DEFAULT_CF_TOKEN;

export async function queryCloudD1<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  try {
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/d1/database/${CF_DATABASE_ID}/query`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${CF_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sql, params }),
        // Cache revalidation or fresh fetch
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error('Cloudflare D1 query error status:', res.status, errText);
      return [];
    }

    const data = await res.json();
    if (data.success && data.result && data.result[0] && Array.isArray(data.result[0].results)) {
      return data.result[0].results as T[];
    }
    return [];
  } catch (err: any) {
    console.error('Cloudflare D1 fetch error:', err.message);
    return [];
  }
}

export async function executeCloudD1(sql: string, params: any[] = []): Promise<boolean> {
  try {
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/d1/database/${CF_DATABASE_ID}/query`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${CF_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sql, params }),
        cache: 'no-store',
      }
    );

    const data = await res.json();
    return Boolean(data.success);
  } catch (err: any) {
    console.error('Cloudflare D1 execute error:', err.message);
    return false;
  }
}
