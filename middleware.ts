// Locks the old admin pages behind the same admin key as /admin/hub.
import { NextRequest, NextResponse } from 'next/server';

async function expectedToken(key: string) {
  const enc = new TextEncoder();
  const k = await crypto.subtle.importKey('raw', enc.encode(key), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', k, enc.encode('stationeryhub-admin'));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === '/admin/hub' || pathname.startsWith('/admin/hub/')) return NextResponse.next();
  const key = process.env.ADMIN_KEY;
  const cookie = req.cookies.get('sh_admin')?.value;
  if (key && cookie && cookie === (await expectedToken(key))) return NextResponse.next();
  if (pathname.startsWith('/api/')) return NextResponse.json({ error: 'unauthorised' }, { status: 401 });
  const url = req.nextUrl.clone();
  url.pathname = '/admin/hub';
  url.search = '';
  return NextResponse.redirect(url);
}

export const config = { matcher: ['/admin/:path*', '/test', '/api/debug-seed', '/api/update-table', '/api/products/seed', '/api/check-db', '/api/test-connection', '/api/test-neon', '/api/email-campaigns/:path*'] };
