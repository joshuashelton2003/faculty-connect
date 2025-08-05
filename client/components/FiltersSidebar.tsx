import React, { useState, useEffect } from 'react';
import { useJobsStore } from '@/store/appStore';
import { worldLocationData } from '@/data/comprehensiveSampleData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Filter,
  ChevronDown,
  ChevronUp,
  X,
  MapPin,
  DollarSign,
  GraduationCap,
  Briefcase,
  Clock,
  Building,
  RefreshCw
} from 'lucide-react';

interface FiltersSidebarProps {
  className?: string;
  sticky?: boolean;
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({ 
  className = '', 
  sticky = true 
}) => {
  const { filters, setFilters, resetFilters, applyFilters } = useJobsStore();
  
  // Local state for expanded sections
  const [expandedSections, setExpandedSections] = useState({
    salary: true,
    qualification: true,
    location: true,
    application: true,
    education: true,
    experience: true
  });

  // Local state for multi-select filters
  const [selectedQualifications, setSelectedQualifications] = useState<string[]>(filters.qualifications);
  const [selectedInstituteTypes, setSelectedInstituteTypes] = useState<string[]>(filters.instituteType);
  const [selectedApplicationTypes, setSelectedApplicationTypes] = useState<string[]>(filters.applicationTypes);
  const [selectedEmploymentTypes, setSelectedEmploymentTypes] = useState<string[]>(filters.employmentType);

  // Salary range state
  const [salaryRange, setSalaryRange] = useState([filters.salaryRange.min, filters.salaryRange.max]);

  // Location state
  const [selectedCountry, setSelectedCountry] = useState(filters.location.country);
  const [selectedState, setSelectedState] = useState(filters.location.state);
  const [selectedDistrict, setSelectedDistrict] = useState(filters.location.district);

  // Options data
  const qualificationOptions = [
    'Ph.D', 'M.Tech/M.E', 'M.Sc/M.A', 'B.Tech/B.E', 'B.Sc/B.A', 
    'B.Ed', 'M.Ed', 'UGC NET', 'GATE', 'SLET'
  ];

  const instituteTypeOptions = [
    { value: 'polytechnic', label: 'Polytechnic' },
    { value: 'iti', label: 'ITI' },
    { value: 'arts-science-college', label: 'Arts & Science' },
    { value: 'engineering-college', label: 'Engineering' },
    { value: 'university', label: 'Business School' },
    { value: 'school', label: 'School' },
    { value: 'research-institute', label: 'Others' }
  ];

  const applicationTypeOptions = [
    { value: 'online', label: 'Apply Online' },
    { value: 'email', label: 'Email Resume' },
    { value: 'walk-in', label: 'Walk-in' },
    { value: 'postal', label: 'Postal' }
  ];

  const experienceOptions = [
    { value: 'fresher', label: 'Fresher' },
    { value: '1-3', label: '1-3 Years' },
    { value: '3-5', label: '3-5 Years' },
    { value: '5+', label: '5+ Years' }
  ];

  const employmentTypeOptions = [
    { value: 'full-time', label: 'Full-Time' },
    { value: 'part-time', label: 'Part-Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'visiting', label: 'Visiting' }
  ];

  // Get states based on selected country
  const availableStates = selectedCountry ? worldLocationData.states[selectedCountry as keyof typeof worldLocationData.states] || [] : [];
  
  // Get districts based on selected state
  const availableDistricts = selectedState ? worldLocationData.districts[selectedState as keyof typeof worldLocationData.districts] || [] : [];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleQualificationChange = (qualification: string, checked: boolean) => {
    const updated = checked 
      ? [...selectedQualifications, qualification]
      : selectedQualifications.filter(q => q !== qualification);
    setSelectedQualifications(updated);
    setFilters({ qualifications: updated });
  };

  const handleInstituteTypeChange = (type: string, checked: boolean) => {
    const updated = checked 
      ? [...selectedInstituteTypes, type]
      : selectedInstituteTypes.filter(t => t !== type);
    setSelectedInstituteTypes(updated);
    setFilters({ instituteType: updated as any });
  };

  const handleApplicationTypeChange = (type: string, checked: boolean) => {
    const updated = checked 
      ? [...selectedApplicationTypes, type]
      : selectedApplicationTypes.filter(t => t !== type);
    setSelectedApplicationTypes(updated);
    setFilters({ applicationTypes: updated as any });
  };

  const handleEmploymentTypeChange = (type: string, checked: boolean) => {
    const updated = checked 
      ? [...selectedEmploymentTypes, type]
      : selectedEmploymentTypes.filter(t => t !== type);
    setSelectedEmploymentTypes(updated);
    setFilters({ employmentType: updated as any });
  };

  const handleSalaryChange = (values: number[]) => {
    setSalaryRange(values);
    setFilters({ 
      salaryRange: { min: values[0], max: values[1] } 
    });
  };

  const handleLocationChange = (type: 'country' | 'state' | 'district', value: string) => {
    if (type === 'country') {
      setSelectedCountry(value);
      setSelectedState('');
      setSelectedDistrict('');
      setFilters({ 
        location: { country: value, state: '', district: '' } 
      });
    } else if (type === 'state') {
      setSelectedState(value);
      setSelectedDistrict('');
      setFilters({ 
        location: { country: selectedCountry, state: value, district: '' } 
      });
    } else {
      setSelectedDistrict(value);
      setFilters({ 
        location: { country: selectedCountry, state: selectedState, district: value } 
      });
    }
  };

  const handleReset = () => {
    setSelectedQualifications([]);
    setSelectedInstituteTypes([]);
    setSelectedApplicationTypes([]);
    setSelectedEmploymentTypes([]);
    setSalaryRange([5000, 100000]);
    setSelectedCountry('');
    setSelectedState('');
    setSelectedDistrict('');
    resetFilters();
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedQualifications.length > 0) count++;
    if (selectedInstituteTypes.length > 0) count++;
    if (selectedApplicationTypes.length > 0) count++;
    if (selectedEmploymentTypes.length > 0) count++;
    if (salaryRange[0] !== 5000 || salaryRange[1] !== 100000) count++;
    if (selectedCountry || selectedState || selectedDistrict) count++;
    if (filters.experienceLevel) count++;
    return count;
  };

  const FilterSection: React.FC<{
    id: keyof typeof expandedSections;
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
  }> = ({ id, title, icon, children }) => (
    <Collapsible 
      open={expandedSections[id]} 
      onOpenChange={() => toggleSection(id)}
    >
      <CollapsibleTrigger asChild>
        <motion.div
          className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer rounded-lg transition-colors"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              {icon}
            </div>
            <span className="font-medium text-gray-900">{title}</span>
          </div>
          {expandedSections[id] ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </motion.div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="px-4 pb-4"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </CollapsibleContent>
    </Collapsible>
  );

  return (
    <div className={`${sticky ? 'sticky top-6' : ''} ${className}`}>
      <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-blue-600" />
              <span>Filters</span>
              {getActiveFiltersCount() > 0 && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {getActiveFiltersCount()}
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-gray-500 hover:text-gray-700"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Reset
            </Button>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-2">
          {/* Salary Range Filter */}
          <FilterSection
            id="salary"
            title="Salary Range"
            icon={<DollarSign className="w-4 h-4 text-blue-600" />}
          >
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">
                  ₹{salaryRange[0].toLocaleString()} - ₹{salaryRange[1].toLocaleString()} per month
                </Label>
                <Slider
                  value={salaryRange}
                  onValueChange={handleSalaryChange}
                  max={100000}
                  min={5000}
                  step={1000}
                  className="mt-2"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>₹5K</span>
                <span>₹1L</span>
              </div>
            </div>
          </FilterSection>

          {/* Qualification Filter */}
          <FilterSection
            id="qualification"
            title="Qualification"
            icon={<GraduationCap className="w-4 h-4 text-blue-600" />}
          >
            <div className="space-y-3">
              {qualificationOptions.map((qual) => (
                <div key={qual} className="flex items-center space-x-2">
                  <Checkbox
                    id={`qual-${qual}`}
                    checked={selectedQualifications.includes(qual)}
                    onCheckedChange={(checked) => 
                      handleQualificationChange(qual, checked as boolean)
                    }
                  />
                  <Label 
                    htmlFor={`qual-${qual}`} 
                    className="text-sm cursor-pointer"
                  >
                    {qual}
                  </Label>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* Location Filter */}
          <FilterSection
            id="location"
            title="Location"
            icon={<MapPin className="w-4 h-4 text-blue-600" />}
          >
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Country</Label>
                <Select value={selectedCountry} onValueChange={(value) => handleLocationChange('country', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {worldLocationData.countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {availableStates.length > 0 && (
                <div>
                  <Label className="text-sm font-medium">State</Label>
                  <Select value={selectedState} onValueChange={(value) => handleLocationChange('state', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableStates.map((state) => (
                        <SelectItem key={state.code} value={state.name}>
                          {state.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {availableDistricts.length > 0 && (
                <div>
                  <Label className="text-sm font-medium">District</Label>
                  <Select value={selectedDistrict} onValueChange={(value) => handleLocationChange('district', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableDistricts.map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </FilterSection>

          {/* Application Type Filter */}
          <FilterSection
            id="application"
            title="Application Type"
            icon={<Briefcase className="w-4 h-4 text-blue-600" />}
          >
            <div className="space-y-3">
              {applicationTypeOptions.map((type) => (
                <div key={type.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`app-${type.value}`}
                    checked={selectedApplicationTypes.includes(type.value)}
                    onCheckedChange={(checked) => 
                      handleApplicationTypeChange(type.value, checked as boolean)
                    }
                  />
                  <Label 
                    htmlFor={`app-${type.value}`} 
                    className="text-sm cursor-pointer"
                  >
                    {type.label}
                  </Label>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* Education Type Filter */}
          <FilterSection
            id="education"
            title="Education Type"
            icon={<Building className="w-4 h-4 text-blue-600" />}
          >
            <div className="space-y-3">
              {instituteTypeOptions.map((type) => (
                <div key={type.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`inst-${type.value}`}
                    checked={selectedInstituteTypes.includes(type.value)}
                    onCheckedChange={(checked) => 
                      handleInstituteTypeChange(type.value, checked as boolean)
                    }
                  />
                  <Label 
                    htmlFor={`inst-${type.value}`} 
                    className="text-sm cursor-pointer"
                  >
                    {type.label}
                  </Label>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* Experience Filter */}
          <FilterSection
            id="experience"
            title="Experience"
            icon={<Clock className="w-4 h-4 text-blue-600" />}
          >
            <div className="space-y-3">
              {experienceOptions.map((exp) => (
                <div key={exp.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`exp-${exp.value}`}
                    checked={filters.experienceLevel === exp.value}
                    onCheckedChange={(checked) => 
                      setFilters({ experienceLevel: checked ? exp.value : '' })
                    }
                  />
                  <Label 
                    htmlFor={`exp-${exp.value}`} 
                    className="text-sm cursor-pointer"
                  >
                    {exp.label}
                  </Label>
                </div>
              ))}
            </div>
          </FilterSection>

          {/* Employment Type Filter */}
          <div className="pt-4">
            <Label className="text-sm font-medium mb-3 block">Employment Type</Label>
            <div className="flex flex-wrap gap-2">
              {employmentTypeOptions.map((type) => (
                <Badge
                  key={type.value}
                  variant={selectedEmploymentTypes.includes(type.value) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-blue-50 transition-colors"
                  onClick={() => handleEmploymentTypeChange(
                    type.value, 
                    !selectedEmploymentTypes.includes(type.value)
                  )}
                >
                  {type.label}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FiltersSidebar;
