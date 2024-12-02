import api from './api';
import { Exam } from '../../types';

interface ExamsResponse {
  status: string;
  data: {
    exams: Exam[];
    pagination: {
      current_page: number;
      last_page: number;
      per_page: number;
      total: number;
      has_more: boolean;
    }
  };
}

interface GetExamsParams {
  page?: number;
  perPage?: number;
  status?: string;
  university?: string;
  department?: string;
  year?: number;
  semester?: string;
}

export const getAllExams = async ({ 
  page = 1, 
  perPage = 9,
  status,
  university,
  department,
  year,
  semester
}: GetExamsParams = {}) => {
  try {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('per_page', perPage.toString());
    
    if (status) params.append('status', status);
    if (university) params.append('university', university);
    if (department) params.append('department', department);
    if (year) params.append('year', year.toString());
    if (semester) params.append('semester', semester);

    const response = await api.get(`/public/exams?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching exams:', error);
    throw error;
  }
};

export const getExam = async (id: number) => {
  const response = await api.get(`/public/exams/${id}`);
  return response.data;
};

export const createExam = async (examData: FormData) => {
  const response = await api.post('/exams', examData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateExam = async (id: number, examData: FormData) => {
  const response = await api.put(`/exams/${id}`, examData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteExam = async (id: number) => {
  const response = await api.delete(`/exams/${id}`);
  return response.data;
};