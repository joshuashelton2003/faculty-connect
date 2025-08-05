import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Scale, UserCheck, AlertTriangle, Shield } from 'lucide-react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
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
          <div className="bg-gradient-to-r from-green-600 to-blue-600 px-8 py-12 text-white">
            <div className="flex items-center mb-4">
              <Scale className="w-8 h-8 mr-3" />
              <h1 className="text-3xl font-bold">Terms of Service</h1>
            </div>
            <p className="text-green-100 text-lg">
              Please read these terms carefully before using FacultyConnect.
            </p>
            <p className="text-green-200 text-sm mt-2">
              Last updated: January 2025
            </p>
          </div>

          {/* Content */}
          <div className="px-8 py-8 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="w-6 h-6 mr-2 text-green-600" />
                Acceptance of Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to FacultyConnect. These Terms of Service ("Terms") govern your use of our website and services. By accessing or using FacultyConnect, you agree to be bound by these Terms. If you disagree with any part of these terms, you may not access our services.
              </p>
            </section>

            {/* Service Description */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Service Description</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                FacultyConnect is an online platform that connects educational institutions with qualified faculty members and educators. Our services include:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Job posting and application management for employers</li>
                <li>Profile creation and job search tools for candidates</li>
                <li>Communication facilitation between employers and candidates</li>
                <li>Educational resources and career guidance</li>
                <li>Analytics and reporting tools</li>
              </ul>
            </section>

            {/* User Accounts */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <UserCheck className="w-6 h-6 mr-2 text-green-600" />
                User Accounts and Responsibilities
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Account Creation</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>You must provide accurate and complete information</li>
                    <li>You are responsible for maintaining account security</li>
                    <li>You must notify us immediately of any unauthorized access</li>
                    <li>One person may not maintain multiple accounts</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">User Conduct</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Provide truthful and accurate information in profiles and applications</li>
                    <li>Respect other users and communicate professionally</li>
                    <li>Do not post inappropriate, discriminatory, or harmful content</li>
                    <li>Do not use the platform for illegal activities</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* For Employers */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">For Employers</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Job postings must be legitimate and accurately describe the position</li>
                <li>You may not discriminate based on protected characteristics</li>
                <li>You are responsible for compliance with local employment laws</li>
                <li>You may not use candidate information for purposes other than recruitment</li>
                <li>Payment terms for premium services are outlined in your specific agreement</li>
              </ul>
            </section>

            {/* For Candidates */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">For Candidates</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Profile information and qualifications must be accurate and truthful</li>
                <li>You own the rights to content you upload (resumes, cover letters, etc.)</li>
                <li>You understand that your profile may be visible to potential employers</li>
                <li>You are responsible for your own application decisions and career choices</li>
                <li>You may not create fake profiles or misrepresent your qualifications</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The FacultyConnect platform, including its design, features, and content, is owned by us and protected by intellectual property laws. You may not:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Copy, modify, or distribute our platform or content</li>
                <li>Reverse engineer or attempt to extract our source code</li>
                <li>Use our trademarks or branding without permission</li>
                <li>Create derivative works based on our platform</li>
              </ul>
            </section>

            {/* Privacy and Data */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-2 text-green-600" />
                Privacy and Data Protection
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Your privacy is important to us. Our Privacy Policy, which is part of these Terms, explains how we collect, use, and protect your information. By using our services, you consent to our privacy practices as described in our Privacy Policy.
              </p>
            </section>

            {/* Disclaimers */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-2 text-yellow-600" />
                Disclaimers and Limitations
              </h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>FacultyConnect is provided "as is" without warranties of any kind</li>
                  <li>We do not guarantee job placement or hiring outcomes</li>
                  <li>We are not responsible for the actions of employers or candidates</li>
                  <li>We do not verify all information provided by users</li>
                  <li>Our liability is limited to the amount you paid for our services</li>
                </ul>
              </div>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Termination</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We reserve the right to suspend or terminate your account if you violate these Terms or engage in harmful behavior. You may also delete your account at any time.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Upon termination, your access to the platform will cease, though some information may be retained as required by law or for legitimate business purposes.
              </p>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update these Terms from time to time. We will notify users of significant changes through email or platform notifications. Continued use of our services after changes constitutes acceptance of the updated Terms.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms are governed by the laws of India. Any disputes arising from these Terms or your use of FacultyConnect will be resolved through arbitration in Tamil Nadu, India.
              </p>
            </section>

            {/* Contact Information */}
            <section className="bg-green-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> <a href="mailto:support@facultyconnect.in" className="text-green-600 hover:text-green-700">support@facultyconnect.in</a></p>
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

export default TermsOfService;
