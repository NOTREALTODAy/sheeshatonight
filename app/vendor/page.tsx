'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@/lib/store';
import { Header } from '@/components/Header';
import { GlassCard } from '@/components/GlassCard';
import { RoleSwitcher } from '@/components/RoleSwitcher';
import { CheckCircle, XCircle, Clock, TrendingUp } from 'lucide-react';
import { MOCK_BOOKING_REQUESTS } from '@/lib/constants';
import type { BookingRequest } from '@/lib/types';

export default function VendorPortal() {
  const { region } = useAuthStore();
  const [bookings, setBookings] = useState<BookingRequest[]>(MOCK_BOOKING_REQUESTS);

  const handleAccept = (id: string) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: 'ACCEPTED' } : b));
  };

  const handleReject = (id: string) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: 'REJECTED' } : b));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 pb-8">
        {/* Role Switcher */}
        <div className="mb-8">
          <RoleSwitcher />
        </div>

        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-black text-white mb-8">Vendor Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <GlassCard className="p-6">
            <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Total Settlement</p>
            <p className="text-3xl font-black text-amber-500 mt-2">AED 45,320</p>
            <p className="text-xs text-green-500 mt-2">↑ 12% this month</p>
          </GlassCard>
          <GlassCard className="p-6">
            <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Active Units</p>
            <p className="text-3xl font-black text-white mt-2">12</p>
            <p className="text-xs text-gray-500 mt-2">All operating</p>
          </GlassCard>
          <GlassCard className="p-6">
            <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Plan Tier</p>
            <p className="text-lg font-black text-rose-500 mt-2">ADVANCED</p>
            <p className="text-xs text-green-500 mt-2">✓ Active</p>
          </GlassCard>
          <GlassCard className="p-6">
            <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Pending Orders</p>
            <p className="text-3xl font-black text-amber-500 mt-2">5</p>
            <p className="text-xs text-amber-500 mt-2">Requires action</p>
          </GlassCard>
        </div>

        {/* Booking Requests */}
        <div>
          <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
            <Clock size={24} className="text-amber-500" />
            Pending Booking Requests
          </h2>

          <div className="space-y-4">
            {bookings.map((booking) => (
              <GlassCard key={booking.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-amber-500 font-semibold uppercase tracking-wide mb-1">
                      {booking.customerName}
                    </p>
                    <h3 className="text-lg font-bold text-white">{booking.productName}</h3>
                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-400">
                      <span>📅 {booking.rentalDate}</span>
                      <span>📦 Qty: {booking.quantity}</span>
                    </div>
                  </div>

                  {booking.status === 'PENDING' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAccept(booking.id)}
                        className="px-6 py-2 bg-green-500/20 text-green-400 font-semibold rounded-lg hover:bg-green-500/30 border border-green-500/30 transition"
                      >
                        <CheckCircle size={18} className="inline mr-2" />
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(booking.id)}
                        className="px-6 py-2 bg-red-500/20 text-red-400 font-semibold rounded-lg hover:bg-red-500/30 border border-red-500/30 transition"
                      >
                        <XCircle size={18} className="inline mr-2" />
                        Reject
                      </button>
                    </div>
                  )}

                  {booking.status === 'ACCEPTED' && (
                    <div className="px-4 py-2 bg-green-500/20 text-green-400 font-semibold rounded-lg">
                      ✓ Accepted
                    </div>
                  )}

                  {booking.status === 'REJECTED' && (
                    <div className="px-4 py-2 bg-red-500/20 text-red-400 font-semibold rounded-lg">
                      ✗ Rejected
                    </div>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
