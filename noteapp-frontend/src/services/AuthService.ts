import api from './api';
import { User } from '../types';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const loginUser = async ({ email, password }: LoginData) => {
  try {
    const response = await api.post('/v1/login', { email, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    return { user, token };
  } catch (error: any) {
    console.error('Login error:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const registerUser = async (data: RegisterData) => {
  try {
    if (data.password !== data.password_confirmation) {
      throw new Error('Passwords do not match');
    }

    const response = await api.post('/v1/register', {
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation
    });
    
    return response.data;
  } catch (error: any) {
    console.error('Registration error:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await api.post('/v1/logout');
    localStorage.removeItem('token');
  } catch (error: any) {
    console.error('Logout error:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const response = await api.get('/v1/user');
    return response.data;
  } catch (error: any) {
    console.error('Get current user error:', error.response?.data?.message || error.message);
    localStorage.removeItem('token');
    return null;
  }
};