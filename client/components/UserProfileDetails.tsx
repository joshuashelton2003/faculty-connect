import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  GraduationCap,
  Briefcase,
  Award,
  BookOpen,
  Edit,
  Building,
  Globe,
  Users,
} from "lucide-react";

interface FacultyProfileData {
  type: "faculty";
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
  department: string;
  qualification: string;
  skills: string[];
  bio: string;
  joinedDate: string;
  lastLogin: string;
  experience: string;
  currentInstitution?: string;
}

interface InstitutionProfileData {
  type: "institution";
  institutionName: string;
  contactPersonName: string;
  email: string;
  phone: string;
  logo?: string;
  address: string;
  website: string;
  establishedYear: number;
  institutionType: string;
  description: string;
  joinedDate: string;
  lastLogin: string;
  totalJobs: number;
  activeJobs: number;
}

interface UserProfileDetailsProps {
  profileData: FacultyProfileData | InstitutionProfileData;
}

const UserProfileDetails: React.FC<UserProfileDetailsProps> = ({
  profileData,
}) => {
  const navigate = useNavigate();

  if (profileData.type === "faculty") {
    const faculty = profileData as FacultyProfileData;

    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Profile Details</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/settings")}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Profile Image and Basic Info */}
            <div className="space-y-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src={faculty.profileImage} />
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl">
                    {faculty.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || "FC"}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {faculty.name}
                </h2>
                <Badge className="mb-4">Faculty Member</Badge>
                <p className="text-gray-600 text-center max-w-md">
                  {faculty.bio || "No bio available"}
                </p>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Skills & Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {faculty.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Detailed Information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Personal Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-3 text-gray-400" />
                    <span className="text-gray-600">{faculty.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-3 text-gray-400" />
                    <span className="text-gray-600">{faculty.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <GraduationCap className="w-4 h-4 mr-3 text-gray-400" />
                    <span className="text-gray-600">{faculty.department}</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-3 text-gray-400" />
                    <span className="text-gray-600">
                      {faculty.qualification}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-3 text-gray-400" />
                    <span className="text-gray-600">{faculty.experience}</span>
                  </div>
                  {faculty.currentInstitution && (
                    <div className="flex items-center">
                      <Building className="w-4 h-4 mr-3 text-gray-400" />
                      <span className="text-gray-600">
                        {faculty.currentInstitution}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Account Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-3 text-gray-400" />
                    <span className="text-gray-600">
                      Joined {faculty.joinedDate}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-3 text-gray-400" />
                    <span className="text-gray-600">
                      Last login {faculty.lastLogin}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Institution Profile
  const institution = profileData as InstitutionProfileData;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Institution Profile</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/settings")}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Logo and Basic Info */}
          <div className="space-y-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={institution.logo} />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl">
                  {institution.institutionName
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2) || "IN"}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {institution.institutionName}
              </h2>
              <Badge className="mb-4">{institution.institutionType}</Badge>
              <p className="text-gray-600 text-center max-w-md">
                {institution.description}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {institution.totalJobs}
                </div>
                <div className="text-sm text-gray-600">Total Jobs</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {institution.activeJobs}
                </div>
                <div className="text-sm text-gray-600">Active Jobs</div>
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Building className="w-5 h-5 mr-2" />
                Institution Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="text-gray-600">
                    {institution.contactPersonName}
                  </span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="text-gray-600">{institution.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="text-gray-600">{institution.phone}</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 mr-3 text-gray-400 mt-0.5" />
                  <span className="text-gray-600">{institution.address}</span>
                </div>
                {institution.website && (
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 mr-3 text-gray-400" />
                    <a
                      href={institution.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {institution.website}
                    </a>
                  </div>
                )}
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="text-gray-600">
                    Established {institution.establishedYear}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Account Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="text-gray-600">
                    Joined {institution.joinedDate}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="text-gray-600">
                    Last login {institution.lastLogin}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileDetails;
