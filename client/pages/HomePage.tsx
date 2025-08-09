import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import JobCard from "@/components/JobCard";
import { sampleJobs } from "@/data/sampleJobsData";
import {
  Search,
  MapPin,
  Users,
  User,
  Building,
  Building2,
  TrendingUp,
  BookOpen,
  Award,
  Globe,
  Target,
  CheckCircle,
  Star,
  ArrowRight,
  GraduationCap,
  Briefcase,
  Eye,
  Calendar,
  ChevronRight,
} from "lucide-react";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchKeywords, setSearchKeywords] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchKeywords) params.set("title", searchKeywords);
    if (searchLocation && searchLocation !== "all")
      params.set("location", searchLocation);
    navigate(`/jobs?${params.toString()}`);
  };

  // Quick search categories
  const categories = [
    { name: "Computer Science", count: 45, icon: "💻" },
    { name: "Mathematics", count: 38, icon: "🔢" },
    { name: "Physics", count: 32, icon: "⚛️" },
    { name: "Chemistry", count: 28, icon: "🧪" },
    { name: "English Literature", count: 25, icon: "📚" },
    { name: "Mechanical Engineering", count: 22, icon: "⚙️" },
    { name: "Civil Engineering", count: 19, icon: "🏗️" },
    { name: "Electronics", count: 18, icon: "🔌" },
  ];

  // Platform statistics
  const stats = [
    {
      label: "Active Jobs",
      value: "200+",
      icon: Briefcase,
      color: "text-blue-600",
    },
    {
      label: "Total Applications",
      value: "2000+",
      icon: Users,
      color: "text-green-600",
    },
    {
      label: "Registered Candidates",
      value: "52+",
      icon: GraduationCap,
      color: "text-purple-600",
    },
    {
      label: "Partner Institutes",
      value: "50+",
      icon: Building,
      color: "text-orange-600",
    },
  ];

  // Featured institutes
  const featuredInstitutes = [
    {
      name: "Anna University",
      location: "Chennai, Tamil Nadu",
      type: "University",
      openJobs: 12,
      rating: 4.8,
      logo: "https://images.pexels.com/photos/2676888/pexels-photo-2676888.jpeg",
    },
    {
      name: "IIT Madras",
      location: "Chennai, Tamil Nadu",
      type: "IIT",
      openJobs: 8,
      rating: 4.9,
      logo: "https://images.pexels.com/photos/9489759/pexels-photo-9489759.jpeg",
    },
    {
      name: "PSG College of Technology",
      location: "Coimbatore, Tamil Nadu",
      type: "Engineering College",
      openJobs: 6,
      rating: 4.7,
      logo: "https://images.pexels.com/photos/8199625/pexels-photo-8199625.jpeg",
    },
    {
      name: "NIT Trichy",
      location: "Tiruchirappalli, Tamil Nadu",
      type: "NIT",
      openJobs: 5,
      rating: 4.8,
      logo: "https://images.pexels.com/photos/207732/pexels-photo-207732.jpeg",
    },
  ];

  // Get recent jobs from sample data (first 3)
  const recentJobs = sampleJobs.slice(0, 3);

  // Handle job actions
  const handleViewDetails = (job: any) => {
    // Navigate to job details page
    navigate(`/jobs/${job.id}`);
  };

  const handleApply = (job: any) => {
    // Navigate to application form
    navigate(`/apply/${job.id}`);
  };

  // Success stories
  const testimonials = [
    {
      name: "Dr. Christypunitha",
      role: "Assistant Professor",
      institute: "Anna University",
      quote:
        "FacultyConnect helped me find my dream position in computer science. The platform made the application process seamless.",
      image:
        "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg",
    },
    {
      name: "Prof. Mani Geetha",
      role: "Associate Professor",
      institute: "PSG College of Technology",
      quote:
        "As an employer, FacultyConnect provided access to highly qualified candidates. The filtering system is excellent.",
      image:
        "https://images.pexels.com/photos/9663015/pexels-photo-9663015.jpeg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://cdn.builder.io/api/v1/image/assets%2Ff92995b2d56b4f0a8225b3c3ca0a3e61%2F28f72d0f61c14b6aa1290cd560bb98a9?format=webp&width=800)",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 hero-title"
            >
              Find Your Perfect Faculty Position
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-white opacity-80"
            >
              Discover opportunities in Polytechnics, ITI, Engineering, Arts &
              Science and Schools. Your teaching career starts here.
            </motion.p>

            {/* Hero Search - Compact Transparent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="backdrop-blur-md bg-white/20 border border-white/30 rounded-xl shadow-xl p-6 max-w-3xl mx-auto"
            >
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Job title, subject, or keywords..."
                      value={searchKeywords}
                      onChange={(e) => setSearchKeywords(e.target.value)}
                      className="pl-10 h-12 text-white placeholder:text-white bg-white/10 border-white/30 focus:border-white/50 backdrop-blur-sm"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-4 h-4" />
                    <Select
                      value={searchLocation}
                      onValueChange={setSearchLocation}
                    >
                      <SelectTrigger className="pl-10 h-12 text-white bg-white/10 border-white/30 focus:border-white/50 backdrop-blur-sm">
                        <SelectValue placeholder="Location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        <SelectItem value="Chennai">Chennai</SelectItem>
                        <SelectItem value="Coimbatore">Coimbatore</SelectItem>
                        <SelectItem value="Madurai">Madurai</SelectItem>
                        <SelectItem value="Tiruchirappalli">
                          Tiruchirappalli
                        </SelectItem>
                        <SelectItem value="Salem">Salem</SelectItem>
                        <SelectItem value="Erode">Erode</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={handleSearch}
                  size="lg"
                  className="h-12 px-6 bg-blue-600/90 hover:bg-blue-700 text-white font-semibold backdrop-blur-sm"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search Jobs
                </Button>
              </div>

              <div className="mt-4">
                <p className="text-sm text-white/70 mb-2">Popular searches:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Computer Science",
                    "Mathematics",
                    "Physics",
                    "Chemistry",
                    "Engineering",
                  ].map((term) => (
                    <Badge
                      key={term}
                      variant="secondary"
                      className="cursor-pointer bg-white/20 text-white/90 hover:bg-white/30 transition-colors border-white/20"
                      onClick={() => {
                        setSearchKeywords(term);
                        handleSearch();
                      }}
                    >
                      {term}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Role-based Call to Actions - Compact Transparent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto"
            >
              {/* Faculty CTA */}
              <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  For Educators
                </h3>
                <p className="text-white/80 mb-4 text-sm">
                  Find your dream teaching position at top institutions
                </p>
                <div className="space-y-2">
                  <Button
                    onClick={() => navigate("/login?role=faculty")}
                    className="w-full bg-blue-600/90 hover:bg-blue-700 text-white h-10"
                  >
                    Faculty Sign In
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/register?role=faculty")}
                    className="w-full border-white/30 text-white hover:bg-white/10 h-10"
                  >
                    Join as Faculty
                  </Button>
                </div>
              </div>

              {/* Employer CTA */}
              <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  For Institutions
                </h3>
                <p className="text-white/80 mb-4 text-sm">
                  Post jobs and find qualified faculty for your institution
                </p>
                <div className="space-y-2">
                  <Button
                    onClick={() => navigate("/login?role=employer")}
                    className="w-full bg-green-600/90 hover:bg-green-700 text-white h-10"
                  >
                    Institution Sign In
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/register?role=employer")}
                    className="w-full border-white/30 text-white hover:bg-white/10 h-10"
                  >
                    Post Jobs
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-lg text-gray-600">
              Join the growing community of educators and institutions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4`}
                >
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Browse by Subject
            </h2>
            <p className="text-lg text-gray-600">
              Find opportunities in your area of expertise
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <Card
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 bg-white border border-gray-200"
                  onClick={() =>
                    navigate(
                      `/jobs?subject=${encodeURIComponent(category.name)}`,
                    )
                  }
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {category.count} jobs available
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/jobs")}
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              View All Categories
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Institutes */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Institutes
              </h2>
              <p className="text-lg text-gray-600">
                Top educational institutions actively hiring
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/institutes")}
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              View All Institutes
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredInstitutes.map((institute, index) => (
              <motion.div
                key={institute.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer bg-white border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <img
                          src={institute.logo}
                          alt={`${institute.name} logo`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm">
                          {institute.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {institute.type}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {institute.location}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Briefcase className="w-4 h-4 mr-2" />
                        {institute.openJobs} open positions
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Star className="w-4 h-4 mr-2 text-yellow-500 fill-current" />
                        {institute.rating} rating
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Jobs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Latest Job Openings
              </h2>
              <p className="text-lg text-gray-600">
                Fresh opportunities posted this week
              </p>
            </div>
            <Button
              onClick={() => navigate("/jobs")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              View All Jobs
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentJobs.map((job, index) => (
              <JobCard
                key={job.id}
                job={job}
                onViewDetails={handleViewDetails}
                onApply={handleApply}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose FacultyConnect?
            </h2>
            <p className="text-lg text-gray-600">
              The complete platform for academic career success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Targeted Opportunities
              </h3>
              <p className="text-gray-600">
                Find positions specifically tailored to your expertise across
                engineering, arts, science, and technical education.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Verified Institutions
              </h3>
              <p className="text-gray-600">
                Connect with authenticated educational institutions from premier
                universities to specialized institutes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-6">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Nationwide Reach
              </h3>
              <p className="text-gray-600">
                Access opportunities across all states and union territories
                with comprehensive location-based filtering.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600">
              Hear from educators who found their perfect fit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white border border-gray-200">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img
                          src={testimonial.image}
                          alt={`${testimonial.name} profile`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {testimonial.role}, {testimonial.institute}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 italic">
                      "{testimonial.quote}"
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
