import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Job, Institute } from '@/types';
import { Button } from '@/components/ui/button';
import SearchBox from '@/components/SearchBox';
import JobCard from '@/components/JobCard';
import InstituteCard from '@/components/InstituteCard';
import {
  Users,
  Building,
  Briefcase,
  TrendingUp,
  GraduationCap,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

export default function HomePage() {

  // Mock data for demonstration
  const [mockJobs] = useState<Job[]>([
    {
      _id: '1',
      title: 'Assistant Professor - Computer Science',
      description: 'Looking for a passionate Computer Science professor to join our growing department. Experience in AI/ML preferred.',
      subject: 'Computer Science',
      type: 'college',
      location: { city: 'Chennai', state: 'Tamil Nadu', district: 'Chennai' },
      salary: { min: 45000, max: 65000, currency: 'INR' },
      requirements: { education: 'PhD in Computer Science', experience: '2-5 years', skills: ['Python', 'Machine Learning', 'Data Structures'] },
      institute: { _id: '1', name: 'Anna University', type: 'university', location: { city: 'Chennai', state: 'Tamil Nadu', district: 'Chennai', address: '' }, email: '', phone: '', description: '', established: 1978, isFeatured: true, jobsCount: 12 },
      postedBy: 'employer1',
      postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      isActive: true,
      applicationsCount: 24
    },
    {
      _id: '2',
      title: 'Mathematics Teacher - Higher Secondary',
      description: 'Seeking an experienced Mathematics teacher for Classes 11 and 12. Strong foundation in calculus and algebra required.',
      subject: 'Mathematics',
      type: 'school',
      location: { city: 'Coimbatore', state: 'Tamil Nadu', district: 'Coimbatore' },
      salary: { min: 25000, max: 35000, currency: 'INR' },
      requirements: { education: 'M.Sc Mathematics, B.Ed', experience: '3+ years', skills: ['Calculus', 'Algebra', 'Statistics'] },
      institute: { _id: '2', name: 'PSG Matriculation School', type: 'school', location: { city: 'Coimbatore', state: 'Tamil Nadu', district: 'Coimbatore', address: '' }, email: '', phone: '', description: '', established: 1985, isFeatured: false, jobsCount: 5 },
      postedBy: 'employer2',
      postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
      isActive: true,
      applicationsCount: 18
    },
    {
      _id: '3',
      title: 'English Literature Professor',
      description: 'Join our English department as a Professor. Research experience in contemporary literature preferred.',
      subject: 'English Literature',
      type: 'college',
      location: { city: 'Madurai', state: 'Tamil Nadu', district: 'Madurai' },
      salary: { min: 50000, max: 70000, currency: 'INR' },
      requirements: { education: 'PhD in English Literature', experience: '5+ years', skills: ['Research', 'Academic Writing', 'Literary Criticism'] },
      institute: { _id: '3', name: 'Madurai Kamaraj University', type: 'university', location: { city: 'Madurai', state: 'Tamil Nadu', district: 'Madurai', address: '' }, email: '', phone: '', description: '', established: 1966, isFeatured: true, jobsCount: 8 },
      postedBy: 'employer3',
      postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
      isActive: true,
      applicationsCount: 31
    }
  ]);

  const [mockInstitutes] = useState<Institute[]>([
    {
      _id: '1',
      name: 'Anna University',
      type: 'university',
      location: { city: 'Chennai', state: 'Tamil Nadu', district: 'Chennai', address: 'Sardar Patel Road, Guindy, Chennai' },
      email: 'info@annauniv.edu',
      phone: '+91 44 2235 0449',
      website: 'https://www.annauniv.edu',
      description: 'Premier technical university in Tamil Nadu offering undergraduate, postgraduate and doctoral programs.',
      established: 1978,
      isFeatured: true,
      jobsCount: 12
    },
    {
      _id: '2',
      name: 'Indian Institute of Technology Madras',
      type: 'university',
      location: { city: 'Chennai', state: 'Tamil Nadu', district: 'Chennai', address: 'IIT P.O., Chennai' },
      email: 'info@iitm.ac.in',
      phone: '+91 44 2257 4802',
      website: 'https://www.iitm.ac.in',
      description: 'One of the premier engineering institutions in India, known for excellence in technical education and research.',
      established: 1959,
      isFeatured: true,
      jobsCount: 8
    }
  ]);

  const stats = [
    { icon: Briefcase, label: 'Active Jobs', value: '2,500+' },
    { icon: Building, label: 'Partner Institutes', value: '800+' },
    { icon: Users, label: 'Registered Faculty', value: '15,000+' },
    { icon: TrendingUp, label: 'Success Rate', value: '94%' }
  ];

  const features = [
    {
      icon: GraduationCap,
      title: 'Quality Positions',
      description: 'Hand-picked opportunities from top institutions across Tamil Nadu and South India'
    },
    {
      icon: MapPin,
      title: 'Location Flexibility',
      description: 'Find positions in your preferred cities and districts with detailed location information'
    },
    {
      icon: Clock,
      title: 'Real-time Updates',
      description: 'Get instant notifications when new positions matching your profile are posted'
    },
    {
      icon: CheckCircle,
      title: 'Verified Institutions',
      description: 'All partner institutions are verified and background-checked for authenticity'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 lg:py-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Find Your Dream
              <span className="text-blue-600 block">Faculty Position</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Connect with leading educational institutions across Tamil Nadu, South India, and beyond. 
              Discover opportunities that match your expertise and passion for teaching.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/jobs">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
                  Explore Jobs
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="lg" className="px-8">
                  Join as Educator
                </Button>
              </Link>
            </div>
          </div>

          {/* Search Box */}
          <SearchBox className="max-w-4xl mx-auto" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Jobs Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Job Opportunities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the newest faculty positions from top institutions. Updated daily with fresh opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {mockJobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/jobs">
              <Button size="lg" variant="outline">
                View All Jobs
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Institutes Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Institutions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Partner with prestigious educational institutions known for their excellence and commitment to quality education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {mockInstitutes.map((institute) => (
              <InstituteCard key={institute._id} institute={institute} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/institutes">
              <Button size="lg" variant="outline">
                View All Institutions
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose FacultyConnect?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to connecting passionate educators with the right opportunities in South India's leading institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Teaching Journey?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of educators who have found their ideal positions through FacultyConnect. 
            Your next career opportunity awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
                Create Your Profile
              </Button>
            </Link>
            <Link to="/jobs">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8">
                Browse Opportunities
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
