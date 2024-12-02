import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { toast } from 'react-toastify';

interface LoginPageProps {
  isDark: boolean;
}

function LoginPage({ isDark }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { currentLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await login(email, password);
      if (response.status && response.token) {
        toast.success(currentLanguage === 'TR' ? 'Giriş başarılı!' : 'Login successful!');
        navigate('/');
      } else {
        const errorMessage = response.message || (currentLanguage === 'TR' ? 'Giriş başarısız!' : 'Login failed!');
        toast.error(errorMessage);
        setError(errorMessage);
      }
    } catch (err: any) {
      console.error('Login error:', err.response?.data);
      
      if (err.response?.status === 403) {
        const errorMessage = currentLanguage === 'TR' 
          ? 'Lütfen önce e-posta adresinizi doğrulayın.'
          : 'Please verify your email first.';
        toast.warn(errorMessage);
        setError(errorMessage);
      } else if (err.response?.status === 401) {
        const errorMessage = currentLanguage === 'TR'
          ? 'E-posta veya şifre hatalı.'
          : 'Invalid email or password.';
        toast.error(errorMessage);
        setError(errorMessage);
      } else if (err.response?.status === 422) {
        const errorMessage = currentLanguage === 'TR'
          ? 'Doğrulama hatası.'
          : 'Validation error.';
        toast.error(errorMessage);
        setError(errorMessage);
      } else {
        const errorMessage = currentLanguage === 'TR'
          ? 'Bilinmeyen bir hata oluştu.'
          : 'An unknown error occurred.';
        toast.error(errorMessage);
        setError(errorMessage);
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
            <h2 className="text-2xl font-bold mb-8 text-center">
              {currentLanguage === 'TR' ? 'Giriş Yap' : 'Login'}
            </h2>

            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-100 border border-red-200 text-red-700 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {currentLanguage === 'TR' ? 'E-posta' : 'Email'}
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full pl-11 pr-4 py-2.5 rounded-lg border ${
                        isDark 
                          ? 'bg-gray-700/50 border-gray-600 text-white' 
                          : 'bg-white border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder={currentLanguage === 'TR' ? 'E-posta adresiniz' : 'Your email'}
                      required
                    />
                    <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {currentLanguage === 'TR' ? 'Şifre' : 'Password'}
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full pl-11 pr-4 py-2.5 rounded-lg border ${
                        isDark 
                          ? 'bg-gray-700/50 border-gray-600 text-white' 
                          : 'bg-white border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder={currentLanguage === 'TR' ? 'Şifreniz' : 'Your password'}
                      required
                    />
                    <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium
                    hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {currentLanguage === 'TR' ? 'Giriş Yapılıyor...' : 'Logging in...'}
                    </>
                  ) : (
                    currentLanguage === 'TR' ? 'Giriş Yap' : 'Login'
                  )}
                </button>

                <div className="text-center text-sm">
                  <Link 
                    to="/register" 
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {currentLanguage === 'TR' 
                      ? 'Hesabınız yok mu? Kayıt olun' 
                      : "Don't have an account? Register"}
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;