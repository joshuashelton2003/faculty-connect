import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useJobsStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Plus, 
  X,
  Save,
  Send,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  FileText,
  Building,
  GraduationCap,
  Briefcase,
  Clock,
  Globe,
  AlertCircle
} from 'lucide-react';

// Validation schema
const jobSchema = z.object({
  title: z.string().min(5, 'Job title must be at least 5 characters'),
  shortDescription: z.string().min(20, 'Short description must be at least 20 characters'),
  description: z.string().min(100, 'Full description must be at least 100 characters'),
  department: z.string().min(2, 'Department is required'),
  subject: z.string().min(2, 'Subject is required'),
  location: z.object({
    country: z.string().min(1, 'Country is required'),
    state: z.string().min(1, 'State is required'),
    district: z.string().min(1, 'District is required'),
    city: z.string().min(1, 'City is required'),
    pincode: z.string().optional(),
    address: z.string().optional()
  }),
  salary: z.object({
    min: z.number().min(1000, 'Minimum salary must be at least ₹1,000'),
    max: z.number().min(1000, 'Maximum salary must be at least ₹1,000'),
    currency: z.string().default('INR'),
    negotiable: z.boolean().default(true)
  }),
  requirements: z.object({
    education: z.array(z.string()).min(1, 'At least one education requirement is needed'),
    experience: z.string().min(1, 'Experience requirement is needed'),
    skills: z.array(z.string()).min(1, 'At least one skill is required'),
    certifications: z.array(z.string()).optional()
  }),
  responsibilities: z.array(z.string()).min(1, 'At least one responsibility is required'),
  benefits: z.array(z.string()).min(1, 'At least one benefit is required'),
  employmentType: z.enum(['full-time', 'part-time', 'contract', 'visiting']),
  workMode: z.enum(['on-site', 'remote', 'hybrid']),
  applicationTypes: z.array(z.string()).min(1, 'At least one application type is required'),
  deadline: z.string().min(1, 'Application deadline is required'),
  positions: z.number().min(1, 'At least one position is required'),
  tags: z.array(z.string()).optional()
}).refine((data) => data.salary.max >= data.salary.min, {
  message: "Maximum salary must be greater than or equal to minimum salary",
  path: ["salary.max"]
});

type JobFormData = z.infer<typeof jobSchema>;

const PostNewJob: React.FC = () => {
  const navigate = useNavigate();
  const { createJob, isLoading } = useJobsStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [newSkill, setNewSkill] = useState('');
  const [newResponsibility, setNewResponsibility] = useState('');
  const [newBenefit, setNewBenefit] = useState('');

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      location: {
        country: 'India',
        state: 'Tamil Nadu',
        district: '',
        city: '',
        pincode: '',
        address: ''
      },
      salary: {
        min: 30000,
        max: 80000,
        currency: 'INR',
        negotiable: true
      },
      requirements: {
        education: [],
        experience: '',
        skills: [],
        certifications: []
      },
      responsibilities: [],
      benefits: [],
      employmentType: 'full-time',
      workMode: 'on-site',
      applicationTypes: ['online'],
      positions: 1,
      tags: []
    }
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation
  } = useFieldArray({
    control,
    name: 'requirements.education'
  });

  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill
  } = useFieldArray({
    control,
    name: 'requirements.skills'
  });

  const {
    fields: responsibilityFields,
    append: appendResponsibility,
    remove: removeResponsibility
  } = useFieldArray({
    control,
    name: 'responsibilities'
  });

  const {
    fields: benefitFields,
    append: appendBenefit,
    remove: removeBenefit
  } = useFieldArray({
    control,
    name: 'benefits'
  });

  const steps = [
    { number: 1, title: 'Basic Information', icon: FileText },
    { number: 2, title: 'Location & Salary', icon: MapPin },
    { number: 3, title: 'Requirements', icon: GraduationCap },
    { number: 4, title: 'Details & Benefits', icon: Briefcase },
    { number: 5, title: 'Review & Submit', icon: Send }
  ];

  // Predefined options
  const educationOptions = [
    'Ph.D in relevant field',
    'M.Tech/M.E in relevant field', 
    'M.Sc/M.A in relevant field',
    'B.Tech/B.E in relevant field',
    'B.Sc/B.A in relevant field',
    'UGC NET qualified',
    'GATE qualified',
    'B.Ed degree',
    'Teaching experience'
  ];

  const skillOptions = [
    'Teaching', 'Research', 'Academic Writing', 'Project Management',
    'Communication Skills', 'Leadership', 'Team Management', 'Mentoring',
    'Curriculum Development', 'Assessment & Evaluation', 'Data Analysis',
    'Computer Proficiency', 'Laboratory Skills', 'Industry Experience'
  ];

  const responsibilityOptions = [
    'Teach undergraduate and graduate courses',
    'Conduct cutting-edge research',
    'Supervise student projects and thesis',
    'Participate in academic committees',
    'Collaborate with industry partners',
    'Publish research papers',
    'Organize workshops and seminars',
    'Mentor junior faculty',
    'Develop course curricula',
    'Evaluate student performance'
  ];

  const benefitOptions = [
    'Competitive salary package',
    'Health insurance coverage',
    'Provident fund',
    'Research funding support',
    'Conference attendance support',
    'Professional development opportunities',
    'Campus accommodation',
    'Transportation facility',
    'Annual performance bonus',
    'Sabbatical leave opportunities',
    'Library and laboratory access',
    'Collaborative research environment'
  ];

  const states = [
    'Tamil Nadu', 'Karnataka', 'Kerala', 'Andhra Pradesh', 'Telangana',
    'Maharashtra', 'Gujarat', 'Rajasthan', 'West Bengal', 'Odisha'
  ];

  const tamilNaduDistricts = [
    'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem',
    'Tirunelveli', 'Tiruppur', 'Vellore', 'Erode', 'Thanjavur',
    'Dindigul', 'Cuddalore', 'Kanchipuram', 'Karur', 'Namakkal'
  ];

  const onSubmit = async (data: JobFormData) => {
    try {
      // Add additional fields for job creation
      const jobData = {
        ...data,
        instituteId: 'inst_001', // In real app, get from logged in employer
        employerId: 'emp_001',
        institute: {} as any, // Will be populated by the store
        employer: {} as any,
        isPremium: false,
        isFeatured: false,
        isActive: true
      };

      await createJob(jobData);
      navigate('/employer/my-jobs');
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      appendSkill(newSkill.trim());
      setNewSkill('');
    }
  };

  const addResponsibility = () => {
    if (newResponsibility.trim()) {
      appendResponsibility(newResponsibility.trim());
      setNewResponsibility('');
    }
  };

  const addBenefit = () => {
    if (newBenefit.trim()) {
      appendBenefit(newBenefit.trim());
      setNewBenefit('');
    }
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const StepNavigation = () => (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div 
            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              currentStep >= step.number 
                ? 'bg-blue-600 border-blue-600 text-white' 
                : 'border-gray-300 text-gray-400'
            }`}
          >
            <step.icon className="w-5 h-5" />
          </div>
          <div className="ml-3 hidden md:block">
            <p className={`text-sm font-medium ${
              currentStep >= step.number ? 'text-blue-600' : 'text-gray-400'
            }`}>
              Step {step.number}
            </p>
            <p className={`text-xs ${
              currentStep >= step.number ? 'text-gray-900' : 'text-gray-400'
            }`}>
              {step.title}
            </p>
          </div>
          {index < steps.length - 1 && (
            <div className={`w-12 h-0.5 mx-4 ${
              currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const Step1BasicInfo = () => (
    <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Basic Job Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="title">Job Title *</Label>
            <Input
              id="title"
              {...register('title')}
              placeholder="e.g., Assistant Professor - Computer Science"
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="department">Department *</Label>
            <Input
              id="department"
              {...register('department')}
              placeholder="e.g., Computer Science"
              className={errors.department ? 'border-red-500' : ''}
            />
            {errors.department && (
              <p className="text-red-500 text-sm mt-1">{errors.department.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="subject">Subject Area *</Label>
            <Input
              id="subject"
              {...register('subject')}
              placeholder="e.g., Data Structures, Machine Learning"
              className={errors.subject ? 'border-red-500' : ''}
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="positions">Number of Positions *</Label>
            <Input
              id="positions"
              type="number"
              min="1"
              {...register('positions', { valueAsNumber: true })}
              className={errors.positions ? 'border-red-500' : ''}
            />
            {errors.positions && (
              <p className="text-red-500 text-sm mt-1">{errors.positions.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="shortDescription">Short Description *</Label>
          <Textarea
            id="shortDescription"
            {...register('shortDescription')}
            placeholder="Brief description of the role and key highlights..."
            rows={3}
            className={errors.shortDescription ? 'border-red-500' : ''}
          />
          {errors.shortDescription && (
            <p className="text-red-500 text-sm mt-1">{errors.shortDescription.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="description">Full Job Description *</Label>
          <Textarea
            id="description"
            {...register('description')}
            placeholder="Detailed job description including role overview, key responsibilities, and what makes this opportunity special..."
            rows={6}
            className={errors.description ? 'border-red-500' : ''}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const Step2LocationSalary = () => (
    <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Location & Compensation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="country">Country *</Label>
            <Controller
              name="location.country"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className={errors.location?.country ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="India">India</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.location?.country && (
              <p className="text-red-500 text-sm mt-1">{errors.location.country.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="state">State *</Label>
            <Controller
              name="location.state"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className={errors.location?.state ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.location?.state && (
              <p className="text-red-500 text-sm mt-1">{errors.location.state.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="district">District *</Label>
            <Controller
              name="location.district"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className={errors.location?.district ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    {tamilNaduDistricts.map(district => (
                      <SelectItem key={district} value={district}>{district}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.location?.district && (
              <p className="text-red-500 text-sm mt-1">{errors.location.district.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              {...register('location.city')}
              placeholder="Enter city name"
              className={errors.location?.city ? 'border-red-500' : ''}
            />
            {errors.location?.city && (
              <p className="text-red-500 text-sm mt-1">{errors.location.city.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="pincode">Pincode</Label>
            <Input
              id="pincode"
              {...register('location.pincode')}
              placeholder="e.g., 600001"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="address">Complete Address</Label>
          <Textarea
            id="address"
            {...register('location.address')}
            placeholder="Institution address..."
            rows={2}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="salaryMin">Minimum Salary (₹/month) *</Label>
            <Input
              id="salaryMin"
              type="number"
              {...register('salary.min', { valueAsNumber: true })}
              placeholder="30000"
              className={errors.salary?.min ? 'border-red-500' : ''}
            />
            {errors.salary?.min && (
              <p className="text-red-500 text-sm mt-1">{errors.salary.min.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="salaryMax">Maximum Salary (₹/month) *</Label>
            <Input
              id="salaryMax"
              type="number"
              {...register('salary.max', { valueAsNumber: true })}
              placeholder="80000"
              className={errors.salary?.max ? 'border-red-500' : ''}
            />
            {errors.salary?.max && (
              <p className="text-red-500 text-sm mt-1">{errors.salary.max.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="employmentType">Employment Type *</Label>
            <Controller
              name="employmentType"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-Time</SelectItem>
                    <SelectItem value="part-time">Part-Time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="visiting">Visiting</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          
          <div>
            <Label htmlFor="workMode">Work Mode</Label>
            <Controller
              name="workMode"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="on-site">On-Site</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div>
            <Label htmlFor="deadline">Application Deadline *</Label>
            <Input
              id="deadline"
              type="date"
              {...register('deadline')}
              className={errors.deadline ? 'border-red-500' : ''}
            />
            {errors.deadline && (
              <p className="text-red-500 text-sm mt-1">{errors.deadline.message}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const Step3Requirements = () => (
    <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          <GraduationCap className="w-5 h-5 mr-2" />
          Job Requirements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Education Requirements */}
        <div>
          <Label>Education Requirements *</Label>
          <div className="space-y-3">
            {educationFields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2">
                <Input
                  {...register(`requirements.education.${index}` as const)}
                  placeholder="Education requirement"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeEducation(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <div className="flex flex-wrap gap-2 mb-2">
              {educationOptions.map((option) => (
                <Badge
                  key={option}
                  variant="outline"
                  className="cursor-pointer hover:bg-blue-50"
                  onClick={() => appendEducation(option)}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  {option}
                </Badge>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendEducation('')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Custom Requirement
            </Button>
          </div>
          {errors.requirements?.education && (
            <p className="text-red-500 text-sm mt-1">{errors.requirements.education.message}</p>
          )}
        </div>

        {/* Experience */}
        <div>
          <Label htmlFor="experience">Experience Requirement *</Label>
          <Input
            id="experience"
            {...register('requirements.experience')}
            placeholder="e.g., 2-5 years of teaching and research experience"
            className={errors.requirements?.experience ? 'border-red-500' : ''}
          />
          {errors.requirements?.experience && (
            <p className="text-red-500 text-sm mt-1">{errors.requirements.experience.message}</p>
          )}
        </div>

        {/* Skills */}
        <div>
          <Label>Skills Required *</Label>
          <div className="space-y-3">
            {skillFields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2">
                <Input
                  {...register(`requirements.skills.${index}` as const)}
                  placeholder="Required skill"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeSkill(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <div className="flex flex-wrap gap-2 mb-2">
              {skillOptions.map((option) => (
                <Badge
                  key={option}
                  variant="outline"
                  className="cursor-pointer hover:bg-blue-50"
                  onClick={() => appendSkill(option)}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  {option}
                </Badge>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add custom skill"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                className="flex-1"
              />
              <Button type="button" variant="outline" size="sm" onClick={addSkill}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
          {errors.requirements?.skills && (
            <p className="text-red-500 text-sm mt-1">{errors.requirements.skills.message}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const Step4Details = () => (
    <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Briefcase className="w-5 h-5 mr-2" />
          Responsibilities & Benefits
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Responsibilities */}
        <div>
          <Label>Key Responsibilities *</Label>
          <div className="space-y-3">
            {responsibilityFields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2">
                <Textarea
                  {...register(`responsibilities.${index}` as const)}
                  placeholder="Key responsibility"
                  rows={2}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeResponsibility(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <div className="flex flex-wrap gap-2 mb-2">
              {responsibilityOptions.map((option) => (
                <Badge
                  key={option}
                  variant="outline"
                  className="cursor-pointer hover:bg-blue-50"
                  onClick={() => appendResponsibility(option)}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  {option}
                </Badge>
              ))}
            </div>
            <div className="flex space-x-2">
              <Textarea
                value={newResponsibility}
                onChange={(e) => setNewResponsibility(e.target.value)}
                placeholder="Add custom responsibility"
                rows={2}
                className="flex-1"
              />
              <Button type="button" variant="outline" size="sm" onClick={addResponsibility}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
          {errors.responsibilities && (
            <p className="text-red-500 text-sm mt-1">{errors.responsibilities.message}</p>
          )}
        </div>

        {/* Benefits */}
        <div>
          <Label>Benefits & Perks *</Label>
          <div className="space-y-3">
            {benefitFields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-2">
                <Input
                  {...register(`benefits.${index}` as const)}
                  placeholder="Benefit or perk"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeBenefit(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <div className="flex flex-wrap gap-2 mb-2">
              {benefitOptions.map((option) => (
                <Badge
                  key={option}
                  variant="outline"
                  className="cursor-pointer hover:bg-blue-50"
                  onClick={() => appendBenefit(option)}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  {option}
                </Badge>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                value={newBenefit}
                onChange={(e) => setNewBenefit(e.target.value)}
                placeholder="Add custom benefit"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
                className="flex-1"
              />
              <Button type="button" variant="outline" size="sm" onClick={addBenefit}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
          {errors.benefits && (
            <p className="text-red-500 text-sm mt-1">{errors.benefits.message}</p>
          )}
        </div>

        {/* Application Types */}
        <div>
          <Label>Application Methods</Label>
          <div className="space-y-2">
            {['online', 'email', 'walk-in', 'postal'].map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Controller
                  name="applicationTypes"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id={type}
                      checked={field.value?.includes(type)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...field.value, type]);
                        } else {
                          field.onChange(field.value?.filter((t: string) => t !== type));
                        }
                      }}
                    />
                  )}
                />
                <Label htmlFor={type} className="capitalize">
                  {type === 'walk-in' ? 'Walk-in Interview' : type}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const Step5Review = () => {
    const formData = getValues();
    
    return (
      <Card className="bg-white border border-gray-200 shadow-md rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Send className="w-5 h-5 mr-2" />
            Review & Submit
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Job Overview */}
          <div className="border-b pb-4">
            <h3 className="font-semibold text-lg text-gray-900 mb-2">{formData.title}</h3>
            <p className="text-gray-600 mb-3">{formData.shortDescription}</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{formData.department}</Badge>
              <Badge variant="secondary">{formData.employmentType}</Badge>
              <Badge variant="secondary">{formData.workMode}</Badge>
              <Badge variant="secondary">{formData.positions} positions</Badge>
            </div>
          </div>

          {/* Location & Salary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Location</h4>
              <p className="text-sm text-gray-600">
                {formData.location.city}, {formData.location.district}, {formData.location.state}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Salary Range</h4>
              <p className="text-sm text-gray-600">
                ₹{formData.salary.min.toLocaleString()} - ₹{formData.salary.max.toLocaleString()} per month
                {formData.salary.negotiable && ' (Negotiable)'}
              </p>
            </div>
          </div>

          {/* Requirements Summary */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Requirements Summary</h4>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <strong>Education:</strong> {formData.requirements.education.join(', ')}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Experience:</strong> {formData.requirements.experience}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Skills:</strong> {formData.requirements.skills.join(', ')}
              </p>
            </div>
          </div>

          {/* Deadline */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-900">
                Application Deadline: {new Date(formData.deadline).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Terms */}
          <div className="bg-[#DDDAD0] p-4 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-900 font-medium">Before submitting:</p>
                <ul className="text-sm text-gray-600 list-disc list-inside mt-1 space-y-1">
                  <li>Ensure all information is accurate and complete</li>
                  <li>Review salary range and benefits for competitiveness</li>
                  <li>Verify application deadline is realistic</li>
                  <li>Confirm location and requirements are clearly stated</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return <Step1BasicInfo />;
      case 2: return <Step2LocationSalary />;
      case 3: return <Step3Requirements />;
      case 4: return <Step4Details />;
      case 5: return <Step5Review />;
      default: return <Step1BasicInfo />;
    }
  };

  return (
    <div className="min-h-screen bg-[#DDDAD0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/employer/my-jobs')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to My Jobs
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post New Job</h1>
          <p className="text-gray-600">
            Create a comprehensive job posting to attract the best candidates
          </p>
        </div>

        {/* Step Navigation */}
        <StepNavigation />

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderCurrentStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            <div className="flex space-x-3">
              {currentStep < 5 ? (
                <Button type="button" onClick={nextStep}>
                  Next Step
                </Button>
              ) : (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isLoading}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Draft
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Publishing...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Publish Job
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostNewJob;
