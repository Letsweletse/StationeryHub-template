import StockPriceListWidget, { type StockItem } from '../components/StockPriceListWidget';

const stockItems: StockItem[] = [
  {
    name: 'HP 3YP17A Colour Printhead',
    code: '3YP17A',
    brand: 'HP',
    category: 'Print Supplies',
    price: 'P 780',
    stock: 'In stock',
  },
  {
    name: 'HP 47 Black Ink Cartridge',
    code: '6ZD61AE',
    brand: 'HP',
    category: 'Print Supplies',
    price: 'P 280',
    stock: 'Fast moving',
  },
  {
    name: 'Canon 486 Colour Ink Cartridge',
    code: 'CL-486',
    brand: 'Canon',
    category: 'Print Supplies',
    price: 'P 756',
    stock: 'Available',
  },
  {
    name: 'HP 154A Neverstop Toner Reload',
    code: 'W1540A',
    brand: 'HP',
    category: 'Toner',
    price: 'P 450',
    stock: 'Bulk ready',
  },
];

const brandCounts = Array.from(
  stockItems.reduce((counts, item) => counts.set(item.brand, (counts.get(item.brand) || 0) + 1), new Map<string, number>()),
);

export default function PriceListPage() {
  return (
    <main className="min-h-screen bg-[#f0ede8] px-5 py-10 text-[#0e0e0e] lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col justify-between gap-4 border-b border-black/10 pb-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#c8481a]">StationeryHub Botswana</p>
            <h1 className="mt-2 text-5xl font-black uppercase tracking-tight md:text-7xl">Price list</h1>
            <p className="mt-4 max-w-2xl text-black/60">Current office supplies and print consumables. For bulk orders, request a formal quote.</p>
          </div>
          <a href="/quote" className="bg-[#c8481a] px-6 py-4 text-center text-sm font-black uppercase tracking-widest text-white">Request quote</a>
        </div>

        <div className="mb-6 grid gap-3 text-sm font-bold text-black/70 md:grid-cols-3">
          <a href="mailto:sales@stationeryhub.co.bw" className="border border-black/10 bg-white p-4">sales@stationeryhub.co.bw</a>
          <a href="https://wa.me/26775560140" className="border border-black/10 bg-white p-4">WhatsApp +267 75 560 140</a>
          <a href="https://wa.me/26772347712" className="border border-black/10 bg-white p-4">WhatsApp +267 72 347 712</a>
        </div>

        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {brandCounts.map(([brand, count]) => (
            <div key={brand} className="border border-black/10 bg-white p-4">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-black/45">{brand}</p>
              <p className="mt-2 text-3xl font-black text-[#c8481a]">{count}</p>
              <p className="text-sm text-black/55">listed product{count === 1 ? '' : 's'}</p>
            </div>
          ))}
        </div>

        <StockPriceListWidget items={stockItems} />

        <section className="mt-8 border border-black/10 bg-[#0e0e0e] p-6 text-white md:flex md:items-center md:justify-between md:gap-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#e8622e]">Need a formal quote?</p>
            <h2 className="mt-2 text-2xl font-black uppercase">Send your list on WhatsApp</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">Share item names, cartridge codes, quantities and delivery location. StationeryHub will confirm availability and pricing.</p>
          </div>
          <a href="https://wa.me/26775560140?text=Hello%20StationeryHub%2C%20I%20need%20a%20quote%20from%20the%20price%20list." target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex bg-[#25d366] px-6 py-4 text-sm font-black uppercase tracking-widest text-white md:mt-0">
            WhatsApp quote
          </a>
        </section>
      </div>
    </main>
  );
}
