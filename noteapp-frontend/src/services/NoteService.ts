import api from './api';
import { Note } from '../types';

export const uploadNote = async (note: Omit<Note, 'id'>, file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    Object.keys(note).forEach(key => {
      formData.append(key, note[key as keyof typeof note]);
    });

    const response = await api.post('/notes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Note upload error:', error);
    throw error;
  }
};

export const getNotes = async (userId?: string) => {
  try {
    const response = await api.get('/notes', {
      params: { userId }
    });
    return response.data;
  } catch (error) {
    console.error('Get notes error:', error);
    throw error;
  }
};

export const updateNote = async (noteId: string, updates: Partial<Note>) => {
  try {
    const response = await api.put(`/notes/${noteId}`, updates);
    return response.data;
  } catch (error) {
    console.error('Update note error:', error);
    throw error;
  }
};

export const deleteNote = async (noteId: string) => {
  try {
    await api.delete(`/notes/${noteId}`);
  } catch (error) {
    console.error('Delete note error:', error);
    throw error;
  }
};