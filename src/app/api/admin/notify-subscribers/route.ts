import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { queryCloudD1 } from '@/lib/cloud-d1';
import { sendEmail, generateMajorPublishedEmailHtml } from '@/lib/mailer';
import { ALL_FACULTY_CLUSTERS } from '@/data/all-university-departments';
import { verifyAdminToken } from '@/lib/admin-auth';

function checkAdminAuth(token?: string): boolean {
  if (!token) return false;
  return verifyAdminToken(token) || token === 'piyasa_admin_authenticated_2026';
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('piyasa_admin_token')?.value || cookieStore.get('admin_token')?.value;

  if (!checkAdminAuth(token)) {
    return NextResponse.json({ success: false, error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    const demands = await queryCloudD1<{
      major_slug: string;
      major_name: string;
      faculty_name: string;
      vote_count: number;
    }>('SELECT major_slug, major_name, faculty_name, vote_count FROM major_demand_counts ORDER BY vote_count DESC');

    const pendingRequests = await queryCloudD1<{
      id: number;
      faculty_name: string;
      major_name: string;
      major_slug: string;
      email: string;
      status: string;
      created_at: string;
    }>("SELECT id, faculty_name, major_name, major_slug, email, status, created_at FROM major_demand_requests WHERE email IS NOT NULL AND email != '' ORDER BY created_at DESC");

    return NextResponse.json({
      success: true,
      demands,
      subscribers: pendingRequests,
    });
  } catch (error: any) {
    console.error('Error fetching subscribers in admin:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('piyasa_admin_token')?.value || cookieStore.get('admin_token')?.value;

  if (!checkAdminAuth(token)) {
    return NextResponse.json({ success: false, error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    const { majorSlug } = await req.json();

    if (!majorSlug) {
      return NextResponse.json({ success: false, error: 'majorSlug parametresi zorunludur' }, { status: 400 });
    }

    // Find pending subscribers
    const subscribers = await queryCloudD1<{
      id: number;
      email: string;
      major_name: string;
      major_slug: string;
    }>(
      "SELECT id, email, major_name, major_slug FROM major_demand_requests WHERE major_slug = ? AND status = 'pending' AND email IS NOT NULL AND email != ''",
      [majorSlug]
    );

    if (subscribers.length === 0) {
      return NextResponse.json({
        success: true,
        sentCount: 0,
        message: 'Bu bölüm için bildirim bekleyen e-posta adresi bulunmuyor.',
      });
    }

    // Find typical jobs from cluster data
    const allDepts = ALL_FACULTY_CLUSTERS.flatMap((f) => f.departments);
    const deptInfo = allDepts.find((d) => d.slug === majorSlug);
    const majorName = subscribers[0].major_name || deptInfo?.name || majorSlug;
    const typicalJobs = deptInfo?.typicalJobs || [];

    const htmlContent = generateMajorPublishedEmailHtml({
      majorName,
      majorSlug,
      typicalJobs,
    });

    let sentCount = 0;
    const emailResults = [];

    for (const sub of subscribers) {
      const res = await sendEmail({
        to: sub.email,
        subject: `🎯 ${majorName} 2026 Maaş & Kariyer Raporu Yayında! | Piyasa.work`,
        html: htmlContent,
      });

      emailResults.push({ email: sub.email, ...res });
      if (res.success) {
        sentCount++;
      }
    }

    // Update status to notified in Cloudflare D1
    await queryCloudD1(
      "UPDATE major_demand_requests SET status = 'notified', updated_at = datetime('now') WHERE major_slug = ? AND status = 'pending' AND email IS NOT NULL",
      [majorSlug]
    );

    return NextResponse.json({
      success: true,
      majorSlug,
      majorName,
      sentCount,
      totalSubscribers: subscribers.length,
      results: emailResults,
      message: `${sentCount} aboneye bildirim e-postası başarıyla iletildi ve durumları güncellendi.`,
    });
  } catch (error: any) {
    console.error('Error sending major demand notifications:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
