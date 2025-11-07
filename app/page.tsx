import Image from 'next/image';
import Link from 'next/link';

// Header Component
function Header() {
  return (
    <header className="bg-yellow-500 shadow-sm border-b border-yellow-600">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-48 h-16 relative">
              <Image
                src="https://res.cloudinary.com/dseimivxo/image/upload/v1761627173/logo_uamr64.png"
                alt="StationeryHub Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-gray-100 font-medium transition-colors duration-200">
              Home
            </Link>
            <Link href="/products" className="text-white hover:text-gray-100 font-medium transition-colors duration-200">
              Products
            </Link>
            <Link href="/business" className="text-white hover:text-gray-100 font-medium transition-colors duration-200">
              Business
            </Link>
            <Link href="/education" className="text-white hover:text-gray-100 font-medium transition-colors duration-200">
              Education
            </Link>
            <Link href="/contact" className="text-white hover:text-gray-100 font-medium transition-colors duration-200">
              Contact
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="text-white hover:text-gray-100 transition-colors duration-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </Link>
            <Link href="/contact" className="bg-white text-yellow-600 hover:bg-gray-100 px-4 py-2 rounded-lg font-semibold transition-colors duration-200">
              Get Quote
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200">
              Products
            </Link>
            <Link href="/business" className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200">
              Business
            </Link>
            <Link href="/education" className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200">
              Education
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200">
              Contact
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="text-gray-700 hover:text-red-600 transition-colors duration-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </Link>
            <Link href="/contact" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200">
              Get Quote
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

// Function to fetch real products from your database
async function getProducts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://stationeryhub.co.bw';
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

// Hero slides between products
const heroSlides = [
  'https://res.cloudinary.com/dseimivxo/image/upload/v1761665744/Hero_1_pymjmc.png',
  'https://res.cloudinary.com/dseimivxo/image/upload/v1761665743/Hero_2_zmt98u.png',
  'https://res.cloudinary.com/dseimivxo/image/upload/v1761665745/Hero_4_nimrnz.png',
  'https://res.cloudinary.com/dseimivxo/image/upload/v1761665741/Hero_5_furzrq.png',
  'https://res.cloudinary.com/dseimivxo/image/upload/v1761665745/Hero_6_lu4wuu.png'
];

// Before footer slides
const footerSlides = [
  'https://res.cloudinary.com/dseimivxo/image/upload/v1761737331/1_oirpow.png',
  'https://res.cloudinary.com/dseimivxo/image/upload/v1761737333/2_ezvzow.png',
  'https://res.cloudinary.com/dseimivxo/image/upload/v1761737340/3_rspdke.png',
  'https://res.cloudinary.com/dseimivxo/image/upload/v1761737341/4_elpyai.png'
];

// What You Get perks with AI background images
const perks = [
  {
    id: 1,
    icon: '💻',
    title: 'Free 1-Month Website Trial',
    description: 'Get your business online with a professional one-page site',
    bgImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    icon: '🤖',
    title: 'WhatsApp Automation Setup',
    description: 'Manage inquiries and repeat orders instantly through WhatsApp',
    bgImage: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    icon: '📧',
    title: 'Professional Email Hosting',
    description: 'Look credible with a yourname@yourbusiness.co.bw email',
    bgImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    icon: '📢',
    title: 'Discounted Social Media Marketing',
    description: 'Boost your brand visibility at a fraction of the normal price',
    bgImage: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    icon: '📊',
    title: 'Free AI-Powered Business Insights',
    description: 'See how your business can grow through smart data',
    bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
  }
];

export default async function Home() {
  const products = await getProducts();
  const featuredProducts = products.filter((p: any) => p.is_featured).slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional Top Banner */}
      <div className="bg-gradient-to-r from-red-700 to-red-800 text-white py-2 px-4 text-center text-sm font-medium">
        <p> Free delivery across Gaborone for orders over P5000 | 📞 Business inquiries: +267 75560140</p>
      </div>

      {/* Use Header Component */}
      <Header />

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
        <Link href={category.link} className="flex items-center justify-between text-gray-700 hover:text-red-600 transition-colors duration-200 group py-3 border-b border-gray-100 last:border-b-0">
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
        </Link>
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
                      <a href="/products" className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-4 rounded-lg font-bold text-center transition-colors duration-200">
                        Explore Business Solutions
                      </a>
                      <a href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-4 rounded-lg font-bold text-center transition-colors duration-200">
                        Request Quote
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: What You Get Section - With Background Images */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">What You Get With Every Purchase</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Every time you shop with StationeryHub, you unlock exclusive digital perks for your business
            </p>
          </div>
          
          {/* Perks Grid with Background Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
            {perks.map((perk) => (
              <div 
                key={perk.id}
                className="relative rounded-2xl overflow-hidden group cursor-pointer h-64"
              >
                {/* Background Image */}
                <Image
                  src={perk.bgImage}
                  alt={perk.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <div className="text-3xl mb-3">{perk.icon}</div>
                  <h3 className="font-bold text-lg mb-2 leading-tight">{perk.title}</h3>
                  <p className="text-sm opacity-90 leading-relaxed">{perk.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* About Us Section */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">About Us</h3>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed mb-6">
              At StationeryHub, we go beyond selling pens and paper. We believe every business — 
              small or large — deserves the tools to run smarter. When you buy your stationery or 
              office supplies from us, you don't just get quality products delivered to your door. 
              You also get access to digital growth tools that help your business attract more customers, 
              stay organized, and save time.
            </p>
            <div className="bg-red-600 text-white inline-block px-6 py-3 rounded-lg font-semibold text-lg">
              Our Promise: "Buy smarter. Work smarter. Grow faster."
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Hero Slides Between Products - Static Grid */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Our Business Solutions</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {heroSlides.map((slide, index) => (
              <div key={index} className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <Image
                  src={slide}
                  alt={`Business Solution ${index + 1}`}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
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
            <a href="/products" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
              View All Products
            </a>
          </div>
          
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product: any) => (
                <div key={product.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden">
                  <div className="relative h-48 bg-gray-100">
                    <Image
                      src={product.image_url || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&h=400&fit=crop'}
                      alt={product.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
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
                      <a 
                        href={`/product/${product.id}`}
                        className={`px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
                          product.stock === 0 
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                            : 'bg-red-600 text-white hover:bg-red-700 transform hover:scale-105'
                        }`}
                      >
                        {product.stock === 0 ? 'Out of Stock' : 'View Details'}
                      </a>
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

      {/* NEW: Before Footer Slideshow - Static Grid */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">Why Choose StationeryHub?</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {footerSlides.map((slide, index) => (
              <div key={index} className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <Image
                  src={slide}
                  alt={`Business Advantage ${index + 1}`}
                  width={400}
                  height={300}
                  className="w-full h-64 object-contain bg-gray-100"
                />
              </div>
            ))}
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
              <div key={offer.id} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200">
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
              <p className="text-gray-600 text-sm">Delivery across Botswana for qualified orders</p>
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

      {/* NEW: Final Call to Action */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-6 tracking-tight">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Whether you're restocking your office, setting up a home workspace, or growing your small business —
            StationeryHub helps you do it smarter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/products" className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg text-center">
              🛒 Start Shopping
            </a>
            <a href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-red-600 transition-colors duration-200 text-center">
               Activate Digital Perks
            </a>
          </div>
          <p className="text-sm mt-6 opacity-80">
            One Vendor, Multiple Solutions • Better ROI • Local Advantage • Business Empowerment
          </p>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-32 h-12 relative">
                  <Image
                    src="https://res.cloudinary.com/dseimivxo/image/upload/v1761627173/logo_uamr64.png"
                    alt="StationeryHub Logo"
                    fill
                    className="object-contain"
                  />
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
