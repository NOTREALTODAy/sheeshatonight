'use client';

import React from 'react';
import { ProgressBar } from './ProgressBar';
import { ChevronRight } from 'lucide-react';
import type { Order } from '@/lib/types';

interface OrderCardProps {
  order: Order;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-4 border-2 border-amber-200 hover:shadow-xl transition">
      <div className="flex flex-col gap-4">
        {/* Header Row */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-orange-700 font-bold uppercase tracking-wide">
              {order.orderNumber}
            </p>
            <h3 className="text-lg font-bold text-gray-900 mt-1">{order.venue}</h3>
            <p className="text-sm text-gray-600 mt-1">
              Status: <span className="text-orange-600 font-semibold">{order.status}</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xl font-black text-orange-600">{order.total}</p>
            <p className="text-xs text-gray-600 mt-1">{order.estimatedDelivery}</p>
          </div>
        </div>

        {/* Progress */}
        <ProgressBar progress={order.progress} label="Order Progress" />

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t-2 border-amber-200">
          <p className="text-xs text-gray-600">
            Est. Delivery: <span className="text-orange-600 font-semibold">{order.estimatedDelivery}</span>
          </p>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-500/30 transition">
            View Live Details
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
