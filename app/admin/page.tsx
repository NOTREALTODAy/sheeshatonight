'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { RoleSwitcher } from '@/components/RoleSwitcher';
import { AlertCircle, CheckCircle, XCircle, LogOut } from 'lucide-react';
import { ADMIN_METRICS, MOCK_KYC_QUEUE } from '@/lib/constants';
import type { VendorKYC } from '@/lib/types';

export default function AdminPanel() {
  const { logout } = useAuthStore();
  const router = useRouter();
  const [kycQueue, setKycQueue] = useState<VendorKYC[]>(MOCK_KYC_QUEUE);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleApprove = (vendorId: string) => {
    setKycQueue(kycQueue.map(v => v.vendorId === vendorId ? { ...v, status: 'APPROVED' } : v));
  };

  const handleReject = (vendorId: string) => {
    setKycQueue(kycQueue.map(v => v.vendorId === vendorId ? { ...v, status: 'REJECTED' } : v));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 pb-8">
        {/* Top Controls */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900">Platform Operations Hub</h1>
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

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {ADMIN_METRICS.map((metric, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 border-2 border-amber-200 hover:shadow-xl transition">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-orange-700 font-bold uppercase">
                    {metric.label}
                  </p>
                  <p className="text-2xl font-black text-orange-600 mt-2">{metric.value}</p>
                  {metric.trend && (
                    <p className={`text-xs mt-2 font-semibold ${metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {metric.trend} vs last month
                    </p>
                  )}
                </div>
                {metric.icon && <span className="text-2xl">{metric.icon}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* KYC Approval Queue */}
        <div>
          <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle size={24} className="text-orange-600" />
            Pending Vendor KYC Approvals ({kycQueue.filter(v => v.status === 'PENDING').length})
          </h2>

          <div className="space-y-4">
            {kycQueue.map((vendor) => (
              <div key={vendor.vendorId} className="bg-white rounded-2xl shadow-lg p-6 border-2 border-amber-200 hover:shadow-xl transition">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  {/* Vendor Info */}
                  <div className="md:col-span-2">
                    <p className="text-sm text-orange-700 font-bold uppercase mb-1">
                      {vendor.vendorName}
                    </p>
                    <p className="text-xs text-gray-600">
                      Submitted: {new Date(vendor.submittedDate).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Documents */}
                  <div className="md:col-span-2">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-sm text-gray-700">Trade License: <span className="text-green-600 font-semibold">Ready</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full" />
                        <span className="text-sm text-gray-700">Identity: <span className="text-orange-600 font-semibold">Pending</span></span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  {vendor.status === 'PENDING' && (
                    <div className="flex gap-2 md:justify-end">
                      <button
                        onClick={() => handleApprove(vendor.vendorId)}
                        className="flex-1 md:flex-none px-4 py-2 bg-green-100 text-green-700 font-semibold rounded-lg hover:bg-green-200 border-2 border-green-400 transition flex items-center gap-2 justify-center"
                      >
                        <CheckCircle size={16} />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(vendor.vendorId)}
                        className="flex-1 md:flex-none px-4 py-2 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 border-2 border-red-400 transition flex items-center gap-2 justify-center"
                      >
                        <XCircle size={16} />
                        Reject
                      </button>
                    </div>
                  )}

                  {vendor.status === 'APPROVED' && (
                    <div className="px-4 py-2 bg-green-100 text-green-700 font-semibold rounded-lg border-2 border-green-400 text-center">
                      ✓ Approved
                    </div>
                  )}

                  {vendor.status === 'REJECTED' && (
                    <div className="px-4 py-2 bg-red-100 text-red-700 font-semibold rounded-lg border-2 border-red-400 text-center">
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
