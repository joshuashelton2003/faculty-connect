import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import JobCard from '@/components/JobCard';
import { 
  User, 
  MapPin, 
  Mail, 
  Phone, 
  GraduationCap, 
  Briefcase,
  FileText,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
  Plus,
  Edit,
  Download,
  Upload,
  Bell,
  Bookmark,
  Settings,
  ArrowLeft
} from 'lucide-react';

export default function CandidateDashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  
  // Mock candidate data - In real app: GET /api/candidate/profile
  const mockCandidate = {
    _id: user?._id || '1',
    email: user?.email || 'candidate@demo.com',
    role: 'candidate' as const,
    isVerified: true,
    createdAt: '2024-01-15',
    profile: {
      firstName: 'Mani',
      lastName: 'Geetha',
      profileImage: '',
      phone: '+91 9876543210',
      dateOfBirth: '1985-05-15',
      gender: 'male' as const,
      location: {
        city: 'Chennai',
        state: 'Tamil Nadu',
        district: 'Chennai'
      },
      education: [
        {
          degree: 'PhD',
          specialization: 'Computer Science',
          university: 'Anna University',
          year: 2015,
          percentage: 85
        },
        {
          degree: 'M.Tech',
          specialization: 'Computer Science & Engineering',
          university: 'IIT Madras',
          year: 2012,
          percentage: 88
        }
      ],
      experience: [
        {
          designation: 'Assistant Professor',
          institute: 'PSG College of Technology',
          duration: '2015 - Present',
          description: 'Teaching undergraduate and postgraduate courses in Computer Science. Research in Machine Learning and AI.'
        },
        {
          designation: 'Research Associate',
          institute: 'IIT Madras',
          duration: '2012 - 2015',
          description: 'Conducted research in distributed systems and cloud computing.'
        }
      ],
      skills: ['Machine Learning', 'Python', 'Java', 'Data Structures', 'Algorithms', 'Database Systems'],
      resume: '/resumes/rajesh-kumar-resume.pdf',
      bio: 'Passionate educator with 8+ years of experience in computer science education and research. Specialized in machine learning and artificial intelligence.'
    }
  };

  // Mock applications data - In real app: GET /api/candidate/applications
  const mockApplications = [
    {
      _id: '1',
      job: {
        _id: '1',
        title: 'Associate Professor - Computer Science',
        institute: { name: 'Anna University', _id: '1' },
        location: { city: 'Chennai', state: 'Tamil Nadu' },
        type: 'university' as const,
        salary: { min: 55000, max: 75000 }
      },
      appliedDate: '2024-01-20',
      status: 'interviewed' as const,
      feedback: 'Good technical knowledge. Waiting for final decision.'
    },
    {
      _id: '2',
      job: {
        _id: '2',
        title: 'Assistant Professor - AI & ML',
        institute: { name: 'IIT Madras', _id: '2' },
        location: { city: 'Chennai', state: 'Tamil Nadu' },
        type: 'university' as const,
        salary: { min: 60000, max: 80000 }
      },
      appliedDate: '2024-01-18',
      status: 'shortlisted' as const,
      feedback: 'Profile matches requirements. Interview scheduled.'
    },
    {
      _id: '3',
      job: {
        _id: '3',
        title: 'Computer Science Teacher',
        institute: { name: 'DAV Public School', _id: '3' },
        location: { city: 'Chennai', state: 'Tamil Nadu' },
        type: 'school' as const,
        salary: { min: 35000, max: 45000 }
      },
      appliedDate: '2024-01-15',
      status: 'applied' as const,
      feedback: ''
    }
  ];

  // Mock saved jobs - In real app: GET /api/candidate/saved
  const mockSavedJobs = [
    {
      _id: '4',
      title: 'Senior Lecturer - Computer Applications',
      description: 'Looking for experienced faculty in computer applications for MCA program.',
      subject: 'Computer Science',
      type: 'college' as const,
      location: { city: 'Coimbatore', state: 'Tamil Nadu', district: 'Coimbatore' },
      salary: { min: 45000, max: 60000, currency: 'INR' },
      requirements: { education: 'PhD preferred', experience: '5+ years', skills: ['Programming', 'Database'] },
      institute: { _id: '4', name: 'PSG College of Arts & Science', type: 'college' as const, location: { city: 'Coimbatore', state: 'Tamil Nadu', district: 'Coimbatore', address: '' }, email: '', phone: '', description: '', established: 1960, isFeatured: false, jobsCount: 3 },
      postedBy: 'employer4',
      postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
      isActive: true,
      applicationsCount: 12
    }
  ];

  const getProfileCompletionScore = () => {
    let score = 0;
    const profile = mockCandidate.profile;
    
    if (profile.firstName && profile.lastName) score += 15;
    if (profile.phone) score += 10;
    if (profile.location.city) score += 10;
    if (profile.education.length > 0) score += 20;
    if (profile.experience.length > 0) score += 20;
    if (profile.skills.length > 0) score += 15;
    if (profile.bio) score += 5;
    if (profile.resume) score += 5;
    
    return score;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      applied: 'bg-blue-100 text-blue-800',
      shortlisted: 'bg-yellow-100 text-yellow-800',
      interviewed: 'bg-purple-100 text-purple-800',
      selected: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
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
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const profileCompletionScore = getProfileCompletionScore();
  const profileCompletionTasks = [
    { task: 'Add profile photo', completed: !!mockCandidate.profile.profileImage, points: 10 },
    { task: 'Upload resume', completed: !!mockCandidate.profile.resume, points: 15 },
    { task: 'Add work experience', completed: mockCandidate.profile.experience.length > 0, points: 20 },
    { task: 'Complete education details', completed: mockCandidate.profile.education.length > 0, points: 15 },
    { task: 'Add skills', completed: mockCandidate.profile.skills.length > 0, points: 15 },
    { task: 'Write bio/summary', completed: !!mockCandidate.profile.bio, points: 10 },
  ];

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

        {/* Header with Profile */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="flex items-center space-x-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={mockCandidate.profile.profileImage} />
              <AvatarFallback className="text-lg font-semibold bg-blue-100 text-blue-600">
                {mockCandidate.profile.firstName[0]}{mockCandidate.profile.lastName[0]}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Welcome back, {mockCandidate.profile.firstName}! 👋
              </h1>
              <p className="text-gray-600 mb-2">
                {mockCandidate.profile.bio}
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {mockCandidate.profile.location.city}, {mockCandidate.profile.location.state}
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  {mockCandidate.email}
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  {mockCandidate.profile.phone}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Link to="/profile">
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
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
                  <p className="text-sm font-medium text-gray-600">Applications</p>
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
                  <p className="text-sm font-medium text-gray-600">Shortlisted</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {mockApplications.filter(app => app.status === 'shortlisted').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <User className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Interviews</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {mockApplications.filter(app => app.status === 'interviewed').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Profile Views</p>
                  <p className="text-2xl font-bold text-gray-900">47</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="applications" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="alerts">Job Alerts</TabsTrigger>
              </TabsList>

              {/* Applications Tab */}
              <TabsContent value="applications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>My Applications</span>
                      <Link to="/jobs">
                        <Button size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Apply to Jobs
                        </Button>
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockApplications.map((application) => (
                        <div key={application._id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {application.job.title}
                              </h3>
                              <p className="text-gray-600 text-sm">
                                {application.job.institute.name} • {application.job.location.city}
                              </p>
                            </div>
                            <Badge className={getStatusColor(application.status)}>
                              {getStatusIcon(application.status)}
                              <span className="ml-1 capitalize">{application.status}</span>
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              Applied {new Date(application.appliedDate).toLocaleDateString()}
                            </div>
                            <Link 
                              to={`/jobs/${application.job._id}`}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              View Job
                            </Link>
                          </div>
                          {application.feedback && (
                            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                              <p className="text-sm text-blue-800">{application.feedback}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Saved Jobs Tab */}
              <TabsContent value="saved" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Saved Jobs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {mockSavedJobs.map((job) => (
                        <JobCard key={job._id} job={job} isBookmarked={true} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Education */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Education</h3>
                      <div className="space-y-3">
                        {mockCandidate.profile.education.map((edu, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <GraduationCap className="w-5 h-5 text-gray-400 mt-1" />
                            <div>
                              <p className="font-medium">{edu.degree} in {edu.specialization}</p>
                              <p className="text-sm text-gray-600">{edu.university} • {edu.year}</p>
                              <p className="text-sm text-gray-500">{edu.percentage}%</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Experience */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Experience</h3>
                      <div className="space-y-3">
                        {mockCandidate.profile.experience.map((exp, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <Briefcase className="w-5 h-5 text-gray-400 mt-1" />
                            <div>
                              <p className="font-medium">{exp.designation}</p>
                              <p className="text-sm text-gray-600">{exp.institute} • {exp.duration}</p>
                              <p className="text-sm text-gray-500 mt-1">{exp.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Skills */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {mockCandidate.profile.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Job Alerts Tab */}
              <TabsContent value="alerts" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Alerts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No job alerts set up</h3>
                      <p className="text-gray-600 mb-4">
                        Create job alerts to get notified when new opportunities match your preferences.
                      </p>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Job Alert
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Completion */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-medium text-gray-900">{profileCompletionScore}%</span>
                  </div>
                  <Progress value={profileCompletionScore} className="h-2" />
                </div>
                <div className="space-y-2 text-sm">
                  {profileCompletionTasks.map((task, index) => (
                    <div key={index} className={`flex items-center ${task.completed ? 'text-green-600' : 'text-gray-500'}`}>
                      {task.completed ? (
                        <CheckCircle className="w-4 h-4 mr-2" />
                      ) : (
                        <Clock className="w-4 h-4 mr-2" />
                      )}
                      {task.task} (+{task.points} points)
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" size="sm">
                  Complete Profile
                </Button>
              </CardContent>
            </Card>

            {/* Resume */}
            <Card>
              <CardHeader>
                <CardTitle>Resume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="font-medium text-sm">Current Resume</p>
                      <p className="text-xs text-gray-500">Last updated 2 days ago</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload New
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/jobs">
                  <Button variant="outline" className="w-full justify-start">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Browse Jobs
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <User className="w-4 h-4 mr-2" />
                  Update Profile
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Resume Builder
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="w-4 h-4 mr-2" />
                  Job Alerts
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
