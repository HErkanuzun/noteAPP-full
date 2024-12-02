import React, { useState, useEffect } from 'react';
import { User, X, Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

interface LoginModalProps {
  isDark: boolean;
}

function LoginModal({ isDark }: LoginModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('herkanuzun@gmail.com');
  const [password, setPassword] = useState('qwer1234');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const { login } = useAuth();
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => setIsVisible(true), 50);
    } else {
      document.body.style.overflow = 'unset';
      setIsVisible(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      handleClose();
    } catch (err) {
      setError(currentLanguage === 'TR'
        ? 'Geçersiz e-posta veya şifre'
        : 'Invalid email or password'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsOpen(false);
      setEmail('');
      setPassword('');
      setError('');
    }, 300);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
      >
        <User size={18} />
        {currentLanguage === 'TR' ? 'Giriş Yap' : 'Login'}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100]">
          {/* Backdrop with blur */}
          <div 
            className={`fixed inset-0 transition-all duration-300 ${
              isVisible 
                ? 'backdrop-blur-md bg-black/50' 
                : 'backdrop-blur-none bg-black/0'
            }`}
            onClick={handleClose}
          />
          
          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div 
                className={`relative w-full max-w-md transform transition-all duration-300 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4'
                }`}
              >
                {/* Modal Content */}
                <div className={`relative overflow-hidden rounded-xl shadow-2xl ${
                  isDark ? 'bg-gray-900' : 'bg-white'
                }`}>
                  {/* Decorative top bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600" />

                  <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>

                  <div className="p-8">
                    <div className="text-center mb-8">
                      <div className="inline-block p-3 rounded-full bg-blue-600/10 text-blue-600 mb-4">
                        <User size={24} />
                      </div>
                      <h2 className="text-2xl font-bold mb-2">
                        {currentLanguage === 'TR' ? 'Hoş Geldiniz' : 'Welcome Back'}
                      </h2>
                      <p className="text-sm opacity-75">
                        {currentLanguage === 'TR' 
                          ? 'Hesabınıza giriş yapın'
                          : 'Sign in to your account'}
                      </p>
                    </div>

                    {error && (
                      <div className="mb-6 p-4 rounded-lg bg-red-100/10 border border-red-600/20 flex items-center gap-2 text-red-600">
                        <AlertCircle size={20} />
                        <p className="text-sm">{error}</p>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {currentLanguage === 'TR' ? 'E-posta' : 'Email'}
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full pl-10 pr-4 py-3 rounded-lg outline-none transition-all
                              ${isDark 
                                ? 'bg-gray-800 focus:bg-gray-700' 
                                : 'bg-gray-50 focus:bg-white'
                              } border ${isDark ? 'border-gray-700' : 'border-gray-200'}
                              focus:ring-2 focus:ring-blue-500`}
                            placeholder={currentLanguage === 'TR' ? 'ornek@email.com' : 'example@email.com'}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {currentLanguage === 'TR' ? 'Şifre' : 'Password'}
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full pl-10 pr-4 py-3 rounded-lg outline-none transition-all
                              ${isDark 
                                ? 'bg-gray-800 focus:bg-gray-700' 
                                : 'bg-gray-50 focus:bg-white'
                              } border ${isDark ? 'border-gray-700' : 'border-gray-200'}
                              focus:ring-2 focus:ring-blue-500`}
                            placeholder="••••••••"
                            required
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                          transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                          flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 size={20} className="animate-spin" />
                            {currentLanguage === 'TR' ? 'Giriş yapılıyor...' : 'Signing in...'}
                          </>
                        ) : (
                          currentLanguage === 'TR' ? 'Giriş Yap' : 'Sign In'
                        )}
                      </button>

                      <div className="text-center">
                        <button 
                          type="button"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          {currentLanguage === 'TR' 
                            ? 'Şifrenizi mi unuttunuz?' 
                            : 'Forgot your password?'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginModal;