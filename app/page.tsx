import Image from 'next/image';
import Link from 'next/link';

// Premium Apple-style Header
function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Apple Style */}
          <Link href="/" className="flex items-center">
            <div className="w-40 h-8 relative">
              <Image
                src="https://res.cloudinary.com/dseimivxo/image/upload/v1761627173/logo_uamr64.png"
                alt="StationeryHub"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Navigation - Clean Apple Style */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
              Home
            </Link>
            <Link href="/products" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
              Products
            </Link>
            <Link href="/business" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
              Business
            </Link>
            <Link href="/education" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
              Education
            </Link>
            <Link href="/support" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
              Support
            </Link>
          </nav>

          {/* Action Buttons - Minimal */}
          <div className="flex items-center space-x-4">
            <Link href="/search" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
            <Link href="/cart" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

// Apple-style Hero Section
function AppleHero() {
  return (
    <section className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            StationeryHub
          </h1>
          <p className="text-2xl md:text-3xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Premium office supplies. Exceptional service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/products" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors duration-200"
            >
              Shop Now
            </Link>
            <Link 
              href="/business" 
              className="text-blue-400 hover:text-blue-300 text-lg font-medium transition-colors duration-200 flex items-center"
            >
              Learn more about business solutions 
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Feature Section - Apple Style
function FeaturesSection() {
  const features = [
    {
      title: "Premium Quality",
      description: "Only the finest office supplies from trusted brands",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop"
    },
    {
      title: "Fast Delivery",
      description: "Next-day delivery across Gaborone for all orders",
      image: "https://images.unsplash.com/photo-1556742044-3c7348471c9f?w=400&h=300&fit=crop"
    },
    {
      title: "Business Solutions",
      description: "Custom packages for enterprises and institutions",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop"
    }
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose StationeryHub
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the difference with Botswana's premier office supply partner
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="relative h-64 mb-6 rounded-2xl overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Products Showcase - Apple Grid Style
function ProductsShowcase() {
  const products = [
    {
      name: "HP LaserJet Cartridges",
      price: "P 189.99",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=400&fit=crop",
      category: "Cartridges"
    },
    {
      name: "Executive Office Chair",
      price: "P 1,299.99",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      category: "Furniture"
    },
    {
      name: "Premium Writing Set",
      price: "P 45.50",
      image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400&h=400&fit=crop",
      category: "Stationery"
    },
    {
      name: "A4 Copy Paper",
      price: "P 89.99",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
      category: "Paper"
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600">
            Carefully selected for quality and performance
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div key={index} className="group text-center">
              <div className="relative h-80 mb-4 rounded-2xl overflow-hidden bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {product.name}
              </h3>
              <p className="text-2xl font-bold text-gray-900 mb-4">
                {product.price}
              </p>
              <Link 
                href="/products" 
                className="inline-block bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-full font-medium transition-colors duration-200"
              >
                Buy
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Business Solutions - Clean Section
function BusinessSolutions() {
  return (
    <section className="bg-gray-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Business Solutions
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Custom office supply programs for enterprises, schools, and government institutions across Botswana. Get volume pricing, dedicated account management, and streamlined procurement.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-lg">Volume pricing discounts</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-lg">Dedicated account managers</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-lg">Custom delivery schedules</span>
              </div>
            </div>
            <Link 
              href="/business" 
              className="inline-block bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg mt-8 transition-colors duration-200"
            >
              Learn about business solutions
            </Link>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop"
              alt="Business Solutions"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Page Component
export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <AppleHero />
      <FeaturesSection />
      <ProductsShowcase />
      <BusinessSolutions />
      
      {/* Footer - Apple Style */}
      <footer className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="w-32 h-8 relative mb-4">
                <Image
                  src="https://res.cloudinary.com/dseimivxo/image/upload/v1761627173/logo_uamr64.png"
                  alt="StationeryHub"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-gray-600 text-sm">
                Botswana's premier office supply partner
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/products" className="hover:text-gray-900">All Products</Link></li>
                <li><Link href="/cartridges" className="hover:text-gray-900">Cartridges</Link></li>
                <li><Link href="/stationery" className="hover:text-gray-900">Stationery</Link></li>
                <li><Link href="/furniture" className="hover:text-gray-900">Furniture</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Business</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/business" className="hover:text-gray-900">Business Solutions</Link></li>
                <li><Link href="/education" className="hover:text-gray-900">Education</Link></li>
                <li><Link href="/government" className="hover:text-gray-900">Government</Link></li>
                <li><Link href="/contact" className="hover:text-gray-900">Contact Sales</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/contact" className="hover:text-gray-900">Contact Us</Link></li>
                <li><Link href="/delivery" className="hover:text-gray-900">Delivery Info</Link></li>
                <li><Link href="/returns" className="hover:text-gray-900">Returns</Link></li>
                <li><Link href="/support" className="hover:text-gray-900">Help & Support</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2024 StationeryHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
