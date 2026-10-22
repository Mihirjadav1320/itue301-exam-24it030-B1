import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { token, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav style={{ display: 'flex', gap: 16, padding: 12, background: '#eee' }}>
      <Link to="/">Login</Link>
      <Link to="/events">Events</Link>
      <Link to="/my-tickets">My Tickets</Link>
      <Link to="/organizer">Organizer</Link>
      {token && <button onClick={handleLogout}>Logout ({role})</button>}
    </nav>
  );
}
