import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { User, AuthState, AuthResponse } from '../types';
import * as AuthService from '../services/api/AuthService';
import { toast } from 'react-toastify';
import { useLanguage } from './LanguageContext';
import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create();

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  register: (data: { email: string; password: string; password_confirmation: string; name: string }) => Promise<void>;
  updateUserProfile: (data: Partial<User>) => Promise<void>;
  isOnline: boolean;
  retryConnection: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const OFFLINE_CACHE_KEY = 'auth_user_cache';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isLoggedIn: false,
    user: null,
    loading: true,
    error: null
  });
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { currentLanguage } = useLanguage();

  // Cache user data for offline access
  const cacheUserData = useCallback((userData: User | null) => {
    if (userData) {
      localStorage.setItem(OFFLINE_CACHE_KEY, JSON.stringify(userData));
    } else {
      localStorage.removeItem(OFFLINE_CACHE_KEY);
    }
  }, []);

  // Get cached user data
  const getCachedUserData = useCallback((): User | null => {
    const cached = localStorage.getItem(OFFLINE_CACHE_KEY);
    return cached ? JSON.parse(cached) : null;
  }, []);

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      initializeAuth();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      const cachedUser = getCachedUserData();
      if (cachedUser) {
        setState(prev => ({
          ...prev,
          user: cachedUser,
          isLoggedIn: true,
          loading: false
        }));
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [getCachedUserData]);

  const retryConnection = useCallback(() => {
    if (isOnline) {
      initializeAuth();
    }
  }, [isOnline]);

  const initializeAuth = useCallback(async () => {
    if (!isOnline) {
      const cachedUser = getCachedUserData();
      setState({
        isLoggedIn: !!cachedUser,
        user: cachedUser,
        loading: false,
        error: null
      });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setState({
          isLoggedIn: false,
          user: null,
          loading: false,
          error: null
        });
        return;
      }

      // Token'ı API isteklerinin header'ına ekle
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const user = await AuthService.getCurrentUser();
      if (user) {
        cacheUserData(user);
        setState({
          isLoggedIn: true,
          user,
          loading: false,
          error: null
        });
      } else {
      localStorage.removeItem('token');
        setState({
          isLoggedIn: false,
          user: null,
          loading: false,
          error: null
        });
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      localStorage.removeItem('token');
      const cachedUser = getCachedUserData();
      setState({
        isLoggedIn: !!cachedUser,
        user: cachedUser,
        loading: false,
        error: 'Failed to initialize authentication'
      });
    }
  }, [isOnline, cacheUserData, getCachedUserData]);

  // Verify token on app initialization
  const verifyToken = useCallback(async () => {
    try {
      const response = await api.get('/api/v1/verify-token');
      if (response.data.status) {
        const userData = await AuthService.getCurrentUser();
        setState({
          isLoggedIn: true,
          user: userData,
          loading: false,
          error: null
        });
      } else {
        setState((prevState) => ({ ...prevState, loading: false }));
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  }, []);

  // Verify token when the app loads
  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = useCallback(async (email: string, password: string): Promise<AuthResponse> => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await AuthService.login(email, password);
      if (response.status && response.token) {
        // Store token in localStorage
        localStorage.setItem('token', response.token);
        // Set token in axios headers
        api.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
        
        setState({
          isLoggedIn: true,
          user: response.user,
          loading: false,
          error: null
        });
        cacheUserData(response.user);
        toast.success(response.message || (currentLanguage === 'TR' ? 'Giriş başarılı!' : 'Login successful!'));
        return response;
      } else {
        throw new Error(response.message || (currentLanguage === 'TR' ? 'Giriş başarısız!' : 'Login failed!'));
      }
    } catch (error: any) {
      const errorMessage = error.message || (currentLanguage === 'TR' ? 'Giriş başarısız!' : 'Login failed!');
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));
      toast.error(errorMessage);
      throw error;
    }
  }, [currentLanguage, cacheUserData]);

  const register = useCallback(async (data: { email: string; password: string; password_confirmation: string; name: string }) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await AuthService.registerUser(data);
      
      if (response.user && response.token) {
        setState({
          isLoggedIn: true,
          user: response.user,
          loading: false,
          error: null
        });
        cacheUserData(response.user);
        localStorage.setItem('token', response.token);
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Registration failed'
      }));
      throw error;
    }
  }, [cacheUserData]);

  const logout = useCallback(async () => {
    try {
      await AuthService.logout();
      // Clear token and auth header
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      // Clear user data
      setState({
        isLoggedIn: false,
        user: null,
        loading: false,
        error: null
      });
      cacheUserData(null);
      toast.success(currentLanguage === 'TR' ? 'Çıkış yapıldı!' : 'Logged out successfully!');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails on server, clear local state
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      setState({
        isLoggedIn: false,
        user: null,
        loading: false,
        error: null
      });
      cacheUserData(null);
    }
  }, [currentLanguage, cacheUserData]);

  const updateUserProfile = useCallback(async (data: Partial<User>) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await AuthService.updateUserProfile(data);
      const updatedUser = response.data.user;
      setState(prev => ({
        ...prev,
        user: updatedUser,
        loading: false
      }));
      cacheUserData(updatedUser);
      toast.success(currentLanguage === 'TR' ? 'Profil güncellendi!' : 'Profile updated successfully!');
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
      toast.error(currentLanguage === 'TR' ? 'Profil güncellenemedi!' : 'Profile update failed!');
      throw error;
    }
  }, [currentLanguage, cacheUserData]);

  return (
    <AuthContext.Provider 
      value={{ 
        ...state, 
        login, 
        logout, 
        register, 
        updateUserProfile, 
        isOnline,
        retryConnection 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}