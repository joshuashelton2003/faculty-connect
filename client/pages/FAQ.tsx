import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  HelpCircle,
  Users,
  Building,
  GraduationCap,
  FileText,
  Shield,
  CreditCard,
  MessageCircle,
  Phone,
  Mail
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'faculty' | 'employers' | 'technical' | 'billing' | 'privacy';
}

const faqData: FAQItem[] = [
  // General FAQs
  {
    id: '1',
    question: 'What is FacultyConnect?',
    answer: 'FacultyConnect is Tamil Nadu\'s premier platform connecting qualified educators with educational institutions. We help faculty find their ideal teaching positions and assist institutions in hiring the best talent.',
    category: 'general'
  },
  {
    id: '2',
    question: 'How does FacultyConnect work?',
    answer: 'Faculty members create profiles, browse job opportunities, and apply with one click. Institutions post job requirements, review applications, and connect with qualified candidates. Our platform streamlines the entire hiring process.',
    category: 'general'
  },
  {
    id: '3',
    question: 'Is FacultyConnect free to use?',
    answer: 'Yes! Creating an account and browsing opportunities is completely free for faculty members. Institutions have access to free basic features with premium plans available for enhanced functionality.',
    category: 'general'
  },
  {
    id: '4',
    question: 'Which educational institutions are on the platform?',
    answer: 'We work with universities, engineering colleges, arts & science colleges, polytechnics, ITIs, and schools across Tamil Nadu. All institutions are verified before being allowed to post jobs.',
    category: 'general'
  },
  {
    id: '5',
    question: 'How can I contact FacultyConnect support?',
    answer: 'You can reach our support team via email at support@facultyconnect.in, call us at +91-44-1234-5678, or use the contact form on our website. We typically respond within 24 hours.',
    category: 'general'
  },

  // Faculty FAQs
  {
    id: '6',
    question: 'How do I create a faculty profile?',
    answer: 'Click "Sign Up" and select "Faculty". Fill in your personal details, educational background, experience, and upload your CV. Complete profiles get 3x more views from institutions.',
    category: 'faculty'
  },
  {
    id: '7',
    question: 'What documents do I need to upload?',
    answer: 'We recommend uploading your updated CV, educational certificates, experience letters, and a professional photo. All documents should be in PDF format and under 5MB each.',
    category: 'faculty'
  },
  {
    id: '8',
    question: 'How do I search for job opportunities?',
    answer: 'Use our advanced search filters to find jobs by location, subject, institution type, salary range, and experience level. You can also set up job alerts to get notified of new opportunities.',
    category: 'faculty'
  },
  {
    id: '9',
    question: 'Can I apply to multiple jobs at once?',
    answer: 'Yes! You can apply to multiple positions with just one click each. Your profile information is automatically shared with institutions, making the process seamless.',
    category: 'faculty'
  },
  {
    id: '10',
    question: 'How do I track my applications?',
    answer: 'Go to your dashboard to view all applications, their current status, and any updates from institutions. You\'ll also receive email notifications for status changes.',
    category: 'faculty'
  },
  {
    id: '11',
    question: 'What if I\'m currently employed but looking for new opportunities?',
    answer: 'You can mark your profile as "Privately looking" to search discreetly. Only institutions you apply to will see your profile, maintaining your privacy.',
    category: 'faculty'
  },

  // Employer FAQs
  {
    id: '12',
    question: 'How do I register my institution?',
    answer: 'Click "Sign Up" and select "Institution". Provide your institution details, official documents for verification, and complete the registration process. Verification typically takes 1-2 business days.',
    category: 'employers'
  },
  {
    id: '13',
    question: 'What information should I include in job postings?',
    answer: 'Include detailed job descriptions, required qualifications, experience level, salary range, benefits, application deadline, and any specific requirements. Detailed posts attract better candidates.',
    category: 'employers'
  },
  {
    id: '14',
    question: 'How do I review and shortlist candidates?',
    answer: 'Access all applications from your dashboard. Use our filtering tools to shortlist candidates based on qualifications, experience, and other criteria. You can also schedule interviews directly through the platform.',
    category: 'employers'
  },
  {
    id: '15',
    question: 'Can I search for candidates proactively?',
    answer: 'Yes! Premium plans include access to our candidate database where you can search and contact faculty members directly, even if they haven\'t applied to your specific job posting.',
    category: 'employers'
  },
  {
    id: '16',
    question: 'How is my institution verified?',
    answer: 'We verify institutions by checking official documents, website authenticity, and conducting background checks. This ensures only legitimate institutions can post jobs on our platform.',
    category: 'employers'
  },

  // Technical FAQs
  {
    id: '17',
    question: 'What browsers are supported?',
    answer: 'FacultyConnect works best on Chrome, Firefox, Safari, and Edge. We recommend using the latest version of your browser for the best experience.',
    category: 'technical'
  },
  {
    id: '18',
    question: 'Can I use FacultyConnect on my mobile device?',
    answer: 'Yes! Our platform is fully responsive and works seamlessly on smartphones and tablets. You can browse jobs, apply, and manage your profile from any device.',
    category: 'technical'
  },
  {
    id: '19',
    question: 'How do I reset my password?',
    answer: 'Click "Forgot Password" on the login page, enter your email address, and follow the instructions sent to your email. If you don\'t receive the email, check your spam folder.',
    category: 'technical'
  },
  {
    id: '20',
    question: 'Why can\'t I upload my documents?',
    answer: 'Ensure your files are in PDF format and under 5MB each. Clear your browser cache and try again. If the problem persists, contact our technical support team.',
    category: 'technical'
  },

  // Billing FAQs
  {
    id: '21',
    question: 'What are the pricing plans for institutions?',
    answer: 'We offer Basic (free), Professional (₹5,000/month), and Enterprise (₹15,000/month) plans. Each plan includes different features like number of job postings, candidate search access, and priority support.',
    category: 'billing'
  },
  {
    id: '22',
    question: 'How do I upgrade my plan?',
    answer: 'Go to the "Pricing" section in your dashboard and select your desired plan. We accept all major credit/debit cards and net banking. Upgrades are processed immediately.',
    category: 'billing'
  },
  {
    id: '23',
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your subscription at any time from your account settings. You\'ll continue to have access to premium features until the end of your billing period.',
    category: 'billing'
  },

  // Privacy FAQs
  {
    id: '24',
    question: 'How is my personal information protected?',
    answer: 'We use industry-standard encryption and security measures to protect your data. We never share your personal information with third parties without your explicit consent.',
    category: 'privacy'
  },
  {
    id: '25',
    question: 'Who can see my profile?',
    answer: 'Only verified institutions can view complete faculty profiles. You can control your privacy settings and choose whether to make your profile public or restrict it to specific institutions.',
    category: 'privacy'
  }
];

const categories = [
  { id: 'all', name: 'All Questions', icon: HelpCircle, count: faqData.length },
  { id: 'general', name: 'General', icon: HelpCircle, count: faqData.filter(f => f.category === 'general').length },
  { id: 'faculty', name: 'For Faculty', icon: GraduationCap, count: faqData.filter(f => f.category === 'faculty').length },
  { id: 'employers', name: 'For Institutions', icon: Building, count: faqData.filter(f => f.category === 'employers').length },
  { id: 'technical', name: 'Technical', icon: FileText, count: faqData.filter(f => f.category === 'technical').length },
  { id: 'billing', name: 'Billing', icon: CreditCard, count: faqData.filter(f => f.category === 'billing').length },
  { id: 'privacy', name: 'Privacy', icon: Shield, count: faqData.filter(f => f.category === 'privacy').length }
];

const FAQ: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Frequently Asked Questions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto mb-10"
            >
              Find answers to common questions about FacultyConnect. Can't find what you're looking for? Contact our support team.
            </motion.p>
            
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for help articles, FAQs, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-white placeholder-white/70 bg-white/10 border-white/30 focus:border-white/50 backdrop-blur-sm"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <category.icon className="w-4 h-4 mr-3" />
                      <span className="flex-1 text-left">{category.name}</span>
                      <Badge variant="secondary" className="ml-2">
                        {category.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Results Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === 'all' ? 'All Questions' : categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <Badge variant="outline" className="text-sm">
                  {filteredFAQs.length} questions
                </Badge>
              </div>

              {/* FAQ Accordion */}
              {filteredFAQs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFAQs.map((faq, index) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <AccordionItem value={faq.id} className="border border-gray-200 rounded-lg mb-4 px-6">
                        <AccordionTrigger className="text-left hover:no-underline py-6">
                          <span className="font-medium text-gray-900">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 pb-6">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
                    <p className="text-gray-600 mb-6">
                      Try adjusting your search or browse different categories.
                    </p>
                    <Button variant="outline" onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}>
                      Show All Questions
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Support Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h2>
            <p className="text-lg text-gray-600">
              Our support team is here to help you every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-6">Get instant help from our support team</p>
                <Button className="w-full">Start Chat</Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <Mail className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Support</h3>
                <p className="text-gray-600 mb-6">Send us your questions via email</p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.href = 'mailto:support@facultyconnect.in'}
                >
                  Send Email
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <Phone className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone Support</h3>
                <p className="text-gray-600 mb-6">Call us for immediate assistance</p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.href = 'tel:+91-44-1234-5678'}
                >
                  Call Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Helpful Resources
            </h2>
            <p className="text-lg text-gray-600">
              Explore these resources to get the most out of FacultyConnect
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => navigate('/how-it-works')}>
              <CardContent className="p-6 text-center">
                <HelpCircle className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">How It Works</h3>
                <p className="text-sm text-gray-600">Learn how to use the platform</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => navigate('/about')}>
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">About Us</h3>
                <p className="text-sm text-gray-600">Learn about our mission</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => navigate('/contact')}>
              <CardContent className="p-6 text-center">
                <MessageCircle className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Contact Us</h3>
                <p className="text-sm text-gray-600">Get in touch with us</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => navigate('/privacy-policy')}>
              <CardContent className="p-6 text-center">
                <Shield className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Privacy Policy</h3>
                <p className="text-sm text-gray-600">How we protect your data</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
