import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FileText,
  Download,
  Eye,
  Save,
  Plus,
  Trash2,
  Edit,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Briefcase,
  Award,
  BookOpen,
  Globe,
  Linkedin,
  Github,
  Star,
  CheckCircle,
  AlertCircle,
  Settings,
  Palette,
  Layout,
  Type
} from 'lucide-react';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  website?: string;
  linkedin?: string;
  orcid?: string;
  summary: string;
}

interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements?: string;
}

interface Experience {
  id: string;
  position: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

interface Publication {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: string;
  doi?: string;
  type: 'journal' | 'conference' | 'book' | 'patent';
}

interface Award {
  id: string;
  title: string;
  organization: string;
  year: string;
  description?: string;
}

interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
}

const ResumeBuilder: React.FC = () => {
  const [activeSection, setActiveSection] = useState('personal');
  const [template, setTemplate] = useState('academic');
  const [previewMode, setPreviewMode] = useState(false);

  // Form data states
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    summary: ''
  });

  const [education, setEducation] = useState<Education[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [awards, setAwards] = useState<Award[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm();

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: User, color: 'blue' },
    { id: 'education', label: 'Education', icon: GraduationCap, color: 'green' },
    { id: 'experience', label: 'Experience', icon: Briefcase, color: 'purple' },
    { id: 'publications', label: 'Publications', icon: BookOpen, color: 'indigo' },
    { id: 'awards', label: 'Awards', icon: Award, color: 'yellow' },
    { id: 'skills', label: 'Skills', icon: Star, color: 'pink' },
    { id: 'customize', label: 'Customize', icon: Palette, color: 'gray' }
  ];

  const templates = [
    { id: 'academic', name: 'Academic Classic', description: 'Traditional academic format' },
    { id: 'modern', name: 'Modern Professional', description: 'Clean and contemporary' },
    { id: 'creative', name: 'Creative Academic', description: 'Unique and eye-catching' },
    { id: 'minimal', name: 'Minimal Clean', description: 'Simple and elegant' }
  ];

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: '',
      field: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
    };
    setEducation([...education, newEducation]);
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      position: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: []
    };
    setExperience([...experience, newExperience]);
  };

  const removeExperience = (id: string) => {
    setExperience(experience.filter(exp => exp.id !== id));
  };

  const addPublication = () => {
    const newPublication: Publication = {
      id: Date.now().toString(),
      title: '',
      authors: '',
      journal: '',
      year: '',
      type: 'journal'
    };
    setPublications([...publications, newPublication]);
  };

  const removePublication = (id: string) => {
    setPublications(publications.filter(pub => pub.id !== id));
  };

  const addAward = () => {
    const newAward: Award = {
      id: Date.now().toString(),
      title: '',
      organization: '',
      year: ''
    };
    setAwards([...awards, newAward]);
  };

  const removeAward = (id: string) => {
    setAwards(awards.filter(award => award.id !== id));
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 'intermediate',
      category: 'Technical'
    };
    setSkills([...skills, newSkill]);
  };

  const removeSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const downloadResume = () => {
    // In a real implementation, this would generate and download a PDF
    alert('Resume download functionality would be implemented here');
  };

  const saveProgress = () => {
    const resumeData = {
      personalInfo,
      education,
      experience,
      publications,
      awards,
      skills,
      template
    };
    localStorage.setItem('resume_builder_data', JSON.stringify(resumeData));
    alert('Progress saved successfully!');
  };

  const calculateCompletion = (): number => {
    let completed = 0;
    const total = 6;

    if (personalInfo.firstName && personalInfo.lastName && personalInfo.email) completed++;
    if (education.length > 0) completed++;
    if (experience.length > 0) completed++;
    if (publications.length > 0) completed++;
    if (awards.length > 0) completed++;
    if (skills.length > 0) completed++;

    return (completed / total) * 100;
  };

  const renderPersonalInfoSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            {...register('firstName', { required: true })}
            value={personalInfo.firstName}
            onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
            placeholder="Enter your first name"
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            {...register('lastName', { required: true })}
            value={personalInfo.lastName}
            onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
            placeholder="Enter your last name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email *</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
              value={personalInfo.email}
              onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
              placeholder="your.email@example.com"
              className="pl-10"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              value={personalInfo.phone}
              onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
              placeholder="+91 9876543210"
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          value={personalInfo.address}
          onChange={(e) => setPersonalInfo({...personalInfo, address: e.target.value})}
          placeholder="Street address"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            value={personalInfo.city}
            onChange={(e) => setPersonalInfo({...personalInfo, city: e.target.value})}
            placeholder="Chennai"
          />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input
            value={personalInfo.state}
            onChange={(e) => setPersonalInfo({...personalInfo, state: e.target.value})}
            placeholder="Tamil Nadu"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="website">Website</Label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              value={personalInfo.website}
              onChange={(e) => setPersonalInfo({...personalInfo, website: e.target.value})}
              placeholder="https://yourwebsite.com"
              className="pl-10"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="linkedin">LinkedIn</Label>
          <div className="relative">
            <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              value={personalInfo.linkedin}
              onChange={(e) => setPersonalInfo({...personalInfo, linkedin: e.target.value})}
              placeholder="linkedin.com/in/yourprofile"
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          value={personalInfo.summary}
          onChange={(e) => setPersonalInfo({...personalInfo, summary: e.target.value})}
          placeholder="Write a brief professional summary highlighting your expertise and career objectives..."
          rows={4}
        />
      </div>
    </div>
  );

  const renderEducationSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Education</h3>
        <Button onClick={addEducation} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </div>

      {education.map((edu, index) => (
        <Card key={edu.id} className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium text-gray-900">Education #{index + 1}</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeEducation(edu.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Degree *</Label>
                <Input
                  value={edu.degree}
                  onChange={(e) => {
                    const updated = education.map(item => 
                      item.id === edu.id ? {...item, degree: e.target.value} : item
                    );
                    setEducation(updated);
                  }}
                  placeholder="Ph.D., M.Sc., B.E., etc."
                />
              </div>
              <div>
                <Label>Field of Study *</Label>
                <Input
                  value={edu.field}
                  onChange={(e) => {
                    const updated = education.map(item => 
                      item.id === edu.id ? {...item, field: e.target.value} : item
                    );
                    setEducation(updated);
                  }}
                  placeholder="Computer Science, Mathematics, etc."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <Label>Institution *</Label>
                <Input
                  value={edu.institution}
                  onChange={(e) => {
                    const updated = education.map(item => 
                      item.id === edu.id ? {...item, institution: e.target.value} : item
                    );
                    setEducation(updated);
                  }}
                  placeholder="University/College name"
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  value={edu.location}
                  onChange={(e) => {
                    const updated = education.map(item => 
                      item.id === edu.id ? {...item, location: e.target.value} : item
                    );
                    setEducation(updated);
                  }}
                  placeholder="City, State"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <Label>Start Date</Label>
                <Input
                  type="date"
                  value={edu.startDate}
                  onChange={(e) => {
                    const updated = education.map(item => 
                      item.id === edu.id ? {...item, startDate: e.target.value} : item
                    );
                    setEducation(updated);
                  }}
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input
                  type="date"
                  value={edu.endDate}
                  onChange={(e) => {
                    const updated = education.map(item => 
                      item.id === edu.id ? {...item, endDate: e.target.value} : item
                    );
                    setEducation(updated);
                  }}
                />
              </div>
              <div>
                <Label>GPA/Grade</Label>
                <Input
                  value={edu.gpa}
                  onChange={(e) => {
                    const updated = education.map(item => 
                      item.id === edu.id ? {...item, gpa: e.target.value} : item
                    );
                    setEducation(updated);
                  }}
                  placeholder="3.8/4.0 or First Class"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {education.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No education entries yet</p>
          <Button onClick={addEducation} variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Education
          </Button>
        </div>
      )}
    </div>
  );

  const renderExperienceSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Professional Experience</h3>
        <Button onClick={addExperience} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {experience.map((exp, index) => (
        <Card key={exp.id} className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium text-gray-900">Experience #{index + 1}</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeExperience(exp.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Position/Title *</Label>
                <Input
                  value={exp.position}
                  onChange={(e) => {
                    const updated = experience.map(item => 
                      item.id === exp.id ? {...item, position: e.target.value} : item
                    );
                    setExperience(updated);
                  }}
                  placeholder="Assistant Professor, Lecturer, etc."
                />
              </div>
              <div>
                <Label>Institution *</Label>
                <Input
                  value={exp.institution}
                  onChange={(e) => {
                    const updated = experience.map(item => 
                      item.id === exp.id ? {...item, institution: e.target.value} : item
                    );
                    setExperience(updated);
                  }}
                  placeholder="Organization/Institution name"
                />
              </div>
            </div>

            <div className="mt-4">
              <Label>Description</Label>
              <Textarea
                value={exp.description}
                onChange={(e) => {
                  const updated = experience.map(item => 
                    item.id === exp.id ? {...item, description: e.target.value} : item
                  );
                  setExperience(updated);
                }}
                placeholder="Describe your role, responsibilities, and key achievements..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      {experience.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No experience entries yet</p>
          <Button onClick={addExperience} variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Experience
          </Button>
        </div>
      )}
    </div>
  );

  const renderPublicationsSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Publications</h3>
        <Button onClick={addPublication} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Publication
        </Button>
      </div>

      {publications.map((pub, index) => (
        <Card key={pub.id} className="border-l-4 border-l-indigo-500">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-medium text-gray-900">Publication #{index + 1}</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removePublication(pub.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Title *</Label>
                <Input
                  value={pub.title}
                  onChange={(e) => {
                    const updated = publications.map(item => 
                      item.id === pub.id ? {...item, title: e.target.value} : item
                    );
                    setPublications(updated);
                  }}
                  placeholder="Publication title"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Authors</Label>
                  <Input
                    value={pub.authors}
                    onChange={(e) => {
                      const updated = publications.map(item => 
                        item.id === pub.id ? {...item, authors: e.target.value} : item
                      );
                      setPublications(updated);
                    }}
                    placeholder="Author names (comma separated)"
                  />
                </div>
                <div>
                  <Label>Type</Label>
                  <Select 
                    value={pub.type} 
                    onValueChange={(value: any) => {
                      const updated = publications.map(item => 
                        item.id === pub.id ? {...item, type: value} : item
                      );
                      setPublications(updated);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="journal">Journal Article</SelectItem>
                      <SelectItem value="conference">Conference Paper</SelectItem>
                      <SelectItem value="book">Book/Chapter</SelectItem>
                      <SelectItem value="patent">Patent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Journal/Conference</Label>
                  <Input
                    value={pub.journal}
                    onChange={(e) => {
                      const updated = publications.map(item => 
                        item.id === pub.id ? {...item, journal: e.target.value} : item
                      );
                      setPublications(updated);
                    }}
                    placeholder="Publication venue"
                  />
                </div>
                <div>
                  <Label>Year</Label>
                  <Input
                    value={pub.year}
                    onChange={(e) => {
                      const updated = publications.map(item => 
                        item.id === pub.id ? {...item, year: e.target.value} : item
                      );
                      setPublications(updated);
                    }}
                    placeholder="2024"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {publications.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No publications yet</p>
          <Button onClick={addPublication} variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Publication
          </Button>
        </div>
      )}
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'personal':
        return renderPersonalInfoSection();
      case 'education':
        return renderEducationSection();
      case 'experience':
        return renderExperienceSection();
      case 'publications':
        return renderPublicationsSection();
      case 'customize':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Customize Your Resume</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {templates.map((tmpl) => (
                <Card 
                  key={tmpl.id} 
                  className={`cursor-pointer transition-all ${
                    template === tmpl.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'
                  }`}
                  onClick={() => setTemplate(tmpl.id)}
                >
                  <CardContent className="p-6">
                    <h4 className="font-medium mb-2">{tmpl.name}</h4>
                    <p className="text-sm text-gray-600">{tmpl.description}</p>
                    {template === tmpl.id && (
                      <Badge className="mt-2 bg-blue-600">Selected</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      default:
        return renderPersonalInfoSection();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <FileText className="w-8 h-8 mr-3 text-blue-600" />
                Resume Builder
              </h1>
              <p className="text-gray-600 mt-1">Create a professional academic resume in minutes</p>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={saveProgress}>
                <Save className="w-4 h-4 mr-2" />
                Save Progress
              </Button>
              <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
                <Eye className="w-4 h-4 mr-2" />
                {previewMode ? 'Edit' : 'Preview'}
              </Button>
              <Button onClick={downloadResume} className="bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Resume Completion</span>
              <span>{Math.round(calculateCompletion())}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${calculateCompletion()}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Resume Sections</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {sections.map((section) => {
                  const IconComponent = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center p-3 rounded-lg text-left transition-colors ${
                        activeSection === section.id
                          ? 'bg-blue-100 text-blue-800'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <IconComponent className="w-5 h-5 mr-3" />
                      <span className="font-medium">{section.label}</span>
                      {section.id === 'personal' && personalInfo.firstName && (
                        <CheckCircle className="w-4 h-4 ml-auto text-green-600" />
                      )}
                      {section.id === 'education' && education.length > 0 && (
                        <CheckCircle className="w-4 h-4 ml-auto text-green-600" />
                      )}
                      {section.id === 'experience' && experience.length > 0 && (
                        <CheckCircle className="w-4 h-4 ml-auto text-green-600" />
                      )}
                    </button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                  Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Keep your resume to 2-3 pages for academic positions</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>List publications in reverse chronological order</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Include teaching and research experience prominently</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>
                    {sections.find(s => s.id === activeSection)?.label || 'Section'}
                  </span>
                  <Badge variant="outline">
                    Step {sections.findIndex(s => s.id === activeSection) + 1} of {sections.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {renderSection()}
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  const currentIndex = sections.findIndex(s => s.id === activeSection);
                  if (currentIndex > 0) {
                    setActiveSection(sections[currentIndex - 1].id);
                  }
                }}
                disabled={sections.findIndex(s => s.id === activeSection) === 0}
              >
                Previous Section
              </Button>

              <Button
                onClick={() => {
                  const currentIndex = sections.findIndex(s => s.id === activeSection);
                  if (currentIndex < sections.length - 1) {
                    setActiveSection(sections[currentIndex + 1].id);
                  }
                }}
                disabled={sections.findIndex(s => s.id === activeSection) === sections.length - 1}
              >
                Next Section
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
