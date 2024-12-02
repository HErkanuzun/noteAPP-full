import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Public endpoints that don't require authentication
const publicEndpoints = [
  '/public/articles',
  '/public/notes',
  '/public/exams',
  '/public/events'
];

// Request interceptor - Add Authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  // Only add token for non-public endpoints
  if (token && !publicEndpoints.some(endpoint => config.url?.startsWith(endpoint))) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - Error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Check if the error is 401 and the endpoint is not public
    if (error.response?.status === 401 && 
        !publicEndpoints.some(endpoint => error.config.url?.startsWith(endpoint))) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
