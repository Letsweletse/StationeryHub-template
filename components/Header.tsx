'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200">
              Products
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200">
              Contact
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="https://wa.me/26775560140" 
              target="_blank"
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <span>💬</span>
              <span>Order via WhatsApp</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <div className="w-full h-0.5 bg-gray-600"></div>
              <div className="w-full h-0.5 bg-gray-600"></div>
              <div className="w-full h-0.5 bg-gray-600"></div>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-red-600 font-medium py-2">
                Home
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-red-600 font-medium py-2">
                Products
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-red-600 font-medium py-2">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-red-600 font-medium py-2">
                Contact
              </Link>
              <Link 
                href="https://wa.me/26775560140" 
                target="_blank"
                className="bg-green-600 text-white px-4 py-3 rounded-lg font-semibold text-center hover:bg-green-700 transition-colors duration-200"
              >
                💬 Order via WhatsApp
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
