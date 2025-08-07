import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { allInstitutesData, instituteJobsData } from '@/data/enhancedInstitutesData';
import {
  ArrowLeft,
  Search,
  Filter,
  MapPin,
  Calendar,
  Briefcase,
  Clock,
  DollarSign,
  Eye,
  Heart,
  Building,
  Users,
  ExternalLink,
  BookOpen,
  GraduationCap
} from 'lucide-react';

const InstituteJobs: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [institute, setInstitute] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Find institute by id
      const foundInstitute = allInstitutesData.find(inst => inst.id === id);
      if (foundInstitute) {
        setInstitute(foundInstitute);
        
        // Generate jobs for this institute
        const jobCount = instituteJobsData[id] || 0;
        const generatedJobs = generateJobsForInstitute(foundInstitute, jobCount);
        setJobs(generatedJobs);
        setFilteredJobs(generatedJobs);
      }
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    // Apply filters
    let filtered = [...jobs];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Department filter
    if (departmentFilter !== 'all') {
      filtered = filtered.filter(job => job.department === departmentFilter);
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(job => job.employmentType === typeFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
        case 'deadline':
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        case 'salary':
          return b.salary.max - a.salary.max;
        case 'applications':
          return b.applicationCount - a.applicationCount;
        default:
          return 0;
      }
    });

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, departmentFilter, typeFilter, sortBy]);

  const generateJobsForInstitute = (institute: any, count: number) => {
    const jobs = [];
    const departments = institute.departments || [];
    const jobTitles = [
      'Assistant Professor',
      'Associate Professor',
      'Professor',
      'Lecturer',
      'Senior Lecturer',
      'Principal',
      'Head of Department',
      'Research Associate',
      'Lab Instructor',
      'Teaching Assistant',
      'Research Fellow',
      'Visiting Faculty',
      'Adjunct Professor',
      'Postdoc Researcher'
    ];

    for (let i = 0; i < count; i++) {
      const department = departments[Math.floor(Math.random() * departments.length)] || 'General';
      const title = jobTitles[Math.floor(Math.random() * jobTitles.length)];
      
      jobs.push({
        id: `job-${institute.id}-${i + 1}`,
        title: `${title} - ${department}`,
        department: department,
        institute: institute.name,
        location: `${institute.location.city}, ${institute.location.state}`,
        salary: {
          min: Math.floor(Math.random() * 40000) + 30000,
          max: Math.floor(Math.random() * 60000) + 60000,
          currency: 'INR'
        },
        employmentType: ['full-time', 'part-time', 'contract', 'visiting'][Math.floor(Math.random() * 4)],
        experience: `${Math.floor(Math.random() * 8) + 2}-${Math.floor(Math.random() * 10) + 5} years`,
        education: ['Ph.D', 'M.Tech/M.E', 'M.Sc/M.A', 'NET/SET'][Math.floor(Math.random() * 4)],
        postedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        deadline: new Date(Date.now() + Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
        description: `We are seeking a qualified ${title} to join our ${department} department. The candidate will be responsible for teaching, research, and academic development. This is an excellent opportunity for career growth in a prestigious academic institution.`,
        requirements: [
          `${['Ph.D', 'M.Tech/M.E', 'M.Sc/M.A'][Math.floor(Math.random() * 3)]} in ${department}`,
          'Teaching experience preferred',
          'Research publications in reputed journals',
          'Good communication skills',
          'NET/SET qualification preferred'
        ],
        responsibilities: [
          'Teach undergraduate and graduate courses',
          'Conduct research in relevant field',
          'Guide student projects and research',
          'Participate in academic committees',
          'Collaborate with industry partners'
        ],
        benefits: [
          'Competitive salary package',
          'Health insurance',
          'Research funding support',
          'Professional development opportunities',
          'Conference participation support'
        ],
        applicationCount: Math.floor(Math.random() * 50) + 5,
        viewCount: Math.floor(Math.random() * 200) + 20,
        isUrgent: Math.random() > 0.8,
        isRemote: Math.random() > 0.9,
        isFeatured: Math.random() > 0.85
      });
    }

    return jobs;
  };

  const formatSalary = (salary: any) => {
    return `₹${(salary.min / 1000).toFixed(0)}K - ₹${(salary.max / 1000).toFixed(0)}K`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getJobTypeColor = (type: string) => {
    const colors = {
      'full-time': 'bg-green-100 text-green-800',
      'part-time': 'bg-blue-100 text-blue-800',
      'contract': 'bg-orange-100 text-orange-800',
      'visiting': 'bg-purple-100 text-purple-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const days = Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  if (!institute) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Institute not found</h2>
          <p className="text-gray-600 mb-6">The institute you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/institutes')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Institutes
          </Button>
        </div>
      </div>
    );
  }

  const uniqueDepartments = [...new Set(jobs.map(job => job.department))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate(`/institutes/${institute.id}`)}
              className="inline-flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Institute
            </Button>
            <div className="h-6 w-px bg-gray-300"></div>
            <Button
              variant="ghost"
              onClick={() => navigate('/institutes')}
              className="text-gray-600 hover:text-gray-900"
            >
              All Institutes
            </Button>
          </div>
        </div>
      </div>

      {/* Institute Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="h-16 w-16 border-2 border-gray-100">
              <AvatarImage src={institute.logo} alt={institute.name} />
              <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold text-xl">
                {institute.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{institute.name}</h1>
              <p className="text-gray-600">{institute.location.city}, {institute.location.state}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-sm text-gray-500">
                  {jobs.length} total jobs available
                </span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">
                  Est. {institute.established}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search jobs by title, department, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-48">
                  <BookOpen className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {uniqueDepartments.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <Briefcase className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="full-time">Full Time</SelectItem>
                  <SelectItem value="part-time">Part Time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="visiting">Visiting</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="deadline">Deadline</SelectItem>
                  <SelectItem value="salary">Salary</SelectItem>
                  <SelectItem value="applications">Applications</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Job Openings</h2>
            <p className="text-gray-600">
              Showing {filteredJobs.length} of {jobs.length} jobs
            </p>
          </div>
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length > 0 ? (
          <div className="space-y-6">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    {/* Job Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                            {job.title}
                          </h3>
                          {job.isUrgent && (
                            <Badge className="bg-red-100 text-red-800">Urgent</Badge>
                          )}
                          {job.isFeatured && (
                            <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                          )}
                          {job.isRemote && (
                            <Badge className="bg-green-100 text-green-800">Remote</Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center flex-wrap gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <Building className="w-4 h-4 mr-1" />
                            {job.department}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Posted {formatDate(job.postedDate)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {job.experience}
                          </div>
                        </div>
                      </div>
                      
                      <Badge className={getJobTypeColor(job.employmentType)}>
                        {job.employmentType}
                      </Badge>
                    </div>

                    {/* Job Description */}
                    <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

                    {/* Requirements */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Key Requirements:</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.requirements.slice(0, 3).map((req: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                        {job.requirements.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{job.requirements.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Job Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1 text-green-600" />
                          <span className="font-medium text-green-600">{formatSalary(job.salary)}</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {job.applicationCount} applicants
                        </div>
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 mr-1" />
                          {job.viewCount} views
                        </div>
                        <div className={`flex items-center ${getDaysUntilDeadline(job.deadline) <= 7 ? 'text-red-600' : 'text-gray-600'}`}>
                          <Clock className="w-4 h-4 mr-1" />
                          {getDaysUntilDeadline(job.deadline)} days left
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Button variant="ghost" size="sm">
                          <Heart className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No Jobs Found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || departmentFilter !== 'all' || typeFilter !== 'all'
                  ? "No jobs match your current filters. Try adjusting your search criteria."
                  : "This institute doesn't have any job openings at the moment."}
              </p>
              {(searchTerm || departmentFilter !== 'all' || typeFilter !== 'all') && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setDepartmentFilter('all');
                    setTypeFilter('all');
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Institute Summary */}
        {jobs.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>About {institute.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{jobs.length}</div>
                  <div className="text-sm text-gray-600">Open Positions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{institute.departments.length}</div>
                  <div className="text-sm text-gray-600">Departments</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{institute.established}</div>
                  <div className="text-sm text-gray-600">Established</div>
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/institutes/${institute.id}`)}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Institute Details
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default InstituteJobs;
