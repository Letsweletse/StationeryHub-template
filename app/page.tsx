'use client';

import LeadCaptureButton from './components/LeadCaptureButton';

const products = [
  { name: 'HP 47 Black Ink Cartridge', category: 'Print Supplies', price: 'P 280', badge: 'Fast moving' },
  { name: 'HP 3YP17A Colour Printhead', category: 'Print Supplies', price: 'P 780', badge: 'In stock' },
  { name: 'Canon 486 Colour Ink Cartridge', category: 'Print Supplies', price: 'P 756', badge: 'Available' },
  { name: 'HP 154A Neverstop Toner Reload', category: 'Toner', price: 'P 450', badge: 'Bulk ready' },
];

const wa = 'https://wa.me/26775560140';

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f0ede8] text-[#0e0e0e]">
      <section className="bg-[#0e0e0e] px-4 py-12 text-white sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <a href="/" className="text-2xl font-black uppercase tracking-[0.14em]">Stationery<span className="text-[#e8622e]">Hub</span></a>
            <div className="flex flex-wrap gap-2 text-xs font-black uppercase tracking-widest">
              <a className="bg-white/10 px-3 py-2" href="/products">Products</a>
              <a className="bg-white/10 px-3 py-2" href="/price-list">Price list</a>
              <a className="bg-[#c8481a] px-3 py-2" href="/quote">Request quote</a>
              <a className="bg-[#25d366] px-3 py-2 text-black" href={wa}>WhatsApp</a>
            </div>
          </div>

          <div className="grid gap-8 py-14 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#e8622e]">Botswana office supply sales machine</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-7xl">
                Order stationery, cartridges and office supplies fast.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/70">
                Customers can order by WhatsApp, request a bulk quote, view the live price list and leave contact details so sales can follow up.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <a href="/products" className="bg-[#c8481a] px-5 py-4 text-center text-sm font-black uppercase tracking-widest text-white">Order product</a>
                <a href="/quote" className="border border-white/30 px-5 py-4 text-center text-sm font-black uppercase tracking-widest text-white">Bulk quote</a>
                <a href="/price-list" className="border border-white/30 px-5 py-4 text-center text-sm font-black uppercase tracking-widest text-white">Price list</a>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ['Lead capture', 'Customer details saved before WhatsApp opens'],
                ['NeoDB records', 'Customers, leads, quotes and follow-ups stored'],
                ['WhatsApp alerts', 'Owner receives new lead alerts via UltraMsg'],
                ['Email campaigns', 'Price list can be sent through Resend'],
              ].map(([title, text]) => (
                <div key={title} className="border border-white/10 bg-white/10 p-5">
                  <h3 className="font-black uppercase">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/60">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#c8481a]">Featured products</p>
              <h2 className="mt-2 text-3xl font-black uppercase sm:text-5xl">Start selling from here</h2>
            </div>
            <a href="/products" className="text-sm font-black uppercase tracking-widest text-[#c8481a]">View all products →</a>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <article key={product.name} className="bg-white p-5 shadow-sm">
                <p className="text-xs font-black uppercase tracking-widest text-[#c8481a]">{product.badge}</p>
                <h3 className="mt-3 min-h-[56px] text-lg font-black leading-snug">{product.name}</h3>
                <p className="mt-2 text-sm text-black/50">{product.category}</p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="text-2xl font-black">{product.price}</span>
                  <LeadCaptureButton productName={product.name} price={product.price} buttonText="Order" className="bg-[#0e0e0e] px-4 py-3 text-xs font-black uppercase tracking-widest text-white" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          <div className="border border-black/10 p-6">
            <h3 className="font-black uppercase">1. Customer orders</h3>
            <p className="mt-3 text-sm leading-6 text-black/60">They click Order, submit details, and WhatsApp opens.</p>
          </div>
          <div className="border border-black/10 p-6">
            <h3 className="font-black uppercase">2. System records</h3>
            <p className="mt-3 text-sm leading-6 text-black/60">NeoDB stores customer, lead, quote and follow-up records.</p>
          </div>
          <div className="border border-black/10 p-6">
            <h3 className="font-black uppercase">3. Sales follows up</h3>
            <p className="mt-3 text-sm leading-6 text-black/60">You receive alerts and use /admin/leads to close deals.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#c8481a] px-4 py-10 text-white sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-black uppercase sm:text-5xl">Need a company quote?</h2>
            <p className="mt-3 text-white/80">Schools, offices, clinics and bulk buyers can submit their full list.</p>
          </div>
          <a href="/quote" className="bg-white px-6 py-4 text-center text-sm font-black uppercase tracking-widest text-[#c8481a]">Request quote</a>
        </div>
      </section>

      <footer className="bg-[#1c1c1c] px-4 py-10 text-white sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          <div>
            <div className="text-2xl font-black uppercase tracking-[0.14em]">Stationery<span className="text-[#e8622e]">Hub</span></div>
            <p className="mt-3 text-sm leading-6 text-white/50">Office supplies and corporate ordering for Botswana.</p>
          </div>
          <div className="text-sm leading-7 text-white/70">
            <p>sales@stationeryhub.co.bw</p>
            <p>letsweletseseatla@stationeryhub.co.bw</p>
            <p>+267 75 560 140 / +267 72 347 712</p>
          </div>
          <div className="grid gap-2 text-sm text-white/70">
            <a href="/products">Products</a>
            <a href="/price-list">Price list</a>
            <a href="/quote">Request quote</a>
            <a href="/admin/leads">Admin leads</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
