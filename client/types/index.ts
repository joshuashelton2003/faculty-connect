// ==========================================
// FacultyConnect - Professional Faculty Jobs Portal
// Type Definitions
// ==========================================

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'candidate' | 'employer' | 'admin';
  profileImage?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Candidate extends User {
  role: 'candidate';
  profile: CandidateProfile;
}

export interface Employer extends User {
  role: 'employer';
  profile: EmployerProfile;
}

export interface CandidateProfile {
  firstName: string;
  lastName: string;
  bio: string;
  location: Location;
  qualifications: string[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
  certifications: Certification[];
  resume?: FileUpload;
  portfolio?: string;
  expectedSalary: {
    min: number;
    max: number;
    currency: string;
  };
  availability: 'immediate' | '1-month' | '2-months' | '3-months' | 'flexible';
  references: Reference[];
  languages: string[];
}

export interface EmployerProfile {
  instituteName: string;
  instituteType: InstituteType;
  contactPerson: string;
  designation: string;
  website?: string;
  description: string;
  location: Location;
  established: number;
  accreditation: string[];
  logo?: FileUpload;
  brochure?: FileUpload;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  verificationStatus: 'pending' | 'verified' | 'rejected';
  verificationDocuments: FileUpload[];
}

export interface Location {
  country: string;
  state: string;
  district: string;
  city: string;
  pincode?: string;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Job {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  department: string;
  subject: string;
  instituteId: string;
  institute: Institute;
  employerId: string;
  employer: Employer;
  location: Location;
  salary: {
    min: number;
    max: number;
    currency: string;
    negotiable: boolean;
  };
  requirements: {
    education: string[];
    experience: string;
    skills: string[];
    certifications: string[];
    languages?: string[];
  };
  responsibilities: string[];
  benefits: string[];
  employmentType: 'full-time' | 'part-time' | 'contract' | 'visiting';
  workMode: 'on-site' | 'remote' | 'hybrid';
  applicationTypes: ApplicationType[];
  deadline: string;
  positions: number;
  isActive: boolean;
  isPremium: boolean;
  isFeatured: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  applicationCount: number;
}

export interface Institute {
  id: string;
  name: string;
  type: InstituteType;
  description: string;
  location: Location;
  established: number;
  affiliation: string;
  accreditation: string[];
  website: string;
  logo?: string;
  images: string[];
  contact: {
    email: string;
    phone: string;
    fax?: string;
  };
  departments: string[];
  courses: string[];
  facilities: string[];
  rankings: Ranking[];
  socialMedia: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  isVerified: boolean;
  isFeatured: boolean;
  employerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  jobId: string;
  job: Job;
  candidateId: string;
  candidate: Candidate;
  applicationDate: string;
  status: ApplicationStatus;
  coverLetter?: string;
  resume: FileUpload;
  additionalDocuments: FileUpload[];
  answers: ApplicationAnswer[];
  employerNotes?: string;
  interviewDate?: string;
  interviewMode?: 'in-person' | 'video' | 'phone';
  interviewLink?: string;
  salaryExpectation?: {
    amount: number;
    currency: string;
  };
  availabilityDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationAnswer {
  question: string;
  answer: string;
  type: 'text' | 'multiple-choice' | 'file';
}

export interface SavedJob {
  id: string;
  candidateId: string;
  jobId: string;
  job: Job;
  savedAt: string;
  notes?: string;
}

export interface ExperienceEntry {
  id: string;
  designation: string;
  organization: string;
  organizationType: InstituteType;
  location: Location;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string;
  achievements: string[];
  skills: string[];
}

export interface EducationEntry {
  id: string;
  degree: string;
  field: string;
  institution: string;
  university: string;
  location: Location;
  startDate: string;
  endDate: string;
  grade: string;
  gradeType: 'percentage' | 'cgpa' | 'gpa' | 'class';
  achievements: string[];
  specialization?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  document?: FileUpload;
  skills: string[];
}

export interface Reference {
  id: string;
  name: string;
  designation: string;
  organization: string;
  email: string;
  phone: string;
  relationship: string;
  yearsKnown: number;
}

export interface FileUpload {
  id: string;
  originalName: string;
  fileName: string;
  size: number;
  mimeType: string;
  url: string;
  uploadedAt: string;
}

export interface Ranking {
  organization: string;
  rank: number;
  year: number;
  category: string;
  description?: string;
}

export interface JobFilters {
  keywords: string;
  location: {
    country: string;
    state: string;
    district: string;
  };
  salaryRange: {
    min: number;
    max: number;
  };
  qualifications: string[];
  experienceLevel: string;
  instituteType: InstituteType[];
  applicationTypes: ApplicationType[];
  employmentType: ('full-time' | 'part-time' | 'contract' | 'visiting')[];
  workMode: ('on-site' | 'remote' | 'hybrid')[];
  postedWithin: '24h' | '7d' | '30d' | 'all';
  sortBy: 'relevance' | 'date' | 'salary' | 'company';
}

export interface InstituteFilters {
  keywords: string;
  location: {
    country: string;
    state: string;
    district: string;
  };
  type: InstituteType[];
  establishedAfter?: number;
  accreditation: string[];
  sortBy: 'relevance' | 'name' | 'established' | 'ranking';
}

// Enums
export type InstituteType = 
  | 'engineering-college' 
  | 'arts-science-college' 
  | 'polytechnic' 
  | 'iti' 
  | 'school' 
  | 'university' 
  | 'research-institute'
  | 'training-center';

export type ApplicationType = 'online' | 'email' | 'walk-in' | 'postal';

export type ApplicationStatus = 
  | 'submitted' 
  | 'under-review' 
  | 'shortlisted' 
  | 'interview-scheduled' 
  | 'interviewed' 
  | 'selected' 
  | 'rejected' 
  | 'withdrawn';

export type ExperienceLevel = 'fresher' | '1-3' | '3-5' | '5-10' | '10+';

export type QualificationLevel = 
  | 'diploma' 
  | 'bachelor' 
  | 'master' 
  | 'doctorate' 
  | 'certification';

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  role: 'candidate' | 'employer';
  termsAccepted: boolean;
}

// Form Types
export interface JobFormData {
  title: string;
  shortDescription: string;
  description: string;
  department: string;
  subject: string;
  location: Location;
  salary: {
    min: number;
    max: number;
    currency: string;
    negotiable: boolean;
  };
  requirements: {
    education: string[];
    experience: string;
    skills: string[];
    certifications: string[];
  };
  responsibilities: string[];
  benefits: string[];
  employmentType: 'full-time' | 'part-time' | 'contract' | 'visiting';
  workMode: 'on-site' | 'remote' | 'hybrid';
  applicationTypes: ApplicationType[];
  deadline: string;
  positions: number;
  tags: string[];
}

export interface InstituteFormData {
  name: string;
  type: InstituteType;
  description: string;
  location: Location;
  established: number;
  affiliation: string;
  accreditation: string[];
  website: string;
  contact: {
    email: string;
    phone: string;
  };
  departments: string[];
  courses: string[];
  facilities: string[];
}

// Location Data
export interface Country {
  code: string;
  name: string;
}

export interface State {
  code: string;
  name: string;
  countryCode: string;
}

export interface District {
  code: string;
  name: string;
  stateCode: string;
}

// Global App State
export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  theme: 'light' | 'dark';
  language: 'en' | 'hi' | 'ta';
  jobFilters: JobFilters;
  instituteFilters: InstituteFilters;
  searchHistory: string[];
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  expiresAt?: string;
  actionUrl?: string;
}

// Dashboard Analytics
export interface CandidateAnalytics {
  profileViews: number;
  applicationsCount: number;
  shortlistedCount: number;
  interviewsCount: number;
  savedJobsCount: number;
  profileCompleteness: number;
  topSkills: string[];
  applicationStatus: {
    status: ApplicationStatus;
    count: number;
  }[];
}

export interface EmployerAnalytics {
  activeJobsCount: number;
  totalApplicationsCount: number;
  shortlistedCandidatesCount: number;
  hiredCandidatesCount: number;
  jobViewsCount: number;
  topPerformingJobs: {
    jobId: string;
    title: string;
    applications: number;
    views: number;
  }[];
  applicationTrends: {
    date: string;
    applications: number;
  }[];
}
