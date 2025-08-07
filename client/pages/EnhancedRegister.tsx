import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Building,
  GraduationCap,
  ArrowLeft,
  CheckCircle,
  Upload,
  FileText,
  MapPin,
  Calendar,
  Briefcase,
  BookOpen,
  Users,
  Star,
  Camera,
  X
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

interface FacultyRegistrationData {
  role: 'faculty';
  // Basic Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  
  // Academic Info
  currentDesignation?: string;
  currentInstitution?: string;
  teachingExperience?: number;
  qualifications?: string[];
  specialization?: string;
  
  // Location
  city?: string;
  state?: string;
  
  // Optional
  bio?: string;
  expectedSalary?: {
    min: number;
    max: number;
  };
}

interface EmployerRegistrationData {
  role: 'employer';
  // Contact Person Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  designation: string;
  
  // Institution Info
  instituteName: string;
  instituteType: string;
  established?: number;
  location: {
    city: string;
    state: string;
    address?: string;
  };
  website?: string;
  description?: string;
  accreditation?: string[];
}

type RegistrationData = FacultyRegistrationData | EmployerRegistrationData;

const steps = {
  roleSelection: 0,
  basicInfo: 1,
  additionalInfo: 2,
  verification: 3
};

export default function EnhancedRegister() {
  const navigate = useNavigate();
  const { register: authRegister, isLoading } = useAuthStore();

  // Get role from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const roleParam = urlParams.get('role') as 'faculty' | 'employer' | null;

  const [currentStep, setCurrentStep] = useState(roleParam ? steps.basicInfo : steps.roleSelection);
  const [selectedRole, setSelectedRole] = useState<'faculty' | 'employer' | null>(roleParam);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
    getValues
  } = useForm<RegistrationData>();

  const watchAllFields = watch();

  // Set role from URL parameter on component mount
  useEffect(() => {
    if (roleParam) {
      setValue('role', roleParam);
    }
  }, [roleParam, setValue]);

  const handleRoleSelect = (role: 'faculty' | 'employer') => {
    setSelectedRole(role);
    setValue('role', role);
    setCurrentStep(steps.basicInfo);
  };

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        alert('File size should be less than 2MB');
        return;
      }
      
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
        alert('Only JPG, JPEG, and PNG files are allowed');
        return;
      }

      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfileImage = () => {
    setProfileImage(null);
    setProfileImagePreview(null);
  };

  const validateStep = async (step: number): Promise<boolean> => {
    const fieldsToValidate: (keyof RegistrationData)[] = [];
    
    switch (step) {
      case steps.basicInfo:
        fieldsToValidate.push('firstName', 'lastName', 'email', 'phone', 'password', 'confirmPassword');
        if (selectedRole === 'employer') {
          fieldsToValidate.push('designation' as keyof RegistrationData);
        }
        break;
      case steps.additionalInfo:
        if (selectedRole === 'employer') {
          fieldsToValidate.push('instituteName' as keyof RegistrationData);
        }
        break;
    }

    const result = await trigger(fieldsToValidate);
    
    // Additional validation for password confirmation
    const values = getValues();
    if (values.password !== values.confirmPassword) {
      return false;
    }
    
    return result;
  };

  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > steps.roleSelection) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: RegistrationData) => {
    try {
      const registrationData = {
        ...data,
        profileImage: profileImage ? URL.createObjectURL(profileImage) : undefined
      };
      
      await authRegister(registrationData);
      
      // Redirect based on role
      if (data.role === 'employer') {
        navigate('/employer/dashboard');
      } else {
        navigate('/faculty/dashboard');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const calculateProgress = (): number => {
    const totalSteps = 4;
    return ((currentStep + 1) / totalSteps) * 100;
  };

  const getStepTitle = (): string => {
    switch (currentStep) {
      case steps.roleSelection: return 'Choose Your Role';
      case steps.basicInfo: return 'Basic Information';
      case steps.additionalInfo: return selectedRole === 'faculty' ? 'Academic Details' : 'Institution Details';
      case steps.verification: return 'Profile Picture & Verification';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8 font-inter">
      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-50 text-slate-600 font-medium flex items-center hover:text-blue-600 transition-all duration-200 hover:scale-105"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Link>

      <div className="max-w-4xl mx-auto pt-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-3">
              <img
                src="/FC.png"
                alt="FacultyConnect Logo"
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  // Fallback to text logo if image fails to load
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg" style={{display: 'none'}}>
                <span className="text-white font-bold text-lg">FC</span>
              </div>
              <span className="text-3xl font-bold text-slate-800">
                Faculty<span className="text-blue-600">Connect</span>
              </span>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-slate-800 mb-3 leading-tight">Create your account</h2>
          <p className="text-lg text-slate-600 max-w-md mx-auto">Join thousands of educators and institutions on India's premier academic platform</p>
          
          {/* Progress Bar */}
          <div className="mt-10 max-w-lg mx-auto">
            <div className="flex justify-between text-sm font-medium text-slate-600 mb-3">
              <span>Step {currentStep + 1} of 4</span>
              <span>{Math.round(calculateProgress())}% complete</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden shadow-inner">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full shadow-sm"
                initial={{ width: 0 }}
                animate={{ width: `${calculateProgress()}%` }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </div>
            <div className="mt-4 text-lg font-semibold text-slate-700 tracking-wide">{getStepTitle()}</div>
          </div>
        </div>

        <Card className="bg-white shadow-2xl border-0 rounded-2xl overflow-hidden backdrop-blur-sm">
          <CardHeader className="pb-6 bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-100">
            <CardTitle className="text-center text-2xl font-bold text-slate-800 tracking-wide">{getStepTitle()}</CardTitle>
          </CardHeader>
          <CardContent className="p-10 sm:p-12">
            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                {/* Step 1: Role Selection */}
                {currentStep === steps.roleSelection && (
                  <motion.div
                    key="roleSelection"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-10">
                      <h3 className="text-2xl font-bold text-slate-800 mb-3">I want to join as:</h3>
                      <p className="text-slate-600 text-lg">Choose your role to get started on your academic journey</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <motion.button
                        type="button"
                        onClick={() => handleRoleSelect('faculty')}
                        className="group p-8 border-2 border-slate-200 rounded-2xl hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 text-left shadow-lg hover:shadow-xl"
                        whileHover={{ scale: 1.02, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center mb-6">
                          <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl mr-4 group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300 shadow-md">
                            <GraduationCap className="w-8 h-8 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="text-2xl font-bold text-slate-800 mb-2">Faculty</h4>
                            <Badge className="bg-emerald-100 text-emerald-700 font-medium px-3 py-1">For Educators</Badge>
                          </div>
                        </div>
                        <p className="text-slate-600 leading-relaxed mb-4">
                          I'm an educator looking for teaching positions at schools, colleges, and universities.
                          I want to find opportunities that match my expertise and career goals.
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-blue-600 font-medium">
                            <CheckCircle className="w-4 h-4 mr-3" />
                            <span>Access to teaching jobs</span>
                          </div>
                          <div className="flex items-center text-sm text-blue-600 font-medium">
                            <CheckCircle className="w-4 h-4 mr-3" />
                            <span>Profile showcase</span>
                          </div>
                        </div>
                      </motion.button>

                      <motion.button
                        type="button"
                        onClick={() => handleRoleSelect('employer')}
                        className="group p-8 border-2 border-slate-200 rounded-2xl hover:border-green-400 hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 transition-all duration-300 text-left shadow-lg hover:shadow-xl"
                        whileHover={{ scale: 1.02, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center mb-6">
                          <div className="p-4 bg-gradient-to-br from-green-100 to-green-200 rounded-xl mr-4 group-hover:from-green-200 group-hover:to-green-300 transition-all duration-300 shadow-md">
                            <Building className="w-8 h-8 text-green-600" />
                          </div>
                          <div>
                            <h4 className="text-2xl font-bold text-slate-800 mb-2">Institution</h4>
                            <Badge className="bg-purple-100 text-purple-700 font-medium px-3 py-1">For Employers</Badge>
                          </div>
                        </div>
                        <p className="text-slate-600 leading-relaxed mb-4">
                          I represent an educational institution and want to post job openings,
                          find qualified faculty members, and manage recruitment efficiently.
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-green-600 font-medium">
                            <CheckCircle className="w-4 h-4 mr-3" />
                            <span>Post unlimited jobs</span>
                          </div>
                          <div className="flex items-center text-sm text-green-600 font-medium">
                            <CheckCircle className="w-4 h-4 mr-3" />
                            <span>Access to qualified candidates</span>
                          </div>
                        </div>
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Basic Information */}
                {currentStep === steps.basicInfo && (
                  <motion.div
                    key="basicInfo"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <Label htmlFor="firstName" className="text-sm font-semibold text-slate-700 mb-2 block">First Name *</Label>
                        <Input
                          {...register('firstName', { required: 'First name is required' })}
                          placeholder="Enter your first name"
                          className="mt-2 h-12 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-all duration-200"
                        />
                        {errors.firstName && (
                          <p className="text-red-600 text-sm mt-2 font-medium">{errors.firstName.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="lastName" className="text-sm font-semibold text-slate-700 mb-2 block">Last Name *</Label>
                        <Input
                          {...register('lastName', { required: 'Last name is required' })}
                          placeholder="Enter your last name"
                          className="mt-2 h-12 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-all duration-200"
                        />
                        {errors.lastName && (
                          <p className="text-red-600 text-sm mt-2 font-medium">{errors.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-sm font-semibold text-slate-700 mb-2 block">Email Address *</Label>
                      <div className="relative mt-2">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <Input
                          {...register('email', {
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address'
                            }
                          })}
                          type="email"
                          placeholder="Enter your email address"
                          className="pl-12 h-12 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-all duration-200"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-600 text-sm mt-2 font-medium">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-sm font-semibold text-slate-700 mb-2 block">Phone Number *</Label>
                      <div className="relative mt-2">
                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <Input
                          {...register('phone', {
                            required: 'Phone number is required',
                            pattern: {
                              value: /^[+]?[1-9][\d\s\-\(\)]{8,15}$/,
                              message: 'Invalid phone number'
                            }
                          })}
                          type="tel"
                          placeholder="Enter your phone number"
                          className="pl-12 h-12 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-all duration-200"
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-600 text-sm mt-2 font-medium">{errors.phone.message}</p>
                      )}
                    </div>

                    {selectedRole === 'employer' && (
                      <div>
                        <Label htmlFor="designation" className="text-sm font-semibold text-slate-700 mb-2 block">Your Designation *</Label>
                        <div className="relative mt-2">
                          <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                          <Input
                            {...register('designation', { required: 'Designation is required' })}
                            placeholder="e.g., HR Manager, Principal, Dean"
                            className="pl-12 h-12 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-all duration-200"
                          />
                        </div>
                        {errors.designation && (
                          <p className="text-red-600 text-sm mt-2 font-medium">{errors.designation.message}</p>
                        )}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <Label htmlFor="password" className="text-sm font-semibold text-slate-700 mb-2 block">Password *</Label>
                        <div className="relative mt-2">
                          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                          <Input
                            {...register('password', {
                              required: 'Password is required',
                              minLength: { value: 8, message: 'Password must be at least 8 characters' },
                              pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                message: 'Password must contain uppercase, lowercase, and number'
                              }
                            })}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Create a strong password"
                            className="pl-12 pr-12 h-12 border-slate-300 rounded-xl focus:border-blue-500 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-all duration-200"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-blue-600 transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-5 w-5 text-slate-400" /> : <Eye className="h-5 w-5 text-slate-400" />}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="text-red-600 text-sm mt-2 font-medium">{errors.password.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="confirmPassword">Confirm Password *</Label>
                        <div className="relative mt-1">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            {...register('confirmPassword', { 
                              required: 'Please confirm your password',
                              validate: (value) => value === watchAllFields.password || 'Passwords do not match'
                            })}
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm your password"
                            className="pl-10 pr-10"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                          </button>
                        </div>
                        {errors.confirmPassword && (
                          <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Additional Information */}
                {currentStep === steps.additionalInfo && selectedRole === 'faculty' && (
                  <motion.div
                    key="facultyAdditionalInfo"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Academic Information</h3>
                      <p className="text-gray-600">Help us understand your academic background (optional)</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="currentDesignation">Current Designation</Label>
                        <Input
                          {...register('currentDesignation')}
                          placeholder="e.g., Assistant Professor, Lecturer"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="currentInstitution">Current Institution</Label>
                        <Input
                          {...register('currentInstitution')}
                          placeholder="e.g., Anna University"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="teachingExperience">Teaching Experience (Years)</Label>
                        <Input
                          {...register('teachingExperience', { valueAsNumber: true })}
                          type="number"
                          placeholder="e.g., 5"
                          className="mt-1"
                          min="0"
                          max="50"
                        />
                      </div>

                      <div>
                        <Label htmlFor="specialization">Specialization</Label>
                        <Input
                          {...register('specialization')}
                          placeholder="e.g., Computer Science, Mathematics"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <div className="relative mt-1">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            {...register('city')}
                            placeholder="e.g., Chennai"
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          {...register('state')}
                          placeholder="e.g., Tamil Nadu"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bio">Professional Bio</Label>
                      <Textarea
                        {...register('bio')}
                        placeholder="Brief description of your academic background and interests"
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                  </motion.div>
                )}

                {currentStep === steps.additionalInfo && selectedRole === 'employer' && (
                  <motion.div
                    key="employerAdditionalInfo"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Institution Details</h3>
                      <p className="text-gray-600">Tell us about your educational institution</p>
                    </div>

                    <div>
                      <Label htmlFor="instituteName">Institution Name *</Label>
                      <div className="relative mt-1">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          {...register('instituteName', { required: 'Institution name is required' })}
                          placeholder="Enter institution name"
                          className="pl-10"
                        />
                      </div>
                      {errors.instituteName && (
                        <p className="text-red-600 text-sm mt-1">{errors.instituteName.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="instituteType">Institution Type</Label>
                        <Select onValueChange={(value) => setValue('instituteType', value)}>
                          <SelectTrigger className="mt-1">
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
                        <div className="relative mt-1">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            {...register('established', { valueAsNumber: true })}
                            type="number"
                            placeholder="e.g., 1985"
                            className="pl-10"
                            min="1800"
                            max="2024"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="location.city">City *</Label>
                        <div className="relative mt-1">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            {...register('location.city', { required: 'City is required' })}
                            placeholder="e.g., Chennai"
                            className="pl-10"
                          />
                        </div>
                        {errors.location?.city && (
                          <p className="text-red-600 text-sm mt-1">{errors.location.city.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="location.state">State *</Label>
                        <Input
                          {...register('location.state', { required: 'State is required' })}
                          placeholder="e.g., Tamil Nadu"
                          className="mt-1"
                        />
                        {errors.location?.state && (
                          <p className="text-red-600 text-sm mt-1">{errors.location.state.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        {...register('website')}
                        type="url"
                        placeholder="https://www.yourinstitution.edu"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Institution Description</Label>
                      <Textarea
                        {...register('description')}
                        placeholder="Brief description of your institution"
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Profile Picture & Verification */}
                {currentStep === steps.verification && (
                  <motion.div
                    key="verification"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile Picture</h3>
                      <p className="text-gray-600">Add a profile picture to make your profile stand out (optional)</p>
                    </div>

                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative">
                        {profileImagePreview ? (
                          <div className="relative">
                            <img
                              src={profileImagePreview}
                              alt="Profile preview"
                              className="w-32 h-32 rounded-full object-cover border-4 border-blue-200"
                            />
                            <button
                              type="button"
                              onClick={removeProfileImage}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="w-32 h-32 rounded-full bg-gray-100 border-4 border-dashed border-gray-300 flex items-center justify-center">
                            <Camera className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>

                      <div className="text-center">
                        <input
                          type="file"
                          id="profileImage"
                          accept="image/jpeg,image/jpg,image/png"
                          onChange={handleProfileImageChange}
                          className="hidden"
                        />
                        <label
                          htmlFor="profileImage"
                          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Profile Picture
                        </label>
                        <p className="text-xs text-gray-500 mt-2">
                          JPG, JPEG, or PNG. Max size 2MB.
                        </p>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-blue-900 mb-4">Almost Done! 🎉</h4>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                          <span className="text-sm text-gray-700">Basic information completed</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                          <span className="text-sm text-gray-700">
                            {selectedRole === 'faculty' ? 'Academic details' : 'Institution details'} added
                          </span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                          <span className="text-sm text-gray-700">Profile picture uploaded</span>
                        </div>
                      </div>
                      <p className="text-sm text-blue-700 mt-4">
                        Click "Create Account" to complete your registration and start exploring opportunities.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === steps.roleSelection}
                  className="px-6"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {currentStep < steps.verification ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={!selectedRole && currentStep === steps.roleSelection}
                    className="px-6"
                  >
                    Next
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 bg-blue-600 hover:bg-blue-700"
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                    <CheckCircle className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </form>

            {/* Sign In Link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link
                  to={selectedRole ? `/login?role=${selectedRole}` : "/login"}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
