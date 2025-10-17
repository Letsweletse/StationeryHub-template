import Image from 'next/image';
import Link from 'next/link';

// Function to fetch real products from your database
async function getProducts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://stationery-hub-template.vercel.app';
    const res = await fetch(`${baseUrl}/api/products`, {
      cache: 'no-store'
    });
    
    if (!res.ok) throw new Error('Failed to fetch products');
    const products = await res.json();
    
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Corporate categories with professional icons
const categories = [
  {
    id: 1,
    name: 'Printer Cartridges',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
    link: '/products?category=cartridges',
    description: 'HP, Canon, Brother'
  },
  {
    id: 2,
    name: 'Office Stationery',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
    link: '/products?category=stationery',
    description: 'Paper, Pens, Notebooks'
  },
  {
    id: 3,
    name: 'Office Furniture',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    link: '/products?category=furniture',
    description: 'Chairs, Desks, Storage'
  },
  {
    id: 4,
    name: 'Computers & Tech',
    image: 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?w=400&h=300&fit=crop',
    link: '/products?category=computers',
    description: 'Laptops, Accessories'
  },
  {
    id: 5,
    name: 'Writing Instruments',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400&h=300&fit=crop',
    link: '/products?category=pens',
    description: 'Pens, Markers, Highlighters'
  },
  {
    id: 6,
    name: 'Office Supplies',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    link: '/products?category=supplies',
    description: 'Organizers, Storage'
  }
];

// Professional business offers
const businessOffers = [
  {
    id: 1,
    title: 'Corporate Account Setup',
    subtitle: 'Special pricing for businesses & bulk orders',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop',
    link: '/business',
    badge: 'For Businesses'
  },
  {
    id: 2,
    title: 'Office Setup Package',
    subtitle: 'Complete solutions for new offices',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&h=300&fit=crop',
    link: '/deals/office-package',
    badge: 'Best Value'
  },
  {
    id: 3,
    title: 'School & Education',
    subtitle: 'Special rates for educational institutions',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=300&fit=crop',
    link: '/education',
    badge: 'Schools'
  }
];

export default async function Home() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional Top Banner */}
      <div className="bg-gradient-to-r from-red-700 to-red-800 text-white py-2 px-4 text-center text-sm font-medium">
        <p>🚚 Free delivery across Gaborone for orders over P500 | 📞 Business inquiries: +267 75560140</p>
      </div>

      {/* Corporate Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <span className="text-white font-bold text-xl">SH</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">StationeryHub</h1>
                <p className="text-xs text-gray-500 font-medium">BUSINESS SOLUTIONS</p>
              </div>
            </Link>

            {/* Corporate Search */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search for products, brands, and business supplies..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent font-medium text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Corporate Actions */}
            <div className="flex items-center space-x-6">
              <button className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors duration-200 font-medium group">
                <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-red-50 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="hidden lg:block text-sm">Account</span>
              </button>
              
              <button className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors duration-200 font-medium group">
                <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-red-50 transition-colors duration-200 relative">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">0</span>
                </div>
                <span className="hidden lg:block text-sm">Cart</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Corporate Navigation */}
      <nav className="bg-gray-900 text-white sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-8">
              <button className="flex items-center space-x-3 bg-red-600 px-4 py-2.5 rounded-lg hover:bg-red-700 transition-colors duration-200 font-semibold group">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span>All Categories</span>
              </button>
              
              <div className="hidden xl:flex items-center space-x-8 text-sm font-medium">
                <a href="/deals" className="hover:text-red-300 transition-colors duration-200">Today's Deals</a>
                <a href="/products" className="hover:text-red-300 transition-colors duration-200">All Products</a>
                <a href="/business" className="hover:text-red-300 transition-colors duration-200">Business Orders</a>
                <a href="/education" className="hover:text-red-300 transition-colors duration-200">Education</a>
                <a href="/brands" className="hover:text-red-300 transition-colors duration-200">Brands</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm font-medium">
              <a href="/store-locator" className="hover:text-red-300 transition-colors duration-200 flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span>Store Locator</span>
              </a>
              <a href="/contact" className="hover:text-red-300 transition-colors duration-200">Support</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Corporate Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Professional Sidebar */}
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:col-span-1">
              <h3 className="font-bold text-gray-900 text-lg mb-6 border-b border-gray-200 pb-4">Business Categories</h3>
              <ul className="space-y-3">
                {categories.map((category) => (
                  <li key={category.id}>
                    <a href={category.link} className="flex items-center justify-between text-gray-700 hover:text-red-600 transition-colors duration-200 group py-3 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-red-50 transition-colors duration-200">
                          <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-red-600 rounded"></div>
                        </div>
                        <div>
                          <span className="font-semibold text-sm">{category.name}</span>
                          <p className="text-xs text-gray-500">{category.description}</p>
                        </div>
                      </div>
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-red-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main Corporate Hero */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative h-96">
                  <Image
                    src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=600&fit=crop"
                    alt="Professional Office Solutions"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/50"></div>
                  <div className="absolute left-12 top-1/2 transform -translate-y-1/2 text-white max-w-2xl">
                    <h2 className="text-5xl font-bold mb-4 leading-tight tracking-tight">
                      Premium Office
                      <span className="block text-red-400">Solutions</span>
                    </h2>
                    <p className="text-xl mb-8 leading-relaxed font-light">
                      Enterprise-grade stationery and furniture for Botswana's leading businesses and institutions
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button className="btn-primary text-lg px-8 py-4 font-bold">
                        Explore Business Solutions
                      </button>
                      <button className="btn-secondary text-lg px-8 py-4 font-bold border-white text-white hover:bg-white hover:text-gray-900">
                        Request Quote
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Solutions Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Business Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Tailored office supply programs for enterprises, schools, and government institutions across Botswana
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {businessOffers.map((offer) => (
              <div key={offer.id} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 card-hover border border-gray-200">
                <div className="relative h-48">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {offer.badge}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-900 mb-3">{offer.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{offer.subtitle}</p>
                  <a href={offer.link} className="inline-flex items-center space-x-2 text-red-600 hover:text-red-700 font-semibold group">
                    <span>Learn More</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - Corporate Style */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Featured Products</h2>
              <p className="text-xl text-gray-600">Quality supplies trusted by businesses nationwide</p>
            </div>
            <a href="/products" className="btn-primary">
              View All Products
            </a>
          </div>
          
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product: any) => (
                <div key={product.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 card-hover border border-gray-200 overflow-hidden">
                  <div className="relative h-48 bg-gray-100">
                    <Image
                      src={product.imageUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&h=400&fit=crop'}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.stock === 0 && (
                      <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Out of Stock
                      </div>
                    )}
                    {product.stock > 0 && product.stock < 5 && (
                      <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Low Stock
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">P {product.price?.toFixed(2) || '0.00'}</span>
                        {product.stock > 0 && (
                          <p className="text-xs text-gray-500 mt-1">In stock: {product.stock}</p>
                        )}
                      </div>
                      <button 
                        className={`px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
                          product.stock === 0 
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                            : 'bg-red-600 text-white hover:bg-red-700 transform hover:scale-105'
                        }`}
                        disabled={product.stock === 0}
                      >
                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1m4 0h-4" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg font-medium">No products available at the moment.</p>
              <p className="text-gray-400 mt-2">Please check back later or contact our sales team.</p>
            </div>
          )}
        </div>
      </section>

      {/* Corporate Features */}
      <section className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Nationwide Delivery</h3>
              <p className="text-gray-600 text-sm">Free delivery across Botswana for qualified orders</p>
            </div>
            
            <div className="p-6">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600 text-sm">Premium brands and satisfaction guarantee</p>
            </div>
            
            <div className="p-6">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Expert Support</h3>
              <p className="text-gray-600 text-sm">Dedicated account managers for businesses</p>
            </div>
            
            <div className="p-6">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Best Pricing</h3>
              <p className="text-gray-600 text-sm">Competitive rates for bulk and business orders</p>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate CTA */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-6 tracking-tight">Ready to Transform Your Office?</h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Join hundreds of businesses across Botswana who trust StationeryHub for their office supply needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg">
              Get Business Quote
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-red-600 transition-colors duration-200">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-red-600 font-bold text-lg">SH</span>
                </div>
                <div>
                  <span className="text-xl font-bold">StationeryHub</span>
                  <p className="text-xs text-gray-400 font-medium">BUSINESS SOLUTIONS</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed text-sm">
                Botswana's premier business partner for premium office supplies, furniture, and corporate solutions.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-6">Business Services</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="/business" className="hover:text-white transition-colors duration-200">Corporate Accounts</a></li>
                <li><a href="/education" className="hover:text-white transition-colors duration-200">Education Institutions</a></li>
                <li><a href="/government" className="hover:text-white transition-colors duration-200">Government Tenders</a></li>
                <li><a href="/bulk-orders" className="hover:text-white transition-colors duration-200">Bulk Orders</a></li>
                <li><a href="/account-managers" className="hover:text-white transition-colors duration-200">Account Managers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-6">Support</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><a href="/contact" className="hover:text-white transition-colors duration-200">Contact Sales</a></li>
                <li><a href="/support" className="hover:text-white transition-colors duration-200">Customer Support</a></li>
                <li><a href="/delivery" className="hover:text-white transition-colors duration-200">Delivery Information</a></li>
                <li><a href="/returns" className="hover:text-white transition-colors duration-200">Returns Policy</a></li>
                <li><a href="/faq" className="hover:text-white transition-colors duration-200">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-6">Contact Info</h4>
              <div className="space-y-3 text-gray-400 text-sm">
                <div className="flex items-center space-x-3">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+267 75560140</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>sales@stationeryhub.co.bw</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span>Gaborone, Botswana</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 StationeryHub Business Solutions by iblimenterprise.com . All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
