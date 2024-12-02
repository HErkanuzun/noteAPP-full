import React, { useState } from 'react';
import { Book, Moon, Sun, User, LogOut, FileText, GraduationCap, BookOpen, Calendar, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

function Header({ isDark, setIsDark }: HeaderProps) {
  const { isLoggedIn, user, logout, loading } = useAuth();
  const { currentLanguage } = useLanguage();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const renderAuthButton = () => {
    if (loading) {
      return null;
    }

    if (isLoggedIn && user) {
      return (
        <div className="relative group hidden md:block">
          <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <img
              src={user.avatar}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="font-medium">{user.name}</span>
          </button>

          <div className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg overflow-hidden transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible
            ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="py-2">
              <Link 
                to="/notes"
                className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors
                  ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <FileText size={16} className="text-blue-600" />
                {currentLanguage === 'TR' ? 'Notlarım' : 'My Notes'}
              </Link>
              <Link 
                to="/exams"
                className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors
                  ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <GraduationCap size={16} className="text-purple-600" />
                {currentLanguage === 'TR' ? 'Sınavlarım' : 'My Exams'}
              </Link>
              <Link 
                to="/articles"
                className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors
                  ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <BookOpen size={16} className="text-green-600" />
                {currentLanguage === 'TR' ? 'Makalelerim' : 'My Articles'}
              </Link>
              <Link 
                to="/events"
                className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors
                  ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <Calendar size={16} className="text-yellow-600" />
                {currentLanguage === 'TR' ? 'Etkinliklerim' : 'My Events'}
              </Link>
              <Link 
                to="/profile"
                className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors
                  ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <User size={16} className="text-indigo-600" />
                {currentLanguage === 'TR' ? 'Profil' : 'Profile'}
              </Link>
              <div className={`h-px mx-4 my-2 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
              <button 
                onClick={handleLogout}
                className={`flex items-center gap-3 px-4 py-2 text-sm w-full text-left transition-colors
                  ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} text-red-600`}
              >
                <LogOut size={16} />
                {currentLanguage === 'TR' ? 'Çıkış Yap' : 'Logout'}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <Link 
        to="/login"
        className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
      >
        <User size={18} />
        {currentLanguage === 'TR' ? 'Giriş Yap' : 'Login'}
      </Link>
    );
  };

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl transition-colors duration-300 ${
      isDark ? 'bg-gray-900/80' : 'bg-white/80'
    } border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Book className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold">UniNotes</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/notes" className="hover:text-blue-600 transition-colors">
              {currentLanguage === 'TR' ? 'Notlar' : 'Notes'}
            </Link>
            <Link to="/exams" className="hover:text-blue-600 transition-colors">
              {currentLanguage === 'TR' ? 'Sınavlar' : 'Exams'}
            </Link>
            <Link to="/articles" className="hover:text-blue-600 transition-colors">
              {currentLanguage === 'TR' ? 'Makaleler' : 'Articles'}
            </Link>
            <Link to="/events" className="hover:text-blue-600 transition-colors">
              {currentLanguage === 'TR' ? 'Etkinlikler' : 'Events'}
            </Link>
            <Link to="/about" className="hover:text-blue-600 transition-colors">
              {currentLanguage === 'TR' ? 'Hakkında' : 'About'}
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                isDark ? 'bg-gray-800 text-yellow-500' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <LanguageSelector isDark={isDark} />
            
            {renderAuthButton()}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-x-0 top-16 z-40 md:hidden transition-all duration-300 ${
        isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        {/* Backdrop */}
        <div 
          className={`fixed inset-0 transition-all duration-300 ${
            isMenuOpen ? 'backdrop-blur-md bg-black/50' : 'backdrop-blur-none bg-black/0'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Menu Content */}
        <div className={`relative w-full transform transition-all duration-300 ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        } ${isDark ? 'bg-gray-900' : 'bg-white'} border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="container mx-auto px-4 py-6">
            {/* User Profile Section */}
            {isLoggedIn && user ? (
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-600"
                  />
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm opacity-75">{user.email}</p>
                  </div>
                </div>
                <div className={`h-px ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 mb-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <User size={20} />
                {currentLanguage === 'TR' ? 'Giriş Yap' : 'Login'}
              </Link>
            )}

            {/* Navigation Links */}
            <nav className="grid grid-cols-2 gap-2">
              <Link
                to="/notes"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                <FileText size={20} className="text-blue-600" />
                {currentLanguage === 'TR' ? 'Notlar' : 'Notes'}
              </Link>
              <Link
                to="/exams"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                <GraduationCap size={20} className="text-purple-600" />
                {currentLanguage === 'TR' ? 'Sınavlar' : 'Exams'}
              </Link>
              <Link
                to="/articles"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                <BookOpen size={20} className="text-green-600" />
                {currentLanguage === 'TR' ? 'Makaleler' : 'Articles'}
              </Link>
              <Link
                to="/events"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                <Calendar size={20} className="text-yellow-600" />
                {currentLanguage === 'TR' ? 'Etkinlikler' : 'Events'}
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                <Book size={20} className="text-indigo-600" />
                {currentLanguage === 'TR' ? 'Hakkında' : 'About'}
              </Link>
              {isLoggedIn && (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                      ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                  >
                    <User size={20} className="text-blue-600" />
                    {currentLanguage === 'TR' ? 'Profil' : 'Profile'}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                      ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} text-red-600`}
                  >
                    <LogOut size={20} />
                    {currentLanguage === 'TR' ? 'Çıkış' : 'Logout'}
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;