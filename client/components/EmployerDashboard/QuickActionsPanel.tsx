import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import { allSampleApplications, tamilNaduCandidates } from '@/data/sampleApplications';
import { 
  Plus,
  Users,
  Download,
  TrendingUp,
  Search,
  Filter,
  FileText,
  Mail,
  Calendar,
  MapPin,
  GraduationCap,
  Briefcase,
  Phone,
  Eye,
  Star,
  CheckCircle,
  Clock,
  UserCheck,
  BarChart3,
  PieChart,
  Activity,
  Target
} from 'lucide-react';

interface QuickActionsPanelProps {
  className?: string;
}

const QuickActionsPanel: React.FC<QuickActionsPanelProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const [showCandidatesDialog, setShowCandidatesDialog] = useState(false);
  const [candidateFilter, setCandidateFilter] = useState('all');
  const [candidateSearch, setCandidateSearch] = useState('');

  // Filter candidates based on search and filter
  const filteredCandidates = tamilNaduCandidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(candidateSearch.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(candidateSearch.toLowerCase()) ||
                         candidate.profile?.qualifications?.some(q => 
                           q.toLowerCase().includes(candidateSearch.toLowerCase())
                         );
    
    const matchesFilter = candidateFilter === 'all' || 
      candidate.profile?.qualifications?.some(q => 
        q.toLowerCase().includes(candidateFilter.toLowerCase())
      );
    
    return matchesSearch && matchesFilter;
  });

  const handlePostNewJob = () => {
    navigate('/employer/post-job');
  };

  const handleBrowseCandidates = () => {
    setShowCandidatesDialog(true);
  };

  const handleExportApplications = () => {
    // In real app, this would generate and download CSV
    const csvData = allSampleApplications.map(app => ({
      candidate_name: app.candidate.name,
      candidate_email: app.candidate.email,
      job_title: app.job?.title || 'N/A',
      application_date: new Date(app.applicationDate).toLocaleDateString(),
      status: app.status,
      qualification: app.candidate.profile?.qualifications?.[0] || 'N/A',
      location: `${app.candidate.profile?.location?.city || ''}, ${app.candidate.profile?.location?.state || ''}`,
      salary_expectation: app.salaryExpectation?.amount || 'N/A'
    }));

    // Convert to CSV
    const headers = Object.keys(csvData[0]);
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => headers.map(header => `"${row[header as keyof typeof row]}"`).join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `applications_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewAnalytics = () => {
    navigate('/employer/analytics');
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
        className={`w-3 h-3 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const quickStats = {
    totalJobs: 150,
    activeJobs: 142,
    totalApplications: 650,
    todayApplications: 12,
    pendingReviews: 45,
    scheduledInterviews: 8
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Quick Stats */}
      <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Activity className="w-5 h-5 mr-2" />
            Quick Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{quickStats.activeJobs}</p>
              <p className="text-xs text-gray-600">Active Jobs</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{quickStats.totalApplications}</p>
              <p className="text-xs text-gray-600">Total Applications</p>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">{quickStats.todayApplications}</p>
              <p className="text-xs text-gray-600">Today's Applications</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{quickStats.pendingReviews}</p>
              <p className="text-xs text-gray-600">Pending Reviews</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Primary Actions */}
      <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Target className="w-5 h-5 mr-2" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white shadow-md"
            onClick={handlePostNewJob}
          >
            <Plus className="w-4 h-4 mr-3" />
            Post New Job
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start hover:bg-green-50 border-green-200 text-green-700"
            onClick={handleBrowseCandidates}
          >
            <Users className="w-4 h-4 mr-3" />
            Browse Candidates
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start hover:bg-yellow-50 border-yellow-200 text-yellow-700"
            onClick={handleExportApplications}
          >
            <Download className="w-4 h-4 mr-3" />
            Export Applications
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start hover:bg-purple-50 border-purple-200 text-purple-700"
            onClick={handleViewAnalytics}
          >
            <TrendingUp className="w-4 h-4 mr-3" />
            View Analytics
          </Button>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Clock className="w-5 h-5 mr-2" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-gray-900">New application received</p>
                <p className="text-xs text-gray-500">Aravind Kumar applied for CS Professor role</p>
                <p className="text-xs text-gray-400">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-gray-900">Job posted successfully</p>
                <p className="text-xs text-gray-500">Mathematics Lecturer position is now live</p>
                <p className="text-xs text-gray-400">1 day ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-gray-900">Candidate shortlisted</p>
                <p className="text-xs text-gray-500">Meena Priya moved to interview stage</p>
                <p className="text-xs text-gray-400">2 days ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-gray-900">Interview scheduled</p>
                <p className="text-xs text-gray-500">Meeting set for Vasanth Kannan tomorrow</p>
                <p className="text-xs text-gray-400">3 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pending Tasks */}
      <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <CheckCircle className="w-5 h-5 mr-2" />
            Pending Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-red-900">Review 12 applications</p>
                <p className="text-xs text-red-700">CS Professor position</p>
              </div>
              <Badge variant="destructive">Urgent</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-yellow-900">Schedule 3 interviews</p>
                <p className="text-xs text-yellow-700">Shortlisted candidates waiting</p>
              </div>
              <Badge variant="secondary">Medium</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-blue-900">Update job descriptions</p>
                <p className="text-xs text-blue-700">2 posts need revision</p>
              </div>
              <Badge variant="outline">Low</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Browse Candidates Dialog */}
      <Dialog open={showCandidatesDialog} onOpenChange={setShowCandidatesDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Browse Candidates</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by name, email, or qualification..."
                    value={candidateSearch}
                    onChange={(e) => setCandidateSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={candidateFilter} onValueChange={setCandidateFilter}>
                  <SelectTrigger>
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by qualification" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Qualifications</SelectItem>
                    <SelectItem value="ph.d">Ph.D</SelectItem>
                    <SelectItem value="m.tech">M.Tech/M.E</SelectItem>
                    <SelectItem value="m.sc">M.Sc/M.A</SelectItem>
                    <SelectItem value="b.tech">B.Tech/B.E</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Candidates List */}
            <div className="space-y-4">
              {filteredCandidates.map((candidate) => (
                <div key={candidate.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                        <p className="text-gray-600 text-sm">{candidate.email}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                          <div className="flex items-center">
                            <GraduationCap className="w-4 h-4 mr-1" />
                            {candidate.profile?.qualifications?.[0] || 'Not specified'}
                          </div>
                          <div className="flex items-center">
                            <Briefcase className="w-4 h-4 mr-1" />
                            {getExperienceYears(candidate)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        {getRatingStars(Math.floor(Math.random() * 5) + 1)}
                      </div>
                      <p className="text-xs text-gray-500">
                        {candidate.isVerified ? 'Verified' : 'Pending verification'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      {candidate.phone}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {candidate.profile?.location?.city}, {candidate.profile?.location?.state}
                    </div>
                  </div>

                  {candidate.profile?.bio && (
                    <div className="mb-3">
                      <p className="text-sm text-gray-700 line-clamp-2">{candidate.profile.bio}</p>
                    </div>
                  )}

                  {candidate.profile?.skills && (
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {candidate.profile.skills.slice(0, 4).map((skill, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {candidate.profile.skills.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{candidate.profile.skills.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Available: {candidate.profile?.availability || 'Immediate'}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View Profile
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mail className="w-4 h-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredCandidates.length === 0 && (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search criteria or filters
                  </p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuickActionsPanel;
