import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
  RotateCcw,
  BookOpen
} from 'lucide-react';

// Filter form schema
const filterSchema = z.object({
  salaryRange: z.object({
    min: z.number().min(5000).max(100000),
    max: z.number().min(5000).max(100000),
  }),
  qualifications: z.array(z.string()),
  educationStreams: z.array(z.string()),
  location: z.object({
    country: z.string(),
    state: z.string(),
    district: z.string(),
  }),
  applicationTypes: z.array(z.string()),
});

export type FilterFormData = z.infer<typeof filterSchema>;

interface FilterSidebarProps {
  onFiltersChange: (filters: FilterFormData) => void;
  onReset: () => void;
  className?: string;
}

// Mock data for locations
const locationData = {
  countries: [
    { value: 'india', label: 'India' }
  ],
  states: {
    india: [
      { value: 'tamil-nadu', label: 'Tamil Nadu' },
      { value: 'karnataka', label: 'Karnataka' },
      { value: 'kerala', label: 'Kerala' },
      { value: 'andhra-pradesh', label: 'Andhra Pradesh' },
      { value: 'telangana', label: 'Telangana' },
      { value: 'maharashtra', label: 'Maharashtra' },
    ]
  },
  districts: {
    'tamil-nadu': [
      { value: 'chennai', label: 'Chennai' },
      { value: 'coimbatore', label: 'Coimbatore' },
      { value: 'madurai', label: 'Madurai' },
      { value: 'tiruchirappalli', label: 'Tiruchirappalli' },
      { value: 'salem', label: 'Salem' },
      { value: 'tirunelveli', label: 'Tirunelveli' },
      { value: 'erode', label: 'Erode' },
      { value: 'vellore', label: 'Vellore' },
      { value: 'thoothukudi', label: 'Thoothukudi' },
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
    'andhra-pradesh': [
      { value: 'visakhapatnam', label: 'Visakhapatnam' },
      { value: 'vijayawada', label: 'Vijayawada' },
      { value: 'guntur', label: 'Guntur' },
    ],
    'telangana': [
      { value: 'hyderabad', label: 'Hyderabad' },
      { value: 'warangal', label: 'Warangal' },
      { value: 'nizamabad', label: 'Nizamabad' },
    ],
    'maharashtra': [
      { value: 'mumbai', label: 'Mumbai' },
      { value: 'pune', label: 'Pune' },
      { value: 'nagpur', label: 'Nagpur' },
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

const educationStreamOptions = [
  { value: 'polytechnic', label: 'Polytechnic' },
  { value: 'iti', label: 'ITI' },
  { value: 'arts-science', label: 'Arts & Science' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'school', label: 'School' },
];

export default function FilterSidebar({ onFiltersChange, onReset, className = '' }: FilterSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedQualifications, setSelectedQualifications] = useState<string[]>([]);
  const [selectedEducationStreams, setSelectedEducationStreams] = useState<string[]>([]);
  const [selectedApplicationTypes, setSelectedApplicationTypes] = useState<string[]>([]);

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FilterFormData>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      salaryRange: { min: 5000, max: 100000 },
      qualifications: [],
      educationStreams: [],
      location: { country: 'india', state: '', district: '' },
      applicationTypes: [],
    },
  });

  const watchedValues = watch();
  const watchedLocation = watch('location');

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

  // Handle qualification selection
  const handleQualificationChange = (value: string, checked: boolean) => {
    const updatedQualifications = checked
      ? [...selectedQualifications, value]
      : selectedQualifications.filter(q => q !== value);
    
    setSelectedQualifications(updatedQualifications);
    setValue('qualifications', updatedQualifications);
  };

  // Handle education streams selection
  const handleEducationStreamChange = (value: string, checked: boolean) => {
    const updatedStreams = checked
      ? [...selectedEducationStreams, value]
      : selectedEducationStreams.filter(s => s !== value);

    setSelectedEducationStreams(updatedStreams);
    setValue('educationStreams', updatedStreams);
  };

  // Handle application type selection
  const handleApplicationTypeChange = (value: string, checked: boolean) => {
    const updatedTypes = checked
      ? [...selectedApplicationTypes, value]
      : selectedApplicationTypes.filter(t => t !== value);

    setSelectedApplicationTypes(updatedTypes);
    setValue('applicationTypes', updatedTypes);
  };

  // Reset all filters
  const handleReset = () => {
    setSelectedQualifications([]);
    setSelectedEducationStreams([]);
    setSelectedApplicationTypes([]);
    reset();
    onReset();
  };

  // Submit filters
  const onSubmit = (data: FilterFormData) => {
    onFiltersChange(data);
  };

  // Auto-submit on form changes
  useEffect(() => {
    const subscription = watch((value) => {
      if (value) {
        onFiltersChange(value as FilterFormData);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, onFiltersChange]);

  // Clear district when state changes
  useEffect(() => {
    if (watchedLocation.state) {
      setValue('location.district', '');
    }
  }, [watchedLocation.state, setValue]);

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
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
            className="text-gray-600 hover:text-gray-900"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-600 hover:text-gray-900"
          >
            {isExpanded ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Filter Content */}
      {isExpanded && (
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-6">
          {/* Salary Range */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <IndianRupee className="w-4 h-4 text-gray-600" />
              <Label className="text-sm font-medium text-gray-900">
                Salary Range (per month)
              </Label>
            </div>
            
            <Controller
              name="salaryRange"
              control={control}
              render={({ field }) => (
                <div className="space-y-3">
                  <div className="px-2">
                    <Slider
                      value={[field.value.min, field.value.max]}
                      onValueChange={(values) => {
                        field.onChange({
                          min: values[0],
                          max: values[1]
                        });
                      }}
                      max={100000}
                      min={5000}
                      step={1000}
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{formatSalary(field.value.min)}</span>
                    <span className="text-gray-400">-</span>
                    <span>{formatSalary(field.value.max)}</span>
                  </div>
                  <div className="text-center">
                    <Badge variant="outline" className="text-xs">
                      {formatSalary(field.value.min)} - {formatSalary(field.value.max)}
                    </Badge>
                  </div>
                </div>
              )}
            />
          </div>

          {/* Qualifications */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-4 h-4 text-gray-600" />
              <Label className="text-sm font-medium text-gray-900">
                Qualifications
              </Label>
            </div>
            
            <div className="space-y-3">
              {qualificationOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.value}
                    checked={selectedQualifications.includes(option.value)}
                    onCheckedChange={(checked) =>
                      handleQualificationChange(option.value, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={option.value}
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>

            {selectedQualifications.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedQualifications.map((qual) => {
                  const option = qualificationOptions.find(q => q.value === qual);
                  return (
                    <Badge key={qual} variant="secondary" className="text-xs">
                      {option?.label}
                      <button
                        type="button"
                        onClick={() => handleQualificationChange(qual, false)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>

          {/* Education Streams */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-gray-600" />
              <Label className="text-sm font-medium text-gray-900">
                Education Streams
              </Label>
            </div>

            <div className="space-y-3">
              {educationStreamOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.value}
                    checked={selectedEducationStreams.includes(option.value)}
                    onCheckedChange={(checked) =>
                      handleEducationStreamChange(option.value, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={option.value}
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>

            {selectedEducationStreams.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedEducationStreams.map((stream) => {
                  const option = educationStreamOptions.find(s => s.value === stream);
                  return (
                    <Badge key={stream} variant="secondary" className="text-xs">
                      {option?.label}
                      <button
                        type="button"
                        onClick={() => handleEducationStreamChange(stream, false)}
                        className="ml-1 hover:text-red-600"
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
                Location
              </Label>
            </div>

            <div className="space-y-3">
              {/* Country */}
              <div>
                <Label className="text-xs text-gray-600 mb-1">Country</Label>
                <Controller
                  name="location.country"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
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
                  )}
                />
              </div>

              {/* State */}
              <div>
                <Label className="text-xs text-gray-600 mb-1">State</Label>
                <Controller
                  name="location.state"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {watchedLocation.country && 
                          locationData.states[watchedLocation.country as keyof typeof locationData.states]?.map((state) => (
                            <SelectItem key={state.value} value={state.value}>
                              {state.label}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* District */}
              <div>
                <Label className="text-xs text-gray-600 mb-1">District</Label>
                <Controller
                  name="location.district"
                  control={control}
                  render={({ field }) => (
                    <Select 
                      value={field.value} 
                      onValueChange={field.onChange}
                      disabled={!watchedLocation.state}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                      <SelectContent>
                        {watchedLocation.state && 
                          locationData.districts[watchedLocation.state as keyof typeof locationData.districts]?.map((district) => (
                            <SelectItem key={district.value} value={district.value}>
                              {district.label}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Application Types */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-gray-600" />
              <Label className="text-sm font-medium text-gray-900">
                Application Type
              </Label>
            </div>
            
            <div className="space-y-3">
              {applicationTypeOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.value}
                    checked={selectedApplicationTypes.includes(option.value)}
                    onCheckedChange={(checked) =>
                      handleApplicationTypeChange(option.value, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={option.value}
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>

            {selectedApplicationTypes.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedApplicationTypes.map((type) => {
                  const option = applicationTypeOptions.find(t => t.value === type);
                  return (
                    <Badge key={type} variant="secondary" className="text-xs">
                      {option?.label}
                      <button
                        type="button"
                        onClick={() => handleApplicationTypeChange(type, false)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>

          {/* Apply Button */}
          <div className="pt-4 border-t border-gray-200">
            <Button type="submit" className="w-full">
              Apply Filters
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
