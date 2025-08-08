import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  UserPlus,
  Search,
  FileText,
  Send,
  CheckCircle,
  Users,
  Building,
  GraduationCap,
  ArrowRight,
  Star,
  Clock,
  Shield,
  Award,
  Zap,
  Target
} from 'lucide-react';

const HowItWorks: React.FC = () => {
  const navigate = useNavigate();

  const facultySteps = [
    {
      icon: UserPlus,
      title: 'Create Your Profile',
      description: 'Sign up and build a comprehensive faculty profile with your qualifications, experience, and expertise.',
      details: [
        'Upload your CV and documents',
        'Add educational background',
        'Highlight your specializations',
        'Set your preferences'
      ]
    },
    {
      icon: Search,
      title: 'Browse Opportunities',
      description: 'Search and filter through hundreds of job opportunities across Tamil Nadu\'s top educational institutions.',
      details: [
        'Filter by location and subject',
        'View detailed job descriptions',
        'Check salary ranges',
        'Save favorite positions'
      ]
    },
    {
      icon: Send,
      title: 'Apply with One Click',
      description: 'Submit applications instantly with your pre-filled profile. Track application status in real-time.',
      details: [
        'One-click application process',
        'Real-time status updates',
        'Direct communication with institutions',
        'Application history tracking'
      ]
    },
    {
      icon: CheckCircle,
      title: 'Get Hired',
      description: 'Connect with institutions, attend interviews, and start your dream teaching career.',
      details: [
        'Scheduled interview notifications',
        'Direct communication with HR',
        'Offer management',
        'Onboarding support'
      ]
    }
  ];

  const employerSteps = [
    {
      icon: Building,
      title: 'Register Your Institution',
      description: 'Create an institutional account and verify your organization to start posting jobs.',
      details: [
        'Institution verification process',
        'Complete institutional profile',
        'Add accreditation details',
        'Set up hiring preferences'
      ]
    },
    {
      icon: FileText,
      title: 'Post Job Requirements',
      description: 'Create detailed job postings with requirements, salary, and benefits to attract the right candidates.',
      details: [
        'Detailed job description templates',
        'Requirement specification',
        'Salary and benefits definition',
        'Application deadline management'
      ]
    },
    {
      icon: Users,
      title: 'Review Applications',
      description: 'Access qualified candidate profiles, review applications, and shortlist potential faculty members.',
      details: [
        'Advanced candidate filtering',
        'Application scoring system',
        'Resume and document review',
        'Bulk application management'
      ]
    },
    {
      icon: Award,
      title: 'Hire Top Talent',
      description: 'Conduct interviews, make offers, and onboard exceptional faculty for your institution.',
      details: [
        'Interview scheduling tools',
        'Offer letter generation',
        'Background verification',
        'Seamless onboarding process'
      ]
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Verified Institutions',
      description: 'All educational institutions are verified and authenticated for your safety and security.'
    },
    {
      icon: Zap,
      title: 'Instant Matching',
      description: 'Our AI-powered system matches you with the most relevant opportunities based on your profile.'
    },
    {
      icon: Target,
      title: 'Targeted Applications',
      description: 'Apply only to positions that match your qualifications and career goals.'
    },
    {
      icon: Clock,
      title: 'Real-time Updates',
      description: 'Get instant notifications about new opportunities and application status updates.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Educational Institutions', icon: Building },
    { number: '2000+', label: 'Faculty Positions', icon: GraduationCap },
    { number: '5000+', label: 'Registered Faculty', icon: Users },
    { number: '95%', label: 'Success Rate', icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              How FacultyConnect Works
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto mb-10"
            >
              Discover how thousands of educators and institutions connect through our platform. 
              Simple, efficient, and designed for academic excellence.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => navigate('/register?role=faculty')}
              >
                Start as Faculty
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
                onClick={() => navigate('/register?role=employer')}
              >
                Post Jobs as Institution
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* For Faculty Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800">For Educators</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Find Your Perfect Teaching Position
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Follow these simple steps to discover and apply for faculty positions at top educational institutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {facultySteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                        <step.icon className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="absolute -top-3 -left-3 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-center">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                {index < facultySteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-blue-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              onClick={() => navigate('/register?role=faculty')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Get Started as Faculty
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* For Employers Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-green-100 text-green-800">For Institutions</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Hire Exceptional Faculty Members
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Streamline your hiring process and connect with qualified educators ready to join your institution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {employerSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                        <step.icon className="w-8 h-8 text-green-600" />
                      </div>
                      <div className="absolute -top-3 -left-3 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-center">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                {index < employerSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-green-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              onClick={() => navigate('/register?role=employer')}
              className="bg-green-600 hover:bg-green-700"
            >
              Start Hiring Faculty
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose FacultyConnect?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform is designed with both educators and institutions in mind, providing the tools and features needed for successful hiring
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-6">
                  <feature.icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Join thousands of educators and institutions who have found success through FacultyConnect
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => navigate('/register')}
              >
                Join FacultyConnect Today
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
                onClick={() => navigate('/contact')}
              >
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
