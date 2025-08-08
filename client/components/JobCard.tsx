import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Users,
  Eye,
  Edit,
  Trash2,
  Building,
  CheckCircle,
  Target,
  Star,
} from "lucide-react";

export interface JobData {
  id: string;
  title: string;
  institution: string;
  location: string;
  jobType: "Full-Time" | "Part-Time" | "Contract";
  responsibilities: string[];
  requirements: string[];
  preferredSkills: string[];
  salary?: string;
  postedDate: string;
  applicants: number;
  deadline: string;
  isActive: boolean;
}

interface JobCardProps {
  job: JobData;
  onViewDetails: (job: JobData) => void;
  onApply: (job: JobData) => void;
  onEdit?: (job: JobData) => void;
  onDelete?: (jobId: string) => void;
  showAdminActions?: boolean;
  index?: number;
}

const JobCard: React.FC<JobCardProps> = ({
  job,
  onViewDetails,
  onApply,
  onEdit,
  onDelete,
  showAdminActions = false,
  index = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer bg-white border border-gray-200 h-full flex flex-col">
        <CardContent className="p-6 flex flex-col h-full">
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-900 leading-tight">
                🏷️ {job.title}
              </h3>
              {showAdminActions && (
                <div className="flex gap-2 ml-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit?.(job);
                    }}
                    className="h-8 w-8 p-0 hover:bg-blue-50"
                  >
                    <Edit className="w-4 h-4 text-blue-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (
                        window.confirm(
                          "Are you sure you want to delete this job?",
                        )
                      ) {
                        onDelete?.(job.id);
                      }
                    }}
                    className="h-8 w-8 p-0 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              )}
            </div>

            {/* Subtitle */}
            <div className="space-y-1 text-gray-600">
              <div className="flex items-center">
                <Building className="w-4 h-4 mr-2" />
                <span className="font-medium">{job.institution}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <Badge variant="outline" className="text-xs">
                  {job.jobType}
                </Badge>
              </div>
            </div>
          </div>

          {/* Job Description with Structured Subtopics */}
          <div className="flex-1 space-y-4 mb-6">
            {/* Responsibilities */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                🔹 <span className="ml-1">Responsibilities:</span>
              </h4>
              <ul className="text-sm text-gray-700 space-y-1">
                {job.responsibilities.slice(0, 3).map((responsibility, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span>{responsibility}</span>
                  </li>
                ))}
                {job.responsibilities.length > 3 && (
                  <li className="text-gray-500 text-xs">
                    +{job.responsibilities.length - 3} more responsibilities...
                  </li>
                )}
              </ul>
            </div>

            {/* Requirements */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                🔹 <span className="ml-1">Requirements:</span>
              </h4>
              <ul className="text-sm text-gray-700 space-y-1">
                {job.requirements.slice(0, 2).map((requirement, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="w-3 h-3 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{requirement}</span>
                  </li>
                ))}
                {job.requirements.length > 2 && (
                  <li className="text-gray-500 text-xs">
                    +{job.requirements.length - 2} more requirements...
                  </li>
                )}
              </ul>
            </div>

            {/* Preferred Skills */}
            {job.preferredSkills.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                  🔹 <span className="ml-1">Preferred Skills:</span>
                </h4>
                <div className="flex flex-wrap gap-1">
                  {job.preferredSkills.slice(0, 3).map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      <Star className="w-3 h-3 mr-1" />
                      {skill}
                    </Badge>
                  ))}
                  {job.preferredSkills.length > 3 && (
                    <Badge variant="outline" className="text-xs text-gray-500">
                      +{job.preferredSkills.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Job Stats */}
          <div className="border-t pt-4 mb-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                <span>{job.applicants} applicants</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                <span>{job.deadline}</span>
              </div>
              {job.salary && (
                <div className="col-span-2 flex items-center text-green-600 font-medium">
                  <Target className="w-4 h-4 mr-2" />
                  <span>{job.salary}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(job);
              }}
              className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onApply(job);
              }}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Apply Now
            </Button>
          </div>

          {/* Status Indicator */}
          <div className="mt-2 flex justify-between items-center">
            <Badge
              variant={job.isActive ? "default" : "secondary"}
              className={
                job.isActive
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-600"
              }
            >
              {job.isActive ? "Active" : "Inactive"}
            </Badge>
            <span className="text-xs text-gray-500">
              Posted {job.postedDate}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default JobCard;
