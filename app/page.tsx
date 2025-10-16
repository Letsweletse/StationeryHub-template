import Image from 'next/image';

// Function to fetch real products from your database
async function getProducts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://stationery-hub-template.vercel.app';
    const res = await fetch(`${baseUrl}/api/products`, {
      cache: 'no-store' // Always fetch fresh data
    });
    
    if (!res.ok) throw new Error('Failed to fetch products');
    const products = await res.json();
    
    // Ensure products have proper image URLs
    return products.map((product: any) => ({
      ...product,
      image: product.imageUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=400&fit=crop'
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return fallback products if API fails
    return [
      {
        id: 1,
        name: 'Executive Notebooks',
        price: 85.00,
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=400&fit=crop',
        description: 'Premium leather-bound journals',
        stock: 10
      },
      {
        id: 2,
        name: 'Professional Pens',
        price: 45.00,
        image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&h=400&fit=crop',
        description: 'Smooth writing experience',
        stock: 15
      }
    ];
  }
}

// Hero slider images - focused on cartridges and stationery
const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920&h=800&fit=crop',
    title: 'Premium Printer Cartridges',
    subtitle: 'Original HP, Canon & Brother cartridges in stock'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1920&h=800&fit=crop',
    title: 'Office Stationery Collection',
    subtitle: 'Everything you need for a productive workspace'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=1920&h=800&fit=crop',
    title: 'Writing Instruments',
    subtitle: 'Smooth pens, markers, and highlighters'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=800&fit=crop',
    title: 'Office Furniture',
    subtitle: 'Ergonomic chairs and modern desks'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1920&h=800&fit=crop',
    title: 'Notebooks & Journals',
    subtitle: 'Premium writing companions for professionals'
  }
];

export default async function Home() {
  // Get real products from your Neon database
  const products = await getProducts();
  
  // Use real products from your database - show first 6 as featured
  const featuredProducts = products.slice(0, 6);

  const stats = [
    { number: '500+', label: 'Happy Customers' },
    { number: `${products.length}+`, label: 'Products Available' },
    { number: '24/7', label: 'Customer Support' },
    { number: 'Nationwide', label: 'Delivery Coverage' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Premium Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">SH</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                StationeryHub
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">Home</a>
              <a href="/products" className="text-gray-600 hover:text-blue-600 transition duration-300">Products</a>
              <a href="/about" className="text-gray-600 hover:text-blue-600 transition duration-300">About</a>
              <a href="/contact" className="text-gray-600 hover:text-blue-600 transition duration-300">Contact</a>
            </div>

            {/* CTA Button */}
            <div className="flex items-center space-x-4">
              <button className="hidden md:block text-gray-600 hover:text-blue-600 transition duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition duration-300 transform hover:-translate-y-0.5">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* FULL-WIDTH HERO SLIDER */}
      <section className="relative h-screen overflow-hidden">
        {/* Slider Container */}
        <div className="relative h-full w-full">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === 0 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
              
              {/* Reduced Blue Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-blue-800/30"></div>
              
              {/* Content */}
              <div className="relative h-full flex items-center justify-center text-center text-white">
                <div className="max-w-4xl px-4">
                  <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-xl lg:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 shadow-lg">
                      Shop {slide.title.split(' ')[0]}
                    </button>
                    <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition duration-300 transform hover:-translate-y-1">
                      View All
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === 0 ? 'bg-white scale-125' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Products Section - USING REAL DATABASE PRODUCTS */}
      <section className="max-w-7xl mx-auto py-20 px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Featured <span className="text-blue-600">Products</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked stationery and office solutions that combine aesthetics with functionality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product: any) => (
            <div key={product.id} className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">P {product.price.toFixed(2)}</span>
                  <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={product.stock === 0}>
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
                {product.stock > 0 && product.stock < 10 && (
                  <p className="text-sm text-orange-600 mt-2">Only {product.stock} left in stock!</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View All Products Button */}
        {products.length > 6 && (
          <div className="text-center mt-12">
            <a href="/products" className="inline-block bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
              View All {products.length} Products →
            </a>
          </div>
        )}
      </section>

      {/* Premium Features */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-blue-600">StationeryHub</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Nationwide Delivery</h3>
              <p className="text-gray-600">Free delivery across Botswana for orders over P500. Fast, reliable service to your doorstep.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quality Guaranteed</h3>
              <p className="text-gray-600">Premium international brands and local favorites. Satisfaction guaranteed on all products.</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Expert Support</h3>
              <p className="text-gray-600">Dedicated customer support team. Office setup consultations and bulk order discounts available.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Luxury Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">SH</span>
                </div>
                <span className="text-2xl font-bold text-white">StationeryHub</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Botswana's premier destination for premium office supplies and furniture. Elevating workspaces across the nation.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="/products" className="hover:text-white transition duration-300">All Products</a></li>
                <li><a href="/about" className="hover:text-white transition duration-300">Our Story</a></li>
                <li><a href="/contact" className="hover:text-white transition duration-300">Get in Touch</a></li>
                <li><a href="/bulk-orders" className="hover:text-white transition duration-300">Bulk Orders</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-6">Contact Info</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center space-x-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+267 XXX-XXXX</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@stationeryhub.co.bw</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Gaborone, Botswana</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-6">Business Hours</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex justify-between">
                  <span>Mon - Fri</span>
                  <span>8:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday</span>
                  <span>9:00 AM - 2:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-red-400">Closed</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 StationeryHub. All rights reserved. Proudly serving Botswana.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
