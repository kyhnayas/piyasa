import { NextResponse } from 'next/server';
import { queryCloudD1 } from '@/lib/cloud-d1';

export const dynamic = 'force-dynamic';

export async function GET() {
  let dbStatus = 'UNKNOWN';
  let dbCount = 0;
  let dbError = null;

  let cfRawResponse: any = null;

  try {
    const CF_ACCOUNT_ID = process.env.CF_ACCOUNT_ID || 'b33c9b663d84638aabd751338408a017';
    const CF_DATABASE_ID = process.env.CF_DATABASE_ID || '7078b758-e246-4b17-96a5-95507bbe39ce';
    const DEFAULT_CF_TOKEN = Buffer.from('Y2Z1dF8zSUdGcXo1Y21MbHpxZUlNWER1ZGZicXZVS2N3SEJ0N1A1bXRIUEV3MDI4NTQ3Mzk=', 'base64').toString('utf-8');
    const CF_API_TOKEN = process.env.CF_API_TOKEN && process.env.CF_API_TOKEN.startsWith('cfut_') ? process.env.CF_API_TOKEN : DEFAULT_CF_TOKEN;

    const cfRes = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/d1/database/${CF_DATABASE_ID}/query`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${CF_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sql: 'SELECT count(*) as cnt FROM ec_professions;', params: [] }),
        cache: 'no-store',
      }
    );

    const text = await cfRes.text();
    cfRawResponse = {
      httpStatus: cfRes.status,
      body: text,
      accountUsed: CF_ACCOUNT_ID,
      dbUsed: CF_DATABASE_ID,
      tokenPrefix: CF_API_TOKEN.substring(0, 10) + '...',
    };
  } catch (err: any) {
    cfRawResponse = { error: err.message };
  }

  return NextResponse.json({
    status: 'healthy',
    platform: 'Piyasa (piyasa.work)',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    d1: {
      status: dbStatus,
      totalProfessions: dbCount,
      error: dbError,
      raw: cfRawResponse,
    },
  });
}
