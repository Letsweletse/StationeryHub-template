import { neon } from '@neondatabase/serverless';

export const dynamic = 'force-dynamic';

export default async function AdminLeadsPage() {
  if (!process.env.DATABASE_URL) {
    return <main className="p-8">DATABASE_URL is not configured.</main>;
  }

  const sql = neon(process.env.DATABASE_URL);
  const leads = await sql`
    select l.id, l.product_name, l.quantity_requested, l.status, c.full_name, c.company_name, c.phone, c.location, l.created_at
    from stationery_leads l
    left join stationery_customers c on c.id = l.customer_id
    order by l.created_at desc
    limit 50
  `;

  return (
    <main className="min-h-screen bg-[#f0ede8] px-5 py-8 text-[#0e0e0e] lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between border-b border-black/10 pb-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#c8481a]">StationeryHub admin</p>
            <h1 className="mt-2 text-5xl font-black uppercase">Leads</h1>
          </div>
          <a href="/" className="text-sm font-black uppercase tracking-widest text-black/50 hover:text-[#c8481a]">Back</a>
        </div>

        <div className="overflow-x-auto border border-black/10 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[#0e0e0e] text-xs uppercase tracking-widest text-white">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Qty</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Reply</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {leads.map((lead: any) => (
                <tr key={lead.id}>
                  <td className="px-4 py-3 text-black/60">{new Date(lead.created_at).toLocaleString()}</td>
                  <td className="px-4 py-3 font-bold">{lead.full_name || 'Customer'}<div className="text-xs font-medium text-black/45">{lead.company_name || lead.location || ''}</div></td>
                  <td className="px-4 py-3">{lead.phone}</td>
                  <td className="px-4 py-3">{lead.product_name}</td>
                  <td className="px-4 py-3">{lead.quantity_requested || 1}</td>
                  <td className="px-4 py-3"><span className="bg-yellow-100 px-2 py-1 text-xs font-black uppercase text-yellow-800">{lead.status || 'new'}</span></td>
                  <td className="px-4 py-3">{lead.phone ? <a className="font-black text-[#25d366]" target="_blank" rel="noreferrer" href={`https://wa.me/${String(lead.phone).replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${lead.full_name || ''}, this is StationeryHub about ${lead.product_name || 'your enquiry'}.`)}`}>WhatsApp</a> : null}</td>
                </tr>
              ))}
              {leads.length === 0 && <tr><td colSpan={7} className="px-4 py-8 text-center text-black/50">No leads yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
