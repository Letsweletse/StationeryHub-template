'use client';

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
    name: 'Canon PG-485 Standard Black Ink',
    category: 'Print Supplies',
    price: 'P 780',
    image: 'https://res.cloudinary.com/dseimivxo/image/upload/v1762696702/CPG-485XL_ctheag.jpg',
    badge: 'In stock',
  },
  {
    name: 'HP 154A Neverstop Toner Reload',
    category: 'Toner',
    price: 'P 450',
    image: 'https://res.cloudinary.com/dseimivxo/image/upload/v1762682083/HW1540A_bwvqbi.png',
    badge: 'Bulk ready',
  },
  {
    name: 'HP 925e Evomore High Yield Magenta',
    category: 'Ink Cartridge',
    price: 'P 560',
    image: 'https://res.cloudinary.com/dseimivxo/image/upload/v1762681957/HP4K0W0PE_nissve.jpg',
    badge: 'New stock',
  },
];

const categories = [
  { icon: '✏️', title: 'Office Stationery', text: 'Pens, paper, files and everyday desk essentials' },
  { icon: '🖨️', title: 'Printers & Cartridges', text: 'HP, Canon, toner, ink and print consumables' },
  { icon: '🪑', title: 'Office Furniture', text: 'Desks, chairs, storage and workspace setup' },
  { icon: '💻', title: 'Technology', text: 'Laptops, accessories, gadgets and business devices' },
  { icon: '📦', title: 'Office Supplies', text: 'Bulk office orders for teams and organisations' },
];

const solutionImages = [
  { src: 'https://res.cloudinary.com/dseimivxo/image/upload/v1761665745/Hero_4_nimrnz.png', label: 'Enterprise setup' },
  { src: 'https://res.cloudinary.com/dseimivxo/image/upload/v1761665744/Hero_1_pymjmc.png', label: 'Workstations' },
  { src: 'https://res.cloudinary.com/dseimivxo/image/upload/v1761665743/Hero_2_zmt98u.png', label: 'Print centre' },
  { src: 'https://res.cloudinary.com/dseimivxo/image/upload/v1761665745/Hero_6_lu4wuu.png', label: 'Boardroom' },
  { src: 'https://res.cloudinary.com/dseimivxo/image/upload/v1761665741/Hero_5_furzrq.png', label: 'Reception' },
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

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function WhatsAppIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.559 4.14 1.535 5.875L.057 23.214a.75.75 0 0 0 .928.928l5.339-1.478A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22.5c-2.04 0-3.95-.533-5.605-1.463l-.401-.233-4.152 1.149 1.149-4.152-.233-.401A10.455 10.455 0 0 1 1.5 12c0-5.79 4.71-10.5 10.5-10.5S22.5 6.21 22.5 12 17.79 22.5 12 22.5z" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f0ede8] text-[#0e0e0e]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-[#f0ede8]/95 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-10">
          <a href="#top" className="text-2xl font-black uppercase tracking-[0.18em]">
            Stationery<span className="text-[#c8481a]">Hub</span>
          </a>
          <div className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.18em] text-black/55 md:flex">
            <a href="#products" className="hover:text-[#c8481a]">Products</a>
            <a href="#solutions" className="hover:text-[#c8481a]">Solutions</a>
            <a href="#categories" className="hover:text-[#c8481a]">Categories</a>
            <a href="#about" className="hover:text-[#c8481a]">About</a>
          </div>
          <a href={waLink('Hello StationeryHub, I need assistance with office supplies.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#0e0e0e] px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#f0ede8] transition hover:bg-[#c8481a]">
            <WhatsAppIcon /> WhatsApp
          </a>
        </nav>
      </header>

      <section id="top" className="relative flex min-h-screen items-end overflow-hidden bg-[#0e0e0e] pt-16 text-[#f0ede8]">
        <video className="absolute inset-0 h-full w-full object-cover opacity-45" autoPlay muted loop playsInline poster="https://res.cloudinary.com/dseimivxo/image/upload/v1761665745/Hero_4_nimrnz.png">
          <source src="https://res.cloudinary.com/dseimivxo/video/upload/v1762764005/Hero_Section_clip_mazwgq.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/70 to-transparent" />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-5 pb-10 pt-28 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:pb-16">
          <div className="flex flex-col justify-end">
            <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-[#e8622e]"><span className="h-px w-9 bg-[#e8622e]" /> Botswana enterprise office supplier</p>
            <h1 className="max-w-4xl text-6xl font-black uppercase leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
              Enterprise office <span className="text-[#e8622e]">solutions.</span> Delivered.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/70">
              Premium stationery, cartridges, office furniture, print supplies and technology for teams that need quick quotes and reliable supply.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#products" className="inline-flex items-center justify-center gap-2 bg-[#c8481a] px-7 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-[#e8622e]">
                View products <ArrowIcon />
              </a>
              <a href={waLink('Hello StationeryHub, I need enterprise office supplies for my business.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-white/30 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:border-white hover:bg-white/10">
                Request quote
              </a>
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
          {['Print Supplies', 'Office Furniture', 'Technology', 'Stationery', 'Bulk Orders', 'WhatsApp Ordering', 'Gaborone Delivery', 'Enterprise Solutions', 'Print Supplies', 'Office Furniture', 'Technology', 'Stationery'].map((item, index) => (
            <span key={`${item}-${index}`} className="flex items-center gap-3"><span className="h-1 w-1 rounded-full bg-[#c8481a]" />{item}</span>
          ))}
        </div>
      </div>

      <section id="products" className="mx-auto max-w-7xl px-5 py-20 lg:px-10">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#c8481a]">Featured products</p>
            <h2 className="max-w-3xl text-5xl font-black uppercase leading-none tracking-tight md:text-6xl">Premium office supplies with instant ordering</h2>
          </div>
          <a href="/products" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-black/55 transition hover:text-[#c8481a]">All products <ArrowIcon /></a>
        </div>

        <div className="grid gap-px overflow-hidden border border-black/10 bg-black/10 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article key={product.name} className="group bg-[#f0ede8] transition hover:z-10 hover:shadow-2xl">
              <div className="relative aspect-square overflow-hidden bg-[#e8e4dd]">
                <img src={product.image} alt={product.name} className="h-full w-full object-contain p-8 transition duration-500 group-hover:scale-110" />
                <span className="absolute left-4 top-4 bg-[#0e0e0e] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#f0ede8]">{product.badge}</span>
              </div>
              <div className="border-t border-black/10 p-6">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c8481a]">{product.category}</p>
                <h3 className="mt-3 min-h-[56px] text-lg font-bold leading-snug">{product.name}</h3>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="text-3xl font-black uppercase">{product.price}</span>
                  <a href={waLink(`Hello StationeryHub, I want to order ${product.name} for ${product.price}.`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#0e0e0e] px-4 py-3 text-xs font-black uppercase tracking-widest text-[#f0ede8] transition hover:bg-[#c8481a]">
                    <WhatsAppIcon /> Order
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="solutions" className="bg-[#0e0e0e] px-5 py-20 text-[#f0ede8] lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#e8622e]">Premium office solutions</p>
            <h2 className="text-5xl font-black uppercase leading-none tracking-tight md:text-6xl">A sharper buying experience for serious offices</h2>
          </div>
          <div className="grid gap-px overflow-hidden bg-white/10 lg:grid-cols-12">
            {solutionImages.map((item, index) => (
              <div key={item.label} className={`${index === 0 ? 'lg:col-span-7 lg:row-span-2' : 'lg:col-span-5'} group relative min-h-[260px] overflow-hidden bg-[#1c1c1c]`}>
                <img src={item.src} alt={item.label} className="h-full min-h-[260px] w-full object-cover opacity-80 transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute bottom-5 left-5 bg-black/70 px-3 py-2 text-xs font-black uppercase tracking-[0.22em] text-white backdrop-blur">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="categories" className="bg-[#e8e4dd] px-5 py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#c8481a]">Browse by category</p>
            <h2 className="text-5xl font-black uppercase leading-none tracking-tight md:text-6xl">Everything your office needs</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((category) => (
              <a key={category.title} href={waLink(`Hello StationeryHub, I am looking for ${category.title}.`)} target="_blank" rel="noopener noreferrer" className="group border border-black/10 bg-white p-6 transition hover:-translate-y-1 hover:border-[#c8481a] hover:shadow-xl">
                <div className="text-4xl">{category.icon}</div>
                <h3 className="mt-5 text-lg font-black">{category.title}</h3>
                <p className="mt-3 text-sm leading-6 text-black/55">{category.text}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#c8481a]">Enquire <ArrowIcon /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:px-10">
        <div>
          <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#c8481a]">Why StationeryHub</p>
          <h2 className="text-5xl font-black uppercase leading-none tracking-tight md:text-6xl">Botswana's trusted office partner</h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-black/55">
            From a single cartridge to a full office supply order, StationeryHub keeps the buying process simple: choose, WhatsApp, get quoted, and move.
          </p>
          <div className="mt-10 divide-y divide-black/10 border-y border-black/10">
            {strengths.map(([number, title, text]) => (
              <div key={title} className="grid grid-cols-[48px_1fr] gap-5 py-6">
                <span className="text-xl font-black text-[#c8481a]">{number}</span>
                <div>
                  <h3 className="font-black">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-black/55">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative min-h-[420px] overflow-hidden bg-[#e8e4dd]">
          <img src="https://res.cloudinary.com/dseimivxo/image/upload/v1761665745/Hero_6_lu4wuu.png" alt="StationeryHub office setup" className="h-full w-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#e8622e]">Direct support</p>
            <h3 className="mt-2 text-3xl font-black uppercase">Call or WhatsApp +267 755 60140</h3>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#c8481a] px-5 py-16 text-white lg:px-10">
        <div className="absolute -left-6 top-1/2 -translate-y-1/2 text-[12rem] font-black uppercase tracking-widest text-white/5">Enterprise</div>
        <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="text-5xl font-black uppercase leading-none tracking-tight">Ready to order?</h2>
            <p className="mt-4 max-w-xl text-white/80">Send your product list, cartridge model, or office requirement. We will respond with availability and pricing.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={waLink('Hello StationeryHub, please assist me with a quote.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-white px-7 py-4 text-sm font-black uppercase tracking-widest text-[#c8481a] transition hover:-translate-y-1 hover:shadow-xl">
              WhatsApp quote <WhatsAppIcon />
            </a>
            <a href="mailto:sales@stationeryhub.co.bw" className="inline-flex items-center justify-center gap-2 border border-white/40 px-7 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:bg-white/10">
              Email sales
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-[#1c1c1c] px-5 py-12 text-[#f0ede8] lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="text-3xl font-black uppercase tracking-[0.18em]">Stationery<span className="text-[#e8622e]">Hub</span></div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/45">Botswana's premier enterprise office solutions provider. Quality you can count on, service you remember.</p>
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.25em] text-white/40">Contact</h3>
            <div className="mt-4 space-y-2 text-sm text-white/60">
              <p>+267 755 60140</p>
              <p>sales@stationeryhub.co.bw</p>
              <p>Gaborone, Botswana</p>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.25em] text-white/40">Quick links</h3>
            <div className="mt-4 grid gap-2 text-sm text-white/60">
              <a href="#products" className="hover:text-white">Products</a>
              <a href="#solutions" className="hover:text-white">Solutions</a>
              <a href="#categories" className="hover:text-white">Categories</a>
              <a href={waLink('Hello StationeryHub, I need help.')} target="_blank" rel="noopener noreferrer" className="hover:text-white">WhatsApp</a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/25 md:flex-row">
          <p>© 2026 IBLIM Enterprise T/A StationeryHub. All rights reserved.</p>
          <p>Built for fast WhatsApp ordering and enterprise office supply.</p>
        </div>
      </footer>

      <a href={waLink('Hello StationeryHub, I need help with an order.')} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp StationeryHub" className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-2xl shadow-green-500/30 transition hover:scale-110">
        <WhatsAppIcon className="h-7 w-7" />
      </a>

      <style jsx global>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </main>
  );
}
