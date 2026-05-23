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
        bg-zinc-900/80 backdrop-blur-md 
        border border-zinc-800/60 
        rounded-3xl shadow-2xl 
        p-6 transition-all duration-300 
        hover:border-zinc-700/80 hover:shadow-[0_0_40px_rgba(234,179,8,0.1)]
        ${className}
      `}
    >
      {children}
    </div>
  );
};
