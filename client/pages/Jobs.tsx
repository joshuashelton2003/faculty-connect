import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import JobManager from "@/components/JobManager";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Jobs: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Check if this is admin mode (you can implement proper auth later)
  const isAdmin = searchParams.get("admin") === "true";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {isAdmin
                    ? "Job Management Dashboard"
                    : "Faculty Job Listings"}
                </h1>
                <p className="text-gray-600">
                  {isAdmin
                    ? "Create, edit, and manage job postings with full CRUD operations"
                    : "Discover teaching opportunities across Tamil Nadu"}
                </p>
              </div>
            </div>
            {!isAdmin && (
              <Button
                onClick={() => navigate("/jobs?admin=true")}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Admin Mode
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-8">
        <JobManager />
      </div>

      {/* Demo Notice */}
      <div className="fixed bottom-4 right-4 max-w-sm">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-lg">
          <h4 className="font-semibold text-blue-900 mb-2">
            🔷 CRUD Demo Active
          </h4>
          <p className="text-sm text-blue-800">
            ✅ Create, Read, Update, Delete operations working
            <br />
            ✅ Real-time data updates
            <br />
            ✅ LocalStorage persistence
            <br />✅ Filtering & search functionality
          </p>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
