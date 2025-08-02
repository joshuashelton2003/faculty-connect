import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Institute } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import InstituteCard from '@/components/InstituteCard';
import { 
  Filter, 
  MapPin, 
  Building,
  Star,
  Search,
  X
} from 'lucide-react';

export default function Institutes() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || '');
  const [locationFilter, setLocationFilter] = useState(searchParams.get('location') || '');
  const [featuredOnly, setFeaturedOnly] = useState(searchParams.get('featured') === 'true');

  // Mock data for demonstration
  const [mockInstitutes] = useState<Institute[]>([
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
      name: 'Madurai Kamaraj University',
      type: 'university',
      location: { 
        city: 'Madurai', 
        state: 'Tamil Nadu', 
        district: 'Madurai', 
        address: 'Palkalaiperur, Madurai - 625021' 
      },
      email: 'info@mkuniversity.ac.in',
      phone: '+91 452 245 8471',
      website: 'https://www.mkuniversity.ac.in',
      description: 'Madurai Kamaraj University is a public university established in 1966. It offers courses in arts, science, management, and other fields with a strong focus on research and innovation.',
      established: 1966,
      isFeatured: true,
      jobsCount: 15
    },
    {
      _id: '4',
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
    },
    {
      _id: '5',
      name: 'Thiagarajar College of Engineering',
      type: 'college',
      location: { 
        city: 'Madurai', 
        state: 'Tamil Nadu', 
        district: 'Madurai', 
        address: 'Thiruparankundram, Madurai - 625015' 
      },
      email: 'info@tce.edu',
      phone: '+91 452 248 2240',
      website: 'https://www.tce.edu',
      description: 'Thiagarajar College of Engineering is an autonomous engineering college established in 1957. It offers undergraduate and postgraduate programs in engineering and technology.',
      established: 1957,
      isFeatured: false,
      jobsCount: 4
    },
    {
      _id: '6',
      name: 'Government Polytechnic College',
      type: 'polytechnic',
      location: { 
        city: 'Trichy', 
        state: 'Tamil Nadu', 
        district: 'Tiruchirappalli', 
        address: 'Woraiyur, Tiruchirappalli - 620003' 
      },
      email: 'info@gptrichy.ac.in',
      phone: '+91 431 270 0123',
      description: 'Government Polytechnic College Trichy is one of the oldest polytechnic institutions in Tamil Nadu, offering diploma courses in various engineering disciplines.',
      established: 1965,
      isFeatured: false,
      jobsCount: 7
    },
    {
      _id: '7',
      name: 'DAV Public School',
      type: 'school',
      location: { 
        city: 'Chennai', 
        state: 'Tamil Nadu', 
        district: 'Chennai', 
        address: 'T Nagar, Chennai - 600017' 
      },
      email: 'info@davchennai.edu.in',
      phone: '+91 44 2434 5678',
      description: 'DAV Public School is a premier educational institution providing quality education from kindergarten to higher secondary level with a focus on holistic development.',
      established: 1985,
      isFeatured: false,
      jobsCount: 3
    },
    {
      _id: '8',
      name: 'Sree Saraswathi Thyagaraja College',
      type: 'college',
      location: { 
        city: 'Pollachi', 
        state: 'Tamil Nadu', 
        district: 'Coimbatore', 
        address: 'Pollachi - 642107' 
      },
      email: 'info@sstcollege.ac.in',
      phone: '+91 4259 224 567',
      description: 'A leading arts and science college offering undergraduate and postgraduate programs in various disciplines with emphasis on quality education and research.',
      established: 1967,
      isFeatured: false,
      jobsCount: 5
    }
  ]);

  // Filter institutes based on search criteria
  const filteredInstitutes = mockInstitutes.filter(institute => {
    if (searchTerm && !institute.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (typeFilter && institute.type !== typeFilter) return false;
    if (locationFilter && !institute.location.city.toLowerCase().includes(locationFilter.toLowerCase())) return false;
    if (featuredOnly && !institute.isFeatured) return false;
    return true;
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (typeFilter) params.set('type', typeFilter);
    if (locationFilter) params.set('location', locationFilter);
    if (featuredOnly) params.set('featured', 'true');
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setTypeFilter('');
    setLocationFilter('');
    setFeaturedOnly(false);
    setSearchParams(new URLSearchParams());
  };

  const activeFiltersCount = [searchTerm, typeFilter, locationFilter, featuredOnly].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50">
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

          {/* Search and Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              {/* Search */}
              <div className="md:col-span-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search institutions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Institution Type */}
              <div className="md:col-span-1">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <div className="flex items-center space-x-2">
                      <Building className="w-4 h-4 text-gray-400" />
                      <SelectValue placeholder="All types" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All types</SelectItem>
                    <SelectItem value="school">School</SelectItem>
                    <SelectItem value="college">College</SelectItem>
                    <SelectItem value="university">University</SelectItem>
                    <SelectItem value="polytechnic">Polytechnic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div className="md:col-span-1">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Enter city"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="md:col-span-1">
                <Button onClick={handleSearch} className="w-full">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            {/* Featured Filter and Clear */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featuredOnly}
                    onChange={(e) => setFeaturedOnly(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-500" />
                    Featured only
                  </span>
                </label>
              </div>

              {activeFiltersCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="w-4 h-4 mr-1" />
                  Clear filters ({activeFiltersCount})
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-600">
            Showing {filteredInstitutes.length} of {mockInstitutes.length} institutions
          </div>
        </div>

        {/* Institutes Grid */}
        {filteredInstitutes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredInstitutes.map((institute) => (
              <InstituteCard key={institute._id} institute={institute} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏫</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No institutions found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria to find more institutions.
            </p>
            <Button onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        )}

        {/* Load More Button */}
        {filteredInstitutes.length > 0 && filteredInstitutes.length >= 12 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Institutions
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
