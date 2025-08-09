import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  HelpCircle, 
  Search, 
  MessageCircle, 
  Mail, 
  Phone, 
  BookOpen, 
  Users, 
  Settings, 
  Shield, 
  CreditCard, 
  Briefcase,
  GraduationCap,
  Building2,
  FileText,
  Video,
  HeadphonesIcon,
  Clock,
  CheckCircle,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface HelpCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  articles: number;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'How do I create an account on FacultyConnect?',
    answer: 'To create an account, click on the "Sign Up" button on the homepage. Choose your role (Student/Faculty or Employer), fill in your details, and verify your email address. You can then complete your profile to start using the platform.',
    category: 'getting-started'
  },
  {
    id: '2',
    question: 'How can I search for jobs?',
    answer: 'Use the job search feature on the Jobs page. You can filter by location, salary, company, job type, and more. Save jobs you\'re interested in and apply directly through the platform.',
    category: 'jobs'
  },
  {
    id: '3',
    question: 'Can employers post jobs for free?',
    answer: 'Employers can post basic job listings for free. Premium features like featured listings, advanced analytics, and priority support are available with paid plans.',
    category: 'employers'
  },
  {
    id: '4',
    question: 'How do I update my profile?',
    answer: 'Go to your Dashboard and click on "Profile Settings". You can update your personal information, education, experience, skills, and upload documents like resume and certificates.',
    category: 'profile'
  },
  {
    id: '5',
    question: 'What is the difference between public and private profiles?',
    answer: 'Public profiles are visible to all users and employers on the platform. Private profiles are only visible to you and employers when you apply for their jobs.',
    category: 'privacy'
  },
  {
    id: '6',
    question: 'How can I track my job applications?',
    answer: 'Visit your Dashboard to see all your job applications, their status (Applied, Under Review, Shortlisted, etc.), and any feedback from employers.',
    category: 'applications'
  },
  {
    id: '7',
    question: 'Can I get notifications for new jobs?',
    answer: 'Yes! Set up job alerts in your profile settings. You\'ll receive email notifications when new jobs matching your criteria are posted.',
    category: 'notifications'
  },
  {
    id: '8',
    question: 'How do I contact support?',
    answer: 'You can contact our support team through the contact form below, email us at support@facultyconnect.in, or call our helpline. We typically respond within 24 hours.',
    category: 'support'
  }
];

const helpCategories: HelpCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Learn the basics of using FacultyConnect',
    icon: BookOpen,
    articles: 12
  },
  {
    id: 'jobs',
    title: 'Finding Jobs',
    description: 'How to search and apply for jobs',
    icon: Briefcase,
    articles: 8
  },
  {
    id: 'profile',
    title: 'Profile Management',
    description: 'Managing your profile and settings',
    icon: Users,
    articles: 6
  },
  {
    id: 'employers',
    title: 'For Employers',
    description: 'Posting jobs and managing applications',
    icon: Building2,
    articles: 10
  },
  {
    id: 'students',
    title: 'For Students',
    description: 'Student-specific features and guidance',
    icon: GraduationCap,
    articles: 9
  },
  {
    id: 'billing',
    title: 'Billing & Plans',
    description: 'Subscription plans and payment',
    icon: CreditCard,
    articles: 5
  },
  {
    id: 'privacy',
    title: 'Privacy & Security',
    description: 'Account security and privacy settings',
    icon: Shield,
    articles: 7
  },
  {
    id: 'technical',
    title: 'Technical Support',
    description: 'Troubleshooting and technical issues',
    icon: Settings,
    articles: 11
  }
];

const Help: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [contactForm, setContactForm] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });

  const filteredFAQs = React.useMemo(() => {
    let filtered = faqData;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [searchQuery, selectedCategory]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form submitted:', contactForm);
    alert('Thank you for contacting us! We\'ll get back to you within 24 hours.');
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: '',
      category: 'general'
    });
  };

  return (
    <div className="min-h-screen bg-[#DDDAD0]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <HelpCircle className="w-16 h-16 mx-auto mb-4 text-blue-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Help Center
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Find answers to your questions and get the help you need
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for help articles, FAQs, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg bg-white text-gray-900 border-0 rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Contact Options */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-4">Get instant help from our support team</p>
                <Button className="w-full">Start Chat</Button>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <Mail className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Email Support</h3>
                <p className="text-gray-600 mb-4">Send us an email and we'll respond within 24 hours</p>
                <Button variant="outline" className="w-full">
                  support@facultyconnect.in
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <Phone className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Phone Support</h3>
                <p className="text-gray-600 mb-4">Call us during business hours (9 AM - 6 PM IST)</p>
                <Button variant="outline" className="w-full">
                  +91 80000 12345
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Help Categories */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {helpCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Card 
                      key={category.id} 
                      className="cursor-pointer hover:shadow-md transition-all group"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                            <IconComponent className="w-6 h-6 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{category.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                            <Badge variant="secondary" className="text-xs">
                              {category.articles} articles
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
                {selectedCategory !== 'all' && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedCategory('all')}
                  >
                    Show All FAQs
                  </Button>
                )}
              </div>
              
              <Card>
                <CardContent className="p-6">
                  <Accordion type="single" collapsible className="w-full">
                    {filteredFAQs.map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  
                  {filteredFAQs.length === 0 && (
                    <div className="text-center py-8">
                      <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs found</h3>
                      <p className="text-gray-600">
                        Try searching with different keywords or browse our categories.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Still Need Help?</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Contact Our Support Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Name *
                        </label>
                        <Input
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <Input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={contactForm.category}
                        onChange={(e) => setContactForm(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="technical">Technical Issue</option>
                        <option value="billing">Billing Question</option>
                        <option value="feature">Feature Request</option>
                        <option value="bug">Bug Report</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <Input
                        required
                        value={contactForm.subject}
                        onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                        placeholder="Brief description of your issue"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <Textarea
                        required
                        rows={5}
                        value={contactForm.message}
                        onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Please provide as much detail as possible..."
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Links */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Quick Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  User Guide
                  <ExternalLink className="w-4 h-4 ml-auto" />
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Video className="w-4 h-4 mr-2" />
                  Video Tutorials
                  <ExternalLink className="w-4 h-4 ml-auto" />
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Community Forum
                  <ExternalLink className="w-4 h-4 ml-auto" />
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Privacy Policy
                  <ExternalLink className="w-4 h-4 ml-auto" />
                </Button>
              </CardContent>
            </Card>

            {/* Support Hours */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Support Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 6:00 PM IST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-medium">10:00 AM - 4:00 PM IST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-medium">Closed</span>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Currently Online</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HeadphonesIcon className="w-5 h-5 mr-2" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Platform Status</span>
                  <div className="flex items-center text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">API Status</span>
                  <div className="flex items-center text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Database</span>
                  <div className="flex items-center text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium">Operational</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View Full Status Page
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
