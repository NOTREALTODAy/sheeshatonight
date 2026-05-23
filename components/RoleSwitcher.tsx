'use client';

import React from 'react';
import { useAuthStore, type UserRole } from '@/lib/store';

interface RoleSwitcherProps {
  onRoleChange?: (role: UserRole) => void;
}

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ onRoleChange }) => {
  const { userRole, switchRole } = useAuthStore();
  const roles: { key: UserRole; label: string; icon: string }[] = [
    { key: 'CUSTOMER', label: 'Customer', icon: '👤' },
    { key: 'VENDOR', label: 'Vendor Partner', icon: '🏪' },
    { key: 'ADMIN', label: 'Platform Admin', icon: '⚙️' },
  ];

  const handleSwitch = (role: UserRole) => {
    switchRole(role);
    onRoleChange?.(role);
  };

  return (
    <div className="flex gap-2 p-2 bg-zinc-900/60 rounded-2xl border border-zinc-800/40">
      {roles.map((role) => (
        <button
          key={role.key}
          onClick={() => handleSwitch(role.key)}
          className={`flex-1 px-4 py-3 rounded-xl font-semibold transition text-sm md:text-base ${
            userRole === role.key
              ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg'
              : 'bg-zinc-800/40 text-gray-300 hover:bg-zinc-800/60'
          }`}
        >
          <span className="mr-2">{role.icon}</span>
          {role.label}
        </button>
      ))}
    </div>
  );
};
