import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useJobsStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { 
  ArrowLeft, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  Users, 
  Calendar,
  MapPin,
  Briefcase,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter
} from 'lucide-react';

interface JobFormData {
  title: string;
  shortDescription: string;
  description: string;
  department: string;
  subject: string;
  location: {
    country: string;
    state: string;
    district: string;
    city: string;
    pincode: string;
    address: string;
  };
  salary: {
    min: number;
    max: number;
    currency: string;
    negotiable: boolean;
  };
  requirements: {
    education: string[];
    experience: string;
    skills: string[];
    certifications: string[];
  };
  responsibilities: string[];
  benefits: string[];
  employmentType: 'full-time' | 'part-time' | 'contract' | 'visiting';
  workMode: 'on-site' | 'remote' | 'hybrid';
  applicationTypes: string[];
  deadline: string;
  positions: number;
  tags: string[];
}

const initialJobForm: JobFormData = {
  title: '',
  shortDescription: '',
  description: '',
  department: '',
  subject: '',
  location: {
    country: 'India',
    state: 'Tamil Nadu',
    district: '',
    city: '',
    pincode: '',
    address: ''
  },
  salary: {
    min: 30000,
    max: 80000,
    currency: 'INR',
    negotiable: true
  },
  requirements: {
    education: [],
    experience: '',
    skills: [],
    certifications: []
  },
  responsibilities: [],
  benefits: [],
  employmentType: 'full-time',
  workMode: 'on-site',
  applicationTypes: ['online'],
  deadline: '',
  positions: 1,
  tags: []
};

const MyJobs: React.FC = () => {
  const navigate = useNavigate();
  const { jobs, fetchJobs, createJob, updateJob, deleteJob, isLoading } = useJobsStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingJob, setEditingJob] = useState<any>(null);
  const [jobForm, setJobForm] = useState<JobFormData>(initialJobForm);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Filter jobs (in real app, these would be employer's jobs only)
  const employerJobs = jobs.filter(job => job.isActive || statusFilter === 'all');
  
  const filteredJobs = employerJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && job.isActive) ||
                         (statusFilter === 'inactive' && !job.isActive);
    return matchesSearch && matchesStatus;
  });

  // Calculate statistics
  const stats = {
    activeJobs: employerJobs.filter(job => job.isActive).length,
    totalApplications: employerJobs.reduce((sum, job) => sum + job.applicationCount, 0),
    totalViews: employerJobs.reduce((sum, job) => sum + job.viewCount, 0),
    avgApplicationsPerJob: employerJobs.length > 0 ? 
      Math.round(employerJobs.reduce((sum, job) => sum + job.applicationCount, 0) / employerJobs.length) : 0
  };

  const handleCreateJob = async () => {
    try {
      await createJob({
        ...jobForm,
        instituteId: 'inst_001', // In real app, get from logged in employer
        employerId: 'emp_001'
      });
      setShowCreateDialog(false);
      setJobForm(initialJobForm);
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  const handleEditJob = async () => {
    if (editingJob) {
      try {
        await updateJob(editingJob.id, jobForm);
        setShowEditDialog(false);
        setEditingJob(null);
        setJobForm(initialJobForm);
      } catch (error) {
        console.error('Error updating job:', error);
      }
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    try {
      await deleteJob(jobId);
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const openEditDialog = (job: any) => {
    setEditingJob(job);
    setJobForm({
      title: job.title,
      shortDescription: job.shortDescription,
      description: job.description,
      department: job.department,
      subject: job.subject,
      location: job.location,
      salary: job.salary,
      requirements: job.requirements,
      responsibilities: job.responsibilities,
      benefits: job.benefits,
      employmentType: job.employmentType,
      workMode: job.workMode,
      applicationTypes: job.applicationTypes,
      deadline: job.deadline.split('T')[0], // Format for date input
      positions: job.positions,
      tags: job.tags
    });
    setShowEditDialog(true);
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (isActive: boolean) => {
    return isActive ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />;
  };

  const JobFormFields = () => (
    <div className="space-y-4 py-4 max-h-96 overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Job Title *</Label>
          <Input
            id="title"
            value={jobForm.title}
            onChange={(e) => setJobForm(prev => ({ ...prev, title: e.target.value }))}
            placeholder="e.g., Assistant Professor - Computer Science"
            required
          />
        </div>
        <div>
          <Label htmlFor="department">Department *</Label>
          <Input
            id="department"
            value={jobForm.department}
            onChange={(e) => setJobForm(prev => ({ ...prev, department: e.target.value }))}
            placeholder="e.g., Computer Science"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="shortDescription">Short Description *</Label>
        <Textarea
          id="shortDescription"
          value={jobForm.shortDescription}
          onChange={(e) => setJobForm(prev => ({ ...prev, shortDescription: e.target.value }))}
          placeholder="Brief description of the role..."
          rows={2}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Full Description *</Label>
        <Textarea
          id="description"
          value={jobForm.description}
          onChange={(e) => setJobForm(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Detailed job description, requirements, and responsibilities..."
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="employmentType">Employment Type *</Label>
          <Select value={jobForm.employmentType} onValueChange={(value: any) => setJobForm(prev => ({ ...prev, employmentType: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full-Time</SelectItem>
              <SelectItem value="part-time">Part-Time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="visiting">Visiting</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="workMode">Work Mode</Label>
          <Select value={jobForm.workMode} onValueChange={(value: any) => setJobForm(prev => ({ ...prev, workMode: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="on-site">On-Site</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="positions">Number of Positions</Label>
          <Input
            id="positions"
            type="number"
            min="1"
            value={jobForm.positions}
            onChange={(e) => setJobForm(prev => ({ ...prev, positions: parseInt(e.target.value) || 1 }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="salaryMin">Minimum Salary (₹) *</Label>
          <Input
            id="salaryMin"
            type="number"
            value={jobForm.salary.min}
            onChange={(e) => setJobForm(prev => ({ 
              ...prev, 
              salary: { ...prev.salary, min: parseInt(e.target.value) || 0 }
            }))}
            placeholder="30000"
            required
          />
        </div>
        <div>
          <Label htmlFor="salaryMax">Maximum Salary (₹) *</Label>
          <Input
            id="salaryMax"
            type="number"
            value={jobForm.salary.max}
            onChange={(e) => setJobForm(prev => ({ 
              ...prev, 
              salary: { ...prev.salary, max: parseInt(e.target.value) || 0 }
            }))}
            placeholder="80000"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="experience">Experience Required</Label>
          <Input
            id="experience"
            value={jobForm.requirements.experience}
            onChange={(e) => setJobForm(prev => ({ 
              ...prev, 
              requirements: { ...prev.requirements, experience: e.target.value }
            }))}
            placeholder="e.g., 2-5 years"
          />
        </div>
        <div>
          <Label htmlFor="deadline">Application Deadline *</Label>
          <Input
            id="deadline"
            type="date"
            value={jobForm.deadline}
            onChange={(e) => setJobForm(prev => ({ ...prev, deadline: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            value={jobForm.location.city}
            onChange={(e) => setJobForm(prev => ({ 
              ...prev, 
              location: { ...prev.location, city: e.target.value }
            }))}
            placeholder="Chennai"
            required
          />
        </div>
        <div>
          <Label htmlFor="district">District *</Label>
          <Input
            id="district"
            value={jobForm.location.district}
            onChange={(e) => setJobForm(prev => ({ 
              ...prev, 
              location: { ...prev.location, district: e.target.value }
            }))}
            placeholder="Chennai"
            required
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#DDDAD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/employer/dashboard')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">My Jobs</h1>
              <p className="text-gray-600">
                Manage your job postings and track applications
              </p>
            </div>
            
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 shadow-md">
                  <Plus className="w-4 h-4 mr-2" />
                  Post New Job
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Post New Job</DialogTitle>
                </DialogHeader>
                <JobFormFields />
                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateJob} disabled={isLoading}>
                    {isLoading ? 'Creating...' : 'Post Job'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeJobs}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalApplications}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Eye className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
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
                  <p className="text-sm font-medium text-gray-600">Avg. Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.avgApplicationsPerJob}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="bg-white border border-gray-200 shadow-md rounded-xl mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search jobs by title or subject..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Jobs</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Jobs List */}
        <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
          <CardHeader>
            <CardTitle>Posted Jobs ({filteredJobs.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900">{job.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{job.shortDescription}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location.city}, {job.location.state}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Deadline: {new Date(job.deadline).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <Badge className={getStatusColor(job.isActive)}>
                      {getStatusIcon(job.isActive)}
                      <span className="ml-1">{job.isActive ? 'Active' : 'Inactive'}</span>
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {job.applicationCount} applications
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {job.viewCount} views
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-1" />
                      ₹{job.salary.min.toLocaleString()} - ₹{job.salary.max.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Posted {new Date(job.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate(`/employer/applications/${job.id}`)}
                        className="hover:bg-blue-50"
                      >
                        <Users className="w-4 h-4 mr-2" />
                        View Applications ({job.applicationCount})
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditDialog(job)}
                        className="hover:bg-yellow-50"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="outline" className="hover:bg-red-50 text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Job</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{job.title}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteJob(job.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              ))}

              {filteredJobs.length === 0 && (
                <div className="text-center py-12">
                  <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm || statusFilter !== 'all' 
                      ? 'Try adjusting your search or filters' 
                      : 'You haven\'t posted any jobs yet'
                    }
                  </p>
                  <Button onClick={() => setShowCreateDialog(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Post Your First Job
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Edit Job Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Edit Job</DialogTitle>
            </DialogHeader>
            <JobFormFields />
            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditJob} disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update Job'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MyJobs;
