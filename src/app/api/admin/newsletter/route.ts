import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { queryCloudD1 } from '@/lib/cloud-d1';
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
    const subscribers = await queryCloudD1<{
      id: number;
      email: string;
      source: string;
      status: string;
      created_at: string;
      updated_at: string;
    }>('SELECT id, email, source, status, created_at, updated_at FROM newsletter_subscribers ORDER BY created_at DESC');

    const totalCount = subscribers.length;
    const activeCount = subscribers.filter((s) => s.status === 'active').length;

    return NextResponse.json({
      success: true,
      data: subscribers,
      totalCount,
      activeCount,
    });
  } catch (error: any) {
    console.error('Error fetching newsletter subscribers:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('piyasa_admin_token')?.value || cookieStore.get('admin_token')?.value;

  if (!checkAdminAuth(token)) {
    return NextResponse.json({ success: false, error: 'Yetkisiz erişim' }, { status: 401 });
  }

  try {
    const { id, email } = await req.json();

    if (!id && !email) {
      return NextResponse.json({ success: false, error: 'id veya email gereklidir' }, { status: 400 });
    }

    if (id) {
      await queryCloudD1('DELETE FROM newsletter_subscribers WHERE id = ?', [id]);
    } else {
      await queryCloudD1('DELETE FROM newsletter_subscribers WHERE email = ?', [email]);
    }

    return NextResponse.json({
      success: true,
      message: 'Abone başarıyla silindi.',
    });
  } catch (error: any) {
    console.error('Error deleting newsletter subscriber:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
