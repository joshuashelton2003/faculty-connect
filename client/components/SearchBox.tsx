import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, MapPin, GraduationCap } from 'lucide-react';

interface SearchBoxProps {
  className?: string;
  defaultValues?: {
    title?: string;
    location?: string;
    subject?: string;
  };
}

export default function SearchBox({ className = '', defaultValues }: SearchBoxProps) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(defaultValues?.title || '');
  const [location, setLocation] = useState(defaultValues?.location || '');
  const [subject, setSubject] = useState(defaultValues?.subject || '');

  const locations = [
    'Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Trichy', 'Tirunelveli',
    'Erode', 'Vellore', 'Thoothukudi', 'Dindigul', 'Thanjavur', 'Karur',
    'Bangalore', 'Hyderabad', 'Kochi', 'Mysore', 'Vijayawada', 'Vizag'
  ];

  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
    'Electronics', 'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering',
    'English Literature', 'Tamil Literature', 'History', 'Geography', 'Economics',
    'Commerce', 'Management', 'Psychology', 'Sociology', 'Philosophy',
    'Biotechnology', 'Environmental Science', 'Statistics', 'Data Science'
  ];

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    
    if (title.trim()) searchParams.append('title', title.trim());
    if (location) searchParams.append('location', location);
    if (subject) searchParams.append('subject', subject);

    navigate(`/jobs?${searchParams.toString()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg border border-gray-200 p-4 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Job Title/Keywords */}
        <div className="md:col-span-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Job title or keywords"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* Location */}
        <div className="md:col-span-1">
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="h-12">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <SelectValue placeholder="Select location" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All locations</SelectItem>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc.toLowerCase()}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Subject */}
        <div className="md:col-span-1">
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger className="h-12">
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-4 h-4 text-gray-400" />
                <SelectValue placeholder="Select subject" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All subjects</SelectItem>
              {subjects.map((subj) => (
                <SelectItem key={subj} value={subj.toLowerCase()}>
                  {subj}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <div className="md:col-span-1">
          <Button 
            onClick={handleSearch}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700"
          >
            <Search className="w-4 h-4 mr-2" />
            Search Jobs
          </Button>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600 mr-2">Popular searches:</span>
          {['Mathematics Teacher', 'Computer Science Professor', 'English Lecturer', 'Principal'].map((term) => (
            <button
              key={term}
              onClick={() => {
                setTitle(term);
                const searchParams = new URLSearchParams();
                searchParams.append('title', term);
                if (location) searchParams.append('location', location);
                if (subject) searchParams.append('subject', subject);
                navigate(`/jobs?${searchParams.toString()}`);
              }}
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
