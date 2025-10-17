import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = '', showText = true }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center space-x-3 ${className}`}>
      {/* Custom StationeryHub Logo */}
      <div className="relative">
        {/* Main logo container */}
        <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg border border-red-500">
          {/* Pen icon inside */}
          <div className="text-white font-bold text-lg relative">
            <span className="absolute -left-1 -top-1">✏️</span>
          </div>
        </div>
        
        {/* Subtle shine effect */}
        <div className="absolute top-1 left-1 w-2 h-2 bg-white bg-opacity-30 rounded-full"></div>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-gray-900 leading-none">StationeryHub</span>
          <span className="text-xs text-gray-500 font-medium">Botswana</span>
        </div>
      )}
    </Link>
  );
}
