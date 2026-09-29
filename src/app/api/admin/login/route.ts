import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_USER, ADMIN_PASS, createAdminToken } from '@/lib/admin-auth';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      const token = createAdminToken();
      const res = NextResponse.json({ success: true, message: 'Giriş başarılı.' });
      res.cookies.set('piyasa_admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60,
      });
      return res;
    }

    return NextResponse.json({ success: false, error: 'Hatalı kullanıcı adı veya şifre.' }, { status: 401 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: 'Giriş işlemi başarısız: ' + err.message }, { status: 500 });
  }
}
