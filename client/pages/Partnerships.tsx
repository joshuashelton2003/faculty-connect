import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Handshake,
  Building2,
  GraduationCap,
  Users,
  Target,
  CheckCircle,
  ArrowRight,
  Globe,
  TrendingUp,
  Award,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Star,
  Heart,
  Zap,
  Shield,
  Lightbulb,
  Send,
  ExternalLink
} from 'lucide-react';

interface PartnershipFormData {
  organizationName: string;
  contactName: string;
  email: string;
  phone: string;
  partnershipType: string;
  organizationType: string;
  description: string;
  website?: string;
  expectedOutcome: string;
}

const Partnerships: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<PartnershipFormData>();

  const partnershipTypes = [
    { value: 'institutional', label: 'Institutional Partnership', icon: Building2, color: 'bg-blue-100 text-blue-800' },
    { value: 'corporate', label: 'Corporate Partnership', icon: Briefcase, color: 'bg-purple-100 text-purple-800' },
    { value: 'recruitment', label: 'Recruitment Partnership', icon: Users, color: 'bg-green-100 text-green-800' },
    { value: 'technology', label: 'Technology Partnership', icon: Zap, color: 'bg-orange-100 text-orange-800' },
    { value: 'training', label: 'Training Partnership', icon: GraduationCap, color: 'bg-indigo-100 text-indigo-800' },
    { value: 'research', label: 'Research Collaboration', icon: Lightbulb, color: 'bg-yellow-100 text-yellow-800' }
  ];

  const existingPartners = [
    {
      name: 'Anna University',
      type: 'Educational Institution',
      description: 'Strategic partnership for faculty recruitment and academic collaboration',
      logo: '🎓',
      established: '2023',
      benefits: ['Direct recruitment pipeline', 'Academic collaborations', 'Research partnerships']
    },
    {
      name: 'Indian Institutes of Technology',
      type: 'Technical Institution',
      description: 'Exclusive partnership for premium faculty placements',
      logo: '🏛️',
      established: '2023',
      benefits: ['Premium job postings', 'Research collaborations', 'Industry partnerships']
    },
    {
      name: 'NASSCOM',
      type: 'Industry Association',
      description: 'Technology and IT sector recruitment collaboration',
      logo: '💼',
      established: '2024',
      benefits: ['Industry insights', 'Skill development', 'Placement assistance']
    },
    {
      name: 'AICTE',
      type: 'Regulatory Body',
      description: 'Compliance and quality assurance partnership',
      logo: '⚖️',
      established: '2024',
      benefits: ['Regulatory compliance', 'Quality standards', 'Best practices']
    }
  ];

  const benefits = [
    {
      icon: Target,
      title: 'Strategic Alignment',
      description: 'Align your organizational goals with our recruitment expertise'
    },
    {
      icon: TrendingUp,
      title: 'Growth Opportunities',
      description: 'Access new markets and expand your reach in the education sector'
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Benefit from our rigorous quality standards and verification processes'
    },
    {
      icon: Globe,
      title: 'Network Expansion',
      description: 'Connect with a vast network of educational institutions and professionals'
    }
  ];

  const onSubmit = async (data: PartnershipFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Partnership inquiry submitted:', data);
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('Error submitting partnership inquiry:', error);
      alert('Failed to submit inquiry. Please try again.');
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#DDDAD0] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Thank You!
            </h2>
            <p className="text-gray-600 mb-6">
              Your partnership inquiry has been submitted successfully. Our partnerships team will review your request and get back to you within 48 hours.
            </p>
            <Button 
              onClick={() => setIsSubmitted(false)}
              className="w-full"
            >
              Submit Another Inquiry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#DDDAD0]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Handshake className="w-16 h-16 mx-auto mb-4 text-blue-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Partner with FacultyConnect
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Join our network of leading educational institutions, corporations, and organizations 
              to transform faculty recruitment and career development
            </p>
          </div>
        </div>
      </div>

      {/* Partnership Types */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Partnership Opportunities</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore various ways to collaborate with us and create value for the education ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partnershipTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <Card key={type.value} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-lg bg-blue-100 mr-4">
                      <IconComponent className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{type.label}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {type.value === 'institutional' && 'Collaborate with educational institutions for mutual growth and faculty development programs.'}
                    {type.value === 'corporate' && 'Partner with corporations for talent acquisition and workforce development initiatives.'}
                    {type.value === 'recruitment' && 'Join our recruitment network to access top talent and streamline hiring processes.'}
                    {type.value === 'technology' && 'Integrate cutting-edge technology solutions to enhance platform capabilities.'}
                    {type.value === 'training' && 'Develop training programs and professional development opportunities for educators.'}
                    {type.value === 'research' && 'Collaborate on research projects and academic studies in education technology.'}
                  </p>
                  <Button variant="outline" className="w-full group-hover:bg-blue-50">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Partner with Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the advantages of joining the FacultyConnect partnership ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="p-4 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Existing Partners */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Partners</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trusted by leading institutions and organizations across India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {existingPartners.map((partner, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{partner.logo}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{partner.name}</h3>
                      <Badge className="bg-green-100 text-green-800">
                        Since {partner.established}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{partner.type}</p>
                    <p className="text-gray-700 mb-4">{partner.description}</p>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-900">Key Benefits:</h4>
                      <div className="flex flex-wrap gap-2">
                        {partner.benefits.map((benefit, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Partnership Inquiry Form */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Start a Partnership</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ready to explore partnership opportunities? Fill out the form below and our team will get in touch with you.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Partnership Inquiry</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="organizationName">Organization Name *</Label>
                    <Input
                      {...register('organizationName', { required: 'Organization name is required' })}
                      placeholder="Your organization name"
                      className="mt-1"
                    />
                    {errors.organizationName && (
                      <p className="text-red-600 text-sm mt-1">{errors.organizationName.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="contactName">Contact Person *</Label>
                    <Input
                      {...register('contactName', { required: 'Contact name is required' })}
                      placeholder="Your full name"
                      className="mt-1"
                    />
                    {errors.contactName && (
                      <p className="text-red-600 text-sm mt-1">{errors.contactName.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        type="email"
                        placeholder="your.email@organization.com"
                        className="pl-10"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        {...register('phone')}
                        type="tel"
                        placeholder="+91 9876543210"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="partnershipType">Partnership Type *</Label>
                    <Select onValueChange={(value) => setValue('partnershipType', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select partnership type" />
                      </SelectTrigger>
                      <SelectContent>
                        {partnershipTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.partnershipType && (
                      <p className="text-red-600 text-sm mt-1">Please select a partnership type</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="organizationType">Organization Type *</Label>
                    <Select onValueChange={(value) => setValue('organizationType', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select organization type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="university">University</SelectItem>
                        <SelectItem value="college">College</SelectItem>
                        <SelectItem value="school">School</SelectItem>
                        <SelectItem value="research">Research Institute</SelectItem>
                        <SelectItem value="corporate">Corporation</SelectItem>
                        <SelectItem value="government">Government Agency</SelectItem>
                        <SelectItem value="ngo">NGO/Non-Profit</SelectItem>
                        <SelectItem value="association">Professional Association</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.organizationType && (
                      <p className="text-red-600 text-sm mt-1">Please select organization type</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="website">Website</Label>
                  <div className="relative mt-1">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      {...register('website')}
                      type="url"
                      placeholder="https://www.yourorganization.com"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Partnership Description *</Label>
                  <Textarea
                    {...register('description', { required: 'Description is required' })}
                    placeholder="Tell us about your organization and how you'd like to partner with us..."
                    rows={4}
                    className="mt-1"
                  />
                  {errors.description && (
                    <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="expectedOutcome">Expected Outcomes *</Label>
                  <Textarea
                    {...register('expectedOutcome', { required: 'Expected outcomes are required' })}
                    placeholder="What do you hope to achieve through this partnership?"
                    rows={3}
                    className="mt-1"
                  />
                  {errors.expectedOutcome && (
                    <p className="text-red-600 text-sm mt-1">{errors.expectedOutcome.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Partnership Inquiry
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions about partnerships? Our team is here to help you explore opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                <p className="text-gray-600 mb-4">partnerships@facultyconnect.in</p>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Phone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                <p className="text-gray-600 mb-4">+91 80000 54321</p>
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
                <p className="text-gray-600 mb-4">Erode, Tamil Nadu</p>
                <Button variant="outline" size="sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partnerships;
