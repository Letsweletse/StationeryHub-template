'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

// WhatsApp Integration Component
function WhatsAppButton() {
  const phone = "+26775560140";
  const message = "Hello! I'm interested in your products and services";
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

// Apple-style Image Slider
function AppleImageSlider() {
  const slides = [
    "https://res.cloudinary.com/dseimivxo/image/upload/v1761665745/Hero_4_nimrnz.png",
    "https://res.cloudinary.com/dseimivxo/image/upload/v1761665744/Hero_1_pymjmc.png",
    "https://res.cloudinary.com/dseimivxo/image/upload/v1761665743/Hero_2_zmt98u.png",
    "https://res.cloudinary.com/dseimivxo/image/upload/v1761665745/Hero_6_lu4wuu.png",
    "https://res.cloudinary.com/dseimivxo/image/upload/v1761665741/Hero_5_furzrq.png"
  ];

  return (
    <section className="w-full bg-white py-16">
      <div className="w-full px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Premium Office Solutions</h2>
            <p className="text-xl text-gray-600">Experience the StationeryHub difference</p>
          </div>
          
          <div className="flex space-x-6 overflow-x-auto pb-8" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {slides.map((slide, index) => (
              <div key={index} className="flex-shrink-0 w-80">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48">
                    <Image
                      src={slide}
                      alt={`Office Solution ${index + 1}`}
                      fill
                      className="object-cover"
                    />
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
    <header className={`w-full bg-white/95 sticky top-0 z-50 border-b transition-all duration-300 ${
      scrolled ? 'border-gray-200 shadow-sm' : 'border-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-20"> {/* Increased height */}
          {/* Logo - Made Larger */}
          <Link href="/" className="flex items-center">
            <div className="w-60 h-12 relative"> {/* Increased size */}
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
          <div className="hidden md:flex items-center space-x-10">
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
              Home
            </Link>
            
            {/* Explore Products with Dropdown */}
            <div className="relative group">
              <button className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 flex items-center">
                Explore Products
                <svg className="ml-1 w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-4 grid grid-cols-2 gap-4">
                  {/* Mobile Brands Column */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">Mobile</h3>
                    <ul className="space-y-1">
                      <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 block py-1">Mi</a></li>
                      <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 block py-1">Realme</a></li>
                      <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 block py-1">Samsung</a></li>
                      <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 block py-1">Oppo</a></li>
                      <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 block py-1">Apple</a></li>
                      <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 block py-1">Vivo</a></li>
                    </ul>
                  </div>
                  
                  {/* Speakers Column */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">Speakers</h3>
                    <ul className="space-y-1">
                      <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 block py-1">Home Audio Speakers</a></li>
                      <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 block py-1">Home Theatres</a></li>
                      <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 block py-1">Soundbars</a></li>
                      <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 block py-1">Bluetooth Speakers</a></li>
                      <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 block py-1">DTH Set Top Box</a></li>
                    </ul>
                  </div>
                  
                  {/* Mobile Accessories Column */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">Mobile Accessories</h3>
                    <ul className="space-y-1">
                      <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 block py-1">Mobile Cases</a></li>
                      <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 block py-1">Headphones & Headsets</a></li>
                      <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 block py-1">Power Banks</a></li>
                      <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 block py-1">Screenguards</a></li>
                    </ul>
                  </div>
                  
                  {/* Computer Accessories Column */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">Computer Accessories</h3>
                    <ul className="space-y-1">
                      <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 block py-1">External Hard Disks</a></li>
                      <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 block py-1">Pendrives</a></li>
                      <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 block py-1">Laptop Skins & Decals</a></li>
                      <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 block py-1">Laptop Bags</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

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
          <div className="flex items-center space-x-6">
            <Link href="/contact" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
              Contact Sales
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

// Apple-level Hero Section with Video Background
function AppleHero() {
  return (
    <section className="relative bg-black text-white h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="https://res.cloudinary.com/dseimivxo/video/upload/v1762764005/Hero_Section_clip_mazwgq.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Dark Overlay for Better Text Readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>
      
      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-7xl mx-auto px-8">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
          StationeryHub
        </h1>
        <p className="text-3xl md:text-4xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
          Enterprise office solutions.<br />Delivered.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <Link 
            href="#products" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full text-lg font-medium transition-colors duration-200"
          >
            View Products
          </Link>
          <a 
            href="https://wa.me/26775560140?text=Hello! I'm interested in enterprise solutions for my business"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:text-blue-200 text-lg font-medium transition-colors duration-200 flex items-center"
          >
            WhatsApp Business
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

// Product Card Component
function ProductCard({ product }: { product: any }) {
  return (
    <div className="flex-shrink-0 w-80">
      <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
        <div className="relative h-64 bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-5 left-5">
            <span className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium">
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
  );
}

// Full Width Sliding Products - ORIGINAL
function FullWidthProducts() {
  const products = [
    {
      name: "HP 3YP17A Colour Printhead",
      price: "P 780.00",
      image: "https://res.cloudinary.com/dseimivxo/image/upload/v1762681955/H3YP17AE_qupbup.jpg",
      category: "Print Supplies",
      whatsappMessage: "Hello! I'm interested in the HP 3YP17A Colour Printhead for P780"
    },
    {
      name: "HP 47 Black Ink Cartridge", 
      price: "P 280.00",
      image: "https://res.cloudinary.com/dseimivxo/image/upload/v1762681958/H6ZD61AE_op7tus.png",
      category: "Print Supplies",
      whatsappMessage: "Hello! I'd like to purchase the HP 47 Black Ink Cartridge P280.00"
    },
    {
      name: "HP 57 Colour Ink Cartridge",
      price: "P 2,156.00",
      image: "https://res.cloudinary.com/dseimivxo/image/upload/v1762681956/HC6657AE_b6ra8c.jpg",
      category: "Print Supplies",
      whatsappMessage: "Hello! I want to order the Premium Writing Instrument Set for P456"
    },
    {
      name: "Canon 486 Standard Colour Ink Cartridge",
      price: "P 90",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=500&fit=crop",
      category: "Office Paper",
      whatsappMessage: "Hello! I need A4 Premium Copy Paper - 500 sheets for P90"
    },
    {
      name: "HP LaserJet Pro M404dn",
      price: "P 2,199",
      image: "https://images.unsplash.com/photo-1558756520-22cfe5d382ca?w=500&h=500&fit=crop",
      category: "Office Equipment",
      whatsappMessage: "Hello! I'm interested in the HP LaserJet Pro M404dn printer for P2,199"
    },
    {
      name: "Executive Desk Organizer Set",
      price: "P 355",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop",
      category: "Desk Accessories",
      whatsappMessage: "Hello! I'd like the Executive Desk Organizer Set for P355"
    }
  ];

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-5">
            Featured Products
          </h2>
          <p className="text-2xl text-gray-600">
            Premium office supplies with instant WhatsApp ordering
          </p>
        </div>

        {/* Full Width Sliding Container */}
        <div className="relative">
          <div className="flex space-x-8 overflow-x-auto pb-8" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/products" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-lg"
          >
            View All Products
            <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Digital Business Solutions with Arrow Scrollers - UPDATED with larger images
function DigitalSolutions() {
  const images = [
    "https://res.cloudinary.com/dseimivxo/image/upload/v1762759498/2_guqitl.png",
    "https://res.cloudinary.com/dseimivxo/image/upload/v1762759477/6_n3wjje.png",
    "https://res.cloudinary.com/dseimivxo/image/upload/v1762759473/3_emtghn.png",
    "https://res.cloudinary.com/dseimivxo/image/upload/v1762759467/5_iubpve.png",
    "https://res.cloudinary.com/dseimivxo/image/upload/v1762759443/4_m6jg7o.png",
    "https://res.cloudinary.com/dseimivxo/image/upload/v1762759386/7_cjamjj.png"
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -600, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 600, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-5">
            Digital Business Solutions
          </h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform your business operations with our integrated digital toolkit
          </p>
        </div>

        {/* Images Container with Arrow Controls - UPDATED with larger container */}
        <div className="relative">
          {/* Left Arrow */}
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 z-10 bg-white hover:bg-white text-gray-800 hover:text-blue-600 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Images Scroll Container - UPDATED with larger images */}
          <div 
            ref={scrollContainerRef}
            className="flex space-x-8 overflow-x-auto pb-8 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {images.map((image, index) => (
              <div key={index} className="flex-shrink-0 w-[800px]"> {/* Increased width */}
                <div className="bg-white rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100">
                  <div className="relative h-[600px] w-full"> {/* Increased height */}
                    <Image
                      src={image}
                      alt={`Digital Solution ${index + 1}`}
                      fill
                      className="object-contain hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 z-10 bg-white hover:bg-white text-gray-800 hover:text-blue-600 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-3 mt-8">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (scrollContainerRef.current) {
                  const scrollPosition = index * 828; // 800px width + 28px gap
                  scrollContainerRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
                }
              }}
              className="w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors duration-200"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Newsletter Signup
function NewsletterSignup() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-8 text-center">
        <h2 className="text-4xl font-bold mb-6">Stay Connected</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Get exclusive offers, new product updates, and business insights delivered to your inbox
        </p>
        
        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email address"
            className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors duration-200"
          >
            Subscribe
          </button>
        </form>
        
        <p className="text-gray-400 text-sm mt-4">
          No spam, unsubscribe at any time
        </p>
      </div>
    </section>
  );
}

// Complete Footer
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="w-48 h-12 relative mb-6"> {/* Increased footer logo size */}
              <Image
                src="https://res.cloudinary.com/dseimivxo/image/upload/v1761627173/logo_uamr64.png"
                alt="StationeryHub"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Botswana's premier enterprise office solutions provider
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/stationeryhub" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://instagram.com/stationeryhub" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.24 14.815 3.75 13.664 3.75 12.367s.49-2.448 1.376-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.886.875 1.376 2.026 1.376 3.323s-.49 2.448-1.376 3.323c-.875.808-2.026 1.297-3.323 1.297z"/>
                </svg>
              </a>
              <a href="https://linkedin.com/company/stationeryhub" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-4 text-gray-400 text-lg">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/business" className="hover:text-white transition-colors">Business Solutions</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-6 text-lg">Categories</h4>
            <ul className="space-y-4 text-gray-400 text-lg">
              <li><Link href="/products/printers" className="hover:text-white transition-colors">Printers & Cartridges</Link></li>
              <li><Link href="/products/stationery" className="hover:text-white transition-colors">Office Stationery</Link></li>
              <li><Link href="/products/furniture" className="hover:text-white transition-colors">Office Furniture</Link></li>
              <li><Link href="/products/technology" className="hover:text-white transition-colors">Technology</Link></li>
              <li><Link href="/products/supplies" className="hover:text-white transition-colors">Office Supplies</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-6 text-lg">Contact Info</h4>
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
                <a href="mailto:sales@stationeryhub.co.bw" className="hover:text-white transition-colors">sales@stationeryhub.co.bw</a>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>Gaborone, Botswana</span>
              </div>
              <a 
                href="https://wa.me/26775560140"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-green-400 hover:text-green-300 mt-4"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.18-1.24-6.171-3.495-8.428"/>
                </svg>
                Message us on WhatsApp
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-400 text-lg">
          <p>&copy; 2024 StationeryHub Enterprise Solutions. All rights reserved.</p>
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
      <AppleHero />
      <FullWidthProducts />
      <AppleImageSlider />
      <DigitalSolutions />
      <NewsletterSignup />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
