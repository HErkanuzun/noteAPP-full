import api from './api';
import { Event } from '../../types';

interface EventsResponse {
  status: boolean;
  message: string;
  data: {
    events: Event[];
    pagination: {
      current_page: number;
      last_page: number;
      per_page: number;
      total: number;
      has_more: boolean;
    }
  };
}

interface GetEventsParams {
  page?: number;
  perPage?: number;
}

export const getAllEvents = async ({ page = 1, perPage = 9 }: GetEventsParams = {}) => {
  try {
    const response = await api.get(`/public/events?page=${page}&per_page=${perPage}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const getEvent = async (id: number) => {
  const response = await api.get(`/public/events/${id}`);
  return response.data;
};

export const createEvent = async (eventData: FormData) => {
  const response = await api.post('/events', eventData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateEvent = async (id: number, eventData: FormData) => {
  const response = await api.put(`/events/${id}`, eventData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteEvent = async (id: number) => {
  await api.delete(`/events/${id}`);
};

export const filterEvents = async (filters: Record<string, any>) => {
  const response = await api.get('/events/filter', { params: filters });
  return response.data;
};
