'use client';

import { useMemo, useState } from 'react';

export type StockItem = {
  name: string;
  code: string;
  brand: string;
  category: string;
  price?: string;
  stock?: string | number;
};

type StockPriceListWidgetProps = {
  items: StockItem[];
};

export default function StockPriceListWidget({ items }: StockPriceListWidgetProps) {
  const [query, setQuery] = useState('');

  const filteredItems = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return items;
    }

    return items.filter((item) =>
      [item.name, item.code, item.brand, item.category]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(search)),
    );
  }, [items, query]);

  return (
    <section className="border border-black/10 bg-white">
      <div className="border-b border-black/10 p-4 sm:p-5">
        <label htmlFor="stock-search" className="text-xs font-black uppercase tracking-[0.22em] text-[#c8481a]">
          Search stock list
        </label>
        <input
          id="stock-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by product, code, brand or category"
          className="mt-3 w-full border border-black/15 px-4 py-3 text-sm font-semibold outline-none transition focus:border-[#c8481a]"
          type="search"
        />
        <p className="mt-2 text-xs text-black/50">
          Showing {filteredItems.length} of {items.length} product{items.length === 1 ? '' : 's'}.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[760px] w-full text-left text-sm">
          <thead className="bg-[#0e0e0e] text-xs uppercase tracking-widest text-white">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Brand</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10">
            {filteredItems.map((item) => (
              <tr key={`${item.code}-${item.name}`}>
                <td className="px-4 py-3 font-bold">{item.name}</td>
                <td className="px-4 py-3 text-black/60">{item.code}</td>
                <td className="px-4 py-3 text-black/60">{item.brand}</td>
                <td className="px-4 py-3 text-black/60">{item.category}</td>
                <td className="px-4 py-3 font-black">{item.price || 'Request quote'}</td>
                <td className="px-4 py-3">{item.stock ?? ''}</td>
              </tr>
            ))}
            {filteredItems.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-black/50">
                  No matching products found. Try another product name, code, brand or category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
