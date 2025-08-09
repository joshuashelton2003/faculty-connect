import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  ArrowLeft
} from 'lucide-react';

interface RegisterFormData {
  role: 'candidate' | 'employer';
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
  instituteName?: string;
  designation?: string;
}

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'candidate' | 'employer' | ''>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterFormData>();

  const watchRole = watch('role');

  const onSubmit = async (data: RegisterFormData) => {
    // Mock registration - in real app this would call an API
    console.log('Registration data:', data);
    
    // Simulate successful registration
    setTimeout(() => {
      if (data.role === 'employer') {
        navigate('/employer/dashboard');
      } else {
        navigate('/dashboard');
      }
    }, 1000);
  };

  const handleRoleSelect = (role: 'candidate' | 'employer') => {
    setSelectedRole(role);
    setValue('role', role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-2 left-2 z-50 text-blue-500 font-semibold flex items-center hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back
      </Link>

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">FC</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                Faculty<span className="text-blue-600">Connect</span>
              </span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h2>
          <p className="text-gray-600">Join the leading faculty recruitment platform</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
          {/* Role Selection */}
          {!selectedRole && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">I want to join as:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleRoleSelect('candidate')}
                  className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left group"
                >
                  <div className="flex items-center mb-3">
                    <GraduationCap className="w-8 h-8 text-blue-600 mr-3" />
                    <h4 className="text-lg font-semibold text-gray-900">Faculty/Educator</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    I'm looking for teaching positions at schools, colleges, and universities
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleSelect('employer')}
                  className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left group"
                >
                  <div className="flex items-center mb-3">
                    <Building className="w-8 h-8 text-blue-600 mr-3" />
                    <h4 className="text-lg font-semibold text-gray-900">Institution/Employer</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    I want to post job openings and hire qualified faculty members
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* Registration Form */}
          {selectedRole && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <input type="hidden" {...register('role')} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    {...register('firstName', { required: 'First name is required' })}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <p className="text-red-600 text-sm">{errors.firstName.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    {...register('lastName', { required: 'Last name is required' })}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <p className="text-red-600 text-sm">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  {...register('email', { required: 'Email is required' })}
                  type="email"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  {...register('phone', { required: 'Phone number is required' })}
                  type="tel"
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm">{errors.phone.message}</p>
                )}
              </div>

              {selectedRole === 'employer' && (
                <div className="space-y-4 p-4 bg-[#DDDAD0] rounded-lg">
                  <h4 className="font-medium text-gray-900">Institution Details</h4>
                  
                  <div>
                    <Label htmlFor="instituteName">Institution Name</Label>
                    <Input
                      {...register('instituteName', { required: 'Institution name is required' })}
                      placeholder="Enter institution name"
                    />
                    {errors.instituteName && (
                      <p className="text-red-600 text-sm">{errors.instituteName.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="designation">Your Designation</Label>
                    <Input
                      {...register('designation', { required: 'Designation is required' })}
                      placeholder="e.g., HR Manager, Principal, Dean"
                    />
                    {errors.designation && (
                      <p className="text-red-600 text-sm">{errors.designation.message}</p>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-600 text-sm">{errors.password.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      {...register('confirmPassword', { required: 'Please confirm your password' })}
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>

              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
