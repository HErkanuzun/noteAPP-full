import api from './api';
import { API_ENDPOINTS } from '../config/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  password_confirmation: string;
}

export async function login(credentials: LoginCredentials) {
  const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
}

export async function register(credentials: RegisterCredentials) {
  const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
}

export async function logout() {
  try {
    await api.post(API_ENDPOINTS.AUTH.LOGOUT);
  } finally {
   // localStorage.removeItem('token');
  }
}

export async function getCurrentUser() {
  return await api.get(API_ENDPOINTS.AUTH.USER);
}
