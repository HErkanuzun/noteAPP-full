export interface Note {
  id: number;
  title: string;
  subject: string;
  author: string;
  date: string;
  likes: number;
  downloads: number;
  imageUrl: string;
  content?: string;
  university: string;
  department: string;
  year: string;
  semester: string;
  isFavorite?: boolean;
  driveFileId?: string;
}

export interface Exam {
  id: number;
  title: string;
  subject: string;
  professor: string;
  term: string;
  year: string;
  likes: number;
  downloads: number;
  content?: string;
  university: string;
  department: string;
  questions?: Question[];
  isFavorite?: boolean;
  driveFileId?: string;
  imageUrl?: string;
  storage_link?: string;
  description?: string;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Article {
  id: number;
  title: string;
  author: string;
  date: string;
  likes: number;
  downloads: number;
  content: string;
  tags: string[];
  isFavorite?: boolean;
  imageUrl: string;
  university: string;
  department: string;
  abstract: string;
  driveFileId?: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  organizer: string;
  university: string;
  department?: string;
  type: 'academic' | 'social' | 'career' | 'other';
  imageUrl?: string;
  registrationUrl?: string;
  isOnline: boolean;
  isFeatured: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  bio?: string;
  university?: string;
  department?: string;
  joinDate: string;
  notes: Note[];
  exams: Exam[];
  articles?: Article[];
  favorites?: {
    notes: number[];
    exams: number[];
    articles: number[];
  };
  followers: number;
  following: number;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface AuthResponse {
  status: boolean;
  message: string;
  user?: User;
  token?: string;
}

export interface FilterOptions {
  university?: string;
  department?: string;
  year?: string;
  semester?: string;
  sortBy?: 'date' | 'likes' | 'downloads';
  sortOrder?: 'asc' | 'desc';
  type?: string;
  startDate?: string;
  endDate?: string;
}