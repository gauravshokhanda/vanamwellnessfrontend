'use client';

import { useState } from 'react';
import OTPAuth from './OTPAuth';
import AddressForm from './AddressForm';
import ProductSummary from './ProductSummary';
import { Check, ShoppingBag, MapPin, CreditCard, Package } from 'lucide-react';

interface UserData {
  phone: string;
  email: string;
}

interface AddressData {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  addressType: 'home' | 'office' | 'other';
  landmark?: string;
}

interface OrderData {
  userData: UserData;
  addressData: AddressData;
  productData: {
    name: string;
    price: number;
    quantity: number;
    total: number;
  };
}

type CheckoutStep = 'auth' | 'address' | 'payment' | 'confirmation';

interface CheckoutFlowProps {
  onOrderComplete?: (orderData: OrderData) => void;
}

export default function CheckoutFlow({ onOrderComplete }: CheckoutFlowProps) {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('auth');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [addressData, setAddressData] = useState<AddressData | null>(null);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState<string>('');

  const productData = {
    name: "Vanam Wellness Premium Supplement",
    price: 1999,
    quantity: 1,
    total: 1999
  };

  const steps = [
    { id: 'auth', label: 'Verification', icon: ShoppingBag, completed: !!userData },
    { id: 'address', label: 'Address', icon: MapPin, completed: !!addressData },
    { id: 'payment', label: 'Payment', icon: CreditCard, completed: orderConfirmed },
    { id: 'confirmation', label: 'Confirmation', icon: Package, completed: orderConfirmed }
  ];

  const handleAuthComplete = (data: UserData) => {
    setUserData(data);
    setCurrentStep('address');
  };

  const handleAddressSubmit = (data: AddressData) => {
    setAddressData(data);
    setCurrentStep('payment');
  };

  const handlePayment = async () => {
    if (!userData || !addressData) return;
    
    setIsProcessingOrder(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const newOrderId = `VW${Date.now().toString().slice(-6)}`;
      setOrderId(newOrderId);
      setOrderConfirmed(true);
      setCurrentStep('confirmation');
      setIsProcessingOrder(false);
      
      const orderData: OrderData = {
        userData,
        addressData,
        productData
      };
      
      onOrderComplete?.(orderData);
    }, 2000);
  };

  const handleBackToAuth = () => {
    setCurrentStep('auth');
  };

  const handleBackToAddress = () => {
    setCurrentStep('address');
  };

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = step.completed;
          const Icon = step.icon;
          
          return (
            <div key={step.id} className="flex items-center">
              <div className={`flex flex-col items-center ${
                index < steps.length - 1 ? 'flex-1' : ''
              }`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                  isCompleted 
                    ? 'bg-[#22c55e] border-[#22c55e] text-white'
                    : isActive 
                    ? 'bg-[#004d26] border-[#004d26] text-white'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  {isCompleted ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <Icon className="w-6 h-6" />
                  )}
                </div>
                <span className={`mt-2 text-sm font-medium ${
                  isActive || isCompleted ? 'text-[#004d26]' : 'text-gray-400'
                }`}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  steps[index + 1].completed ? 'bg-[#22c55e]' : 'bg-gray-300'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'auth':
        return (
          <div className="max-w-md mx-auto">
            <OTPAuth onAuthSuccess={handleAuthComplete} />
          </div>
        );
        
      case 'address':
        return (
          <div className="max-w-2xl mx-auto">
            <AddressForm 
              userData={userData!} 
              onAddressSubmit={handleAddressSubmit}
              onBack={handleBackToAuth}
            />
          </div>
        );
        
      case 'payment':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Product Summary */}
              <div>
                <ProductSummary />
              </div>
              
              {/* Payment Section */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-6">
                  <CreditCard className="w-12 h-12 text-[#22c55e] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-[#004d26] mb-2">Payment Details</h3>
                  <p className="text-gray-600">Review your order and complete payment</p>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h4 className="font-bold text-[#004d26] mb-4">Order Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Product Price</span>
                      <span>₹{productData.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quantity</span>
                      <span>{productData.quantity}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Shipping</span>
                      <span>FREE</span>
                    </div>
                    <hr className="my-3" />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total Amount</span>
                      <span>₹{productData.total}</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                {addressData && (
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <h4 className="font-bold text-[#004d26] mb-4">Delivery Address</h4>
                    <div className="text-sm text-gray-700">
                      <p className="font-semibold">{addressData.fullName}</p>
                      <p>{addressData.addressLine1}</p>
                      {addressData.addressLine2 && <p>{addressData.addressLine2}</p>}
                      <p>{addressData.city}, {addressData.state} - {addressData.pincode}</p>
                      <p className="mt-2 text-[#004d26]">Phone: +91 {addressData.phone}</p>
                    </div>
                    <button 
                      onClick={handleBackToAddress}
                      className="mt-3 text-[#004d26] text-sm font-semibold hover:underline"
                    >
                      Change Address
                    </button>
                  </div>
                )}

                {/* Payment Button */}
                <button 
                  onClick={handlePayment}
                  disabled={isProcessingOrder}
                  className="w-full bg-[#004d26] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center hover:bg-[#22c55e] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessingOrder ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-3 w-5 h-5" />
                      Pay ₹{productData.total} - Cash on Delivery
                    </>
                  )}
                </button>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    🔒 Secure payment • 💰 Cash on Delivery • 📦 Free shipping
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'confirmation':
        return (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="w-20 h-20 bg-[#22c55e] rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold text-[#004d26] mb-4">
                Order Confirmed!
              </h2>
              
              <p className="text-gray-600 mb-6">
                Thank you for your order. We'll send you a confirmation email shortly.
              </p>
              
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="font-bold text-[#004d26] mb-4">Order Details</h3>
                <div className="space-y-2 text-left">
                  <div className="flex justify-between">
                    <span className="font-semibold">Order ID:</span>
                    <span className="text-[#004d26] font-bold">{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Amount:</span>
                    <span>₹{productData.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Payment:</span>
                    <span className="text-[#22c55e]">Cash on Delivery</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Delivery:</span>
                    <span>3-5 Business Days</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2 text-[#22c55e]">
                  <Package className="w-5 h-5" />
                  <span className="font-semibold">Your order is being prepared</span>
                </div>
                
                <p className="text-sm text-gray-600">
                  We'll send you SMS updates about your order status.
                  Expected delivery: {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {renderStepIndicator()}
        {renderCurrentStep()}
      </div>
    </div>
  );
}