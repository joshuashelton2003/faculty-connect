export interface Job {
  _id: string;
  title: string;
  description: string;
  subject: string;
  type: 'college' | 'school' | 'polytechnic' | 'university';
  location: {
    city: string;
    state: string;
    district: string;
  };
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  requirements: {
    education: string;
    experience: string;
    skills: string[];
  };
  institute: Institute;
  postedBy: string;
  postedDate: string;
  deadline: string;
  isActive: boolean;
  applicationsCount: number;
}

export interface Institute {
  _id: string;
  name: string;
  type: 'college' | 'school' | 'polytechnic' | 'university';
  location: {
    city: string;
    state: string;
    district: string;
    address: string;
  };
  email: string;
  phone: string;
  website?: string;
  logo?: string;
  description: string;
  established: number;
  isFeatured: boolean;
  jobsCount: number;
}

export interface User {
  _id: string;
  email: string;
  role: 'candidate' | 'employer' | 'admin';
  isVerified: boolean;
  createdAt: string;
}

export interface Candidate extends User {
  profile: {
    firstName: string;
    lastName: string;
    phone: string;
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other';
    location: {
      city: string;
      state: string;
      district: string;
    };
    education: {
      degree: string;
      specialization: string;
      university: string;
      year: number;
      percentage: number;
    }[];
    experience: {
      designation: string;
      institute: string;
      duration: string;
      description: string;
    }[];
    skills: string[];
    resume?: string;
    profileImage?: string;
    bio: string;
  };
}

export interface Employer extends User {
  profile: {
    institute: Institute;
    contactPerson: {
      name: string;
      designation: string;
      phone: string;
    };
    verificationStatus: 'pending' | 'verified' | 'rejected';
  };
}

export interface Application {
  _id: string;
  job: Job;
  candidate: Candidate;
  appliedDate: string;
  status: 'applied' | 'shortlisted' | 'interviewed' | 'selected' | 'rejected';
  resumeUrl?: string;
  coverLetter?: string;
  feedback?: string;
}

export interface SearchFilters {
  subject?: string;
  location?: string;
  type?: string;
  salaryRange?: {
    min: number;
    max: number;
  };
  experience?: string;
  sort?: 'recent' | 'salary' | 'relevance';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}
