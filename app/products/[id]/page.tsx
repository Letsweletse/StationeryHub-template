'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// This would normally come from your database
const productData = {
  'hp-3yp17a': {
    id: 'hp-3yp17a',
    name: 'HP 3YP17A Colour Printhead',
    price: 'P 780.00',
    originalPrice: 'P 850.00',
    image: 'https://res.cloudinary.com/dseimivxo/image/upload/v1762681955/H3YP17AE_qupbup.jpg',
    category: 'Print Supplies',
    description: 'High-quality HP Colour Printhead compatible with various HP printer models. Genuine HP product with guaranteed performance and reliability.',
    features: [
      'Genuine HP product',
      'High-quality printing',
      'Easy installation',
      'Compatible with multiple HP printer models',
      'Long-lasting performance'
    ],
    specifications: {
      'Compatibility': 'HP OfficeJet Pro, HP Envy series',
      'Type': 'Colour Printhead',
      'Yield': 'Up to 5,000 pages',
      'Color': 'CMYK'
    },
    inStock: true,
    stock: 15,
    sku: 'HP-3YP17A-001'
  },
  'hp-47-black': {
    id: 'hp-47-black',
    name: 'HP 47 Black Ink Cartridge',
    price: 'P 280.00',
    originalPrice: 'P 320.00',
    image: 'https://res.cloudinary.com/dseimivxo/image/upload/v1762681958/H6ZD61AE_op7tus.png',
    category: 'Print Supplies',
    description: 'Original HP 47 Black Ink Cartridge for high-quality text printing. Perfect for documents and everyday printing needs.',
    features: [
      'Original HP quality',
      'Sharp, black text',
      'Reliable performance',
      'Easy to install',
      'Consistent results'
    ],
    specifications: {
      'Compatibility': 'HP DeskJet 3630, 3632, 3634, 3720, 3722',
      'Type': 'Ink Cartridge',
      'Yield': 'Approximately 480 pages',
      'Color': 'Black'
    },
    inStock: true,
    stock: 25,
    sku: 'HP-47-BLK-001'
  }
};

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = productData[params.id as keyof typeof productData];
  const [quantity, setQuantity] = useState(1);

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

  const whatsappMessage = `Hello! I'm interested in ${product.name} for ${product.price}. Product SKU: ${product.sku}`;
  const whatsappUrl = `https://wa.me/26775560140?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <header className="w-full bg-white border-b border-gray-200">
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
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Product Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          {/* Breadcrumb */}
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-gray-900">Home</Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>
                <Link href="/#products" className="hover:text-gray-900">Products</Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li className="text-gray-900">
                {product.name}
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="relative h-96 w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center mb-6">
                <span className="text-3xl font-bold text-gray-900">{product.price}</span>
                {product.originalPrice && (
                  <span className="ml-3 text-xl text-gray-500 line-through">{product.originalPrice}</span>
                )}
              </div>

              <div className="mb-6">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  product.inStock 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.inStock ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span>
                <span className="ml-3 text-sm text-gray-600">SKU: {product.sku}</span>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-lg bg-gray-50 hover:bg-gray-100"
                  >
                    <span className="text-lg">-</span>
                  </button>
                  <div className="w-16 h-10 flex items-center justify-center border-t border-b border-gray-300">
                    <span className="text-lg">{quantity}</span>
                  </div>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-lg bg-gray-50 hover:bg-gray-100"
                  >
                    <span className="text-lg">+</span>
                  </button>
                </div>
              </div>

              {/* WhatsApp Order Button */}
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg font-semibold text-lg flex items-center justify-center transition-colors duration-200 mb-4"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.18-1.24-6.171-3.495-8.428"/>
                </svg>
                Order on WhatsApp
              </a>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex border-b border-gray-200 py-3">
                  <span className="font-medium text-gray-900 w-1/3">{key}</span>
                  <span className="text-gray-600 w-2/3">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-gray-400">&copy; 2024 StationeryHub. All rights reserved.</p>
          <div className="mt-4">
            <Link href="/" className="text-gray-400 hover:text-white mx-4">Home</Link>
            <Link href="/about" className="text-gray-400 hover:text-white mx-4">About</Link>
            <Link href="/contact" className="text-gray-400 hover:text-white mx-4">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
