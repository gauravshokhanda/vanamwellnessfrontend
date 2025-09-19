'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import ProductSummary from '@/components/ProductSummary';
import Footer from '@/components/Footer';
import { ShoppingBag, ArrowLeft, Check, CreditCard, Truck, Shield } from 'lucide-react';

interface ProductImage {
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  images: ProductImage[];
  basePrice: number;
  salePrice?: number;
  currency: string;
  inventory: {
    stock: number;
  };
}

interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
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
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    const productId = searchParams.get('product');
    const quantity = parseInt(searchParams.get('quantity') || '1');

    if (productId) {
      fetchProduct(productId, quantity);
    } else {
      // If no specific product, show the default supercharged product
      fetchDefaultProduct(quantity);
    }
  }, [searchParams]);

  const fetchProduct = async (productId: string, quantity: number) => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
      const response = await fetch(`${apiUrl}/products/${productId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }

      const data = await response.json();
      const product = data.data?.product || data.product || data;
      const price = product.salePrice || product.basePrice;

      setOrderItems([{
        product,
        quantity,
        price,
      }]);
    } catch (err) {
      console.error('Error fetching product:', err);
      // Fallback to default product
      fetchDefaultProduct(quantity);
    } finally {
      setLoading(false);
    }
  };

  const fetchDefaultProduct = (quantity: number) => {
    // Default product data for the supercharged product
    const defaultProduct: Product = {
      _id: 'default-supercharged',
      name: 'Vanam Wellness Supercharged',
      slug: 'supercharged',
      description: 'Premium wellness supplement for enhanced vitality and energy',
      shortDescription: 'Premium wellness supplement',
      images: [{
        url: '/images/product-hero.jpg',
        alt: 'Vanam Wellness Supercharged',
        isPrimary: true,
        order: 1
      }],
      basePrice: 2999,
      salePrice: 2499,
      currency: 'INR',
      inventory: {
        stock: 100
      }
    };

    setOrderItems([{
      product: defaultProduct,
      quantity,
      price: defaultProduct.salePrice || defaultProduct.basePrice,
    }]);
    setLoading(false);
  };

  const formatPrice = (price: number, currency: string = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  const calculateSubtotal = () => {
    return orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal >= 500 ? 0 : 50; // Free shipping above ₹500
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    return Math.round(subtotal * 0.18); // 18% GST
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() + calculateTax();
  };

  const getPrimaryImage = (images: ProductImage[]) => {
    const primaryImage = images.find(img => img.isPrimary);
    return primaryImage || images[0];
  };

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
    
    try {
      // Simulate order placement with dynamic product data
      const mockOrderId = 'VW' + Date.now().toString().slice(-6);
      
      const orderData = {
        orderId: mockOrderId,
        customer: formData,
        items: orderItems,
        totals: {
          subtotal: calculateSubtotal(),
          shipping: calculateShipping(),
          tax: calculateTax(),
          total: calculateTotal(),
        },
        timestamp: new Date().toISOString(),
      };

      console.log('Order placed:', orderData);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      setOrderId(mockOrderId);
      setOrderPlaced(true);
    } catch (err) {
      console.error('Error placing order:', err);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#22c55e]"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] py-8">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-[#004d26] mb-4">Order Placed Successfully!</h1>
              <p className="text-gray-600 mb-2">
                Thank you for your order. Your order ID is <strong className="text-[#22c55e]">{orderId}</strong>
              </p>
              <p className="text-gray-600 mb-8">
                You will receive a confirmation email shortly with your order details.
              </p>
              
              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-[#004d26] mb-3">Order Summary</h3>
                {orderItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">{item.product.name} x {item.quantity}</span>
                    <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between items-center font-bold text-[#004d26]">
                    <span>Total</span>
                    <span>{formatPrice(calculateTotal())}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => router.push('/products')}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={() => router.push('/')}
                  className="px-6 py-3 bg-[#22c55e] text-white rounded-lg hover:bg-[#1ea34a] transition-colors"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h2 className="text-xl font-bold text-[#004d26] mb-6">Order Summary</h2>
                
                {orderItems.map((item, index) => {
                  const primaryImage = getPrimaryImage(item.product.images);
                  
                  return (
                    <div key={index} className="flex gap-4 p-4 border border-gray-200 rounded-lg mb-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {primaryImage && (
                          <Image
                            src={primaryImage.url}
                            alt={primaryImage.alt}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {item.product.shortDescription}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-gray-600">Qty: {item.quantity}</span>
                          <span className="font-semibold text-[#004d26]">
                            {formatPrice(item.price * item.quantity, item.product.currency)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Price Breakdown */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(calculateSubtotal())}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{calculateShipping() === 0 ? 'Free' : formatPrice(calculateShipping())}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (GST)</span>
                    <span>{formatPrice(calculateTax())}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-lg font-bold text-[#004d26]">
                      <span>Total</span>
                      <span>{formatPrice(calculateTotal())}</span>
                    </div>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-6 space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#22c55e]" />
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#22c55e]" />
                    <span>Free shipping on orders above ₹500</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#22c55e]" />
                    <span>30-day return policy</span>
                  </div>
                </div>
              </div>
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