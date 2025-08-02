import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Job } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Building, 
  IndianRupee,
  Users
} from 'lucide-react';

export default function JobsList() {
  const [searchParams] = useSearchParams();
  
  // Mock jobs data
  const mockJobs: Job[] = [
    {
      _id: '1',
      title: 'Assistant Professor - Computer Science',
      description: 'Looking for a passionate Computer Science professor to join our growing department. Experience in AI/ML preferred.',
      subject: 'Computer Science',
      type: 'college',
      location: { city: 'Chennai', state: 'Tamil Nadu', district: 'Chennai' },
      salary: { min: 45000, max: 65000, currency: 'INR' },
      requirements: { education: 'PhD in Computer Science', experience: '2-5 years', skills: ['Python', 'Machine Learning'] },
      institute: { _id: '1', name: 'Anna University', type: 'university', location: { city: 'Chennai', state: 'Tamil Nadu', district: 'Chennai', address: '' }, email: '', phone: '', description: '', established: 1978, isFeatured: true, jobsCount: 12 },
      postedBy: 'employer1',
      postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      isActive: true,
      applicationsCount: 24
    },
    {
      _id: '2',
      title: 'Mathematics Teacher - Higher Secondary',
      description: 'Seeking an experienced Mathematics teacher for Classes 11 and 12.',
      subject: 'Mathematics',
      type: 'school',
      location: { city: 'Coimbatore', state: 'Tamil Nadu', district: 'Coimbatore' },
      salary: { min: 25000, max: 35000, currency: 'INR' },
      requirements: { education: 'M.Sc Mathematics, B.Ed', experience: '3+ years', skills: ['Calculus', 'Algebra'] },
      institute: { _id: '2', name: 'PSG Matriculation School', type: 'school', location: { city: 'Coimbatore', state: 'Tamil Nadu', district: 'Coimbatore', address: '' }, email: '', phone: '', description: '', established: 1985, isFeatured: false, jobsCount: 5 },
      postedBy: 'employer2',
      postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
      isActive: true,
      applicationsCount: 18
    }
  ];

  const formatSalary = (min: number, max: number) => {
    const formatNumber = (num: number) => {
      if (num >= 100000) return `${(num / 100000).toFixed(1)}L`;
      if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
      return num.toString();
    };
    return `₹${formatNumber(min)} - ₹${formatNumber(max)}`;
  };

  const getDaysAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    return `${Math.floor(diffDays / 7)} weeks ago`;
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Faculty Jobs</h1>
            <p className="text-gray-600">
              Find your perfect teaching position from {mockJobs.length} available opportunities
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-600">
            Showing {mockJobs.length} jobs
          </div>
        </div>

        {/* Job Cards */}
        <div className="space-y-6">
          {mockJobs.map((job) => (
            <div key={job._id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
              {/* Job Header */}
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                    {job.title}
                  </h3>
                </div>
                
                <div className="flex items-center space-x-2 mb-2">
                  <Building className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 font-medium">{job.institute.name}</span>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location.city}, {job.location.state}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{getDaysAgo(job.postedDate)}</span>
                  </div>
                </div>
              </div>

              {/* Job Details */}
              <div className="mb-4">
                <p className="text-gray-600 text-sm mb-3">{job.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge className={getTypeColor(job.type)}>
                    {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
                  </Badge>
                  <Badge variant="outline">{job.subject}</Badge>
                  {job.requirements.experience && (
                    <Badge variant="outline">{job.requirements.experience}</Badge>
                  )}
                </div>

                {/* Salary */}
                <div className="flex items-center space-x-1 text-green-600 font-medium">
                  <IndianRupee className="w-4 h-4" />
                  <span>{formatSalary(job.salary.min, job.salary.max)} /month</span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {job.applicationsCount} applicants
                  </span>
                  <Button size="sm">View Details</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
