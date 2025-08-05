import { Link } from 'react-router-dom';
import { Institute } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Calendar, 
  Globe, 
  Mail, 
  Phone,
  Briefcase,
  Star
} from 'lucide-react';

interface InstituteCardProps {
  institute: Institute;
  showJobsCount?: boolean;
}

export default function InstituteCard({ 
  institute, 
  showJobsCount = true 
}: InstituteCardProps) {
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
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer">
      {/* Institute Header */}
      <div className="flex items-start space-x-4 mb-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          {institute.logo ? (
            <img
              src={institute.logo}
              alt={`${institute.name} logo`}
              className="w-16 h-16 rounded-lg object-cover border border-gray-200"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 font-semibold text-lg">
                {institute.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
              </span>
            </div>
          )}
        </div>

        {/* Institute Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <Link to={`/institutes/${institute._id}`} className="group">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                {institute.name}
              </h3>
            </Link>
            {institute.isFeatured && (
              <Badge className="bg-yellow-100 text-yellow-800 ml-2">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>

          <div className="flex items-center space-x-2 mb-2">
            <Badge variant="secondary" className={getTypeColor(institute.type)}>
              {institute.type.charAt(0).toUpperCase() + institute.type.slice(1)}
            </Badge>
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>Est. {institute.established}</span>
            </div>
          </div>

          <div className="flex items-center space-x-1 text-sm text-gray-500 mb-2">
            <MapPin className="w-4 h-4" />
            <span>{institute.location.city}, {institute.location.state}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
        {institute.description}
      </p>

      {/* Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 text-sm">
        {institute.email && (
          <div className="flex items-center space-x-2 text-gray-500">
            <Mail className="w-4 h-4" />
            <a 
              href={`mailto:${institute.email}`}
              className="hover:text-blue-600 transition-colors truncate"
            >
              {institute.email}
            </a>
          </div>
        )}
        
        {institute.phone && (
          <div className="flex items-center space-x-2 text-gray-500">
            <Phone className="w-4 h-4" />
            <a 
              href={`tel:${institute.phone}`}
              className="hover:text-blue-600 transition-colors"
            >
              {institute.phone}
            </a>
          </div>
        )}

        {institute.website && (
          <div className="flex items-center space-x-2 text-gray-500 sm:col-span-2">
            <Globe className="w-4 h-4" />
            <a 
              href={institute.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors truncate"
            >
              {institute.website.replace(/^https?:\/\//, '')}
            </a>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        {showJobsCount && (
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Briefcase className="w-4 h-4" />
            <span>
              {institute.jobsCount} open position{institute.jobsCount !== 1 ? 's' : ''}
            </span>
          </div>
        )}

        <div className="flex items-center space-x-2">
          {institute.jobsCount > 0 && (
            <Link to={`/jobs?institute=${institute._id}`}>
              <Button variant="outline" size="sm">
                View Jobs
              </Button>
            </Link>
          )}
          <Link to={`/institutes/${institute._id}`}>
            <Button size="sm">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
