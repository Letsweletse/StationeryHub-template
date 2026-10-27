import { NextResponse } from 'next/server';
import { getSettings, publicCatalogue } from '@/lib/hub';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [items, s] = await Promise.all([publicCatalogue(), getSettings()]);
    return NextResponse.json(
      { items, rates: { BWP: 1, USD: Number(s.usd_per_bwp) || 0.073, ZAR: Number(s.zar_per_bwp) || 1.33 }, validDays: Number(s.quote_valid_days) || 7 },
      { headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=300' } },
    );
  } catch (e) {
    console.error('catalogue', e);
    return NextResponse.json({ items: [], rates: { BWP: 1, USD: 0.073, ZAR: 1.33 }, validDays: 7, error: 'unavailable' }, { status: 503 });
  }
}
