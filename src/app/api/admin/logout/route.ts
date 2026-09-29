import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ success: true, message: 'Çıkış yapıldı.' });
  res.cookies.delete('piyasa_admin_token');
  return res;
}
