export const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    LOGOUT: '/logout',
    USER: '/user'
  },
  NOTES: {
    LIST: '/note',
    SHOW: (id: number) => `/note/show/${id}`,
    STORE: '/note/store',
    UPDATE: (id: number) => `/note/update/${id}`,
    DESTROY: (id: number) => `/note/destroy/${id}`,
    FILTER: '/notes/filter'
  },
  EXAMS: {
    LIST: '/exam',
    SHOW: (id: number) => `/exam/show/${id}`,
    STORE: '/exam/store',
    UPDATE: (id: number) => `/exam/update/${id}`,
    DESTROY: (id: number) => `/exam/destroy/${id}`,
    FILTER: '/exams/filter'
  },
  COMMENTS: {
    LIST: (type: string, id: number) => `/comments/${type}/${id}`,
    STORE: '/comments',
    DESTROY: (id: number) => `/comments/${id}`
  }
};