import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, Clock, User, ArrowRight, BookOpen, MessageCircle, Heart } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    role: string;
  };
  publishedAt: string;
  readTime: number;
  category: string;
  tags: string[];
  featured: boolean;
  likes: number;
  comments: number;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Top 10 Engineering Colleges in Tamil Nadu for 2025',
    excerpt: 'Discover the best engineering institutions in Tamil Nadu that are shaping the future of technology and innovation.',
    content: '',
    author: {
      name: 'Dr. Priya Krishnan',
      role: 'Education Consultant'
    },
    publishedAt: '2025-01-10',
    readTime: 8,
    category: 'Education',
    tags: ['Engineering', 'Tamil Nadu', 'Rankings'],
    featured: true,
    likes: 245,
    comments: 18
  },
  {
    id: '2',
    title: 'Career Opportunities in Data Science for Fresh Graduates',
    excerpt: 'Explore the growing field of data science and learn about entry-level opportunities for new graduates.',
    content: '',
    author: {
      name: 'Rajesh Kumar',
      role: 'Data Science Manager'
    },
    publishedAt: '2025-01-08',
    readTime: 6,
    category: 'Career',
    tags: ['Data Science', 'Career', 'Technology'],
    featured: false,
    likes: 189,
    comments: 12
  },
  {
    id: '3',
    title: 'How to Prepare for Campus Placements: A Complete Guide',
    excerpt: 'Essential tips and strategies to excel in campus recruitment drives and land your dream job.',
    content: '',
    author: {
      name: 'Meera Sharma',
      role: 'HR Director'
    },
    publishedAt: '2025-01-05',
    readTime: 12,
    category: 'Career',
    tags: ['Placements', 'Interview Tips', 'Students'],
    featured: true,
    likes: 356,
    comments: 24
  },
  {
    id: '4',
    title: 'Emerging Technologies Shaping Higher Education',
    excerpt: 'Discover how AI, VR, and other cutting-edge technologies are transforming the educational landscape.',
    content: '',
    author: {
      name: 'Dr. Anand Patel',
      role: 'Technology Researcher'
    },
    publishedAt: '2025-01-03',
    readTime: 10,
    category: 'Technology',
    tags: ['AI', 'Education', 'Innovation'],
    featured: false,
    likes: 198,
    comments: 15
  },
  {
    id: '5',
    title: 'Building a Strong Professional Network as a Student',
    excerpt: 'Learn effective networking strategies to build meaningful professional relationships during your academic journey.',
    content: '',
    author: {
      name: 'Kavitha Nair',
      role: 'Career Counselor'
    },
    publishedAt: '2025-01-01',
    readTime: 7,
    category: 'Career',
    tags: ['Networking', 'Professional Development', 'Students'],
    featured: false,
    likes: 156,
    comments: 9
  },
  {
    id: '6',
    title: 'The Future of Remote Work in Academia',
    excerpt: 'Exploring how remote work trends are affecting academic institutions and educational delivery methods.',
    content: '',
    author: {
      name: 'Prof. Suresh Reddy',
      role: 'Academic Director'
    },
    publishedAt: '2024-12-28',
    readTime: 9,
    category: 'Education',
    tags: ['Remote Work', 'Academia', 'Future Trends'],
    featured: false,
    likes: 134,
    comments: 11
  }
];

const categories = ['All', 'Education', 'Career', 'Technology'];

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  
  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Education: 'bg-blue-100 text-blue-800',
      Career: 'bg-green-100 text-green-800',
      Technology: 'bg-purple-100 text-purple-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-[#DDDAD0]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              FacultyConnect Blog
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Insights, tips, and stories about education, careers, and technology in higher education
            </p>
          </div>
        </div>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPosts.slice(0, 2).map((post) => (
              <Card key={post.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Badge className={getCategoryColor(post.category)}>
                      {post.category}
                    </Badge>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      Featured
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarFallback className="text-xs">
                            {post.author.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {post.author.name}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(post.publishedAt)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime} min read
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {post.likes}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {post.comments}
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="group-hover:bg-blue-50">
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

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200 pb-4">
          <div className="flex items-center space-x-4">
            <BookOpen className="w-5 h-5 text-gray-500" />
            <div className="flex space-x-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-blue-600 text-white" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Badge className={getCategoryColor(post.category)}>
                    {post.category}
                  </Badge>
                  {post.featured && (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      Featured
                    </Badge>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarFallback className="text-xs">
                        {post.author.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {post.author.name}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime} min
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      {post.likes}
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {post.comments}
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="group-hover:bg-blue-50">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Stay Updated with FacultyConnect
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Get the latest insights on education, career tips, and industry trends delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button className="bg-blue-600 hover:bg-blue-700">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
