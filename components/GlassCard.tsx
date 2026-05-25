import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  onClick 
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white backdrop-blur-md 
        border-2 border-amber-200
        rounded-3xl shadow-lg 
        p-6 transition-all duration-300 
        hover:border-amber-300 hover:shadow-xl
        ${className}
      `}
    >
      {children}
    </div>
  );
};
