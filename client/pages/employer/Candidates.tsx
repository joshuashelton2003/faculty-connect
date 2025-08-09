import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Users,
  GraduationCap,
  MapPin,
  Calendar,
  Star,
  Eye,
  MessageCircle,
  Download,
  BookOpen,
  Award,
  Mail,
  Phone
} from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  education: string;
  specialization: string;
  skills: string[];
  rating: number;
  lastActive: string;
  applications: number;
  profileViews: number;
  availability: 'Available' | 'Employed' | 'Not Available';
  avatar: string;
}

const sampleCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43210',
    location: 'Chennai, Tamil Nadu',
    experience: '8 years',
    education: 'Ph.D. in Computer Science',
    specialization: 'Machine Learning & AI',
    skills: ['Python', 'Machine Learning', 'Data Science', 'Research', 'Deep Learning'],
    rating: 4.8,
    lastActive: '2 hours ago',
    applications: 5,
    profileViews: 127,
    availability: 'Available',
    avatar: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg'
  },
  {
    id: '2',
    name: 'Prof. Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 87654 32109',
    location: 'Coimbatore, Tamil Nadu',
    experience: '12 years',
    education: 'M.E in Mechanical Engineering',
    specialization: 'Manufacturing & Design',
    skills: ['AutoCAD', 'SolidWorks', 'Manufacturing', 'Quality Control', 'Project Management'],
    rating: 4.6,
    lastActive: '1 day ago',
    applications: 3,
    profileViews: 98,
    availability: 'Available',
    avatar: 'https://images.pexels.com/photos/8199625/pexels-photo-8199625.jpeg'
  },
  {
    id: '3',
    name: 'Dr. Meera Nair',
    email: 'meera.nair@email.com',
    phone: '+91 76543 21098',
    location: 'Madurai, Tamil Nadu',
    experience: '6 years',
    education: 'Ph.D. in Mathematics',
    specialization: 'Applied Mathematics',
    skills: ['Statistics', 'Research Methodology', 'Data Analysis', 'MATLAB', 'R Programming'],
    rating: 4.9,
    lastActive: '5 hours ago',
    applications: 7,
    profileViews: 156,
    availability: 'Available',
    avatar: 'https://images.pexels.com/photos/9663015/pexels-photo-9663015.jpeg'
  },
  {
    id: '4',
    name: 'Prof. Arun Krishnan',
    email: 'arun.krishnan@email.com',
    phone: '+91 65432 10987',
    location: 'Tiruchirappalli, Tamil Nadu',
    experience: '15 years',
    education: 'M.Sc in Physics',
    specialization: 'Quantum Physics',
    skills: ['Physics', 'Laboratory Management', 'Research', 'Scientific Writing', 'Instrumentation'],
    rating: 4.7,
    lastActive: '3 days ago',
    applications: 2,
    profileViews: 89,
    availability: 'Employed',
    avatar: 'https://images.pexels.com/photos/2676888/pexels-photo-2676888.jpeg'
  },
  {
    id: '5',
    name: 'Dr. Lakshmi Devi',
    email: 'lakshmi.devi@email.com',
    phone: '+91 54321 09876',
    location: 'Chennai, Tamil Nadu',
    experience: '4 years',
    education: 'Ph.D. in Chemistry',
    specialization: 'Organic Chemistry',
    skills: ['Chemistry', 'Laboratory Safety', 'Research', 'Spectroscopy', 'Green Chemistry'],
    rating: 4.5,
    lastActive: '1 week ago',
    applications: 4,
    profileViews: 76,
    availability: 'Available',
    avatar: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg'
  }
];

const Candidates: React.FC = () => {
  const [candidates] = useState<Candidate[]>(sampleCandidates);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [specializationFilter, setSpecializationFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  // Filter and sort candidates
  const filteredCandidates = candidates
    .filter(candidate => {
      const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          candidate.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesLocation = locationFilter === 'all' || candidate.location.includes(locationFilter);
      const matchesSpecialization = specializationFilter === 'all' || candidate.specialization.includes(specializationFilter);
      const matchesAvailability = availabilityFilter === 'all' || candidate.availability === availabilityFilter;
      
      return matchesSearch && matchesLocation && matchesSpecialization && matchesAvailability;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return parseInt(b.experience) - parseInt(a.experience);
        case 'lastActive':
          return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
        default:
          return 0;
      }
    });

  const handleContactCandidate = (candidate: Candidate) => {
    // In a real app, this would open a contact form or messaging system
    alert(`Contacting ${candidate.name} at ${candidate.email}`);
  };

  const handleViewProfile = (candidate: Candidate) => {
    // In a real app, this would navigate to detailed profile view
    alert(`Viewing full profile for ${candidate.name}`);
  };

  const handleDownloadResume = (candidate: Candidate) => {
    // In a real app, this would download the candidate's resume
    alert(`Downloading resume for ${candidate.name}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Faculty Candidates</h1>
          <p className="text-gray-600">Browse and connect with qualified faculty candidates</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600">{filteredCandidates.length}</p>
          <p className="text-sm text-gray-600">Candidates Found</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search candidates..."
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
                <SelectItem value="Madurai">Madurai</SelectItem>
                <SelectItem value="Tiruchirappalli">Tiruchirappalli</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Specializations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specializations</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Mechanical">Mechanical Engineering</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="Chemistry">Chemistry</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Availability</SelectItem>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Employed">Currently Employed</SelectItem>
                <SelectItem value="Not Available">Not Available</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="experience">Experience</SelectItem>
                <SelectItem value="lastActive">Last Active</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.map((candidate, index) => (
          <motion.div
            key={candidate.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300 h-full">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={candidate.avatar}
                      alt={candidate.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-gray-900 truncate">
                      {candidate.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">{candidate.specialization}</p>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{candidate.rating}</span>
                    </div>
                  </div>
                  <Badge
                    variant={candidate.availability === 'Available' ? 'default' : 'secondary'}
                    className={candidate.availability === 'Available' ? 'bg-green-100 text-green-800' : ''}
                  >
                    {candidate.availability}
                  </Badge>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    {candidate.education}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {candidate.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <BookOpen className="w-4 h-4 mr-2" />
                    {candidate.experience} experience
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Active {candidate.lastActive}
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Key Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.slice(0, 3).map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {candidate.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs text-gray-500">
                        +{candidate.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="text-center p-2 bg-[#DDDAD0] rounded">
                    <p className="font-medium text-gray-900">{candidate.applications}</p>
                    <p className="text-gray-600">Applications</p>
                  </div>
                  <div className="text-center p-2 bg-[#DDDAD0] rounded">
                    <p className="font-medium text-gray-900">{candidate.profileViews}</p>
                    <p className="text-gray-600">Profile Views</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewProfile(candidate)}
                      className="flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      View Profile
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadResume(candidate)}
                      className="flex items-center gap-1"
                    >
                      <Download className="w-4 h-4" />
                      Resume
                    </Button>
                  </div>
                  <Button
                    onClick={() => handleContactCandidate(candidate)}
                    className="w-full flex items-center gap-2"
                    disabled={candidate.availability === 'Not Available'}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Contact Candidate
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredCandidates.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
            <p className="text-gray-600">Try adjusting your search filters to find more candidates.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Candidates;
