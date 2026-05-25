'use client';

import React, { useState, useEffect } from 'react';
import { Lock, Phone, Mail, Check } from 'lucide-react';
import { useAuthStore, type UserRole } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { GlassCard } from '@/components/GlassCard';
import { RoleSwitcher } from '@/components/RoleSwitcher';
import { Logo } from '@/components/Logo';

export default function AuthPage() {
  const router = useRouter();
  const { setLoggedIn, setUserData, setCurrentScreen, userRole, isLoggedIn } = useAuthStore();
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  const [input, setInput] = useState('');
  const [ageVerified, setAgeVerified] = useState(false);
  const [step, setStep] = useState<'method' | 'age' | 'complete'>('method');

  useEffect(() => {
    if (isLoggedIn) {
      const screenMap: Record<UserRole, string> = {
        CUSTOMER: '/dashboard',
        VENDOR: '/vendor',
        ADMIN: '/admin',
      };
      const redirectPath = screenMap[userRole] || '/dashboard';
      setTimeout(() => {
        router.push(redirectPath);
      }, 1000);
    }
  }, [isLoggedIn, userRole, router]);

  const handleContinue = () => {
    if (!input.trim()) return;
    setStep('age');
  };

  const handleAgeVerify = () => {
    if (!ageVerified) return;
    
    setUserData({
      email: loginMethod === 'email' ? input : `user${Date.now()}@sheesha.ae`,
      name: 'Guest User',
    });
    setLoggedIn(true);
    
    const screenMap: Record<UserRole, any> = {
      CUSTOMER: 'CUSTOMER_DASHBOARD',
      VENDOR: 'VENDOR_PORTAL',
      ADMIN: 'ADMIN_PANEL',
    };
    setCurrentScreen(screenMap[userRole] || 'CUSTOMER_DASHBOARD');
    setStep('complete');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <p className="text-orange-700 text-sm font-semibold">Premium Tobacco & Sheesha Rental</p>
        </div>

        {/* Role Switcher */}
        <div className="mb-6">
          <RoleSwitcher />
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-amber-200">
          {step === 'method' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
              
              {/* Login Method Tabs */}
              <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
                <button
                  onClick={() => setLoginMethod('phone')}
                  className={`flex-1 py-2 px-3 rounded-lg font-semibold transition ${
                    loginMethod === 'phone'
                      ? 'bg-amber-500 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Phone size={16} className="inline mr-2" />
                  Phone
                </button>
                <button
                  onClick={() => setLoginMethod('email')}
                  className={`flex-1 py-2 px-3 rounded-lg font-semibold transition ${
                    loginMethod === 'email'
                      ? 'bg-amber-500 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Mail size={16} className="inline mr-2" />
                  Email
                </button>
              </div>

              {/* Input Field */}
              <div>
                <label className="text-sm text-gray-700 font-semibold mb-2 block">
                  {loginMethod === 'phone' ? 'Phone Number' : 'Email Address'}
                </label>
                <input
                  type={loginMethod === 'phone' ? 'tel' : 'email'}
                  placeholder={loginMethod === 'phone' ? '+971 50 123 4567' : 'your@email.ae'}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:bg-white transition"
                />
              </div>

              <button
                onClick={handleContinue}
                disabled={!input.trim()}
                className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <Lock size={18} className="inline mr-2" />
                Continue with OTP
              </button>
            </div>
          )}

          {step === 'age' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Age Verification</h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                Sheesha and tobacco products are restricted to users 18+ (UAE) or 21+ (UK). Please verify your age to continue.
              </p>

              {/* Age Checkbox */}
              <label className="flex items-start gap-4 p-4 bg-amber-50 border-2 border-amber-300 rounded-xl cursor-pointer hover:bg-amber-100 transition">
                <input
                  type="checkbox"
                  checked={ageVerified}
                  onChange={(e) => setAgeVerified(e.target.checked)}
                  className="mt-1 w-5 h-5 accent-amber-500"
                />
                <div>
                  <p className="text-gray-900 font-semibold mb-1">I confirm I am of legal age</p>
                  <p className="text-gray-600 text-xs">
                    I declare that I am 18+ (UAE) or 21+ (UK) and legally permitted to rent or view tobacco essentials in my jurisdiction.
                  </p>
                </div>
              </label>

              {/* Approve Button */}
              <button
                onClick={handleAgeVerify}
                disabled={!ageVerified}
                className="w-full py-3 bg-gradient-to-r from-rose-600 to-orange-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-rose-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <Check size={18} className="inline mr-2" />
                Verify & Continue
              </button>
            </div>
          )}

          {step === 'complete' && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check size={32} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Welcome!</h2>
              <p className="text-gray-600">Redirecting to your dashboard...</p>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-gray-600 mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
