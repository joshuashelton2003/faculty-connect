import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInstitutesStore, useAuthStore } from '@/store/appStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { worldLocationData } from '@/data/comprehensiveSampleData';
import { allInstitutesData } from '@/data/enhancedInstitutesData';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Plus,
  Building,
  MapPin,
  Calendar,
  Users,
  Globe,
  Mail,
  Phone,
  Edit,
  Trash2,
  Eye,
  ArrowLeft,
  Star,
  CheckCircle,
  ExternalLink,
  Award,
  BookOpen,
  GraduationCap
} from 'lucide-react';

const InstitutesMain: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { 
    institutes, 
    filteredInstitutes, 
    fetchInstitutes, 
    createInstitute, 
    updateInstitute, 
    deleteInstitute,
    setFilters,
    isLoading 
  } = useInstitutesStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all-locations');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingInstitute, setEditingInstitute] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [sortBy, setSortBy] = useState<'name' | 'established' | 'location'>('name');

  const [instituteForm, setInstituteForm] = useState({
    name: '',
    type: 'engineering-college' as any,
    description: '',
    location: {
      country: 'India',
      state: 'Tamil Nadu',
      district: '',
      city: '',
      pincode: '',
      address: ''
    },
    established: 2000,
    affiliation: '',
    accreditation: [] as string[],
    website: '',
    contact: {
      email: '',
      phone: '',
      fax: ''
    },
    departments: [] as string[],
    courses: [] as string[],
    facilities: [] as string[]
  });

  useEffect(() => {
    // Use enhanced institutes data
    if (institutes.length === 0) {
      // Simulate loading the enhanced data with pagination
      setTimeout(() => {
        console.log('Loading enhanced institutes data:', allInstitutesData.length, 'institutes');
      }, 100);
    }
    fetchInstitutes();
  }, [fetchInstitutes]);

  // Enhanced filtering and sorting logic
  const sortedAndFilteredInstitutes = React.useMemo(() => {
    // Always use allInstitutesData as the primary source
    let result = institutes.length > 0 ? [...institutes] : [...allInstitutesData];

    // Apply local filtering
    if (searchTerm) {
      result = result.filter(institute =>
        institute.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        institute.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        institute.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        institute.location.state.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (typeFilter !== 'all') {
      result = result.filter(institute => institute.type === typeFilter);
    }

    if (locationFilter !== 'all-locations') {
      result = result.filter(institute => institute.location.state === locationFilter);
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'established':
          return (b.established || 0) - (a.established || 0);
        case 'location':
          return `${a.location.city}, ${a.location.state}`.localeCompare(`${b.location.city}, ${b.location.state}`);
        default:
          return 0;
      }
    });

    return result;
  }, [institutes, allInstitutesData, searchTerm, typeFilter, locationFilter, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(sortedAndFilteredInstitutes.length / itemsPerPage);
  const paginatedInstitutes = sortedAndFilteredInstitutes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const loadMoreInstitutes = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  useEffect(() => {
    // Apply local filters
    setFilters({
      keywords: searchTerm,
      location: {
        country: 'India',
        state: locationFilter === 'all-locations' ? '' : locationFilter,
        district: ''
      },
      type: typeFilter === 'all' ? [] : [typeFilter as any],
      accreditation: [],
      sortBy: 'relevance'
    });
  }, [searchTerm, typeFilter, locationFilter, setFilters]);

  const handleCreateInstitute = async () => {
    try {
      await createInstitute({
        ...instituteForm,
        employerId: user?.id || 'emp_demo',
        images: [],
        rankings: [],
        socialMedia: {},
        isVerified: false,
        isFeatured: false
      });
      setShowCreateDialog(false);
      resetForm();
    } catch (error) {
      console.error('Error creating institute:', error);
    }
  };

  const handleUpdateInstitute = async () => {
    if (editingInstitute) {
      try {
        await updateInstitute(editingInstitute.id, instituteForm);
        setShowEditDialog(false);
        setEditingInstitute(null);
        resetForm();
      } catch (error) {
        console.error('Error updating institute:', error);
      }
    }
  };

  const handleDeleteInstitute = async (instituteId: string) => {
    try {
      await deleteInstitute(instituteId);
    } catch (error) {
      console.error('Error deleting institute:', error);
    }
  };

  const openEditDialog = (institute: any) => {
    setEditingInstitute(institute);
    setInstituteForm({
      name: institute.name,
      type: institute.type,
      description: institute.description,
      location: institute.location,
      established: institute.established,
      affiliation: institute.affiliation,
      accreditation: institute.accreditation,
      website: institute.website,
      contact: institute.contact,
      departments: institute.departments,
      courses: institute.courses,
      facilities: institute.facilities
    });
    setShowEditDialog(true);
  };

  const resetForm = () => {
    setInstituteForm({
      name: '',
      type: 'engineering-college',
      description: '',
      location: {
        country: 'India',
        state: 'Tamil Nadu',
        district: '',
        city: '',
        pincode: '',
        address: ''
      },
      established: 2000,
      affiliation: '',
      accreditation: [],
      website: '',
      contact: {
        email: '',
        phone: '',
        fax: ''
      },
      departments: [],
      courses: [],
      facilities: []
    });
  };

  const getInstituteTypeColor = (type: string) => {
    const colors = {
      'engineering-college': 'bg-blue-100 text-blue-800',
      'arts-science-college': 'bg-green-100 text-green-800',
      'polytechnic': 'bg-orange-100 text-orange-800',
      'iti': 'bg-purple-100 text-purple-800',
      'school': 'bg-yellow-100 text-yellow-800',
      'university': 'bg-red-100 text-red-800',
      'research-institute': 'bg-gray-100 text-gray-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getInstituteTypeLabel = (type: string) => {
    const labels = {
      'engineering-college': 'Engineering College',
      'arts-science-college': 'Arts & Science College',
      'polytechnic': 'Polytechnic',
      'iti': 'ITI',
      'school': 'School',
      'university': 'University',
      'research-institute': 'Research Institute'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const InstituteCard: React.FC<{ institute: any; index: number }> = ({ institute, index }) => {
    const [jobsCount, setJobsCount] = React.useState(Math.floor(Math.random() * 15) + 3);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: (index % itemsPerPage) * 0.05 }}
        className="group h-full"
      >
        <Card className="bg-white border border-gray-200 shadow-md rounded-xl hover:shadow-xl transition-all duration-300 hover:border-blue-300 h-full flex flex-col">
          <CardContent className="p-6 flex-1 flex flex-col">
            {/* Header Section - Fixed Height */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4 flex-1">
                <Avatar className="h-16 w-16 border-2 border-gray-100 flex-shrink-0">
                  <AvatarImage src={institute.logo} alt={institute.name} />
                  <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold text-lg">
                    {institute.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                    {institute.name}
                  </h3>
                  <div className="flex items-center flex-wrap gap-2 mb-2">
                    <Badge className={getInstituteTypeColor(institute.type)}>
                      {getInstituteTypeLabel(institute.type)}
                    </Badge>
                    {institute.isVerified && (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    {institute.isFeatured && (
                      <Badge className="bg-purple-100 text-purple-800">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Admin Actions */}
              {user?.role === 'employer' && (
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditDialog(institute);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Edit Institute"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => e.stopPropagation()}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700"
                        title="Delete Institute"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Institute</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{institute.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteInstitute(institute.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>

            {/* Info Section - Fixed Height */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span className="truncate">{institute.location.city}, {institute.location.state}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span>Est. {institute.established}</span>
                </div>
              </div>

              <div className="flex items-center flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span>{institute.departments?.length || 0} Departments</span>
                </div>
                <div className="flex items-center">
                  <GraduationCap className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span>{institute.courses?.length || 0} Courses</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span>{Math.floor(Math.random() * 5000) + 1000}+ Students</span>
                </div>
              </div>
            </div>

            {/* Description - Flexible Height */}
            <div className="mb-4 flex-1">
              <p className="text-gray-600 text-sm line-clamp-3">
                {institute.description}
              </p>
            </div>

            {/* Accreditation - Fixed Height */}
            {institute.accreditation && institute.accreditation.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {institute.accreditation.slice(0, 2).map((acc: string, idx: number) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      <Award className="w-3 h-3 mr-1" />
                      {acc}
                    </Badge>
                  ))}
                  {institute.accreditation.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{institute.accreditation.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Footer Section - Fixed Height */}
            <div className="space-y-3 pt-3 border-t border-gray-100">
              {/* Contact Icons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {institute.contact.email && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `mailto:${institute.contact.email}`;
                      }}
                      title={institute.contact.email}
                    >
                      <Mail className="w-4 h-4 text-gray-500" />
                    </Button>
                  )}
                  {institute.contact.phone && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `tel:${institute.contact.phone}`;
                      }}
                      title={institute.contact.phone}
                    >
                      <Phone className="w-4 h-4 text-gray-500" />
                    </Button>
                  )}
                  {institute.website && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(institute.website, '_blank');
                      }}
                      title="Visit Website"
                    >
                      <Globe className="w-4 h-4 text-gray-500" />
                    </Button>
                  )}
                </div>

                {/* Job Count */}
                <div className="flex items-center text-sm text-gray-500">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  <span className="font-medium">{jobsCount} open positions</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/institutes/${institute.id}`);
                  }}
                  className="flex-1 hover:bg-gray-50"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/institutes/${institute.id}/jobs`);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  disabled={jobsCount === 0}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {jobsCount > 0 ? `View Jobs (${jobsCount})` : 'No Jobs'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const FormFields = () => (
    <div className="space-y-4 py-4 max-h-96 overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Institute Name *</Label>
          <Input
            id="name"
            value={instituteForm.name}
            onChange={(e) => setInstituteForm(prev => ({ ...prev, name: e.target.value }))}
            placeholder="e.g., Anna University"
            required
          />
        </div>
        <div>
          <Label htmlFor="type">Institute Type *</Label>
          <Select 
            value={instituteForm.type} 
            onValueChange={(value: any) => setInstituteForm(prev => ({ ...prev, type: value }))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="engineering-college">Engineering College</SelectItem>
              <SelectItem value="arts-science-college">Arts & Science College</SelectItem>
              <SelectItem value="polytechnic">Polytechnic</SelectItem>
              <SelectItem value="iti">ITI</SelectItem>
              <SelectItem value="school">School</SelectItem>
              <SelectItem value="university">University</SelectItem>
              <SelectItem value="research-institute">Research Institute</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={instituteForm.description}
          onChange={(e) => setInstituteForm(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Brief description of the institute..."
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            value={instituteForm.location.city}
            onChange={(e) => setInstituteForm(prev => ({ 
              ...prev, 
              location: { ...prev.location, city: e.target.value }
            }))}
            placeholder="Chennai"
            required
          />
        </div>
        <div>
          <Label htmlFor="state">State *</Label>
          <Select 
            value={instituteForm.location.state} 
            onValueChange={(value) => setInstituteForm(prev => ({ 
              ...prev, 
              location: { ...prev.location, state: value }
            }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {worldLocationData.states.IN.map((state) => (
                <SelectItem key={state.code} value={state.name}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="established">Established Year</Label>
          <Input
            id="established"
            type="number"
            min="1800"
            max="2024"
            value={instituteForm.established}
            onChange={(e) => setInstituteForm(prev => ({ 
              ...prev, 
              established: parseInt(e.target.value) || 2000 
            }))}
          />
        </div>
        <div>
          <Label htmlFor="affiliation">Affiliation</Label>
          <Input
            id="affiliation"
            value={instituteForm.affiliation}
            onChange={(e) => setInstituteForm(prev => ({ ...prev, affiliation: e.target.value }))}
            placeholder="e.g., Anna University"
          />
        </div>
        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            type="url"
            value={instituteForm.website}
            onChange={(e) => setInstituteForm(prev => ({ ...prev, website: e.target.value }))}
            placeholder="https://example.edu"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Contact Email</Label>
          <Input
            id="email"
            type="email"
            value={instituteForm.contact.email}
            onChange={(e) => setInstituteForm(prev => ({ 
              ...prev, 
              contact: { ...prev.contact, email: e.target.value }
            }))}
            placeholder="info@example.edu"
          />
        </div>
        <div>
          <Label htmlFor="phone">Contact Phone</Label>
          <Input
            id="phone"
            value={instituteForm.contact.phone}
            onChange={(e) => setInstituteForm(prev => ({ 
              ...prev, 
              contact: { ...prev.contact, phone: e.target.value }
            }))}
            placeholder="+91 9876543210"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Educational Institutes</h1>
              <p className="text-gray-600">
                Discover {sortedAndFilteredInstitutes.length} educational institutions across India
              </p>
            </div>
            
            {user?.role === 'employer' && (
              <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 shadow-md">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Institute
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Add New Institute</DialogTitle>
                  </DialogHeader>
                  <FormFields />
                  <div className="flex justify-end space-x-3 pt-4">
                    <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateInstitute} disabled={isLoading}>
                      {isLoading ? 'Creating...' : 'Create Institute'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
          
          {/* Search and Filters */}
          <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search institutes by name, location, or type..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-48">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="engineering-college">Engineering</SelectItem>
                      <SelectItem value="arts-science-college">Arts & Science</SelectItem>
                      <SelectItem value="polytechnic">Polytechnic</SelectItem>
                      <SelectItem value="iti">ITI</SelectItem>
                      <SelectItem value="school">School</SelectItem>
                      <SelectItem value="university">University</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger className="w-48">
                      <MapPin className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-locations">All Locations</SelectItem>
                      {worldLocationData.states.IN.map((state) => (
                        <SelectItem key={state.code} value={state.name}>
                          {state.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold">{paginatedInstitutes.length}</span> of{' '}
            <span className="font-semibold">{sortedAndFilteredInstitutes.length}</span> institutes
            {currentPage > 1 && (
              <span className="ml-2">
                (Page {currentPage} of {totalPages})
              </span>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {/* Sort Options */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy as any}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="established">Established Year</SelectItem>
                  <SelectItem value="location">Location</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-1 border border-gray-200 rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="px-3"
              >
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="px-3"
              >
                List
              </Button>
            </div>
          </div>
        </div>

        {/* Institutes Grid/List */}
        <AnimatePresence>
          {isLoading ? (
            <div className={`grid gap-6 ${viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
            }`}>
              {Array.from({ length: itemsPerPage }, (_, i) => (
                <Card key={i} className="bg-white border border-gray-200 shadow-md rounded-xl">
                  <CardContent className="p-6">
                    <div className="animate-pulse">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                          <div className="flex space-x-2">
                            <div className="h-8 bg-gray-200 rounded w-20"></div>
                            <div className="h-8 bg-gray-200 rounded w-24"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : paginatedInstitutes.length > 0 ? (
            <>
              <div className={`grid gap-6 ${viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1 lg:grid-cols-2'
              }`}>
                {paginatedInstitutes.map((institute, index) => (
                  <InstituteCard key={institute.id} institute={institute} index={index} />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
                    {Math.min(currentPage * itemsPerPage, sortedAndFilteredInstitutes.length)} of{' '}
                    {sortedAndFilteredInstitutes.length} results
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>

                    <div className="flex items-center space-x-1">
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }

                        return (
                          <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => goToPage(pageNum)}
                            className="w-10"
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                      {totalPages > 5 && currentPage < totalPages - 2 && (
                        <>
                          <span className="text-gray-400">...</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => goToPage(totalPages)}
                            className="w-10"
                          >
                            {totalPages}
                          </Button>
                        </>
                      )}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {/* Quick Load More for Current Page */}
              {currentPage < totalPages && (
                <div className="text-center mt-8">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={loadMoreInstitutes}
                    className="px-8"
                  >
                    Load More Institutes ({Math.min(itemsPerPage, sortedAndFilteredInstitutes.length - currentPage * itemsPerPage)} more)
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No institutes found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We couldn't find any institutes matching your criteria. Try adjusting your filters or search terms.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={() => {
                  setSearchTerm('');
                  setTypeFilter('all');
                  setLocationFilter('all-locations');
                  setCurrentPage(1);
                }}>
                  Clear All Filters
                </Button>
                <Button variant="outline" onClick={() => setCurrentPage(1)}>
                  Reset Page
                </Button>
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* Edit Institute Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Edit Institute</DialogTitle>
            </DialogHeader>
            <FormFields />
            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateInstitute} disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update Institute'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default InstitutesMain;
