import { create } from 'zustand';
import { User, AuthState } from '@/types';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true });
      // Mock login for demo
      const mockUser = {
        _id: '1',
        email,
        role: email.includes('employer') ? 'employer' : 'candidate',
        isVerified: true,
        createdAt: new Date().toISOString()
      } as User;
      const mockToken = 'mock-jwt-token';

      localStorage.setItem('facultyconnect_token', mockToken);
      set({
        user: mockUser,
        token: mockToken,
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
      // Mock registration for demo
      const mockUser = {
        _id: '1',
        email: userData.email,
        role: userData.role,
        isVerified: true,
        createdAt: new Date().toISOString()
      } as User;
      const mockToken = 'mock-jwt-token';

      localStorage.setItem('facultyconnect_token', mockToken);
      set({
        user: mockUser,
        token: mockToken,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('facultyconnect_token');
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
}));
