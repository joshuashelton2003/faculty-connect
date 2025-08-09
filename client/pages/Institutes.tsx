import { useState } from 'react';
import { Institute } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Calendar, 
  Building,
  Star,
  Mail,
  Phone,
  Globe,
  Briefcase
} from 'lucide-react';

export default function Institutes() {
  // Mock data for demonstration
  const mockInstitutes: Institute[] = [
    {
      _id: '1',
      name: 'Anna University',
      type: 'university',
      location: { 
        city: 'Chennai', 
        state: 'Tamil Nadu', 
        district: 'Chennai', 
        address: 'Sardar Patel Road, Guindy, Chennai - 600025' 
      },
      email: 'info@annauniv.edu',
      phone: '+91 44 2235 0449',
      website: 'https://www.annauniv.edu',
      description: 'Anna University is a premier technical university in Tamil Nadu, established in 1978. It offers undergraduate, postgraduate and doctoral programs in various fields of engineering, technology, and applied sciences.',
      established: 1978,
      isFeatured: true,
      jobsCount: 12
    },
    {
      _id: '2',
      name: 'Indian Institute of Technology Madras',
      type: 'university',
      location: { 
        city: 'Chennai', 
        state: 'Tamil Nadu', 
        district: 'Chennai', 
        address: 'IIT P.O., Chennai - 600036' 
      },
      email: 'info@iitm.ac.in',
      phone: '+91 44 2257 4802',
      website: 'https://www.iitm.ac.in',
      description: 'One of the premier engineering institutions in India, known for excellence in technical education and research. IIT Madras has been consistently ranked as the top engineering institute in India.',
      established: 1959,
      isFeatured: true,
      jobsCount: 8
    },
    {
      _id: '3',
      name: 'PSG College of Technology',
      type: 'college',
      location: { 
        city: 'Coimbatore', 
        state: 'Tamil Nadu', 
        district: 'Coimbatore', 
        address: 'Avinashi Road, Peelamedu, Coimbatore - 641004' 
      },
      email: 'info@psgtech.edu',
      phone: '+91 422 257 2177',
      website: 'https://www.psgtech.edu',
      description: 'PSG College of Technology is a premier engineering institution established in 1951. Known for its excellent academic programs and industry connections.',
      established: 1951,
      isFeatured: false,
      jobsCount: 6
    }
  ];

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
    <div className="min-h-screen bg-[#DDDAD0]">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Educational Institutions</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover leading educational institutions across Tamil Nadu and South India. 
              Find schools, colleges, universities, and polytechnics that are actively hiring faculty.
            </p>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-600">
            Showing {mockInstitutes.length} institutions
          </div>
        </div>

        {/* Institutes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockInstitutes.map((institute) => (
            <div key={institute._id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
              {/* Institute Header */}
              <div className="flex items-start space-x-4 mb-4">
                {/* Logo Placeholder */}
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-400 font-semibold text-lg">
                    {institute.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
                  </span>
                </div>

                {/* Institute Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                      {institute.name}
                    </h3>
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
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {institute.description}
              </p>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 text-sm">
                {institute.email && (
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{institute.email}</span>
                  </div>
                )}
                
                {institute.phone && (
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Phone className="w-4 h-4" />
                    <span>{institute.phone}</span>
                  </div>
                )}

                {institute.website && (
                  <div className="flex items-center space-x-2 text-gray-500 sm:col-span-2">
                    <Globe className="w-4 h-4" />
                    <span className="truncate">{institute.website.replace(/^https?:\/\//, '')}</span>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Briefcase className="w-4 h-4" />
                  <span>
                    {institute.jobsCount} open position{institute.jobsCount !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  {institute.jobsCount > 0 && (
                    <Button variant="outline" size="sm">
                      View Jobs
                    </Button>
                  )}
                  <Button size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
