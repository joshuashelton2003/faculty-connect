// ==========================================
// FacultyConnect - Premium Filter Sidebar
// Modern, Animated, Professional Filter Component
// ==========================================

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useJobsStore } from '@/store';
import { JobFilters } from '@/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft,
  Filter, 
  X, 
  Search,
  IndianRupee, 
  GraduationCap, 
  MapPin, 
  FileText,
  RotateCcw,
  Building,
  Clock,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';

interface PremiumFilterSidebarProps {
  className?: string;
  showBackButton?: boolean;
}

const qualificationOptions = [
  { value: 'be-btech', label: 'B.E / B.Tech', icon: '🎓' },
  { value: 'me-mtech', label: 'M.E / M.Tech', icon: '🎓' },
  { value: 'msc-ma', label: 'M.Sc / M.A', icon: '📚' },
  { value: 'bed', label: 'B.Ed', icon: '👨‍🏫' },
  { value: 'phd', label: 'Ph.D', icon: '🎓' },
  { value: 'net-slet', label: 'NET / SLET Qualified', icon: '🏆' },
];

const instituteTypeOptions = [
  { value: 'engineering-college', label: 'Engineering College', icon: '🏗️' },
  { value: 'arts-science-college', label: 'Arts & Science College', icon: '🎨' },
  { value: 'polytechnic', label: 'Polytechnic', icon: '⚙️' },
  { value: 'iti', label: 'ITI', icon: '🔧' },
  { value: 'school', label: 'School', icon: '���' },
  { value: 'university', label: 'University', icon: '🏛️' },
];

const applicationTypeOptions = [
  { value: 'online', label: 'Apply Online', icon: '💻' },
  { value: 'email', label: 'Email Resume', icon: '📧' },
  { value: 'walk-in', label: 'Walk-in Interview', icon: '🚶‍♂️' },
];

const experienceOptions = [
  { value: 'fresher', label: 'Fresher (0 years)', icon: '🌱' },
  { value: '1-3', label: '1-3 years', icon: '📈' },
  { value: '3-5', label: '3-5 years', icon: '💼' },
  { value: '5+', label: '5+ years', icon: '👑' },
];

const locationData = {
  countries: [
    { value: 'india', label: '🇮🇳 India' },
    { value: 'usa', label: '🇺🇸 United States' },
    { value: 'uk', label: '🇬🇧 United Kingdom' },
    { value: 'canada', label: '🇨🇦 Canada' },
  ],
  states: {
    india: [
      { value: 'tamil-nadu', label: 'Tamil Nadu' },
      { value: 'karnataka', label: 'Karnataka' },
      { value: 'kerala', label: 'Kerala' },
      { value: 'maharashtra', label: 'Maharashtra' },
      { value: 'gujarat', label: 'Gujarat' },
      { value: 'rajasthan', label: 'Rajasthan' },
      { value: 'west-bengal', label: 'West Bengal' },
      { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
    ],
    usa: [
      { value: 'california', label: 'California' },
      { value: 'texas', label: 'Texas' },
      { value: 'new-york', label: 'New York' },
      { value: 'florida', label: 'Florida' },
    ],
    uk: [
      { value: 'england', label: 'England' },
      { value: 'scotland', label: 'Scotland' },
      { value: 'wales', label: 'Wales' },
    ],
    canada: [
      { value: 'ontario', label: 'Ontario' },
      { value: 'quebec', label: 'Quebec' },
      { value: 'british-columbia', label: 'British Columbia' },
    ],
  },
  districts: {
    'tamil-nadu': [
      { value: 'chennai', label: 'Chennai' },
      { value: 'coimbatore', label: 'Coimbatore' },
      { value: 'madurai', label: 'Madurai' },
      { value: 'salem', label: 'Salem' },
      { value: 'erode', label: 'Erode' },
      { value: 'tiruchirappalli', label: 'Tiruchirappalli' },
    ],
    'karnataka': [
      { value: 'bangalore', label: 'Bangalore' },
      { value: 'mysore', label: 'Mysore' },
      { value: 'hubli', label: 'Hubli-Dharwad' },
      { value: 'mangalore', label: 'Mangalore' },
    ],
    'kerala': [
      { value: 'thiruvananthapuram', label: 'Thiruvananthapuram' },
      { value: 'kochi', label: 'Kochi' },
      { value: 'kozhikode', label: 'Kozhikode' },
      { value: 'thrissur', label: 'Thrissur' },
    ],
    'california': [
      { value: 'los-angeles', label: 'Los Angeles' },
      { value: 'san-francisco', label: 'San Francisco' },
      { value: 'san-diego', label: 'San Diego' },
    ],
    'england': [
      { value: 'london', label: 'London' },
      { value: 'manchester', label: 'Manchester' },
      { value: 'birmingham', label: 'Birmingham' },
    ],
  }
};

export default function PremiumFilterSidebar({ className = '', showBackButton = true }: PremiumFilterSidebarProps) {
  const navigate = useNavigate();
  const { filters, setFilters, resetFilters } = useJobsStore();
  const [expandedSections, setExpandedSections] = useState({
    search: true,
    salary: true,
    qualifications: true,
    location: true,
    instituteType: true,
    experience: true,
    applicationTypes: true,
  });

  const [salaryRange, setSalaryRange] = useState([filters.salaryRange.min, filters.salaryRange.max]);
  const [isSticky, setIsSticky] = useState(false);

  // Handle scroll for sticky effect
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatSalary = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    if (amount >= 1000) {
      return `₹${(amount / 1000)}K`;
    }
    return `₹${amount}`;
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSalaryChange = (values: number[]) => {
    setSalaryRange(values);
    setFilters({
      salaryRange: { min: values[0], max: values[1] }
    });
  };

  const handleLocationChange = (field: 'country' | 'state' | 'district', value: string) => {
    const newLocation = { ...filters.location };
    newLocation[field] = value;
    
    // Reset dependent fields
    if (field === 'country') {
      newLocation.state = '';
      newLocation.district = '';
    } else if (field === 'state') {
      newLocation.district = '';
    }
    
    setFilters({ location: newLocation });
  };

  const handleArrayFilter = (filterKey: keyof JobFilters, value: string, checked: boolean) => {
    const currentArray = filters[filterKey] as string[];
    const newArray = checked 
      ? [...currentArray, value]
      : currentArray.filter(item => item !== value);
    
    setFilters({ [filterKey]: newArray });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.keywords) count++;
    if (filters.location.country) count++;
    if (filters.location.state) count++;
    if (filters.location.district) count++;
    if (filters.qualifications.length > 0) count++;
    if (filters.instituteType.length > 0) count++;
    if (filters.applicationTypes.length > 0) count++;
    if (filters.experienceLevel) count++;
    if (filters.salaryRange.min > 5000 || filters.salaryRange.max < 100000) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  const sectionVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto' },
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      transition={{ duration: 0.5 }}
      className={`bg-white rounded-xl border shadow-lg overflow-hidden ${
        isSticky ? 'sticky top-20 z-40' : ''
      } ${className}`}
    >
      {/* Premium Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          {showBackButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="text-white hover:bg-white/20 -ml-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          )}
          <div className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-yellow-300" />
            <h3 className="text-xl font-bold">Smart Filters</h3>
          </div>
          <div className="flex items-center space-x-2">
            {activeFiltersCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-yellow-400 text-blue-900 text-xs font-bold px-2 py-1 rounded-full"
              >
                {activeFiltersCount}
              </motion.div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-white hover:bg-white/20"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <p className="text-blue-100 text-sm">
          Find your perfect faculty position with our intelligent filtering system
        </p>
      </div>

      <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
        {/* Search Section */}
        <Card className="border-0 shadow-sm bg-gradient-to-br from-gray-50 to-white">
          <CardHeader 
            className="pb-3 cursor-pointer"
            onClick={() => toggleSection('search')}
          >
            <CardTitle className="flex items-center justify-between text-sm font-semibold text-gray-800">
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-blue-600" />
                <span>🔍 Search Keywords</span>
              </div>
              {expandedSections.search ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CardTitle>
          </CardHeader>
          <AnimatePresence>
            {expandedSections.search && (
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.3 }}
              >
                <CardContent className="pt-0">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search jobs, companies, keywords..."
                      value={filters.keywords}
                      onChange={(e) => setFilters({ keywords: e.target.value })}
                      className="pl-10 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                    />
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Salary Range Section */}
        <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-white">
          <CardHeader 
            className="pb-3 cursor-pointer"
            onClick={() => toggleSection('salary')}
          >
            <CardTitle className="flex items-center justify-between text-sm font-semibold text-gray-800">
              <div className="flex items-center space-x-2">
                <IndianRupee className="w-4 h-4 text-green-600" />
                <span>💰 Salary Range (per month)</span>
              </div>
              {expandedSections.salary ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CardTitle>
          </CardHeader>
          <AnimatePresence>
            {expandedSections.salary && (
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.3 }}
              >
                <CardContent className="pt-0 space-y-4">
                  <div className="px-2">
                    <Slider
                      value={salaryRange}
                      onValueChange={handleSalaryChange}
                      max={100000}
                      min={5000}
                      step={1000}
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="font-medium">{formatSalary(salaryRange[0])}</span>
                    <span className="text-gray-400">–</span>
                    <span className="font-medium">{formatSalary(salaryRange[1])}</span>
                  </div>
                  <div className="text-center">
                    <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700">
                      {formatSalary(salaryRange[0])} – {formatSalary(salaryRange[1])}
                    </Badge>
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Qualifications Section */}
        <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-white">
          <CardHeader 
            className="pb-3 cursor-pointer"
            onClick={() => toggleSection('qualifications')}
          >
            <CardTitle className="flex items-center justify-between text-sm font-semibold text-gray-800">
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-4 h-4 text-purple-600" />
                <span>📚 Qualifications</span>
              </div>
              {expandedSections.qualifications ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CardTitle>
          </CardHeader>
          <AnimatePresence>
            {expandedSections.qualifications && (
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.3 }}
              >
                <CardContent className="pt-0 space-y-3">
                  {qualificationOptions.map((option) => (
                    <motion.div
                      key={option.value}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-purple-50 transition-colors"
                    >
                      <Checkbox
                        id={option.value}
                        checked={filters.qualifications.includes(option.value)}
                        onCheckedChange={(checked) =>
                          handleArrayFilter('qualifications', option.value, checked as boolean)
                        }
                        className="border-2 border-purple-300 data-[state=checked]:bg-purple-600"
                      />
                      <Label
                        htmlFor={option.value}
                        className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer font-medium"
                      >
                        <span>{option.icon}</span>
                        <span>{option.label}</span>
                      </Label>
                    </motion.div>
                  ))}
                  
                  {filters.qualifications.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-wrap gap-2 pt-2"
                    >
                      {filters.qualifications.map((qual) => {
                        const option = qualificationOptions.find(q => q.value === qual);
                        return (
                          <Badge key={qual} variant="secondary" className="bg-purple-100 text-purple-700">
                            {option?.icon} {option?.label}
                            <button
                              type="button"
                              onClick={() => handleArrayFilter('qualifications', qual, false)}
                              className="ml-2 hover:text-red-600 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        );
                      })}
                    </motion.div>
                  )}
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Location Section */}
        <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-white">
          <CardHeader 
            className="pb-3 cursor-pointer"
            onClick={() => toggleSection('location')}
          >
            <CardTitle className="flex items-center justify-between text-sm font-semibold text-gray-800">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>📍 Location</span>
              </div>
              {expandedSections.location ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CardTitle>
          </CardHeader>
          <AnimatePresence>
            {expandedSections.location && (
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.3 }}
              >
                <CardContent className="pt-0 space-y-4">
                  {/* Country */}
                  <div>
                    <Label className="text-xs text-gray-600 mb-2 block font-medium">Country</Label>
                    <Select 
                      value={filters.location.country} 
                      onValueChange={(value) => handleLocationChange('country', value)}
                    >
                      <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {locationData.countries.map((country) => (
                          <SelectItem key={country.value} value={country.value}>
                            {country.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* State */}
                  <div>
                    <Label className="text-xs text-gray-600 mb-2 block font-medium">State</Label>
                    <Select 
                      value={filters.location.state} 
                      onValueChange={(value) => handleLocationChange('state', value)}
                      disabled={!filters.location.country}
                    >
                      <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {filters.location.country && 
                          locationData.states[filters.location.country as keyof typeof locationData.states]?.map((state) => (
                            <SelectItem key={state.value} value={state.value}>
                              {state.label}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </div>

                  {/* District */}
                  <div>
                    <Label className="text-xs text-gray-600 mb-2 block font-medium">District</Label>
                    <Select 
                      value={filters.location.district} 
                      onValueChange={(value) => handleLocationChange('district', value)}
                      disabled={!filters.location.state}
                    >
                      <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500">
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                      <SelectContent>
                        {filters.location.state && 
                          locationData.districts[filters.location.state as keyof typeof locationData.districts]?.map((district) => (
                            <SelectItem key={district.value} value={district.value}>
                              {district.label}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Institute Type Section */}
        <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-white">
          <CardHeader 
            className="pb-3 cursor-pointer"
            onClick={() => toggleSection('instituteType')}
          >
            <CardTitle className="flex items-center justify-between text-sm font-semibold text-gray-800">
              <div className="flex items-center space-x-2">
                <Building className="w-4 h-4 text-orange-600" />
                <span>🏫 Institute Type</span>
              </div>
              {expandedSections.instituteType ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CardTitle>
          </CardHeader>
          <AnimatePresence>
            {expandedSections.instituteType && (
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.3 }}
              >
                <CardContent className="pt-0 space-y-3">
                  {instituteTypeOptions.map((option) => (
                    <motion.div
                      key={option.value}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-orange-50 transition-colors"
                    >
                      <Checkbox
                        id={option.value}
                        checked={filters.instituteType.includes(option.value as any)}
                        onCheckedChange={(checked) =>
                          handleArrayFilter('instituteType', option.value, checked as boolean)
                        }
                        className="border-2 border-orange-300 data-[state=checked]:bg-orange-600"
                      />
                      <Label
                        htmlFor={option.value}
                        className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer font-medium"
                      >
                        <span>{option.icon}</span>
                        <span>{option.label}</span>
                      </Label>
                    </motion.div>
                  ))}
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Experience Section */}
        <Card className="border-0 shadow-sm bg-gradient-to-br from-teal-50 to-white">
          <CardHeader 
            className="pb-3 cursor-pointer"
            onClick={() => toggleSection('experience')}
          >
            <CardTitle className="flex items-center justify-between text-sm font-semibold text-gray-800">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-4 h-4 text-teal-600" />
                <span>🧑‍💻 Experience Level</span>
              </div>
              {expandedSections.experience ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CardTitle>
          </CardHeader>
          <AnimatePresence>
            {expandedSections.experience && (
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.3 }}
              >
                <CardContent className="pt-0 space-y-3">
                  {experienceOptions.map((option) => (
                    <motion.div
                      key={option.value}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-teal-50 transition-colors"
                    >
                      <input
                        type="radio"
                        id={option.value}
                        name="experience"
                        checked={filters.experienceLevel === option.value}
                        onChange={() => setFilters({ experienceLevel: option.value })}
                        className="w-4 h-4 text-teal-600 border-2 border-teal-300"
                      />
                      <Label
                        htmlFor={option.value}
                        className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer font-medium"
                      >
                        <span>{option.icon}</span>
                        <span>{option.label}</span>
                      </Label>
                    </motion.div>
                  ))}
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Application Types Section */}
        <Card className="border-0 shadow-sm bg-gradient-to-br from-pink-50 to-white">
          <CardHeader 
            className="pb-3 cursor-pointer"
            onClick={() => toggleSection('applicationTypes')}
          >
            <CardTitle className="flex items-center justify-between text-sm font-semibold text-gray-800">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-pink-600" />
                <span>📝 Application Type</span>
              </div>
              {expandedSections.applicationTypes ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CardTitle>
          </CardHeader>
          <AnimatePresence>
            {expandedSections.applicationTypes && (
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.3 }}
              >
                <CardContent className="pt-0 space-y-3">
                  {applicationTypeOptions.map((option) => (
                    <motion.div
                      key={option.value}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-pink-50 transition-colors"
                    >
                      <Checkbox
                        id={option.value}
                        checked={filters.applicationTypes.includes(option.value as any)}
                        onCheckedChange={(checked) =>
                          handleArrayFilter('applicationTypes', option.value, checked as boolean)
                        }
                        className="border-2 border-pink-300 data-[state=checked]:bg-pink-600"
                      />
                      <Label
                        htmlFor={option.value}
                        className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer font-medium"
                      >
                        <span>{option.icon}</span>
                        <span>{option.label}</span>
                      </Label>
                    </motion.div>
                  ))}
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>

      {/* Sticky Apply Filters Button */}
      <div className="p-4 bg-gray-50 border-t">
        <Button 
          onClick={resetFilters}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg"
        >
          <Filter className="w-4 h-4 mr-2" />
          Apply Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </Button>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </motion.div>
  );
}
