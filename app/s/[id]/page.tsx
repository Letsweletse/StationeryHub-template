import { notFound } from 'next/navigation';
import { q } from '@/lib/hub';
import { ensureFlowSchema, supplierSig } from '@/lib/flow';
import SupplierForm from './SupplierForm';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Supplier request · StationeryHub', robots: { index: false } };

export default async function SupplierRequest({ params, searchParams }: { params: { id: string }; searchParams: { t?: string } }) {
  const id = Number(params.id);
  if (!id || searchParams.t !== supplierSig(id)) notFound();
  await ensureFlowSchema();
  const [r] = await q(`select r.*, s.name as sname from sh_supplier_requests r join sh_suppliers s on s.id = r.supplier_id where r.id = $1`, [id]);
  if (!r) notFound();
  return (
    <main className="min-h-screen bg-[#f0ede8] px-4 py-8 text-[#0e0e0e]">
      <div className="mx-auto max-w-2xl bg-white p-6 shadow-sm">
        <p className="text-2xl font-black uppercase tracking-[0.12em]">Stationery<span className="text-[#c8481a]">Hub</span></p>
        <p className="mt-1 text-xs font-black uppercase tracking-[0.25em] text-[#c8481a]">{r.kind === 'po' ? 'Purchase order' : 'Price request'} · {r.quote_ref}</p>
        <h1 className="mt-3 text-2xl font-black">Dumela {r.sname}</h1>
        <p className="mt-1 text-sm text-black/60">{r.kind === 'po' ? 'Please confirm you can supply these items and when.' : 'Please give your best price (BWP, each, excl. delivery) and availability.'}</p>
        <SupplierForm id={id} t={searchParams.t!} kind={r.kind} items={r.items || []} answered={r.status === 'answered'} />
      </div>
    </main>
  );
}
