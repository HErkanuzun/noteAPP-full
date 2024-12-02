import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LanguageSelectorProps {
  isDark: boolean;
}

function LanguageSelector({ isDark }: LanguageSelectorProps) {
  const { currentLanguage, setLanguage } = useLanguage();

  return (
    <div className="relative group">
      <button className={`flex items-center gap-1 p-2 rounded-lg transition-colors duration-300 ${
        isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
      }`}>
        <Globe size={20} />
        <span>{currentLanguage}</span>
      </button>
      <div className={`absolute right-0 mt-2 w-24 py-2 rounded-lg shadow-xl opacity-0 invisible 
        group-hover:opacity-100 group-hover:visible transition-all duration-200 border
        ${isDark 
          ? 'bg-gray-900 border-gray-700' 
          : 'bg-white border-gray-200'
        }`}>
        <button 
          onClick={() => setLanguage('TR')}
          className={`block w-full px-4 py-2 text-left transition-colors ${
            isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
          }`}
        >
          Türkçe
        </button>
        <button 
          onClick={() => setLanguage('EN')}
          className={`block w-full px-4 py-2 text-left transition-colors ${
            isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
          }`}
        >
          English
        </button>
      </div>
    </div>
  );
}

export default LanguageSelector;