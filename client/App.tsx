import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import AnimatedBackground from "@/components/AnimatedBackground";

// Pages
import HomePage from "./pages/HomePage";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import Institutes from "./pages/Institutes";
import Login from "./pages/Login";
import Register from "./pages/EnhancedRegister";
import CandidateDashboard from "./pages/CandidateDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Blog from "./pages/Blog";
import HowItWorks from "./pages/HowItWorks";
import FAQ from "./pages/FAQ";
import SuccessStories from "./pages/SuccessStories";
import Help from "./pages/Help";
import CareerTips from "./pages/CareerTips";
import ResumeBuilder from "./pages/ResumeBuilder";
import Feedback from "./pages/Feedback";
import Partnerships from "./pages/Partnerships";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import ForgotPassword from "./pages/ForgotPassword";
import FilterDemo from "./pages/FilterDemo";
import Profile from "./pages/EnhancedProfile";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";

// Employer Dashboard Pages
import MyJobs from "./pages/employer/MyJobs";
import Applications from "./pages/employer/Applications";
import Analytics from "./pages/employer/Analytics";
import PostNewJob from "./pages/employer/PostNewJob";
import EmployerPricing from "./pages/employer/Pricing";
import Candidates from "./pages/employer/Candidates";

// Candidate Dashboard Pages
import CandidateDashboardNew from "./pages/candidate/CandidateDashboard";

// Faculty Dashboard Pages
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import ApplicationDetail from "./pages/faculty/ApplicationDetail";
import FacultyNotifications from "./pages/faculty/Notifications";

// Role-based Dashboard
import Dashboard from "./pages/Dashboard";

// Institute Pages
import InstitutesMain from "./pages/institutes/InstitutesMain";
import InstituteDetails from "./pages/institutes/InstituteDetails";
import InstituteJobs from "./pages/institutes/InstituteJobs";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Layout wrapper component
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <AnimatedBackground tint={[0.5, 0.6, 0.8]} speed={1.0} mouse={true} />
      <Header />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />

          <Route
            path="/jobs"
            element={
              <Layout>
                <Jobs />
              </Layout>
            }
          />

          <Route
            path="/jobs/:id"
            element={
              <Layout>
                <JobDetail />
              </Layout>
            }
          />

          <Route
            path="/institutes"
            element={
              <Layout>
                <InstitutesMain />
              </Layout>
            }
          />

          <Route
            path="/institutes/:id"
            element={
              <Layout>
                <InstituteDetails />
              </Layout>
            }
          />

          <Route
            path="/institutes/:id/jobs"
            element={
              <Layout>
                <InstituteJobs />
              </Layout>
            }
          />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes - Role-based Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/faculty/dashboard"
            element={
              <ProtectedRoute requiredRole="faculty">
                <Layout>
                  <FacultyDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/applications/:id"
            element={
              <ProtectedRoute requiredRole="faculty">
                <Layout>
                  <ApplicationDetail />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/faculty/notifications"
            element={
              <ProtectedRoute requiredRole="faculty">
                <Layout>
                  <FacultyNotifications />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Legacy Candidate Routes - Redirect to Faculty */}
          <Route
            path="/candidate/dashboard"
            element={
              <ProtectedRoute requiredRole="faculty">
                <Layout>
                  <FacultyDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Protected Routes - Employer */}
          <Route
            path="/employer/dashboard"
            element={
              <ProtectedRoute requiredRole="employer">
                <Layout>
                  <EmployerDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/employer/my-jobs"
            element={
              <ProtectedRoute requiredRole="employer">
                <Layout>
                  <MyJobs />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/employer/applications/:jobId?"
            element={
              <ProtectedRoute requiredRole="employer">
                <Layout>
                  <Applications />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/employer/analytics"
            element={
              <ProtectedRoute requiredRole="employer">
                <Layout>
                  <Analytics />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/employer/post-job"
            element={
              <ProtectedRoute requiredRole="employer">
                <Layout>
                  <PostNewJob />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/employer/candidates"
            element={
              <ProtectedRoute requiredRole="employer">
                <Layout>
                  <Candidates />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/employer/pricing"
            element={
              <Layout>
                <EmployerPricing />
              </Layout>
            }
          />

          {/* Profile Route - Accessible to both roles */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Settings Route - Accessible to both roles */}
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Layout>
                  <Settings />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* About and Contact Routes */}
          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />

          <Route
            path="/how-it-works"
            element={
              <Layout>
                <HowItWorks />
              </Layout>
            }
          />

          <Route
            path="/faq"
            element={
              <Layout>
                <FAQ />
              </Layout>
            }
          />

          <Route
            path="/contact"
            element={
              <Layout>
                <Contact />
              </Layout>
            }
          />

          <Route
            path="/blog"
            element={
              <Layout>
                <Blog />
              </Layout>
            }
          />

          <Route
            path="/resources/success-stories"
            element={
              <Layout>
                <SuccessStories />
              </Layout>
            }
          />

          <Route
            path="/help"
            element={
              <Layout>
                <Help />
              </Layout>
            }
          />

          <Route
            path="/resources/career-tips"
            element={
              <Layout>
                <CareerTips />
              </Layout>
            }
          />

          <Route
            path="/tools/resume-builder"
            element={
              <Layout>
                <ResumeBuilder />
              </Layout>
            }
          />

          <Route
            path="/feedback"
            element={
              <Layout>
                <Feedback />
              </Layout>
            }
          />

          <Route
            path="/partnerships"
            element={
              <Layout>
                <Partnerships />
              </Layout>
            }
          />

          {/* Footer Content Pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/about-us" element={<AboutUs />} />

          {/* Filter Demo Route */}
          <Route
            path="/filter-demo"
            element={
              <Layout>
                <FilterDemo />
              </Layout>
            }
          />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Ensure root is only created once
const container = document.getElementById("root")!;
let root = (window as any).__reactRoot;

if (!root) {
  root = createRoot(container);
  (window as any).__reactRoot = root;
}

root.render(<App />);
