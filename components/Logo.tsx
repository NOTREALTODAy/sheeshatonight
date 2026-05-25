'use client';

import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  showText = true,
  size = 'md'
}) => {
  const sizeMap = {
    sm: { width: 120, height: 50 },
    md: { width: 200, height: 85 },
    lg: { width: 280, height: 120 },
  };

  const [logoError, setLogoError] = React.useState(false);

  const { width, height } = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {!logoError ? (
        <Image
          src="/logo.png"
          alt="SheeshaTonight"
          width={width}
          height={height}
          priority
          className="h-auto w-auto"
          onError={() => setLogoError(true)}
        />
      ) : (
        <div className="text-lg font-black tracking-wider text-amber-500">
          🎭 SHEESHATONIGHT
        </div>
      )}
    </div>
  );
};
