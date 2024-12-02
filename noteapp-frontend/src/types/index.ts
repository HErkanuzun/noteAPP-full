export interface Note {
  id: number;
  title: string;
  content: string;
  university: {
    id: number;
    name: string;
  };
  department: {
    id: number;
    name: string;
  };
  year: string;
  semester: string;
  subject?: string;
  storage_link?: string;
  created_at: string;
  updated_at: string;
  // Computed properties
  likes?: number;
  downloads?: number;
  author?: string;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  university?: string;
  department?: string;
  year?: string | number;
  semester?: string;
  subject?: string;
  storage_link?: string;
  created_at: string;
  updated_at: string;
  abstract?: string;
  image_url?: string;
  likes_count?: number;
  downloads_count?: number;
  author_id?: number;
  creator?: {
    id: number;
    name: string;
  };
  status?: string;
  featured_image?: string;
  excerpt?: string;
  published_at?: string;
  slug?: string;
}

export interface FilterOptions {
  sortBy?: 'date' | 'title' | 'university';
  sortOrder?: 'asc' | 'desc';
  university?: string;
  department?: string;
  year?: string;
  semester?: string;
}

export interface Exam {
  id: number;
  name: string;
  title?: string; // For backwards compatibility
  description: string | null;
  total_marks: number;
  duration: number;
  status: 'active' | 'completed' | 'scheduled';
  university?: string;
  department?: string;
  year?: number;
  semester?: string;
  created_by: number;
  creator?: User;
  storage_link?: string;
  imageUrl?: string;
  created_at: string;
  updated_at: string;
}
