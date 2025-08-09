import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ArrowLeft,
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Briefcase,
  Settings,
  Save,
  Upload,
  Edit,
  CheckCircle,
  Building,
  Globe,
  Calendar
} from 'lucide-react';

// Profile form schemas
const candidateProfileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  bio: z.string().max(500, 'Bio must be less than 500 characters'),
  location: z.object({
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    district: z.string().optional(),
  }),
  skills: z.string(),
});

const employerProfileSchema = z.object({
  instituteName: z.string().min(2, 'Institution name is required'),
  contactPersonName: z.string().min(2, 'Contact person name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  website: z.string().url('Please enter a valid website URL').optional().or(z.literal('')),
  description: z.string().max(1000, 'Description must be less than 1000 characters'),
  location: z.object({
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    address: z.string().min(5, 'Address is required'),
  }),
});

type CandidateProfileFormData = z.infer<typeof candidateProfileSchema>;
type EmployerProfileFormData = z.infer<typeof employerProfileSchema>;

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Mock data based on user role
  const mockCandidateData = {
    firstName: 'John',
    lastName: 'Doe',
    email: user?.email || 'john.doe@example.com',
    phone: '+91 9876543210',
    bio: 'Experienced Computer Science educator with expertise in AI/ML and web development. Passionate about teaching and mentoring students.',
    location: {
      city: 'Chennai',
      state: 'Tamil Nadu',
      district: 'Chennai',
    },
    skills: 'Python, Machine Learning, Data Structures, Algorithms, Web Development',
    profileImage: '',
    education: [
      {
        degree: 'Ph.D in Computer Science',
        university: 'Anna University',
        year: 2020,
        specialization: 'Artificial Intelligence'
      },
      {
        degree: 'M.Tech in Computer Science',
        university: 'IIT Madras',
        year: 2016,
        specialization: 'Software Engineering'
      }
    ],
    experience: [
      {
        designation: 'Assistant Professor',
        institute: 'PSG College of Technology',
        duration: '2020 - Present',
        description: 'Teaching undergraduate and graduate courses in Computer Science'
      }
    ]
  };

  const mockEmployerData = {
    instituteName: 'PSG College of Technology',
    contactPersonName: 'Dr. Rajesh Kumar',
    email: user?.email || 'hr@psgtech.edu',
    phone: '+91 422 2572177',
    website: 'https://www.psgtech.edu',
    description: 'PSG College of Technology is a premier engineering institution established in 1951. We offer undergraduate and postgraduate programs in various engineering disciplines.',
    location: {
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      address: 'Peelamedu, Coimbatore - 641004',
    },
    established: 1951,
    type: 'college' as const,
  };

  const candidateForm = useForm<CandidateProfileFormData>({
    resolver: zodResolver(candidateProfileSchema),
    defaultValues: {
      firstName: mockCandidateData.firstName,
      lastName: mockCandidateData.lastName,
      email: mockCandidateData.email,
      phone: mockCandidateData.phone,
      bio: mockCandidateData.bio,
      location: mockCandidateData.location,
      skills: mockCandidateData.skills,
    },
  });

  const employerForm = useForm<EmployerProfileFormData>({
    resolver: zodResolver(employerProfileSchema),
    defaultValues: {
      instituteName: mockEmployerData.instituteName,
      contactPersonName: mockEmployerData.contactPersonName,
      email: mockEmployerData.email,
      phone: mockEmployerData.phone,
      website: mockEmployerData.website,
      description: mockEmployerData.description,
      location: mockEmployerData.location,
    },
  });

  const handleCandidateSubmit = async (data: CandidateProfileFormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Candidate profile updated:', data);
    setIsEditing(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleEmployerSubmit = async (data: EmployerProfileFormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Employer profile updated:', data);
    setIsEditing(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#DDDAD0] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">Please log in to view your profile.</p>
          <Button onClick={() => navigate('/login')}>
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#DDDAD0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Success Message */}
        {showSuccessMessage && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              Profile updated successfully!
            </AlertDescription>
          </Alert>
        )}

        {/* Profile Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-lg font-semibold bg-blue-100 text-blue-600">
                    {user.role === 'candidate' 
                      ? `${mockCandidateData.firstName[0]}${mockCandidateData.lastName[0]}`
                      : mockEmployerData.contactPersonName.split(' ').map(n => n[0]).join('')
                    }
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {user.role === 'candidate' 
                      ? `${mockCandidateData.firstName} ${mockCandidateData.lastName}`
                      : mockEmployerData.instituteName
                    }
                  </h1>
                  <Badge className={user.role === 'candidate' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}>
                    {user.role === 'candidate' ? 'Faculty Candidate' : 'Institution'}
                  </Badge>
                </div>
              </div>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant={isEditing ? "outline" : "default"}
              >
                <Edit className="w-4 h-4 mr-2" />
                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Profile Content */}
        {user.role === 'candidate' ? (
          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={candidateForm.handleSubmit(handleCandidateSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          {...candidateForm.register('firstName')}
                          disabled={!isEditing}
                          className={!isEditing ? 'bg-[#DDDAD0]' : ''}
                        />
                        {candidateForm.formState.errors.firstName && (
                          <p className="text-sm text-red-600 mt-1">
                            {candidateForm.formState.errors.firstName.message}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          {...candidateForm.register('lastName')}
                          disabled={!isEditing}
                          className={!isEditing ? 'bg-[#DDDAD0]' : ''}
                        />
                        {candidateForm.formState.errors.lastName && (
                          <p className="text-sm text-red-600 mt-1">
                            {candidateForm.formState.errors.lastName.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          {...candidateForm.register('email')}
                          type="email"
                          disabled={!isEditing}
                          className={!isEditing ? 'bg-[#DDDAD0]' : ''}
                        />
                        {candidateForm.formState.errors.email && (
                          <p className="text-sm text-red-600 mt-1">
                            {candidateForm.formState.errors.email.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          {...candidateForm.register('phone')}
                          disabled={!isEditing}
                          className={!isEditing ? 'bg-[#DDDAD0]' : ''}
                        />
                        {candidateForm.formState.errors.phone && (
                          <p className="text-sm text-red-600 mt-1">
                            {candidateForm.formState.errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          {...candidateForm.register('location.city')}
                          disabled={!isEditing}
                          className={!isEditing ? 'bg-[#DDDAD0]' : ''}
                        />
                      </div>

                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          {...candidateForm.register('location.state')}
                          disabled={!isEditing}
                          className={!isEditing ? 'bg-[#DDDAD0]' : ''}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bio">Bio/Summary</Label>
                      <Textarea
                        {...candidateForm.register('bio')}
                        rows={4}
                        disabled={!isEditing}
                        className={!isEditing ? 'bg-[#DDDAD0]' : ''}
                      />
                      {candidateForm.formState.errors.bio && (
                        <p className="text-sm text-red-600 mt-1">
                          {candidateForm.formState.errors.bio.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="skills">Skills (comma-separated)</Label>
                      <Textarea
                        {...candidateForm.register('skills')}
                        rows={3}
                        disabled={!isEditing}
                        className={!isEditing ? 'bg-[#DDDAD0]' : ''}
                      />
                    </div>

                    {isEditing && (
                      <div className="flex justify-end">
                        <Button type="submit" disabled={candidateForm.formState.isSubmitting}>
                          <Save className="w-4 h-4 mr-2" />
                          {candidateForm.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
                        </Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="w-5 h-5 mr-2" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockCandidateData.education.map((edu, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                        <p className="text-sm text-gray-600">{edu.university} • {edu.year}</p>
                        <p className="text-sm text-gray-500">{edu.specialization}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Briefcase className="w-5 h-5 mr-2" />
                    Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockCandidateData.experience.map((exp, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h3 className="font-medium text-gray-900">{exp.designation}</h3>
                        <p className="text-sm text-gray-600">{exp.institute}</p>
                        <p className="text-sm text-gray-500">{exp.duration}</p>
                        <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          // Employer Profile
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="w-5 h-5 mr-2" />
                Institution Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={employerForm.handleSubmit(handleEmployerSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="instituteName">Institution Name</Label>
                    <Input
                      {...employerForm.register('instituteName')}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-[#DDDAD0]' : ''}
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactPersonName">Contact Person</Label>
                    <Input
                      {...employerForm.register('contactPersonName')}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-[#DDDAD0]' : ''}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      {...employerForm.register('email')}
                      type="email"
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-[#DDDAD0]' : ''}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      {...employerForm.register('phone')}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-[#DDDAD0]' : ''}
                    />
                  </div>

                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      {...employerForm.register('website')}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-[#DDDAD0]' : ''}
                    />
                  </div>

                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      {...employerForm.register('location.city')}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-[#DDDAD0]' : ''}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    {...employerForm.register('location.address')}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-[#DDDAD0]' : ''}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Institution Description</Label>
                  <Textarea
                    {...employerForm.register('description')}
                    rows={4}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-[#DDDAD0]' : ''}
                  />
                </div>

                {isEditing && (
                  <div className="flex justify-end">
                    <Button type="submit" disabled={employerForm.formState.isSubmitting}>
                      <Save className="w-4 h-4 mr-2" />
                      {employerForm.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
