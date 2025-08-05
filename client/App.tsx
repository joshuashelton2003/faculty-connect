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

// Pages
import HomePage from "./pages/HomePage";
import JobsList from "./pages/JobsList";
import JobDetail from "./pages/JobDetail";
import Institutes from "./pages/Institutes";
import Login from "./pages/Login";
import Register from "./pages/EnhancedRegister";
import CandidateDashboard from "./pages/CandidateDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Blog from "./pages/Blog";
import SuccessStories from "./pages/SuccessStories";
import Help from "./pages/Help";
import CareerTips from "./pages/CareerTips";
import ResumeBuilder from "./pages/ResumeBuilder";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import ForgotPassword from "./pages/ForgotPassword";
import FilterDemo from "./pages/FilterDemo";
import Profile from "./pages/EnhancedProfile";
import NotFound from "./pages/NotFound";

// Employer Dashboard Pages
import MyJobs from "./pages/employer/MyJobs";
import Applications from "./pages/employer/Applications";
import Analytics from "./pages/employer/Analytics";
import PostNewJob from "./pages/employer/PostNewJob";

// Candidate Dashboard Pages
import CandidateDashboardNew from "./pages/candidate/CandidateDashboard";

// Faculty Dashboard Pages
import FacultyDashboard from "./pages/faculty/FacultyDashboard";

// Institute Pages
import InstitutesMain from "./pages/institutes/InstitutesMain";

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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
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
          <Route path="/" element={
            <Layout>
              <HomePage />
            </Layout>
          } />
          
          <Route path="/jobs" element={
            <Layout>
              <JobsList />
            </Layout>
          } />
          
          <Route path="/jobs/:id" element={
            <Layout>
              <JobDetail />
            </Layout>
          } />
          
          <Route path="/institutes" element={
            <Layout>
              <InstitutesMain />
            </Layout>
          } />

          <Route path="/institutes/:id" element={
            <Layout>
              <Institutes />
            </Layout>
          } />

          <Route path="/institutes/:id/jobs" element={
            <Layout>
              <JobsList />
            </Layout>
          } />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes - Faculty */}
          <Route path="/dashboard" element={
            <ProtectedRoute requiredRole="faculty">
              <Layout>
                <FacultyDashboard />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/faculty/dashboard" element={
            <ProtectedRoute requiredRole="faculty">
              <Layout>
                <FacultyDashboard />
              </Layout>
            </ProtectedRoute>
          } />

          {/* Legacy Candidate Routes - Redirect to Faculty */}
          <Route path="/candidate/dashboard" element={
            <ProtectedRoute requiredRole="faculty">
              <Layout>
                <FacultyDashboard />
              </Layout>
            </ProtectedRoute>
          } />

          {/* Protected Routes - Employer */}
          <Route path="/employer/dashboard" element={
            <ProtectedRoute requiredRole="employer">
              <Layout>
                <EmployerDashboard />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/employer/my-jobs" element={
            <ProtectedRoute requiredRole="employer">
              <Layout>
                <MyJobs />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/employer/applications/:jobId?" element={
            <ProtectedRoute requiredRole="employer">
              <Layout>
                <Applications />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/employer/analytics" element={
            <ProtectedRoute requiredRole="employer">
              <Layout>
                <Analytics />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/employer/post-job" element={
            <ProtectedRoute requiredRole="employer">
              <Layout>
                <PostNewJob />
              </Layout>
            </ProtectedRoute>
          } />

          {/* Profile Route - Accessible to both roles */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          } />

          {/* About and Contact Routes */}
          <Route path="/about" element={
            <Layout>
              <About />
            </Layout>
          } />

          <Route path="/contact" element={
            <Layout>
              <Contact />
            </Layout>
          } />

          <Route path="/blog" element={
            <Layout>
              <Blog />
            </Layout>
          } />

          <Route path="/resources/success-stories" element={
            <Layout>
              <SuccessStories />
            </Layout>
          } />

          <Route path="/help" element={
            <Layout>
              <Help />
            </Layout>
          } />

          <Route path="/resources/career-tips" element={
            <Layout>
              <CareerTips />
            </Layout>
          } />

          {/* Footer Content Pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/about-us" element={<AboutUs />} />

          {/* Filter Demo Route */}
          <Route path="/filter-demo" element={
            <Layout>
              <FilterDemo />
            </Layout>
          } />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
