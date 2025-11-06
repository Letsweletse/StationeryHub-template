'use client';

import { useEffect, useState } from 'react';

export default function TestPage() {
  const [dbStatus, setDbStatus] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function testConnection() {
      try {
        // Test database connection
        const dbResponse = await fetch('/api/check-db');
        const dbData = await dbResponse.json();
        setDbStatus(dbData);

        // Test products API
        const productsResponse = await fetch('/api/products');
        const productsData = await productsResponse.json();
        setProducts(productsData);
      } catch (error) {
        console.error('Test failed:', error);
      } finally {
        setLoading(false);
      }
    }

    testConnection();
  }, []);

  const addSampleProducts = async () => {
    try {
      const response = await fetch('/api/products/seed', { method: 'POST' });
      const result = await response.json();
      alert(result.success ? 'Products added!' : `Error: ${result.error}`);
      window.location.reload();
    } catch (error) {
      alert('Failed to add products');
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Testing Database Connection...</h1>
        <p>Please wait...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Database Connection Test</h1>

      {/* Database Status */}
      <div className="mb-8 p-6 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
        <pre className="bg-white p-4 rounded border text-sm">
          {JSON.stringify(dbStatus, null, 2)}
        </pre>
      </div>

      {/* Products Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Products ({products.length})</h2>
          {products.length === 0 && (
            <button
              onClick={addSampleProducts}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Sample Products
            </button>
          )}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-8 border rounded bg-yellow-50">
            <p className="text-yellow-700">No products found in database</p>
            <p className="text-sm text-yellow-600 mt-2">
              Click "Add Sample Products" to populate your database
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {products.map((product) => (
              <div key={product.id} className="border p-4 rounded bg-white">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-gray-600 text-sm">{product.description}</p>
                <p className="text-green-600 font-bold">P {product.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
        <div className="flex gap-4">
          <a
            href="/api/check-db"
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            Check DB API
          </a>
          <a
            href="/api/products"
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            Products API
          </a>
          <a
            href="/"
            className="text-blue-600 hover:underline"
          >
            Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
