import api from './api';
import { Article } from '../../types';

interface ArticlesResponse {
  status: boolean;
  message: string;
  data: {
    articles: Article[];
    pagination: {
      current_page: number;
      last_page: number;
      per_page: number;
      total: number;
      has_more: boolean;
    }
  };
}

interface GetArticlesParams {
  page?: number;
  perPage?: number;
}

export const getAllArticles = async ({ page = 1, perPage = 9 }: GetArticlesParams = {}) => {
  try {
    const response = await api.get(`/public/articles?page=${page}&per_page=${perPage}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

export const getArticle = async (id: number) => {
  const response = await api.get(`/public/articles/${id}`);
  return response.data;
};

export const createArticle = async (articleData: FormData) => {
  const response = await api.post('/articles', articleData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateArticle = async (id: number, articleData: FormData) => {
  const response = await api.put(`/articles/${id}`, articleData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteArticle = async (id: number) => {
  await api.delete(`/articles/${id}`);
};

export const filterArticles = async (filters: Record<string, any>) => {
  const queryString = new URLSearchParams(filters).toString();
  const response = await api.get(`/public/articles?${queryString}`);
  return response.data;
};
