/**
 * Cloudflare D1 REST Client for Next.js (Cloud & Edge Compatible)
 * Direct access to piyasa-db on Cloudflare
 */

const CF_ACCOUNT_ID = process.env.CF_ACCOUNT_ID || process.env.CLOUDFLARE_ACCOUNT_ID || '';
const CF_DATABASE_ID = process.env.CF_DATABASE_ID || process.env.CLOUDFLARE_DATABASE_ID || '';
const CF_API_TOKEN = process.env.CF_API_TOKEN || process.env.CLOUDFLARE_API_TOKEN || '';

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
