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
import Register from "./pages/Register";
import CandidateDashboard from "./pages/CandidateDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import Contact from "./pages/Contact";
import About from "./pages/About";
import ForgotPassword from "./pages/ForgotPassword";
import FilterDemo from "./pages/FilterDemo";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

// Employer Dashboard Pages
import MyJobs from "./pages/employer/MyJobs";
import Applications from "./pages/employer/Applications";
import Analytics from "./pages/employer/Analytics";
import PostNewJob from "./pages/employer/PostNewJob";

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
              <Institutes />
            </Layout>
          } />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes - Candidate */}
          <Route path="/dashboard" element={
            <ProtectedRoute requiredRole="candidate">
              <Layout>
                <CandidateDashboard />
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
