import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'faculty' | 'employer' | 'admin';
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  requiredRole,
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  // If not authenticated, redirect to login with the current location
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If a specific role is required and user doesn't have it
  if (requiredRole && user?.role !== requiredRole) {
    // Redirect based on user's actual role
    let roleBasedRedirect = '/dashboard';

    if (user?.role === 'employer') {
      roleBasedRedirect = '/employer/dashboard';
    } else if (user?.role === 'faculty') {
      roleBasedRedirect = '/faculty/dashboard';
    } else if (user?.role === 'admin') {
      roleBasedRedirect = '/admin/dashboard';
    }

    return <Navigate to={roleBasedRedirect} replace />;
  }

  return <>{children}</>;
}
