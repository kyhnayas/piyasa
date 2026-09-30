import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyAdminToken } from '@/lib/admin-auth';
import { runSparkDailyAutomation } from '@/lib/spark-automation';

function isAuthorized(req: NextRequest, tokenCookie?: string): boolean {
  if (tokenCookie && verifyAdminToken(tokenCookie)) return true;

  // Allow Vercel native Cron triggers
  if (req.headers.get('x-vercel-cron') || req.headers.get('user-agent')?.includes('vercel-cron')) {
    return true;
  }

  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const bearer = authHeader.substring(7);
    if (
      bearer === 'piyasa_spark_cron_secret_2026' ||
      bearer === process.env.CRON_SECRET ||
      bearer === '1453Kayhan.'
    ) {
      return true;
    }
  }

  return false;
}

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('piyasa_admin_token')?.value || cookieStore.get('admin_token')?.value;

  if (!isAuthorized(req, token)) {
    return NextResponse.json({ success: false, error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    const forceMajorSlug = req.nextUrl.searchParams.get('majorSlug') || undefined;
    const result = await runSparkDailyAutomation({ forceMajorSlug });
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error running Spark automation (GET):', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('piyasa_admin_token')?.value || cookieStore.get('admin_token')?.value;

  if (!isAuthorized(req, token)) {
    return NextResponse.json({ success: false, error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const forceMajorSlug = body.majorSlug || undefined;
    const result = await runSparkDailyAutomation({ forceMajorSlug });
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Error running Spark automation (POST):', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
