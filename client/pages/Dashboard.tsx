import { useAuthStore } from '@/store/authStore';
import FacultyDashboard from './faculty/FacultyDashboard';
import EmployerDashboard from './EmployerDashboard';

export default function Dashboard() {
  const { user } = useAuthStore();

  // Render dashboard based on user role
  if (user?.role === 'employer') {
    return <EmployerDashboard />;
  }

  // Default to faculty dashboard (includes legacy 'candidate' role)
  return <FacultyDashboard />;
}
