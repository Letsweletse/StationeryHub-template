'use client';

import { useState } from 'react';

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  price: number;
  showWhatsAppOption?: boolean;
}

export default function AddToCartButton({ 
  productId, 
  productName, 
  price, 
  showWhatsAppOption = true 
}: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [customerMessage, setCustomerMessage] = useState('');

  const handleAddToCart = async () => {
    setIsLoading(true);
    
    try {
      // Simple cart logic without Supabase
      let userId = localStorage.getItem('userId');
      
      if (!userId) {
        userId = 'guest-' + Date.now();
        localStorage.setItem('userId', userId);
      }

      // Add to cart using your API
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          product_id: productId,
          product_name: productName,
          price: price,
          quantity: quantity,
        }),
      });

      if (response.ok) {
        alert('Product added to cart!');
        window.dispatchEvent(new Event('cartUpdated'));
      } else {
        alert('Error adding to cart');
      }
      
    } catch (error) {
      alert('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppOrder = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/products/${productId}/whatsapp-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity,
          customerMessage
        })
      });

      const result = await response.json();

      if (result.success) {
        window.open(result.whatsapp_url, '_blank');
        setShowWhatsAppModal(false);
        setCustomerMessage('');
        setQuantity(1);
      } else {
        alert('Failed to create WhatsApp order');
      }
    } catch (error) {
      alert('Error creating WhatsApp order');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Qty:</label>
          <select 
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            {[1,2,3,4,5,6,7,8,9,10].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={isLoading}
            className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200 disabled:bg-red-400 disabled:cursor-not-allowed font-semibold"
          >
            {isLoading ? 'Adding...' : '🛒 Add to Cart'}
          </button>

          {showWhatsAppOption && (
            <button
              onClick={() => setShowWhatsAppModal(true)}
              disabled={isLoading}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200 disabled:bg-green-400 disabled:cursor-not-allowed font-semibold"
            >
              📱 WhatsApp Order
            </button>
          )}
        </div>
      </div>

      {/* WhatsApp Order Modal */}
      {showWhatsAppModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">📱 WhatsApp Order</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product: {productName}
                </label>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price: P {price.toFixed(2)} × {quantity} = P {(price * quantity).toFixed(2)}
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Message (Optional)
                </label>
                <textarea
                  value={customerMessage}
                  onChange={(e) => setCustomerMessage(e.target.value)}
                  placeholder="Any special instructions or delivery preferences..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none"
                  rows={3}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => setShowWhatsAppModal(false)}
                  className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleWhatsAppOrder}
                  disabled={isLoading}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200 disabled:bg-green-400 flex items-center justify-center gap-2"
                >
                  {isLoading ? 'Processing...' : (
                    <>
                      <span>Open WhatsApp</span>
                      <span>📱</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
