import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote, Star, MapPin, Calendar, Building2, GraduationCap, Trophy, ArrowRight, Users, Target, TrendingUp } from 'lucide-react';

interface SuccessStory {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  college: string;
  graduationYear: number;
  story: string;
  achievements: string[];
  avatar?: string;
  rating: number;
  category: 'placement' | 'career-growth' | 'entrepreneurship' | 'research';
}

const successStories: SuccessStory[] = [
  {
    id: '1',
    name: 'Rahul',
    role: 'Senior Software Engineer',
    company: 'Google',
    location: 'Bangalore, Karnataka',
    college: 'Anna University, Chennai',
    graduationYear: 2022,
    story: 'FacultyConnect helped me discover my dream job at Google. The platform not only connected me with the right opportunities but also provided valuable insights about the company culture and interview process. The career guidance from faculty mentors was invaluable in preparing for technical interviews.',
    achievements: [
      'Selected among top 5% in Google hiring process',
      'Led development of 3 major features in first year',
      'Promoted to Senior Engineer within 18 months'
    ],
    rating: 5,
    category: 'placement'
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    role: 'Founder & CEO',
    company: 'TechStart Solutions',
    location: 'Chennai, Tamil Nadu',
    college: 'IIT Madras',
    graduationYear: 2019,
    story: 'After working in the corporate world for 3 years, I decided to start my own tech company. The connections I made through FacultyConnect, especially with industry veterans and fellow alumni, were crucial in building my startup. The platform helped me find co-founders and early investors.',
    achievements: [
      'Raised $2M in seed funding',
      'Built a team of 25+ engineers',
      'Achieved profitability in 2 years'
    ],
    rating: 5,
    category: 'entrepreneurship'
  },
  {
    id: '3',
    name: 'Dr. Meera Sharma',
    role: 'Research Scientist',
    company: 'ISRO',
    location: 'Bangalore, Karnataka',
    college: 'NIT Trichy',
    graduationYear: 2020,
    story: 'My journey from a small town to working on India\'s space missions was made possible through the research opportunities I found on FacultyConnect. The platform connected me with leading researchers and helped me publish papers during my PhD, which eventually led to my position at ISRO.',
    achievements: [
      'Published 15+ research papers',
      'Contributed to Chandrayaan-3 mission',
      'Received Young Scientist Award'
    ],
    rating: 5,
    category: 'research'
  },
  {
    id: '4',
    name: 'Arun Patel',
    role: 'VP Engineering',
    company: 'Flipkart',
    location: 'Bangalore, Karnataka',
    college: 'VIT University, Vellore',
    graduationYear: 2018,
    story: 'Starting as a junior developer, I\'ve grown to lead engineering teams at one of India\'s largest e-commerce companies. FacultyConnect was instrumental in my career growth, helping me find mentors who guided my transition from individual contributor to engineering leadership.',
    achievements: [
      'Scaled from Junior to VP in 5 years',
      'Led teams of 100+ engineers',
      'Architected systems handling 10M+ daily users'
    ],
    rating: 5,
    category: 'career-growth'
  },
  {
    id: '5',
    name: 'Kavitha Nair',
    role: 'Data Science Manager',
    company: 'Microsoft',
    location: 'Hyderabad, Telangana',
    college: 'PSG College of Technology, Coimbatore',
    graduationYear: 2021,
    story: 'As someone from a non-CS background in Electronics, transitioning to data science seemed impossible. FacultyConnect helped me find the right courses, mentors, and eventually the perfect role at Microsoft. The platform\'s career transition resources were game-changing.',
    achievements: [
      'Successfully transitioned from Electronics to Data Science',
      'Manages ML models serving 50M+ users',
      'Speaker at international AI conferences'
    ],
    rating: 5,
    category: 'career-growth'
  },
  {
    id: '6',
    name: 'Suresh Reddy',
    role: 'Product Manager',
    company: 'Amazon',
    location: 'Hyderabad, Telangana',
    college: 'BITS Pilani, Hyderabad',
    graduationYear: 2020,
    story: 'FacultyConnect opened doors to product management roles I never knew existed. The platform\'s industry insights and alumni network helped me understand the PM role and prepare for challenging interviews at top tech companies.',
    achievements: [
      'Launched 3 successful products',
      'Increased user engagement by 40%',
      'Led cross-functional teams of 20+ members'
    ],
    rating: 5,
    category: 'placement'
  }
];

const categories = [
  { key: 'all', label: 'All Stories', icon: Users },
  { key: 'placement', label: 'Campus Placements', icon: Target },
  { key: 'career-growth', label: 'Career Growth', icon: TrendingUp },
  { key: 'entrepreneurship', label: 'Entrepreneurship', icon: Building2 },
  { key: 'research', label: 'Research', icon: GraduationCap }
];

const SuccessStories: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  
  const filteredStories = selectedCategory === 'all' 
    ? successStories 
    : successStories.filter(story => story.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const colors = {
      placement: 'bg-blue-100 text-blue-800',
      'career-growth': 'bg-green-100 text-green-800',
      entrepreneurship: 'bg-purple-100 text-purple-800',
      research: 'bg-orange-100 text-orange-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      placement: 'Campus Placement',
      'career-growth': 'Career Growth',
      entrepreneurship: 'Entrepreneurship',
      research: 'Research'
    };
    return labels[category as keyof typeof labels] || category;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Success Stories
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Inspiring journeys of students and professionals who achieved their dreams through FacultyConnect
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">2,500+</div>
              <div className="text-gray-600">Successful Placements</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">150+</div>
              <div className="text-gray-600">Startups Founded</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-gray-600">Career Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">500+</div>
              <div className="text-gray-600">Research Papers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={category.key}
                  variant={selectedCategory === category.key ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`flex items-center space-x-2 ${
                    selectedCategory === category.key ? "bg-blue-600 text-white" : ""
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{category.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredStories.map((story, index) => (
            <Card key={story.id} className="group hover:shadow-xl transition-all duration-300 bg-white">
              <CardContent className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-16 w-16 border-2 border-gray-100">
                      <AvatarImage src={story.avatar} />
                      <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold text-lg">
                        {story.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {story.name}
                      </h3>
                      <p className="text-blue-600 font-medium mb-1">
                        {story.role}
                      </p>
                      <p className="text-gray-600 text-sm font-medium mb-2">
                        {story.company}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {story.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Class of {story.graduationYear}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Badge className={getCategoryColor(story.category)}>
                    {getCategoryLabel(story.category)}
                  </Badge>
                </div>

                {/* College Info */}
                <div className="flex items-center text-sm text-gray-600 mb-6 p-3 bg-gray-50 rounded-lg">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  <span className="font-medium">{story.college}</span>
                </div>

                {/* Story Quote */}
                <div className="relative mb-6">
                  <Quote className="w-8 h-8 text-blue-200 absolute -top-2 -left-2" />
                  <blockquote className="text-gray-700 italic pl-6 pr-4 leading-relaxed">
                    {story.story}
                  </blockquote>
                </div>

                {/* Achievements */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Key Achievements:</h4>
                  <ul className="space-y-2">
                    {story.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-600">
                        <Star className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < story.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">
                      Rated FacultyConnect experience
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Write Your Success Story?
              </h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands of students and professionals who have achieved their career goals through FacultyConnect. 
                Start your journey today and become our next success story.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Users className="w-5 h-5 mr-2" />
                  Join FacultyConnect
                </Button>
                <Button size="lg" variant="outline">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Share Your Story
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
