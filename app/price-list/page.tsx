'use client';

import { useEffect, useMemo, useState } from 'react';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import { addToBasket, fmtP } from '@/lib/basket';

type Item = { id: number; code: string | null; name: string; brand: string | null; category: string | null; status: string; price: number | null };

export default function PriceListPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [brand, setBrand] = useState('All');
  const [category, setCategory] = useState('All');
  const [qty, setQty] = useState<Record<number, number>>({});
  const [added, setAdded] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/hub/catalogue').then((r) => r.json()).then((d) => setItems(d.items || [])).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const brands = useMemo(() => ['All', ...Array.from(new Set(items.map((i) => i.brand || 'Other'))).sort()], [items]);
  const categories = useMemo(() => ['All', ...Array.from(new Set(items.map((i) => i.category || 'Other'))).sort()], [items]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((i) => (!q || [i.name, i.code, i.brand, i.category].some((v) => (v || '').toLowerCase().includes(q)))
      && (brand === 'All' || (i.brand || 'Other') === brand) && (category === 'All' || (i.category || 'Other') === category));
  }, [items, query, brand, category]);
  const pricedCount = items.filter((i) => i.price != null).length;

  function add(i: Item) {
    addToBasket({ id: i.id, name: i.name, code: i.code, price: i.price }, qty[i.id] || 1);
    setAdded(i.id); setTimeout(() => setAdded(null), 1500);
  }

  return (
    <main className="min-h-screen bg-[#f0ede8] text-[#0e0e0e]">
      <SiteNav />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
        <div className="mb-8 flex flex-col justify-between gap-5 border-b border-black/10 pb-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#c8481a]">StationeryHub Botswana</p>
            <h1 className="mt-2 text-4xl font-black uppercase tracking-tight sm:text-5xl md:text-7xl">Stock &amp; price list</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-black/60 sm:text-base">
              Ink, toner, cartridges and print supplies. Add items to your quote and get a priced quotation instantly. Items without a price are confirmed by our sales team, usually within the hour.
            </p>
          </div>
          <a href="/quote" className="bg-[#c8481a] px-6 py-4 text-center text-sm font-black uppercase tracking-widest text-white">Get instant quote</a>
        </div>

        <div className="mb-5 grid gap-3 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search product, code, brand e.g. HP 47, CRG 067, BSP-01"
            className="w-full border border-black/15 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#c8481a]" />
          <select value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full border border-black/15 bg-white px-4 py-3 text-sm font-semibold">
            {brands.map((o) => <option key={o}>{o}</option>)}
          </select>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-black/15 bg-white px-4 py-3 text-sm font-semibold">
            {categories.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
        <p className="mb-4 text-sm text-black/60"><strong className="text-black">{filtered.length}</strong> items · {pricedCount} with instant prices</p>

        {loading ? <p className="py-16 text-center text-black/50">Loading prices…</p> : (
          <div className="grid gap-3 md:hidden">
            {filtered.map((i) => (
              <div key={i.id} className="border border-black/10 bg-white p-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#c8481a]">{i.brand} · {i.category}</p>
                <p className="mt-1 font-bold">{i.name}</p>
                <p className="font-mono text-xs text-black/50">{i.code}</p>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="text-lg font-black">{i.price != null ? fmtP(i.price) : <span className="text-sm text-black/50">Price on request</span>}</span>
                  <div className="flex items-center gap-2">
                    <input type="number" min={1} value={qty[i.id] || 1} onChange={(e) => setQty({ ...qty, [i.id]: Number(e.target.value) })} className="w-16 border border-black/15 px-2 py-2 text-sm" aria-label="Quantity" />
                    <button onClick={() => add(i)} className="bg-[#0e0e0e] px-3 py-2 text-xs font-black uppercase tracking-widest text-white">{added === i.id ? 'Added ✓' : 'Add'}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && (
          <div className="hidden overflow-x-auto border border-black/10 bg-white md:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#0e0e0e] text-xs uppercase tracking-widest text-white">
                <tr><th className="px-4 py-3">Brand</th><th className="px-4 py-3">Product</th><th className="px-4 py-3">Code</th><th className="px-4 py-3 text-right">Price</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Qty</th><th className="px-4 py-3"></th></tr>
              </thead>
              <tbody className="divide-y divide-black/10">
                {filtered.map((i) => (
                  <tr key={i.id}>
                    <td className="px-4 py-3 font-black">{i.brand}<span className="block text-xs font-normal text-black/50">{i.category}</span></td>
                    <td className="px-4 py-3 font-bold">{i.name}</td>
                    <td className="px-4 py-3 font-mono text-xs text-black/60">{i.code}</td>
                    <td className="px-4 py-3 text-right font-black">{i.price != null ? fmtP(i.price) : <span className="text-xs font-semibold text-black/50">On request</span>}</td>
                    <td className="px-4 py-3">{i.status}</td>
                    <td className="px-4 py-3"><input type="number" min={1} value={qty[i.id] || 1} onChange={(e) => setQty({ ...qty, [i.id]: Number(e.target.value) })} className="w-16 border border-black/15 px-2 py-1" aria-label="Quantity" /></td>
                    <td className="px-4 py-3"><button onClick={() => add(i)} className="whitespace-nowrap bg-[#0e0e0e] px-3 py-2 text-xs font-black uppercase tracking-widest text-white hover:bg-[#c8481a]">{added === i.id ? 'Added ✓' : 'Add to quote'}</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3 bg-[#0e0e0e] p-5 text-white md:flex-row md:items-center md:justify-between">
          <p className="text-sm leading-6 text-white/70">Need something not listed? Add it as a note on the quote page, or send the printer model and we&apos;ll find the right cartridge.</p>
          <a href="/quote" className="bg-[#c8481a] px-5 py-3 text-center text-sm font-black uppercase tracking-widest text-white">Open my quote</a>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
