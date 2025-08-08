import { useState, useEffect, useCallback } from 'react';
import { JobData } from '@/components/JobCard';
import { sampleJobs } from '@/data/sampleJobsData';

// Simulated API delay
const simulateApiDelay = (ms: number = 500) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Local storage key for persistence
const JOBS_STORAGE_KEY = 'facultyconnect_jobs';

export interface CreateJobData {
  title: string;
  institution: string;
  location: string;
  jobType: 'Full-Time' | 'Part-Time' | 'Contract';
  responsibilities: string[];
  requirements: string[];
  preferredSkills: string[];
  salary?: string;
  deadline: string;
}

export const useJobCRUD = () => {
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize with sample data or load from localStorage
  useEffect(() => {
    const savedJobs = localStorage.getItem(JOBS_STORAGE_KEY);
    if (savedJobs) {
      try {
        setJobs(JSON.parse(savedJobs));
      } catch (e) {
        console.error('Error parsing saved jobs:', e);
        setJobs(sampleJobs);
      }
    } else {
      setJobs(sampleJobs);
    }
  }, []);

  // Save jobs to localStorage whenever jobs change
  useEffect(() => {
    if (jobs.length > 0) {
      localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobs));
    }
  }, [jobs]);

  // Create a new job
  const createJob = useCallback(async (jobData: CreateJobData): Promise<JobData> => {
    setLoading(true);
    setError(null);
    
    try {
      await simulateApiDelay();
      
      const newJob: JobData = {
        ...jobData,
        id: Date.now().toString(),
        postedDate: 'Just now',
        applicants: 0,
        isActive: true
      };

      setJobs(prevJobs => [newJob, ...prevJobs]);
      return newJob;
    } catch (err) {
      const errorMessage = 'Failed to create job';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Read/Get all jobs with optional filtering
  const getJobs = useCallback((filters?: {
    title?: string;
    location?: string;
    institution?: string;
    jobType?: string;
    isActive?: boolean;
  }) => {
    let filteredJobs = [...jobs];

    if (filters) {
      if (filters.title) {
        filteredJobs = filteredJobs.filter(job =>
          job.title.toLowerCase().includes(filters.title!.toLowerCase())
        );
      }
      if (filters.location) {
        filteredJobs = filteredJobs.filter(job =>
          job.location.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }
      if (filters.institution) {
        filteredJobs = filteredJobs.filter(job =>
          job.institution.toLowerCase().includes(filters.institution!.toLowerCase())
        );
      }
      if (filters.jobType) {
        filteredJobs = filteredJobs.filter(job => job.jobType === filters.jobType);
      }
      if (filters.isActive !== undefined) {
        filteredJobs = filteredJobs.filter(job => job.isActive === filters.isActive);
      }
    }

    return filteredJobs.sort((a, b) => {
      // Sort by date (newest first)
      const dateA = new Date(a.postedDate === 'Just now' ? Date.now() : a.postedDate);
      const dateB = new Date(b.postedDate === 'Just now' ? Date.now() : b.postedDate);
      return dateB.getTime() - dateA.getTime();
    });
  }, [jobs]);

  // Get a single job by ID
  const getJobById = useCallback((id: string): JobData | undefined => {
    return jobs.find(job => job.id === id);
  }, [jobs]);

  // Update an existing job
  const updateJob = useCallback(async (id: string, updates: Partial<JobData>): Promise<JobData> => {
    setLoading(true);
    setError(null);

    try {
      await simulateApiDelay();

      const jobIndex = jobs.findIndex(job => job.id === id);
      if (jobIndex === -1) {
        throw new Error('Job not found');
      }

      const updatedJob = { ...jobs[jobIndex], ...updates };
      
      setJobs(prevJobs => 
        prevJobs.map(job => 
          job.id === id ? updatedJob : job
        )
      );

      return updatedJob;
    } catch (err) {
      const errorMessage = 'Failed to update job';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [jobs]);

  // Delete a job
  const deleteJob = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await simulateApiDelay();

      const jobExists = jobs.some(job => job.id === id);
      if (!jobExists) {
        throw new Error('Job not found');
      }

      setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
    } catch (err) {
      const errorMessage = 'Failed to delete job';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [jobs]);

  // Toggle job active status
  const toggleJobStatus = useCallback(async (id: string): Promise<JobData> => {
    const job = getJobById(id);
    if (!job) {
      throw new Error('Job not found');
    }

    return updateJob(id, { isActive: !job.isActive });
  }, [getJobById, updateJob]);

  // Bulk operations
  const bulkDelete = useCallback(async (ids: string[]): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await simulateApiDelay();
      setJobs(prevJobs => prevJobs.filter(job => !ids.includes(job.id)));
    } catch (err) {
      const errorMessage = 'Failed to delete jobs';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Reset to sample data
  const resetToSampleData = useCallback(() => {
    setJobs(sampleJobs);
    localStorage.removeItem(JOBS_STORAGE_KEY);
  }, []);

  // Get statistics
  const getJobStats = useCallback(() => {
    const totalJobs = jobs.length;
    const activeJobs = jobs.filter(job => job.isActive).length;
    const totalApplicants = jobs.reduce((sum, job) => sum + job.applicants, 0);
    const averageApplicants = totalJobs > 0 ? Math.round(totalApplicants / totalJobs) : 0;

    return {
      totalJobs,
      activeJobs,
      inactiveJobs: totalJobs - activeJobs,
      totalApplicants,
      averageApplicants
    };
  }, [jobs]);

  return {
    // Data
    jobs: getJobs(),
    loading,
    error,
    
    // CRUD Operations
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob,
    toggleJobStatus,
    
    // Bulk Operations
    bulkDelete,
    
    // Utilities
    resetToSampleData,
    getJobStats,
    
    // Clear error
    clearError: () => setError(null)
  };
};
