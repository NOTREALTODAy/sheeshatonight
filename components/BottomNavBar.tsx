'use client';

import React from 'react';
import { Home, Compass, ShoppingBag, User } from 'lucide-react';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

export const BottomNavBar: React.FC = () => {
  const navItems: NavItem[] = [
    { icon: <Home size={24} />, label: 'Home', active: true },
    { icon: <Compass size={24} />, label: 'Explore' },
    { icon: <ShoppingBag size={24} />, label: 'Orders' },
    { icon: <User size={24} />, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-zinc-950 via-zinc-900 to-transparent backdrop-blur-md border-t border-zinc-800/60 px-4 py-3">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-4 gap-2">
          {navItems.map((item, idx) => (
            <button
              key={idx}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-2xl transition ${
                item.active
                  ? 'bg-amber-500/20 text-amber-500'
                  : 'text-gray-400 hover:text-amber-500'
              }`}
            >
              {item.icon}
              <span className="text-xs font-semibold">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};
