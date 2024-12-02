import api from './api';
import { Note } from '../../types';

interface NotesResponse {
  status: boolean;
  message: string;
  data: {
    notes: Note[];
    pagination: {
      current_page: number;
      last_page: number;
      per_page: number;
      total: number;
      has_more: boolean;
    }
  };
}

interface GetNotesParams {
  page?: number;
  perPage?: number;
}

export const getAllNotes = async ({ page = 1, perPage = 9 }: GetNotesParams = {}) => {
  try {
    const response = await api.get(`/public/notes?page=${page}&per_page=${perPage}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

export const getNote = async (id: number) => {
  const response = await api.get(`/public/notes/${id}`);
  return response.data;
};

export const createNote = async (noteData: FormData) => {
  const response = await api.post('/notes', noteData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateNote = async (id: number, noteData: FormData) => {
  const response = await api.put(`/notes/${id}`, noteData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteNote = async (id: number) => {
  await api.delete(`/notes/${id}`);
};

export const filterNotes = async (filters: Record<string, any>) => {
  const response = await api.get('/notes/filter', { params: filters });
  return response.data;
};