import React from 'react';
import { Heart } from 'lucide-react';

interface FavoriteToggleProps {
  isFavorite: boolean;
  onToggle: () => void;
  size?: number;
}

function FavoriteToggle({ isFavorite, onToggle, size = 20 }: FavoriteToggleProps) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md 
        transition-all duration-300 transform hover:scale-110 z-10
        ${isFavorite 
          ? 'bg-red-500 text-white' 
          : 'bg-gray-900/20 text-white hover:bg-red-500'}`}
    >
      <Heart size={size} fill={isFavorite ? 'currentColor' : 'none'} />
    </button>
  );
}

export default FavoriteToggle;