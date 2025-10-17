'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
  stock: number;
  createdAt: string;
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add Product Form
  const AddProductForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      category: '',
      price: '',
      description: '',
      stock: '',
      imageUrl: ''
    });

    const [uploading, setUploading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setUploading(true);
      
      try {
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock)
          })
        });
        
        if (response.ok) {
          alert('Product added successfully!');
          setFormData({ name: '', category: '', price: '', description: '', stock: '', imageUrl: '' });
          fetchProducts();
        }
      } catch (error) {
        alert('Error adding product');
      } finally {
        setUploading(false);
      }
    };

    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Add New Product</h3>
          <p className="text-gray-600 text-sm mt-1">Add products to your inventory</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="HP 12A Black Cartridge"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">Select Category</option>
                <option value="Cartridges">Printer Cartridges</option>
                <option value="Stationery">Office Stationery</option>
                <option value="Furniture">Office Furniture</option>
                <option value="Computers">Computers & Tech</option>
                <option value="Accessories">Accessories</option>
                <option value="Supplies">Office Supplies</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price (P) *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="120.00"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Quantity *</label>
              <input
                type="number"
                min="0"
                required
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="50"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="High-quality toner cartridge for HP printers with excellent print quality and reliability..."
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL *</label>
            <input
              type="url"
              required
              value={formData.imageUrl}
              onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="https://images.unsplash.com/photo-..."
            />
            <p className="text-xs text-gray-500 mt-2">Use high-quality images from Unsplash or similar sources</p>
          </div>
          
          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-red-600 text-white py-4 rounded-xl font-semibold hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? 'Adding Product...' : 'Add Product to Inventory'}
          </button>
        </form>
      </div>
    );
  };

  // Bulk Upload Component
  const BulkUpload = () => {
    const [csvData, setCsvData] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleBulkUpload = async () => {
      setUploading(true);
      try {
        const products = csvData.split('\n').slice(1).map(line => {
          const [name, category, price, description, stock, imageUrl] = line.split(',');
          return {
            name: name?.trim(),
            category: category?.trim(),
            price: parseFloat(price?.trim() || '0'),
            description: description?.trim(),
            stock: parseInt(stock?.trim() || '0'),
            imageUrl: imageUrl?.trim()
          };
        }).filter(p => p.name);

        let successCount = 0;
        for (const product of products) {
          try {
            await fetch('/api/products', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(product)
            });
            successCount++;
          } catch (error) {
            console.error('Failed to add product:', product.name);
          }
        }

        alert(`Successfully uploaded ${successCount} out of ${products.length} products!`);
        setCsvData('');
        fetchProducts();
      } catch (error) {
        alert('Error uploading products');
      } finally {
        setUploading(false);
      }
    };

    const sampleCSV = `name,category,price,description,stock,imageUrl
HP LaserJet 12A Cartridge,Cartridges,120.00,Original HP toner cartridge,25,https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500&h=400&fit=crop
A4 Copy Paper 500 Sheets,Stationery,35.00,Premium A4 paper 80gsm,100,https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&h=400&fit=crop
Executive Office Chair,Furniture,450.00,Ergonomic mesh office chair,15,https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop`;

    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Bulk Product Upload</h3>
          <p className="text-gray-600 text-sm mt-1">Upload multiple products via CSV</p>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">CSV Data</label>
            <p className="text-sm text-gray-600 mb-4">
              Format: <code className="bg-gray-100 px-2 py-1 rounded">name,category,price,description,stock,imageUrl</code>
            </p>
            <textarea
              value={csvData}
              onChange={(e) => setCsvData(e.target.value)}
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono text-sm"
              placeholder={sampleCSV}
            />
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={handleBulkUpload}
              disabled={uploading || !csvData.trim()}
              className="flex-1 bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading Products...' : 'Upload Products'}
            </button>
            <button
              onClick={() => setCsvData(sampleCSV)}
              className="px-6 py-4 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200"
            >
              Load Sample
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Products Management
  const ProductsManagement = () => {
    const [deleting, setDeleting] = useState<number | null>(null);

    const handleDelete = async (productId: number) => {
      if (!confirm('Are you sure you want to delete this product?')) return;
      
      setDeleting(productId);
      try {
        // Note: You'll need to create a DELETE API endpoint
        const response = await fetch(`/api/products/${productId}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          alert('Product deleted successfully!');
          fetchProducts();
        }
      } catch (error) {
        alert('Error deleting product');
      } finally {
        setDeleting(null);
      }
    };

    if (loading) {
      return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Product Inventory</h3>
            <p className="text-gray-600 text-sm mt-1">{products.length} products in inventory</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            <p className="text-sm text-gray-600">Total Products</p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <Image
                          src={product.imageUrl || '/placeholder-image.jpg'}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="rounded-lg object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-semibold">P {product.price.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.stock > 10 ? 'bg-green-100 text-green-800' : 
                      product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.stock} in stock
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <button
                      onClick={() => handleDelete(product.id)}
                      disabled={deleting === product.id}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50"
                    >
                      {deleting === product.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Dashboard Overview
  const DashboardOverview = () => {
    const totalProducts = products.length;
    const lowStockProducts = products.filter(p => p.stock > 0 && p.stock <= 5).length;
    const outOfStockProducts = products.filter(p => p.stock === 0).length;
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-xl mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1m4 0h-4" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-xl mr-4">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-gray-900">{lowStockProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-xl mr-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Out of Stock</p>
              <p className="text-2xl font-bold text-gray-900">{outOfStockProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-xl mr-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Inventory Value</p>
              <p className="text-2xl font-bold text-gray-900">P {totalValue.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional Admin Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">SH</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">StationeryHub Admin</h1>
                <p className="text-xs text-gray-500 font-medium">BUSINESS MANAGEMENT</p>
              </div>
            </div>
            <a 
              href="/"
              className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors duration-200"
            >
              ← Back to Store
            </a>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Professional Admin Tabs */}
        <div className="flex space-x-1 bg-white rounded-2xl shadow-lg border border-gray-200 p-2 mb-8">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'products', label: 'Add Product', icon: '➕' },
            { id: 'bulk', label: 'Bulk Upload', icon: '📁' },
            { id: 'manage', label: 'Manage Products', icon: '🛍️' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === tab.id 
                  ? 'bg-red-600 text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && (
          <>
            <DashboardOverview />
            <ProductsManagement />
          </>
        )}
        {activeTab === 'products' && <AddProductForm />}
        {activeTab === 'bulk' && <BulkUpload />}
        {activeTab === 'manage' && <ProductsManagement />}
      </div>
    </div>
  );
}
