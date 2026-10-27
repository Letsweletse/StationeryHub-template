'use client';
export default function PrintButton() {
  return <button onClick={() => window.print()} className="bg-[#0e0e0e] px-6 py-3 text-sm font-black uppercase tracking-widest text-white">Print / save as PDF</button>;
}
