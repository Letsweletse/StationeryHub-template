export default function SalesContactStrip() {
  return (
    <div className="bg-[#0e0e0e] px-5 py-3 text-[#f0ede8] lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 text-xs font-bold uppercase tracking-[0.14em] md:flex-row md:items-center">
        <span>Sales: <a className="text-[#e8622e]" href="mailto:sales@stationeryhub.co.bw">sales@stationeryhub.co.bw</a></span>
        <span>Admin: <a className="text-[#e8622e]" href="mailto:letsweletseseatla@stationeryhub.co.bw">letsweletseseatla@stationeryhub.co.bw</a></span>
        <span>WhatsApp: <a className="text-[#25d366]" href="https://wa.me/26775560140">+267 75 560 140</a> / +267 72 347 712</span>
      </div>
    </div>
  );
}
