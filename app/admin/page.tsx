'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);

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

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
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
        }
      } catch (error) {
        alert('Error adding product');
      }
    };

    return (
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="HP 12A Black Cartridge"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select Category</option>
              <option value="Cartridges">Cartridges</option>
              <option value="Stationery">Stationery</option>
              <option value="Furniture">Furniture</option>
              <option value="Computers">Computers</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price (P)</label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="120.00"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
            <input
              type="number"
              required
              value={formData.stock}
              onChange={(e) => setFormData({...formData, stock: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="50"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="High-quality toner cartridge for HP printers..."
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
          <input
            type="url"
            required
            value={formData.imageUrl}
            onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="https://images.unsplash.com/photo-..."
          />
        </div>
        
        <button
          type="submit"
          className="bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition duration-200"
        >
          Add Product
        </button>
      </form>
    );
  };

  // Bulk Upload Component
  const BulkUpload = () => {
    const [csvData, setCsvData] = useState('');

    const handleBulkUpload = async () => {
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

        for (const product of products) {
          await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
          });
        }

        alert(`Successfully uploaded ${products.length} products!`);
        setCsvData('');
      } catch (error) {
        alert('Error uploading products');
      }
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Bulk Product Upload</h3>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            Upload products via CSV. Format: name,category,price,description,stock,imageUrl
          </p>
          <textarea
            value={csvData}
            onChange={(e) => setCsvData(e.target.value)}
            rows={10}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 font-mono text-sm"
            placeholder="name,category,price,description,stock,imageUrl&#10;HP 12A Cartridge,Cartridges,120.00,High-quality toner,50,https://image.url&#10;A4 Paper,Stationery,35.00,Premium paper,100,https://image.url"
          />
        </div>
        
        <button
          onClick={handleBulkUpload}
          className="bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition duration-200"
        >
          Upload Products
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">SH</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">StationeryHub Admin</span>
            </div>
            <a 
              href="/"
              className="text-red-600 hover:text-red-700 font-semibold"
            >
              ← Back to Store
            </a>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Admin Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-md font-semibold ${
              activeTab === 'products' 
                ? 'bg-red-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Add Products
          </button>
          <button
            onClick={() => setActiveTab('bulk')}
            className={`px-4 py-2 rounded-md font-semibold ${
              activeTab === 'bulk' 
                ? 'bg-red-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Bulk Upload
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'products' && <AddProductForm />}
        {activeTab === 'bulk' && <BulkUpload />}
      </div>
    </div>
  );
}
