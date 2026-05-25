'use client';

import React from 'react';
import { useAuthStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { BottomNavBar } from '@/components/BottomNavBar';
import { OrderCard } from '@/components/OrderCard';
import { RoleSwitcher } from '@/components/RoleSwitcher';
import { Clock, Truck, Trophy, LogOut } from 'lucide-react';
import { MOCK_ORDERS } from '@/lib/constants';

export default function CustomerDashboard() {
  const { userName, region, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 pb-32">
        {/* Top Controls */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
              Welcome, {userName}
            </h1>
            <p className="text-orange-700 font-semibold">Your sheesha tonight, curated for {region}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition flex items-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Role Switcher */}
        <div className="mb-8">
          <RoleSwitcher />
        </div>

        {/* Live Insights Card */}
        <div className="mb-8 bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl shadow-xl p-8 border-2 border-amber-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-xs text-amber-700 font-bold uppercase tracking-wide">Next Pickup</p>
              <h2 className="text-2xl font-black text-gray-900 mt-2">Bespoke Sheesha Co.</h2>
              <p className="text-sm text-orange-700 mt-1 font-semibold">Tonight • 8:00 PM</p>
            </div>
            <div className="border-l-4 border-r-4 border-amber-400 px-6">
              <p className="text-xs text-amber-700 font-bold uppercase tracking-wide">Status</p>
              <p className="text-xl font-bold text-orange-600 mt-2">Ready to Pickup</p>
              <p className="text-sm text-orange-700 mt-1">0.8 km away</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-amber-700 font-bold uppercase tracking-wide">Est. Delivery</p>
              <h3 className="text-2xl font-black text-gray-900 mt-2">9:30 PM</h3>
              <p className="text-sm text-orange-700 mt-1">Tonight</p>
            </div>
          </div>
        </div>

        {/* Tracking Timelines */}
        <div className="mb-8">
          <h2 className="text-xl font-black text-gray-900 mb-4">Your Orders</h2>
          {MOCK_ORDERS.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-amber-200 hover:shadow-xl transition">
            <Clock size={24} className="text-orange-600 mb-3" />
            <p className="text-sm text-gray-600 font-semibold">Active Orders</p>
            <p className="text-2xl font-black text-gray-900 mt-1">2</p>
          </div>
          <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-amber-200 hover:shadow-xl transition">
            <Truck size={24} className="text-orange-600 mb-3" />
            <p className="text-sm text-gray-600 font-semibold">Completed</p>
            <p className="text-2xl font-black text-gray-900 mt-1">24</p>
          </div>
          <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-amber-200 hover:shadow-xl transition">
            <Trophy size={24} className="text-orange-600 mb-3" />
            <p className="text-sm text-gray-600 font-semibold">Loyalty Points</p>
            <p className="text-2xl font-black text-gray-900 mt-1">1,240</p>
          </div>
        </div>
      </main>

      <BottomNavBar />
    </div>
  );
}
