// ==========================================
// FacultyConnect - Comprehensive Global State Management
// ==========================================

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { 
  User, 
  Job, 
  Institute, 
  Application, 
  SavedJob,
  JobFilters,
  InstituteFilters,
  Notification,
  CandidateProfile,
  EmployerProfile
} from '@/types/index';

// ==========================================
// Auth Store
// ==========================================
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  updateProfile: (profileData: any) => Promise<void>;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      token: null,

      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true });
          
          // Simulate API call - replace with actual API
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Determine role based on email or use demo accounts
          let role: 'candidate' | 'employer' = 'candidate';
          let name = 'Demo User';
          
          if (email.includes('employer') || email === 'employer@demo.com') {
            role = 'employer';
            name = 'Anna University HR';
          } else if (email === 'candidate@demo.com') {
            role = 'candidate';
            name = 'Mani Geetha';
          }
          
          const mockUser: User = {
            id: role === 'employer' ? 'emp_001' : 'cand_001',
            email,
            name,
            phone: '+91 9876543210',
            role,
            profileImage: '',
            isVerified: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          const token = 'jwt_token_' + Date.now();
          
          set({ 
            user: mockUser, 
            isAuthenticated: true, 
            token,
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
          
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          const mockUser: User = {
            id: userData.role === 'employer' ? 'emp_' + Date.now() : 'cand_' + Date.now(),
            email: userData.email,
            name: userData.name,
            phone: userData.phone,
            role: userData.role,
            profileImage: '',
            isVerified: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          const token = 'jwt_token_' + Date.now();
          
          set({ 
            user: mockUser, 
            isAuthenticated: true, 
            token,
            isLoading: false 
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false, 
          token: null,
          isLoading: false 
        });
        localStorage.removeItem('facultyconnect-auth');
      },

      updateProfile: async (profileData: any) => {
        try {
          set({ isLoading: true });
          
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const currentUser = get().user;
          if (currentUser) {
            const updatedUser = {
              ...currentUser,
              ...profileData,
              updatedAt: new Date().toISOString(),
            };
            set({ user: updatedUser, isLoading: false });
          }
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      setUser: (user: User) => set({ user, isAuthenticated: !!user }),
      setLoading: (isLoading: boolean) => set({ isLoading }),
    }),
    {
      name: 'facultyconnect-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated,
        token: state.token 
      }),
    }
  )
);

// ==========================================
// Jobs Store
// ==========================================
interface JobsState {
  jobs: Job[];
  filteredJobs: Job[];
  currentJob: Job | null;
  filters: JobFilters;
  isLoading: boolean;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  fetchJobs: () => Promise<void>;
  fetchJobById: (id: string) => Promise<void>;
  createJob: (jobData: any) => Promise<void>;
  updateJob: (id: string, jobData: any) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
  setFilters: (filters: Partial<JobFilters>) => void;
  applyFilters: () => void;
  resetFilters: () => void;
  setLoading: (loading: boolean) => void;
}

const defaultJobFilters: JobFilters = {
  keywords: '',
  location: { country: '', state: '', district: '' },
  salaryRange: { min: 5000, max: 100000 },
  qualifications: [],
  experienceLevel: '',
  instituteType: [],
  applicationTypes: [],
  employmentType: [],
  workMode: [],
  postedWithin: 'all',
  sortBy: 'relevance',
};

export const useJobsStore = create<JobsState>((set, get) => ({
  jobs: [],
  filteredJobs: [],
  currentJob: null,
  filters: defaultJobFilters,
  isLoading: false,
  pagination: { page: 1, limit: 20, total: 0 },

  fetchJobs: async () => {
    try {
      set({ isLoading: true });
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Load sample jobs
      const { allSampleJobs } = await import('@/data/sampleJobs');
      
      set({ 
        jobs: allSampleJobs, 
        filteredJobs: allSampleJobs,
        pagination: { ...get().pagination, total: allSampleJobs.length },
        isLoading: false 
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  fetchJobById: async (id: string) => {
    try {
      set({ isLoading: true });
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const jobs = get().jobs;
      const job = jobs.find(j => j.id === id) || null;
      
      set({ currentJob: job, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  createJob: async (jobData: any) => {
    try {
      set({ isLoading: true });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newJob: Job = {
        ...jobData,
        id: 'job_' + Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        viewCount: 0,
        applicationCount: 0,
        isActive: true,
      };
      
      set({ 
        jobs: [newJob, ...get().jobs],
        filteredJobs: [newJob, ...get().filteredJobs],
        isLoading: false 
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  updateJob: async (id: string, jobData: any) => {
    try {
      set({ isLoading: true });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const jobs = get().jobs.map(job => 
        job.id === id 
          ? { ...job, ...jobData, updatedAt: new Date().toISOString() }
          : job
      );
      
      set({ jobs, filteredJobs: jobs, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  deleteJob: async (id: string) => {
    try {
      set({ isLoading: true });
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const jobs = get().jobs.filter(job => job.id !== id);
      
      set({ jobs, filteredJobs: jobs, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  setFilters: (newFilters: Partial<JobFilters>) => {
    const currentFilters = get().filters;
    const updatedFilters = { ...currentFilters, ...newFilters };
    set({ filters: updatedFilters });
    get().applyFilters();
  },

  applyFilters: () => {
    const { jobs, filters } = get();
    
    let filtered = [...jobs];

    // Apply filters logic here
    if (filters.keywords) {
      const keywords = filters.keywords.toLowerCase();
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(keywords) ||
        job.description.toLowerCase().includes(keywords) ||
        job.institute.name.toLowerCase().includes(keywords)
      );
    }

    if (filters.location.state) {
      filtered = filtered.filter(job => 
        job.location.state.toLowerCase() === filters.location.state.toLowerCase()
      );
    }

    if (filters.salaryRange) {
      filtered = filtered.filter(job => 
        job.salary.max >= filters.salaryRange.min && 
        job.salary.min <= filters.salaryRange.max
      );
    }

    set({ filteredJobs: filtered });
  },

  resetFilters: () => {
    set({ filters: defaultJobFilters });
    get().applyFilters();
  },

  setLoading: (isLoading: boolean) => set({ isLoading }),
}));

// ==========================================
// Institutes Store
// ==========================================
interface InstitutesState {
  institutes: Institute[];
  filteredInstitutes: Institute[];
  currentInstitute: Institute | null;
  filters: InstituteFilters;
  isLoading: boolean;
  fetchInstitutes: () => Promise<void>;
  fetchInstituteById: (id: string) => Promise<void>;
  createInstitute: (instituteData: any) => Promise<void>;
  updateInstitute: (id: string, instituteData: any) => Promise<void>;
  deleteInstitute: (id: string) => Promise<void>;
  setFilters: (filters: Partial<InstituteFilters>) => void;
  applyFilters: () => void;
  resetFilters: () => void;
}

const defaultInstituteFilters: InstituteFilters = {
  keywords: '',
  location: { country: '', state: '', district: '' },
  type: [],
  accreditation: [],
  sortBy: 'relevance',
};

export const useInstitutesStore = create<InstitutesState>((set, get) => ({
  institutes: [],
  filteredInstitutes: [],
  currentInstitute: null,
  filters: defaultInstituteFilters,
  isLoading: false,

  fetchInstitutes: async () => {
    try {
      set({ isLoading: true });
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const { allInstitutesData } = await import('@/data/enhancedInstitutesData');

      set({
        institutes: allInstitutesData,
        filteredInstitutes: allInstitutesData,
        isLoading: false
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  fetchInstituteById: async (id: string) => {
    try {
      set({ isLoading: true });
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const institutes = get().institutes;
      const institute = institutes.find(i => i.id === id) || null;
      
      set({ currentInstitute: institute, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  createInstitute: async (instituteData: any) => {
    try {
      set({ isLoading: true });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newInstitute: Institute = {
        ...instituteData,
        id: 'inst_' + Date.now(),
        isVerified: false,
        isFeatured: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      set({ 
        institutes: [newInstitute, ...get().institutes],
        filteredInstitutes: [newInstitute, ...get().filteredInstitutes],
        isLoading: false 
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  updateInstitute: async (id: string, instituteData: any) => {
    try {
      set({ isLoading: true });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const institutes = get().institutes.map(institute => 
        institute.id === id 
          ? { ...institute, ...instituteData, updatedAt: new Date().toISOString() }
          : institute
      );
      
      set({ institutes, filteredInstitutes: institutes, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  deleteInstitute: async (id: string) => {
    try {
      set({ isLoading: true });
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const institutes = get().institutes.filter(institute => institute.id !== id);
      
      set({ institutes, filteredInstitutes: institutes, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  setFilters: (newFilters: Partial<InstituteFilters>) => {
    const currentFilters = get().filters;
    const updatedFilters = { ...currentFilters, ...newFilters };
    set({ filters: updatedFilters });
    get().applyFilters();
  },

  applyFilters: () => {
    const { institutes, filters } = get();
    
    let filtered = [...institutes];

    if (filters.keywords) {
      const keywords = filters.keywords.toLowerCase();
      filtered = filtered.filter(institute => 
        institute.name.toLowerCase().includes(keywords) ||
        institute.description.toLowerCase().includes(keywords)
      );
    }

    if (filters.type.length > 0) {
      filtered = filtered.filter(institute => 
        filters.type.includes(institute.type)
      );
    }

    set({ filteredInstitutes: filtered });
  },

  resetFilters: () => {
    set({ filters: defaultInstituteFilters });
    get().applyFilters();
  },
}));

// ==========================================
// Applications Store
// ==========================================
interface ApplicationsState {
  applications: Application[];
  savedJobs: SavedJob[];
  isLoading: boolean;
  fetchApplications: () => Promise<void>;
  fetchSavedJobs: () => Promise<void>;
  applyToJob: (jobId: string, applicationData: any) => Promise<void>;
  saveJob: (jobId: string) => Promise<void>;
  unsaveJob: (jobId: string) => Promise<void>;
  withdrawApplication: (applicationId: string) => Promise<void>;
  updateApplicationStatus: (applicationId: string, status: any) => Promise<void>;
}

export const useApplicationsStore = create<ApplicationsState>((set, get) => ({
  applications: [],
  savedJobs: [],
  isLoading: false,

  fetchApplications: async () => {
    try {
      set({ isLoading: true });
      
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const { allSampleApplications } = await import('@/data/sampleApplications');
      set({ applications: allSampleApplications, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  fetchSavedJobs: async () => {
    try {
      set({ isLoading: true });
      
      await new Promise(resolve => setTimeout(resolve, 400));
      
      set({ savedJobs: [], isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  applyToJob: async (jobId: string, applicationData: any) => {
    try {
      set({ isLoading: true });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newApplication: Application = {
        id: 'app_' + Date.now(),
        jobId,
        candidateId: 'current_user',
        applicationDate: new Date().toISOString(),
        status: 'submitted',
        ...applicationData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Application;
      
      set({ 
        applications: [newApplication, ...get().applications],
        isLoading: false 
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  saveJob: async (jobId: string) => {
    try {
      const newSavedJob: SavedJob = {
        id: 'saved_' + Date.now(),
        candidateId: 'current_user',
        jobId,
        savedAt: new Date().toISOString(),
      } as SavedJob;
      
      set({ savedJobs: [newSavedJob, ...get().savedJobs] });
    } catch (error) {
      throw error;
    }
  },

  unsaveJob: async (jobId: string) => {
    try {
      const savedJobs = get().savedJobs.filter(saved => saved.jobId !== jobId);
      set({ savedJobs });
    } catch (error) {
      throw error;
    }
  },

  withdrawApplication: async (applicationId: string) => {
    try {
      set({ isLoading: true });
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const applications = get().applications.map(app => 
        app.id === applicationId 
          ? { ...app, status: 'withdrawn' as any, updatedAt: new Date().toISOString() }
          : app
      );
      
      set({ applications, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  updateApplicationStatus: async (applicationId: string, status: any) => {
    try {
      set({ isLoading: true });
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const applications = get().applications.map(app => 
        app.id === applicationId 
          ? { ...app, status, updatedAt: new Date().toISOString() }
          : app
      );
      
      set({ applications, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));

// ==========================================
// UI Store
// ==========================================
interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  notifications: Notification[];
  toggleTheme: () => void;
  toggleSidebar: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  removeNotification: (id: string) => void;
  markNotificationRead: (id: string) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      sidebarOpen: false,
      notifications: [],

      toggleTheme: () => {
        const newTheme = get().theme === 'light' ? 'dark' : 'light';
        set({ theme: newTheme });
      },

      toggleSidebar: () => {
        set({ sidebarOpen: !get().sidebarOpen });
      },

      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: 'notif_' + Date.now(),
          isRead: false,
          createdAt: new Date().toISOString(),
        };
        
        set({ 
          notifications: [newNotification, ...get().notifications.slice(0, 9)]
        });
      },

      removeNotification: (id: string) => {
        set({ 
          notifications: get().notifications.filter(notif => notif.id !== id)
        });
      },

      markNotificationRead: (id: string) => {
        set({
          notifications: get().notifications.map(notif => 
            notif.id === id ? { ...notif, isRead: true } : notif
          )
        });
      },
    }),
    {
      name: 'facultyconnect-ui',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);
