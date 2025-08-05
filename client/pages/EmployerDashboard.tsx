import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import QuickActionsPanel from '@/components/EmployerDashboard/QuickActionsPanel';
import { allSampleApplications } from '@/data/sampleApplications';
import {
  Building,
  MapPin,
  Mail,
  Phone,
  Users,
  Briefcase,
  Calendar,
  TrendingUp,
  Eye,
  Edit,
  Plus,
  Filter,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  User,
  Globe,
  Star,
  Send,
  ArrowLeft,
  ExternalLink,
  BarChart3
} from 'lucide-react';

export default function EmployerDashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [showPostJobDialog, setShowPostJobDialog] = useState(false);
  
  // Mock employer data - In real app: GET /api/employer/profile
  const mockEmployer = {
    _id: user?._id || '1',
    email: user?.email || 'employer@demo.com',
    role: 'employer' as const,
    isVerified: true,
    createdAt: '2024-01-10',
    profile: {
      institute: {
        _id: '1',
        name: 'Anna University',
        type: 'university' as const,
        location: {
          city: 'Chennai',
          state: 'Tamil Nadu',
          district: 'Chennai',
          address: 'Sardar Patel Road, Guindy, Chennai - 600025'
        },
        email: 'hr@annauniv.edu',
        phone: '+91 44 2235 0449',
        website: 'https://www.annauniv.edu',
        description: 'Premier technical university in Tamil Nadu offering undergraduate, postgraduate and doctoral programs.',
        established: 1978,
        isFeatured: true,
        jobsCount: 12
      },
      contactPerson: {
        name: 'Dr. Punitha',
        designation: 'HR Manager',
        phone: '+91 9876543210'
      },
      verificationStatus: 'verified' as const
    }
  };

  // Mock posted jobs - In real app: GET /api/employer/jobs
  const mockPostedJobs = [
    {
      _id: '1',
      title: 'Assistant Professor - Computer Science',
      type: 'college',
      location: 'Chennai, Tamil Nadu',
      salary: '₹45,000 - ₹65,000',
      postedDate: '2024-01-20',
      deadline: '2024-02-20',
      status: 'active',
      applicationsCount: 24,
      viewsCount: 156
    },
    {
      _id: '2',
      title: 'Professor - Mechanical Engineering',
      type: 'university',
      location: 'Chennai, Tamil Nadu',
      salary: '₹70,000 - ₹90,000',
      postedDate: '2024-01-18',
      deadline: '2024-02-18',
      status: 'active',
      applicationsCount: 18,
      viewsCount: 203
    },
    {
      _id: '3',
      title: 'Lecturer - Mathematics',
      type: 'college',
      location: 'Chennai, Tamil Nadu',
      salary: '₹35,000 - ₹50,000',
      postedDate: '2024-01-15',
      deadline: '2024-02-15',
      status: 'draft',
      applicationsCount: 0,
      viewsCount: 0
    }
  ];

  // Mock applications - In real app: GET /api/jobs/:jobId/applicants
  const mockApplications = [
    {
      _id: '1',
      jobId: '1',
      jobTitle: 'Assistant Professor - Computer Science',
      candidate: {
        _id: '1',
        name: 'Rajesh Kumar',
        email: 'rajesh@email.com',
        phone: '+91 9876543210',
        location: 'Chennai, Tamil Nadu',
        education: 'PhD Computer Science',
        experience: '5 years',
        appliedDate: '2024-01-21',
        profileImage: ''
      },
      status: 'shortlisted',
      rating: 4
    },
    {
      _id: '2',
      jobId: '1',
      jobTitle: 'Assistant Professor - Computer Science',
      candidate: {
        _id: '2',
        name: 'Priya',
        email: 'priya@email.com',
        phone: '+91 9876543211',
        location: 'Coimbatore, Tamil Nadu',
        education: 'M.Tech Computer Science',
        experience: '3 years',
        appliedDate: '2024-01-20',
        profileImage: ''
      },
      status: 'applied',
      rating: 0
    },
    {
      _id: '3',
      jobId: '2',
      jobTitle: 'Professor - Mechanical Engineering',
      candidate: {
        _id: '3',
        name: 'Suresh Krishnan',
        email: 'suresh@email.com',
        phone: '+91 9876543212',
        location: 'Madurai, Tamil Nadu',
        education: 'PhD Mechanical Engineering',
        experience: '12 years',
        appliedDate: '2024-01-19',
        profileImage: ''
      },
      status: 'interviewed',
      rating: 5
    }
  ];

  const [selectedJob, setSelectedJob] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    department: '',
    type: '',
    location: '',
    salaryMin: '',
    salaryMax: '',
    experience: '',
    deadline: ''
  });

  const filteredApplications = mockApplications.filter(app => {
    if (selectedJob !== 'all' && app.jobId !== selectedJob) return false;
    if (selectedStatus !== 'all' && app.status !== selectedStatus) return false;
    return true;
  });

  // Post job mutation - In real app: POST /api/jobs
  const postJobMutation = useMutation({
    mutationFn: async (jobData: any) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, jobId: 'new-job-id' };
    },
    onSuccess: () => {
      setShowPostJobDialog(false);
      setNewJob({
        title: '',
        description: '',
        department: '',
        type: '',
        location: '',
        salaryMin: '',
        salaryMax: '',
        experience: '',
        deadline: ''
      });
    },
  });

  const getStatusColor = (status: string) => {
    const colors = {
      applied: 'bg-blue-100 text-blue-800',
      shortlisted: 'bg-yellow-100 text-yellow-800',
      interviewed: 'bg-purple-100 text-purple-800',
      selected: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      active: 'bg-green-100 text-green-800',
      draft: 'bg-gray-100 text-gray-800',
      expired: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'applied': return <Clock className="w-4 h-4" />;
      case 'shortlisted': return <Eye className="w-4 h-4" />;
      case 'interviewed': return <User className="w-4 h-4" />;
      case 'selected': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <AlertCircle className="w-4 h-4" />;
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'draft': return <FileText className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  const handlePostJob = () => {
    postJobMutation.mutate(newJob);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Employer Dashboard
              </h1>
              <p className="text-gray-600">
                Manage your job postings and candidate applications for {mockEmployer.profile.institute.name}
              </p>
            </div>
            
            <Dialog open={showPostJobDialog} onOpenChange={setShowPostJobDialog}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Post New Job
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Post New Job</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Job Title</Label>
                      <Input
                        id="title"
                        value={newJob.title}
                        onChange={(e) => setNewJob(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g., Assistant Professor - Computer Science"
                      />
                    </div>
                    <div>
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        value={newJob.department}
                        onChange={(e) => setNewJob(prev => ({ ...prev, department: e.target.value }))}
                        placeholder="e.g., Computer Science"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Job Description</Label>
                    <Textarea
                      id="description"
                      value={newJob.description}
                      onChange={(e) => setNewJob(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe the role, responsibilities, and requirements..."
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="type">Institution Type</Label>
                      <Select value={newJob.type} onValueChange={(value) => setNewJob(prev => ({ ...prev, type: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="school">School</SelectItem>
                          <SelectItem value="college">College</SelectItem>
                          <SelectItem value="university">University</SelectItem>
                          <SelectItem value="polytechnic">Polytechnic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="experience">Experience Required</Label>
                      <Input
                        id="experience"
                        value={newJob.experience}
                        onChange={(e) => setNewJob(prev => ({ ...prev, experience: e.target.value }))}
                        placeholder="e.g., 2-5 years"
                      />
                    </div>
                    <div>
                      <Label htmlFor="deadline">Application Deadline</Label>
                      <Input
                        id="deadline"
                        type="date"
                        value={newJob.deadline}
                        onChange={(e) => setNewJob(prev => ({ ...prev, deadline: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="salaryMin">Minimum Salary (₹)</Label>
                      <Input
                        id="salaryMin"
                        type="number"
                        value={newJob.salaryMin}
                        onChange={(e) => setNewJob(prev => ({ ...prev, salaryMin: e.target.value }))}
                        placeholder="35000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="salaryMax">Maximum Salary (₹)</Label>
                      <Input
                        id="salaryMax"
                        type="number"
                        value={newJob.salaryMax}
                        onChange={(e) => setNewJob(prev => ({ ...prev, salaryMax: e.target.value }))}
                        placeholder="55000"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <Button variant="outline" onClick={() => setShowPostJobDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handlePostJob} disabled={postJobMutation.isPending}>
                      {postJobMutation.isPending ? (
                        <>
                          <Send className="w-4 h-4 mr-2 animate-spin" />
                          Posting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Post Job
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {mockPostedJobs.filter(job => job.status === 'active').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{mockApplications.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Eye className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Job Views</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {mockPostedJobs.reduce((sum, job) => sum + job.viewsCount, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Response Rate</p>
                  <p className="text-2xl font-bold text-gray-900">78%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card
            className="bg-white border border-gray-200 shadow-md rounded-xl hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate('/employer/my-jobs')}
          >
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">My Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {mockPostedJobs.filter(job => job.status === 'active').length}
                  </p>
                  <div className="flex items-center mt-1">
                    <ExternalLink className="w-3 h-3 text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500">Manage posts</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="bg-white border border-gray-200 shadow-md rounded-xl hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate('/employer/applications')}
          >
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{allSampleApplications.length}</p>
                  <div className="flex items-center mt-1">
                    <ExternalLink className="w-3 h-3 text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500">Review candidates</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="bg-white border border-gray-200 shadow-md rounded-xl hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate('/employer/analytics')}
          >
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Analytics</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {mockPostedJobs.reduce((sum, job) => sum + job.viewsCount, 0)}
                  </p>
                  <div className="flex items-center mt-1">
                    <ExternalLink className="w-3 h-3 text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500">View insights</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="bg-white border border-gray-200 shadow-md rounded-xl hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate('/employer/post-job')}
          >
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Plus className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Post Job</p>
                  <p className="text-2xl font-bold text-gray-900">New</p>
                  <div className="flex items-center mt-1">
                    <ExternalLink className="w-3 h-3 text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500">Create posting</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="recent-applications">Recent Applications</TabsTrigger>
                <TabsTrigger value="job-performance">Job Performance</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                          <div>
                            <p className="text-sm text-gray-900">New application received</p>
                            <p className="text-xs text-gray-500">Aravind Kumar applied for CS Professor</p>
                            <p className="text-xs text-gray-400">2 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                          <div>
                            <p className="text-sm text-gray-900">Job posting published</p>
                            <p className="text-xs text-gray-500">Mathematics Lecturer position went live</p>
                            <p className="text-xs text-gray-400">1 day ago</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                          <div>
                            <p className="text-sm text-gray-900">Candidate shortlisted</p>
                            <p className="text-xs text-gray-500">Meena Priya moved to interview stage</p>
                            <p className="text-xs text-gray-400">2 days ago</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>This Week</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">New Applications</span>
                          <span className="font-semibold">28</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Profile Views</span>
                          <span className="font-semibold">156</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Shortlisted</span>
                          <span className="font-semibold">12</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Interviews Scheduled</span>
                          <span className="font-semibold">5</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Recent Applications Tab */}
              <TabsContent value="recent-applications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Recent Applications</CardTitle>
                      <Button
                        variant="outline"
                        onClick={() => navigate('/employer/applications')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockApplications.slice(0, 3).map((application) => (
                        <div key={application._id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start space-x-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={application.candidate.profileImage} />
                                <AvatarFallback className="bg-blue-100 text-blue-600">
                                  {application.candidate.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold text-gray-900">
                                  {application.candidate.name}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                  Applied for: {application.jobTitle}
                                </p>
                                <p className="text-gray-500 text-xs mt-1">
                                  {application.candidate.education} • {application.candidate.experience} experience
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className={getStatusColor(application.status)}>
                                {getStatusIcon(application.status)}
                                <span className="ml-1 capitalize">{application.status}</span>
                              </Badge>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="w-4 h-4 mr-1" />
                              Applied {new Date(application.candidate.appliedDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline">
                                View Application
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Jobs Tab */}
              <TabsContent value="jobs" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Posted Jobs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockPostedJobs.map((job) => (
                        <div key={job._id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-900">{job.title}</h3>
                              <p className="text-gray-600 text-sm">{job.location}</p>
                              <p className="text-green-600 text-sm font-medium">{job.salary}</p>
                            </div>
                            <Badge className={getStatusColor(job.status)}>
                              {getStatusIcon(job.status)}
                              <span className="ml-1 capitalize">{job.status}</span>
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {job.applicationsCount} applications
                            </div>
                            <div className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {job.viewsCount} views
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              Deadline: {new Date(job.deadline).toLocaleDateString()}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                              Posted {new Date(job.postedDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </Button>
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-2" />
                                View
                              </Button>
                              {job.applicationsCount > 0 && (
                                <Button size="sm">
                                  View Applications ({job.applicationsCount})
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recruitment Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900">Application Metrics</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Applications</span>
                            <span className="font-medium">{mockApplications.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Shortlisted</span>
                            <span className="font-medium">{mockApplications.filter(app => app.status === 'shortlisted').length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Interviewed</span>
                            <span className="font-medium">{mockApplications.filter(app => app.status === 'interviewed').length}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900">Job Performance</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Views</span>
                            <span className="font-medium">{mockPostedJobs.reduce((sum, job) => sum + job.viewsCount, 0)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Avg. Applications per Job</span>
                            <span className="font-medium">{Math.round(mockApplications.length / mockPostedJobs.filter(j => j.status === 'active').length)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Response Rate</span>
                            <span className="font-medium">78%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Institution Info */}
            <Card>
              <CardHeader>
                <CardTitle>Institution Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {mockEmployer.profile.institute.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {mockEmployer.profile.institute.description}
                  </p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Building className="w-4 h-4 mr-2" />
                    {mockEmployer.profile.institute.type.charAt(0).toUpperCase() + mockEmployer.profile.institute.type.slice(1)}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {mockEmployer.profile.institute.location.city}, {mockEmployer.profile.institute.location.state}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Established {mockEmployer.profile.institute.established}
                  </div>
                  {mockEmployer.profile.institute.website && (
                    <div className="flex items-center text-gray-600">
                      <Globe className="w-4 h-4 mr-2" />
                      <a 
                        href={mockEmployer.profile.institute.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-900 mb-2">Contact Person</p>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>{mockEmployer.profile.contactPerson.name}</p>
                    <p>{mockEmployer.profile.contactPerson.designation}</p>
                    <p>{mockEmployer.profile.contactPerson.phone}</p>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" onClick={() => setShowPostJobDialog(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Post New Job
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Browse Candidates
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Export Applications
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Verification Status */}
            <Card>
              <CardHeader>
                <CardTitle>Verification Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-green-600">Verified</p>
                    <p className="text-sm text-gray-600">Your institution is verified</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
