import Image from 'next/image';
import Link from 'next/link';

// Ultra Premium Apple-style Header
function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Refined */}
          <Link href="/" className="flex items-center">
            <div className="w-44 h-9 relative">
              <Image
                src="https://res.cloudinary.com/dseimivxo/image/upload/v1761627173/logo_uamr64.png"
                alt="StationeryHub"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Navigation - Ultra Clean */}
          <div className="hidden md:flex items-center space-x-10">
            <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
              Home
            </Link>
            <Link href="/products" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
              Products
            </Link>
            <Link href="/business" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
              Business
            </Link>
            <Link href="/enterprise" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
              Enterprise
            </Link>
            <Link href="/support" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
              Support
            </Link>
          </div>

          {/* Action Buttons - Minimal */}
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

// Apple-level Hero Section
function AppleHero() {
  return (
    <section className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-8 py-32">
        <div className="text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
            StationeryHub
          </h1>
          <p className="text-3xl md:text-4xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            Enterprise office solutions.<br />Delivered.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link 
              href="/products" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full text-lg font-medium transition-colors duration-200"
            >
              View Products
            </Link>
            <Link 
              href="/enterprise" 
              className="text-blue-400 hover:text-blue-300 text-lg font-medium transition-colors duration-200 flex items-center"
            >
              Enterprise solutions 
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Digital Business Solutions - Ultra Premium
function DigitalSolutions() {
  const solutions = [
    {
      icon: '🌐',
      title: 'Professional Web Presence',
      description: 'One-month complimentary website trial with custom domain',
      detail: 'Includes hosting, SSL certificate, and basic SEO setup',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=400&fit=crop'
    },
    {
      icon: '💬',
      title: 'WhatsApp Business Integration',
      description: 'Automated customer service and order management system',
      detail: 'AI-powered responses, order tracking, and 24/7 availability',
      image: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=500&h=400&fit=crop'
    },
    {
      icon: '📧',
      title: 'Corporate Email Suite',
      description: 'Professional email hosting with your business domain',
      detail: 'Secure, reliable email with 99.9% uptime guarantee',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=400&fit=crop'
    },
    {
      icon: '📱',
      title: 'Digital Marketing Suite',
      description: 'Strategic social media and online presence management',
      detail: 'Content creation, audience targeting, and performance analytics',
      image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=500&h=400&fit=crop'
    },
    {
      icon: '🤖',
      title: 'AI Business Intelligence',
      description: 'Data-driven insights and growth opportunity analysis',
      detail: 'Market trends, customer behavior, and revenue optimization',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=400&fit=crop'
    }
  ];

  return (
    <section className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-gray-900 mb-5">
            Digital Business Solutions
          </h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform your business operations with our integrated digital toolkit
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div key={index} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100">
              <div className="relative h-64">
                <Image
                  src={solution.image}
                  alt={solution.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute top-6 left-6 text-3xl">
                  {solution.icon}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {solution.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-3">
                  {solution.description}
                </p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {solution.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Premium Products Showcase
function PremiumProducts() {
  const products = [
    {
      name: "HP LaserJet 44A Toner Cartridge",
      price: "P 699",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500&h=500&fit=crop",
      category: "Print Supplies"
    },
    {
      name: "Ergonomic Executive Chair", 
      price: "P 1,299",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop",
      category: "Office Furniture"
    },
    {
      name: "Premium Writing Instrument Set",
      price: "P 456",
      image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500&h=500&fit=crop",
      category: "Writing Tools"
    },
    {
      name: "A4 Premium Copy Paper",
      price: "P 90",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=500&fit=crop",
      category: "Office Paper"
    },
    {
      name: "HP LaserJet Pro M404dn",
      price: "P 2,199",
      image: "https://images.unsplash.com/photo-1558756520-22cfe5d382ca?w=500&h=500&fit=crop",
      category: "Office Equipment"
    },
    {
      name: "Executive Desk Organizer",
      price: "P 355",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop",
      category: "Desk Accessories"
    }
  ];

  return (
    <section className="py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-gray-900 mb-5">
            Premium Office Products
          </h2>
          <p className="text-2xl text-gray-600">
            Curated selection for the modern workplace
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div key={index} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
              <div className="relative h-80 bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-5 left-5">
                  <span className="bg-white/95 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-gray-900">
                    {product.price}
                  </p>
                  <Link 
                    href={`/product/${index + 1}`}
                    className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-full font-medium transition-colors duration-200"
                  >
                    Purchase
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link 
            href="/products" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-lg"
          >
            View complete product catalog
            <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Enterprise Solutions
function EnterpriseSolutions() {
  return (
    <section className="py-28 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl font-bold mb-8">
              Enterprise Solutions
            </h2>
            <p className="text-2xl text-gray-300 mb-10 leading-relaxed">
              Comprehensive office supply management for large organizations. Streamline procurement, reduce costs, and ensure operational continuity.
            </p>
            <div className="space-y-6">
              <div className="flex items-start space-x-5">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-xl font-semibold mb-2">Volume Procurement</div>
                  <p className="text-gray-400 text-lg">Strategic pricing for bulk orders and long-term contracts</p>
                </div>
              </div>
              <div className="flex items-start space-x-5">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-xl font-semibold mb-2">Dedicated Account Management</div>
                  <p className="text-gray-400 text-lg">Personalized service and strategic account planning</p>
                </div>
              </div>
              <div className="flex items-start space-x-5">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-xl font-semibold mb-2">Custom Delivery Logistics</div>
                  <p className="text-gray-400 text-lg">Scheduled deliveries and multi-location distribution</p>
                </div>
              </div>
            </div>
            <Link 
              href="/enterprise" 
              className="inline-block bg-white text-gray-900 hover:bg-gray-100 px-10 py-5 rounded-full font-semibold text-lg mt-12 transition-colors duration-200"
            >
              Schedule enterprise consultation
            </Link>
          </div>
          <div className="relative h-[600px] rounded-3xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=700&fit=crop"
              alt="Enterprise Solutions"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// Business Showcase
function BusinessShowcase() {
  const slides = [
    'https://res.cloudinary.com/dseimivxo/image/upload/v1761665744/Hero_1_pymjmc.png',
    'https://res.cloudinary.com/dseimivxo/image/upload/v1761665743/Hero_2_zmt98u.png',
    'https://res.cloudinary.com/dseimivxo/image/upload/v1761665745/Hero_4_nimrnz.png',
    'https://res.cloudinary.com/dseimivxo/image/upload/v1761665741/Hero_5_furzrq.png',
    'https://res.cloudinary.com/dseimivxo/image/upload/v1761665745/Hero_6_lu4wuu.png'
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-8">
        <h3 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Business Infrastructure Solutions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {slides.map((slide, index) => (
            <div key={index} className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
              <Image
                src={slide}
                alt={`Business Solution ${index + 1}`}
                width={300}
                height={240}
                className="w-full h-60 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Value Proposition
function ValueProposition() {
  const slides = [
    'https://res.cloudinary.com/dseimivxo/image/upload/v1761737331/1_oirpow.png',
    'https://res.cloudinary.com/dseimivxo/image/upload/v1761737333/2_ezvzow.png',
    'https://res.cloudinary.com/dseimivxo/image/upload/v1761737340/3_rspdke.png',
    'https://res.cloudinary.com/dseimivxo/image/upload/v1761737341/4_elpyai.png'
  ];

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-8">
        <h3 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Strategic Business Partnerships
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {slides.map((slide, index) => (
            <div key={index} className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
              <Image
                src={slide}
                alt={`Business Value ${index + 1}`}
                width={400}
                height={320}
                className="w-full h-80 object-contain bg-white"
              />
            </div>
          ))}
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
      <DigitalSolutions />
      <PremiumProducts />
      <BusinessShowcase />
      <EnterpriseSolutions />
      <ValueProposition />
      
      {/* Ultra Premium Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="w-36 h-8 relative mb-6">
                <Image
                  src="https://res.cloudinary.com/dseimivxo/image/upload/v1761627173/logo_uamr64.png"
                  alt="StationeryHub"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-gray-400 text-lg leading-relaxed">
                Botswana's premier enterprise office solutions provider
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-6 text-lg">Products</h4>
              <ul className="space-y-4 text-gray-400 text-lg">
                <li><Link href="/products" className="hover:text-white transition-colors">Office Supplies</Link></li>
                <li><Link href="/furniture" className="hover:text-white transition-colors">Furniture</Link></li>
                <li><Link href="/technology" className="hover:text-white transition-colors">Technology</Link></li>
                <li><Link href="/print" className="hover:text-white transition-colors">Print Solutions</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-6 text-lg">Business</h4>
              <ul className="space-y-4 text-gray-400 text-lg">
                <li><Link href="/enterprise" className="hover:text-white transition-colors">Enterprise</Link></li>
                <li><Link href="/education" className="hover:text-white transition-colors">Education</Link></li>
                <li><Link href="/government" className="hover:text-white transition-colors">Government</Link></li>
                <li><Link href="/partners" className="hover:text-white transition-colors">Partners</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-6 text-lg">Support</h4>
              <ul className="space-y-4 text-gray-400 text-lg">
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Sales</Link></li>
                <li><Link href="/support" className="hover:text-white transition-colors">Client Support</Link></li>
                <li><Link href="/delivery" className="hover:text-white transition-colors">Delivery</Link></li>
                <li><Link href="/returns" className="hover:text-white transition-colors">Returns</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-400 text-lg">
            <p>&copy; 2024 StationeryHub Enterprise Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
