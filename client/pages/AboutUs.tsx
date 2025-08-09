import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Target, Award, Globe, BookOpen, Heart, Zap, Shield, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AboutUs: React.FC = () => {
  const stats = [
    { label: 'Active Faculty', value: '1,000+', icon: Users },
    { label: 'Partner Institutions', value: '500+', icon: BookOpen },
    { label: 'Successful Placements', value: '5,000+', icon: Award },
    { label: 'Cities Covered', value: '50+', icon: Globe }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion for Education',
      description: 'We believe in the transformative power of education and are dedicated to supporting those who shape young minds.'
    },
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'We maintain the highest standards of integrity in all our interactions with candidates and institutions.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We continuously improve our platform using the latest technology to provide the best user experience.'
    },
    {
      icon: TrendingUp,
      title: 'Growth & Success',
      description: 'We are committed to the professional growth and career success of every educator on our platform.'
    }
  ];

  const team = [
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Founder & CEO',
      description: 'Former Professor of Computer Science with 20+ years in education',
      image: 'https://images.pexels.com/photos/9663015/pexels-photo-9663015.jpeg'
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Operations',
      description: 'Expert in educational recruitment with extensive industry knowledge',
      image: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg'
    },
    {
      name: 'Dr. Arun Krishnan',
      role: 'Academic Advisor',
      description: 'Former Dean with deep understanding of institutional hiring needs',
      image: 'https://images.pexels.com/photos/9663015/pexels-photo-9663015.jpeg'
    }
  ];

  return (
    <div className="min-h-screen bg-[#DDDAD0]">
      {/* Back Button */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">About FacultyConnect</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Bridging the gap between exceptional educators and leading educational institutions 
              across Tamil Nadu and South India since 2023.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-[#DDDAD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-blue-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                To revolutionize faculty recruitment in India by creating a transparent, efficient, 
                and comprehensive platform that connects qualified educators with institutions that 
                value their expertise.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We believe that great education starts with great educators. Our mission is to 
                ensure that every educational institution can find the right faculty members, 
                and every qualified educator can find opportunities that match their passion and expertise.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Why We Started FacultyConnect</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                As educators ourselves, we experienced firsthand the challenges in the faculty 
                recruitment process. Traditional methods were time-consuming, limited in reach, 
                and often failed to match the right candidates with the right opportunities.
              </p>
              <p className="text-gray-700 leading-relaxed">
                FacultyConnect was born from the vision of creating a platform that would 
                streamline this process, making it easier for institutions to find exceptional 
                faculty and for educators to discover their ideal teaching positions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and drive our commitment to excellence in educational recruitment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Story</h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                FacultyConnect began in 2023 with a simple observation: the traditional faculty 
                recruitment process in India needed a digital transformation. Founded by educators 
                who understood the challenges on both sides of the hiring process, we set out to 
                create a platform that would benefit everyone involved.
              </p>
              <p>
                Starting with a focus on Tamil Nadu's educational landscape, we recognized the rich 
                diversity of institutions—from prestigious IITs to innovative polytechnics, from 
                established universities to emerging technical institutes. Each had unique needs, 
                and each deserved access to qualified, passionate educators.
              </p>
              <p>
                Today, FacultyConnect serves as the bridge between opportunity and talent, 
                facilitating thousands of successful placements and helping build stronger 
                educational institutions across South India. Our platform continues to evolve, 
                incorporating feedback from our community to better serve the educational ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our team combines deep educational expertise with technology innovation to serve the academic community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the FacultyConnect Community</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Whether you're an educator seeking new opportunities or an institution looking 
            for exceptional faculty, we're here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register?role=candidate"
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Join as Faculty
            </Link>
            <Link
              to="/register?role=employer"
              className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Join as Institution
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
