import api from '../api';
import axios from 'axios';
import { User } from '../../types';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface AuthResponse {
  status: boolean;
  message: string;
  user?: User;
  token?: string;
}

// Get CSRF cookie before making requests
const getCsrfCookie = async () => {
  try {
    await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
      withCredentials: true
    });
  } catch (error) {
    console.error('Failed to get CSRF cookie:', error);
  }
};

export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
  try {
    // Get CSRF cookie first
    await getCsrfCookie();
    
    const response = await api.post<AuthResponse>('/register', { 
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation
    });

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }

    return response.data;
  } catch (error: any) {
    console.error('Registration error:', error.response?.data);
    throw error;
  }
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    // Get CSRF cookie first
    await getCsrfCookie();
    
    const response = await api.post<AuthResponse>('/login', { email, password });

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }

    return response.data;
  } catch (error: any) {
    console.error('Login error:', error.response?.data);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await api.post('/logout');
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  } catch (error: any) {
    console.error('Logout error:', error.response?.data);
    // Even if logout fails, remove token
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    throw error;
  }
};

export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await api.get<{ data: User }>('/user');
    return response.data.data;
  } catch (error: any) {
    console.error('Get user error:', error.response?.data);
    throw error;
  }
};