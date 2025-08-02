import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Job, SearchFilters } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import JobCard from '@/components/JobCard';
import SearchBox from '@/components/SearchBox';
import { 
  Filter, 
  MapPin, 
  GraduationCap, 
  Building,
  IndianRupee,
  Clock,
  X
} from 'lucide-react';

export default function JobsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  
  // Initialize filters from URL params
  const [filters, setFilters] = useState<SearchFilters>({
    subject: searchParams.get('subject') || '',
    location: searchParams.get('location') || '',
    type: searchParams.get('type') || '',
    sort: (searchParams.get('sort') as 'recent' | 'salary' | 'relevance') || 'recent',
  });

  // Mock data for demonstration
  const [mockJobs] = useState<Job[]>([
    {
      _id: '1',
      title: 'Assistant Professor - Computer Science',
      description: 'Looking for a passionate Computer Science professor to join our growing department. Experience in AI/ML preferred. The candidate should have strong programming skills and research experience.',
      subject: 'Computer Science',
      type: 'college',
      location: { city: 'Chennai', state: 'Tamil Nadu', district: 'Chennai' },
      salary: { min: 45000, max: 65000, currency: 'INR' },
      requirements: { education: 'PhD in Computer Science', experience: '2-5 years', skills: ['Python', 'Machine Learning', 'Data Structures'] },
      institute: { _id: '1', name: 'Anna University', type: 'university', location: { city: 'Chennai', state: 'Tamil Nadu', district: 'Chennai', address: '' }, email: '', phone: '', description: '', established: 1978, isFeatured: true, jobsCount: 12 },
      postedBy: 'employer1',
      postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      isActive: true,
      applicationsCount: 24
    },
    {
      _id: '2',
      title: 'Mathematics Teacher - Higher Secondary',
      description: 'Seeking an experienced Mathematics teacher for Classes 11 and 12. Strong foundation in calculus and algebra required. The position involves teaching both CBSE and State board curricula.',
      subject: 'Mathematics',
      type: 'school',
      location: { city: 'Coimbatore', state: 'Tamil Nadu', district: 'Coimbatore' },
      salary: { min: 25000, max: 35000, currency: 'INR' },
      requirements: { education: 'M.Sc Mathematics, B.Ed', experience: '3+ years', skills: ['Calculus', 'Algebra', 'Statistics'] },
      institute: { _id: '2', name: 'PSG Matriculation School', type: 'school', location: { city: 'Coimbatore', state: 'Tamil Nadu', district: 'Coimbatore', address: '' }, email: '', phone: '', description: '', established: 1985, isFeatured: false, jobsCount: 5 },
      postedBy: 'employer2',
      postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
      isActive: true,
      applicationsCount: 18
    },
    {
      _id: '3',
      title: 'English Literature Professor',
      description: 'Join our English department as a Professor. Research experience in contemporary literature preferred. The role involves teaching undergraduate and postgraduate courses.',
      subject: 'English Literature',
      type: 'college',
      location: { city: 'Madurai', state: 'Tamil Nadu', district: 'Madurai' },
      salary: { min: 50000, max: 70000, currency: 'INR' },
      requirements: { education: 'PhD in English Literature', experience: '5+ years', skills: ['Research', 'Academic Writing', 'Literary Criticism'] },
      institute: { _id: '3', name: 'Madurai Kamaraj University', type: 'university', location: { city: 'Madurai', state: 'Tamil Nadu', district: 'Madurai', address: '' }, email: '', phone: '', description: '', established: 1966, isFeatured: true, jobsCount: 8 },
      postedBy: 'employer3',
      postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
      isActive: true,
      applicationsCount: 31
    },
    {
      _id: '4',
      title: 'Physics Lecturer - Engineering College',
      description: 'Engineering Physics position for first-year students. Should be comfortable with both theoretical and practical aspects of physics.',
      subject: 'Physics',
      type: 'college',
      location: { city: 'Salem', state: 'Tamil Nadu', district: 'Salem' },
      salary: { min: 35000, max: 45000, currency: 'INR' },
      requirements: { education: 'M.Sc Physics', experience: '2+ years', skills: ['Mechanics', 'Thermodynamics', 'Quantum Physics'] },
      institute: { _id: '4', name: 'Salem Engineering College', type: 'college', location: { city: 'Salem', state: 'Tamil Nadu', district: 'Salem', address: '' }, email: '', phone: '', description: '', established: 1995, isFeatured: false, jobsCount: 3 },
      postedBy: 'employer4',
      postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      isActive: true,
      applicationsCount: 12
    },
    {
      _id: '5',
      title: 'Chemistry Teacher - Polytechnic',
      description: 'Chemistry faculty position for diploma programs. Experience in industrial chemistry preferred.',
      subject: 'Chemistry',
      type: 'polytechnic',
      location: { city: 'Trichy', state: 'Tamil Nadu', district: 'Tiruchirappalli' },
      salary: { min: 30000, max: 40000, currency: 'INR' },
      requirements: { education: 'M.Sc Chemistry', experience: '1-3 years', skills: ['Organic Chemistry', 'Inorganic Chemistry', 'Lab Management'] },
      institute: { _id: '5', name: 'Government Polytechnic Trichy', type: 'polytechnic', location: { city: 'Trichy', state: 'Tamil Nadu', district: 'Tiruchirappalli', address: '' }, email: '', phone: '', description: '', established: 1965, isFeatured: false, jobsCount: 7 },
      postedBy: 'employer5',
      postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      deadline: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
      isActive: true,
      applicationsCount: 9
    }
  ]);

  // Filter jobs based on current filters
  const filteredJobs = mockJobs.filter(job => {
    if (filters.subject && !job.subject.toLowerCase().includes(filters.subject.toLowerCase())) return false;
    if (filters.location && !job.location.city.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.type && job.type !== filters.type) return false;
    return true;
  });

  // Sort jobs
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (filters.sort) {
      case 'salary':
        return b.salary.max - a.salary.max;
      case 'relevance':
        return b.applicationsCount - a.applicationsCount;
      case 'recent':
      default:
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
    }
  });

  // Update URL params when filters change
  useEffect(() => {
    const newParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) newParams.set(key, value);
    });
    setSearchParams(newParams);
  }, [filters, setSearchParams]);

  const updateFilter = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      subject: '',
      location: '',
      type: '',
      sort: 'recent',
    });
  };

  const activeFiltersCount = Object.values(filters).filter(value => value && value !== 'recent').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Faculty Jobs</h1>
            <p className="text-gray-600">
              Find your perfect teaching position from {mockJobs.length} available opportunities
            </p>
          </div>
          
          {/* Search Box */}
          <SearchBox 
            defaultValues={{
              title: searchParams.get('title') || '',
              location: filters.location,
              subject: filters.subject,
            }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {activeFiltersCount}
                    </span>
                  )}
                </h3>
                {activeFiltersCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="w-4 h-4 mr-1" />
                    Clear
                  </Button>
                )}
              </div>

              <div className="space-y-6">
                {/* Institution Type */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 flex items-center mb-3">
                    <Building className="w-4 h-4 mr-2" />
                    Institution Type
                  </Label>
                  <Select value={filters.type || ''} onValueChange={(value) => updateFilter('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All types</SelectItem>
                      <SelectItem value="school">School</SelectItem>
                      <SelectItem value="college">College</SelectItem>
                      <SelectItem value="university">University</SelectItem>
                      <SelectItem value="polytechnic">Polytechnic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Subject */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 flex items-center mb-3">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Subject
                  </Label>
                  <Input
                    type="text"
                    placeholder="Enter subject"
                    value={filters.subject || ''}
                    onChange={(e) => updateFilter('subject', e.target.value)}
                  />
                </div>

                {/* Location */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 flex items-center mb-3">
                    <MapPin className="w-4 h-4 mr-2" />
                    Location
                  </Label>
                  <Input
                    type="text"
                    placeholder="Enter city"
                    value={filters.location || ''}
                    onChange={(e) => updateFilter('location', e.target.value)}
                  />
                </div>

                {/* Sort By */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 flex items-center mb-3">
                    <Clock className="w-4 h-4 mr-2" />
                    Sort By
                  </Label>
                  <Select value={filters.sort || 'recent'} onValueChange={(value) => updateFilter('sort', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="salary">Highest Salary</SelectItem>
                      <SelectItem value="relevance">Most Relevant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Jobs List */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-600">
                Showing {sortedJobs.length} of {mockJobs.length} jobs
              </div>
              
              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
            </div>

            {/* Job Cards */}
            <div className="space-y-6">
              {sortedJobs.length > 0 ? (
                sortedJobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🔍</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters or search terms to find more opportunities.
                  </p>
                  <Button onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>

            {/* Load More Button */}
            {sortedJobs.length > 0 && sortedJobs.length >= 10 && (
              <div className="text-center mt-8">
                <Button variant="outline" size="lg">
                  Load More Jobs
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
