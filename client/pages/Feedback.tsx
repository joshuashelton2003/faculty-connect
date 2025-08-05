import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  MessageCircle,
  Star,
  ThumbsUp,
  ThumbsDown,
  Send,
  CheckCircle,
  User,
  Mail,
  Phone,
  MessageSquare,
  Heart,
  AlertCircle,
  Lightbulb,
  Bug,
  Zap
} from 'lucide-react';

interface FeedbackFormData {
  name: string;
  email: string;
  category: string;
  rating: number;
  subject: string;
  message: string;
}

const Feedback: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch
  } = useForm<FeedbackFormData>();

  const watchCategory = watch('category');

  const feedbackCategories = [
    { value: 'general', label: 'General Feedback', icon: MessageCircle, color: 'bg-blue-100 text-blue-800' },
    { value: 'bug', label: 'Bug Report', icon: Bug, color: 'bg-red-100 text-red-800' },
    { value: 'feature', label: 'Feature Request', icon: Lightbulb, color: 'bg-yellow-100 text-yellow-800' },
    { value: 'improvement', label: 'Improvement Suggestion', icon: Zap, color: 'bg-green-100 text-green-800' },
    { value: 'compliment', label: 'Compliment', icon: Heart, color: 'bg-pink-100 text-pink-800' },
    { value: 'complaint', label: 'Complaint', icon: AlertCircle, color: 'bg-orange-100 text-orange-800' }
  ];

  const onSubmit = async (data: FeedbackFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const feedbackData = {
        ...data,
        rating: selectedRating,
        timestamp: new Date().toISOString()
      };
      
      console.log('Feedback submitted:', feedbackData);
      setIsSubmitted(true);
      reset();
      setSelectedRating(0);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    }
  };

  const renderStarRating = () => (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => {
            setSelectedRating(star);
            setValue('rating', star);
          }}
          className={`p-1 rounded transition-colors ${
            star <= selectedRating 
              ? 'text-yellow-400 hover:text-yellow-500' 
              : 'text-gray-300 hover:text-gray-400'
          }`}
        >
          <Star 
            className={`w-6 h-6 ${star <= selectedRating ? 'fill-current' : ''}`}
          />
        </button>
      ))}
      <span className="ml-2 text-sm text-gray-600">
        {selectedRating > 0 && (
          <>
            {selectedRating}/5 - {
              selectedRating === 1 ? 'Poor' :
              selectedRating === 2 ? 'Fair' :
              selectedRating === 3 ? 'Good' :
              selectedRating === 4 ? 'Very Good' : 'Excellent'
            }
          </>
        )}
      </span>
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Thank You!
            </h2>
            <p className="text-gray-600 mb-6">
              Your feedback has been submitted successfully. We appreciate your input and will review it carefully.
            </p>
            <Button 
              onClick={() => setIsSubmitted(false)}
              className="w-full"
            >
              Submit Another Feedback
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <MessageCircle className="w-16 h-16 mx-auto mb-4 text-blue-200" />
            <h1 className="text-4xl font-bold mb-4">
              We Value Your Feedback
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Help us improve FacultyConnect by sharing your thoughts, suggestions, and experiences
            </p>
          </div>
        </div>
      </div>

      {/* Feedback Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Share Your Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <div className="relative mt-1">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          {...register('name', { required: 'Name is required' })}
                          placeholder="Your full name"
                          className="pl-10"
                        />
                      </div>
                      {errors.name && (
                        <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          {...register('email', { 
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address'
                            }
                          })}
                          type="email"
                          placeholder="your.email@example.com"
                          className="pl-10"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Feedback Category */}
                  <div>
                    <Label htmlFor="category">Feedback Category *</Label>
                    <Select onValueChange={(value) => setValue('category', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {feedbackCategories.map((category) => {
                          const IconComponent = category.icon;
                          return (
                            <SelectItem key={category.value} value={category.value}>
                              <div className="flex items-center">
                                <IconComponent className="w-4 h-4 mr-2" />
                                {category.label}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-red-600 text-sm mt-1">Please select a category</p>
                    )}
                  </div>

                  {/* Rating */}
                  <div>
                    <Label>Overall Rating</Label>
                    <div className="mt-2">
                      {renderStarRating()}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      {...register('subject', { required: 'Subject is required' })}
                      placeholder="Brief summary of your feedback"
                      className="mt-1"
                    />
                    {errors.subject && (
                      <p className="text-red-600 text-sm mt-1">{errors.subject.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      {...register('message', { required: 'Message is required' })}
                      placeholder="Please provide detailed feedback..."
                      rows={6}
                      className="mt-1"
                    />
                    {errors.message && (
                      <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Submit Feedback
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Feedback */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  How would you rate your overall experience?
                </p>
                <div className="flex justify-center space-x-4">
                  <button className="flex flex-col items-center p-3 rounded-lg hover:bg-green-50 transition-colors">
                    <ThumbsUp className="w-8 h-8 text-green-600 mb-1" />
                    <span className="text-xs text-green-600 font-medium">Good</span>
                  </button>
                  <button className="flex flex-col items-center p-3 rounded-lg hover:bg-red-50 transition-colors">
                    <ThumbsDown className="w-8 h-8 text-red-600 mb-1" />
                    <span className="text-xs text-red-600 font-medium">Poor</span>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Feedback Categories */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Feedback Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {feedbackCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <div key={category.value} className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-gray-100">
                        <IconComponent className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{category.label}</div>
                        <div className="text-xs text-gray-500">
                          {category.value === 'general' && 'General thoughts and opinions'}
                          {category.value === 'bug' && 'Report technical issues'}
                          {category.value === 'feature' && 'Suggest new features'}
                          {category.value === 'improvement' && 'Ways to make it better'}
                          {category.value === 'compliment' && 'Share what you love'}
                          {category.value === 'complaint' && 'Issues or concerns'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Other Ways to Reach Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="font-medium text-sm">Email</div>
                    <div className="text-sm text-gray-600">support@facultyconnect.in</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="font-medium text-sm">Phone</div>
                    <div className="text-sm text-gray-600">+91 80000 12345</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="font-medium text-sm">Live Chat</div>
                    <div className="text-sm text-gray-600">Available 24/7</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
