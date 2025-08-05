import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, useApplicationsStore } from '@/store/appStore';
import { productionCandidates, productionJobs, productionApplications, productionStats } from '@/data/productionSampleData\';ta\';tionSampleData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { motion } from 'framer-motion';
import {
  User,
  Upload,
  Download,
  FileText,
  GraduationCap,
  Briefcase,
  Award,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Eye,
  Edit,
  Plus,
  ArrowLeft,
  Camera,
  CheckCircle,
  Clock,
  AlertCircle,
  Bell,
  Bookmark,
  Search,
  Filter,
  Users,
  TrendingUp,
  Target
} from 'lucide-react';

const CandidateDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { applications, savedJobs, fetchApplications, fetchSavedJobs } = useApplicationsStore();
  
  // Get candidate profile from sample data
  const candidateProfile = allCandidates.find(c => c.email === user?.email) || allCandidates[0];
  
  const [showResumeUpload, setShowResumeUpload] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showJobAlert, setShowJobAlert] = useState(false);
  const [profileImage, setProfileImage] = useState(candidateProfile.profileImage || '');
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  useEffect(() => {
    fetchApplications();
    fetchSavedJobs();
  }, [fetchApplications, fetchSavedJobs]);

  // Calculate profile completion
  const calculateProfileCompletion = () => {
    let completed = 0;
    let total = 8;

    if (candidateProfile.profileImage) completed++;
    if (candidateProfile.profile.bio) completed++;
    if (candidateProfile.profile.education.length > 0) completed++;
    if (candidateProfile.profile.experience.length > 0) completed++;
    if (candidateProfile.profile.skills.length > 0) completed++;
    if (candidateProfile.profile.certifications.length > 0) completed++;
    if (candidateProfile.profile.resume) completed++;
    if (candidateProfile.profile.references.length > 0) completed++;

    return Math.round((completed / total) * 100);
  };

  const profileCompletion = calculateProfileCompletion();

  // Mock application data with various statuses
  const mockApplications = [
    {
      id: 'app_001',
      jobTitle: 'Assistant Professor - Computer Science',
      institute: 'Anna University',
      appliedDate: '2024-01-20',
      status: 'shortlisted',
      location: 'Chennai, Tamil Nadu'
    },
    {
      id: 'app_002', 
      jobTitle: 'Mathematics Lecturer',
      institute: 'PSG College of Technology',
      appliedDate: '2024-01-18',
      status: 'under-review',
      location: 'Coimbatore, Tamil Nadu'
    },
    {
      id: 'app_003',
      jobTitle: 'Principal - Engineering College',
      institute: 'Sri Krishna College of Engineering',
      appliedDate: '2024-01-15',
      status: 'interviewed',
      location: 'Coimbatore, Tamil Nadu'
    },
    {
      id: 'app_004',
      jobTitle: 'Physics Faculty',
      institute: 'Government Polytechnic',
      appliedDate: '2024-01-12',
      status: 'selected',
      location: 'Salem, Tamil Nadu'
    },
    {
      id: 'app_005',
      jobTitle: 'Chemistry Teacher',
      institute: 'Kendriya Vidyalaya',
      appliedDate: '2024-01-10',
      status: 'rejected',
      location: 'Madurai, Tamil Nadu'
    }
  ];

  const mockSavedJobs = [
    {
      id: 'job_001',
      title: 'Professor - Data Science',
      institute: 'IIT Madras',
      location: 'Chennai, Tamil Nadu',
      salary: '₹80,000 - ₹1,20,000',
      deadline: '2024-03-15',
      savedDate: '2024-01-22'
    },
    {
      id: 'job_002',
      title: 'Associate Professor - AI/ML',
      institute: 'NIT Trichy',
      location: 'Tiruchirappalli, Tamil Nadu',
      salary: '₹70,000 - ₹1,00,000',
      deadline: '2024-03-20',
      savedDate: '2024-01-21'
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'submitted': 'bg-blue-100 text-blue-800',
      'under-review': 'bg-yellow-100 text-yellow-800',
      'shortlisted': 'bg-purple-100 text-purple-800',
      'interviewed': 'bg-orange-100 text-orange-800',
      'selected': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      'submitted': <FileText className="w-4 h-4" />,
      'under-review': <Clock className="w-4 h-4" />,
      'shortlisted': <Eye className="w-4 h-4" />,
      'interviewed': <Users className="w-4 h-4" />,
      'selected': <CheckCircle className="w-4 h-4" />,
      'rejected': <AlertCircle className="w-4 h-4" />
    };
    return icons[status as keyof typeof icons] || <Clock className="w-4 h-4" />;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'resume' | 'profile') => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (type === 'resume') {
      setResumeFile(file);
      // In real app: upload to server and update profile
      console.log('Resume uploaded:', file.name);
    } else if (type === 'profile') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
        // In real app: upload to server and update profile
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadResume = () => {
    // In real app: download actual resume file
    console.log('Downloading resume:', candidateProfile.profile.resume?.originalName);
    const link = document.createElement('a');
    link.href = candidateProfile.profile.resume?.url || '#';
    link.download = candidateProfile.profile.resume?.originalName || 'resume.pdf';
    link.click();
  };

  const ProfileCompletionCard = () => (
    <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Target className="w-5 h-5 mr-2 text-blue-600" />
          Profile Completion
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Profile Progress</span>
            <span className="text-sm text-gray-500">{profileCompletion}%</span>
          </div>
          <Progress value={profileCompletion} className="h-2" />
          
          <div className="space-y-2 text-sm">
            <div className={`flex items-center ${candidateProfile.profileImage ? 'text-green-600' : 'text-gray-500'}`}>
              <CheckCircle className={`w-4 h-4 mr-2 ${candidateProfile.profileImage ? '' : 'opacity-30'}`} />
              Profile Photo
            </div>
            <div className={`flex items-center ${candidateProfile.profile.bio ? 'text-green-600' : 'text-gray-500'}`}>
              <CheckCircle className={`w-4 h-4 mr-2 ${candidateProfile.profile.bio ? '' : 'opacity-30'}`} />
              Professional Bio
            </div>
            <div className={`flex items-center ${candidateProfile.profile.resume ? 'text-green-600' : 'text-gray-500'}`}>
              <CheckCircle className={`w-4 h-4 mr-2 ${candidateProfile.profile.resume ? '' : 'opacity-30'}`} />
              Resume/CV
            </div>
            <div className={`flex items-center ${candidateProfile.profile.certifications.length > 0 ? 'text-green-600' : 'text-gray-500'}`}>
              <CheckCircle className={`w-4 h-4 mr-2 ${candidateProfile.profile.certifications.length > 0 ? '' : 'opacity-30'}`} />
              Certifications
            </div>
            <div className={`flex items-center ${candidateProfile.profile.references.length > 0 ? 'text-green-600' : 'text-gray-500'}`}>
              <CheckCircle className={`w-4 h-4 mr-2 ${candidateProfile.profile.references.length > 0 ? '' : 'opacity-30'}`} />
              References
            </div>
          </div>

          {profileCompletion < 100 && (
            <Button 
              size="sm" 
              onClick={() => setShowProfileEdit(true)}
              className="w-full mt-4"
            >
              Complete Profile
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                  <AvatarImage src={profileImage || candidateProfile.profileImage} />
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-xl font-semibold">
                    {candidateProfile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1">
                  <label htmlFor="profile-upload" className="cursor-pointer">
                    <div className="bg-blue-600 hover:bg-blue-700 rounded-full p-1.5 shadow-lg transition-colors">
                      <Camera className="w-4 h-4 text-white" />
                    </div>
                  </label>
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, 'profile')}
                  />
                </div>
              </div>
              
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{candidateProfile.name}</h1>
                <p className="text-gray-600">{candidateProfile.profile.qualifications[0]}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {candidateProfile.profile.location.city}, {candidateProfile.profile.location.state}
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    {candidateProfile.email}
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    {candidateProfile.phone}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={() => setShowProfileEdit(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button onClick={() => navigate('/profile')}>
                <User className="w-4 h-4 mr-2" />
                View Full Profile
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{mockApplications.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Profile Views</p>
                  <p className="text-2xl font-bold text-gray-900">248</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Bookmark className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Saved Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">{mockSavedJobs.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Profile Score</p>
                  <p className="text-2xl font-bold text-gray-900">{profileCompletion}%</p>
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
                <TabsTrigger value="saved-jobs">Saved Jobs</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="alerts">Job Alerts</TabsTrigger>
              </TabsList>

              {/* Applications Tab */}
              <TabsContent value="applications" className="space-y-6">
                <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
                  <CardHeader>
                    <CardTitle>My Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockApplications.map((application) => (
                        <motion.div
                          key={application.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-900">{application.jobTitle}</h3>
                              <p className="text-gray-600 text-sm">{application.institute}</p>
                              <p className="text-gray-500 text-xs">{application.location}</p>
                            </div>
                            <Badge className={getStatusColor(application.status)}>
                              {getStatusIcon(application.status)}
                              <span className="ml-1 capitalize">{application.status.replace('-', ' ')}</span>
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="w-4 h-4 mr-1" />
                              Applied {new Date(application.appliedDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                              {application.status === 'submitted' && (
                                <Button size="sm" variant="outline" className="text-red-600">
                                  Withdraw
                                </Button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Saved Jobs Tab */}
              <TabsContent value="saved-jobs" className="space-y-6">
                <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Saved Jobs</CardTitle>
                      <Button onClick={() => navigate('/jobs')}>
                        <Search className="w-4 h-4 mr-2" />
                        Browse Jobs
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockSavedJobs.map((job) => (
                        <div key={job.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-900">{job.title}</h3>
                              <p className="text-gray-600 text-sm">{job.institute}</p>
                              <p className="text-gray-500 text-xs">{job.location}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-green-600 font-medium">{job.salary}</p>
                              <p className="text-xs text-gray-500">per month</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="w-4 h-4 mr-1" />
                              Deadline: {new Date(job.deadline).toLocaleDateString()}
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline">
                                Remove
                              </Button>
                              <Button size="sm">
                                Apply Now
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Resume & Documents</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => setShowResumeUpload(true)}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Resume
                        </Button>
                        {candidateProfile.profile.resume && (
                          <Button
                            variant="outline"
                            onClick={handleDownloadResume}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {candidateProfile.profile.resume ? (
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-8 h-8 text-red-600" />
                          <div>
                            <p className="font-medium">{candidateProfile.profile.resume.originalName}</p>
                            <p className="text-sm text-gray-500">
                              Uploaded {new Date(candidateProfile.profile.resume.uploadedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No resume uploaded</h3>
                        <p className="text-gray-600 mb-4">
                          Upload your resume to improve your profile visibility
                        </p>
                        <Button onClick={() => setShowResumeUpload(true)}>
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Resume
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Job Alerts Tab */}
              <TabsContent value="alerts" className="space-y-6">
                <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Job Alerts</CardTitle>
                      <Button onClick={() => setShowJobAlert(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Alert
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No job alerts set</h3>
                      <p className="text-gray-600 mb-4">
                        Create job alerts to get notified about relevant opportunities
                      </p>
                      <Button onClick={() => setShowJobAlert(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Your First Alert
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <ProfileCompletionCard />

            {/* Quick Actions */}
            <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" onClick={() => navigate('/jobs')}>
                  <Search className="w-4 h-4 mr-2" />
                  Browse Jobs
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowResumeUpload(true)}>
                  <Upload className="w-4 h-4 mr-2" />
                  Update Resume
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => setShowJobAlert(true)}>
                  <Bell className="w-4 h-4 mr-2" />
                  Set Job Alert
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/profile')}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm">
                    <p className="text-gray-900">Profile viewed by Anna University</p>
                    <p className="text-gray-500 text-xs">2 hours ago</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-900">Application submitted for CS Professor</p>
                    <p className="text-gray-500 text-xs">1 day ago</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-900">Job saved: AI/ML Faculty</p>
                    <p className="text-gray-500 text-xs">2 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Resume Upload Dialog */}
        <Dialog open={showResumeUpload} onOpenChange={setShowResumeUpload}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Resume</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="resume-upload">Choose Resume File</Label>
                <Input
                  id="resume-upload"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileUpload(e, 'resume')}
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Supported formats: PDF, DOC, DOCX (Max size: 5MB)
                </p>
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setShowResumeUpload(false)}>
                  Cancel
                </Button>
                <Button disabled={!resumeFile}>
                  Upload Resume
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Job Alert Dialog */}
        <Dialog open={showJobAlert} onOpenChange={setShowJobAlert}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Job Alert</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="alert-keywords">Keywords</Label>
                <Input
                  id="alert-keywords"
                  placeholder="e.g., Computer Science, Professor"
                />
              </div>
              
              <div>
                <Label htmlFor="alert-location">Location</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chennai">Chennai</SelectItem>
                    <SelectItem value="coimbatore">Coimbatore</SelectItem>
                    <SelectItem value="madurai">Madurai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="alert-frequency">Alert Frequency</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="instant">Instant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setShowJobAlert(false)}>
                  Cancel
                </Button>
                <Button>
                  Create Alert
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CandidateDashboard;
