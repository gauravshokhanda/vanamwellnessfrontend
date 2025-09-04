'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ProductSummary from '@/components/ProductSummary';
import Footer from '@/components/Footer';
import { ShoppingBag } from 'lucide-react';

interface CheckoutData {
  name: string;
  mobile: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export default function CheckoutPage() {
  const [formData, setFormData] = useState<CheckoutData>({
    name: '',
    mobile: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`Order placed successfully! Order ID: VW${Date.now().toString().slice(-6)}`);
      // Reset form or redirect
    }, 2000);
  };

  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8 text-[#004d26]">
            COMPLETE YOUR ORDER
          </h1>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Product Summary - Left */}
            <div className="lg:col-span-1">
              <ProductSummary />
            </div>
            
            {/* Checkout Form - Right */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center mb-6">
                  <ShoppingBag className="w-6 h-6 text-[#22c55e] mr-3" />
                  <h2 className="text-xl font-bold text-[#004d26]">Checkout Details</h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#004d26] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#22c55e] focus:border-transparent outline-none transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-[#004d26] mb-2">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      required
                      pattern="[0-9]{10}"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#22c55e] focus:border-transparent outline-none transition-all"
                      placeholder="Enter 10-digit mobile number"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#004d26] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#22c55e] focus:border-transparent outline-none transition-all"
                      placeholder="Enter your email address"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-[#004d26] mb-2">
                      Complete Address *
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#22c55e] focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Enter your complete address with landmark"
                    />
                  </div>

                  {/* City, State, Pincode */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-[#004d26] mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#22c55e] focus:border-transparent outline-none transition-all"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-[#004d26] mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#22c55e] focus:border-transparent outline-none transition-all"
                        placeholder="State"
                      />
                    </div>
                    <div>
                      <label htmlFor="pincode" className="block text-sm font-medium text-[#004d26] mb-2">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        required
                        pattern="[0-9]{6}"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#22c55e] focus:border-transparent outline-none transition-all"
                        placeholder="Pincode"
                      />
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gray-50 rounded-xl p-6 mt-8">
                    <h4 className="font-bold text-[#004d26] mb-4">Order Summary</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Product Price</span>
                        <span>₹1,999</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>Shipping</span>
                        <span>FREE</span>
                      </div>
                      <hr className="my-3" />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total Amount</span>
                        <span>₹1,999</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#004d26] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center hover:bg-[#22c55e] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Processing Order...
                      </>
                    ) : (
                      'Place Order - ₹1,999 (Cash on Delivery)'
                    )}
                  </button>

                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                      🔒 Secure checkout • 💰 Cash on Delivery • 📦 Free shipping
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}