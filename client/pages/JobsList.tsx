import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useJobsStore } from '@/store/appStore';
import { allJobs } from '@/data/comprehensiveSampleData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import FiltersSidebar from '@/components/FiltersSidebar';
import { motion, AnimatePresence } from 'framer-motion';
import Pagination from '@/components/ui/pagination';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  ArrowLeft,
  MapPin,
  Calendar,
  DollarSign,
  Building,
  Users,
  Eye,
  Bookmark,
  ExternalLink,
  Clock,
  GraduationCap,
  Briefcase
} from 'lucide-react';

const JobsList: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { filters, setFilters, resetFilters, applyFilters } = useJobsStore();
  
  const [searchTitle, setSearchTitle] = useState(searchParams.get('title') || '');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('recent');
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [applicationData, setApplicationData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    resume: null as File | null,
    coverLetter: ''
  });
  const { toast } = useToast();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [paginatedJobs, setPaginatedJobs] = useState<any[]>([]);

  // Use comprehensive jobs data
  const [jobs] = useState(allJobs);
  const [filteredJobs, setFilteredJobs] = useState(allJobs);

  // Apply filters and search
  useEffect(() => {
    let filtered = [...jobs];

    // Search filter
    if (searchTitle) {
      const searchLower = searchTitle.toLowerCase();
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower) ||
        job.institute.name.toLowerCase().includes(searchLower) ||
        job.subject.toLowerCase().includes(searchLower) ||
        job.department.toLowerCase().includes(searchLower)
      );
    }

    // Location filter
    if (filters.location.state) {
      filtered = filtered.filter(job =>
        job.location.state.toLowerCase() === filters.location.state.toLowerCase()
      );
    }
    if (filters.location.district) {
      filtered = filtered.filter(job =>
        job.location.district.toLowerCase() === filters.location.district.toLowerCase()
      );
    }

    // Salary range filter
    if (filters.salaryRange) {
      filtered = filtered.filter(job =>
        job.salary.max >= filters.salaryRange.min &&
        job.salary.min <= filters.salaryRange.max
      );
    }

    // Qualifications filter
    if (filters.qualifications.length > 0) {
      filtered = filtered.filter(job => {
        const jobEducation = job.requirements.education.join(' ').toLowerCase();
        return filters.qualifications.some(qual => 
          jobEducation.includes(qual.toLowerCase())
        );
      });
    }

    // Institute type filter
    if (filters.instituteType.length > 0) {
      filtered = filtered.filter(job =>
        filters.instituteType.includes(job.institute.type)
      );
    }

    // Experience level filter
    if (filters.experienceLevel) {
      const expLower = job => job.requirements.experience.toLowerCase();
      switch (filters.experienceLevel) {
        case 'fresher':
          filtered = filtered.filter(job => 
            expLower(job).includes('fresher') || 
            expLower(job).includes('0') ||
            expLower(job).includes('entry')
          );
          break;
        case '1-3':
          filtered = filtered.filter(job => 
            expLower(job).includes('1') || 
            expLower(job).includes('2') || 
            expLower(job).includes('3')
          );
          break;
        case '3-5':
          filtered = filtered.filter(job => 
            expLower(job).includes('3') || 
            expLower(job).includes('4') || 
            expLower(job).includes('5')
          );
          break;
        case '5+':
          filtered = filtered.filter(job => 
            expLower(job).includes('5+') || 
            expLower(job).includes('senior') ||
            parseInt(expLower(job).match(/\d+/)?.[0] || '0') >= 5
          );
          break;
      }
    }

    // Employment type filter
    if (filters.employmentType.length > 0) {
      filtered = filtered.filter(job =>
        filters.employmentType.includes(job.employmentType)
      );
    }

    // Application type filter
    if (filters.applicationTypes.length > 0) {
      filtered = filtered.filter(job =>
        job.applicationTypes.some(type => 
          filters.applicationTypes.includes(type)
        )
      );
    }

    // Sort jobs
    switch (sortBy) {
      case 'salary':
        filtered.sort((a, b) => b.salary.max - a.salary.max);
        break;
      case 'applications':
        filtered.sort((a, b) => b.applicationCount - a.applicationCount);
        break;
      case 'views':
        filtered.sort((a, b) => b.viewCount - a.viewCount);
        break;
      case 'deadline':
        filtered.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
        break;
      case 'recent':
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    setFilteredJobs(filtered);

    // Reset to first page when filters change
    setCurrentPage(1);
  }, [jobs, searchTitle, filters, sortBy]);

  // Handle pagination
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedJobs(filteredJobs.slice(startIndex, endIndex));
  }, [filteredJobs, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of results when page changes
    document.querySelector('#jobs-results')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page
  };

  // Update URL params
  useEffect(() => {
    const newParams = new URLSearchParams();
    if (searchTitle) newParams.set('title', searchTitle);
    if (sortBy !== 'recent') newParams.set('sort', sortBy);
    setSearchParams(newParams);
  }, [searchTitle, sortBy, setSearchParams]);

  const handleSearch = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleSaveJob = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const diffInDays = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diffInDays;
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchTitle) count++;
    if (filters.location.state || filters.location.district) count++;
    if (filters.qualifications.length > 0) count++;
    if (filters.instituteType.length > 0) count++;
    if (filters.experienceLevel) count++;
    if (filters.employmentType.length > 0) count++;
    if (filters.applicationTypes.length > 0) count++;
    if (filters.salaryRange.min !== 5000 || filters.salaryRange.max !== 100000) count++;
    return count;
  };

  // Handler functions for job actions
  const handleViewDetails = (job: any) => {
    setSelectedJob(job);
    setShowJobDetails(true);
  };

  const handleApplyNow = (job: any) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
  };

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!applicationData.fullName || !applicationData.email || !applicationData.mobile || !applicationData.resume) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and upload your resume.",
        variant: "destructive"
      });
      return;
    }

    // Submit application (simulate API call)
    setTimeout(() => {
      toast({
        title: "✅ Application Submitted Successfully!",
        description: `Your application for ${selectedJob?.title} at ${selectedJob?.institute.name} has been submitted.`,
        duration: 5000,
      });

      // Reset form and close modal
      setApplicationData({
        fullName: '',
        email: '',
        mobile: '',
        resume: null,
        coverLetter: ''
      });
      setShowApplicationForm(false);
    }, 1000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setApplicationData(prev => ({ ...prev, resume: file }));
    }
  };

  const JobCard: React.FC<{ job: any; index: number }> = ({ job, index }) => {
    const daysUntilDeadline = getDaysUntilDeadline(job.deadline);
    const isUrgent = daysUntilDeadline <= 7;
    const isSaved = savedJobs.includes(job.id);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="group"
      >
        <Card className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 shadow-lg rounded-2xl hover:shadow-2xl transition-all duration-500 hover:border-blue-300 hover:scale-[1.02] hover:from-blue-50 hover:to-indigo-50">
          <CardContent className="p-8" style={{ fontFamily: 'Poppins, Inter, sans-serif' }}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4 flex-1">
                <Avatar className="h-12 w-12 border-2 border-gray-100">
                  <AvatarImage src={job.institute.logo} />
                  <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                    {job.institute.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                        {job.title}
                      </h3>
                      <p className="text-slate-600 font-semibold text-base">{job.institute.name}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location.city}, {job.location.state}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Posted {getTimeAgo(job.createdAt)}
                        </div>
                        <div className="flex items-center">
                          <Building className="w-4 h-4 mr-1" />
                          {job.institute.type.replace('-', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSaveJob(job.id)}
                        className={`${isSaved ? 'text-blue-600' : 'text-gray-400'} hover:text-blue-600`}
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                      </Button>
                      
                      {isUrgent && (
                        <Badge variant="destructive" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {daysUntilDeadline}d left
                        </Badge>
                      )}
                      
                      {job.isPremium && (
                        <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                          Premium
                        </Badge>
                      )}
                      
                      {job.isFeatured && (
                        <Badge className="bg-purple-100 text-purple-800 text-xs">
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-700 text-sm line-clamp-2">
                {job.shortDescription}
              </p>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs">
                  {job.department}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {job.employmentType.replace('-', ' ').split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {job.workMode.replace('-', ' ').split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </Badge>
              </div>
              
              <div className="text-right">
                <p className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent flex items-center justify-end">
                  <DollarSign className="w-5 h-5 text-emerald-600 mr-1" />
                  ₹{job.salary.min.toLocaleString()} - ₹{job.salary.max.toLocaleString()}
                </p>
                <p className="text-sm text-slate-500 font-medium">per month</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {job.applicationCount} applied
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {job.viewCount} views
                </div>
                <div className="flex items-center">
                  <GraduationCap className="w-4 h-4 mr-1" />
                  {job.requirements.education[0]}
                </div>
              </div>
              
              <div className="text-sm text-gray-500">
                Deadline: {new Date(job.deadline).toLocaleDateString()}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {job.applicationTypes.map((type: string) => (
                  <Badge key={type} variant="outline" className="text-xs capitalize">
                    {type.replace('-', ' ')}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/jobs/${job.id}`)}
                >
                  View Details
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate(`/jobs/${job.id}`)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Apply Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
      </div>

      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Faculty Jobs</h1>
            <p className="text-gray-600">
              Find your perfect teaching position from {jobs.length} available opportunities
            </p>
          </div>
          
          {/* Search Bar */}
          <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search job titles, institutions, subjects, or keywords..."
                      value={searchTitle}
                      onChange={(e) => setSearchTitle(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="salary">Highest Salary</SelectItem>
                      <SelectItem value="applications">Most Applied</SelectItem>
                      <SelectItem value="views">Most Viewed</SelectItem>
                      <SelectItem value="deadline">Deadline Soon</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button onClick={handleSearch} disabled={isLoading}>
                    {isLoading ? 'Searching...' : 'Search'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden"
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                    {getActiveFiltersCount() > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {getActiveFiltersCount()}
                      </Badge>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <FiltersSidebar sticky={true} />
          </div>

          {/* Jobs List */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6" id="jobs-results">
              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold">{filteredJobs.length}</span> of{' '}
                <span className="font-semibold">{jobs.length}</span> jobs
                {getActiveFiltersCount() > 0 && (
                  <span className="ml-2">
                    with <span className="font-semibold">{getActiveFiltersCount()}</span> filters applied
                  </span>
                )}
              </div>
              
              {getActiveFiltersCount() > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    resetFilters();
                    setSearchTitle('');
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear All Filters
                </Button>
              )}
            </div>

            {/* Active Filters Display */}
            {getActiveFiltersCount() > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {searchTitle && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Search: "{searchTitle}"
                      <X 
                        className="w-3 h-3 ml-1 cursor-pointer" 
                        onClick={() => setSearchTitle('')}
                      />
                    </Badge>
                  )}
                  {filters.location.state && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      State: {filters.location.state}
                      <X 
                        className="w-3 h-3 ml-1 cursor-pointer" 
                        onClick={() => setFilters({ location: { ...filters.location, state: '' } })}
                      />
                    </Badge>
                  )}
                  {filters.qualifications.length > 0 && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Qualifications: {filters.qualifications.length}
                      <X 
                        className="w-3 h-3 ml-1 cursor-pointer" 
                        onClick={() => setFilters({ qualifications: [] })}
                      />
                    </Badge>
                  )}
                  {/* Add more active filter badges as needed */}
                </div>
              </div>
            )}

            {/* Jobs Grid */}
            <AnimatePresence>
              {isLoading ? (
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Card key={i} className="bg-white border border-gray-200 shadow-md rounded-xl">
                      <CardContent className="p-6">
                        <div className="animate-pulse">
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                            <div className="flex-1">
                              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : filteredJobs.length > 0 ? (
                <div className="space-y-6">
                  {paginatedJobs.map((job, index) => (
                    <JobCard key={job.id} job={job} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-gray-400 text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No jobs found</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    We couldn't find any jobs matching your criteria. Try adjusting your filters or search terms.
                  </p>
                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      onClick={() => {
                        resetFilters();
                        setSearchTitle('');
                      }}
                    >
                      Clear All Filters
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/')}>
                      Browse All Jobs
                    </Button>
                  </div>
                </div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {filteredJobs.length > 0 && totalPages > 1 && (
              <div className="mt-12 border-t border-gray-200 pt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={filteredJobs.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                  onItemsPerPageChange={handleItemsPerPageChange}
                  showItemsPerPage={true}
                  showPageInfo={true}
                  className="justify-center"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsList;
