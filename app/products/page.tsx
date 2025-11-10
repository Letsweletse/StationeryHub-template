'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { products, type Product, getProductsByCategory } from '@/lib/products';
import WhatsAppButton from '@/components/WhatsAppButton';

// Product Grid Component
function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group">
          <Link href={`/products/${product.id}`}>
            <div className="relative h-64 bg-gray-100 rounded-t-3xl overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  {product.category}
                </span>
              </div>
              {product.originalPrice && (
                <div className="absolute top-4 right-4 bg-red-600 text-white px-2 py-1 rounded-full text-sm font-semibold">
                  SALE
                </div>
              )}
            </div>
          </Link>
          <div className="p-6">
            <Link href={`/products/${product.id}`}>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight hover:text-blue-600 transition-colors cursor-pointer line-clamp-2">
                {product.name}
              </h3>
            </Link>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold text-gray-900">{product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">{product.originalPrice}</span>
              )}
            </div>
            <a 
              href={`https://wa.me/26775560140?text=${encodeURIComponent(product.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold text-center block transition-all duration-200 hover:scale-105"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

// Filter Sidebar Component
function FilterSidebar({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: { 
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
      <div className="space-y-2">
        <button
          onClick={() => onCategoryChange('')}
          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
            selectedCategory === '' 
              ? 'bg-blue-100 text-blue-800 font-semibold' 
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          All Products
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              selectedCategory === category 
                ? 'bg-blue-100 text-blue-800 font-semibold' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('');

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(products.map(product => product.category)));
  }, []);

  // Filter products based on selected category
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return getProductsByCategory(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Products</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Discover our comprehensive range of premium office supplies and printing solutions
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Count */}
            <div className="flex justify-between items-center mb-8">
              <p className="text-gray-600">
                Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                {selectedCategory && ` in ${selectedCategory}`}
              </p>
            </div>

            {/* Products Grid */}
            <ProductGrid products={filteredProducts} />

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try selecting a different category</p>
                <button
                  onClick={() => setSelectedCategory('')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View All Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <WhatsAppButton />
    </div>
  );
}
