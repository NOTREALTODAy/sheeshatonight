'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@/lib/store';
import { Header } from '@/components/Header';
import { GlassCard } from '@/components/GlassCard';
import { RoleSwitcher } from '@/components/RoleSwitcher';
import { BarChart3, Users, Zap, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { ADMIN_METRICS, MOCK_KYC_QUEUE } from '@/lib/constants';
import type { VendorKYC } from '@/lib/types';

export default function AdminPanel() {
  const [kycQueue, setKycQueue] = useState<VendorKYC[]>(MOCK_KYC_QUEUE);

  const handleApprove = (vendorId: string) => {
    setKycQueue(kycQueue.map(v => v.vendorId === vendorId ? { ...v, status: 'APPROVED' } : v));
  };

  const handleReject = (vendorId: string) => {
    setKycQueue(kycQueue.map(v => v.vendorId === vendorId ? { ...v, status: 'REJECTED' } : v));
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
        <h1 className="text-3xl md:text-4xl font-black text-white mb-8">Platform Operations Hub</h1>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {ADMIN_METRICS.map((metric, idx) => (
            <GlassCard key={idx} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">
                    {metric.label}
                  </p>
                  <p className="text-2xl font-black text-amber-500 mt-2">{metric.value}</p>
                  {metric.trend && (
                    <p className={`text-xs mt-2 font-semibold ${metric.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {metric.trend} vs last month
                    </p>
                  )}
                </div>
                {metric.icon && <span className="text-2xl">{metric.icon}</span>}
              </div>
            </GlassCard>
          ))}
        </div>

        {/* KYC Approval Queue */}
        <div>
          <h2 className="text-xl font-black text-white mb-4 flex items-center gap-2">
            <AlertCircle size={24} className="text-rose-500" />
            Pending Vendor KYC Approvals ({kycQueue.filter(v => v.status === 'PENDING').length})
          </h2>

          <div className="space-y-4">
            {kycQueue.map((vendor) => (
              <GlassCard key={vendor.vendorId} className="p-6 border-zinc-700/40">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  {/* Vendor Info */}
                  <div className="md:col-span-2">
                    <p className="text-sm text-amber-500 font-semibold uppercase tracking-wide mb-1">
                      {vendor.vendorName}
                    </p>
                    <p className="text-xs text-gray-400">
                      Submitted: {new Date(vendor.submittedDate).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Documents */}
                  <div className="md:col-span-2">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-sm text-gray-300">Trade License: <span className="text-green-500 font-semibold">Ready</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full" />
                        <span className="text-sm text-gray-300">Identity: <span className="text-amber-500 font-semibold">Pending</span></span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  {vendor.status === 'PENDING' && (
                    <div className="flex gap-2 md:justify-end">
                      <button
                        onClick={() => handleApprove(vendor.vendorId)}
                        className="flex-1 md:flex-none px-4 py-2 bg-green-500/20 text-green-400 font-semibold rounded-lg hover:bg-green-500/30 border border-green-500/30 transition"
                      >
                        <CheckCircle size={16} className="inline mr-2" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(vendor.vendorId)}
                        className="flex-1 md:flex-none px-4 py-2 bg-red-500/20 text-red-400 font-semibold rounded-lg hover:bg-red-500/30 border border-red-500/30 transition"
                      >
                        <XCircle size={16} className="inline mr-2" />
                        Reject
                      </button>
                    </div>
                  )}

                  {vendor.status === 'APPROVED' && (
                    <div className="px-4 py-2 bg-green-500/20 text-green-400 font-semibold rounded-lg text-center">
                      ✓ Approved
                    </div>
                  )}

                  {vendor.status === 'REJECTED' && (
                    <div className="px-4 py-2 bg-red-500/20 text-red-400 font-semibold rounded-lg text-center">
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
