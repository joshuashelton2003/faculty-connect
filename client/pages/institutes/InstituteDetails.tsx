import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { allInstitutesData, instituteJobsData } from '@/data/enhancedInstitutesData';
import { allJobs } from '@/data/comprehensiveSampleData';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Globe,
  Mail,
  Phone,
  Star,
  CheckCircle,
  Award,
  BookOpen,
  GraduationCap,
  Users,
  Building,
  ExternalLink,
  Briefcase,
  Clock,
  DollarSign,
  Eye,
  Heart,
  Share2,
  Download,
  Facebook,
  Twitter,
  Linkedin,
  Instagram
} from 'lucide-react';

const InstituteDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [institute, setInstitute] = useState<any>(null);
  const [instituteJobs, setInstituteJobs] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Find institute by id
      const foundInstitute = allInstitutesData.find(inst => inst.id === id);
      if (foundInstitute) {
        setInstitute(foundInstitute);
        
        // Generate jobs for this institute
        const jobCount = instituteJobsData[id] || 0;
        const jobs = generateJobsForInstitute(foundInstitute, jobCount);
        setInstituteJobs(jobs);
      }
      setIsLoading(false);
    }
  }, [id]);

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
      'Teaching Assistant'
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
        description: `We are seeking a qualified ${title} to join our ${department} department. The candidate will be responsible for teaching, research, and academic development.`,
        requirements: [
          `${['Ph.D', 'M.Tech/M.E', 'M.Sc/M.A'][Math.floor(Math.random() * 3)]} in ${department}`,
          'Teaching experience preferred',
          'Research publications',
          'Good communication skills'
        ],
        applicationCount: Math.floor(Math.random() * 50) + 5,
        viewCount: Math.floor(Math.random() * 200) + 20,
        isUrgent: Math.random() > 0.8,
        isRemote: Math.random() > 0.9
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#DDDAD0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading institute details...</p>
        </div>
      </div>
    );
  }

  if (!institute) {
    return (
      <div className="min-h-screen bg-[#DDDAD0] flex items-center justify-center">
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

  return (
    <div className="min-h-screen bg-[#DDDAD0]">
      {/* Back Button */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/institutes')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Institutes
          </Button>
        </div>
      </div>

      {/* Institute Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            {/* Left Section */}
            <div className="flex items-start space-x-6">
              <Avatar className="h-24 w-24 border-4 border-gray-100 flex-shrink-0">
                <AvatarImage src={institute.logo} alt={institute.name} />
                <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold text-2xl">
                  {institute.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap gap-3 mb-3">
                  <h1 className="text-3xl font-bold text-gray-900 line-clamp-2">
                    {institute.name}
                  </h1>
                  {institute.isVerified && (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                  {institute.isFeatured && (
                    <Badge className="bg-purple-100 text-purple-800">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>

                <div className="flex items-center flex-wrap gap-4 text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{institute.location.city}, {institute.location.state}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Est. {institute.established}</span>
                  </div>
                  <div className="flex items-center">
                    <GraduationCap className="w-4 h-4 mr-1" />
                    <span>{institute.type.replace('-', ' ')}</span>
                  </div>
                </div>

                <p className="text-gray-700 line-clamp-3 mb-4">
                  {institute.description}
                </p>

                {/* Contact Info */}
                <div className="flex items-center flex-wrap gap-4">
                  {institute.contact.email && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.location.href = `mailto:${institute.contact.email}`}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                  )}
                  {institute.contact.phone && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.location.href = `tel:${institute.contact.phone}`}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Phone
                    </Button>
                  )}
                  {institute.website && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(institute.website, '_blank')}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Website
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Section - Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-48">
              <Button
                onClick={() => navigate(`/institutes/${institute.id}/jobs`)}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={instituteJobs.length === 0}
              >
                <Briefcase className="w-4 h-4 mr-2" />
                View Jobs ({instituteJobs.length})
              </Button>
              <Button variant="outline">
                <Heart className="w-4 h-4 mr-2" />
                Save Institute
              </Button>
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="jobs">Jobs ({instituteJobs.length})</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Info */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About the Institute</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {institute.description}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Courses Offered</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {institute.courses.map((course: string, index: number) => (
                        <Badge key={index} variant="outline" className="px-3 py-1">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Facilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {institute.facilities.map((facility: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>{facility}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Established</span>
                      <span className="font-semibold">{institute.established}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Affiliation</span>
                      <span className="font-semibold">{institute.affiliation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Departments</span>
                      <span className="font-semibold">{institute.departments.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Open Jobs</span>
                      <span className="font-semibold text-blue-600">{instituteJobs.length}</span>
                    </div>
                  </CardContent>
                </Card>

                {institute.accreditation && institute.accreditation.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Accreditation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {institute.accreditation.map((acc: string, index: number) => (
                          <Badge key={index} className="bg-green-100 text-green-800 w-full justify-center">
                            <Award className="w-3 h-3 mr-1" />
                            {acc}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {institute.rankings && institute.rankings.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Rankings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {institute.rankings.map((ranking: any, index: number) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-3">
                            <div className="font-semibold text-lg">#{ranking.rank}</div>
                            <div className="text-sm text-gray-600">{ranking.organization}</div>
                            <div className="text-sm text-gray-500">{ranking.category} - {ranking.year}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Social Media */}
                {institute.socialMedia && Object.keys(institute.socialMedia).length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Follow Us</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex space-x-3">
                        {institute.socialMedia.facebook && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(institute.socialMedia.facebook, '_blank')}
                          >
                            <Facebook className="w-4 h-4" />
                          </Button>
                        )}
                        {institute.socialMedia.twitter && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(institute.socialMedia.twitter, '_blank')}
                          >
                            <Twitter className="w-4 h-4" />
                          </Button>
                        )}
                        {institute.socialMedia.linkedin && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(institute.socialMedia.linkedin, '_blank')}
                          >
                            <Linkedin className="w-4 h-4" />
                          </Button>
                        )}
                        {institute.socialMedia.instagram && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(institute.socialMedia.instagram, '_blank')}
                          >
                            <Instagram className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Departments & Specializations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {institute.departments.map((department: string, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-3">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                        <div>
                          <h3 className="font-medium text-gray-900">{department}</h3>
                          <p className="text-sm text-gray-500">
                            {Math.floor(Math.random() * 15) + 5} faculty members
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            {instituteJobs.length > 0 ? (
              <div className="space-y-4">
                {instituteJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                              {job.isUrgent && (
                                <Badge className="bg-red-100 text-red-800">Urgent</Badge>
                              )}
                              {job.isRemote && (
                                <Badge className="bg-green-100 text-green-800">Remote</Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
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
                            </div>
                            <p className="text-gray-700 mb-3 line-clamp-2">{job.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-1" />
                                {formatSalary(job.salary)}
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {job.experience}
                              </div>
                              <div className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {job.applicationCount} applications
                              </div>
                            </div>
                          </div>
                          <Badge className={getJobTypeColor(job.employmentType)}>
                            {job.employmentType}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-red-600">
                            Deadline: {formatDate(job.deadline)}
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/jobs/${job.id}`)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700"
                              onClick={() => navigate(`/jobs/${job.id}`)}
                            >
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
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No Jobs Available</h3>
                  <p className="text-gray-600">
                    This institute doesn't have any job openings at the moment. Check back later!
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{institute.contact.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium">{institute.contact.phone}</p>
                    </div>
                  </div>
                  {institute.contact.fax && (
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">Fax</p>
                        <p className="font-medium">{institute.contact.fax}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Website</p>
                      <a 
                        href={institute.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-medium text-blue-600 hover:text-blue-700"
                      >
                        {institute.website}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="font-medium">{institute.name}</p>
                      <p className="text-gray-700">{institute.location.address}</p>
                      <p className="text-gray-700">
                        {institute.location.city}, {institute.location.district}
                      </p>
                      <p className="text-gray-700">
                        {institute.location.state} - {institute.location.pincode}
                      </p>
                      <p className="text-gray-700">{institute.location.country}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InstituteDetails;
