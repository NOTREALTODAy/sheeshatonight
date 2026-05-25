'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { RoleSwitcher } from '@/components/RoleSwitcher';
import { CheckCircle, XCircle, Clock, LogOut } from 'lucide-react';
import { MOCK_BOOKING_REQUESTS } from '@/lib/constants';
import type { BookingRequest } from '@/lib/types';

export default function VendorPortal() {
  const { logout } = useAuthStore();
  const router = useRouter();
  const [bookings, setBookings] = useState<BookingRequest[]>(MOCK_BOOKING_REQUESTS);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleAccept = (id: string) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: 'ACCEPTED' } : b));
  };

  const handleReject = (id: string) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: 'REJECTED' } : b));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 pb-8">
        {/* Top Controls */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900">Vendor Dashboard</h1>
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

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-amber-200">
            <p className="text-xs text-orange-700 font-bold uppercase">Total Settlement</p>
            <p className="text-3xl font-black text-orange-600 mt-2">AED 45,320</p>
            <p className="text-xs text-green-600 font-semibold mt-2">↑ 12% this month</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-amber-200">
            <p className="text-xs text-orange-700 font-bold uppercase">Active Units</p>
            <p className="text-3xl font-black text-gray-900 mt-2">12</p>
            <p className="text-xs text-gray-600 mt-2">All operating</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-amber-200">
            <p className="text-xs text-orange-700 font-bold uppercase">Plan Tier</p>
            <p className="text-lg font-black text-orange-600 mt-2">ADVANCED</p>
            <p className="text-xs text-green-600 font-semibold mt-2">✓ Active</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-amber-200">
            <p className="text-xs text-orange-700 font-bold uppercase">Pending Orders</p>
            <p className="text-3xl font-black text-orange-600 mt-2">5</p>
            <p className="text-xs text-orange-600 font-semibold mt-2">Requires action</p>
          </div>
        </div>

        {/* Booking Requests */}
        <div>
          <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
            <Clock size={24} className="text-orange-600" />
            Pending Booking Requests ({bookings.filter(b => b.status === 'PENDING').length})
          </h2>

          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-2xl shadow-lg p-6 border-2 border-amber-200 hover:shadow-xl transition">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-orange-700 font-bold uppercase mb-1">
                      {booking.customerName}
                    </p>
                    <h3 className="text-lg font-bold text-gray-900">{booking.productName}</h3>
                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                      <span>📅 {booking.rentalDate}</span>
                      <span>📦 Qty: {booking.quantity}</span>
                    </div>
                  </div>

                  {booking.status === 'PENDING' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAccept(booking.id)}
                        className="px-6 py-2 bg-green-100 text-green-700 font-semibold rounded-lg hover:bg-green-200 border-2 border-green-400 transition flex items-center gap-2"
                      >
                        <CheckCircle size={18} />
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(booking.id)}
                        className="px-6 py-2 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 border-2 border-red-400 transition flex items-center gap-2"
                      >
                        <XCircle size={18} />
                        Reject
                      </button>
                    </div>
                  )}

                  {booking.status === 'ACCEPTED' && (
                    <div className="px-4 py-2 bg-green-100 text-green-700 font-semibold rounded-lg border-2 border-green-400">
                      ✓ Accepted
                    </div>
                  )}

                  {booking.status === 'REJECTED' && (
                    <div className="px-4 py-2 bg-red-100 text-red-700 font-semibold rounded-lg border-2 border-red-400">
                      ✗ Rejected
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
