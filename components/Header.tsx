'use client';

import React from 'react';
import { MapPin, User, Menu } from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { Logo } from './Logo';

export const Header: React.FC = () => {
  const { region, userName } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 bg-white bg-opacity-95 backdrop-blur-md border-b-2 border-amber-200 px-4 py-4 md:px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Logo size="sm" />
        </div>

        {/* Region Badge */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full border-2 border-amber-300">
          <MapPin size={16} className="text-orange-600" />
          <span className="text-sm font-semibold text-gray-800">{region}</span>
        </div>

        {/* Profile & Menu */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-2 bg-amber-50 rounded-lg border border-amber-300 text-sm font-semibold text-gray-800">
            {userName}
          </div>
          <button className="p-2 hover:bg-amber-100 rounded-lg transition border border-amber-200">
            <User size={20} className="text-orange-600" />
          </button>
          <button className="md:hidden p-2 hover:bg-amber-100 rounded-lg border border-amber-200">
            <Menu size={20} className="text-orange-600" />
          </button>
        </div>
      </div>
    </header>
  );
};
