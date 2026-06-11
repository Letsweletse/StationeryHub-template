'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

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
  ['01', 'WhatsApp-first ordering', 'Order directly from product cards with a ready-made WhatsApp message.'],
  ['02', 'Built for Botswana businesses', 'Clear pricing, local contact details, and a business-focused catalogue.'],
  ['03', 'Bulk and corporate supply', 'Designed for offices, schools, clinics, companies and procurement teams.'],
  ['04', 'Fast quote workflow', 'Move interested buyers straight into a sales conversation.'],
];

const businessSolutions = [
  ['WhatsApp automation', 'Auto-replies, lead capture and customer follow-up.'],
  ['Corporate procurement support', 'Fast quote workflows for teams and recurring office orders.'],
  ['Branding and content', 'Product flyers, social content and business design support.'],
  ['Platform solutions', 'Digital tools to improve operations and visibility.'],
  ['Analytics and reporting', 'Track enquiries, product interest and ordering activity.'],
  ['Business systems', 'Simple systems that help companies move faster.'],
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

function useCountUp(target: number, delay = 0, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf = 0;
    const timer = window.setTimeout(() => {
      const start = performance.now();
      const animate = (time: number) => {
        const progress = Math.min((time - start) / duration, 1);
        setValue(Math.round(target * progress));
        if (progress < 1) raf = requestAnimationFrame(animate);
      };
      raf = requestAnimationFrame(animate);
    }, delay);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [target, delay, duration]);

  return value;
}

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [pointerActive, setPointerActive] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [cursorRing, setCursorRing] = useState({ x: 0, y: 0 });
  const [cursorLarge, setCursorLarge] = useState(false);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const statProducts = useCountUp(100, 800, 1200);
  const statClients = useCountUp(120, 900, 1200);
  const statPrice = useCountUp(280, 1000, 1200);

  useEffect(() => {
    const onScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
      setProgress(Math.min(pct, 100));
      setScrolled(window.scrollY > 20);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const move = (event: MouseEvent) => {
      setPointerActive(true);
      setCursor({ x: event.clientX, y: event.clientY });
    };

    document.addEventListener('mousemove', move);
    return () => document.removeEventListener('mousemove', move);
  }, []);

  useEffect(() => {
    if (!pointerActive) return;

    let frame = 0;
    const animate = () => {
      setCursorRing((prev) => ({
        x: prev.x + (cursor.x - prev.x) * 0.12,
        y: prev.y + (cursor.y - prev.y) * 0.12,
      }));
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [cursor, pointerActive]);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.12 }
    );

    const staggerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.querySelectorAll<HTMLElement>('[data-stagger-item]').forEach((element, index) => {
            window.setTimeout(() => element.classList.add('visible'), index * 80);
          });
          staggerObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.08 }
    );

    document.querySelectorAll('.reveal-up').forEach((element) => revealObserver.observe(element));
    document.querySelectorAll('[data-stagger-group]').forEach((element) => staggerObserver.observe(element));

    return () => {
      revealObserver.disconnect();
      staggerObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let active = true;
    const stop = () => { active = false; };
    const start = () => { active = true; };

    scroller.addEventListener('mouseenter', stop);
    scroller.addEventListener('mouseleave', start);

    const id = window.setInterval(() => {
      if (!active) return;
      scroller.scrollLeft += 1;
      if (scroller.scrollLeft >= scroller.scrollWidth - scroller.clientWidth) scroller.scrollLeft = 0;
    }, 20);

    return () => {
      scroller.removeEventListener('mouseenter', stop);
      scroller.removeEventListener('mouseleave', start);
      window.clearInterval(id);
    };
  }, []);

  const hoverProps = {
    onMouseEnter: () => setCursorLarge(true),
    onMouseLeave: () => setCursorLarge(false),
  };

  const stats = useMemo(() => [
    { value: `${statProducts}+`, label: 'Products in stock' },
    { value: `${statClients}+`, label: 'Business clients' },
    { value: '24hr', label: 'Delivery in Gaborone' },
    { value: `P${statPrice}`, label: 'Starting price' },
  ], [statProducts, statClients, statPrice]);

  return (
    <main className="min-h-screen bg-[#f0ede8] text-[#0e0e0e]">
      <div className="fixed left-0 top-0 z-[70] h-[2px] bg-[#c8481a] transition-[width] duration-75" style={{ width: `${progress}%` }} />

      {pointerActive && (
        <>
          <div className="pointer-events-none fixed z-[100] hidden rounded-full bg-[#c8481a] mix-blend-multiply md:block" style={{ left: cursor.x, top: cursor.y, width: cursorLarge ? 14 : 9, height: cursorLarge ? 14 : 9, transform: 'translate(-50%, -50%)', transition: 'width .15s, height .15s' }} />
          <div className="pointer-events-none fixed z-[99] hidden rounded-full border border-[#c8481a] md:block" style={{ left: cursorRing.x, top: cursorRing.y, width: cursorLarge ? 54 : 38, height: cursorLarge ? 54 : 38, transform: 'translate(-50%, -50%)', transition: 'width .2s, height .2s' }} />
        </>
      )}

      <header className={`fixed inset-x-0 top-0 z-50 border-b border-black/10 backdrop-blur-xl transition-all duration-500 ${scrolled ? 'bg-[#f0ede8]/98 shadow-[0_2px_24px_rgba(14,14,14,0.09)]' : 'bg-[#f0ede8]/96'}`}>
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-10">
          <a href="#top" className="text-2xl font-black uppercase tracking-[0.18em]">Stationery<span className="text-[#c8481a]">Hub</span></a>
          <div className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.18em] text-black/55 md:flex">
            <a href="#products" className="nav-link">Products</a>
            <a href="#solutions" className="nav-link">Solutions</a>
            <a href="#categories" className="nav-link">Categories</a>
            <a href="#digital" className="nav-link">Digital</a>
            <a href="#about" className="nav-link">About</a>
          </div>
          <a href={waLink('Hello StationeryHub, I need assistance with office supplies.')} target="_blank" rel="noopener noreferrer" {...hoverProps} className="inline-flex items-center gap-2 bg-[#0e0e0e] px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#f0ede8] transition hover:-translate-y-0.5 hover:bg-[#c8481a]">
            <WhatsAppIcon /> WhatsApp
          </a>
        </nav>
      </header>

      <section id="top" className="relative flex min-h-screen flex-col overflow-hidden bg-[#0e0e0e] pt-16 text-[#f0ede8]">
        <video className="absolute inset-0 h-full w-full object-cover opacity-45" autoPlay muted loop playsInline poster="https://res.cloudinary.com/dseimivxo/image/upload/v1761665745/Hero_4_nimrnz.png">
          <source src="https://res.cloudinary.com/dseimivxo/video/upload/v1762764005/Hero_Section_clip_mazwgq.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/35 to-transparent" />
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-10 pt-28 lg:px-10">
          <p className="hero-animate mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-[#e8622e]" style={{ animationDelay: '.45s' }}><span className="h-px w-9 bg-[#e8622e]" /> Botswana's premier enterprise office supplier</p>
          <h1 className="max-w-5xl overflow-hidden text-6xl font-black uppercase leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
            {['Enterprise', 'Office Solutions.', 'Delivered.'].map((line, index) => (
              <span key={line} className="block overflow-hidden">
                <span className="hero-line-up block" style={{ animationDelay: `${0.6 + index * 0.15}s` }}>{line === 'Office Solutions.' ? <>Office <span className="text-[#e8622e]">Solutions.</span></> : line}</span>
              </span>
            ))}
          </h1>
          <p className="hero-animate mt-7 max-w-xl text-base leading-8 text-white/70" style={{ animationDelay: '1.1s' }}>Premium stationery, office furniture, print supplies and technology. Bulk ordering via WhatsApp — no forms, no friction.</p>
          <div className="hero-animate mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: '1.25s' }}>
            <a href="#products" {...hoverProps} className="inline-flex items-center justify-center gap-2 bg-[#c8481a] px-7 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:-translate-y-0.5 hover:bg-[#e8622e]">View products <ArrowIcon /></a>
            <a href={waLink('Hello StationeryHub, I need enterprise office supplies for my business.')} target="_blank" rel="noopener noreferrer" {...hoverProps} className="inline-flex items-center justify-center gap-2 border border-white/30 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:border-white hover:bg-white/10">WhatsApp business</a>
          </div>
          <div className="hero-animate absolute bottom-32 left-5 hidden items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/45 lg:flex lg:left-10" style={{ animationDelay: '1.45s' }}><span>Scroll to explore</span><span className="relative h-px w-10 overflow-hidden bg-white/20 after:absolute after:left-[-100%] after:top-0 after:h-full after:w-full after:bg-[#c8481a] after:content-[''] after:animate-[scrollPulse_2s_ease-in-out_infinite]" /></div>
        </div>
        <div className="relative z-10 grid grid-cols-2 border-t border-white/10 bg-black/55 backdrop-blur md:grid-cols-4">
          {stats.map((item, index) => <div key={item.label} className={`p-5 md:p-6 ${index < stats.length - 1 ? 'border-r border-white/10' : ''}`}><div className="text-3xl font-black uppercase text-white">{item.value}</div><div className="mt-1 text-xs uppercase tracking-[0.2em] text-white/45">{item.label}</div></div>)}
        </div>
      </section>

      <div className="overflow-hidden bg-[#0e0e0e] py-4 text-[#f0ede8]/50"><div className="flex w-max animate-[marquee_28s_linear_infinite] gap-10 whitespace-nowrap text-xs font-bold uppercase tracking-[0.22em]">{['Print Supplies', 'Office Furniture', 'Technology', 'Stationery', 'Bulk Orders', 'WhatsApp Ordering', 'Gaborone Delivery', 'Enterprise Solutions', 'Print Supplies', 'Office Furniture', 'Technology', 'Stationery'].map((item, index) => <span key={`${item}-${index}`} className="flex items-center gap-3"><span className="h-1 w-1 rounded-full bg-[#c8481a]" />{item}</span>)}</div></div>

      <section id="products" className="mx-auto max-w-7xl px-5 py-20 lg:px-10">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="reveal-up mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#c8481a]">Featured products</p><h2 className="reveal-up max-w-3xl text-5xl font-black uppercase leading-none tracking-tight md:text-6xl" style={{ transitionDelay: '.1s' }}>Premium office supplies with instant ordering</h2></div><a href="/products" {...hoverProps} className="reveal-up inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-black/55 transition hover:text-[#c8481a]" style={{ transitionDelay: '.2s' }}>All products <ArrowIcon /></a></div>
        <div data-stagger-group className="grid gap-px overflow-hidden border border-black/10 bg-black/10 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => <article key={product.name} data-stagger-item className="stagger-card group bg-[#f0ede8] transition hover:z-10 hover:shadow-2xl"><div className="relative aspect-square overflow-hidden bg-[#e8e4dd]"><img src={product.image} alt={product.name} className="h-full w-full object-contain p-8 transition duration-500 group-hover:scale-110" /><span className="absolute left-4 top-4 bg-[#0e0e0e] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#f0ede8]">{product.badge}</span></div><div className="border-t border-black/10 p-6"><p className="text-xs font-black uppercase tracking-[0.22em] text-[#c8481a]">{product.category}</p><h3 className="mt-3 min-h-[56px] text-lg font-bold leading-snug">{product.name}</h3><div className="mt-6 flex items-center justify-between gap-4"><span className="text-3xl font-black uppercase">{product.price}</span><a href={waLink(`Hello StationeryHub, I want to order ${product.name} for ${product.price}.`)} target="_blank" rel="noopener noreferrer" {...hoverProps} className="inline-flex items-center gap-2 bg-[#0e0e0e] px-4 py-3 text-xs font-black uppercase tracking-widest text-[#f0ede8] transition hover:bg-[#c8481a]"><WhatsAppIcon /> Order</a></div></div></article>)}
        </div>
      </section>

      <div className="overflow-hidden bg-[#0e0e0e] py-10"><div className="flex w-max animate-[marquee_20s_linear_infinite] gap-8 whitespace-nowrap"><span className="big-word">STATIONERY</span><span className="big-dot">·</span><span className="big-word">PRINT SUPPLIES</span><span className="big-dot">·</span><span className="big-word">OFFICE FURNITURE</span><span className="big-dot">·</span><span className="big-word">TECHNOLOGY</span><span className="big-dot">·</span><span className="big-word">BOTSWANA</span><span className="big-dot">·</span><span className="big-word">STATIONERY</span><span className="big-dot">·</span><span className="big-word">PRINT SUPPLIES</span><span className="big-dot">·</span><span className="big-word">OFFICE FURNITURE</span></div></div>

      <section id="solutions" className="bg-[#0e0e0e] px-5 py-20 text-[#f0ede8] lg:px-10"><div className="mx-auto max-w-7xl"><div className="mb-12 max-w-3xl"><p className="reveal-up mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#e8622e]">Premium office solutions</p><h2 className="reveal-up text-5xl font-black uppercase leading-none tracking-tight md:text-6xl" style={{ transitionDelay: '.1s' }}>Experience the StationeryHub difference</h2></div><div data-stagger-group className="grid gap-px overflow-hidden bg-white/10 lg:grid-cols-12">{solutionImages.map((item, index) => <div key={item.label} data-stagger-item className={`${index === 0 ? 'lg:col-span-7 lg:row-span-2' : 'lg:col-span-5'} stagger-card group relative min-h-[260px] overflow-hidden bg-[#1c1c1c]`}><img src={item.src} alt={item.label} className="h-full min-h-[260px] w-full object-cover opacity-80 transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" /><span className="absolute bottom-5 left-5 bg-black/70 px-3 py-2 text-xs font-black uppercase tracking-[0.22em] text-white backdrop-blur">{item.label}</span></div>)}</div></div></section>

      <section id="categories" className="bg-[#e8e4dd] px-5 py-20 lg:px-10"><div className="mx-auto max-w-7xl"><div className="mb-12"><p className="reveal-up mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#c8481a]">Browse by category</p><h2 className="reveal-up text-5xl font-black uppercase leading-none tracking-tight md:text-6xl" style={{ transitionDelay: '.1s' }}>Everything your office needs</h2></div><div data-stagger-group className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{categories.map((category) => <a key={category.title} data-stagger-item href={waLink(`Hello StationeryHub, I am looking for ${category.title}.`)} target="_blank" rel="noopener noreferrer" {...hoverProps} className="stagger-card group border border-black/10 bg-white p-6 transition hover:-translate-y-1 hover:border-[#c8481a] hover:shadow-xl"><div className="text-4xl">{category.icon}</div><h3 className="mt-5 text-lg font-black">{category.title}</h3><p className="mt-3 text-sm leading-6 text-black/55">{category.text}</p><span className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#c8481a]">Enquire <ArrowIcon /></span></a>)}</div></div></section>

      <section id="about" className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:px-10"><div><p className="reveal-up mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#c8481a]">Why StationeryHub</p><h2 className="reveal-up text-5xl font-black uppercase leading-none tracking-tight md:text-6xl" style={{ transitionDelay: '.1s' }}>Botswana's most trusted office partner</h2><p className="reveal-up mt-6 max-w-xl text-base leading-8 text-black/55" style={{ transitionDelay: '.2s' }}>From a single pen to a full office fit-out — we handle it. Enterprise pricing, same-day Gaborone quotes, and instant WhatsApp ordering that actually works.</p><div data-stagger-group className="mt-10 divide-y divide-black/10 border-y border-black/10">{strengths.map(([number, title, text]) => <div key={title} data-stagger-item className="stagger-card grid grid-cols-[48px_1fr] gap-5 py-6"><span className="text-xl font-black text-[#c8481a]">{number}</span><div><h3 className="font-black">{title}</h3><p className="mt-2 text-sm leading-7 text-black/55">{text}</p></div></div>)}</div></div><div className="reveal-up relative min-h-[420px] overflow-hidden bg-[#e8e4dd]" style={{ transitionDelay: '.2s' }}><img src="https://res.cloudinary.com/dseimivxo/image/upload/v1761665745/Hero_6_lu4wuu.png" alt="StationeryHub office setup" className="h-full w-full object-cover transition duration-700 hover:scale-105" /><div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white"><p className="text-xs font-black uppercase tracking-[0.25em] text-[#e8622e]">Direct support</p><h3 className="mt-2 text-3xl font-black uppercase">Call or WhatsApp +267 755 60140</h3></div></div></section>

      <section id="digital" className="bg-[#101010] px-5 py-20 text-[#f0ede8] lg:px-10"><div className="mx-auto max-w-7xl"><div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="reveal-up mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#e8622e]">Digital business solutions</p><h2 className="reveal-up text-5xl font-black uppercase leading-none tracking-tight md:text-6xl" style={{ transitionDelay: '.1s' }}>Transform your business operations</h2></div><a href="/business" {...hoverProps} className="reveal-up inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white/45 transition hover:text-[#e8622e]" style={{ transitionDelay: '.2s' }}>Business solutions <ArrowIcon /></a></div><div ref={scrollerRef} className="hide-scrollbar flex gap-5 overflow-x-auto pb-3">{businessSolutions.map(([title, text], index) => <div key={title} className="reveal-up min-w-[290px] max-w-[290px] border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-[#e8622e]" style={{ transitionDelay: `${index * 0.08}s` }}><p className="text-xs font-black uppercase tracking-[0.24em] text-[#e8622e]">0{index + 1}</p><h3 className="mt-4 text-2xl font-black uppercase">{title}</h3><p className="mt-4 text-sm leading-7 text-white/60">{text}</p></div>)}</div></div></section>

      <section className="relative overflow-hidden bg-[#c8481a] px-5 py-16 text-white lg:px-10"><div className="absolute -left-6 top-1/2 -translate-y-1/2 text-[12rem] font-black uppercase tracking-widest text-white/5">Enterprise</div><div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-center"><div><h2 className="reveal-up text-5xl font-black uppercase leading-none tracking-tight">Ready to equip your business?</h2><p className="reveal-up mt-4 max-w-xl text-white/80" style={{ transitionDelay: '.1s' }}>Get a custom quote in under an hour. Enterprise pricing available for bulk orders.</p></div><div className="flex flex-col gap-3 sm:flex-row"><a href={waLink('Hello StationeryHub, please assist me with a quote.')} target="_blank" rel="noopener noreferrer" {...hoverProps} className="reveal-up inline-flex items-center justify-center gap-2 bg-white px-7 py-4 text-sm font-black uppercase tracking-widest text-[#c8481a] transition hover:-translate-y-1 hover:shadow-xl" style={{ transitionDelay: '.2s' }}>WhatsApp quote <WhatsAppIcon /></a><a href="tel:+26775560140" {...hoverProps} className="reveal-up inline-flex items-center justify-center gap-2 border border-white/40 px-7 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:bg-white/10" style={{ transitionDelay: '.3s' }}>Call now</a></div></div></section>

      <footer className="bg-[#1c1c1c] px-5 py-12 text-[#f0ede8] lg:px-10"><div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]"><div><div className="text-3xl font-black uppercase tracking-[0.18em]">Stationery<span className="text-[#e8622e]">Hub</span></div><p className="mt-4 max-w-sm text-sm leading-7 text-white/45">Botswana's premier enterprise office solutions provider. Quality you can count on, service you remember.</p></div><div><h3 className="text-xs font-black uppercase tracking-[0.25em] text-white/40">Contact</h3><div className="mt-4 space-y-2 text-sm text-white/60"><p>+267 755 60140</p><p>sales@stationeryhub.co.bw</p><p>Gaborone, Botswana</p></div></div><div><h3 className="text-xs font-black uppercase tracking-[0.25em] text-white/40">Quick links</h3><div className="mt-4 grid gap-2 text-sm text-white/60"><a href="#products" className="hover:text-white">Products</a><a href="#solutions" className="hover:text-white">Solutions</a><a href="#categories" className="hover:text-white">Categories</a><a href={waLink('Hello StationeryHub, I need help.')} target="_blank" rel="noopener noreferrer" className="hover:text-white">WhatsApp</a></div></div></div><div className="mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/25 md:flex-row"><p>© 2026 IBLIM Enterprise T/A StationeryHub. All rights reserved.</p><p>Built for fast WhatsApp ordering and enterprise office supply.</p></div></footer>

      <a href={waLink('Hello StationeryHub, I need help with an order.')} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp StationeryHub" {...hoverProps} className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-2xl shadow-green-500/30 transition hover:scale-110 motion-safe:animate-[waPop_.4s_1.7s_ease_both]"><WhatsAppIcon className="h-7 w-7" /></a>

      <style jsx global>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes scrollPulse { 0% { left: -100%; } 100% { left: 100%; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes lineUp { from { transform: translateY(110%); } to { transform: translateY(0); } }
        @keyframes waPop { from { transform: scale(0); } to { transform: scale(1); } }
        .hero-animate { opacity: 0; animation: fadeUp .6s ease forwards; }
        .hero-line-up { animation: lineUp .8s cubic-bezier(.22,1,.36,1) both; }
        .reveal-up, .stagger-card { opacity: 0; transform: translateY(28px); transition: opacity .7s ease, transform .7s ease; }
        .reveal-up.visible, .stagger-card.visible { opacity: 1; transform: translateY(0); }
        .nav-link { position: relative; transition: color .2s; }
        .nav-link::after { content: ''; position: absolute; left: 0; bottom: -4px; height: 1px; width: 0; background: #c8481a; transition: width .3s ease; }
        .nav-link:hover { color: #0e0e0e; }
        .nav-link:hover::after { width: 100%; }
        .big-word { font-size: clamp(3rem, 7vw, 5rem); font-weight: 900; letter-spacing: .04em; color: transparent; -webkit-text-stroke: 1px rgba(240,237,232,.18); transition: color .3s, -webkit-text-stroke .3s; }
        .big-word:hover { color: #c8481a; -webkit-text-stroke: 1px #c8481a; }
        .big-dot { font-size: clamp(3rem, 7vw, 5rem); font-weight: 900; color: rgba(240,237,232,.08); }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: .001ms !important; transition-duration: .001ms !important; } }
      `}</style>
    </main>
  );
}
