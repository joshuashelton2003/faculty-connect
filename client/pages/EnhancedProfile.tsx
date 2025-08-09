import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Camera,
  Upload,
  X,
  Edit,
  Save,
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  GraduationCap,
  Briefcase,
  Calendar,
  Award,
  Globe,
  FileText,
  Settings,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash2,
  Star
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

interface FacultyProfileData {
  // Basic Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  
  // Location
  city: string;
  state: string;
  country: string;
  
  // Academic Info
  currentDesignation: string;
  currentInstitution: string;
  teachingExperience: number;
  specialization: string;
  qualifications: string[];
  
  // Professional
  expectedSalary: {
    min: number;
    max: number;
  };
  availability: string;
  languages: string[];
  
  // Contact
  website?: string;
  linkedin?: string;
  researchGate?: string;
}

interface EmployerProfileData {
  // Contact Person
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  designation: string;
  
  // Institution
  instituteName: string;
  instituteType: string;
  established: number;
  description: string;
  
  // Location
  city: string;
  state: string;
  country: string;
  address: string;
  
  // Additional
  website?: string;
  accreditation: string[];
  facilities: string[];
}

type ProfileData = FacultyProfileData | EmployerProfileData;

const EnhancedProfile: React.FC = () => {
  const { user, setUser } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(user?.profileImage || null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch,
    reset
  } = useForm<ProfileData>({
    defaultValues: {
      firstName: user?.name?.split(' ')[0] || '',
      lastName: user?.name?.split(' ')[1] || '',
      email: user?.email || '',
      phone: user?.phone || '',
      country: 'India'
    }
  });

  const handleImageSelect = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('File size should be less than 2MB');
        return;
      }
      
      // Validate file type
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        alert('Only JPG, JPEG, and PNG files are allowed');
        return;
      }

      setProfileImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setProfileImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const uploadImage = async () => {
    if (!profileImage) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          // Update user with new image
          if (user) {
            const updatedUser = { ...user, profileImage: profileImagePreview };
            setUser(updatedUser);
            localStorage.setItem('facultyconnect_user', JSON.stringify(updatedUser));
          }
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // In real implementation, upload to server here
    console.log('Uploading image:', profileImage);
  };

  const onSubmit = async (data: ProfileData) => {
    try {
      // If there's a new profile image, upload it first
      if (profileImage) {
        await uploadImage();
      }

      // Update user profile
      if (user) {
        const updatedUser = {
          ...user,
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone,
          profileCompletion: calculateProfileCompletion(data)
        };
        setUser(updatedUser);
        localStorage.setItem('facultyconnect_user', JSON.stringify(updatedUser));
      }

      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const calculateProfileCompletion = (data: ProfileData): number => {
    let completion = 30; // Base score
    
    // Basic info
    if (data.firstName && data.lastName) completion += 15;
    if (data.email && data.phone) completion += 10;
    if (profileImagePreview) completion += 20;
    
    // Role-specific scoring
    if (user?.role === 'faculty') {
      const facultyData = data as FacultyProfileData;
      if (facultyData.bio) completion += 10;
      if (facultyData.currentInstitution) completion += 10;
      if (facultyData.specialization) completion += 5;
    } else if (user?.role === 'employer') {
      const employerData = data as EmployerProfileData;
      if (employerData.instituteName) completion += 15;
      if (employerData.description) completion += 10;
    }
    
    return Math.min(completion, 100);
  };

  const currentProfileCompletion = user?.profileCompletion || 30;

  const renderFacultyForm = () => (
    <div className="space-y-6">
      {/* Academic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <GraduationCap className="w-5 h-5 mr-2" />
            Academic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="currentDesignation">Current Designation</Label>
              <Input
                {...register('currentDesignation')}
                placeholder="e.g., Assistant Professor"
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="currentInstitution">Current Institution</Label>
              <Input
                {...register('currentInstitution')}
                placeholder="e.g., Anna University"
                disabled={!isEditing}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="teachingExperience">Teaching Experience (Years)</Label>
              <Input
                {...register('teachingExperience', { valueAsNumber: true })}
                type="number"
                placeholder="5"
                disabled={!isEditing}
                min="0"
                max="50"
              />
            </div>
            <div>
              <Label htmlFor="specialization">Specialization</Label>
              <Input
                {...register('specialization')}
                placeholder="e.g., Computer Science"
                disabled={!isEditing}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="bio">Professional Bio</Label>
            <Textarea
              {...register('bio')}
              placeholder="Tell us about your academic background, research interests, and career goals..."
              disabled={!isEditing}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Professional Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Briefcase className="w-5 h-5 mr-2" />
            Professional Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expectedSalary.min">Expected Salary Range (Monthly)</Label>
              <div className="flex space-x-2">
                <Input
                  {...register('expectedSalary.min', { valueAsNumber: true })}
                  type="number"
                  placeholder="Minimum"
                  disabled={!isEditing}
                />
                <Input
                  {...register('expectedSalary.max', { valueAsNumber: true })}
                  type="number"
                  placeholder="Maximum"
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="availability">Availability</Label>
              <Select disabled={!isEditing} onValueChange={(value) => setValue('availability', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="1-month">Within 1 month</SelectItem>
                  <SelectItem value="2-months">Within 2 months</SelectItem>
                  <SelectItem value="3-months">Within 3 months</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderEmployerForm = () => (
    <div className="space-y-6">
      {/* Institution Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="w-5 h-5 mr-2" />
            Institution Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="instituteName">Institution Name</Label>
            <Input
              {...register('instituteName', { required: 'Institution name is required' })}
              placeholder="Enter institution name"
              disabled={!isEditing}
            />
            {errors.instituteName && (
              <p className="text-red-600 text-sm mt-1">{errors.instituteName.message}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="instituteType">Institution Type</Label>
              <Select disabled={!isEditing} onValueChange={(value) => setValue('instituteType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="university">University</SelectItem>
                  <SelectItem value="engineering-college">Engineering College</SelectItem>
                  <SelectItem value="arts-science-college">Arts & Science College</SelectItem>
                  <SelectItem value="polytechnic">Polytechnic</SelectItem>
                  <SelectItem value="school">School</SelectItem>
                  <SelectItem value="research-institute">Research Institute</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="established">Established Year</Label>
              <Input
                {...register('established', { valueAsNumber: true })}
                type="number"
                placeholder="e.g., 1985"
                disabled={!isEditing}
                min="1800"
                max="2024"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Institution Description</Label>
            <Textarea
              {...register('description')}
              placeholder="Describe your institution, its mission, and values..."
              disabled={!isEditing}
              rows={4}
            />
          </div>
          
          <div>
            <Label htmlFor="website">Institution Website</Label>
            <Input
              {...register('website')}
              type="url"
              placeholder="https://www.yourinstitution.edu"
              disabled={!isEditing}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#DDDAD0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
              <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
            </div>
            <div className="flex items-center space-x-3">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit(onSubmit)} disabled={!isDirty && !profileImage}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          {/* Profile Completion */}
          <Card className="mt-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900">Profile Completion</h3>
                <span className="text-sm font-medium text-gray-600">
                  {currentProfileCompletion}%
                </span>
              </div>
              <Progress value={currentProfileCompletion} className="mb-3" />
              <p className="text-sm text-gray-600">
                Complete your profile to get better job recommendations and increase visibility to employers.
              </p>
            </CardContent>
          </Card>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Profile Picture Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Camera className="w-5 h-5 mr-2" />
                Profile Picture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-gray-200">
                    <AvatarImage src={profileImagePreview || user?.profileImage} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-xl font-semibold">
                      {user?.name?.split(' ').map(n => n[0]).join('') || 'FC'}
                    </AvatarFallback>
                  </Avatar>
                  
                  {isEditing && (
                    <button
                      type="button"
                      onClick={handleImageSelect}
                      className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors"
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">
                      {user?.name || 'Your Name'}
                    </h3>
                    <Badge className={`${user?.role === 'faculty' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                      {user?.role === 'faculty' ? 'Faculty' : 'Employer'}
                    </Badge>
                  </div>
                  
                  {isEditing && (
                    <div className="space-y-3">
                      <div className="flex space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleImageSelect}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Image
                        </Button>
                        
                        {profileImagePreview && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={removeImage}
                          >
                            <X className="w-4 h-4 mr-2" />
                            Remove
                          </Button>
                        )}
                      </div>
                      
                      {isUploading && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Uploading...</span>
                            <span>{uploadProgress}%</span>
                          </div>
                          <Progress value={uploadProgress} />
                        </div>
                      )}
                      
                      <p className="text-xs text-gray-500">
                        JPG, JPEG, or PNG. Max size 2MB. Recommended size: 400x400px.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleImageChange}
                className="hidden"
              />
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    {...register('firstName', { required: 'First name is required' })}
                    placeholder="Enter your first name"
                    disabled={!isEditing}
                  />
                  {errors.firstName && (
                    <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    {...register('lastName', { required: 'Last name is required' })}
                    placeholder="Enter your last name"
                    disabled={!isEditing}
                  />
                  {errors.lastName && (
                    <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      disabled={!isEditing}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      {...register('phone', { required: 'Phone number is required' })}
                      type="tel"
                      placeholder="Enter your phone number"
                      className="pl-10"
                      disabled={!isEditing}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    {...register('city')}
                    placeholder="e.g., Chennai"
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    {...register('state')}
                    placeholder="e.g., Tamil Nadu"
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    {...register('country')}
                    placeholder="India"
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Role-specific sections */}
          {user?.role === 'faculty' && renderFacultyForm()}
          {user?.role === 'employer' && renderEmployerForm()}
        </form>
      </div>
    </div>
  );
};

export default EnhancedProfile;
