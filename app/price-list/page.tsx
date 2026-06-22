import { neon } from '@neondatabase/serverless';

export const dynamic = 'force-dynamic';

export default async function PriceListPage() {
  const products = process.env.DATABASE_URL
    ? await neon(process.env.DATABASE_URL)`
        select name, category, price, stock
        from products
        order by category, name
        limit 200
      `
    : [];

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
          <a href="mailto:letsweletseseatla@stationeryhub.co.bw" className="border border-black/10 bg-white p-4">letsweletseseatla@stationeryhub.co.bw</a>
          <a href="https://wa.me/26775560140" className="border border-black/10 bg-white p-4">WhatsApp +267 75 560 140</a>
        </div>

        <div className="overflow-x-auto border border-black/10 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[#0e0e0e] text-xs uppercase tracking-widest text-white">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {(products as any[]).map((product) => (
                <tr key={`${product.name}-${product.category}`}>
                  <td className="px-4 py-3 font-bold">{product.name}</td>
                  <td className="px-4 py-3 text-black/60">{product.category}</td>
                  <td className="px-4 py-3 font-black">{product.price || 'Request quote'}</td>
                  <td className="px-4 py-3">{product.stock ?? ''}</td>
                </tr>
              ))}
              {(products as any[]).length === 0 && (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-black/50">No products found. Check DATABASE_URL.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
