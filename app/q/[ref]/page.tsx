import { notFound } from 'next/navigation';
import { ensureSchema, getSettings, money, q, quoteSig } from '@/lib/hub';
import PrintButton from './PrintButton';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Quotation · StationeryHub', robots: { index: false } };

export default async function QuoteView({ params, searchParams }: { params: { ref: string }; searchParams: { s?: string } }) {
  const ref = decodeURIComponent(params.ref);
  if (!searchParams.s || searchParams.s !== quoteSig(ref)) notFound();
  await ensureSchema();
  const [row] = await q(`select * from sh_quotes where ref = $1`, [ref]);
  if (!row) notFound();
  const s = await getSettings();
  const cur = row.currency as string; const rate = Number(row.rate) || 1;
  const fx = (n: number) => money(Math.round(n * rate * 100) / 100, cur);
  const priced: any[] = row.items || []; const unpriced: any[] = row.unpriced || [];
  const date = new Date(row.created_at);
  const valid = new Date(date.getTime() + (Number(s.quote_valid_days) || 7) * 86400000);
  const d = (x: Date) => x.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const intl = String(row.country || '').toLowerCase() !== 'botswana';

  return (
    <main className="min-h-screen bg-[#f0ede8] px-4 py-8 text-[#0e0e0e] print:bg-white print:p-0">
      <div className="mx-auto max-w-3xl bg-white p-6 shadow-sm sm:p-10 print:shadow-none">
        <div className="flex flex-col justify-between gap-4 border-b-4 border-[#0e0e0e] pb-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-3xl font-black uppercase tracking-[0.12em]">Stationery<span className="text-[#c8481a]">Hub</span></p>
            <p className="mt-1 text-xs text-black/60">Office supplies, ink &amp; toner · Gaborone, Botswana<br />sales@stationeryhub.co.bw · +267 75 560 140 · stationeryhub.co.bw</p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#c8481a]">Quotation</p>
            <p className="text-xl font-black">{row.ref}</p>
            <p className="text-xs text-black/60">Date: {d(date)}<br />Valid until: {d(valid)}</p>
          </div>
        </div>

        <div className="mt-5 text-sm">
          <p className="text-xs font-black uppercase tracking-widest text-black/50">Prepared for</p>
          <p className="font-bold">{row.customer_name}{row.company ? `, ${row.company}` : ''}</p>
          <p className="text-black/60">{[row.phone, row.email, row.country].filter(Boolean).join(' · ')}</p>
        </div>

        <table className="mt-6 w-full text-sm">
          <thead><tr className="bg-[#0e0e0e] text-left text-xs uppercase tracking-widest text-white"><th className="px-3 py-2">Item</th><th className="px-3 py-2 text-center">Qty</th><th className="px-3 py-2 text-right">Unit</th><th className="px-3 py-2 text-right">Total</th></tr></thead>
          <tbody>
            {priced.map((x) => (
              <tr key={x.id} className="border-b border-black/10"><td className="px-3 py-2">{x.name}<span className="block font-mono text-[11px] text-black/50">{x.code}</span></td><td className="px-3 py-2 text-center">{x.qty}</td><td className="px-3 py-2 text-right">{fx(x.unit_bwp)}</td><td className="px-3 py-2 text-right font-bold">{fx(x.total_bwp)}</td></tr>
            ))}
            {unpriced.map((x) => (
              <tr key={`u${x.id}`} className="border-b border-black/10"><td className="px-3 py-2">{x.name}<span className="block font-mono text-[11px] text-black/50">{x.code}</span></td><td className="px-3 py-2 text-center">{x.qty}</td><td colSpan={2} className="px-3 py-2 text-right text-[#c8481a]">Price to follow</td></tr>
            ))}
          </tbody>
          <tfoot><tr><td colSpan={3} className="px-3 pt-4 text-right font-black uppercase">Subtotal</td><td className="px-3 pt-4 text-right text-lg font-black">{fx(Number(row.subtotal_bwp))}</td></tr></tfoot>
        </table>

        {row.notes && <div className="mt-5 border-l-4 border-[#c8481a] bg-[#f0ede8] p-3 text-sm"><strong>Your notes:</strong> {row.notes}</div>}

        <div className="mt-6 space-y-1 text-xs leading-5 text-black/60">
          <p>Prices are subject to stock availability and valid until the date above.</p>
          {cur !== 'BWP' && <p>{cur} amounts are indicative, converted from Botswana Pula at the rate on the quotation date. Invoices are issued in Pula.</p>}
          <p>{intl ? 'Shipping, duties and import charges are not included and will be quoted once the delivery address is confirmed.' : 'Delivery within Gaborone can be arranged; the delivery charge, if any, is confirmed on the invoice.'}</p>
          <p>Banking details are provided on the invoice when you confirm the order.</p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row print:hidden">
          <PrintButton />
          <a href={`https://wa.me/26775560140?text=${encodeURIComponent(`Hello StationeryHub, I'd like to proceed with quotation ${row.ref}.`)}`} target="_blank" rel="noopener noreferrer" className="bg-[#25d366] px-6 py-3 text-center text-sm font-black uppercase tracking-widest text-black">Confirm order on WhatsApp</a>
        </div>
      </div>
    </main>
  );
}
