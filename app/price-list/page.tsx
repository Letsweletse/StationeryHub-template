type StockItem = {
  brand: string;
  category: string;
  name: string;
  code: string;
  price?: string;
  status: string;
};

const stockItems: StockItem[] = [
  { brand: 'Brother', category: 'Ink Bottle', name: 'Brother BSP-01 Black Ink Bottle', code: 'BSP-01BK', status: 'Available' },
  { brand: 'Brother', category: 'Ink Bottle', name: 'Brother BSP-01 Cyan Ink Bottle', code: 'BSP-01C', status: 'Available' },
  { brand: 'Brother', category: 'Ink Bottle', name: 'Brother BSP-01 Magenta Ink Bottle', code: 'BSP-01M', status: 'Available' },
  { brand: 'Brother', category: 'Ink Bottle', name: 'Brother BSP-01 Yellow Ink Bottle', code: 'BSP-01Y', status: 'Available' },
  { brand: 'Brother', category: 'Ink Cartridge', name: 'Brother LC-3719XL Black Ink Cartridge', code: 'BLC-3719XLB', status: 'Available' },
  { brand: 'Brother', category: 'Ink Cartridge', name: 'Brother LC-3719XL Cyan Ink Cartridge', code: 'BLC-3719XLC', status: 'Available' },
  { brand: 'Brother', category: 'Ink Cartridge', name: 'Brother LC-3719XL Magenta Ink Cartridge', code: 'BLC-3719XLM', status: 'Available' },
  { brand: 'Brother', category: 'Ink Cartridge', name: 'Brother LC-3719XL Yellow Ink Cartridge', code: 'BLC-3719XLY', status: 'Available' },
  { brand: 'Brother', category: 'Ink Cartridge', name: 'Brother LC-472XL Black Ink Cartridge', code: 'BLC-472XLB', status: 'Available' },
  { brand: 'Brother', category: 'Ink Cartridge', name: 'Brother LC-472XL Cyan Ink Cartridge', code: 'BLC-472XLC', status: 'Available' },
  { brand: 'Brother', category: 'Ink Cartridge', name: 'Brother LC-472XL Magenta Ink Cartridge', code: 'BLC-472XLM', status: 'Available' },
  { brand: 'Brother', category: 'Ink Cartridge', name: 'Brother LC-472XL Yellow Ink Cartridge', code: 'BLC-472XLY', status: 'Available' },
  { brand: 'Brother', category: 'Ink Cartridge', name: 'Brother LC-535XL Cyan Ink Cartridge', code: 'BLC-535XLC', status: 'Available' },
  { brand: 'Brother', category: 'Ink Cartridge', name: 'Brother LC-535XL Magenta Ink Cartridge', code: 'BLC-535XLM', status: 'Available' },
  { brand: 'Brother', category: 'Ink Cartridge', name: 'Brother LC-535XL Yellow Ink Cartridge', code: 'BLC-535XLY', status: 'Available' },
  { brand: 'Brother', category: 'Ink Cartridge', name: 'Brother LC-539XL Black Ink Cartridge', code: 'BLC-539XLB', status: 'Available' },
  { brand: 'Brother', category: 'Ink Bottle', name: 'Brother BT-5000 Cyan Ink Bottle', code: 'BT-5000C', status: 'Available' },
  { brand: 'Brother', category: 'Ink Bottle', name: 'Brother BT-5000 Magenta Ink Bottle', code: 'BT-5000M', status: 'Available' },
  { brand: 'Brother', category: 'Ink Bottle', name: 'Brother BT-5000 Yellow Ink Bottle', code: 'BT-5000Y', status: 'Available' },
  { brand: 'Brother', category: 'Ink Bottle', name: 'Brother BT-6000 Black Ink Bottle', code: 'BT-6000B', status: 'Available' },

  { brand: 'Canon', category: 'Toner Cartridge', name: 'Canon CRG 051 Standard Black Toner Cartridge', code: 'CCRG051B', status: 'Available' },
  { brand: 'Canon', category: 'Toner Cartridge', name: 'Canon CRG 064 Black Toner Cartridge', code: 'CCRG064BK', status: 'Available' },
  { brand: 'Canon', category: 'Toner Cartridge', name: 'Canon CRG 064 Cyan Toner Cartridge', code: 'CCRG064C', status: 'Available' },
  { brand: 'Canon', category: 'Toner Cartridge', name: 'Canon CRG 064 Magenta Toner Cartridge', code: 'CCRG064M', status: 'Available' },
  { brand: 'Canon', category: 'Toner Cartridge', name: 'Canon CRG 064 Yellow Toner Cartridge', code: 'CCRG064Y', status: 'Available' },
  { brand: 'Canon', category: 'Toner Cartridge', name: 'Canon CRG 067 Black Toner Cartridge', code: 'CCRG067BK', status: 'Available' },
  { brand: 'Canon', category: 'Toner Cartridge', name: 'Canon CRG 067 Cyan Toner Cartridge', code: 'CCRG067C', status: 'Available' },
  { brand: 'Canon', category: 'Toner Cartridge', name: 'Canon CRG 067 Magenta Toner Cartridge', code: 'CCRG067M', status: 'Available' },
  { brand: 'Canon', category: 'Toner Cartridge', name: 'Canon CRG 067 Yellow Toner Cartridge', code: 'CCRG067Y', status: 'Available' },
  { brand: 'Canon', category: 'Toner Cartridge', name: 'Canon CRG 069 Black Toner Cartridge', code: 'CCRG069BK', status: 'Available' },
  { brand: 'Canon', category: 'Toner Cartridge', name: 'Canon CRG 069 Cyan Toner Cartridge', code: 'CCRG069C', status: 'Available' },
  { brand: 'Canon', category: 'Toner Cartridge', name: 'Canon CRG 069 Magenta Toner Cartridge', code: 'CCRG069M', status: 'Available' },
  { brand: 'Canon', category: 'Toner Cartridge', name: 'Canon CRG 069 Yellow Toner Cartridge', code: 'CCRG069Y', status: 'Available' },
  { brand: 'Canon', category: 'Toner Cartridge', name: 'Canon CRG 071 High Yield Black Toner Cartridge', code: 'CCRH071HBK', status: 'Available' },
  { brand: 'Canon', category: 'Waste Toner', name: 'Canon Waste Toner WT-201', code: 'CWT-201', status: 'Available' },
  { brand: 'Canon', category: 'Toner Cartridge', name: 'Canon C-EXV48 Black Toner Cartridge', code: 'C-EXV48-B', status: 'Available' },
  { brand: 'Canon', category: 'Toner Cartridge', name: 'Canon C-EXV48 Cyan Toner Cartridge', code: 'C-EXV48-C', status: 'Available' },
  { brand: 'Canon', category: 'Toner Cartridge', name: 'Canon C-EXV48 Magenta Toner Cartridge', code: 'C-EXV48-M', status: 'Available' },
  { brand: 'Canon', category: 'Toner Cartridge', name: 'Canon C-EXV48 Yellow Toner Cartridge', code: 'C-EXV48-Y', status: 'Available' },
  { brand: 'Canon', category: 'Toner Cartridge', name: 'Canon 716 Black Toner Cartridge', code: 'C716B', status: 'Available' },
  { brand: 'Canon', category: 'Toner Cartridge', name: 'Canon 716 Cyan Toner Cartridge', code: 'C716C', status: 'Available' },
  { brand: 'Canon', category: 'Toner Cartridge', name: 'Canon 716 Magenta Toner Cartridge', code: 'C716M', status: 'Available' },
  { brand: 'Canon', category: 'Toner Cartridge', name: 'Canon 716 Yellow Toner Cartridge', code: 'C716Y', status: 'Available' },
  { brand: 'Canon', category: 'Toner Cartridge', name: 'Canon 725 Black Toner Cartridge', code: 'C725', status: 'Available' },
  { brand: 'Canon', category: 'Toner Cartridge', name: 'Canon 728 Black Toner Cartridge', code: 'C728B', status: 'Available' },
  { brand: 'Canon', category: 'Toner Cartridge', name: 'Canon 737 Black Toner Cartridge', code: 'C737', status: 'Available' },

  { brand: 'HP', category: 'Printhead', name: 'HP 3YP17A Colour Printhead', code: 'H3YP17AE', status: 'Available' },
  { brand: 'HP', category: 'Ink Cartridge', name: 'HP 47 Black Ink Cartridge', code: 'H6ZD21AE', status: 'Available' },
  { brand: 'HP', category: 'Ink Cartridge', name: 'HP 47 Tri-Colour Ink Cartridge', code: 'H6ZD61AE', status: 'Available' },
  { brand: 'HP', category: 'Ink Cartridge', name: 'HP 654 Tri-Colour Ink Cartridge', code: 'H7FP38UE', status: 'Available' },
  { brand: 'HP', category: 'Ink Cartridge', name: 'HP 654 Black Ink Cartridge', code: 'H7FP39UE', status: 'Available' },
  { brand: 'HP', category: 'Ink Cartridge', name: 'HP 925 Standard Cyan Ink Cartridge', code: 'HP4K0V6PE', status: 'Available' },
  { brand: 'HP', category: 'Ink Cartridge', name: 'HP 925 Standard Magenta Ink Cartridge', code: 'HP4K0V7PE', status: 'Available' },
  { brand: 'HP', category: 'Ink Cartridge', name: 'HP 925 Standard Yellow Ink Cartridge', code: 'HP4K0V8PE', status: 'Available' },
  { brand: 'HP', category: 'Ink Cartridge', name: 'HP 925e Evomore High Yield Cyan Ink Cartridge', code: 'HP4K0W0PE', status: 'Available' },
  { brand: 'HP', category: 'Ink Cartridge', name: 'HP 925e Evomore High Yield Magenta Ink Cartridge', code: 'HP4K0W1PE', status: 'Available' },
  { brand: 'HP', category: 'Ink Cartridge', name: 'HP 925e Evomore High Yield Yellow Ink Cartridge', code: 'HP4K0W2PE', status: 'Available' },
  { brand: 'HP', category: 'Ink Cartridge', name: 'HP 925e Evomore High Yield Black Ink Cartridge', code: 'HP4K0W3PE', status: 'Available' },
  { brand: 'HP', category: 'Ink Cartridge', name: 'HP 938 Standard Cyan Ink Cartridge', code: 'HP4S6X5PE', status: 'Available' },
  { brand: 'HP', category: 'Ink Cartridge', name: 'HP 938 Standard Magenta Ink Cartridge', code: 'HP4S6X6PE', status: 'Available' },
  { brand: 'HP', category: 'Ink Cartridge', name: 'HP 938 Standard Yellow Ink Cartridge', code: 'HP4S6X7PE', status: 'Available' },
  { brand: 'HP', category: 'Ink Cartridge', name: 'HP 938 Standard Black Ink Cartridge', code: 'HP4S6X8PE', status: 'Available' },
  { brand: 'HP', category: 'Ink Cartridge', name: 'HP 938e Evomore High Yield Cyan Ink Cartridge', code: 'HP4S6X9PE', status: 'Available' },
  { brand: 'HP', category: 'Ink Cartridge', name: 'HP 938e Evomore High Yield Magenta Ink Cartridge', code: 'HP4S6Y0PE', status: 'Available' },
  { brand: 'HP', category: 'Ink Cartridge', name: 'HP 938e Evomore High Yield Yellow Ink Cartridge', code: 'HP4S6Y1PE', status: 'Available' },
  { brand: 'HP', category: 'Ink Cartridge', name: 'HP 938e Evomore High Yield Black Ink Cartridge', code: 'HP4S6Y2PE', status: 'Available' },
  { brand: 'HP', category: 'Ink Bottle', name: 'HP GT53XL 135ml Black Ink Bottle', code: 'H1VV21AE', status: 'Available' },
  { brand: 'HP', category: 'Ink Cartridge', name: 'HP 963 XL Cyan Ink Cartridge', code: 'H3JA27AE', status: 'Available' },
  { brand: 'HP', category: 'Ink Cartridge', name: 'HP 963 XL Magenta Ink Cartridge', code: 'H3JA28AE', status: 'Available' },
  { brand: 'HP', category: 'Ink Cartridge', name: 'HP 963 XL Yellow Ink Cartridge', code: 'H3JA29AE', status: 'Available' },
];

const brandCounts = stockItems.reduce<Record<string, number>>((acc, item) => {
  acc[item.brand] = (acc[item.brand] || 0) + 1;
  return acc;
}, {});

function whatsappListLink(item?: StockItem) {
  const message = item
    ? `Hello StationeryHub, please quote me for ${item.name} (${item.code}).`
    : 'Hello StationeryHub, please assist me with a stock and price list quote.';
  return `https://wa.me/26775560140?text=${encodeURIComponent(message)}`;
}

export default function PriceListPage() {
  return (
    <main className="min-h-screen bg-[#f0ede8] px-4 py-8 text-[#0e0e0e] sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-5 border-b border-black/10 pb-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#c8481a]">StationeryHub Botswana</p>
            <h1 className="mt-2 text-4xl font-black uppercase tracking-tight sm:text-5xl md:text-7xl">Stock & price list</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-black/60 sm:text-base">
              Customer-safe stock list for ink, toner, cartridges and print supplies. Prices can be confirmed on request because supplier pricing and availability may change.
            </p>
          </div>
          <a href="/quote" className="bg-[#c8481a] px-6 py-4 text-center text-sm font-black uppercase tracking-widest text-white">Request bulk quote</a>
        </div>

        <div className="mb-6 grid gap-3 text-sm font-bold text-black/70 md:grid-cols-3">
          <a href="mailto:sales@stationeryhub.co.bw" className="border border-black/10 bg-white p-4">sales@stationeryhub.co.bw</a>
          <a href="https://wa.me/26775560140" className="border border-black/10 bg-white p-4">WhatsApp +267 75 560 140</a>
          <a href="https://wa.me/26772347712" className="border border-black/10 bg-white p-4">WhatsApp +267 72 347 712</a>
        </div>

        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          {Object.entries(brandCounts).map(([brand, count]) => (
            <div key={brand} className="border border-black/10 bg-white p-4">
              <p className="text-xs font-black uppercase tracking-widest text-[#c8481a]">{brand}</p>
              <p className="mt-1 text-2xl font-black">{count} items</p>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto border border-black/10 bg-white">
          <table className="min-w-[900px] text-left text-sm">
            <thead className="bg-[#0e0e0e] text-xs uppercase tracking-widest text-white">
              <tr>
                <th className="px-4 py-3">Brand</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Code</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {stockItems.map((item) => (
                <tr key={`${item.code}-${item.name}`}>
                  <td className="px-4 py-3 font-black">{item.brand}</td>
                  <td className="px-4 py-3 text-black/60">{item.category}</td>
                  <td className="px-4 py-3 font-bold">{item.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-black/60">{item.code}</td>
                  <td className="px-4 py-3 font-black">{item.price || 'Request quote'}</td>
                  <td className="px-4 py-3">{item.status}</td>
                  <td className="px-4 py-3">
                    <a href={whatsappListLink(item)} target="_blank" rel="noopener noreferrer" className="inline-flex whitespace-nowrap bg-[#0e0e0e] px-3 py-2 text-xs font-black uppercase tracking-widest text-white">Quote</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-col gap-3 bg-[#0e0e0e] p-5 text-white md:flex-row md:items-center md:justify-between">
          <p className="text-sm leading-6 text-white/70">Need items not listed here? Send the model number, cartridge code, or product list and StationeryHub will quote it.</p>
          <a href={whatsappListLink()} target="_blank" rel="noopener noreferrer" className="bg-[#25d366] px-5 py-3 text-center text-sm font-black uppercase tracking-widest text-black">WhatsApp quote</a>
        </div>
      </div>
    </main>
  );
}
