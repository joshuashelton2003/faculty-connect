import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { allJobs } from '@/data/comprehensiveSampleData';
import { allInstitutesData } from '@/data/enhancedInstitutesData';
import {
  ArrowLeft,
  Building,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  Eye,
  FileText,
  Mail,
  Phone,
  Share2,
  Bookmark,
  BookmarkCheck,
  Globe,
  Users,
  Award,
  ExternalLink,
  Download,
  Briefcase,
  GraduationCap,
  Star,
  Map as MapIcon,
  Building2
} from 'lucide-react';

export default function ApplicationDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Get real job data from comprehensive sample data
  const jobData = allJobs.find(job => job.id === id) || allJobs[0];

  // Get comprehensive institute data
  const instituteData = allInstitutesData.find(inst =>
    inst.name.toLowerCase() === jobData.institute.name.toLowerCase()
  ) || allInstitutesData[0];

  // Enhanced application data with real information
  const application = {
    id: id || 'app_1',
    jobTitle: jobData.title,
    institution: jobData.institute.name,
    location: `${jobData.location.city}, ${jobData.location.state}`,
    appliedDate: '2024-01-15',
    lastUpdate: '2024-01-20',
    status: 'under-review' as const,
    salary: `₹${jobData.salary.min.toLocaleString()} - ₹${jobData.salary.max.toLocaleString()}`,
    jobType: jobData.employmentType,
    description: jobData.description,
    requirements: jobData.requirements.education.concat(jobData.requirements.experience),
    applicationDetails: {
      resumeSubmitted: true,
      coverLetterSubmitted: true,
      documentsUploaded: ['Resume.pdf', 'Cover_Letter.pdf', 'Certificates.pdf', 'PhD_Certificate.pdf'],
      applicationNotes: 'Application submitted successfully. All required documents have been uploaded and verified.'
    },
    jobDetails: {
      department: jobData.department,
      deadline: jobData.deadline,
      postedDate: jobData.createdAt,
      applicationCount: jobData.applicationCount,
      viewCount: jobData.viewCount,
      isUrgent: jobData.isUrgent,
      isRemote: jobData.isRemote
    }
  };

  // Get related jobs from the same institution
  const relatedJobs = allJobs.filter(job =>
    job.institute.name === application.institution && job.id !== id
  ).slice(0, 5);

  // Handler functions
  const handleShare = async () => {
    const shareData = {
      title: `${application.jobTitle} at ${application.institution}`,
      text: `Check out this job application: ${application.jobTitle} at ${application.institution}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast({
          title: "Shared successfully",
          description: "Application details have been shared.",
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Application link copied to clipboard.",
      });
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Application unsaved" : "Application saved",
      description: isSaved ? "Removed from saved applications" : "Added to saved applications",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "Your application documents are being downloaded.",
    });
    // In real app, this would trigger actual download
  };

  const handleContactEmployer = () => {
    const subject = encodeURIComponent(`Inquiry about ${application.jobTitle} position`);
    const body = encodeURIComponent(`Dear Hiring Manager,\n\nI am writing to inquire about my application for the ${application.jobTitle} position at ${application.institution}.\n\nApplication ID: ${application.id}\nApplied on: ${new Date(application.appliedDate).toLocaleDateString()}\n\nThank you for your time.\n\nBest regards`);
    window.open(`mailto:${instituteData.email}?subject=${subject}&body=${body}`);
  };

  const handleViewJob = () => {
    navigate(`/jobs/${jobData.id}`);
  };

  const handleApplyToSimilar = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'under-review': return <Eye className="w-4 h-4" />;
      case 'shortlisted': return <CheckCircle className="w-4 h-4" />;
      case 'interviewed': return <CheckCircle className="w-4 h-4" />;
      case 'selected': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Applications
          </Button>
        </div>

        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  {application.jobTitle}
                </h1>
                {application.jobDetails.isUrgent && (
                  <Badge className="bg-red-100 text-red-800">Urgent</Badge>
                )}
                {application.jobDetails.isRemote && (
                  <Badge className="bg-blue-100 text-blue-800">Remote</Badge>
                )}
              </div>

              <div className="flex items-center space-x-4 text-gray-600 mb-4">
                <div className="flex items-center">
                  <Building className="w-4 h-4 mr-1" />
                  {application.institution}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {application.location}
                </div>
                <div className="flex items-center">
                  <GraduationCap className="w-4 h-4 mr-1" />
                  {application.jobDetails.department}
                </div>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <span>Applied: {new Date(application.appliedDate).toLocaleDateString()}</span>
                <span>Last update: {new Date(application.lastUpdate).toLocaleDateString()}</span>
                <span>Deadline: {new Date(application.jobDetails.deadline).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="flex items-center"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                className="flex items-center"
              >
                {isSaved ? (
                  <BookmarkCheck className="w-4 h-4 mr-2" />
                ) : (
                  <Bookmark className="w-4 h-4 mr-2" />
                )}
                {isSaved ? 'Saved' : 'Save'}
              </Button>

              <Badge className={getStatusColor(application.status)}>
                {getStatusIcon(application.status)}
                <span className="ml-1 capitalize">{application.status.replace('-', ' ')}</span>
              </Badge>
            </div>
          </div>

          {/* Job Stats */}
          <div className="flex items-center space-x-6 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {application.jobDetails.applicationCount} applications
            </div>
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {application.jobDetails.viewCount} views
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              Posted {new Date(application.jobDetails.postedDate).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {application.description}
                </p>
                
                <h4 className="font-semibold text-gray-900 mb-3">Requirements:</h4>
                <ul className="space-y-2">
                  {application.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Application Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Application Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                    <div>
                      <p className="font-medium text-gray-900">Application Submitted</p>
                      <p className="text-sm text-gray-500">{new Date(application.appliedDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                    <div>
                      <p className="font-medium text-gray-900">Under Review</p>
                      <p className="text-sm text-gray-500">{new Date(application.lastUpdate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Details */}
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Salary</p>
                  <p className="font-semibold text-green-600">{application.salary}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Job Type</p>
                  <p className="font-semibold">{application.jobType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Application Status</p>
                  <Badge className={getStatusColor(application.status)}>
                    {getStatusIcon(application.status)}
                    <span className="ml-1 capitalize">{application.status.replace('-', ' ')}</span>
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Submitted Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Submitted Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {application.applicationDetails.documentsUploaded.map((doc, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">{doc}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">Application Notes:</p>
                  <p className="text-sm text-gray-800 mt-1">{application.applicationDetails.applicationNotes}</p>
                </div>
              </CardContent>
            </Card>

            {/* Institution Details */}
            <Card>
              <CardHeader>
                <CardTitle>Institution Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{instituteData.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{instituteData.description}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Building2 className="w-4 h-4 mr-3 text-gray-500" />
                    <span className="capitalize">{instituteData.type}</span>
                  </div>

                  <div className="flex items-center text-sm">
                    <MapIcon className="w-4 h-4 mr-3 text-gray-500" />
                    <span>{instituteData.location.city}, {instituteData.location.state}</span>
                  </div>

                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-3 text-gray-500" />
                    <span>Established {instituteData.established}</span>
                  </div>

                  <div className="flex items-center text-sm">
                    <Star className="w-4 h-4 mr-3 text-gray-500" />
                    <span>{instituteData.ranking ? `Ranked #${instituteData.ranking}` : 'Premier Institution'}</span>
                  </div>

                  {instituteData.website && (
                    <div className="flex items-center text-sm">
                      <Globe className="w-4 h-4 mr-3 text-gray-500" />
                      <a
                        href={instituteData.website}
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
                  <h5 className="font-medium text-gray-900 mb-2">Contact Information</h5>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Mail className="w-4 h-4 mr-3 text-gray-500" />
                      <span className="text-gray-700">{instituteData.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="w-4 h-4 mr-3 text-gray-500" />
                      <span className="text-gray-700">{instituteData.phone}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleDownload}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Application
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleContactEmployer}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Employer
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleViewJob}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Job Posting
                </Button>

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => navigate('/jobs')}
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  Browse More Jobs
                </Button>
              </CardContent>
            </Card>

            {/* Related Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Related Jobs at {application.institution}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {relatedJobs.map((job) => (
                    <div key={job.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <h4 className="font-medium text-gray-900 mb-1">{job.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{job.department}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-green-600 font-medium">
                          ₹{job.salary.min.toLocaleString()} - ₹{job.salary.max.toLocaleString()}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleApplyToSimilar(job.id)}
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  ))}

                  {relatedJobs.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">
                      No other jobs available at this institution currently.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Actions Footer */}
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Steps</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <h4 className="font-medium text-gray-900 mb-2">View Similar Jobs</h4>
                <p className="text-sm text-gray-600 mb-3">Find more opportunities matching your profile</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/jobs')}
                  className="w-full"
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  Browse Jobs
                </Button>
              </Card>

              <Card className="p-4">
                <h4 className="font-medium text-gray-900 mb-2">Track Applications</h4>
                <p className="text-sm text-gray-600 mb-3">Monitor all your job applications in one place</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/faculty/dashboard')}
                  className="w-full"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Dashboard
                </Button>
              </Card>

              <Card className="p-4">
                <h4 className="font-medium text-gray-900 mb-2">Share Application</h4>
                <p className="text-sm text-gray-600 mb-3">Share this opportunity with colleagues</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="w-full"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Now
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
