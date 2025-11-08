import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// WhatsApp Integration Component
function WhatsAppButton({ phone = "+26775560140", message = "Hello! I'm interested in your enterprise solutions" }) {
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  
  return (
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 group"
    >
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.18-1.24-6.171-3.495-8.428"/>
      </svg>
      <div className="absolute -top-12 right-0 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Executive WhatsApp Line
      </div>
    </a>
  );
}

// Ultra Premium Apple-style Header
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
    <header className={`bg-white/95 backdrop-blur-lg sticky top-0 z-50 border-b transition-all duration-300 ${
      scrolled ? 'border-gray-200 shadow-sm' : 'border-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-18">
          {/* Premium Logo */}
          <Link href="/" className="flex items-center group">
            <div className="w-48 h-8 relative">
              <Image
                src="https://res.cloudinary.com/dseimivxo/image/upload/v1761627173/logo_uamr64.png"
                alt="StationeryHub Enterprise"
                fill
                className="object-contain transition-transform group-hover:scale-105"
                priority
              />
            </div>
          </Link>

          {/* Executive Navigation */}
          <div className="hidden lg:flex items-center space-x-12">
            <Link href="/" className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-blue-600 pb-1">
              Executive Hub
            </Link>
            <Link href="/enterprise" className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-blue-600 pb-1">
              Enterprise Solutions
            </Link>
            <Link href="/procurement" className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-blue-600 pb-1">
              Procurement
            </Link>
            <Link href="/insights" className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-blue-600 pb-1">
              Business Insights
            </Link>
            <Link href="/contact" className="text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-blue-600 pb-1">
              C-Suite Contact
            </Link>
          </div>

          {/* Executive Action */}
          <div className="flex items-center space-x-6">
            <Link href="/procurement" className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-200 hover:shadow-lg">
              Procurement Portal
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

// Elite Business Hero
function EliteHero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white min-h-screen flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dseimivxo/image/upload/v1702891667/grid-pattern_azkfme.svg')] opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-8 py-32 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Trusted by 50+ Botswana Enterprises</span>
          </div>
          
          <h1 className="text-7xl md:text-8xl font-bold mb-8 tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            STATIONERYHUB
            <span className="block text-2xl md:text-3xl font-light text-blue-300 mt-4 tracking-widest">
              ENTERPRISE SOLUTIONS
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Strategic office infrastructure for Botswana's leading corporations. 
            <span className="block text-blue-300 font-semibold mt-2">Optimized procurement. Intelligent supply chain.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              href="#executive-portal" 
              className="bg-white hover:bg-gray-100 text-gray-900 px-12 py-5 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center space-x-3"
            >
              <span>Access Executive Portal</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a 
              href="https://wa.me/26775560140?text=Hello! I'm a business decision maker interested in enterprise solutions for our organization"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white/30 hover:border-white/60 text-white px-10 py-5 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center space-x-3 backdrop-blur-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.18-1.24-6.171-3.495-8.428"/>
              </svg>
              <span>Executive WhatsApp</span>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-gray-400 text-sm">Enterprise Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">P5M+</div>
              <div className="text-gray-400 text-sm">Annual Procurement</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-400 text-sm">Executive Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">99.7%</div>
              <div className="text-gray-400 text-sm">Uptime Guarantee</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Executive Client Portal
function ExecutivePortal() {
  return (
    <section id="executive-portal" className="py-28 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Executive Business Portal
          </h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Strategic tools for enterprise procurement and supply chain optimization
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Elite Loyalty Program */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-6 right-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold">
                ELITE TIER
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-4">🏆 Enterprise Rewards</h3>
            <p className="text-blue-100 mb-6">Strategic partnership benefits for volume procurement</p>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-blue-100">Current Points</span>
                <span className="text-2xl font-bold">12,450</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-3">
                <div className="bg-white h-3 rounded-full" style={{width: '62%'}}></div>
              </div>
              <div className="flex justify-between text-sm text-blue-200">
                <span>Silver Tier</span>
                <span>20,000 for Platinum</span>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Volume Discount</span>
                <span className="font-semibold">18% Applied</span>
              </div>
              <div className="flex justify-between">
                <span>Priority Delivery</span>
                <span className="font-semibold">Active</span>
              </div>
              <div className="flex justify-between">
                <span>Dedicated Account Manager</span>
                <span className="font-semibold">Assigned</span>
              </div>
            </div>
          </div>

          {/* Procurement Dashboard */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">📊 Procurement Analytics</h3>
            <p className="text-gray-600 mb-6">Real-time spending intelligence</p>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Monthly Budget</span>
                  <span>P 45,000 / P 50,000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '90%'}}></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-gray-900">P 28K</div>
                  <div className="text-sm text-gray-600">Office Supplies</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-gray-900">P 12K</div>
                  <div className="text-sm text-gray-600">IT Equipment</div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-sm text-green-600 font-semibold">15% under budget this quarter</div>
              </div>
            </div>
          </div>

          {/* Quick Executive Actions */}
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">⚡ Executive Actions</h3>
            <p className="text-gray-600 mb-6">Rapid procurement tools</p>
            
            <div className="space-y-4">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors duration-200">
                Quick Bulk Order
              </button>
              <button className="w-full border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 py-3 rounded-xl font-semibold transition-all duration-200">
                Download Procurement Report
              </button>
              <button className="w-full border-2 border-gray-300 hover:border-green-600 text-gray-700 hover:text-green-600 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.18-1.24-6.171-3.495-8.428"/>
                </svg>
                <span>Emergency Order via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* AI Business Intelligence */}
        <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-3xl p-8 text-white">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">🤖 AI Business Intelligence</h3>
              <p className="text-blue-200">Smart insights for strategic decision making</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold">
              LIVE ANALYSIS
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-green-400 text-sm font-semibold mb-2">COST OPTIMIZATION</div>
              <div className="text-2xl font-bold mb-2">Save 22%</div>
              <div className="text-blue-200 text-sm">Switch to quarterly bulk ordering</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-blue-400 text-sm font-semibold mb-2">INVENTORY ALERT</div>
              <div className="text-2xl font-bold mb-2">14 Days</div>
              <div className="text-blue-200 text-sm">Toner replacement needed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-purple-400 text-sm font-semibold mb-2">TREND ANALYSIS</div>
              <div className="text-2xl font-bold mb-2">+15%</div>
              <div className="text-blue-200 text-sm">Paper consumption vs last quarter</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Premium Products for Enterprises
function EnterpriseProducts() {
  const enterpriseProducts = [
    {
      name: "HP LaserJet Enterprise M750n",
      price: "P 8,999",
      image: "https://res.cloudinary.com/dseimivxo/image/upload/v1702891667/enterprise-printer_zzkf8e.jpg",
      category: "Enterprise Printing",
      specs: ["Up to 50 users", "10,000 pages/month", "3-year warranty"],
      whatsappMessage: "Hello! I'm interested in the HP LaserJet Enterprise M750n for our organization"
    },
    {
      name: "Executive Office Suite Package",
      price: "P 25,000",
      image: "https://res.cloudinary.com/dseimivxo/image/upload/v1702891667/executive-office_plkf9m.jpg",
      category: "Premium Furniture",
      specs: ["10 workstations", "Executive desks", "Ergonomic chairs"],
      whatsappMessage: "Hello! I'd like to discuss the Executive Office Suite Package for our new office"
    },
    {
      name: "Enterprise Toner Cartridge Set",
      price: "P 3,499",
      image: "https://res.cloudinary.com/dseimivxo/image/upload/v1702891667/toner-cartridges_mdkf2n.jpg",
      category: "Print Supplies",
      specs: ["6 cartridges", "30,000 pages", "Bulk discount"],
      whatsappMessage: "Hello! Need Enterprise Toner Cartridge Set for our printing needs"
    },
    {
      name: "Boardroom Technology Package",
      price: "P 15,999",
      image: "https://res.cloudinary.com/dseimivxo/image/upload/v1702891667/boardroom-tech_xlkf4p.jpg",
      category: "Meeting Solutions",
      specs: ["4K display", "Video conferencing", "Wireless presentation"],
      whatsappMessage: "Hello! Interested in Boardroom Technology Package for our executive meetings"
    }
  ];

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Enterprise-Grade Solutions
          </h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Premium equipment and supplies for corporate environments
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {enterpriseProducts.map((product, index) => (
            <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200 hover:shadow-3xl transition-all duration-500 group">
              <div className="relative h-80 bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-white/95 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full text-sm font-semibold">
                    {product.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                  {product.name}
                </h3>
                
                <div className="space-y-2 mb-6">
                  {product.specs.map((spec, specIndex) => (
                    <div key={specIndex} className="flex items-center space-x-3 text-gray-600">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-gray-900">
                    {product.price}
                  </div>
                  <a 
                    href={`https://wa.me/26775560140?text=${encodeURIComponent(product.whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 flex items-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.18-1.24-6.171-3.495-8.428"/>
                    </svg>
                    <span>Request Quote</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Strategic Business Insights
function StrategicInsights() {
  const insights = [
    {
      title: "Botswana Corporate Procurement Strategy 2024",
      description: "Optimize your office supply chain with tax-efficient purchasing strategies compliant with BURS regulations.",
      category: "STRATEGY",
      readTime: "8 min read",
      image: "https://res.cloudinary.com/dseimivxo/image/upload/v1702891667/procurement-strategy_qlkf5r.jpg"
    },
    {
      title: "Digital Transformation for Botswana Enterprises",
      description: "Leverage AI and automation to reduce operational costs by 35% while improving efficiency.",
      category: "DIGITAL",
      readTime: "12 min read", 
      image: "https://res.cloudinary.com/dseimivxo/image/upload/v1702891667/digital-transformation_mtkf6s.jpg"
    },
    {
      title: "Executive Guide: Office Efficiency in Hybrid Work Era",
      description: "Strategic framework for managing distributed teams with optimal resource allocation.",
      category: "LEADERSHIP",
      readTime: "10 min read",
      image: "https://res.cloudinary.com/dseimivxo/image/upload/v1702891667/hybrid-work_ntkf7t.jpg"
    }
  ];

  return (
    <section className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Strategic Business Insights
          </h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Executive intelligence for Botswana's business leaders
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group">
              <div className="relative h-48 bg-gray-100">
                <Image
                  src={insight.image}
                  alt={insight.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wider">
                    {insight.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                  {insight.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {insight.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{insight.readTime}</span>
                  <a 
                    href={`https://wa.me/26775560140?text=Hello! I'd like to discuss: ${encodeURIComponent(insight.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center space-x-1"
                  >
                    <span>Consult Expert</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA for Business Consultation */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Business Operations?</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Schedule a strategic consultation with our enterprise solutions team
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/26775560140?text=Hello! I'd like to schedule a strategic business consultation for our organization"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              Book Executive Consultation
            </a>
            <a 
              href="tel:+26775560140"
              className="border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              Call Executive Line
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Elite Footer
function EliteFooter() {
  return (
    <footer className="bg-gray-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div>
            <div className="w-48 h-8 relative mb-6">
              <Image
                src="https://res.cloudinary.com/dseimivxo/image/upload/v1761627173/logo_uamr64.png"
                alt="StationeryHub Enterprise"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Botswana's premier enterprise solutions provider for strategic office infrastructure and digital transformation.
            </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com/company/stationeryhub" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-6 text-lg">Enterprise Solutions</h4>
            <ul className="space-y-4 text-gray-400 text-lg">
              <li><Link href="/procurement" className="hover:text-white transition-colors">Procurement Portal</Link></li>
              <li><Link href="/enterprise" className="hover:text-white transition-colors">Enterprise Products</Link></li>
              <li><Link href="/digital" className="hover:text-white transition-colors">Digital Transformation</Link></li>
              <li><Link href="/consulting" className="hover:text-white transition-colors">Business Consulting</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-6 text-lg">Executive Resources</h4>
            <ul className="space-y-4 text-gray-400 text-lg">
              <li><Link href="/insights" className="hover:text-white transition-colors">Business Insights</Link></li>
              <li><Link href="/case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
              <li><Link href="/whitepapers" className="hover:text-white transition-colors">Whitepapers</Link></li>
              <li><Link href="/webinars" className="hover:text-white transition-colors">Executive Webinars</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-6 text-lg">C-Suite Contact</h4>
            <div className="space-y-4 text-gray-400 text-lg">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <a href="tel:+26775560140" className="hover:text-white transition-colors">+267 75560140</a>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <a href="mailto:executive@stationeryhub.co.bw" className="hover:text-white transition-colors">executive@stationeryhub.co.bw</a>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>Gaborone Financial Hub, Botswana</span>
              </div>
              <a 
                href="https://wa.me/26775560140"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-green-400 hover:text-green-300 mt-4 font-semibold"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.18-1.24-6.171-3.495-8.428"/>
                </svg>
                Executive WhatsApp Line
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-400 text-lg">
          <p>&copy; 2024 StationeryHub Enterprise Solutions. Premium office infrastructure for Botswana's business leaders.</p>
        </div>
      </div>
    </footer>
  );
}

// Main Page Component
export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <EliteHero />
      <ExecutivePortal />
      <EnterpriseProducts />
      <StrategicInsights />
      <EliteFooter />
      
      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}
