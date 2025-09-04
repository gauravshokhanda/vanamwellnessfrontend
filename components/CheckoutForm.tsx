'use client';

import { useState } from 'react';
import { CreditCard, Lock, Truck } from 'lucide-react';

export default function CheckoutForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Razorpay integration placeholder
    console.log('Initiating Razorpay payment with:', formData);
    // This would normally trigger Razorpay payment gateway
    window.location.href = '/success';
  };

  const totalPrice = 1999 * formData.quantity;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-[#004d26] text-white p-6">
        <h2 className="text-2xl font-bold uppercase text-center">
          SECURE CHECKOUT
        </h2>
        <div className="flex items-center justify-center mt-2">
          <Lock className="w-4 h-4 mr-2" />
          <span className="text-sm">256-bit SSL encrypted</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name *
            </label>
            <input 
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-xl focus:border-[#004d26] focus:ring-2 focus:ring-[#004d26]/20"
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address *
            </label>
            <input 
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-xl focus:border-[#004d26] focus:ring-2 focus:ring-[#004d26]/20"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number *
          </label>
          <input 
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-xl focus:border-[#004d26] focus:ring-2 focus:ring-[#004d26]/20"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Quantity
          </label>
          <select 
            value={formData.quantity}
            onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value)})}
            className="w-full p-3 border border-gray-300 rounded-xl focus:border-[#004d26] focus:ring-2 focus:ring-[#004d26]/20"
          >
            <option value={1}>1 Bottle - ₹1,999</option>
            <option value={2}>2 Bottles - ₹3,598 (Save 10%)</option>
            <option value={3}>3 Bottles - ₹5,097 (Save 15%)</option>
          </select>
        </div>

        <div className="bg-[#f0fdf4] p-6 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-2xl font-bold text-[#004d26]">₹{totalPrice.toLocaleString()}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Truck className="w-4 h-4 mr-2" />
            <span>Free shipping included</span>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-[#004d26] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center hover:bg-[#d4af37] transition-all duration-300"
        >
          <CreditCard className="w-6 h-6 mr-3" />
          PAY WITH RAZORPAY - ₹{totalPrice.toLocaleString()}
        </button>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span>Secure payment by</span>
            <span className="font-bold text-[#004d26]">Razorpay</span>
          </div>
        </div>
      </form>
    </div>
  );
}