import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Filter, 
  X, 
  IndianRupee, 
  GraduationCap, 
  MapPin, 
  FileText,
  RotateCcw
} from 'lucide-react';

// Filter state interface
interface FilterState {
  salaryRange: {
    min: number;
    max: number;
  };
  qualifications: string[];
  location: {
    country: string;
    state: string;
    district: string;
  };
  applicationTypes: string[];
}

interface FilterSidebarProps {
  onFiltersChange?: (filters: FilterState) => void;
  className?: string;
}

// Location data
const locationData = {
  countries: [
    { value: 'india', label: 'India' }
  ],
  states: {
    india: [
      { value: 'tamil-nadu', label: 'Tamil Nadu' },
      { value: 'karnataka', label: 'Karnataka' },
      { value: 'kerala', label: 'Kerala' },
    ]
  },
  districts: {
    'tamil-nadu': [
      { value: 'chennai', label: 'Chennai' },
      { value: 'coimbatore', label: 'Coimbatore' },
      { value: 'madurai', label: 'Madurai' },
      { value: 'salem', label: 'Salem' },
      { value: 'erode', label: 'Erode' },
      { value: 'tiruchirappalli', label: 'Tiruchirappalli' },
      { value: 'tirunelveli', label: 'Tirunelveli' },
      { value: 'vellore', label: 'Vellore' },
    ],
    'karnataka': [
      { value: 'bangalore', label: 'Bangalore' },
      { value: 'mysore', label: 'Mysore' },
      { value: 'hubli', label: 'Hubli-Dharwad' },
      { value: 'mangalore', label: 'Mangalore' },
      { value: 'belgaum', label: 'Belgaum' },
    ],
    'kerala': [
      { value: 'thiruvananthapuram', label: 'Thiruvananthapuram' },
      { value: 'kochi', label: 'Kochi' },
      { value: 'kozhikode', label: 'Kozhikode' },
      { value: 'thrissur', label: 'Thrissur' },
      { value: 'kollam', label: 'Kollam' },
    ],
  }
};

const qualificationOptions = [
  { value: 'be-btech', label: 'B.E / B.Tech' },
  { value: 'me-mtech', label: 'M.E / M.Tech' },
  { value: 'msc-ma', label: 'M.Sc / M.A' },
  { value: 'bed', label: 'B.Ed' },
  { value: 'phd', label: 'Ph.D' },
  { value: 'net-slet', label: 'NET / SLET Qualified' },
];

const applicationTypeOptions = [
  { value: 'online', label: 'Apply Online' },
  { value: 'email', label: 'Email Resume' },
  { value: 'walkin', label: 'Walk-in Interview' },
];

export default function FilterSidebar({ onFiltersChange, className = '' }: FilterSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    salaryRange: { min: 5000, max: 100000 },
    qualifications: [],
    location: { country: 'india', state: '', district: '' },
    applicationTypes: [],
  });

  // Format salary for display
  const formatSalary = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    if (amount >= 1000) {
      return `₹${(amount / 1000)}K`;
    }
    return `₹${amount}`;
  };

  // Handle salary range change
  const handleSalaryRangeChange = (values: number[]) => {
    const newFilters = {
      ...filters,
      salaryRange: { min: values[0], max: values[1] }
    };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  // Handle qualification selection
  const handleQualificationChange = (value: string, checked: boolean) => {
    const updatedQualifications = checked
      ? [...filters.qualifications, value]
      : filters.qualifications.filter(q => q !== value);
    
    const newFilters = {
      ...filters,
      qualifications: updatedQualifications
    };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  // Handle location change
  const handleLocationChange = (field: 'country' | 'state' | 'district', value: string) => {
    let newLocation = { ...filters.location, [field]: value };
    
    // Reset dependent fields when parent changes
    if (field === 'country') {
      newLocation = { ...newLocation, state: '', district: '' };
    } else if (field === 'state') {
      newLocation = { ...newLocation, district: '' };
    }
    
    const newFilters = {
      ...filters,
      location: newLocation
    };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  // Handle application type selection
  const handleApplicationTypeChange = (value: string, checked: boolean) => {
    const updatedTypes = checked
      ? [...filters.applicationTypes, value]
      : filters.applicationTypes.filter(t => t !== value);
    
    const newFilters = {
      ...filters,
      applicationTypes: updatedTypes
    };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  // Reset all filters
  const handleReset = () => {
    const resetFilters = {
      salaryRange: { min: 5000, max: 100000 },
      qualifications: [],
      location: { country: 'india', state: '', district: '' },
      applicationTypes: [],
    };
    setFilters(resetFilters);
    onFiltersChange?.(resetFilters);
  };

  // Remove individual qualification
  const removeQualification = (value: string) => {
    handleQualificationChange(value, false);
  };

  // Remove individual application type
  const removeApplicationType = (value: string) => {
    handleApplicationTypeChange(value, false);
  };

  // Log current filter state (for debugging)
  useEffect(() => {
    console.log('Current Filter State:', JSON.stringify(filters, null, 2));
  }, [filters]);

  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-gray-600 hover:text-gray-900 text-xs"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-600 hover:text-gray-900 lg:hidden"
          >
            {isExpanded ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Filter Content */}
      {isExpanded && (
        <div className="p-4 space-y-6">
          {/* Salary Range */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <IndianRupee className="w-4 h-4 text-gray-600" />
              <Label className="text-sm font-medium text-gray-900">
                💰 Salary Range (per month)
              </Label>
            </div>
            
            <div className="space-y-3">
              <div className="px-2">
                <Slider
                  value={[filters.salaryRange.min, filters.salaryRange.max]}
                  onValueChange={handleSalaryRangeChange}
                  max={100000}
                  min={5000}
                  step={1000}
                  className="w-full"
                />
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{formatSalary(filters.salaryRange.min)}</span>
                <span className="text-gray-400">–</span>
                <span>{formatSalary(filters.salaryRange.max)}</span>
              </div>
              <div className="text-center">
                <Badge variant="outline" className="text-xs">
                  {formatSalary(filters.salaryRange.min)} – {formatSalary(filters.salaryRange.max)}
                </Badge>
              </div>
            </div>
          </div>

          {/* Qualifications */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-4 h-4 text-gray-600" />
              <Label className="text-sm font-medium text-gray-900">
                📚 Qualification
              </Label>
            </div>
            
            <div className="space-y-3">
              {qualificationOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.value}
                    checked={filters.qualifications.includes(option.value)}
                    onCheckedChange={(checked) =>
                      handleQualificationChange(option.value, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={option.value}
                    className="text-sm text-gray-700 cursor-pointer hover:text-gray-900"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>

            {filters.qualifications.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {filters.qualifications.map((qual) => {
                  const option = qualificationOptions.find(q => q.value === qual);
                  return (
                    <Badge key={qual} variant="secondary" className="text-xs">
                      {option?.label}
                      <button
                        type="button"
                        onClick={() => removeQualification(qual)}
                        className="ml-1 hover:text-red-600 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>

          {/* Location */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-600" />
              <Label className="text-sm font-medium text-gray-900">
                📍 Location
              </Label>
            </div>

            <div className="space-y-3">
              {/* Country */}
              <div>
                <Label className="text-xs text-gray-600 mb-1 block">Country</Label>
                <Select 
                  value={filters.location.country} 
                  onValueChange={(value) => handleLocationChange('country', value)}
                >
                  <SelectTrigger className="w-full">
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
                <Label className="text-xs text-gray-600 mb-1 block">State</Label>
                <Select 
                  value={filters.location.state} 
                  onValueChange={(value) => handleLocationChange('state', value)}
                  disabled={!filters.location.country}
                >
                  <SelectTrigger className="w-full">
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
                <Label className="text-xs text-gray-600 mb-1 block">District</Label>
                <Select 
                  value={filters.location.district} 
                  onValueChange={(value) => handleLocationChange('district', value)}
                  disabled={!filters.location.state}
                >
                  <SelectTrigger className="w-full">
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
            </div>
          </div>

          {/* Application Types */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-gray-600" />
              <Label className="text-sm font-medium text-gray-900">
                📝 Application Type
              </Label>
            </div>
            
            <div className="space-y-3">
              {applicationTypeOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.value}
                    checked={filters.applicationTypes.includes(option.value)}
                    onCheckedChange={(checked) =>
                      handleApplicationTypeChange(option.value, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={option.value}
                    className="text-sm text-gray-700 cursor-pointer hover:text-gray-900"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>

            {filters.applicationTypes.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {filters.applicationTypes.map((type) => {
                  const option = applicationTypeOptions.find(t => t.value === type);
                  return (
                    <Badge key={type} variant="secondary" className="text-xs">
                      {option?.label}
                      <button
                        type="button"
                        onClick={() => removeApplicationType(type)}
                        className="ml-1 hover:text-red-600 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>

          {/* Current Filter State Display */}
          <div className="pt-4 border-t border-gray-200">
            <Label className="text-xs text-gray-600 mb-2 block">Current Filters (JSON)</Label>
            <div className="bg-gray-50 rounded p-3 text-xs">
              <pre className="whitespace-pre-wrap text-gray-700 overflow-x-auto">
                {JSON.stringify(filters, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
