'use client';

import { useMemo, useState } from 'react';

export type StockItem = {
  brand: string;
  category: string;
  name: string;
  code: string;
  price?: string;
  status: string;
};

function whatsappListLink(item?: StockItem) {
  const message = item
    ? `Hello StationeryHub, please quote me for ${item.name} (${item.code}).`
    : 'Hello StationeryHub, please assist me with a stock and price list quote.';
  return `https://wa.me/26775560140?text=${encodeURIComponent(message)}`;
}

export default function StockPriceListWidget({ items }: { items: StockItem[] }) {
  const [query, setQuery] = useState('');
  const [brand, setBrand] = useState('All');
  const [category, setCategory] = useState('All');

  const brands = useMemo(() => ['All', ...Array.from(new Set(items.map((item) => item.brand))).sort()], [items]);
  const categories = useMemo(() => ['All', ...Array.from(new Set(items.map((item) => item.category))).sort()], [items]);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesQuery = !q || [item.name, item.code, item.brand, item.category].some((value) => value.toLowerCase().includes(q));
      const matchesBrand = brand === 'All' || item.brand === brand;
      const matchesCategory = category === 'All' || item.category === category;
      return matchesQuery && matchesBrand && matchesCategory;
    });
  }, [items, query, brand, category]);

  return (
    <section className="border border-black/10 bg-white p-4 sm:p-5">
      <div className="mb-5 grid gap-3 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search product, code, brand e.g. HP 47, CRG 067, BSP-01"
          className="w-full border border-black/15 px-4 py-3 text-sm font-semibold outline-none focus:border-[#c8481a]"
        />
        <select value={brand} onChange={(event) => setBrand(event.target.value)} className="w-full border border-black/15 px-4 py-3 text-sm font-semibold outline-none focus:border-[#c8481a]">
          {brands.map((option) => <option key={option}>{option}</option>)}
        </select>
        <select value={category} onChange={(event) => setCategory(event.target.value)} className="w-full border border-black/15 px-4 py-3 text-sm font-semibold outline-none focus:border-[#c8481a]">
          {categories.map((option) => <option key={option}>{option}</option>)}
        </select>
      </div>

      <div className="mb-4 flex flex-col gap-2 text-sm text-black/60 sm:flex-row sm:items-center sm:justify-between">
        <span><strong className="text-black">{filteredItems.length}</strong> matching items</span>
        {(query || brand !== 'All' || category !== 'All') && (
          <button onClick={() => { setQuery(''); setBrand('All'); setCategory('All'); }} className="text-left text-xs font-black uppercase tracking-widest text-[#c8481a]">Clear filters</button>
        )}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-[900px] text-left text-sm">
          <thead className="bg-[#0e0e0e] text-xs uppercase tracking-widest text-white">
            <tr>
              <th className="px-4 py-3">Brand</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10">
            {filteredItems.map((item) => (
              <tr key={`${item.code}-${item.name}`}>
                <td className="px-4 py-3 font-black">{item.brand}</td>
                <td className="px-4 py-3 text-black/60">{item.category}</td>
                <td className="px-4 py-3 font-bold">{item.name}</td>
                <td className="px-4 py-3 font-mono text-xs text-black/60">{item.code}</td>
                <td className="px-4 py-3 font-black">{item.price || 'Request quote'}</td>
                <td className="px-4 py-3">{item.status}</td>
                <td className="px-4 py-3"><a href={whatsappListLink(item)} target="_blank" rel="noopener noreferrer" className="inline-flex whitespace-nowrap bg-[#0e0e0e] px-3 py-2 text-xs font-black uppercase tracking-widest text-white">Quote</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 md:hidden">
        {filteredItems.map((item) => (
          <article key={`${item.code}-${item.name}`} className="border border-black/10 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-[#c8481a]">{item.brand} · {item.category}</p>
                <h3 className="mt-2 font-black leading-snug">{item.name}</h3>
              </div>
              <span className="font-mono text-xs text-black/50">{item.code}</span>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="font-black">{item.price || 'Request quote'}</span>
              <a href={whatsappListLink(item)} target="_blank" rel="noopener noreferrer" className="bg-[#0e0e0e] px-3 py-2 text-xs font-black uppercase tracking-widest text-white">Quote</a>
            </div>
          </article>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="py-10 text-center text-sm font-semibold text-black/50">No matching items. Try searching the cartridge code or brand.</div>
      )}
    </section>
  );
}
