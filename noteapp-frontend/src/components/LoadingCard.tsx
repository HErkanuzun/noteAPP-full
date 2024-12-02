import React from 'react';

interface LoadingCardProps {
  isDark: boolean;
}

function LoadingCard({ isDark }: LoadingCardProps) {
  return (
    <div className={`rounded-xl overflow-hidden ${
      isDark ? 'bg-gray-800/50' : 'bg-white/50'
    } backdrop-blur-xl animate-pulse`}>
      <div className="aspect-video bg-gray-300 dark:bg-gray-700" />
      <div className="p-6 space-y-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6" />
        </div>
      </div>
    </div>
  );
}

export default LoadingCard;