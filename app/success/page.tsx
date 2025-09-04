'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-gradient-light-bg">
      <Navbar />
      <div className="section-container py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <CheckCircle className="w-24 h-24 text-[#22c55e] mx-auto mb-6" />
            <h1 className="text-4xl font-bold uppercase mb-4 text-[#004d26]">
              ORDER CONFIRMED!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for choosing Vanam Wellness. Your Supercharged supplement is on its way!
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
            <h3 className="text-xl font-bold mb-4">What's Next?</h3>
            <ul className="text-left space-y-3">
              <li>✅ You'll receive an order confirmation email shortly</li>
              <li>✅ Your supplement will be shipped within 24 hours</li>
              <li>✅ Track your order with the link in your email</li>
              <li>✅ Join our community for wellness tips and updates</li>
            </ul>
          </div>
          
          <Link href="/" className="btn-primary inline-flex items-center">
            Continue Shopping
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}