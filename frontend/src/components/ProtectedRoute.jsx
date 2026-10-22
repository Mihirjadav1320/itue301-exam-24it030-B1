import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, requiredRole }) {
  const { token, role } = useAuth();

  // No token -> go to login
  if (!token) return <Navigate to="/" replace />;

  // Token present but wrong role -> go to /events (not logout)
  if (requiredRole && role !== requiredRole) return <Navigate to="/events" replace />;

  return children;
}