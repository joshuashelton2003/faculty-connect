import axios from 'axios';

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://facultyconnect-api.herokuapp.com/api' 
    : '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('facultyconnect_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('facultyconnect_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API functions
export const api = {
  // Auth APIs
  auth: {
    login: async (credentials: { email: string; password: string }) => {
      const response = await axiosInstance.post('/auth/login', credentials);
      return response.data;
    },
    register: async (userData: any) => {
      const response = await axiosInstance.post('/auth/register', userData);
      return response.data;
    },
    logout: () => {
      localStorage.removeItem('facultyconnect_token');
    },
  },

  // Jobs APIs
  jobs: {
    getAll: async (params?: {
      subject?: string;
      location?: string;
      type?: string;
      sort?: string;
      limit?: number;
      page?: number;
    }) => {
      const response = await axiosInstance.get('/jobs', { params });
      return response.data;
    },
    getById: async (id: string) => {
      const response = await axiosInstance.get(`/jobs/${id}`);
      return response.data;
    },
    create: async (jobData: any) => {
      const response = await axiosInstance.post('/jobs', jobData);
      return response.data;
    },
    update: async (id: string, jobData: any) => {
      const response = await axiosInstance.put(`/jobs/${id}`, jobData);
      return response.data;
    },
    delete: async (id: string) => {
      const response = await axiosInstance.delete(`/jobs/${id}`);
      return response.data;
    },
    getApplicants: async (jobId: string) => {
      const response = await axiosInstance.get(`/jobs/${jobId}/applicants`);
      return response.data;
    },
  },

  // Institutes APIs
  institutes: {
    getAll: async (params?: { featured?: boolean }) => {
      const response = await axiosInstance.get('/institutes', { params });
      return response.data;
    },
    getById: async (id: string) => {
      const response = await axiosInstance.get(`/institutes/${id}`);
      return response.data;
    },
  },

  // Candidate APIs
  candidate: {
    getProfile: async (id: string) => {
      const response = await axiosInstance.get(`/candidate/profile/${id}`);
      return response.data;
    },
    updateProfile: async (id: string, profileData: any) => {
      const response = await axiosInstance.put(`/candidate/profile/${id}`, profileData);
      return response.data;
    },
    apply: async (applicationData: { jobId: string; resumeUrl?: string; coverLetter?: string }) => {
      const response = await axiosInstance.post('/candidate/apply', applicationData);
      return response.data;
    },
    getApplications: async () => {
      const response = await axiosInstance.get('/candidate/applications');
      return response.data;
    },
  },

  // Employer APIs
  employer: {
    getProfile: async (id: string) => {
      const response = await axiosInstance.get(`/employer/profile/${id}`);
      return response.data;
    },
    updateProfile: async (id: string, profileData: any) => {
      const response = await axiosInstance.put(`/employer/profile/${id}`, profileData);
      return response.data;
    },
    getJobs: async () => {
      const response = await axiosInstance.get('/employer/jobs');
      return response.data;
    },
  },
};

export default axiosInstance;
