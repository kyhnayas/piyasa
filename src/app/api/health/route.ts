import { NextResponse } from 'next/server';
import { queryCloudD1 } from '@/lib/cloud-d1';

export const dynamic = 'force-dynamic';

export async function GET() {
  let dbStatus = 'UNKNOWN';
  let dbCount = 0;
  let dbError = null;

  try {
    const rows = await queryCloudD1('SELECT count(*) as cnt FROM ec_professions');
    if (rows && rows.length > 0) {
      dbStatus = 'CONNECTED';
      dbCount = (rows[0] as any).cnt;
    } else {
      dbStatus = 'EMPTY_OR_FAILED';
    }
  } catch (err: any) {
    dbStatus = 'ERROR';
    dbError = err.message;
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
    },
  });
}
