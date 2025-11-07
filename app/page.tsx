import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-40 h-12 relative">
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
