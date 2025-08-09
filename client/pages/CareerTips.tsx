import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Target, 
  BookOpen, 
  Users, 
  TrendingUp, 
  Award, 
  Clock, 
  ArrowRight,
  Lightbulb,
  CheckCircle,
  Star,
  FileText,
  Video,
  Headphones,
  Download,
  Share2,
  Heart,
  MessageCircle,
  User,
  Calendar,
  Tag
} from 'lucide-react';

interface CareerTip {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: number;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  publishedAt: string;
  tags: string[];
  likes: number;
  comments: number;
  featured: boolean;
}

const careerTips: CareerTip[] = [
  {
    id: '1',
    title: 'How to Ace Your Academic Job Interview',
    excerpt: 'Essential strategies and tips to excel in academic interviews, from preparation to follow-up.',
    content: '',
    category: 'Interview Skills',
    readTime: 7,
    author: {
      name: 'Dr. Priya Sharma',
      role: 'HR Director, Anna University'
    },
    publishedAt: '2025-01-10',
    tags: ['Interview', 'Preparation', 'Academic Jobs'],
    likes: 324,
    comments: 45,
    featured: true
  },
  {
    id: '2',
    title: 'Building a Strong Academic Portfolio',
    excerpt: 'Learn how to showcase your research, teaching, and service contributions effectively.',
    content: '',
    category: 'Portfolio Building',
    readTime: 10,
    author: {
      name: 'Prof. Rajesh Kumar',
      role: 'Dean, IIT Madras'
    },
    publishedAt: '2025-01-08',
    tags: ['Portfolio', 'Research', 'Teaching'],
    likes: 267,
    comments: 32,
    featured: true
  },
  {
    id: '3',
    title: 'Networking Strategies for Faculty Career Growth',
    excerpt: 'Effective networking techniques to advance your academic career and build meaningful professional relationships.',
    content: '',
    category: 'Networking',
    readTime: 6,
    author: {
      name: 'Dr. Meera Nair',
      role: 'Career Counselor'
    },
    publishedAt: '2025-01-05',
    tags: ['Networking', 'Career Growth', 'Professional Development'],
    likes: 189,
    comments: 28,
    featured: false
  },
  {
    id: '4',
    title: 'Transitioning from Industry to Academia',
    excerpt: 'A comprehensive guide for professionals looking to make the transition from industry to academic careers.',
    content: '',
    category: 'Career Transition',
    readTime: 12,
    author: {
      name: 'Dr. Arun Patel',
      role: 'Former Industry Executive turned Professor'
    },
    publishedAt: '2025-01-03',
    tags: ['Career Change', 'Industry to Academia', 'Transition'],
    likes: 412,
    comments: 67,
    featured: true
  },
  {
    id: '5',
    title: 'Research Publication Strategies for Early Career Faculty',
    excerpt: 'Tips and strategies for publishing research papers and building your academic reputation.',
    content: '',
    category: 'Research & Publications',
    readTime: 9,
    author: {
      name: 'Dr. Kavitha Reddy',
      role: 'Associate Professor, VIT University'
    },
    publishedAt: '2025-01-01',
    tags: ['Research', 'Publications', 'Early Career'],
    likes: 298,
    comments: 41,
    featured: false
  },
  {
    id: '6',
    title: 'Work-Life Balance in Academic Careers',
    excerpt: 'Maintaining a healthy work-life balance while pursuing excellence in teaching and research.',
    content: '',
    category: 'Work-Life Balance',
    readTime: 8,
    author: {
      name: 'Dr. Sunita Mehta',
      role: 'Wellness Coach & Professor'
    },
    publishedAt: '2024-12-28',
    tags: ['Work-Life Balance', 'Wellness', 'Productivity'],
    likes: 356,
    comments: 52,
    featured: false
  }
];

const categories = [
  { name: 'All Tips', count: careerTips.length, icon: Target },
  { name: 'Interview Skills', count: 1, icon: Users },
  { name: 'Portfolio Building', count: 1, icon: FileText },
  { name: 'Networking', count: 1, icon: Users },
  { name: 'Career Transition', count: 1, icon: TrendingUp },
  { name: 'Research & Publications', count: 1, icon: BookOpen },
  { name: 'Work-Life Balance', count: 1, icon: Award }
];

const CareerTips: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All Tips');
  
  const filteredTips = selectedCategory === 'All Tips' 
    ? careerTips 
    : careerTips.filter(tip => tip.category === selectedCategory);

  const featuredTips = careerTips.filter(tip => tip.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Interview Skills': 'bg-blue-100 text-blue-800',
      'Portfolio Building': 'bg-green-100 text-green-800',
      'Networking': 'bg-purple-100 text-purple-800',
      'Career Transition': 'bg-orange-100 text-orange-800',
      'Research & Publications': 'bg-indigo-100 text-indigo-800',
      'Work-Life Balance': 'bg-pink-100 text-pink-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-[#DDDAD0]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Lightbulb className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Career Tips & Guidance
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Expert advice and actionable insights to accelerate your academic career growth and achieve your professional goals
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">Career Tips</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
              <div className="text-gray-600">Expert Authors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">10K+</div>
              <div className="text-gray-600">Readers Helped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Tips */}
      {featuredTips.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Career Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTips.map((tip) => (
              <Card key={tip.id} className="group cursor-pointer hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Badge className={getCategoryColor(tip.category)}>
                      {tip.category}
                    </Badge>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      Featured
                    </Badge>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                    {tip.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {tip.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarFallback className="text-xs">
                            {tip.author.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {tip.author.name}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {tip.readTime} min read
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {tip.likes}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {tip.comments}
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="group-hover:bg-purple-50">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Category Filter & Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                        selectedCategory === category.name
                          ? 'bg-purple-100 text-purple-800'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center">
                        <IconComponent className="w-4 h-4 mr-3" />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Stay Updated</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Get the latest career tips and insights delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  />
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory} ({filteredTips.length} {filteredTips.length === 1 ? 'tip' : 'tips'})
              </h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download Guide
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              {filteredTips.map((tip, index) => (
                <Card key={tip.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-purple-600" />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={getCategoryColor(tip.category)}>
                            {tip.category}
                          </Badge>
                          {tip.featured && (
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                              Featured
                            </Badge>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                          {tip.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {tip.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <User className="w-4 h-4 mr-1" />
                              {tip.author.name}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatDate(tip.publishedAt)}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {tip.readTime} min read
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Heart className="w-4 h-4 mr-1" />
                              {tip.likes}
                            </div>
                            <div className="flex items-center">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              {tip.comments}
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {tip.tags.slice(0, 2).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  <Tag className="w-3 h-3 mr-1" />
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <Button variant="ghost" className="group-hover:bg-purple-50">
                            Read Full Article
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="px-8">
                Load More Tips
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Resources */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Quick Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <Video className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Video Tutorials</h3>
                <p className="text-gray-600 mb-4">
                  Watch expert-led video tutorials on career development topics.
                </p>
                <Button variant="outline">
                  Watch Videos
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <Headphones className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Podcasts</h3>
                <p className="text-gray-600 mb-4">
                  Listen to career advice from successful faculty members.
                </p>
                <Button variant="outline">
                  Listen Now
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <FileText className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Templates</h3>
                <p className="text-gray-600 mb-4">
                  Download CV templates, cover letter samples, and more.
                </p>
                <Button variant="outline">
                  Download
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerTips;
