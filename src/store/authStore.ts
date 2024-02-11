import {create} from 'zustand';
import axios from 'axios';

interface User {
  name: string;
  email: string;
  isAdmin: boolean
}

interface AuthState {
  token: string;
  user: User;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<string>;
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token') || '',
  user: JSON.parse(localStorage.getItem('user') || '{}'),
  login: async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3001/auth/login', { email, password });
      const { token, name, email: userEmail, isAdmin } = response.data;
      const user = { name, email: userEmail, isAdmin };
      set({ token, user });
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      throw new Error('Error al iniciar sesión');
    }
  },
  register: async ( name, email, password ) => {
    try {
      const response = await axios.post('http://localhost:3001/auth/signup', { name, email, password });
      return response.data.message;
    } catch (error) {
      throw new Error('Error al registrar usuario');
    }
  },
  logout: () => {
    set({ token: '', user: {} as User });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
}));
