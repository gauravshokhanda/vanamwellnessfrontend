'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { X, ArrowLeft } from 'lucide-react'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (userData: { email: string; mobile: string }) => void
}

export default function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [loginData, setLoginData] = useState({
    email: '',
    mobile: ''
  })
  
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    mobile: ''
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [showOTP, setShowOTP] = useState(false)
  const [otpValue, setOtpValue] = useState('')
  const [otpSentTo, setOtpSentTo] = useState('')
  const [currentTab, setCurrentTab] = useState('login')
  const [timer, setTimer] = useState(0)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateMobile = (mobile: string) => {
    const mobileRegex = /^[6-9]\d{9}$/
    return mobileRegex.test(mobile)
  }

  const startTimer = () => {
    setTimer(30)
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    
    const newErrors: { [key: string]: string } = {}
    
    if (!loginData.email && !loginData.mobile) {
      newErrors.general = 'Please enter either email or mobile number'
    } else {
      if (loginData.email && !validateEmail(loginData.email)) {
        newErrors.email = 'Please enter a valid email address'
      }
      if (loginData.mobile && !validateMobile(loginData.mobile)) {
        newErrors.mobile = 'Please enter a valid 10-digit mobile number'
      }
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setIsLoading(true)
    
    // Simulate sending OTP
    setTimeout(() => {
      setIsLoading(false)
      setOtpSentTo(loginData.email || loginData.mobile)
      setShowOTP(true)
      startTimer()
    }, 1500)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    
    const newErrors: { [key: string]: string } = {}
    
    if (!signupData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!signupData.email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(signupData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!signupData.mobile) {
      newErrors.mobile = 'Mobile number is required'
    } else if (!validateMobile(signupData.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setIsLoading(true)
    
    // Simulate sending OTP
    setTimeout(() => {
      setIsLoading(false)
      setOtpSentTo(signupData.mobile) // Use mobile for signup OTP
      setShowOTP(true)
      setCurrentTab('signup')
      startTimer()
    }, 1500)
  }

  const handleOTPVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    
    if (!otpValue || otpValue.length !== 6) {
      setErrors({ otp: 'Please enter a valid 6-digit OTP' })
      return
    }
    
    // For demo purposes, accept any 6-digit OTP
    setIsLoading(true)
    
    setTimeout(() => {
      if (currentTab === 'login') {
        onLogin(loginData)
      } else {
        onLogin({ email: signupData.email, mobile: signupData.mobile })
      }
      setIsLoading(false)
      handleClose()
    }, 1500)
  }

  const resendOTP = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      startTimer()
    }, 1000)
  }

  const goBackToForm = () => {
    setShowOTP(false)
    setOtpValue('')
    setErrors({})
  }

  const handleClose = () => {
    setLoginData({ email: '', mobile: '' })
    setSignupData({ name: '', email: '', mobile: '' })
    setErrors({})
    setShowOTP(false)
    setOtpValue('')
    setOtpSentTo('')
    setCurrentTab('login')
    setTimer(0)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold text-gray-900">
            {showOTP ? 'Verify OTP' : 'Welcome to Vanam Wellness'}
          </DialogTitle>
          {showOTP && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
              onClick={goBackToForm}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        {showOTP ? (
          <div className="space-y-4 p-4">
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                We've sent a 6-digit OTP to
              </p>
              <p className="font-semibold text-gray-900">{otpSentTo}</p>
            </div>
            
            <form onSubmit={handleOTPVerification} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className={`text-center text-lg tracking-widest ${errors.otp ? 'border-red-500' : ''}`}
                  maxLength={6}
                />
                {errors.otp && <p className="text-sm text-red-500">{errors.otp}</p>}
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={isLoading || otpValue.length !== 6}
              >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </Button>
              
              <div className="text-center">
                {timer > 0 ? (
                  <p className="text-sm text-gray-600">
                    Resend OTP in {timer} seconds
                  </p>
                ) : (
                  <Button
                    type="button"
                    variant="link"
                    onClick={resendOTP}
                    disabled={isLoading}
                    className="text-green-600 hover:text-green-700"
                  >
                    Resend OTP
                  </Button>
                )}
              </div>
            </form>
          </div>
        ) : (
          <Tabs defaultValue="login" className="w-full" onValueChange={setCurrentTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Create Account</TabsTrigger>
            </TabsList>
          
          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email (Optional)</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="login-mobile">Mobile Number (Optional)</Label>
                <Input
                  id="login-mobile"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={loginData.mobile}
                  onChange={(e) => setLoginData({ ...loginData, mobile: e.target.value })}
                  className={errors.mobile ? 'border-red-500' : ''}
                />
                {errors.mobile && <p className="text-sm text-red-500">{errors.mobile}</p>}
              </div>
              
              {errors.general && <p className="text-sm text-red-500">{errors.general}</p>}
              
              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={isLoading}
              >
                {isLoading ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={signupData.name}
                  onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="Enter your email"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-mobile">Mobile Number</Label>
                <Input
                  id="signup-mobile"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={signupData.mobile}
                  onChange={(e) => setSignupData({ ...signupData, mobile: e.target.value })}
                  className={errors.mobile ? 'border-red-500' : ''}
                />
                {errors.mobile && <p className="text-sm text-red-500">{errors.mobile}</p>}
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={isLoading}
              >
                {isLoading ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            </form>
          </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  )
}