import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  Briefcase, 
  MapPin, 
  Calendar, 
  Clock, 
  Eye, 
  Star, 
  BookOpen, 
  GraduationCap,
  TrendingUp,
  Users,
  FileText,
  Settings,
  Bell,
  Upload,
  CheckCircle,
  AlertCircle,
  Plus,
  Filter,
  BarChart3,
  Target,
  Award,
  Building
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { allJobs, allCandidates } from '@/data/comprehensiveSampleData';
import { useNavigate } from 'react-router-dom';

interface JobMatch {
  id: string;
  title: string;
  institution: string;
  location: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  matchPercentage: number;
  postedDate: string;
  deadline: string;
  type: 'full-time' | 'part-time' | 'contract';
  requirements: string[];
}

interface Application {
  id: string;
  jobTitle: string;
  institution: string;
  status: 'pending' | 'under-review' | 'shortlisted' | 'interviewed' | 'selected' | 'rejected';
  appliedDate: string;
  lastUpdate: string;
}

const FacultyDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<'overview' | 'jobs' | 'applications' | 'profile'>('overview');

  // Use real job data and convert to job matches
  const [jobMatches] = useState<JobMatch[]>(() => {
    return allJobs.slice(0, 15).map((job, index) => ({
      id: job.id,
      title: job.title,
      institution: job.institute.name,
      location: `${job.location.city}, ${job.location.state}`,
      salary: job.salary,
      matchPercentage: Math.floor(Math.random() * 20) + 80, // 80-100% match
      postedDate: job.createdAt.split('T')[0],
      deadline: job.deadline,
      type: job.employmentType,
      requirements: job.requirements.education.slice(0, 3)
    }));
  });

  // Generate realistic applications based on user profile
  const [applications] = useState<Application[]>(() => {
    const userSubjects = ['Computer Science', 'Data Science', 'AI', 'Machine Learning', 'Information Technology'];
    return Array.from({ length: 8 }, (_, index) => {
      const job = allJobs[Math.floor(Math.random() * allJobs.length)];
      const statuses: Array<'pending' | 'under-review' | 'shortlisted' | 'interviewed' | 'selected' | 'rejected'> =
        ['pending', 'under-review', 'shortlisted', 'interviewed', 'selected', 'rejected'];

      return {
        id: `app_${index + 1}`,
        jobTitle: job.title,
        institution: job.institute.name,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        appliedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        lastUpdate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };
    });
  });

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      'under-review': 'bg-blue-100 text-blue-800',
      shortlisted: 'bg-green-100 text-green-800',
      interviewed: 'bg-purple-100 text-purple-800',
      selected: 'bg-emerald-100 text-emerald-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 75) return 'text-blue-600';
    if (percentage >= 60) return 'text-orange-600';
    return 'text-gray-600';
  };

  const formatSalary = (salary: JobMatch['salary']) => {
    return `₹${(salary.min / 1000).toFixed(0)}K - ₹${(salary.max / 1000).toFixed(0)}K`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short'
    });
  };

  const profileCompletion = user?.profileCompletion || 30;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user?.profileImage} />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
                  {user?.name?.split(' ').map(n => n[0]).join('') || 'FC'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {user?.name?.split(' ')[0] || 'Faculty'}!
                </h1>
                <p className="text-gray-600">Ready to explore new opportunities?</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          {/* Profile Completion */}
          {profileCompletion < 100 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-blue-900">Complete your profile</h3>
                <span className="text-sm text-blue-700 font-medium">{profileCompletion}%</span>
              </div>
              <Progress value={profileCompletion} className="mb-2" />
              <p className="text-sm text-blue-700">
                A complete profile gets 5x more job opportunities. Add your academic details and experience.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'jobs', label: 'Job Matches', icon: Briefcase },
              { id: 'applications', label: 'My Applications', icon: FileText },
              { id: 'profile', label: 'Profile', icon: Users }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Target className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Job Matches</p>
                      <p className="text-2xl font-bold text-gray-900">{jobMatches.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <FileText className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Applications</p>
                      <p className="text-2xl font-bold text-gray-900">8</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <Eye className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Profile Views</p>
                      <p className="text-2xl font-bold text-gray-900">156</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Award className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Interviews</p>
                      <p className="text-2xl font-bold text-gray-900">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="h-auto p-4 flex flex-col items-center space-y-2">
                    <Search className="w-6 h-6" />
                    <span>Browse Jobs</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                    <Upload className="w-6 h-6" />
                    <span>Upload Resume</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                    <Users className="w-6 h-6" />
                    <span>Update Profile</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Job Matches</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {jobMatches.slice(0, 3).map((job) => (
                      <div key={job.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{job.title}</h4>
                          <Badge className={`${getMatchColor(job.matchPercentage)} bg-transparent border`}>
                            {job.matchPercentage}% match
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{job.institution}</p>
                        <p className="text-sm text-gray-500">{formatSalary(job.salary)}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Application Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {applications.slice(0, 3).map((app) => (
                      <div key={app.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{app.jobTitle}</h4>
                          <Badge className={getStatusColor(app.status)}>
                            {app.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{app.institution}</p>
                        <p className="text-sm text-gray-500">
                          Applied {formatDate(app.appliedDate)}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {selectedTab === 'jobs' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search jobs by title, institution, or location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Job Matches */}
            <div className="space-y-4">
              {jobMatches.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                          <Badge className={`${getMatchColor(job.matchPercentage)} bg-transparent border`}>
                            {job.matchPercentage}% match
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Building className="w-4 h-4 mr-1" />
                            {job.institution}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Posted {formatDate(job.postedDate)}
                          </div>
                        </div>
                      </div>
                      <Badge variant={job.type === 'full-time' ? 'default' : 'outline'}>
                        {job.type}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-semibold text-green-600">
                          {formatSalary(job.salary)}
                        </span>
                        <span className="text-sm text-red-600">
                          Deadline: {formatDate(job.deadline)}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'applications' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">My Applications</h2>
              <Badge className="bg-blue-100 text-blue-800">
                {applications.length} total applications
              </Badge>
            </div>

            <div className="space-y-4">
              {applications.map((app) => (
                <Card key={app.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{app.jobTitle}</h3>
                        <p className="text-gray-600">{app.institution}</p>
                      </div>
                      <Badge className={getStatusColor(app.status)}>
                        {app.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Applied: {formatDate(app.appliedDate)}</span>
                        <span>Last update: {formatDate(app.lastUpdate)}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        View Application
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'profile' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Button className="h-auto p-6 flex flex-col items-center space-y-3">
                    <Upload className="w-8 h-8" />
                    <div className="text-center">
                      <div className="font-medium">Upload Profile Picture</div>
                      <div className="text-sm opacity-75">Add a professional photo</div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="h-auto p-6 flex flex-col items-center space-y-3">
                    <FileText className="w-8 h-8" />
                    <div className="text-center">
                      <div className="font-medium">Update Resume</div>
                      <div className="text-sm opacity-75">Keep your CV current</div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="h-auto p-6 flex flex-col items-center space-y-3">
                    <BookOpen className="w-8 h-8" />
                    <div className="text-center">
                      <div className="font-medium">Academic Details</div>
                      <div className="text-sm opacity-75">Add qualifications & experience</div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="h-auto p-6 flex flex-col items-center space-y-3">
                    <Award className="w-8 h-8" />
                    <div className="text-center">
                      <div className="font-medium">Certifications</div>
                      <div className="text-sm opacity-75">Showcase your achievements</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyDashboard;
