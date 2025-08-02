import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle,
  MessageSquare,
  HeadphonesIcon,
  Building
} from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  type: z.enum(['general', 'support', 'feedback', 'partnership']),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      type: 'general',
    },
  });

  // Contact form mutation - In real app: POST /api/contact
  const contactMutation = useMutation({
    mutationFn: async (formData: ContactFormData) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Contact form submitted:', formData);
      return { success: true };
    },
    onSuccess: () => {
      setShowSuccessMessage(true);
      reset();
      setTimeout(() => setShowSuccessMessage(false), 5000);
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Support',
      content: 'searchfirst@facultyconnect.in',
      description: 'Send us an email anytime',
      href: 'mailto:searchfirst@facultyconnect.in'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      content: '+91 9876543210',
      description: 'Mon-Fri 9:00 AM - 6:00 PM IST',
      href: 'tel:+919876543210'
    },
    {
      icon: MapPin,
      title: 'Office Address',
      content: 'Near Bus Stand, Erode',
      description: 'Tamil Nadu, India - 6389 001',
      href: null
    },
    {
      icon: Clock,
      title: 'Business Hours',
      content: 'Mon - Fri: 9:00 AM - 6:00 PM',
      description: 'Saturday: 10:00 AM - 4:00 PM',
      href: null
    }
  ];

  const faqItems = [
    {
      question: 'How do I create a candidate profile?',
      answer: 'Click on "Sign Up" and select "Faculty/Educator" to create your candidate profile. Complete your education, experience, and upload your resume to get started.'
    },
    {
      question: 'How can institutions post job openings?',
      answer: 'Institutions can register as employers and post job openings after profile verification. Our team reviews all institutional profiles for authenticity.'
    },
    {
      question: 'Is there a fee for job applications?',
      answer: 'No, job applications are completely free for candidates. Institutions pay a nominal fee for posting jobs and accessing candidate profiles.'
    },
    {
      question: 'How do I get notified about relevant jobs?',
      answer: 'Set up job alerts in your dashboard with your preferred criteria like location, subject, and institution type to receive email notifications.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions or need support? We're here to help. Reach out to us and we'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Message */}
        {showSuccessMessage && (
          <Alert className="mb-8 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              Thank you for contacting us! We've received your message and will get back to you within 24 hours.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        {...register('name')}
                        id="name"
                        placeholder="Enter your full name"
                        className={errors.name ? 'border-red-300' : ''}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        {...register('email')}
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className={errors.email ? 'border-red-300' : ''}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="type">Message Type</Label>
                    <select
                      {...register('type')}
                      id="type"
                      className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="feedback">Feedback & Suggestions</option>
                      <option value="partnership">Partnership Opportunities</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      {...register('subject')}
                      id="subject"
                      placeholder="Brief subject of your message"
                      className={errors.subject ? 'border-red-300' : ''}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      {...register('message')}
                      id="message"
                      placeholder="Please describe your inquiry in detail..."
                      rows={6}
                      className={errors.message ? 'border-red-300' : ''}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? (
                      <>
                        <Send className="w-4 h-4 mr-2 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <IconComponent className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.title}</h3>
                        {item.href ? (
                          <a 
                            href={item.href}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            {item.content}
                          </a>
                        ) : (
                          <p className="text-gray-900">{item.content}</p>
                        )}
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Quick Support */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HeadphonesIcon className="w-5 h-5 mr-2" />
                  Quick Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm">
                  Need immediate assistance? Our support team is available to help you with:
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Account setup and profile creation
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Job application process
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Technical issues and troubleshooting
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Institution verification
                  </li>
                </ul>
                <Button variant="outline" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {faqItems.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                    <h3 className="font-medium text-gray-900 mb-2">{item.question}</h3>
                    <p className="text-gray-600 text-sm">{item.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Support */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
          <Building className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Need Help Getting Started?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our team offers personalized onboarding sessions for institutions and can help you set up your profile, 
            post your first job, and understand our platform better.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Schedule a Demo
          </Button>
        </div>
      </div>
    </div>
  );
}
