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

// Makro-style categories
const categories = [
  {
    id: 1,
    name: 'Printer Cartridges',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
    link: '/products?category=cartridges'
  },
  {
    id: 2,
    name: 'Office Stationery',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
    link: '/products?category=stationery'
  },
  {
    id: 3,
    name: 'Office Furniture',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    link: '/products?category=furniture'
  },
  {
    id: 4,
    name: 'Computers & Tech',
    image: 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?w=400&h=300&fit=crop',
    link: '/products?category=computers'
  },
  {
    id: 5,
    name: 'Writing Instruments',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400&h=300&fit=crop',
    link: '/products?category=pens'
  },
  {
    id: 6,
    name: 'Office Supplies',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    link: '/products?category=supplies'
  }
];

// Special offers
const specialOffers = [
  {
    id: 1,
    title: 'Back to School Sale',
    subtitle: 'Up to 30% off on stationery',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=300&fit=crop',
    link: '/sale/school'
  },
  {
    id: 2,
    title: 'Office Setup Package',
    subtitle: 'Complete office furniture sets',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&h=300&fit=crop',
    link: '/deals/office-package'
  },
  {
    id: 3,
    title: 'Printer Cartridge Combo',
    subtitle: 'Buy 2 get 1 free on selected cartridges',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=300&fit=crop',
    link: '/deals/cartridge-combo'
  }
];

export default async function Home() {
  // Get REAL products from your Neon database
  const products = await getProducts();
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner - Makro Style */}
      <div className="bg-blue-800 text-white py-2 px-4 text-center text-sm">
        <p>🚚 Free delivery across Botswana for orders over P500 | 📞 Need help? Call +267 XXX-XXXX</p>
      </div>

      {/* Main Navigation - Makro Style */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">SH</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">StationeryHub</span>
            </Link>

            {/* Search Bar - Makro Style */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products, brands and categories..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition duration-200">
                  Search
                </button>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-6">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="hidden md:block">Account</span>
              </button>
              
              <button className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="hidden md:block">Cart (0)</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Category Navigation - Makro Style */}
      <div className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-8">
              <button className="flex items-center space-x-2 bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span>All Categories</span>
              </button>
              
              <div className="hidden lg:flex items-center space-x-6 text-sm">
                <a href="/deals" className="hover:text-red-300 transition duration-200">Today's Deals</a>
                <a href="/products" className="hover:text-red-300 transition duration-200">All Products</a>
                <a href="/brands" className="hover:text-red-300 transition duration-200">Brands</a>
                <a href="/business" className="hover:text-red-300 transition duration-200">Business Orders</a>
                <a href="/contact" className="hover:text-red-300 transition duration-200">Contact Us</a>
              </div>
            </div>
            
            <div className="text-sm">
              <a href="/store-locator" className="hover:text-red-300 transition duration-200">📍 Store Locator</a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Banner - Makro Style */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Categories */}
            <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-1">
              <h3 className="font-semibold text-lg mb-4 text-gray-900">Shop by Category</h3>
              <ul className="space-y-3">
                {categories.map((category) => (
                  <li key={category.id}>
                    <a href={category.link} className="flex items-center space-x-3 text-gray-700 hover:text-red-600 transition duration-200 py-2 border-b border-gray-100">
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      <span>{category.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main Hero Carousel */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative h-96">
                  <Image
                    src="https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?w=1200&h=600&fit=crop"
                    alt="Office Supplies Sale"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                  <div className="absolute left-8 top-1/2 transform -translate-y-1/2 text-white max-w-md">
                    <h2 className="text-4xl font-bold mb-4">Office Essentials Sale</h2>
                    <p className="text-xl mb-6">Up to 40% off on premium office supplies and furniture</p>
                    <button className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-200">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers - Makro Style */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Special Offers</h2>
            <a href="/deals" className="text-red-600 hover:text-red-700 font-semibold">View All →</a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {specialOffers.map((offer) => (
              <div key={offer.id} className="bg-gray-50 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-200">
                <div className="relative h-48">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">{offer.title}</h3>
                  <p className="text-gray-600 mb-3">{offer.subtitle}</p>
                  <a href={offer.link} className="text-red-600 hover:text-red-700 font-semibold text-sm">
                    Shop Now →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories - Makro Style */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <a key={category.id} href={category.link} className="bg-white rounded-lg shadow-sm p-4 text-center hover:shadow-md transition duration-200 group">
                <div className="relative w-20 h-20 mx-auto mb-3">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover rounded-lg group-hover:scale-105 transition duration-200"
                  />
                </div>
                <span className="text-sm font-medium text-gray-900 group-hover:text-red-600 transition duration-200">
                  {category.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - USING REAL DATABASE PRODUCTS */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
            <a href="/products" className="text-red-600 hover:text-red-700 font-semibold">View All →</a>
          </div>
          
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {featuredProducts.map((product: any) => (
                <div key={product.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-200 group">
                  <div className="relative h-48 bg-gray-100">
                    <Image
                      src={product.imageUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&h=400&fit=crop'}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-200"
                    />
                    {product.stock === 0 && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                        Out of Stock
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">P {product.price?.toFixed(2) || '0.00'}</span>
                      <button 
                        className={`px-4 py-2 rounded text-sm font-semibold transition duration-200 ${
                          product.stock === 0 
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                            : 'bg-red-600 text-white hover:bg-red-700'
                        }`}
                        disabled={product.stock === 0}
                      >
                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </button>
                    </div>
                    {product.stock > 0 && product.stock < 5 && (
                      <p className="text-xs text-orange-600 mt-2">Only {product.stock} left!</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found. Please check your database connection.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section - Makro Style */}
      <section className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated with StationeryHub</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about exclusive deals, new products, and special promotions.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-l-lg border-0 focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
            />
            <button className="bg-red-600 text-white px-6 py-3 rounded-r-lg font-semibold hover:bg-red-700 transition duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer - Makro Style */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/contact" className="hover:text-white transition duration-200">Contact Us</a></li>
                <li><a href="/help" className="hover:text-white transition duration-200">Help Center</a></li>
                <li><a href="/returns" className="hover:text-white transition duration-200">Returns & Exchanges</a></li>
                <li><a href="/shipping" className="hover:text-white transition duration-200">Shipping Info</a></li>
                <li><a href="/track-order" className="hover:text-white transition duration-200">Track Your Order</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">About StationeryHub</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about" className="hover:text-white transition duration-200">About Us</a></li>
                <li><a href="/careers" className="hover:text-white transition duration-200">Careers</a></li>
                <li><a href="/press" className="hover:text-white transition duration-200">Press</a></li>
                <li><a href="/corporate" className="hover:text-white transition duration-200">Corporate Sales</a></li>
                <li><a href="/suppliers" className="hover:text-white transition duration-200">Suppliers</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/products" className="hover:text-white transition duration-200">All Products</a></li>
                <li><a href="/deals" className="hover:text-white transition duration-200">Today's Deals</a></li>
                <li><a href="/brands" className="hover:text-white transition duration-200">Brands</a></li>
                <li><a href="/gift-cards" className="hover:text-white transition duration-200">Gift Cards</a></li>
                <li><a href="/store-locator" className="hover:text-white transition duration-200">Store Locator</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition duration-200">
                  <span className="text-sm font-semibold">f</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition duration-200">
                  <span className="text-sm font-semibold">t</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition duration-200">
                  <span className="text-sm font-semibold">in</span>
                </a>
              </div>
              <p className="text-gray-400 text-sm">
                📧 info@stationeryhub.co.bw<br/>
                📞 +267 XXX-XXXX<br/>
                🏢 Gaborone, Botswana
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 StationeryHub. All rights reserved. | Privacy Policy | Terms & Conditions</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
