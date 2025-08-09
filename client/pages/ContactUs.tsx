import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send, MessageCircle, HeadphonesIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  userType: 'candidate' | 'employer' | 'general';
}

const ContactUs: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Contact form submitted:', data);
    setIsSubmitted(true);
    setIsLoading(false);
    reset();
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email',
      value: 'support@facultyconnect.in',
      action: 'mailto:support@facultyconnect.in',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Call us directly',
      value: '+91 9876543210',
      action: 'tel:+919876543210',
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our team',
      value: 'Available 9 AM - 6 PM',
      action: '#',
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    }
  ];

  const officeHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
    { day: 'Sunday', hours: 'Closed' }
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions or need support? We're here to help you navigate your faculty career journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-lg border border-gray-200">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl flex items-center">
                  <Send className="w-6 h-6 mr-2" />
                  Send us a Message
                </CardTitle>
                <p className="text-blue-100">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent className="p-8">
                {isSubmitted && (
                  <Alert className="mb-6 border-green-200 bg-green-50">
                    <MessageCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-700">
                      Thank you for your message! We'll get back to you within 24 hours.
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* User Type */}
                  <div>
                    <Label htmlFor="userType" className="text-sm font-medium text-gray-700">
                      I am a
                    </Label>
                    <select
                      {...register('userType', { required: 'Please select your user type' })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    >
                      <option value="">Select your role</option>
                      <option value="candidate">Faculty/Candidate</option>
                      <option value="employer">Institution/Employer</option>
                      <option value="general">General Inquiry</option>
                    </select>
                    {errors.userType && (
                      <p className="mt-1 text-sm text-red-600">{errors.userType.message}</p>
                    )}
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Full Name
                      </Label>
                      <Input
                        {...register('name', { required: 'Name is required' })}
                        placeholder="Enter your full name"
                        className={errors.name ? 'border-red-300' : ''}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email Address
                      </Label>
                      <Input
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        type="email"
                        placeholder="Enter your email"
                        className={errors.email ? 'border-red-300' : ''}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone and Subject */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                        Phone Number
                      </Label>
                      <Input
                        {...register('phone', { required: 'Phone number is required' })}
                        type="tel"
                        placeholder="Enter your phone number"
                        className={errors.phone ? 'border-red-300' : ''}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                        Subject
                      </Label>
                      <Input
                        {...register('subject', { required: 'Subject is required' })}
                        placeholder="Brief subject of your inquiry"
                        className={errors.subject ? 'border-red-300' : ''}
                      />
                      {errors.subject && (
                        <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                      Message
                    </Label>
                    <Textarea
                      {...register('message', { required: 'Message is required' })}
                      rows={5}
                      placeholder="Describe your inquiry in detail..."
                      className={errors.message ? 'border-red-300' : ''}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
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
          <div className="space-y-6">
            {/* Contact Methods */}
            <Card className="bg-white shadow-lg border border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 flex items-center">
                  <HeadphonesIcon className="w-5 h-5 mr-2" />
                  Get in Touch
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactMethods.map((method, index) => {
                  const IconComponent = method.icon;
                  return (
                    <a
                      key={index}
                      href={method.action}
                      className={`block p-4 rounded-lg ${method.bg} hover:shadow-md transition-shadow`}
                    >
                      <div className="flex items-start space-x-3">
                        <IconComponent className={`w-6 h-6 ${method.color} mt-1`} />
                        <div>
                          <h3 className="font-medium text-gray-900">{method.title}</h3>
                          <p className="text-sm text-gray-600 mb-1">{method.description}</p>
                          <p className={`text-sm font-medium ${method.color}`}>
                            {method.value}
                          </p>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </CardContent>
            </Card>

            {/* Office Hours */}
            <Card className="bg-white shadow-lg border border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Office Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-gray-700 font-medium">{schedule.day}</span>
                      <span className="text-gray-600">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Office Location */}
            <Card className="bg-white shadow-lg border border-gray-200">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Our Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-900">FacultyConnect Headquarters</p>
                    <p className="text-gray-600">
                      Erode, Tamil Nadu, India
                    </p>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>We serve educational institutions across Tamil Nadu and South India.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Link */}
            <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Frequently Asked Questions</h3>
                <p className="text-purple-100 text-sm mb-4">
                  Find quick answers to common questions about using FacultyConnect.
                </p>
                <Button 
                  variant="secondary" 
                  size="sm"
                  className="bg-white text-purple-600 hover:bg-gray-100"
                >
                  View FAQ
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
