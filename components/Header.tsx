'use client';

import React from 'react';
import { MapPin, User, Menu } from 'lucide-react';
import { useAuthStore } from '@/lib/store';

export const Header: React.FC = () => {
  const { region, userName } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-zinc-950 via-zinc-900 to-transparent backdrop-blur-md border-b border-zinc-800/40 px-4 py-4 md:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="text-xl md:text-2xl font-black tracking-wider text-amber-500">
            SHEESHATONIGHT
          </div>
        </div>

        {/* Region Badge */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-zinc-800/50 rounded-full border border-amber-500/30">
          <MapPin size={16} className="text-amber-500" />
          <span className="text-sm font-medium text-gray-300">{region}</span>
        </div>

        {/* Profile & Menu */}
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-zinc-800/50 rounded-lg transition">
            <User size={20} className="text-amber-500" />
          </button>
          <button className="md:hidden p-2 hover:bg-zinc-800/50 rounded-lg">
            <Menu size={20} className="text-amber-500" />
          </button>
        </div>
      </div>
    </header>
  );
};
