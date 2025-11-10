'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Extended product data with more details like CartridgeHyper
const productData = {
  'hp-3yp17a': {
    id: 'hp-3yp17a',
    name: 'HP 3YP17A Colour Printhead',
    price: 'P 780.00',
    originalPrice: 'P 850.00',
    image: 'https://res.cloudinary.com/dseimivxo/image/upload/v1762681955/H3YP17AE_qupbup.jpg',
    images: [
      'https://res.cloudinary.com/dseimivxo/image/upload/v1762681955/H3YP17AE_qupbup.jpg',
      'https://res.cloudinary.com/dseimivxo/image/upload/v1762681955/H3YP17AE_qupbup.jpg', // duplicate for demo
      'https://res.cloudinary.com/dseimivxo/image/upload/v1762681955/H3YP17AE_qupbup.jpg'
    ],
    category: 'Print Supplies',
    subcategory: 'Printheads',
    description: 'High-quality HP Colour Printhead compatible with various HP printer models. Genuine HP product with guaranteed performance and reliability. Designed for professional printing environments where quality and consistency are paramount.',
    features: [
      'Genuine HP product with warranty',
      'High-quality color printing output',
      'Easy installation process',
      'Compatible with multiple HP printer models',
      'Long-lasting performance and reliability',
      'Precise color reproduction'
    ],
    specifications: {
      'Product Type': 'Colour Printhead',
      'Compatibility': 'HP OfficeJet Pro 8000, 8100, 8600 series',
      'Print Technology': 'Thermal Inkjet',
      'Yield': 'Up to 5,000 pages',
      'Color Support': 'CMYK (Cyan, Magenta, Yellow, Black)',
      'Warranty': '1 Year HP Limited Warranty',
      'SKU': 'HP-3YP17A-001',
      'Brand': 'HP',
      'Condition': 'New Genuine'
    },
    compatibility: [
      'HP OfficeJet Pro 8000',
      'HP OfficeJet Pro 8100',
      'HP OfficeJet Pro 8600',
      'HP OfficeJet Pro 8610',
      'HP OfficeJet Pro 8620',
      'HP OfficeJet Pro 8630'
    ],
    inStock: true,
    stock: 15,
    sku: 'HP-3YP17A-001',
    brand: 'HP',
    tags: ['printhead', 'color', 'hp', 'officejet', 'professional'],
    relatedProducts: ['hp-47-black', 'hp-925e', 'canon-486-colour']
  },
  'hp-47-black': {
    id: 'hp-47-black',
    name: 'HP 47 Black Ink Cartridge',
    price: 'P 280.00',
    originalPrice: 'P 320.00',
    image: 'https://res.cloudinary.com/dseimivxo/image/upload/v1762681958/H6ZD61AE_op7tus.png',
    images: [
      'https://res.cloudinary.com/dseimivxo/image/upload/v1762681958/H6ZD61AE_op7tus.png',
      'https://res.cloudinary.com/dseimivxo/image/upload/v1762681958/H6ZD61AE_op7tus.png'
    ],
    category: 'Print Supplies',
    subcategory: 'Ink Cartridges',
    description: 'Original HP 47 Black Ink Cartridge for high-quality text printing. Perfect for documents and everyday printing needs. Delivers crisp, professional-looking text with exceptional reliability.',
    features: [
      'Original HP quality and reliability',
      'Sharp, black text for professional documents',
      'Reliable performance page after page',
      'Easy to install with no mess',
      'Consistent results with every print',
      'Ideal for high-volume text printing'
    ],
    specifications: {
      'Product Type': 'Ink Cartridge',
      'Compatibility': 'HP DeskJet 3630, 3632, 3634, 3720, 3722, 3755',
      'Color': 'Black',
      'Page Yield': 'Approximately 480 pages (ISO standards)',
      'Technology': 'Thermal Inkjet',
      'Warranty': '1 Year Limited Warranty',
      'SKU': 'HP-47-BLK-001',
      'Brand': 'HP',
      'Condition': 'New Genuine'
    },
    compatibility: [
      'HP DeskJet 3630 series',
      'HP DeskJet 3632',
      'HP DeskJet 3634',
      'HP DeskJet 3720',
      'HP DeskJet 3722',
      'HP DeskJet 3755',
      'HP DeskJet 3760'
    ],
    inStock: true,
    stock: 25,
    sku: 'HP-47-BLK-001',
    brand: 'HP',
    tags: ['ink', 'cartridge', 'black', 'deskjet', 'home-office'],
    relatedProducts: ['hp-3yp17a', 'hp-925e', 'canon-pg-485']
  },
  'hp-925e': {
    id: 'hp-925e',
    name: 'HP 925e Evomore High Yield Magenta Ink Cartridge',
    price: 'P 560.00',
    originalPrice: 'P 620.00',
    image: 'https://res.cloudinary.com/dseimivxo/image/upload/v1762681957/HP4K0W0PE_nissve.jpg',
    images: [
      'https://res.cloudinary.com/dseimivxo/image/upload/v1762681957/HP4K0W0PE_nissve.jpg',
      'https://res.cloudinary.com/dseimivxo/image/upload/v1762681957/HP4K0W0PE_nissve.jpg'
    ],
    category: 'Print Supplies',
    subcategory: 'Ink Cartridges',
    description: 'HP 925e Evomore High Yield Magenta Ink Cartridge delivers exceptional print quality with high-yield performance. Designed for HP OfficeJet printers, this cartridge provides vibrant colors and reliable performance for all your printing needs.',
    features: [
      'High-yield cartridge for more prints per cartridge',
      'Vibrant magenta color output for brilliant photos',
      'Reliable performance and consistent results',
      'Easy installation and setup',
      'Compatible with various HP OfficeJet models',
      'Evomore technology for enhanced efficiency'
    ],
    specifications: {
      'Product Type': 'High Yield Ink Cartridge',
      'Compatibility': 'HP OfficeJet 9010, 9020, 9030 series',
      'Color': 'Magenta',
      'Page Yield': 'Up to 2,000 pages',
      'Technology': 'HP Thermal Inkjet',
      'Warranty': '1 Year HP Limited Warranty',
      'SKU': 'HP925E-MAGENTA',
      'Brand': 'HP',
      'Condition': 'New Genuine'
    },
    compatibility: [
      'HP OfficeJet 9010',
      'HP OfficeJet 9020',
      'HP OfficeJet 9030',
      'HP OfficeJet Pro 9010',
      'HP OfficeJet Pro 9020',
      'HP OfficeJet Pro 9030'
    ],
    inStock: true,
    stock: 18,
    sku: 'HP925E-MAG',
    brand: 'HP',
    tags: ['ink', 'cartridge', 'magenta', 'officejet', 'high-yield'],
    relatedProducts: ['hp-3yp17a', 'hp-47-black', 'canon-486-colour']
  }
};

// Image Gallery Component
function ProductImageGallery({ images, productName }: { images: string[], productName: string }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative h-96 md:h-[500px] bg-gray-50 rounded-2xl overflow-hidden border border-gray-200">
        <Image
          src={images[selectedImage]}
          alt={productName}
          fill
          className="object-contain p-8"
          priority
        />
      </div>
      
      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="flex space-x-3 overflow-x-auto py-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 relative w-20 h-20 bg-gray-50 rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index 
                  ? 'border-blue-600 ring-2 ring-blue-200' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} view ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Related Products Component
function RelatedProducts({ relatedIds, currentProductId }: { relatedIds: string[], currentProductId: string }) {
  const relatedProducts = relatedIds.map(id => productData[id as keyof typeof productData]).filter(Boolean);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
            <Link href={`/products/${product.id}`}>
              <div className="relative h-48 bg-gray-50 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4 hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>
            <div className="p-4">
              <Link href={`/products/${product.id}`}>
                <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2 text-sm">
                  {product.name}
                </h3>
              </Link>
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-gray-900">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                )}
              </div>
              <a 
                href={`https://wa.me/26775560140?text=${encodeURIComponent(`Hello! I'm interested in ${product.name} for ${product.price}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold text-center block transition-colors duration-200 text-sm"
              >
                Order on WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Compatibility List Component
function CompatibilityList({ compatibility }: { compatibility: string[] }) {
  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Compatible Printers</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {compatibility.map((model, index) => (
          <div key={index} className="flex items-center text-gray-700">
            <svg className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm">{model}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = productData[params.id as keyof typeof productData];
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const whatsappMessage = `Hello! I'm interested in ${product.name} for ${product.price}. Quantity: ${quantity}. Product SKU: ${product.sku}`;
  const whatsappUrl = `https://wa.me/26775560140?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Header */}
      <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center">
              <div className="w-60 h-12 relative">
                <Image
                  src="https://res.cloudinary.com/dseimivxo/image/upload/v1761627173/logo_uamr64.png"
                  alt="StationeryHub"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium">Home</Link>
              <Link href="/products" className="text-gray-600 hover:text-gray-900 font-medium">Products</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 font-medium">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 font-medium">Contact</Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Product Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          {/* Enhanced Breadcrumb */}
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-3 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <Link href="/#products" className="hover:text-gray-900 transition-colors">Products</Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li>
                <Link href={`/products?category=${product.category}`} className="hover:text-gray-900 transition-colors">{product.category}</Link>
              </li>
              <li>
                <span className="text-gray-400">/</span>
              </li>
              <li className="text-gray-900 font-medium">
                {product.name}
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image Gallery */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <ProductImageGallery images={product.images} productName={product.name} />
            </div>

            {/* Product Info */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </span>
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {product.brand}
                </span>
                {product.originalPrice && (
                  <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    SALE
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">{product.name}</h1>
              
              <div className="flex items-center mb-6">
                <span className="text-3xl font-bold text-gray-900">{product.price}</span>
                {product.originalPrice && (
                  <span className="ml-3 text-xl text-gray-500 line-through">{product.originalPrice}</span>
                )}
              </div>

              <div className="flex items-center flex-wrap gap-4 mb-6">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  product.inStock 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  <span className={`w-2 h-2 rounded-full mr-2 ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  {product.inStock ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span>
                <span className="text-sm text-gray-600">SKU: {product.sku}</span>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Quantity</label>
                <div className="flex items-center w-32">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <span className="text-lg font-semibold">-</span>
                  </button>
                  <div className="w-12 h-10 flex items-center justify-center border-t border-b border-gray-300 bg-white">
                    <span className="text-lg font-medium">{quantity}</span>
                  </div>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    disabled={quantity >= product.stock}
                  >
                    <span className="text-lg font-semibold">+</span>
                  </button>
                </div>
              </div>

              {/* WhatsApp Order Button */}
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center transition-all duration-200 hover:scale-105 mb-6 shadow-lg"
              >
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.18-1.24-6.171-3.495-8.428"/>
                </svg>
                Order on WhatsApp
              </a>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 text-center text-xs text-gray-600">
                <div className="flex flex-col items-center">
                  <svg className="w-6 h-6 text-green-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Genuine Product</span>
                </div>
                <div className="flex flex-col items-center">
                  <svg className="w-6 h-6 text-blue-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span>In Stock</span>
                </div>
                <div className="flex flex-col items-center">
                  <svg className="w-6 h-6 text-purple-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Secure Order</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Tab Headers */}
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                {['description', 'specifications', 'compatibility', 'features'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {activeTab === 'description' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Description</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-3 border-b border-gray-200">
                        <span className="font-medium text-gray-900">{key}</span>
                        <span className="text-gray-600 text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'compatibility' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Printer Compatibility</h3>
                  <CompatibilityList compatibility={product.compatibility} />
                </div>
              )}

              {activeTab === 'features' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          <RelatedProducts relatedIds={product.relatedProducts} currentProductId={product.id} />
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="w-48 h-12 relative mb-4">
                <Image
                  src="https://res.cloudinary.com/dseimivxo/image/upload/v1761627173/logo_uamr64.png"
                  alt="StationeryHub"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-gray-400 text-sm">Botswana's premier office solutions provider</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <Link href="/" className="block hover:text-white transition-colors">Home</Link>
                <Link href="/products" className="block hover:text-white transition-colors">Products</Link>
                <Link href="/about" className="block hover:text-white transition-colors">About</Link>
                <Link href="/contact" className="block hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>+267 75560140</p>
                <p>sales@stationeryhub.co.bw</p>
                <p>Gaborone, Botswana</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Business Hours</h4>
              <div className="space-y-1 text-sm text-gray-400">
                <p>Mon-Fri: 8:00 AM - 5:00 PM</p>
                <p>Sat: 9:00 AM - 1:00 PM</p>
                <p>Sun: Closed</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 StationeryHub Enterprise Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
