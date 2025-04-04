
import React from 'react';

interface GradientLogoProps {
  className?: string;
}

const GradientLogo: React.FC<GradientLogoProps> = ({ className }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="flex items-center">
        <div className="mr-2 text-4xl font-bold">
          <span className="text-white">{'/'}</span>
          <span className="text-white">{'>'}</span>
        </div>
        <span className="text-3xl font-mono font-bold text-white">Gradient</span>
      </div>
      <div className="text-xs text-gray-400 mt-1">Open Layer For Edge Compute</div>
    </div>
  );
};

export default GradientLogo;
