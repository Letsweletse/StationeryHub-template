'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  stock: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    try {
      const response = await fetch(`/api/cart?userId=${userId}`);
      const items = await response.json();
      setCartItems(items);
    } catch (error) {
      console.error('Failed to load cart');
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    const message = `Hello StationeryHub! I'd like to order:\n\n${cartItems.map(item => 
      `${item.name} x${item.quantity} - P ${(item.price * item.quantity).toFixed(2)}`
    ).join('\n')}\n\nTotal: P ${getTotalPrice().toFixed(2)}\n\nPlease contact me to complete the order.`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/26775560140text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Cart Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="relative bg-gray-100 p-3 rounded-xl hover:bg-gray-200 transition-colors duration-200"
      >
        <span className="text-xl">🛒</span>
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartItems.reduce((total, item) => total + item.quantity, 0)}
          </span>
        )}
      </button>

      {/* Cart Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ✕
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                  <p className="text-gray-400 text-sm mt-2">Add some products to get started!</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-xl">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                          <Image
                            src={item.imageUrl || '/placeholder-product.jpg'}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-gray-600">P {item.price.toFixed(2)} x {item.quantity}</p>
                          <p className="text-red-600 font-semibold">
                            P {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-bold mb-4">
                      <span>Total:</span>
                      <span>P {getTotalPrice().toFixed(2)}</span>
                    </div>
                    
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <span>💬</span>
                      <span>Checkout via WhatsApp</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
