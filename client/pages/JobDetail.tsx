import { useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { Job } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  MapPin,
  Calendar,
  Clock,
  Building,
  IndianRupee,
  Bookmark,
  BookmarkCheck,
  Share2,
  Users,
  GraduationCap,
  Award,
  CheckCircle,
  ArrowLeft,
  Mail,
  Phone,
  Globe,
  AlertCircle,
  FileText,
  Send,
  Briefcase
} from 'lucide-react';

export default function JobDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAuthStore();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Mock job data for demonstration - In real app: GET /api/jobs/:id
  const mockJob: Job = {
    _id: id || '1',
    title: 'Assistant Professor - Computer Science',
    description: 'We are seeking a highly motivated and qualified Assistant Professor to join our Computer Science Department. The successful candidate will be responsible for teaching undergraduate and graduate courses, conducting research, and contributing to the academic community. This is an excellent opportunity for a dedicated educator to advance their career in a supportive and dynamic environment.',
    subject: 'Computer Science',
    type: 'college',
    location: { city: 'Chennai', state: 'Tamil Nadu', district: 'Chennai' },
    salary: { min: 45000, max: 65000, currency: 'INR' },
    requirements: { 
      education: 'PhD in Computer Science or related field', 
      experience: '2-5 years of teaching experience preferred', 
      skills: ['Python', 'Machine Learning', 'Data Structures', 'Algorithms', 'Database Systems'] 
    },
    institute: { 
      _id: '1', 
      name: 'Anna University', 
      type: 'university', 
      location: { 
        city: 'Chennai', 
        state: 'Tamil Nadu', 
        district: 'Chennai', 
        address: 'Sardar Patel Road, Guindy, Chennai - 600025' 
      }, 
      email: 'hr@annauniv.edu',
      phone: '+91 44 2235 0449',
      website: 'https://www.annauniv.edu',
      description: 'Anna University is a premier technical university in Tamil Nadu, established in 1978. It offers undergraduate, postgraduate and doctoral programs in various fields of engineering, technology, and applied sciences.',
      established: 1978, 
      isFeatured: true, 
      jobsCount: 12 
    },
    postedBy: 'employer1',
    postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    isActive: true,
    applicationsCount: 24
  };

  // Apply mutation - In real app: POST /api/candidate/apply
  const applyMutation = useMutation({
    mutationFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true };
    },
    onSuccess: () => {
      setHasApplied(true);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
    },
  });

  // Save job mutation - In real app: POST /api/candidate/saved
  const saveJobMutation = useMutation({
    mutationFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    },
    onSuccess: () => {
      setIsBookmarked(!isBookmarked);
    },
  });

  const formatSalary = (min: number, max: number) => {
    const formatNumber = (num: number) => {
      if (num >= 100000) {
        return `${(num / 100000).toFixed(1)}L`;
      }
      if (num >= 1000) {
        return `${(num / 1000).toFixed(0)}K`;
      }
      return num.toString();
    };

    if (min === max) {
      return `₹${formatNumber(min)}`;
    }
    return `₹${formatNumber(min)} - ₹${formatNumber(max)}`;
  };

  const getDaysAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      college: 'bg-blue-100 text-blue-800',
      university: 'bg-purple-100 text-purple-800',
      school: 'bg-green-100 text-green-800',
      polytechnic: 'bg-orange-100 text-orange-800',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleApply = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    if (user?.role !== 'faculty' && user?.role !== 'candidate') {
      alert('Only faculty members can apply for jobs');
      return;
    }
    applyMutation.mutate();
  };

  const handleBookmark = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    saveJobMutation.mutate();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: mockJob.title,
        text: `Check out this job opportunity: ${mockJob.title} at ${mockJob.institute.name}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  const responsibilities = [
    'Teach undergraduate and graduate courses in Computer Science',
    'Develop and update course curricula and materials',
    'Conduct research in assigned areas of expertise',
    'Supervise student projects and theses',
    'Participate in departmental and university committees',
    'Mentor students and provide academic guidance',
    'Publish research papers in peer-reviewed journals',
    'Collaborate with industry partners and other institutions'
  ];

  const benefits = [
    'Competitive salary package',
    'Health insurance coverage',
    'Provident fund and gratuity',
    'Annual leave and study leave',
    'Research support and funding',
    'Conference attendance support',
    'Professional development opportunities',
    'Campus accommodation (if available)'
  ];

  return (
    <div className="min-h-screen bg-[#DDDAD0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {showSuccessMessage && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              Application submitted successfully! The employer will review your application and contact you if selected.
            </AlertDescription>
          </Alert>
        )}

        {/* Back Button */}
        <div className="mb-6">
          <Link to="/jobs" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Link>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Job Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{mockJob.title}</h1>
                <Link 
                  to={`/institutes/${mockJob.institute._id}`}
                  className="text-lg text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  <Building className="w-5 h-5 mr-2" />
                  {mockJob.institute.name}
                </Link>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleShare}
                  disabled={saveJobMutation.isPending}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleBookmark}
                  disabled={saveJobMutation.isPending}
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {mockJob.location.city}, {mockJob.location.state}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Posted {getDaysAgo(mockJob.postedDate)}
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {mockJob.applicationsCount} applicants
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <Badge className={getTypeColor(mockJob.type)}>
                {mockJob.type.charAt(0).toUpperCase() + mockJob.type.slice(1)}
              </Badge>
              <Badge variant="outline">{mockJob.subject}</Badge>
              {mockJob.requirements.experience && (
                <Badge variant="outline">{mockJob.requirements.experience}</Badge>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-green-600 font-semibold text-lg">
                <IndianRupee className="w-5 h-5 mr-1" />
                {formatSalary(mockJob.salary.min, mockJob.salary.max)} /month
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-sm text-gray-600">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Deadline: {new Date(mockJob.deadline).toLocaleDateString()}
                </div>
                
                {hasApplied ? (
                  <Button disabled className="bg-green-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Applied
                  </Button>
                ) : (
                  <Button 
                    onClick={handleApply} 
                    size="lg"
                    disabled={applyMutation.isPending}
                  >
                    {applyMutation.isPending ? (
                      <>
                        <Send className="w-4 h-4 mr-2 animate-spin" />
                        Applying...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Apply Now
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Job Description */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
                  <p className="text-gray-700 leading-relaxed">{mockJob.description}</p>
                </section>

                {/* Key Responsibilities */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Responsibilities</h2>
                  <ul className="space-y-3">
                    {responsibilities.map((responsibility, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Requirements */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                        <GraduationCap className="w-4 h-4 mr-2" />
                        Education
                      </h3>
                      <p className="text-gray-700">{mockJob.requirements.education}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                        <Award className="w-4 h-4 mr-2" />
                        Experience
                      </h3>
                      <p className="text-gray-700">{mockJob.requirements.experience}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Required Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {mockJob.requirements.skills.map((skill, index) => (
                          <Badge key={index} variant="outline">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Benefits */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Benefits & Perks</h2>
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Application Instructions */}
                {!isAuthenticated && (
                  <section className="bg-blue-50 rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Ready to Apply?</h2>
                    <p className="text-gray-700 mb-4">
                      To apply for this position, you need to create a candidate account and complete your profile.
                    </p>
                    <div className="flex space-x-3">
                      <Link to="/login">
                        <Button variant="outline">Sign In</Button>
                      </Link>
                      <Link to="/register">
                        <Button>Create Account</Button>
                      </Link>
                    </div>
                  </section>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-[#DDDAD0] rounded-lg p-6 sticky top-24">
                  {/* Institute Info */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Institution</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900">{mockJob.institute.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{mockJob.institute.description}</p>
                      </div>
                      
                      <div className="text-sm text-gray-600 space-y-2">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          Established {mockJob.institute.established}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {mockJob.institute.location.address}
                        </div>
                        {mockJob.institute.website && (
                          <div className="flex items-center">
                            <Globe className="w-4 h-4 mr-2" />
                            <a 
                              href={mockJob.institute.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Visit Website
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Contact Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                    <div className="space-y-3 text-sm">
                      {mockJob.institute.email && (
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          <a 
                            href={`mailto:${mockJob.institute.email}`}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {mockJob.institute.email}
                          </a>
                        </div>
                      )}
                      {mockJob.institute.phone && (
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          <a 
                            href={`tel:${mockJob.institute.phone}`}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {mockJob.institute.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Quick Actions */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <Link to={`/institutes/${mockJob.institute._id}`} className="block">
                        <Button variant="outline" className="w-full">
                          <Building className="w-4 h-4 mr-2" />
                          View Institution
                        </Button>
                      </Link>
                      <Link to={`/jobs?institute=${mockJob.institute._id}`} className="block">
                        <Button variant="outline" className="w-full">
                          <Briefcase className="w-4 h-4 mr-2" />
                          More Jobs Here
                        </Button>
                      </Link>
                      {isAuthenticated && user?.role === 'candidate' && (
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={handleBookmark}
                          disabled={saveJobMutation.isPending}
                        >
                          <Bookmark className="w-4 h-4 mr-2" />
                          {isBookmarked ? 'Saved' : 'Save Job'}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
