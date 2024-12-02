import api from './axios';

interface Comment {
  id: number;
  content: string;
  user_id: number;
  commentable_type: string;
  commentable_id: number;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
    avatar: string;
  };
}

interface CommentsResponse {
  status: boolean;
  message: string;
  data: {
    comments: Comment[];
  };
}

interface CommentResponse {
  status: boolean;
  message: string;
  data: {
    comment: Comment;
  };
}

export const getComments = async (type: string, id: number): Promise<Comment[]> => {
  const response = await api.get<CommentsResponse>(`/comments/${type}/${id}`);
  return response.data.comments;
};

export const addComment = async (data: {
  content: string;
  commentable_type: string;
  commentable_id: number;
}): Promise<Comment> => {
  const response = await api.post<CommentResponse>('/comments', data);
  return response.data.comment;
};

export const deleteComment = async (id: number): Promise<void> => {
  await api.delete(`/comments/${id}`);
};