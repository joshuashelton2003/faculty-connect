// ==========================================
// FacultyConnect - Professional Homepage
// Landing Page with Hero, Search, and Features
// ==========================================

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore, useJobsStore, useInstitutesStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft,
  Search, 
  MapPin, 
  Building, 
  Users, 
  Briefcase, 
  GraduationCap,
  TrendingUp,
  Star,
  Award,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Target,
  Shield,
  Zap,
  Globe,
  Heart,
  BookOpen,
  ChevronRight
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.2 
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const { fetchJobs } = useJobsStore();
  const { fetchInstitutes } = useInstitutesStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Pre-load data for better UX
    fetchJobs();
    fetchInstitutes();
  }, [fetchJobs, fetchInstitutes]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    
    // Navigate to jobs page with search parameters
    const searchParams = new URLSearchParams();
    if (searchQuery) searchParams.set('keywords', searchQuery);
    if (searchLocation) searchParams.set('location', searchLocation);
    
    navigate(`/jobs?${searchParams.toString()}`);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const stats = [
    { icon: Briefcase, label: 'Active Jobs', value: '2,500+', color: 'text-blue-600', bg: 'bg-blue-100' },
    { icon: Building, label: 'Partner Institutes', value: '500+', color: 'text-green-600', bg: 'bg-green-100' },
    { icon: Users, label: 'Registered Faculty', value: '15,000+', color: 'text-purple-600', bg: 'bg-purple-100' },
    { icon: Award, label: 'Successful Placements', value: '8,500+', color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  const features = [
    {
      icon: Target,
      title: 'Smart Job Matching',
      description: 'Our AI-powered algorithm matches you with the most relevant faculty positions based on your qualifications and preferences.',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      icon: Shield,
      title: 'Verified Institutions',
      description: 'All partner institutions are thoroughly verified to ensure authenticity and credibility for your career growth.',
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      icon: Zap,
      title: 'Quick Apply',
      description: 'Apply to multiple positions with just one click using your saved profile and documents.',
      color: 'text-yellow-600',
      bg: 'bg-yellow-50'
    },
    {
      icon: Globe,
      title: 'Pan-India Opportunities',
      description: 'Access faculty positions from leading institutions across India and international opportunities.',
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    }
  ];

  const categories = [
    { name: 'Engineering Colleges', icon: '🏗️', count: '450+ Jobs', color: 'bg-blue-100 text-blue-800' },
    { name: 'Arts & Science', icon: '🎨', count: '320+ Jobs', color: 'bg-green-100 text-green-800' },
    { name: 'Medical Colleges', icon: '🏥', count: '180+ Jobs', color: 'bg-red-100 text-red-800' },
    { name: 'Business Schools', icon: '💼', count: '150+ Jobs', color: 'bg-purple-100 text-purple-800' },
    { name: 'Polytechnics', icon: '⚙️', count: '200+ Jobs', color: 'bg-orange-100 text-orange-800' },
    { name: 'Schools', icon: '🏫', count: '380+ Jobs', color: 'bg-teal-100 text-teal-800' },
  ];

  const testimonials = [
    {
      name: 'Dr. Priya Sharma',
      position: 'Assistant Professor, Computer Science',
      image: '/avatars/priya.jpg',
      text: 'FacultyConnect helped me find my dream job at a top engineering college. The platform is user-friendly and has genuine opportunities.',
      rating: 5
    },
    {
      name: 'Prof. Rajesh Kumar',
      position: 'Professor, Mathematics',
      image: '/avatars/rajesh.jpg',
      text: 'As an experienced faculty member, I found excellent career advancement opportunities through this platform. Highly recommended!',
      rating: 5
    },
    {
      name: 'Dr. Anita Patel',
      position: 'HOD, Electronics Engineering',
      image: '/avatars/anita.jpg',
      text: 'The verification process gives confidence in the institutions listed. Found my current position here and couldn\'t be happier.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Floating Icons */}
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 right-32 text-blue-200/40"
        >
          <GraduationCap className="w-16 h-16" />
        </motion.div>
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          className="absolute bottom-32 left-32 text-indigo-200/40"
          style={{ animationDelay: '2s' }}
        >
          <BookOpen className="w-12 h-12" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 mr-2 text-yellow-300" />
                India's Premier Faculty Recruitment Platform
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Find Your
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent block">
                  Dream Faculty Job
                </span>
                Today
              </h1>
              
              <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Connect with leading educational institutions across India. 
                Discover opportunities that match your expertise and advance your academic career.
              </p>
            </motion.div>

            {/* Search Box */}
            <motion.div variants={itemVariants} className="max-w-4xl mx-auto mb-12">
              <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Search by subject, position, or keywords..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Enter location (city, state)"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                    />
                  </div>
                  <Button 
                    onClick={handleSearch}
                    disabled={isLoading}
                    size="lg"
                    className="h-14 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5 mr-2" />
                        Search Jobs
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="text-sm text-gray-600">Popular searches:</span>
                  {['Computer Science', 'Mathematics', 'Physics', 'Engineering', 'MBA'].map((term) => (
                    <Button
                      key={term}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearchQuery(term);
                        handleSearch();
                      }}
                      className="text-xs border-gray-300 hover:border-blue-500 hover:text-blue-600"
                    >
                      {term}
                    </Button>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isAuthenticated ? (
                <>
                  <Link to="/register">
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50 font-semibold px-8 py-4 rounded-xl shadow-lg">
                      Join as Faculty
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 rounded-xl"
                    >
                      Post Jobs (Institutes)
                    </Button>
                  </Link>
                </>
              ) : (
                <Link to={user?.role === 'employer' ? '/employer/dashboard' : '/dashboard'}>
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50 font-semibold px-8 py-4 rounded-xl shadow-lg">
                    Go to Dashboard
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="text-center p-6 hover:shadow-lg transition-shadow border-0 shadow-md">
                    <CardContent className="p-0">
                      <div className={`inline-flex p-4 rounded-full ${stat.bg} mb-4`}>
                        <Icon className={`w-8 h-8 ${stat.color}`} />
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                      <p className="text-gray-600 font-medium">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-4xl font-bold text-gray-900 mb-4">
              Explore Opportunities by Category
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find faculty positions across various educational institutions and specializations
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {categories.map((category, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link to={`/jobs?type=${category.name.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}>
                  <Card className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 shadow-md hover:-translate-y-1">
                    <CardContent className="p-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-3xl">{category.icon}</div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {category.name}
                            </h3>
                            <Badge className={`mt-1 ${category.color}`}>
                              {category.count}
                            </Badge>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose FacultyConnect?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the most advanced faculty recruitment platform designed for your success
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="p-8 h-full hover:shadow-xl transition-shadow border-0 shadow-md">
                    <CardContent className="p-0">
                      <div className={`inline-flex p-4 rounded-full ${feature.bg} mb-6`}>
                        <Icon className={`w-8 h-8 ${feature.color}`} />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from faculty members who found their dream positions through FacultyConnect
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-6 h-full hover:shadow-lg transition-shadow border-0 shadow-md">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600">{testimonial.position}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 variants={itemVariants} className="text-4xl font-bold text-white mb-6">
              Ready to Start Your Academic Journey?
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of faculty members who have found their perfect positions through FacultyConnect
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isAuthenticated ? (
                <>
                  <Link to="/register">
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50 font-semibold px-8 py-4 rounded-xl">
                      Get Started Today
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link to="/jobs">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 rounded-xl"
                    >
                      Browse Jobs
                    </Button>
                  </Link>
                </>
              ) : (
                <Link to="/jobs">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50 font-semibold px-8 py-4 rounded-xl">
                    Explore Opportunities
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
