'use client';

import { useState } from 'react';
import { Phone, Mail, ArrowRight, ArrowLeft } from 'lucide-react';

interface OTPAuthProps {
  onAuthSuccess: (userData: { phone: string; email: string }) => void;
  onBack?: () => void;
}

export default function OTPAuth({ onAuthSuccess, onBack }: OTPAuthProps) {
  const [step, setStep] = useState<'phone' | 'email' | 'phone-otp' | 'email-otp'>('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [phoneOTP, setPhoneOTP] = useState('');
  const [emailOTP, setEmailOTP] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  const startTimer = () => {
    setTimer(30);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const sendPhoneOTP = async () => {
    if (!phone || phone.length < 10) {
      alert('Please enter a valid phone number');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('phone-otp');
      startTimer();
    }, 1000);
  };

  const verifyPhoneOTP = async () => {
    if (!phoneOTP || phoneOTP.length !== 6) {
      alert('Please enter a valid 6-digit OTP');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('email');
    }, 1000);
  };

  const sendEmailOTP = async () => {
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('email-otp');
      startTimer();
    }, 1000);
  };

  const verifyEmailOTP = async () => {
    if (!emailOTP || emailOTP.length !== 6) {
      alert('Please enter a valid 6-digit OTP');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onAuthSuccess({ phone, email });
    }, 1000);
  };

  const resendOTP = () => {
    if (step === 'phone-otp') {
      sendPhoneOTP();
    } else if (step === 'email-otp') {
      sendEmailOTP();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-[#004d26] text-white p-6">
        <div className="flex items-center justify-between">
          {onBack && (
            <button onClick={onBack} className="text-white hover:text-gray-200">
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <h2 className="text-2xl font-bold uppercase text-center flex-1">
            VERIFY YOUR DETAILS
          </h2>
          <div className="w-5"></div>
        </div>
      </div>

      <div className="p-8">
        {step === 'phone' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Phone className="w-12 h-12 text-[#22c55e] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#004d26] mb-2">Enter Your Mobile Number</h3>
              <p className="text-gray-600">We&apos;ll send you an OTP to verify your number</p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mobile Number *
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  +91
                </span>
                <input 
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="flex-1 p-3 border border-gray-300 rounded-r-xl focus:border-[#004d26] focus:ring-2 focus:ring-[#004d26]/20"
                  placeholder="Enter 10-digit mobile number"
                  maxLength={10}
                />
              </div>
            </div>

            <button 
              onClick={sendPhoneOTP}
              disabled={isLoading || phone.length !== 10}
              className="w-full bg-[#004d26] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center hover:bg-[#22c55e] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              ) : (
                <>
                  Send OTP
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </button>
          </div>
        )}

        {step === 'phone-otp' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Phone className="w-12 h-12 text-[#22c55e] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#004d26] mb-2">Verify Mobile Number</h3>
              <p className="text-gray-600">Enter the 6-digit OTP sent to +91 {phone}</p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Enter OTP *
              </label>
              <input 
                type="text"
                value={phoneOTP}
                onChange={(e) => setPhoneOTP(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full p-3 border border-gray-300 rounded-xl focus:border-[#004d26] focus:ring-2 focus:ring-[#004d26]/20 text-center text-2xl tracking-widest"
                placeholder="000000"
                maxLength={6}
              />
            </div>

            <div className="flex justify-between items-center">
              <button 
                onClick={() => setStep('phone')}
                className="text-[#004d26] hover:text-[#22c55e] font-semibold"
              >
                Change Number
              </button>
              {timer > 0 ? (
                <span className="text-gray-500">Resend OTP in {timer}s</span>
              ) : (
                <button 
                  onClick={resendOTP}
                  className="text-[#004d26] hover:text-[#22c55e] font-semibold"
                >
                  Resend OTP
                </button>
              )}
            </div>

            <button 
              onClick={verifyPhoneOTP}
              disabled={isLoading || phoneOTP.length !== 6}
              className="w-full bg-[#004d26] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center hover:bg-[#22c55e] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              ) : (
                <>
                  Verify OTP
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </button>
          </div>
        )}

        {step === 'email' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Mail className="w-12 h-12 text-[#22c55e] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#004d26] mb-2">Enter Your Email Address</h3>
              <p className="text-gray-600">We&apos;ll send you an OTP to verify your email</p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:border-[#004d26] focus:ring-2 focus:ring-[#004d26]/20"
                placeholder="Enter your email address"
              />
            </div>

            <button 
              onClick={sendEmailOTP}
              disabled={isLoading || !email.includes('@')}
              className="w-full bg-[#004d26] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center hover:bg-[#22c55e] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              ) : (
                <>
                  Send OTP
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </button>
          </div>
        )}

        {step === 'email-otp' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Mail className="w-12 h-12 text-[#22c55e] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#004d26] mb-2">Verify Email Address</h3>
              <p className="text-gray-600">Enter the 6-digit OTP sent to {email}</p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Enter OTP *
              </label>
              <input 
                type="text"
                value={emailOTP}
                onChange={(e) => setEmailOTP(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full p-3 border border-gray-300 rounded-xl focus:border-[#004d26] focus:ring-2 focus:ring-[#004d26]/20 text-center text-2xl tracking-widest"
                placeholder="000000"
                maxLength={6}
              />
            </div>

            <div className="flex justify-between items-center">
              <button 
                onClick={() => setStep('email')}
                className="text-[#004d26] hover:text-[#22c55e] font-semibold"
              >
                Change Email
              </button>
              {timer > 0 ? (
                <span className="text-gray-500">Resend OTP in {timer}s</span>
              ) : (
                <button 
                  onClick={resendOTP}
                  className="text-[#004d26] hover:text-[#22c55e] font-semibold"
                >
                  Resend OTP
                </button>
              )}
            </div>

            <button 
              onClick={verifyEmailOTP}
              disabled={isLoading || emailOTP.length !== 6}
              className="w-full bg-[#004d26] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center hover:bg-[#22c55e] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              ) : (
                <>
                  Verify & Continue
                  <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}