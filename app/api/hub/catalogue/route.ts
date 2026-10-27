import { NextRequest, NextResponse } from 'next/server';
import { getSettings, publicCatalogue } from '@/lib/hub';
import { AREAS, type Area } from '@/lib/eta';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const a = req.nextUrl.searchParams.get('area') || 'Gaborone';
    const area = ((AREAS as readonly string[]).includes(a) ? a : 'Gaborone') as Area;
    const [items, s] = await Promise.all([publicCatalogue(area), getSettings()]);
    return NextResponse.json(
      { items, rates: { BWP: 1, USD: Number(s.usd_per_bwp) || 0.073, ZAR: Number(s.zar_per_bwp) || 1.33 }, validDays: Number(s.quote_valid_days) || 7 },
      { headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=300' } },
    );
  } catch (e) {
    console.error('catalogue', e);
    return NextResponse.json({ items: [], rates: { BWP: 1, USD: 0.073, ZAR: 1.33 }, validDays: 7, error: 'unavailable' }, { status: 503 });
  }
}
