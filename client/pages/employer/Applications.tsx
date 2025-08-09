import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useJobsStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { allSampleApplications, tamilNaduCandidates } from '@/data/sampleApplications';
import { ApplicationStatus } from '@/types';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Download,
  Eye,
  User,
  GraduationCap,
  Briefcase,
  Star,
  Filter,
  Search,
  FileText,
  Edit3,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  UserCheck,
  MessageSquare
} from 'lucide-react';

const Applications: React.FC = () => {
  const navigate = useNavigate();
  const { jobId } = useParams<{ jobId: string }>();
  const { jobs, fetchJobs } = useJobsStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | 'all'>('all');
  const [qualificationFilter, setQualificationFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [applicationNotes, setApplicationNotes] = useState('');

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Get current job
  const currentJob = jobId ? jobs.find(job => job.id === jobId) : null;
  
  // Filter applications for the specific job or all applications
  const jobApplications = jobId 
    ? allSampleApplications.filter(app => app.jobId === jobId)
    : allSampleApplications;

  // Apply filters
  const filteredApplications = jobApplications.filter(application => {
    const candidate = application.candidate;
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.job?.title?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || application.status === statusFilter;
    
    const matchesQualification = qualificationFilter === 'all' || 
      candidate.profile?.qualifications?.some(q => 
        q.toLowerCase().includes(qualificationFilter.toLowerCase())
      );
    
    return matchesSearch && matchesStatus && matchesQualification;
  });

  // Calculate statistics
  const stats = {
    total: jobApplications.length,
    submitted: jobApplications.filter(app => app.status === 'submitted').length,
    underReview: jobApplications.filter(app => app.status === 'under-review').length,
    shortlisted: jobApplications.filter(app => app.status === 'shortlisted').length,
    interviewed: jobApplications.filter(app => app.status === 'interviewed').length,
    selected: jobApplications.filter(app => app.status === 'selected').length,
    rejected: jobApplications.filter(app => app.status === 'rejected').length
  };

  const getStatusColor = (status: ApplicationStatus) => {
    const colors = {
      submitted: 'bg-blue-100 text-blue-800',
      'under-review': 'bg-yellow-100 text-yellow-800',
      shortlisted: 'bg-purple-100 text-purple-800',
      'interview-scheduled': 'bg-indigo-100 text-indigo-800',
      interviewed: 'bg-orange-100 text-orange-800',
      selected: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      withdrawn: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: ApplicationStatus) => {
    const icons = {
      submitted: <FileText className="w-4 h-4" />,
      'under-review': <Clock className="w-4 h-4" />,
      shortlisted: <UserCheck className="w-4 h-4" />,
      'interview-scheduled': <Calendar className="w-4 h-4" />,
      interviewed: <MessageSquare className="w-4 h-4" />,
      selected: <CheckCircle className="w-4 h-4" />,
      rejected: <XCircle className="w-4 h-4" />,
      withdrawn: <AlertCircle className="w-4 h-4" />
    };
    return icons[status] || <Clock className="w-4 h-4" />;
  };

  const getExperienceYears = (candidate: any) => {
    if (!candidate.profile?.experience?.length) return 'Fresher';
    
    const totalMonths = candidate.profile.experience.reduce((total: number, exp: any) => {
      const start = new Date(exp.startDate);
      const end = exp.isCurrent ? new Date() : new Date(exp.endDate);
      const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
      return total + months;
    }, 0);
    
    const years = Math.floor(totalMonths / 12);
    return years > 0 ? `${years}+ years` : 'Less than 1 year';
  };

  const getRatingStars = (rating: number = 0) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const openProfileDialog = (application: any) => {
    setSelectedApplication(application);
    setApplicationNotes(application.employerNotes || '');
    setShowProfileDialog(true);
  };

  const handleStatusUpdate = (applicationId: string, newStatus: ApplicationStatus) => {
    // In real app, this would call an API
    console.log(`Updating application ${applicationId} to status: ${newStatus}`);
  };

  const handleDownloadResume = (application: any) => {
    // In real app, this would download the actual resume
    console.log(`Downloading resume for ${application.candidate.name}`);
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${application.candidate.name.replace(/\s+/g, '_')}_Resume.pdf`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#DDDAD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(jobId ? '/employer/my-jobs' : '/employer/dashboard')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {jobId ? 'Back to My Jobs' : 'Back to Dashboard'}
          </Button>
        </div>

        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {currentJob ? `Applications for ${currentJob.title}` : 'All Applications'}
            </h1>
            <p className="text-gray-600">
              {currentJob 
                ? `Review and manage applications for this position at ${currentJob.institute.name}`
                : 'Review and manage all job applications across your postings'
              }
            </p>
            {currentJob && (
              <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {currentJob.location.city}, {currentJob.location.state}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Deadline: {new Date(currentJob.deadline).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Briefcase className="w-4 h-4 mr-1" />
                  ₹{currentJob.salary.min.toLocaleString()} - ₹{currentJob.salary.max.toLocaleString()}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{stats.submitted}</p>
                <p className="text-sm text-gray-600">Submitted</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">{stats.underReview}</p>
                <p className="text-sm text-gray-600">Under Review</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{stats.shortlisted}</p>
                <p className="text-sm text-gray-600">Shortlisted</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">{stats.interviewed}</p>
                <p className="text-sm text-gray-600">Interviewed</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{stats.selected}</p>
                <p className="text-sm text-gray-600">Selected</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                <p className="text-sm text-gray-600">Rejected</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-white border border-gray-200 shadow-md rounded-xl mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by candidate name, email, or job title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
                  <SelectTrigger>
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="under-review">Under Review</SelectItem>
                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="interviewed">Interviewed</SelectItem>
                    <SelectItem value="selected">Selected</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select value={qualificationFilter} onValueChange={setQualificationFilter}>
                  <SelectTrigger>
                    <GraduationCap className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by qualification" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Qualifications</SelectItem>
                    <SelectItem value="ph.d">Ph.D</SelectItem>
                    <SelectItem value="m.tech">M.Tech/M.E</SelectItem>
                    <SelectItem value="m.sc">M.Sc/M.A</SelectItem>
                    <SelectItem value="b.tech">B.Tech/B.E</SelectItem>
                    <SelectItem value="b.sc">B.Sc/B.A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
          <CardHeader>
            <CardTitle>Applications ({filteredApplications.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {filteredApplications.map((application) => (
                <div key={application.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={application.candidate.profileImage} />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {application.candidate.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900">
                          {application.candidate.name}
                        </h3>
                        {!jobId && application.job && (
                          <p className="text-gray-600 text-sm mb-1">
                            Applied for: {application.job.title}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                          <div className="flex items-center">
                            <GraduationCap className="w-4 h-4 mr-1" />
                            {application.candidate.profile?.qualifications?.[0] || 'Not specified'}
                          </div>
                          <div className="flex items-center">
                            <Briefcase className="w-4 h-4 mr-1" />
                            {getExperienceYears(application.candidate)}
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {getRatingStars(Math.floor(Math.random() * 5) + 1)}
                          <span className="text-sm text-gray-500 ml-2">
                            {(Math.random() * 2 + 3).toFixed(1)}/5.0
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(application.status)}>
                        {getStatusIcon(application.status)}
                        <span className="ml-1 capitalize">{application.status.replace('-', ' ')}</span>
                      </Badge>
                      <p className="text-sm text-gray-500 mt-2">
                        Applied {new Date(application.applicationDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      {application.candidate.email}
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      {application.candidate.phone}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {application.candidate.profile?.location?.city || 'Location not specified'}, {application.candidate.profile?.location?.state || ''}
                    </div>
                  </div>

                  {application.salaryExpectation && (
                    <div className="mb-4 p-3 bg-[#DDDAD0] rounded-lg">
                      <p className="text-sm text-gray-600">
                        <strong>Salary Expectation:</strong> ₹{application.salaryExpectation.amount.toLocaleString()} per month
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Available from:</strong> {new Date(application.availabilityDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openProfileDialog(application)}
                        className="hover:bg-blue-50"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Full Profile
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownloadResume(application)}
                        className="hover:bg-green-50"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Resume
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Select 
                        value={application.status} 
                        onValueChange={(value: ApplicationStatus) => handleStatusUpdate(application.id, value)}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="submitted">Submitted</SelectItem>
                          <SelectItem value="under-review">Under Review</SelectItem>
                          <SelectItem value="shortlisted">Shortlisted</SelectItem>
                          <SelectItem value="interview-scheduled">Interview Scheduled</SelectItem>
                          <SelectItem value="interviewed">Interviewed</SelectItem>
                          <SelectItem value="selected">Selected</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}

              {filteredApplications.length === 0 && (
                <div className="text-center py-12">
                  <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
                  <p className="text-gray-600">
                    {searchTerm || statusFilter !== 'all' || qualificationFilter !== 'all'
                      ? 'Try adjusting your search or filters'
                      : 'No applications have been received yet'
                    }
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Profile Detail Dialog */}
        <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Candidate Profile</DialogTitle>
            </DialogHeader>
            {selectedApplication && (
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedApplication.candidate.profileImage} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-lg">
                      {selectedApplication.candidate.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900">{selectedApplication.candidate.name}</h2>
                    <p className="text-gray-600">{selectedApplication.candidate.email}</p>
                    <p className="text-gray-600">{selectedApplication.candidate.phone}</p>
                    <p className="text-gray-500 text-sm mt-1">
                      {selectedApplication.candidate.profile?.location?.city}, {selectedApplication.candidate.profile?.location?.state}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                {selectedApplication.candidate.profile?.bio && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                    <p className="text-gray-600">{selectedApplication.candidate.profile.bio}</p>
                  </div>
                )}

                {/* Education */}
                {selectedApplication.candidate.profile?.education && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Education</h3>
                    <div className="space-y-3">
                      {selectedApplication.candidate.profile.education.map((edu: any) => (
                        <div key={edu.id} className="border-l-4 border-blue-200 pl-4">
                          <h4 className="font-medium text-gray-900">{edu.degree} in {edu.field}</h4>
                          <p className="text-gray-600">{edu.institution}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(edu.startDate).getFullYear()} - {new Date(edu.endDate).getFullYear()} | 
                            Grade: {edu.grade} {edu.gradeType}
                          </p>
                          {edu.achievements && edu.achievements.length > 0 && (
                            <div className="mt-2">
                              <p className="text-sm font-medium text-gray-700">Achievements:</p>
                              <ul className="text-sm text-gray-600 list-disc list-inside">
                                {edu.achievements.map((achievement: string, idx: number) => (
                                  <li key={idx}>{achievement}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Experience */}
                {selectedApplication.candidate.profile?.experience && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Experience</h3>
                    <div className="space-y-3">
                      {selectedApplication.candidate.profile.experience.map((exp: any) => (
                        <div key={exp.id} className="border-l-4 border-green-200 pl-4">
                          <h4 className="font-medium text-gray-900">{exp.designation}</h4>
                          <p className="text-gray-600">{exp.organization}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(exp.startDate).toLocaleDateString()} - 
                            {exp.isCurrent ? ' Present' : ` ${new Date(exp.endDate).toLocaleDateString()}`}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">{exp.description}</p>
                          {exp.achievements && exp.achievements.length > 0 && (
                            <div className="mt-2">
                              <p className="text-sm font-medium text-gray-700">Key Achievements:</p>
                              <ul className="text-sm text-gray-600 list-disc list-inside">
                                {exp.achievements.map((achievement: string, idx: number) => (
                                  <li key={idx}>{achievement}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills */}
                {selectedApplication.candidate.profile?.skills && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedApplication.candidate.profile.skills.map((skill: string, idx: number) => (
                        <Badge key={idx} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cover Letter */}
                {selectedApplication.coverLetter && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Cover Letter</h3>
                    <div className="bg-[#DDDAD0] p-4 rounded-lg">
                      <p className="text-gray-700">{selectedApplication.coverLetter}</p>
                    </div>
                  </div>
                )}

                {/* Application Answers */}
                {selectedApplication.answers && selectedApplication.answers.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Application Responses</h3>
                    <div className="space-y-3">
                      {selectedApplication.answers.map((answer: any, idx: number) => (
                        <div key={idx} className="bg-[#DDDAD0] p-4 rounded-lg">
                          <p className="font-medium text-gray-900 mb-2">Q: {answer.question}</p>
                          <p className="text-gray-700">A: {answer.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Employer Notes */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Employer Notes</h3>
                  <Textarea
                    value={applicationNotes}
                    onChange={(e) => setApplicationNotes(e.target.value)}
                    placeholder="Add your notes about this candidate..."
                    rows={4}
                    className="mb-3"
                  />
                  <Button size="sm">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Update Notes
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Applications;
