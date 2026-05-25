import React from 'react';

interface ProgressBarProps {
  progress: number; // 0-100
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, label }) => {
  return (
    <div className="w-full">
      {label && <p className="text-xs text-gray-600 font-semibold mb-2">{label}</p>}
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden border border-amber-300">
        <div
          className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-orange-600 mt-1 font-bold">{progress}% Complete</p>
    </div>
  );
};
