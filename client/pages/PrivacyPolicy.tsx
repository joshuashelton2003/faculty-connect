import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, Database, Mail } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#DDDAD0]">
      {/* Back Button */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12 text-white">
            <div className="flex items-center mb-4">
              <Shield className="w-8 h-8 mr-3" />
              <h1 className="text-3xl font-bold">Privacy Policy</h1>
            </div>
            <p className="text-blue-100 text-lg">
              Your privacy is our priority. Learn how we protect and use your information.
            </p>
            <p className="text-blue-200 text-sm mt-2">
              Last updated: January 2025
            </p>
          </div>

          {/* Content */}
          <div className="px-8 py-8 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Eye className="w-6 h-6 mr-2 text-blue-600" />
                Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed">
                FacultyConnect ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our faculty recruitment platform. By using FacultyConnect, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Database className="w-6 h-6 mr-2 text-blue-600" />
                Information We Collect
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Personal Information</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Name, email address, phone number</li>
                    <li>Educational qualifications and experience</li>
                    <li>Resume and cover letters</li>
                    <li>Professional references</li>
                    <li>Profile photos and documents</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Usage Information</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Job searches and applications</li>
                    <li>Platform usage patterns</li>
                    <li>Device and browser information</li>
                    <li>IP address and location data</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>To provide and maintain our recruitment services</li>
                <li>To match candidates with suitable job opportunities</li>
                <li>To communicate about applications and opportunities</li>
                <li>To improve our platform and user experience</li>
                <li>To send relevant job alerts and updates</li>
                <li>To ensure platform security and prevent fraud</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information Sharing</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>With Employers:</strong> When you apply for jobs, your profile and application materials are shared with relevant employers</li>
                <li><strong>With Service Providers:</strong> We may use third-party services for hosting, analytics, and communication</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and users</li>
                <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets</li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Lock className="w-6 h-6 mr-2 text-blue-600" />
                Data Security
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                <li><strong>Portability:</strong> Obtain a copy of your data in a structured format</li>
                <li><strong>Restriction:</strong> Limit how we process your information</li>
                <li><strong>Objection:</strong> Object to certain types of processing</li>
              </ul>
            </section>

            {/* Cookies and Tracking */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies and Tracking</h2>
              <p className="text-gray-700 leading-relaxed">
                We use cookies and similar tracking technologies to enhance your experience, analyze usage, and provide personalized content. You can control cookie preferences through your browser settings, though some features may not work properly if cookies are disabled.
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. Continued use of our services after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            {/* Contact Information */}
            <section className="bg-blue-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Mail className="w-6 h-6 mr-2 text-blue-600" />
                Contact Us
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> <a href="mailto:support@facultyconnect.in" className="text-blue-600 hover:text-blue-700">support@facultyconnect.in</a></p>
                <p><strong>Address:</strong> FacultyConnect, Erode, Tamil Nadu, India</p>
                <p><strong>Phone:</strong> +91 9876543210</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
