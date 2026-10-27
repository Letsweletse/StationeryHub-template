const wa = (n: string, msg = 'Hello StationeryHub, I need help.') => `https://wa.me/${n}?text=${encodeURIComponent(msg)}`;

export const CONTACTS = {
  phones: [
    { label: '+267 75 560 140', tel: '+26775560140', wa: '26775560140' },
    { label: '+267 72 347 712', tel: '+26772347712', wa: '26772347712' },
  ],
  emails: [
    { label: 'Sales & quotes', email: 'sales@stationeryhub.co.bw' },
    { label: 'Orders & deliveries', email: 'operations@stationeryhub.co.bw' },
    { label: 'Management', email: 'letsweletseseatla@stationeryhub.co.bw' },
  ],
};

export default function SiteFooter() {
  return (
    <footer className="bg-[#1c1c1c] px-5 py-12 text-[#f0ede8] lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_1.2fr_0.8fr]">
        <div>
          <div className="text-3xl font-black uppercase tracking-[0.18em]">Stationery<span className="text-[#e8622e]">Hub</span></div>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/45">Office supplies, ink, toner and technology for businesses, schools, clinics and government in Botswana, with international supply on request.</p>
          <p className="mt-3 text-sm text-white/45">Gaborone, Botswana</p>
        </div>
        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.25em] text-white/40">Contact</h3>
          <div className="mt-4 space-y-3 text-sm text-white/70">
            {CONTACTS.phones.map((p) => (
              <p key={p.tel} className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <a href={`tel:${p.tel}`} className="font-bold text-white hover:text-[#e8622e]">{p.label}</a>
                <a href={wa(p.wa)} target="_blank" rel="noopener noreferrer" className="text-xs font-black uppercase tracking-widest text-[#25d366]">WhatsApp</a>
              </p>
            ))}
            {CONTACTS.emails.map((e) => (
              <p key={e.email} className="break-all">
                <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40">{e.label}</span>
                <a href={`mailto:${e.email}`} className="hover:text-[#e8622e]">{e.email}</a>
              </p>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.25em] text-white/40">Quick links</h3>
          <div className="mt-4 grid gap-2 text-sm text-white/60">
            <a href="/price-list" className="hover:text-white">Price list</a>
            <a href="/quote" className="hover:text-white">Instant quote</a>
            <a href="/quote#international" className="hover:text-white">International buyers</a>
            <a href="/suppliers" className="hover:text-white">Become a supplier</a>
            <a href="/contact" className="hover:text-white">Contact</a>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-xs text-white/35">© {new Date().getFullYear()} StationeryHub</p>
    </footer>
  );
}
