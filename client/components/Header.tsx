import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/appStore";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NotificationSystem from "@/components/NotificationSystem";
import { Menu, X, User, LogOut, Briefcase, Settings } from "lucide-react";
import { motion } from "framer-motion";
import "../styles/nav-links.css";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  const navigation = [
    { name: "Jobs", href: "/jobs" },
    { name: "Institutes", href: "/institutes" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-transparent backdrop-blur-md border border-white/20 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3">
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 rounded-xl shadow-lg overflow-hidden"
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Ff92995b2d56b4f0a8225b3c3ca0a3e61%2Fedeb625211be4bf3b33f96c0d13d421a?format=webp&width=200"
                  alt="FacultyConnect Logo"
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <motion.span
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-base md:text-lg lg:text-2xl font-semibold text-white"
              >
                Faculty<span className="text-blue-600">Connect</span>
              </motion.span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Link
                  to={item.href}
                  className={`nav-link text-sm font-medium text-white hover:text-white/90 ${
                    isActivePath(item.href) ? "active" : ""
                  }`}
                  aria-current={isActivePath(item.href) ? "page" : undefined}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <NotificationSystem />

                {/* Settings */}
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-white hover:text-white/90 hover:bg-white/10"
                >
                  <Link to="/settings">
                    <Settings className="w-4 h-4" />
                  </Link>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2 text-white hover:text-white/90 hover:bg-white/10"
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm">
                        {user?.name?.split(" ")[0] ||
                          (user?.role === "faculty" ||
                          user?.role === "candidate"
                            ? "Faculty"
                            : "Employer")}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link
                        to={
                          user?.role === "employer"
                            ? "/employer/dashboard"
                            : user?.role === "faculty" ||
                                user?.role === "candidate"
                              ? "/faculty/dashboard"
                              : "/dashboard"
                        }
                        className="flex items-center"
                      >
                        <Briefcase className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="flex items-center">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="flex items-center text-red-600"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                {/* Faculty Sign In */}
                <Link to="/login?role=faculty">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-blue-300"
                  >
                    Faculty Sign In
                  </Button>
                </Link>

                {/* Institution Sign In */}
                <Link to="/login?role=employer">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-green-300"
                  >
                    Institution Sign In
                  </Button>
                </Link>

                {/* General Sign Up - Only on landing page */}
                {isLandingPage && (
                  <Link to="/register">
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Sign Up
                    </Button>
                  </Link>
                )}

                {/* Profile Section - Only on non-landing pages */}
                {!isLandingPage && (
                  <Link to="/profile">
                    <Avatar className="w-8 h-8 border-2 border-white/30 hover:border-white/50 transition-colors cursor-pointer">
                      <AvatarImage src={user?.profileImage} alt="Profile" />
                      <AvatarFallback className="bg-blue-600 text-white text-sm">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-white/90 hover:bg-white/10"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-white/20">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`nav-link-mobile block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActivePath(item.href)
                      ? "active"
                      : "text-white hover:text-white/90 hover:bg-white/10"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-current={isActivePath(item.href) ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-white/20">
                {isAuthenticated ? (
                  <div className="space-y-1">
                    <Link
                      to={
                        user?.role === "employer"
                          ? "/employer/dashboard"
                          : user?.role === "faculty" ||
                              user?.role === "candidate"
                            ? "/faculty/dashboard"
                            : "/dashboard"
                      }
                      className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-white/90 hover:bg-white/10"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-white/90 hover:bg-white/10"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-red-500/10"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <Link
                      to="/login?role=faculty"
                      className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-blue-300 hover:bg-blue-500/10"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Faculty Sign In
                    </Link>
                    <Link
                      to="/login?role=employer"
                      className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-green-300 hover:bg-green-500/10"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Institution Sign In
                    </Link>
                    {/* Sign Up - Only on landing page */}
                    {isLandingPage && (
                      <Link
                        to="/register"
                        className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    )}
                    {/* Profile Section - Only on non-landing pages */}
                    {!isLandingPage && (
                      <Link
                        to="/profile"
                        className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:text-white/90 hover:bg-white/10"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Avatar className="w-6 h-6 mr-3 border border-white/30">
                          <AvatarImage src={user?.profileImage} alt="Profile" />
                          <AvatarFallback className="bg-blue-600 text-white text-xs">
                            {user?.name?.charAt(0)?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        Profile
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
