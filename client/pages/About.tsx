import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Users, 
  Building, 
  Briefcase, 
  TrendingUp, 
  GraduationCap,
  Target,
  Heart,
  Award,
  Globe,
  CheckCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export default function About() {
  const stats = [
    { icon: Briefcase, label: 'Jobs Posted', value: '10,000+', color: 'bg-blue-100 text-blue-600' },
    { icon: Building, label: 'Partner Institutes', value: '800+', color: 'bg-green-100 text-green-600' },
    { icon: Users, label: 'Registered Educators', value: '25,000+', color: 'bg-purple-100 text-purple-600' },
    { icon: TrendingUp, label: 'Successful Placements', value: '15,000+', color: 'bg-yellow-100 text-yellow-600' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Excellence in Education',
      description: 'We believe quality education starts with passionate educators. Our platform connects the best faculty with institutions that value excellence.'
    },
    {
      icon: Heart,
      title: 'Empowering Educators',
      description: 'Every educator deserves the right opportunity to grow and make an impact. We provide the tools and connections to advance teaching careers.'
    },
    {
      icon: Globe,
      title: 'Bridging Opportunities',
      description: 'We bridge the gap between talented educators and quality institutions across Tamil Nadu, South India, and beyond.'
    },
    {
      icon: Award,
      title: 'Trust & Transparency',
      description: 'We maintain the highest standards of verification for institutions and provide transparent, authentic job opportunities for educators.'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'FacultyConnect Founded',
      description: 'Started with a vision to revolutionize faculty recruitment in South India'
    },
    {
      year: '2021',
      title: '100+ Institutions Onboarded',
      description: 'Reached our first major milestone with leading educational institutions'
    },
    {
      year: '2022',
      title: '10,000+ Faculty Registered',
      description: 'Built a strong community of passionate educators across various disciplines'
    },
    {
      year: '2023',
      title: 'AI-Powered Matching',
      description: 'Launched intelligent job matching to connect the right talent with right opportunities'
    },
    {
      year: '2024',
      title: 'Pan-India Expansion',
      description: 'Expanded our reach beyond South India to serve educators nationwide'
    }
  ];

  const teamMembers = [
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Founder & CEO',
      education: 'PhD in Computer Science, IIT Madras',
      experience: '15+ years in EdTech',
      image: ''
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Operations',
      education: 'MBA from IIM Chennai',
      experience: '12+ years in HR & Recruitment',
      image: ''
    },
    {
      name: 'Suresh Krishnan',
      role: 'CTO',
      education: 'M.Tech from Anna University',
      experience: '10+ years in Product Development',
      image: ''
    },
    {
      name: 'Dr. Meera Nair',
      role: 'Head of Partnerships',
      education: 'PhD in Education, University of Madras',
      experience: '18+ years in Academic Administration',
      image: ''
    }
  ];

  const achievements = [
    'Featured in "Top 50 EdTech Startups" by Education Today',
    'Winner of "Best Recruitment Platform" at TechEd Awards 2023',
    'Recognized by Tamil Nadu Government for promoting education',
    'ISO 27001 certified for information security management',
    'Google for Startups partner program member'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Connecting Passionate 
              <span className="text-blue-600 block">Educators with Excellence</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              FacultyConnect is India's leading platform for educational recruitment, 
              dedicated to bridging the gap between talented educators and quality institutions 
              across Tamil Nadu, South India, and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
                  Join Our Community
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="px-8">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact in Numbers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Since our inception, we've been proud to facilitate thousands of meaningful connections 
              between educators and institutions.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className={`w-16 h-16 ${stat.color} rounded-lg flex items-center justify-center`}>
                      <IconComponent className="w-8 h-8" />
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

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                To transform the landscape of educational recruitment by creating meaningful connections 
                between passionate educators and forward-thinking institutions. We believe that great 
                education begins with great educators, and our mission is to ensure that every talented 
                teacher finds their perfect role.
              </p>
              <p className="text-gray-600 mb-8">
                We are committed to supporting the growth of the education sector in Tamil Nadu and 
                South India by providing a transparent, efficient, and trustworthy platform that 
                serves both educators seeking their next opportunity and institutions looking for 
                exceptional talent.
              </p>
              <Link to="/jobs">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Explore Opportunities
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <IconComponent className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
                      <p className="text-sm text-gray-600">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From a small startup to India's leading faculty recruitment platform, 
              here are the key milestones in our journey.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-blue-200"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full absolute left-0 md:left-1/2 md:transform md:-translate-x-1/2 z-10">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 ml-12 md:ml-0' : 'md:pl-8 ml-12 md:ml-0'}`}>
                    <Card>
                      <CardContent className="p-6">
                        <div className="text-blue-600 font-semibold mb-2">{milestone.year}</div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                        <p className="text-gray-600 text-sm">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team combines deep expertise in education, technology, and recruitment 
              to create the best possible experience for our users.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-gray-500 text-2xl font-semibold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 text-xs mb-1">{member.education}</p>
                  <p className="text-gray-500 text-xs">{member.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recognition & Achievements</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're proud to be recognized by industry leaders and organizations for our 
              contribution to the education sector.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white p-4 rounded-lg border border-gray-200">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Make a Difference?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of educators and institutions who have found success through FacultyConnect. 
            Whether you're seeking your next teaching opportunity or looking to hire exceptional faculty, 
            we're here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
                Get Started Today
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8">
                Contact Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
