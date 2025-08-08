import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useJobCRUD, CreateJobData } from "@/hooks/useJobCRUD";
import JobCard, { JobData } from "@/components/JobCard";
import {
  Plus,
  Search,
  Filter,
  BarChart3,
  RefreshCw,
  Users,
  Briefcase,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

const JobManager: React.FC = () => {
  const {
    jobs,
    loading,
    error,
    createJob,
    getJobs,
    updateJob,
    deleteJob,
    toggleJobStatus,
    resetToSampleData,
    getJobStats,
    clearError,
  } = useJobCRUD();

  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingJob, setEditingJob] = useState<JobData | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobData | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  // Form states for create/edit
  const [formData, setFormData] = useState<CreateJobData>({
    title: "",
    institution: "",
    location: "",
    jobType: "Full-Time",
    responsibilities: [],
    requirements: [],
    preferredSkills: [],
    salary: "",
    deadline: "",
  });

  // Get filtered jobs
  const filteredJobs = getJobs({
    title: searchTerm,
    location: locationFilter === "all" ? "" : locationFilter,
    jobType: typeFilter === "all" ? "" : typeFilter,
    isActive:
      statusFilter === "active"
        ? true
        : statusFilter === "inactive"
          ? false
          : undefined,
  });

  const stats = getJobStats();

  // Handle create job
  const handleCreateJob = async () => {
    try {
      await createJob(formData);
      setShowCreateDialog(false);
      resetForm();
    } catch (err) {
      console.error("Error creating job:", err);
    }
  };

  // Handle edit job
  const handleEditJob = async () => {
    if (!editingJob) return;

    try {
      await updateJob(editingJob.id, formData);
      setShowEditDialog(false);
      setEditingJob(null);
      resetForm();
    } catch (err) {
      console.error("Error updating job:", err);
    }
  };

  // Handle view details
  const handleViewDetails = (job: JobData) => {
    setSelectedJob(job);
    setShowDetailsDialog(true);
  };

  // Handle apply
  const handleApply = (job: JobData) => {
    alert(`Application initiated for: ${job.title} at ${job.institution}`);
  };

  // Handle edit action
  const handleEdit = (job: JobData) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      institution: job.institution,
      location: job.location,
      jobType: job.jobType,
      responsibilities: job.responsibilities,
      requirements: job.requirements,
      preferredSkills: job.preferredSkills,
      salary: job.salary || "",
      deadline: job.deadline,
    });
    setShowEditDialog(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      institution: "",
      location: "",
      jobType: "Full-Time",
      responsibilities: [],
      requirements: [],
      preferredSkills: [],
      salary: "",
      deadline: "",
    });
  };

  // Parse comma-separated strings to arrays
  const parseToArray = (str: string): string[] => {
    return str
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Management</h1>
          <p className="text-gray-600">
            Create, update, and manage job listings
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={resetToSampleData}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Reset Data
          </Button>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Create Job
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Job</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new job listing.
                </DialogDescription>
              </DialogHeader>
              <JobForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleCreateJob}
                onCancel={() => setShowCreateDialog(false)}
                loading={loading}
                parseToArray={parseToArray}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            {error}
            <Button variant="ghost" size="sm" onClick={clearError}>
              Dismiss
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalJobs}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.activeJobs}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Applicants
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalApplicants}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Avg Applicants
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.averageApplicants}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="Chennai">Chennai</SelectItem>
                <SelectItem value="Coimbatore">Coimbatore</SelectItem>
                <SelectItem value="Tiruchirappalli">Tiruchirappalli</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Full-Time">Full-Time</SelectItem>
                <SelectItem value="Part-Time">Part-Time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Job Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job, index) => (
          <JobCard
            key={job.id}
            job={job}
            onViewDetails={handleViewDetails}
            onApply={handleApply}
            onEdit={handleEdit}
            onDelete={deleteJob}
            showAdminActions={true}
            index={index}
          />
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No jobs found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters or create a new job.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Job</DialogTitle>
            <DialogDescription>Update the job details below.</DialogDescription>
          </DialogHeader>
          <JobForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleEditJob}
            onCancel={() => {
              setShowEditDialog(false);
              setEditingJob(null);
              resetForm();
            }}
            loading={loading}
            parseToArray={parseToArray}
          />
        </DialogContent>
      </Dialog>

      {/* Job Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedJob?.title}</DialogTitle>
            <DialogDescription>
              {selectedJob?.institution} • {selectedJob?.location}
            </DialogDescription>
          </DialogHeader>
          {selectedJob && <JobDetails job={selectedJob} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Job Form Component
interface JobFormProps {
  formData: CreateJobData;
  setFormData: (data: CreateJobData) => void;
  onSubmit: () => void;
  onCancel: () => void;
  loading: boolean;
  parseToArray: (str: string) => string[];
}

const JobForm: React.FC<JobFormProps> = ({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  loading,
  parseToArray,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Job Title</label>
          <Input
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="e.g., Assistant Professor - Computer Science"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Institution</label>
          <Input
            value={formData.institution}
            onChange={(e) =>
              setFormData({ ...formData, institution: e.target.value })
            }
            placeholder="e.g., Anna University"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Location</label>
          <Input
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            placeholder="e.g., Chennai, Tamil Nadu"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Job Type</label>
          <Select
            value={formData.jobType}
            onValueChange={(value: any) =>
              setFormData({ ...formData, jobType: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Full-Time">Full-Time</SelectItem>
              <SelectItem value="Part-Time">Part-Time</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Salary (Optional)
          </label>
          <Input
            value={formData.salary}
            onChange={(e) =>
              setFormData({ ...formData, salary: e.target.value })
            }
            placeholder="e.g., ₹60,000 - ₹85,000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Deadline</label>
          <Input
            value={formData.deadline}
            onChange={(e) =>
              setFormData({ ...formData, deadline: e.target.value })
            }
            placeholder="e.g., 15 days left"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Responsibilities (comma-separated)
        </label>
        <Input
          value={formData.responsibilities.join(", ")}
          onChange={(e) =>
            setFormData({
              ...formData,
              responsibilities: parseToArray(e.target.value),
            })
          }
          placeholder="e.g., Deliver lectures, Prepare materials, Guide students"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Requirements (comma-separated)
        </label>
        <Input
          value={formData.requirements.join(", ")}
          onChange={(e) =>
            setFormData({
              ...formData,
              requirements: parseToArray(e.target.value),
            })
          }
          placeholder="e.g., M.E/M.Tech degree, Teaching experience, Communication skills"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Preferred Skills (comma-separated)
        </label>
        <Input
          value={formData.preferredSkills.join(", ")}
          onChange={(e) =>
            setFormData({
              ...formData,
              preferredSkills: parseToArray(e.target.value),
            })
          }
          placeholder="e.g., OBE knowledge, LMS experience, Research skills"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          onClick={onSubmit}
          disabled={loading || !formData.title || !formData.institution}
        >
          {loading ? "Saving..." : "Save Job"}
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

// Job Details Component
const JobDetails: React.FC<{ job: JobData }> = ({ job }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold text-gray-900 mb-1">Job Type</h4>
          <Badge variant="outline">{job.jobType}</Badge>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-1">Status</h4>
          <Badge variant={job.isActive ? "default" : "secondary"}>
            {job.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-1">Applicants</h4>
          <p className="text-gray-600">{job.applicants}</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-1">Deadline</h4>
          <p className="text-gray-600">{job.deadline}</p>
        </div>
      </div>

      {job.salary && (
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Salary Range</h4>
          <p className="text-green-600 font-medium">{job.salary}</p>
        </div>
      )}

      <div>
        <h4 className="font-semibold text-gray-900 mb-2">Responsibilities</h4>
        <ul className="space-y-1">
          {job.responsibilities.map((resp, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span className="text-gray-700">{resp}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-2">Requirements</h4>
        <ul className="space-y-1">
          {job.requirements.map((req, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span className="text-gray-700">{req}</span>
            </li>
          ))}
        </ul>
      </div>

      {job.preferredSkills.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Preferred Skills</h4>
          <div className="flex flex-wrap gap-2">
            {job.preferredSkills.map((skill, idx) => (
              <Badge key={idx} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobManager;
