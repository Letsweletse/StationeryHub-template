'use client';

import LeadCaptureButton from './components/LeadCaptureButton';

const whatsappNumber = '26775560140';

const products = [
  {
    name: 'HP 3YP17A Colour Printhead',
    category: 'Print Supplies',
    price: 'P 780',
    image: 'https://res.cloudinary.com/dseimivxo/image/upload/v1762681955/H3YP17AE_qupbup.jpg',
    badge: 'In stock',
  },
  {
    name: 'HP 47 Black Ink Cartridge',
    category: 'Print Supplies',
    price: 'P 280',
    image: 'https://res.cloudinary.com/dseimivxo/image/upload/v1762681958/H6ZD61AE_op7tus.png',
    badge: 'Fast moving',
  },
  {
    name: 'Canon 486 Colour Ink Cartridge',
    category: 'Print Supplies',
    price: 'P 756',
    image: 'https://res.cloudinary.com/dseimivxo/image/upload/v1762681956/HC6657AE_b6ra8c.jpg',
    badge: 'Available',
  },
  {
    name: 'HP 154A Neverstop Toner Reload',
    category: 'Toner',
    price: 'P 450',
    image: 'https://res.cloudinary.com/dseimivxo/image/upload/v1762682083/HW1540A_bwvqbi.png',
    badge: 'Bulk ready',
  },
];

const categories = [
  ['Office Stationery', 'Pens, paper, files and everyday desk essentials'],
  ['Printers & Cartridges', 'HP, Canon, toner, ink and print consumables'],
  ['Office Furniture', 'Desks, chairs, storage and workspace setup'],
  ['Technology', 'Laptops, accessories, gadgets and business devices'],
];

const strengths = [
  ['01', 'WhatsApp-first ordering', 'Customers can order directly from any product card with a ready-made WhatsApp message.'],
  ['02', 'Built for Botswana businesses', 'Clear pricing, local contact details, and a business-focused product catalogue.'],
  ['03', 'Bulk and corporate supply', 'Designed for offices, schools, clinics, companies and procurement teams.'],
  ['04', 'Fast quote workflow', 'Reduce friction by moving interested buyers straight into a sales conversation.'],
];

function waLink(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f0ede8] text-[#0e0e0e]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-[#f0ede8]/95 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-5 lg:px-10">
          <a href="#top" className="text-xl font-black uppercase tracking-[0.14em] sm:text-2xl">Stationery<span className="text-[#c8481a]">Hub</span></a>
          <div className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.18em] text-black/55 md:flex">
            <a href="#products" className="hover:text-[#c8481a]">Products</a>
            <a href="#categories" className="hover:text-[#c8481a]">Categories</a>
            <a href="/price-list" className="hover:text-[#c8481a]">Price list</a>
            <a href="/quote" className="hover:text-[#c8481a]">Quote</a>
          </div>
          <a href={waLink('Hello StationeryHub, I need assistance with office supplies.')} target="_blank" rel="noopener noreferrer" className="bg-[#0e0e0e] px-3 py-2 text-xs font-bold uppercase tracking-widest text-[#f0ede8] hover:bg-[#c8481a]">WhatsApp</a>
        </nav>
      </header>

      <section id="top" className="relative flex min-h-screen items-end overflow-hidden bg-[#0e0e0e] pt-16 text-[#f0ede8]">
        <video className="absolute inset-0 h-full w-full object-cover opacity-45" autoPlay muted loop playsInline poster="https://res.cloudinary.com/dseimivxo/image/upload/v1761665745/Hero_4_nimrnz.png">
          <source src="https://res.cloudinary.com/dseimivxo/video/upload/v1762764005/Hero_Section_clip_mazwgq.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/70 to-transparent" />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-5 pb-10 pt-28 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:pb-16">
          <div className="flex flex-col justify-end">
            <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-[#e8622e]"><span className="h-px w-9 bg-[#e8622e]" /> Botswana enterprise office supplier</p>
            <h1 className="hero-jump max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl break-words">Enterprise office <span className="text-[#e8622e]">solutions.</span> Delivered.</h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/70">Premium stationery, cartridges, office furniture, print supplies and technology for teams that need quick quotes and reliable supply.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#products" className="inline-flex items-center justify-center bg-[#c8481a] px-7 py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-[#e8622e]">View products</a>
              <a href="/quote" className="inline-flex items-center justify-center border border-white/30 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-white/10">Request quote</a>
            </div>
          </div>
          <div className="grid content-end gap-3 sm:grid-cols-2 lg:pb-4">
            {[
              ['100+', 'Products in stock'],
              ['24hr', 'Gaborone quote response'],
              ['P280+', 'Starting cartridge price'],
              ['Bulk', 'Business ordering'],
            ].map(([value, label]) => (
              <div key={label} className="border border-white/10 bg-black/45 p-5 backdrop-blur">
                <div className="text-3xl font-black uppercase text-white">{value}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-white/45">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="overflow-hidden bg-[#0e0e0e] py-4 text-[#f0ede8]/50">
        <div className="flex w-max animate-[marquee_30s_linear_infinite] gap-10 whitespace-nowrap text-xs font-bold uppercase tracking-[0.22em]">
          {['Print Supplies', 'Office Furniture', 'Technology', 'Stationery', 'Bulk Orders', 'WhatsApp Ordering', 'Gaborone Delivery', 'Enterprise Solutions', 'Print Supplies', 'Office Furniture'].map((item, index) => (
            <span key={`${item}-${index}`} className="flex items-center gap-3"><span className="h-1 w-1 rounded-full bg-[#c8481a]" />{item}</span>
          ))}
        </div>
      </div>

      <section id="products" className="mx-auto max-w-7xl px-5 py-20 lg:px-10">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#c8481a]">Featured products</p>
            <h2 className="max-w-3xl text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">Premium office supplies with instant ordering</h2>
          </div>
          <a href="/products" className="text-sm font-bold uppercase tracking-widest text-black/55 hover:text-[#c8481a]">All products</a>
        </div>
        <div className="grid gap-px overflow-hidden border border-black/10 bg-black/10 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <article key={product.name} className="group bg-[#f0ede8] transition hover:z-10 hover:shadow-2xl">
              <div className="relative aspect-square overflow-hidden bg-[#e8e4dd]">
                <img src={product.image} alt={product.name} className="h-full w-full object-contain p-8 transition duration-500 group-hover:scale-110" />
                <span className="absolute left-4 top-4 bg-[#0e0e0e] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#f0ede8]">{product.badge}</span>
              </div>
              <div className="border-t border-black/10 p-6">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c8481a]">{product.category}</p>
                <h3 className="mt-3 min-h-[56px] text-lg font-bold leading-snug">{product.name}</h3>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-3xl font-black uppercase">{product.price}</span>
                  <LeadCaptureButton productName={product.name} price={product.price} buttonText="Order" className="inline-flex items-center gap-2 bg-[#0e0e0e] px-4 py-3 text-xs font-black uppercase tracking-widest text-[#f0ede8] hover:bg-[#c8481a]" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="categories" className="bg-[#e8e4dd] px-5 py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#c8481a]">Browse by category</p>
          <h2 className="text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">Everything your office needs</h2>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map(([title, text]) => (
              <a key={title} href={waLink(`Hello StationeryHub, I am looking for ${title}.`)} target="_blank" rel="noopener noreferrer" className="group border border-black/10 bg-white p-6 transition hover:-translate-y-1 hover:border-[#c8481a] hover:shadow-xl">
                <h3 className="text-lg font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-black/55">{text}</p>
                <span className="mt-6 inline-flex text-xs font-black uppercase tracking-widest text-[#c8481a]">Enquire</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:px-10">
        <div>
          <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#c8481a]">Why StationeryHub</p>
          <h2 className="text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">Botswana's trusted office partner</h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-black/55">From a single cartridge to a full office supply order, StationeryHub keeps the buying process simple: choose, WhatsApp, get quoted, and move.</p>
          <div className="mt-10 divide-y divide-black/10 border-y border-black/10">
            {strengths.map(([number, title, text]) => (
              <div key={title} className="grid grid-cols-[48px_1fr] gap-5 py-6">
                <span className="text-xl font-black text-[#c8481a]">{number}</span>
                <div><h3 className="font-black">{title}</h3><p className="mt-2 text-sm leading-7 text-black/55">{text}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative min-h-[420px] overflow-hidden bg-[#e8e4dd]">
          <img src="https://res.cloudinary.com/dseimivxo/image/upload/v1761665745/Hero_6_lu4wuu.png" alt="StationeryHub office setup" className="h-full w-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white"><p className="text-xs font-black uppercase tracking-[0.25em] text-[#e8622e]">Direct support</p><h3 className="mt-2 text-3xl font-black uppercase">Call or WhatsApp +267 75 560 140 / +267 72 347 712</h3></div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#c8481a] px-5 py-16 text-white lg:px-10">
        <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center">
          <div><h2 className="text-4xl font-black uppercase leading-none tracking-tight md:text-5xl">Ready to order?</h2><p className="mt-4 max-w-xl text-white/80">Send your product list, cartridge model, or office requirement. We will respond with availability and pricing.</p></div>
          <div className="flex flex-col gap-3 sm:flex-row"><a href="/quote" className="bg-white px-7 py-4 text-center text-sm font-black uppercase tracking-widest text-[#c8481a]">Request quote</a><a href="mailto:sales@stationeryhub.co.bw" className="border border-white/40 px-7 py-4 text-center text-sm font-black uppercase tracking-widest text-white">Email sales</a></div>
        </div>
      </section>

      <footer className="bg-[#1c1c1c] px-5 py-12 text-[#f0ede8] lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div><div className="text-3xl font-black uppercase tracking-[0.18em]">Stationery<span className="text-[#e8622e]">Hub</span></div><p className="mt-4 max-w-sm text-sm leading-7 text-white/45">Botswana's premier enterprise office solutions provider. Quality you can count on, service you remember.</p></div>
          <div><h3 className="text-xs font-black uppercase tracking-[0.25em] text-white/40">Contact</h3><div className="mt-4 space-y-2 text-sm text-white/60"><p>+267 75 560 140 / +267 72 347 712</p><p>sales@stationeryhub.co.bw</p><p>Gaborone, Botswana</p></div></div>
          <div><h3 className="text-xs font-black uppercase tracking-[0.25em] text-white/40">Quick links</h3><div className="mt-4 grid gap-2 text-sm text-white/60"><a href="#products">Products</a><a href="/price-list">Price list</a><a href="/quote">Request quote</a><a href={waLink('Hello StationeryHub, I need help.')} target="_blank" rel="noopener noreferrer">WhatsApp</a></div></div>
        </div>
      </footer>

      <a href={waLink('Hello StationeryHub, I need help with an order.')} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp StationeryHub" className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-2xl shadow-green-500/30 transition hover:scale-110 sm:bottom-6 sm:right-6">
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.52 3.48A11.85 11.85 0 0 0 12.07 0C5.5 0 .16 5.34.16 11.91c0 2.1.55 4.16 1.6 5.97L.06 24l6.27-1.64a11.9 11.9 0 0 0 5.74 1.46h.01c6.57 0 11.91-5.34 11.91-11.91a11.86 11.86 0 0 0-3.47-8.43ZM12.08 21.8h-.01a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.72.98.99-3.63-.24-.37a9.86 9.86 0 0 1-1.51-5.28c0-5.45 4.44-9.89 9.9-9.89a9.82 9.82 0 0 1 6.99 2.9 9.83 9.83 0 0 1 2.9 6.99c-.01 5.45-4.45 9.89-9.9 9.89Zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
        </svg>
      </a>

      <style jsx global>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes heroJump {
          0%, 100% { transform: translateY(0) scale(1); }
          18% { transform: translateY(-12px) scale(1.01); }
          34% { transform: translateY(0) scale(1); }
          46% { transform: translateY(-6px) scale(1.005); }
          58% { transform: translateY(0) scale(1); }
        }
        .hero-jump {
          animation: heroJump 3.8s ease-in-out infinite;
          transform-origin: center bottom;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-jump { animation: none; }
        }
      `}</style>
    </main>
  );
}
