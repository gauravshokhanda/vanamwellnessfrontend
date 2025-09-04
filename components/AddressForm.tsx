'use client';

import { useState } from 'react';
import { MapPin, Home, Building, ArrowRight, ArrowLeft } from 'lucide-react';

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

interface AddressFormProps {
  userData: { phone: string; email: string };
  onAddressSubmit: (addressData: AddressData) => void;
  onBack: () => void;
}

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry'
];

export default function AddressForm({ userData, onAddressSubmit, onBack }: AddressFormProps) {
  const [formData, setFormData] = useState<AddressData>({
    fullName: '',
    phone: userData.phone,
    email: userData.email,
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    addressType: 'home',
    landmark: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<AddressData>>({});

  const validateForm = () => {
    const newErrors: Partial<AddressData> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.pincode || formData.pincode.length !== 6) {
      newErrors.pincode = 'Valid 6-digit pincode is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onAddressSubmit(formData);
    }, 1000);
  };

  const handleInputChange = (field: keyof AddressData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-[#004d26] text-white p-6">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="text-white hover:text-gray-200">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold uppercase text-center flex-1">
            DELIVERY ADDRESS
          </h2>
          <div className="w-5"></div>
        </div>
      </div>

      <div className="p-8">
        <div className="text-center mb-6">
          <MapPin className="w-12 h-12 text-[#22c55e] mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#004d26] mb-2">Add Delivery Address</h3>
          <p className="text-gray-600">Please provide your complete address for delivery</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name *
            </label>
            <input 
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className={`w-full p-3 border rounded-xl focus:border-[#004d26] focus:ring-2 focus:ring-[#004d26]/20 ${
                errors.fullName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          {/* Contact Info (Pre-filled) */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <input 
                type="tel"
                value={`+91 ${formData.phone}`}
                disabled
                className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input 
                type="email"
                value={formData.email}
                disabled
                className="w-full p-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-600"
              />
            </div>
          </div>

          {/* Address Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Address Type *
            </label>
            <div className="flex space-x-4">
              {[
                { value: 'home', label: 'Home', icon: Home },
                { value: 'office', label: 'Office', icon: Building },
                { value: 'other', label: 'Other', icon: MapPin }
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleInputChange('addressType', value as 'home' | 'office' | 'other')}
                  className={`flex-1 p-3 border rounded-xl flex items-center justify-center space-x-2 transition-all ${
                    formData.addressType === value
                      ? 'border-[#004d26] bg-[#004d26] text-white'
                      : 'border-gray-300 hover:border-[#004d26]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-semibold">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Address Lines */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Address Line 1 *
            </label>
            <input 
              type="text"
              value={formData.addressLine1}
              onChange={(e) => handleInputChange('addressLine1', e.target.value)}
              className={`w-full p-3 border rounded-xl focus:border-[#004d26] focus:ring-2 focus:ring-[#004d26]/20 ${
                errors.addressLine1 ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="House/Flat No., Building Name, Street"
            />
            {errors.addressLine1 && <p className="text-red-500 text-sm mt-1">{errors.addressLine1}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Address Line 2 (Optional)
            </label>
            <input 
              type="text"
              value={formData.addressLine2}
              onChange={(e) => handleInputChange('addressLine2', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:border-[#004d26] focus:ring-2 focus:ring-[#004d26]/20"
              placeholder="Area, Locality"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Landmark (Optional)
            </label>
            <input 
              type="text"
              value={formData.landmark}
              onChange={(e) => handleInputChange('landmark', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:border-[#004d26] focus:ring-2 focus:ring-[#004d26]/20"
              placeholder="Near famous landmark"
            />
          </div>

          {/* City, State, Pincode */}
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                City *
              </label>
              <input 
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className={`w-full p-3 border rounded-xl focus:border-[#004d26] focus:ring-2 focus:ring-[#004d26]/20 ${
                  errors.city ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter city"
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                State *
              </label>
              <select 
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className={`w-full p-3 border rounded-xl focus:border-[#004d26] focus:ring-2 focus:ring-[#004d26]/20 ${
                  errors.state ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select State</option>
                {indianStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Pincode *
              </label>
              <input 
                type="text"
                value={formData.pincode}
                onChange={(e) => handleInputChange('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                className={`w-full p-3 border rounded-xl focus:border-[#004d26] focus:ring-2 focus:ring-[#004d26]/20 ${
                  errors.pincode ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="000000"
                maxLength={6}
              />
              {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
            </div>
          </div>

          {/* Delivery Note */}
          <div className="bg-[#f0fdf4] p-4 rounded-xl">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-[#22c55e] mt-0.5" />
              <div>
                <h4 className="font-semibold text-[#004d26] mb-1">Delivery Information</h4>
                <p className="text-sm text-gray-600">
                  • Free delivery within 3-5 business days<br/>
                  • Cash on Delivery available<br/>
                  • SMS updates on delivery status
                </p>
              </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#004d26] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center hover:bg-[#22c55e] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            ) : (
              <>
                Save Address & Continue
                <ArrowRight className="ml-2 w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}