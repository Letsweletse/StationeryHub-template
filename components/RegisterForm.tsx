'use client';

import { useState } from 'react';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    whatsapp: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      
      if (result.success) {
        alert('Account created! Check your email for special offers! 🎉');
        setFormData({ email: '', name: '', phone: '', whatsapp: '' });
        
        // Store user ID for cart
        localStorage.setItem('userId', result.user.id);
      } else {
        alert(result.error || 'Failed to create account');
      }
    } catch (error) {
      alert('Error creating account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
        Create Account & Get 10% Off!
      </h3>
      <p className="text-gray-600 text-center mb-6">
        Join now for exclusive deals and faster checkout
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="Full Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        
        <div>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="Email Address"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        
        <div>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            placeholder="Phone Number"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        
        <div>
          <input
            type="tel"
            value={formData.whatsapp}
            onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
            placeholder="WhatsApp Number (for order updates)"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-colors duration-200 disabled:opacity-50"
        >
          {isLoading ? 'Creating Account...' : 'Create Account & Get 10% Off! 🎁'}
        </button>
        
        <p className="text-xs text-gray-500 text-center">
          By creating account, you agree to receive promotional emails. Unsubscribe anytime.
        </p>
      </form>
    </div>
  );
}
