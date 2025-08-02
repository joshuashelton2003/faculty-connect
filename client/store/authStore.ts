import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, AuthState } from '@/types';
import { api } from '@/lib/api';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true });
          const response = await api.auth.login({ email, password });
          const { user, token } = response;
          
          localStorage.setItem('facultyconnect_token', token);
          set({ 
            user, 
            token, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (userData: any) => {
        try {
          set({ isLoading: true });
          const response = await api.auth.register(userData);
          const { user, token } = response;
          
          localStorage.setItem('facultyconnect_token', token);
          set({ 
            user, 
            token, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        api.auth.logout();
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false 
        });
      },

      setUser: (user: User | null) => {
        set({ user, isAuthenticated: !!user });
      },

      setToken: (token: string | null) => {
        set({ token });
        if (token) {
          localStorage.setItem('facultyconnect_token', token);
        } else {
          localStorage.removeItem('facultyconnect_token');
        }
      },

      setLoading: (isLoading: boolean) => {
        set({ isLoading });
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
