import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'For Job Seekers',
      links: [
        { name: 'Browse Jobs', href: '/jobs' },
        { name: 'Search by Location', href: '/jobs?location=tamil-nadu' },
        { name: 'Search by Subject', href: '/jobs?subject=mathematics' },
        { name: 'Career Tips', href: '/resources/career-tips' },
        { name: 'Resume Builder', href: '/tools/resume-builder' },
      ],
    },
    {
      title: 'For Employers',
      links: [
        { name: 'Post a Job', href: '/employer/post-job' },
        { name: 'Employer Dashboard', href: '/employer/dashboard' },
        { name: 'Search Candidates', href: '/employer/candidates' },
        { name: 'Pricing Plans', href: '/employer/pricing' },
        { name: 'Success Stories', href: '/resources/success-stories' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'How it Works', href: '/how-it-works' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Blog', href: '/blog' },
        { name: 'Help Center', href: '/help' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'Privacy Policy', href: '/privacy-policy' },
        { name: 'Terms of Service', href: '/terms-of-service' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'Feedback', href: '/feedback' },
        { name: 'Partner with Us', href: '/partnerships' },
      ],
    },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/facultyconnect' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/facultyconnect' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/facultyconnect' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/facultyconnect' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">FC</span>
                </div>
                <span className="text-xl font-bold">
                  Faculty<span className="text-blue-400">Connect</span>
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-6 max-w-xs">
                Connecting passionate educators with leading institutions across Tamil Nadu, South India, and beyond.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-400">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>searchfirst@facultyconnect.in</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-400">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>+91 9876543210</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-400">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span> Erode, Tamil Nadu, India</span>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © {currentYear} FacultyConnect. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-6">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* Additional Info */}
            <div className="text-gray-400 text-sm">
              Made with Search First for Educators
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
