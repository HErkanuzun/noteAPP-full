import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Loader2, AlertCircle, ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface RegisterPageProps {
  isDark: boolean;
}

function RegisterPage({ isDark }: RegisterPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register } = useAuth();
  const { currentLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (password.length < 6) {
      setError(currentLanguage === 'TR' ? 'Şifre en az 6 karakter olmalıdır' : 'Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    if (password !== passwordConfirmation) {
      setError(currentLanguage === 'TR' ? 'Şifreler eşleşmiyor' : 'Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await register({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation
      });
      setSuccess(currentLanguage === 'TR' ? 'Kayıt oldunuz! Lütfen e-posta adresinizi kontrol edin.' : 'You have registered successfully! Please check your email.');
      // 3 saniye sonra login sayfasına yönlendir
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err: any) {
      console.error('Registration error:', err.response?.data);
      if (err.response?.status === 400) {
        const errorMessage = err.response.data.message;
        if (errorMessage.includes('Email already exists')) {
          setError(currentLanguage === 'TR' ? 'Bu e-posta adresi zaten kayıtlı.' : 'Email already exists.');
        } else if (errorMessage.includes('Password does not meet criteria')) {
          setError(currentLanguage === 'TR' ? 'Şifre belirtilen kriterlere uymuyor.' : 'Password does not meet criteria.');
        } else {
          setError(errorMessage);
        }
      } else if (err.response?.status === 422) {
        setError(currentLanguage === 'TR' ? 'Doğrulama hatası.' : 'Validation error.');
      } else {
        setError(currentLanguage === 'TR' ? 'Bilinmeyen bir hata oluştu.' : 'An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 mb-8 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft size={20} />
          {currentLanguage === 'TR' ? 'Ana Sayfaya Dön' : 'Back to Home'}
        </button>

        <div className={`relative overflow-hidden rounded-xl shadow-2xl ${
          isDark ? 'bg-gray-800/50' : 'bg-white/50'
        } backdrop-blur-xl border border-opacity-20 ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600" />

          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">
                {currentLanguage === 'TR' ? 'Hesap Oluştur' : 'Create Account'}
              </h2>
              <p className="text-lg opacity-75">
                {currentLanguage === 'TR' 
                  ? 'Yeni bir hesap oluşturun'
                  : 'Create a new account'}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-100/10 border border-red-600/20 flex items-center gap-2 text-red-600">
                <AlertCircle size={20} />
                <p>{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 rounded-lg bg-green-100/10 border border-green-600/20 flex items-center gap-2 text-green-600">
                <CheckCircle size={20} />
                <p>{success}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-lg font-medium mb-2">
                  {currentLanguage === 'TR' ? 'Ad Soyad' : 'Full Name'}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg outline-none transition-all
                      ${isDark 
                        ? 'bg-gray-900/50 focus:bg-gray-900' 
                        : 'bg-white focus:bg-gray-50'
                      } border ${isDark ? 'border-gray-700' : 'border-gray-200'}
                      focus:ring-2 focus:ring-blue-500`}
                    placeholder={currentLanguage === 'TR' ? 'Adınız Soyadınız' : 'Your Full Name'}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium mb-2">
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
                        ? 'bg-gray-900/50 focus:bg-gray-900' 
                        : 'bg-white focus:bg-gray-50'
                      } border ${isDark ? 'border-gray-700' : 'border-gray-200'}
                      focus:ring-2 focus:ring-blue-500`}
                    placeholder={currentLanguage === 'TR' ? 'ornek@email.com' : 'example@email.com'}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium mb-2">
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
                        ? 'bg-gray-900/50 focus:bg-gray-900' 
                        : 'bg-white focus:bg-gray-50'
                      } border ${isDark ? 'border-gray-700' : 'border-gray-200'}
                      focus:ring-2 focus:ring-blue-500`}
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium mb-2">
                  {currentLanguage === 'TR' ? 'Şifre Tekrar' : 'Confirm Password'}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg outline-none transition-all
                      ${isDark 
                        ? 'bg-gray-900/50 focus:bg-gray-900' 
                        : 'bg-white focus:bg-gray-50'
                      } border ${isDark ? 'border-gray-700' : 'border-gray-200'}
                      focus:ring-2 focus:ring-blue-500`}
                    placeholder={currentLanguage === 'TR' ? 'Şifrenizi tekrar girin' : 'Confirm your password'}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                  transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center gap-2 text-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={24} className="animate-spin" />
                    {currentLanguage === 'TR' ? 'Kaydediliyor...' : 'Registering...'}
                  </>
                ) : (
                  currentLanguage === 'TR' ? 'Kayıt Ol' : 'Register'
                )}
              </button>

              <div className="text-center">
                <Link 
                  to="/login"
                  className="text-blue-600 hover:underline"
                >
                  {currentLanguage === 'TR' 
                    ? 'Zaten hesabınız var mı? Giriş yapın' 
                    : 'Already have an account? Sign in'}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;