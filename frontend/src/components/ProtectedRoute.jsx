import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, requireProfile = false }) {
  const { user, profileComplete } = useAuth();

  if (!user) return <Navigate to="/" replace />;
  if (requireProfile && !profileComplete) return <Navigate to="/onboarding" replace />;

  return children;
}
