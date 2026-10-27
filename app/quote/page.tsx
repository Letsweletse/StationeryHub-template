'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import { addToBasket, clearBasket, fmtP, onBasket, readBasket, removeLine, setQty, type BasketLine } from '@/lib/basket';
import { AREAS } from '@/lib/eta';

type Item = { id: number; code: string | null; name: string; brand: string | null; price: number | null; eta: string };
type Result = { ref: string; url: string; subtotal_bwp: number; currency: string; rate: number; priced: any[]; unpriced: any[]; area: string; eta: string; branch: { town: string; phone: string; wa: string } };

const CUR: Record<string, (n: number) => string> = {
  BWP: (n) => fmtP(n),
  USD: (n) => `US$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  ZAR: (n) => `R${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
};

export default function QuotePage() {
  const [lines, setLines] = useState<BasketLine[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [rates, setRates] = useState<Record<string, number>>({ BWP: 1, USD: 0.073, ZAR: 1.33 });
  const [currency, setCurrency] = useState('BWP');
  const [country, setCountry] = useState('Botswana');
  const [area, setArea] = useState('Gaborone');
  const [search, setSearch] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    const up = () => setLines(readBasket()); up();
    try { const a = localStorage.getItem('sh_area'); if (a) setArea(a); } catch {}
    return onBasket(up);
  }, []);
  useEffect(() => {
    try { localStorage.setItem('sh_area', area); } catch {}
    fetch(`/api/hub/catalogue?area=${encodeURIComponent(area)}`).then((r) => r.json()).then((d) => { setItems(d.items || []); if (d.rates) setRates(d.rates); }).catch(() => {});
  }, [area]);
  useEffect(() => { if (area === 'International' && country.toLowerCase() === 'botswana') setCountry(''); if (area !== 'International' && !country) setCountry('Botswana'); }, [area]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (country && country.toLowerCase() !== 'botswana' && currency === 'BWP') setCurrency('USD'); }, [country]); // eslint-disable-line react-hooks/exhaustive-deps

  const rate = rates[currency] || 1;
  const fx = (n: number) => CUR[currency](Math.round(n * rate * 100) / 100);
  const byId = useMemo(() => new Map(items.map((i) => [i.id, i])), [items]);
  const priceOf = (l: BasketLine) => (byId.has(l.id) ? byId.get(l.id)!.price : l.price);
  const subtotal = lines.reduce((a, l) => { const p = priceOf(l); return a + (p != null ? p * l.qty : 0); }, 0);
  const unpricedCount = lines.filter((l) => priceOf(l) == null).length;
  const suggestions = useMemo(() => {
    const q = search.trim().toLowerCase(); if (q.length < 2) return [];
    return items.filter((i) => [i.name, i.code, i.brand].some((v) => (v || '').toLowerCase().includes(q))).slice(0, 8);
  }, [search, items]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setError('');
    const f = new FormData(e.currentTarget);
    const payload = {
      name: f.get('name'), company: f.get('company'), phone: f.get('phone'), email: f.get('email'), country: country || 'International', currency, area,
      notes: f.get('notes'), items: lines.map((l) => ({ id: l.id, qty: l.qty })),
    };
    try {
      const r = await fetch('/api/hub/quote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Could not create quotation');
      setResult(d); clearBasket(); window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) { setError(err.message || 'Something went wrong'); }
    setBusy(false);
  }

  if (result) {
    const rfx = (n: number) => CUR[result.currency](Math.round(n * result.rate * 100) / 100);
    return (
      <main className="min-h-screen bg-[#f0ede8] text-[#0e0e0e]">
        <SiteNav />
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-[#c8481a]">Quotation ready</p>
          <h1 className="mt-2 text-4xl font-black uppercase tracking-tight sm:text-5xl">{result.ref}</h1>
          <div className="mt-6 border border-black/10 bg-white p-5">
            {result.priced.map((x) => <div key={x.id} className="flex justify-between gap-3 border-b border-black/5 py-2 text-sm"><span>{x.qty} × {x.name}</span><strong>{rfx(x.total_bwp)}</strong></div>)}
            {result.unpriced.map((x) => <div key={x.id} className="flex justify-between gap-3 border-b border-black/5 py-2 text-sm"><span>{x.qty} × {x.name}</span><span className="text-[#c8481a]">Price to follow</span></div>)}
            <div className="flex justify-between pt-3 text-lg font-black"><span>Subtotal</span><span>{rfx(result.subtotal_bwp)}</span></div>
          </div>
          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <div className="border border-black/10 bg-white p-4"><p className="text-xs font-black uppercase tracking-widest text-black/50">Delivery to {result.area}</p><p className="mt-1 font-bold">{result.eta.charAt(0).toUpperCase() + result.eta.slice(1)}</p></div>
            <div className="border border-black/10 bg-white p-4"><p className="text-xs font-black uppercase tracking-widest text-black/50">Your branch</p><p className="mt-1 font-bold">{result.branch.town} · {result.branch.phone}</p></div>
          </div>
          <p className="mt-4 text-sm leading-6 text-black/60">{result.unpriced.length ? 'Our team will price the remaining items shortly. ' : ''}If you gave an email, a copy is on its way.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={result.url} className="bg-[#c8481a] px-6 py-4 text-center text-sm font-black uppercase tracking-widest text-white">Review &amp; place order</a>
            <a href={`https://wa.me/${result.branch.wa}?text=${encodeURIComponent(`Hello StationeryHub, I have a question about quotation ${result.ref}.`)}`} target="_blank" rel="noopener noreferrer" className="bg-[#25d366] px-6 py-4 text-center text-sm font-black uppercase tracking-widest text-black">Ask on WhatsApp</a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f0ede8] text-[#0e0e0e]">
      <SiteNav />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-[#c8481a]">Instant quotation</p>
        <h1 className="mt-2 text-4xl font-black uppercase tracking-tight sm:text-6xl">Build your quote</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-black/60">Add items, set quantities and get a priced quotation straight away. Businesses in Botswana and international buyers welcome.</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="border border-black/10 bg-white p-4 sm:p-5">
            <div className="relative">
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Add an item: type a name or code, e.g. HP 47 or CRG 067"
                className="w-full border border-black/15 px-4 py-3 text-sm font-semibold outline-none focus:border-[#c8481a]" />
              {suggestions.length > 0 && (
                <div className="absolute z-10 mt-1 w-full border border-black/10 bg-white shadow-xl">
                  {suggestions.map((s) => (
                    <button key={s.id} type="button" onClick={() => { addToBasket({ id: s.id, name: s.name, code: s.code, price: s.price }); setSearch(''); }}
                      className="flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-sm hover:bg-[#f0ede8]">
                      <span><strong>{s.name}</strong> <span className="font-mono text-xs text-black/50">{s.code}</span></span>
                      <span className="whitespace-nowrap font-black">{s.price != null ? fmtP(s.price) : 'On request'}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {lines.length === 0 ? (
              <p className="py-10 text-center text-sm text-black/50">Your quote is empty. Search above or browse the <a href="/price-list" className="font-bold text-[#c8481a] underline">price list</a>. You can also just describe what you need in the notes.</p>
            ) : (
              <div className="mt-4 divide-y divide-black/10">
                {lines.map((l) => (
                  <div key={l.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                    <div className="min-w-0 flex-1"><p className="font-bold">{l.name}</p><p className="font-mono text-xs text-black/50">{l.code}</p>{byId.get(l.id)?.eta && <p className="text-xs font-bold text-[#1f7a4d]">🚚 {byId.get(l.id)!.eta}</p>}</div>
                    <input type="number" min={1} value={l.qty} onChange={(e) => setQty(l.id, Number(e.target.value))} className="w-20 border border-black/15 px-2 py-2 text-sm" aria-label="Quantity" />
                    <span className="w-28 text-right font-black">{priceOf(l) != null ? fx(priceOf(l)! * l.qty) : <span className="text-xs text-[#c8481a]">Price to follow</span>}</span>
                    <button type="button" onClick={() => removeLine(l.id)} className="text-xs font-bold uppercase text-black/40 hover:text-[#c8481a]">Remove</button>
                  </div>
                ))}
                <div className="flex justify-between pt-4 text-lg font-black"><span>Subtotal</span><span>{subtotal > 0 ? fx(subtotal) : 'To be priced'}</span></div>
                {unpricedCount > 0 && <p className="pt-1 text-xs text-black/50">{unpricedCount} item(s) will be priced by our sales team.</p>}
              </div>
            )}
          </section>

          <form onSubmit={submit} className="border border-black/10 bg-white p-4 sm:p-5">
            <div className="grid gap-3">
              <label className="text-xs font-bold uppercase tracking-widest text-black/60">Deliver to
                <select value={area} onChange={(e) => setArea(e.target.value)} className="mt-1 w-full border border-[#c8481a]/40 px-3 py-2 text-sm font-semibold normal-case tracking-normal text-black">
                  {AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="text-xs font-bold uppercase tracking-widest text-black/60">Country
                  <input value={country} onChange={(e) => setCountry(e.target.value)} className="mt-1 w-full border border-black/15 px-3 py-2 text-sm font-normal normal-case tracking-normal text-black" />
                </label>
                <label className="text-xs font-bold uppercase tracking-widest text-black/60">Currency
                  <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="mt-1 w-full border border-black/15 px-3 py-2 text-sm font-normal text-black">
                    <option value="BWP">BWP (Pula)</option><option value="USD">USD</option><option value="ZAR">ZAR (Rand)</option>
                  </select>
                </label>
              </div>
              <input name="name" required placeholder="Your name *" className="border border-black/15 px-3 py-3 text-sm" />
              <input name="company" placeholder="Company / organisation" className="border border-black/15 px-3 py-3 text-sm" />
              <input name="phone" placeholder="Phone / WhatsApp" className="border border-black/15 px-3 py-3 text-sm" />
              <input name="email" type="email" placeholder="Email (we'll send the quotation)" className="border border-black/15 px-3 py-3 text-sm" />
              <textarea name="notes" rows={4} placeholder="Anything else? Items not on the list, printer models, delivery address…" className="border border-black/15 px-3 py-3 text-sm" />
              {currency !== 'BWP' && <p className="text-xs leading-5 text-black/50">{currency} amounts are indicative at today&apos;s rate; invoices are issued in Pula.</p>}
              {error && <p className="text-sm font-bold text-red-700">{error}</p>}
              <button disabled={busy} className="bg-[#c8481a] px-6 py-4 text-sm font-black uppercase tracking-widest text-white disabled:opacity-60">{busy ? 'Preparing…' : 'Get my quotation'}</button>
              <p className="text-xs text-black/50">Give a phone number or email so we can reach you.</p>
            </div>
          </form>
        </div>

        <section id="international" className="mt-10 scroll-mt-24 bg-[#0e0e0e] p-6 text-white sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-[#e8622e]">International buyers</p>
          <h2 className="mt-2 text-3xl font-black uppercase tracking-tight sm:text-4xl">Ordering from outside Botswana?</h2>
          <div className="mt-5 grid gap-4 text-sm leading-6 text-white/70 md:grid-cols-3">
            <p><strong className="block text-white">Quote in your currency</strong>Set your country above and choose USD or ZAR. Prices convert at today&apos;s indicative rate.</p>
            <p><strong className="block text-white">Shipping quoted per order</strong>We confirm courier or freight cost to your destination once we have your address and order size.</p>
            <p><strong className="block text-white">Bulk and tender supply</strong>For large or recurring orders, put the full list in the notes and our team will send a formal offer.</p>
          </div>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
