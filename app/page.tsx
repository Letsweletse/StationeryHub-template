import Image from 'next/image';

export default function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: 'Premium Notebooks',
      price: 'P 85.00',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&h=400&fit=crop',
      description: 'High-quality writing journals'
    },
    {
      id: 2,
      name: 'Executive Pens',
      price: 'P 45.00',
      image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500&h=400&fit=crop',
      description: 'Smooth writing experience'
    },
    {
      id: 3,
      name: 'Desk Organizers',
      price: 'P 120.00',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=400&fit=crop',
      description: 'Keep your workspace tidy'
    },
    {
      id: 4,
      name: 'Office Chairs',
      price: 'P 450.00',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop',
      description: 'Ergonomic comfort'
    },
    {
      id: 5,
      name: 'Writing Sets',
      price: 'P 150.00',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=400&fit=crop',
      description: 'Complete writing collection'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">StationeryHub</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="/" className="text-blue-600 font-medium">Home</a>
                <a href="/products" className="text-gray-600 hover:text-blue-600">Products</a>
                <a href="/about" className="text-gray-600 hover:text-blue-600">About</a>
                <a href="/contact" className="text-gray-600 hover:text-blue-600">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Premium Office Supplies<br />in Botswana
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Your trusted partner for quality stationery, office furniture, and business supplies. 
            Delivering excellence across Botswana.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-300">
              Shop Products
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our curated collection of premium stationery and office essentials
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
              <div className="relative h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-bold text-lg">{product.price}</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Nationwide Delivery</h3>
              <p className="text-gray-600">Free delivery across Botswana for orders over P500</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">Premium quality products with satisfaction guarantee</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600">Dedicated customer support for all your needs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">StationeryHub</h3>
              <p className="text-gray-400">Your trusted office supplies partner in Botswana since 2024.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/products" className="hover:text-white">Products</a></li>
                <li><a href="/about" className="hover:text-white">About Us</a></li>
                <li><a href="/contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@stationeryhub.co.bw</li>
                <li>Phone: +267 XXX-XXXX</li>
                <li>Gaborone, Botswana</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Business Hours</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Mon-Fri: 8:00 AM - 6:00 PM</li>
                <li>Saturday: 9:00 AM - 2:00 PM</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 StationeryHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
