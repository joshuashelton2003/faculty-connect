import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Check,
  X,
  Crown,
  Star,
  Zap,
  Shield,
  Users,
  TrendingUp,
  Briefcase,
  Search,
  Award,
  Phone,
  Mail,
  MessageCircle,
  ArrowRight,
  Building,
  Target,
  Globe,
  Sparkles,
  Clock,
  BarChart
} from 'lucide-react';

interface PricingPlan {
  id: string;
  name: string;
  price: {
    monthly: number;
    annual: number;
  };
  description: string;
  features: string[];
  limitations: string[];
  popular: boolean;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  buttonText: string;
  jobPostings: string;
  candidateAccess: string;
  support: string;
}

const EmployerPricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const pricingPlans: PricingPlan[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: {
        monthly: 0,
        annual: 0
      },
      description: 'Perfect for small institutions getting started with faculty recruitment',
      features: [
        'Post up to 3 jobs per month',
        'Basic candidate search',
        'Standard job listings',
        'Email support',
        'Basic analytics',
        'Institution profile page'
      ],
      limitations: [
        'Limited candidate database access',
        'No featured job postings',
        'Basic search filters only',
        'Email support only'
      ],
      popular: false,
      icon: Building,
      color: 'text-gray-600',
      bgColor: 'bg-[#DDDAD0]',
      buttonText: 'Get Started Free',
      jobPostings: '3 jobs/month',
      candidateAccess: 'Basic search',
      support: 'Email only'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: {
        monthly: 4999,
        annual: 49990
      },
      description: 'Ideal for growing institutions with regular hiring needs',
      features: [
        'Post up to 15 jobs per month',
        'Advanced candidate search & filters',
        'Featured job postings (2/month)',
        'Priority email & chat support',
        'Detailed analytics & reports',
        'Custom branding on job posts',
        'Application tracking system',
        'Candidate shortlisting tools',
        'Interview scheduling assistance'
      ],
      limitations: [
        'Limited premium features',
        'Standard candidate database access'
      ],
      popular: true,
      icon: Briefcase,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      buttonText: 'Start Professional',
      jobPostings: '15 jobs/month',
      candidateAccess: 'Advanced search',
      support: 'Email & Chat'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: {
        monthly: 9999,
        annual: 99990
      },
      description: 'Comprehensive solution for large institutions and universities',
      features: [
        'Unlimited job postings',
        'Full candidate database access',
        'Unlimited featured postings',
        'Dedicated account manager',
        'Advanced analytics & insights',
        'Custom integration support',
        'White-label solutions',
        'Bulk recruitment tools',
        'Custom workflows',
        'Priority candidate matching',
        'Video interview platform',
        'Recruitment consulting',
        'Onboarding assistance'
      ],
      limitations: [],
      popular: false,
      icon: Crown,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      buttonText: 'Contact Sales',
      jobPostings: 'Unlimited',
      candidateAccess: 'Full database',
      support: 'Dedicated manager'
    }
  ];

  const additionalFeatures = [
    {
      icon: Search,
      title: 'Smart Candidate Matching',
      description: 'AI-powered algorithm matches your job requirements with the best candidates'
    },
    {
      icon: Shield,
      title: 'Verified Profiles',
      description: 'All candidate profiles are verified for authenticity and qualifications'
    },
    {
      icon: TrendingUp,
      title: 'Analytics & Insights',
      description: 'Track application rates, candidate engagement, and hiring metrics'
    },
    {
      icon: Users,
      title: 'Collaboration Tools',
      description: 'Share candidates and collaborate with your hiring team seamlessly'
    }
  ];

  const faqs = [
    {
      question: 'How does the free plan work?',
      answer: 'The Starter plan is completely free and allows you to post up to 3 jobs per month with basic features. Perfect for small institutions to try our platform.'
    },
    {
      question: 'Can I upgrade or downgrade my plan anytime?',
      answer: 'Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at the next billing cycle.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, bank transfers, and UPI payments. For Enterprise plans, we also offer invoice-based billing.'
    },
    {
      question: 'Do you offer institutional discounts?',
      answer: 'Yes, we offer special pricing for government institutions, educational consortiums, and bulk subscriptions. Contact our sales team for details.'
    },
    {
      question: 'Is there a setup fee?',
      answer: 'No, there are no setup fees for any of our plans. You only pay the monthly or annual subscription fee.'
    }
  ];

  const calculateSavings = (plan: PricingPlan): number => {
    const monthlyCost = plan.price.monthly * 12;
    const annualCost = plan.price.annual;
    return monthlyCost - annualCost;
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-[#DDDAD0]">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Crown className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Employer Pricing Plans
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Choose the perfect plan for your institution's faculty recruitment needs. 
              Start free and scale as you grow.
            </p>
          </div>
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center space-x-4">
          <Label htmlFor="billing-toggle" className={`text-sm font-medium ${!isAnnual ? 'text-blue-600' : 'text-gray-600'}`}>
            Monthly
          </Label>
          <Switch
            id="billing-toggle"
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
          />
          <Label htmlFor="billing-toggle" className={`text-sm font-medium ${isAnnual ? 'text-blue-600' : 'text-gray-600'}`}>
            Annual
          </Label>
          {isAnnual && (
            <Badge className="bg-green-100 text-green-800 ml-2">
              Save up to 17%
            </Badge>
          )}
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => {
            const IconComponent = plan.icon;
            const currentPrice = isAnnual ? plan.price.annual : plan.price.monthly;
            const savings = isAnnual ? calculateSavings(plan) : 0;
            
            return (
              <Card 
                key={plan.id} 
                className={`relative ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''} hover:shadow-xl transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className={`text-center pb-6 ${plan.bgColor}`}>
                  <div className={`w-16 h-16 ${plan.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className={`w-8 h-8 ${plan.color}`} />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                  <div className="mt-4">
                    {currentPrice === 0 ? (
                      <div className="text-4xl font-bold text-gray-900">Free</div>
                    ) : (
                      <>
                        <div className="text-4xl font-bold text-gray-900">
                          {formatPrice(currentPrice)}
                        </div>
                        <div className="text-sm text-gray-600">
                          per {isAnnual ? 'year' : 'month'}
                        </div>
                        {isAnnual && savings > 0 && (
                          <div className="text-sm text-green-600 font-medium mt-1">
                            Save {formatPrice(savings)} annually
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <p className="text-gray-600 mt-4">{plan.description}</p>
                </CardHeader>

                <CardContent className="pt-6">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 gap-4 mb-6 p-4 bg-[#DDDAD0] rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Job Postings</span>
                      <span className="font-medium">{plan.jobPostings}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Candidate Access</span>
                      <span className="font-medium">{plan.candidateAccess}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Support</span>
                      <span className="font-medium">{plan.support}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    <h4 className="font-medium text-gray-900">Features included:</h4>
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Limitations */}
                  {plan.limitations.length > 0 && (
                    <div className="space-y-3 mb-6 p-3 bg-[#DDDAD0] rounded-lg">
                      <h4 className="font-medium text-gray-700 text-sm">Plan limitations:</h4>
                      {plan.limitations.map((limitation, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <X className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-gray-600">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <Button 
                    className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    size="lg"
                  >
                    {plan.buttonText}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  {plan.id === 'enterprise' && (
                    <p className="text-center text-xs text-gray-500 mt-3">
                      Custom pricing available for large institutions
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Additional Features */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose FacultyConnect?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform is designed specifically for educational institutions with features that streamline faculty recruitment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Compare Plans</h2>
          <p className="text-gray-600">Detailed comparison of features across all plans</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#DDDAD0]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Features</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Starter</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Professional</th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">Monthly Job Postings</td>
                  <td className="px-6 py-4 text-center text-sm">3</td>
                  <td className="px-6 py-4 text-center text-sm">15</td>
                  <td className="px-6 py-4 text-center text-sm">Unlimited</td>
                </tr>
                <tr className="bg-[#DDDAD0]">
                  <td className="px-6 py-4 text-sm text-gray-900">Featured Job Postings</td>
                  <td className="px-6 py-4 text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="px-6 py-4 text-center text-sm">2/month</td>
                  <td className="px-6 py-4 text-center text-sm">Unlimited</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">Candidate Database Access</td>
                  <td className="px-6 py-4 text-center text-sm">Basic</td>
                  <td className="px-6 py-4 text-center text-sm">Advanced</td>
                  <td className="px-6 py-4 text-center text-sm">Full Access</td>
                </tr>
                <tr className="bg-[#DDDAD0]">
                  <td className="px-6 py-4 text-sm text-gray-900">Analytics & Reports</td>
                  <td className="px-6 py-4 text-center text-sm">Basic</td>
                  <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  <td className="px-6 py-4 text-center text-sm">Advanced</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">Dedicated Account Manager</td>
                  <td className="px-6 py-4 text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                </tr>
                <tr className="bg-[#DDDAD0]">
                  <td className="px-6 py-4 text-sm text-gray-900">Custom Integrations</td>
                  <td className="px-6 py-4 text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Get answers to common questions about our pricing plans</p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Hiring?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of institutions already using FacultyConnect to find the best faculty talent. 
            Start with our free plan or speak with our sales team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Start Free Trial
              <Sparkles className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Talk to Sales
              <MessageCircle className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Help Choosing?</h2>
            <p className="text-gray-600">Our team is here to help you find the perfect plan for your institution</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <Phone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Call Us</h3>
                <p className="text-gray-600 mb-4">Speak with our sales team</p>
                <p className="font-medium">+91 80000 12345</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Email Us</h3>
                <p className="text-gray-600 mb-4">Get detailed information</p>
                <p className="font-medium">sales@facultyconnect.in</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-4">Chat with our experts</p>
                <Button size="sm">Start Chat</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerPricing;
