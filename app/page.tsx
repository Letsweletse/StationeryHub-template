'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// WhatsApp Integration Component
function WhatsAppButton({ phone = "+26775560140", message = "Hello! I'm interested in your products and services" }) {
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  
  return (
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110"
    >
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.18-1.24-6.171-3.495-8.428"/>
      </svg>
    </a>
  );
}

// Executive Pain Point Weapon - FULL WIDTH
function ExecutivePainPointStrike() {
  const painPoints = [
    {
      problem: "🔄 Inefficient Procurement Wasting 15% of Budget",
      solution: "AI-powered supply chain that cuts costs by 22%",
      cta: "Show me the savings",
      whatsappMessage: "My procurement is inefficient. Show me how to save 22% on office supplies."
    },
    {
      problem: "📈 Operational Costs Killing Profit Margins", 
      solution: "Smart office infrastructure that reduces overhead by 35%",
      cta: "Boost my margins",
      whatsappMessage: "Operational costs are too high. How can I reduce overhead by 35%?"
    },
    {
      problem: "🤯 Supply Chain Disruptions Affecting Operations",
      solution: "Guaranteed 99.7% uptime with emergency response team",
      cta: "Secure my operations",
      whatsappMessage: "Supply chain issues are affecting my business. Need guaranteed uptime solution."
    }
  ];

  return (
    <section className="w-full bg-black text-white py-20">
      <div className="w-full px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Your Business Bleeds Money Here
        </h2>
        <p className="text-xl md:text-2xl text-gray-400 text-center mb-12">
          We stop the bleeding. Immediately.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {painPoints.map((point, index) => (
            <div key={index} className="bg-gray-900 rounded-2xl p-6 border border-red-500/30 hover:border-red-500 transition-all">
              <div className="text-red-500 text-lg font-bold mb-3">PROBLEM:</div>
              <h3 className="text-lg md:text-xl font-semibold mb-4">{point.problem}</h3>
              
              <div className="text-green-400 text-lg font-bold mb-3">SOLUTION:</div>
              <p className="text-gray-300 mb-6">{point.solution}</p>
              
              <a 
                href={`https://wa.me/26775560140?text=${encodeURIComponent(point.whatsappMessage)}`}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold text-center block transition-colors"
              >
                {point.cta} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Emergency CTA Button
function EmergencyCTA() {
  return (
    <a 
      href="https://wa.me/26775560140?text=EMERGENCY: My procurement is bleeding money. Need immediate cost reduction."
      className="fixed bottom-24 right-6 z-50 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl font-bold shadow-2xl transition-all duration-300 hover:scale-105 text-sm"
    >
      🚨 Stop Money Bleed
    </a>
  );
}

// Ultra Premium Header - FULL WIDTH
function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`w-full bg-white/95 backdrop-blur-lg sticky top-0 z-50 border-b transition-all duration-300 ${
      scrolled ? 'border-gray-200 shadow-sm' : 'border-transparent'
    }`}>
      <div className="w-full px-4">
        <div className="flex items-center justify-between h-16 max-w-7xl mx-auto">
          {/* Logo */}
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

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
              Home
            </Link>
            <Link href="/products" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
              Products
            </Link>
            <Link href="/business" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
              Business
            </Link>
            <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
              About
            </Link>
            <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
              Contact
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/contact" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

// Hero Section - FULL WIDTH
function AppleHero() {
  return (
    <section className="w-full bg-black text-white">
      <div className="w-full px-4 py-20 md:py-32">
        <div className="text-center max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            StationeryHub
          </h1>
          <p className="text-2xl md:text-4xl text-gray-400 mb-8 leading-relaxed">
            Enterprise office solutions.<br />Delivered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#pain-points"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-colors duration-200"
            >
              🚨 Stop Wasting Money
            </a>
            <a 
              href="https://wa.me/26775560140?text=Hello! I'm interested in enterprise solutions for my business"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-lg font-medium transition-colors duration-200 flex items-center"
            >
              WhatsApp Business
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// About Us Section - FULL WIDTH
function AboutUs() {
  return (
    <section className="w-full bg-white py-20">
      <div className="w-full px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About StationeryHub</h2>
            <p className="text-lg md:text-xl text-gray-600 mb-4 leading-relaxed">
              StationeryHub is Botswana's premier enterprise office solutions provider, dedicated to transforming workplace efficiency through premium supplies and integrated digital tools.
            </p>
            <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed">
              Founded with the vision to bridge the gap between traditional office supplies and modern digital business needs, we provide comprehensive solutions that empower businesses to operate smarter and grow faster.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-lg text-gray-700">500+ Business Clients Served</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-lg text-gray-700">Nationwide Delivery Network</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-lg text-gray-700">ISO Quality Certified Products</span>
              </div>
            </div>
            <a 
              href="https://wa.me/26775560140?text=Hello! I'd like to learn more about StationeryHub and your services"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold text-lg mt-6 transition-colors duration-200"
            >
              Connect on WhatsApp
            </a>
          </div>
          <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop"
              alt="About StationeryHub"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// Full Width Products - FULL WIDTH
function FullWidthProducts() {
  const products = [
    {
      name: "HP LaserJet 44A Toner Cartridge",
      price: "P 699",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500&h=500&fit=crop",
      category: "Print Supplies",
      whatsappMessage: "Hello! I'm interested in the HP LaserJet 44A Toner Cartridge for P699"
    },
    {
      name: "Ergonomic Executive Chair", 
      price: "P 1,299",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop",
      category: "Office Furniture",
      whatsappMessage: "Hello! I'd like to purchase the Ergonomic Executive Chair for P1,299"
    },
    {
      name: "Premium Writing Instrument Set",
      price: "P 456",
      image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500&h=500&fit=crop",
      category: "Writing Tools",
      whatsappMessage: "Hello! I want to order the Premium Writing Instrument Set for P456"
    },
    {
      name: "A4 Premium Copy Paper (500 sheets)",
      price: "P 90",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=500&fit=crop",
      category: "Office Paper",
      whatsappMessage: "Hello! I need A4 Premium Copy Paper - 500 sheets for P90"
    }
  ];

  return (
    <section id="products" className="w-full bg-gray-50 py-20">
      <div className="w-full px-4">
        <div className="text-center mb-12 max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-xl md:text-2xl text-gray-600">
            Premium office supplies with instant WhatsApp ordering
          </p>
        </div>

        {/* Full Width Sliding Container */}
        <div className="w-full">
          <div className="flex space-x-6 overflow-x-auto pb-8 px-4 scrollbar-hide">
            {products.map((product, index) => (
              <div key={index} className="flex-shrink-0 w-80">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                  <div className="relative h-64 bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-2xl font-bold text-gray-900 mb-4">
                      {product.price}
                    </p>
                    <a 
                      href={`https://wa.me/26775560140?text=${encodeURIComponent(product.whatsappMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold text-center block transition-colors duration-200"
                    >
                      Order on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Digital Solutions - FULL WIDTH
function DigitalSolutions() {
  const solutions = [
    {
      icon: '🌐',
      title: 'Professional Web Presence',
      description: 'One-month complimentary website trial with custom domain',
      whatsappMessage: "Hello! I'm interested in the Professional Web Presence package for my business"
    },
    {
      icon: '💬',
      title: 'WhatsApp Business Integration',
      description: 'Automated customer service and order management system',
      whatsappMessage: "Hello! I'd like to learn about WhatsApp Business Integration for my company"
    },
    {
      icon: '📧',
      title: 'Corporate Email Suite',
      description: 'Professional email hosting with your business domain',
      whatsappMessage: "Hello! I need Corporate Email Suite setup for my business"
    }
  ];

  return (
    <section className="w-full bg-white py-20">
      <div className="w-full px-4">
        <div className="text-center mb-12 max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Digital Business Solutions
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform your business operations with our integrated digital toolkit
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {solutions.map((solution, index) => (
            <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 p-6">
              <div className="text-4xl mb-4">{solution.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {solution.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {solution.description}
              </p>
              <a 
                href={`https://wa.me/26775560140?text=${encodeURIComponent(solution.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-lg"
              >
                Get Started
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Newsletter Signup - FULL WIDTH
function NewsletterSignup() {
  return (
    <section className="w-full bg-gray-900 text-white py-16">
      <div className="w-full px-4 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Connected</h2>
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          Get exclusive offers, new product updates, and business insights delivered to your inbox
        </p>
        
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
          >
            Subscribe
          </button>
        </form>
        
        <p className="text-gray-400 text-sm mt-3">
          No spam, unsubscribe at any time
        </p>
      </div>
    </section>
  );
}

// Footer - FULL WIDTH
function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white py-12">
      <div className="w-full px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <div>
            <div className="w-36 h-8 relative mb-4">
              <Image
                src="https://res.cloudinary.com/dseimivxo/image/upload/v1761627173/logo_uamr64.png"
                alt="StationeryHub"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Botswana's premier enterprise office solutions provider
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
              <li><Link href="/business" className="hover:text-white transition-colors">Business</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/products/printers" className="hover:text-white transition-colors">Printers & Cartridges</Link></li>
              <li><Link href="/products/stationery" className="hover:text-white transition-colors">Office Stationery</Link></li>
              <li><Link href="/products/furniture" className="hover:text-white transition-colors">Office Furniture</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-400 text-sm">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <a href="tel:+26775560140" className="hover:text-white transition-colors">+267 75560140</a>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <a href="mailto:sales@stationeryhub.co.bw" className="hover:text-white transition-colors">sales@stationeryhub.co.bw</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm max-w-7xl mx-auto">
          <p>&copy; 2024 StationeryHub Enterprise Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// Main Page Component
export default function Home() {
  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      <Header />
      <AppleHero />
      <ExecutivePainPointStrike />
      <AboutUs />
      <FullWidthProducts />
      <DigitalSolutions />
      <NewsletterSignup />
      <Footer />
      
      <WhatsAppButton />
      <EmergencyCTA />
    </div>
  );
}
