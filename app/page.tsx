import Image from 'next/image';

export default function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: 'Executive Notebooks',
      price: 'P 85.00',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=400&fit=crop',
      description: 'Premium leather-bound journals'
    },
    {
      id: 2,
      name: 'Professional Pens',
      price: 'P 45.00',
      image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=600&h=400&fit=crop',
      description: 'Smooth writing experience'
    },
    {
      id: 3,
      name: 'Desk Organizers',
      price: 'P 120.00',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
      description: 'Keep workspace efficient'
    },
    {
      id: 4,
      name: 'Ergonomic Chairs',
      price: 'P 450.00',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
      description: 'Comfort meets productivity'
    },
    {
      id: 5,
      name: 'Writing Collections',
      price: 'P 150.00',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop',
      description: 'Complete stationery sets'
    },
    {
      id: 6,
      name: 'Office Desks',
      price: 'P 680.00',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&h=400&fit=crop',
      description: 'Modern workspace solutions'
    }
  ];

  const stats = [
    { number: '500+', label: 'Happy Customers' },
    { number: '50+', label: 'Products Available' },
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

      {/* Luxury Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-400 rounded-full -translate-y-36 translate-x-36 opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300 rounded-full translate-y-48 -translate-x-48 opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-32 lg:py-40">
          <div className="text-center">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Elevate Your
              <span className="block bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                Workspace
              </span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Premium office supplies and furniture designed for Botswana's 
              <span className="font-semibold"> modern professionals</span>
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 shadow-lg">
                Explore Collection
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition duration-300 transform hover:-translate-y-1">
                Book Consultation
              </button>
            </div>
          </div>
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

      {/* Premium Products Section */}
      <section className="max-w-7xl mx-auto py-20 px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Curated <span className="text-blue-600">Excellence</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked stationery and office solutions that combine aesthetics with functionality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
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
                    Popular
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">{product.price}</span>
                  <button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition duration-300 transform hover:scale-105">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
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
