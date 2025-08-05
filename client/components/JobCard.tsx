import { Link } from 'react-router-dom';
import { Job } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Building, 
  IndianRupee,
  Bookmark,
  BookmarkCheck 
} from 'lucide-react';
import { useState } from 'react';

interface JobCardProps {
  job: Job;
  isBookmarked?: boolean;
  onBookmark?: (jobId: string) => void;
  showInstitute?: boolean;
}

export default function JobCard({ 
  job, 
  isBookmarked = false, 
  onBookmark,
  showInstitute = true 
}: JobCardProps) {
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    onBookmark?.(job._id);
  };

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

  return (
    <div className={"bg-white rounded-xl border border-gray-200 p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative cursor-pointer\">ive cursor-pointer\"> cursor-pointer\">r\">pointer"}>
      {/* Bookmark Button */}
      <button
        onClick={handleBookmark}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
      >
        {bookmarked ? (
          <BookmarkCheck className="w-5 h-5 text-blue-600" />
        ) : (
          <Bookmark className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {/* Job Header */}
      <div className="mb-4 pr-8">
        <div className="flex items-start justify-between mb-2">
          <Link to={`/jobs/${job._id}`} className="group">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
              {job.title}
            </h3>
          </Link>
        </div>
        
        {showInstitute && (
          <div className="flex items-center space-x-2 mb-2">
            <Building className="w-4 h-4 text-gray-400" />
            <Link 
              to={`/institutes/${job.institute._id}`}
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              {job.institute.name}
            </Link>
          </div>
        )}

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
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {job.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary" className={getTypeColor(job.type)}>
            {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
          </Badge>
          <Badge variant="outline">
            {job.subject}
          </Badge>
          {job.requirements.experience && (
            <Badge variant="outline">
              {job.requirements.experience}
            </Badge>
          )}
        </div>

        {/* Salary */}
        {job.salary.min > 0 && (
          <div className="flex items-center space-x-1 text-green-600 font-medium">
            <IndianRupee className="w-4 h-4" />
            <span>{formatSalary(job.salary.min, job.salary.max)} /month</span>
          </div>
        )}
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
          <Link to={`/jobs/${job._id}`}>
            <Button size="sm">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
