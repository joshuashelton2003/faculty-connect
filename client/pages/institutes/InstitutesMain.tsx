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
    fetchInstitutes();
  }, [fetchInstitutes]);

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

  const InstituteCard: React.FC<{ institute: any; index: number }> = ({ institute, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group"
    >
      <Card className="bg-white border border-gray-200 shadow-md rounded-xl hover:shadow-lg transition-all duration-300 hover:border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start space-x-4 flex-1">
              <Avatar className="h-16 w-16 border-2 border-gray-100">
                <AvatarImage src={institute.logo} />
                <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold text-lg">
                  {institute.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {institute.name}
                    </h3>
                    <div className="flex items-center space-x-2 mt-2">
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
                    <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {institute.location.city}, {institute.location.state}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Est. {institute.established}
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {institute.departments?.length || 0} Departments
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {user?.role === 'employer' && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditDialog(institute)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600"
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
                </>
              )}
            </div>
          </div>

          <div className="mb-4">
            <p className="text-gray-700 text-sm line-clamp-2">
              {institute.description}
            </p>
          </div>

          {institute.accreditation && institute.accreditation.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {institute.accreditation.slice(0, 3).map((acc: string, idx: number) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    <Award className="w-3 h-3 mr-1" />
                    {acc}
                  </Badge>
                ))}
                {institute.accreditation.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{institute.accreditation.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <GraduationCap className="w-4 h-4 mr-1" />
                {institute.courses?.length || 0} Courses
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {Math.floor(Math.random() * 5000) + 1000} Students
              </div>
              {institute.rankings && institute.rankings.length > 0 && (
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  Rank #{institute.rankings[0].rank}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {institute.contact.email && (
                <Button variant="ghost" size="sm" className="p-1">
                  <Mail className="w-4 h-4 text-gray-400" />
                </Button>
              )}
              {institute.contact.phone && (
                <Button variant="ghost" size="sm" className="p-1">
                  <Phone className="w-4 h-4 text-gray-400" />
                </Button>
              )}
              {institute.website && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-1"
                  onClick={() => window.open(institute.website, '_blank')}
                >
                  <Globe className="w-4 h-4 text-gray-400" />
                </Button>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/institutes/${institute.id}`)}
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
              <Button
                size="sm"
                onClick={() => navigate(`/institutes/${institute.id}/jobs`)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Jobs
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

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
                Discover {institutes.length} educational institutions across India
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
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredInstitutes.length}</span> of{' '}
            <span className="font-semibold">{institutes.length}</span> institutes
          </div>
        </div>

        {/* Institutes Grid */}
        <AnimatePresence>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="bg-white border border-gray-200 shadow-md rounded-xl">
                  <CardContent className="p-6">
                    <div className="animate-pulse">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                        <div className="flex-1">
                          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredInstitutes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInstitutes.map((institute, index) => (
                <InstituteCard key={institute.id} institute={institute} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No institutes found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We couldn't find any institutes matching your criteria. Try adjusting your filters.
              </p>
              <Button onClick={() => {
                setSearchTerm('');
                setTypeFilter('all');
                setLocationFilter('all-locations');
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </AnimatePresence>

        {/* Load More Button */}
        {filteredInstitutes.length > 0 && filteredInstitutes.length >= 12 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="px-8">
              Load More Institutes
            </Button>
          </div>
        )}

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
