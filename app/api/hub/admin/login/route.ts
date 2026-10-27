import { NextRequest, NextResponse } from 'next/server';
import { adminToken, checkAdminKey } from '@/lib/hub';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  if (!process.env.ADMIN_KEY) return NextResponse.json({ error: 'ADMIN_KEY is not set in Vercel yet.' }, { status: 503 });
  const b = await req.json().catch(() => ({}));
  if (!checkAdminKey(String(b.key || ''))) {
    await new Promise((r) => setTimeout(r, 800));
    return NextResponse.json({ error: 'Wrong admin key.' }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set('sh_admin', adminToken()!, { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 14 });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set('sh_admin', '', { path: '/', maxAge: 0 });
  return res;
}
