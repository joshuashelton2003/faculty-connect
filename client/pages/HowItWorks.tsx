import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import {
  UserCheck,
  Search,
  FileText,
  CheckCircle,
  Building,
  GraduationCap,
  ArrowRight,
  Users,
  Briefcase,
  Star,
  Calendar,
  Mail,
  Phone,
  Globe
} from 'lucide-react';

export default function HowItWorks() {
  const navigate = useNavigate();

  const facultySteps = [
    {
      step: 1,
      title: "Create Your Profile",
      description: "Sign up as a faculty member and complete your professional profile with qualifications, experience, and specializations.",
      icon: <UserCheck className="w-8 h-8 text-blue-600" />,
      color: "bg-blue-100"
    },
    {
      step: 2,
      title: "Browse & Search Jobs",
      description: "Explore thousands of teaching positions from schools, colleges, and universities across India using our advanced search filters.",
      icon: <Search className="w-8 h-8 text-green-600" />,
      color: "bg-green-100"
    },
    {
      step: 3,
      title: "Apply Instantly",
      description: "Submit your applications with just a few clicks. Upload your resume, write a cover letter, and track your application status.",
      icon: <FileText className="w-8 h-8 text-purple-600" />,
      color: "bg-purple-100"
    },
    {
      step: 4,
      title: "Get Hired",
      description: "Connect with institutions, attend interviews, and land your dream teaching position. Track everything in your dashboard.",
      icon: <CheckCircle className="w-8 h-8 text-emerald-600" />,
      color: "bg-emerald-100"
    }
  ];

  const employerSteps = [
    {
      step: 1,
      title: "Register Your Institution",
      description: "Create an employer account with your institution details, verification documents, and contact information.",
      icon: <Building className="w-8 h-8 text-blue-600" />,
      color: "bg-blue-100"
    },
    {
      step: 2,
      title: "Post Job Openings",
      description: "Create detailed job postings with requirements, salary details, application deadlines, and department information.",
      icon: <Briefcase className="w-8 h-8 text-orange-600" />,
      color: "bg-orange-100"
    },
    {
      step: 3,
      title: "Review Applications",
      description: "Access qualified candidates, review resumes, filter applications, and manage your recruitment pipeline efficiently.",
      icon: <Users className="w-8 h-8 text-teal-600" />,
      color: "bg-teal-100"
    },
    {
      step: 4,
      title: "Hire Top Talent",
      description: "Schedule interviews, communicate with candidates, and hire the best faculty members for your institution.",
      icon: <Star className="w-8 h-8 text-yellow-600" />,
      color: "bg-yellow-100"
    }
  ];

  const features = [
    {
      title: "Smart Matching",
      description: "Our AI-powered system matches faculty with relevant opportunities based on qualifications and preferences.",
      icon: <GraduationCap className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Real-time Notifications",
      description: "Get instant updates on application status, new job postings, and interview schedules.",
      icon: <Mail className="w-6 h-6 text-green-600" />
    },
    {
      title: "Comprehensive Dashboard",
      description: "Track applications, manage profile, view analytics, and access all tools from one central location.",
      icon: <Calendar className="w-6 h-6 text-purple-600" />
    },
    {
      title: "24/7 Support",
      description: "Get help whenever you need it with our dedicated support team and comprehensive help resources.",
      icon: <Phone className="w-6 h-6 text-orange-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">How FacultyConnect Works</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Connecting educators with institutions through a simple, efficient, and transparent process. 
              Join thousands of faculty members and institutions already using our platform.
            </p>
          </div>
        </div>
      </div>

      {/* Faculty Process */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2 mb-4">
            <GraduationCap className="w-5 h-5 mr-2" />
            For Faculty Members
          </Badge>
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Your Journey to the Perfect Teaching Position
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            From profile creation to getting hired - follow these simple steps to land your dream job
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {facultySteps.map((step, index) => (
            <Card key={step.step} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  {step.icon}
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-slate-800 text-white font-bold text-lg px-3 py-1">
                    {step.step}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-slate-800">
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 text-center leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
              {index < facultySteps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                  <ArrowRight className="w-8 h-8 text-slate-300" />
                </div>
              )}
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={() => navigate('/register?role=faculty')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Start as Faculty Member
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      {/* Employer Process */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2 mb-4">
              <Building className="w-5 h-5 mr-2" />
              For Institutions
            </Badge>
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Find & Hire the Best Faculty Members
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Streamline your recruitment process and connect with qualified educators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {employerSteps.map((step, index) => (
              <Card key={step.step} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    {step.icon}
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-slate-800 text-white font-bold text-lg px-3 py-1">
                      {step.step}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-800">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 text-center leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
                {index < employerSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-slate-300" />
                  </div>
                )}
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              onClick={() => navigate('/register?role=employer')}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Start as Institution
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Why Choose FacultyConnect?
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Advanced features designed to make academic recruitment seamless and efficient
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg font-bold text-slate-800">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of educators and institutions who have found success with FacultyConnect
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/register?role=faculty')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold text-lg"
              >
                <GraduationCap className="w-5 h-5 mr-2" />
                Join as Faculty
              </Button>
              <Button
                onClick={() => navigate('/register?role=employer')}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-slate-800 px-8 py-3 rounded-xl font-bold text-lg"
              >
                <Building className="w-5 h-5 mr-2" />
                Join as Institution
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
