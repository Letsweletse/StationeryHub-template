'use client';
import { useEffect, useState } from 'react';
import { onBasket, readBasket } from '@/lib/basket';

export default function SiteNav() {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const up = () => setCount(readBasket().reduce((a, l) => a + l.qty, 0));
    up(); return onBasket(up);
  }, []);
  const links = [['/price-list', 'Price list'], ['/quote', 'Instant quote'], ['/suppliers', 'Suppliers'], ['/quote#international', 'International']];
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-[#f0ede8]/95 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-10">
        <a href="/" className="text-xl font-black uppercase tracking-[0.14em] sm:text-2xl">Stationery<span className="text-[#c8481a]">Hub</span></a>
        <div className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.18em] text-black/55 md:flex">
          {links.map(([h, l]) => <a key={h} href={h} className="hover:text-[#c8481a]">{l}</a>)}
        </div>
        <div className="flex items-center gap-2">
          <a href="/quote" className="relative whitespace-nowrap bg-[#0e0e0e] px-3 py-2 text-xs font-bold uppercase tracking-widest text-[#f0ede8] hover:bg-[#c8481a]">
            Quote{count > 0 && <span className="ml-2 inline-flex min-w-[1.25rem] justify-center rounded-full bg-[#c8481a] px-1.5 text-[10px]">{count}</span>}
          </a>
          <button aria-label="Menu" onClick={() => setOpen(!open)} className="border border-black/15 px-3 py-2 text-xs font-bold uppercase md:hidden">{open ? 'Close' : 'Menu'}</button>
        </div>
      </nav>
      {open && (
        <div className="border-t border-black/10 bg-[#f0ede8] px-4 py-3 md:hidden">
          {[['/', 'Home'], ...links].map(([h, l]) => <a key={h} href={h} className="block py-2 text-sm font-bold uppercase tracking-widest">{l}</a>)}
        </div>
      )}
    </header>
  );
}
