'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      
      if (result.success) {
        alert('Message sent successfully via WhatsApp! We\'ll reply soon. 📱');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      alert('Error sending message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // ... (same JSX structure as before, but update the form)
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* form fields same as before */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-200 disabled:opacity-50"
      >
        {isLoading ? 'Sending...' : 'Send via WhatsApp 📱'}
      </button>
    </form>
  );
}
