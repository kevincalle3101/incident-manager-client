import { create } from 'zustand';
import axios from 'axios';

interface Incidence {
  id: number;
  subject: string;
  type: string;
  description: string;
  image_secure_url: string;
  location: string;
  isResolved: boolean;
  createdAt: string;
}
interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  IncidenceId: number;
  User: {
    name: string;
  }
}
interface IncidenceState {
  allIncidences: Incidence[];
  Comments: Comment[];
  fetchIncidences: () => Promise<void>;
  fetchFilteredIncidences: (filter: string) => Promise<void>;
  postCommentToIncidence: (id: number, content: string) => Promise<void>;
  fetchCommentsByIncidenceId: (id: number) => Promise<void>;
}


export const useUserIncidenceStore = create<IncidenceState>((set) => ({
  allIncidences: [],
  Comments: [],
  fetchIncidences: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found in localStorage');
      }
      const response = await axios.get<Incidence[]>('http://localhost:3001/incidence/byUser', {
        headers: {
          'x-access-token': token,
        },
      });
      set({ allIncidences: response.data });
    } catch (error) {
      console.error('Error fetching incidences:', error);
      throw error;
    }
  },
  fetchFilteredIncidences: async (filter: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found in localStorage');
      }
      const response = await axios.get<Incidence[]>(`http://localhost:3001/incidence/filters/${filter}`, {
        headers: {
          'x-access-token': token,
        },
      });
      set({ allIncidences: response.data });
    } catch (error) {
      console.error('Error fetching filtered incidences:', error);
      throw error;
    }
  },
  postCommentToIncidence: async (id: number, content: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found in localStorage');
      }
      const response = await axios.post(
        `http://localhost:3001/incidence/${id}/comments`,
        { content },
        {
          headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Response de post', response.data);
    } catch (error) {
      console.error('Error al postear un comentario', error);
      throw error;
    }
  },
  fetchCommentsByIncidenceId: async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token no encontrado en localStorage');
      }
      const response = await axios.get(`http://localhost:3001/incidence/${id}`, {
        headers: {
          'x-access-token': token,
        },
      });
      const comments = response.data.Comments.map((comment: any) => comment);
      set({
        Comments: comments });
    } catch (error) {
      console.error('Error al traer la incidencias:', error);
      throw error;
    }
  },
}));