'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { XCircle, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function FailurePage() {
  return (
    <main className="min-h-screen bg-red-50">
      <Navbar />
      <div className="section-container py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <XCircle className="w-24 h-24 text-red-500 mx-auto mb-6" />
            <h1 className="text-4xl font-bold uppercase mb-4 text-red-600">
              PAYMENT FAILED
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              We couldn't process your payment. Please try again or contact support.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
            <h3 className="text-xl font-bold mb-4">Common Solutions:</h3>
            <ul className="text-left space-y-3">
              <li>• Check your card details and try again</li>
              <li>• Ensure sufficient balance in your account</li>
              <li>• Try a different payment method</li>
              <li>• Contact your bank if the issue persists</li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/checkout" className="btn-primary inline-flex items-center">
              <RefreshCw className="mr-2 w-5 h-5" />
              Retry Payment
            </Link>
            <Link href="/" className="btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}