import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <Logo showText={true} />
            <p className="mt-4 text-gray-300 leading-relaxed max-w-md">
              Your trusted partner for premium office supplies in Botswana. 
              We deliver quality stationery and business solutions right to your doorstep.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                📘 Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                💬 WhatsApp
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                📧 Email
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/products" className="block text-gray-300 hover:text-white transition-colors">
                All Products
              </Link>
              <Link href="/about" className="block text-gray-300 hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-2 text-gray-300">
              <p>📞 +267 75560140</p>
              <p>📧 admin@stationeryhub.co.bw</p>
              <p>🕒 Mon-Fri: 8AM-5PM</p>
              <p>📍 Gaborone, Botswana</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 StationeryHub Business Solutions by iblimenterprise.com .All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
