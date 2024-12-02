import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface LoadingOverlayProps {
  isDark: boolean;
}

function LoadingOverlay({ isDark }: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className={`absolute inset-0 ${isDark ? 'bg-gray-900' : 'bg-white'} opacity-75`} />
      <div className="relative">
        <LoadingSpinner size={40} className="text-blue-600" />
      </div>
    </div>
  );
}

export default LoadingOverlay;