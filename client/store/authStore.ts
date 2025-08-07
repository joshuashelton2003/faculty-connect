import { create } from 'zustand';
import { User, AuthState } from '@/types';

interface AuthStore extends AuthState {
  login: (email: string, password: string, roleParam?: 'faculty' | 'employer') => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
}

// Initialize store with persisted data
const initializeAuth = () => {
  const token = localStorage.getItem('facultyconnect_token');
  const userJson = localStorage.getItem('facultyconnect_user');

  if (token && userJson) {
    try {
      const user = JSON.parse(userJson);
      return {
        user,
        token,
        isAuthenticated: true,
        isLoading: false
      };
    } catch (error) {
      localStorage.removeItem('facultyconnect_token');
      localStorage.removeItem('facultyconnect_user');
    }
  }

  return {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false
  };
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  ...initializeAuth(),

  login: async (email: string, password: string, roleParam?: 'faculty' | 'employer') => {
    try {
      set({ isLoading: true });

      // Determine role - prioritize URL role parameter, fallback to email pattern
      let role: 'faculty' | 'employer' = roleParam || 'faculty';
      let name = 'User';

      if (roleParam) {
        // Use the role from URL parameter
        role = roleParam;
        name = roleParam === 'employer' ? 'Institution Representative' : 'Faculty Member';
      } else if (email.includes('employer') || email.includes('institution') || email.includes('college') || email.includes('university')) {
        // Fallback to email pattern detection
        role = 'employer';
        name = 'Institution Representative';
      } else {
        name = 'Faculty Member';
      }

      // Mock login for demo
      const mockUser = {
        id: `user_${Date.now()}`,
        email,
        name,
        phone: '+91-9876543210',
        role,
        isVerified: true,
        profileCompletion: 45,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } as User;

      const mockToken = 'mock-jwt-token';

      localStorage.setItem('facultyconnect_token', mockToken);
      localStorage.setItem('facultyconnect_user', JSON.stringify(mockUser));

      set({
        user: mockUser,
        token: mockToken,
        isAuthenticated: true,
        isLoading: false
      });

      return mockUser;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (userData: any) => {
    try {
      set({ isLoading: true });

      // Calculate profile completion
      let profileCompletion = 30; // Base for basic info
      if (userData.profileImage) profileCompletion += 20;
      if (userData.bio || userData.description) profileCompletion += 15;
      if (userData.specialization || userData.instituteType) profileCompletion += 15;
      if (userData.currentInstitution || userData.instituteName) profileCompletion += 20;

      // Mock registration for demo
      const mockUser = {
        id: `user_${Date.now()}`,
        email: userData.email,
        name: `${userData.firstName} ${userData.lastName}`,
        phone: userData.phone,
        role: userData.role === 'employer' ? 'employer' : 'faculty',
        profileImage: userData.profileImage,
        isVerified: true,
        profileCompletion,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } as User;

      const mockToken = 'mock-jwt-token';

      localStorage.setItem('facultyconnect_token', mockToken);
      localStorage.setItem('facultyconnect_user', JSON.stringify(mockUser));

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
    localStorage.removeItem('facultyconnect_user');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false
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
