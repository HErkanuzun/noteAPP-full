import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  isDark?: boolean;
}

function SearchBar({ onSearch, placeholder = 'Ara...', isDark }: SearchBarProps) {
  return (
    <div className={`relative w-full max-w-2xl mx-auto ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
        className={`w-full px-4 py-3 pl-12 rounded-lg outline-none transition-all
          ${isDark ? 'bg-gray-800 focus:bg-gray-700' : 'bg-white focus:bg-gray-50'}
          border ${isDark ? 'border-gray-700' : 'border-gray-200'}
          focus:ring-2 focus:ring-blue-500`}
      />
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
    </div>
  );
}

export default SearchBar;