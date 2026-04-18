import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '16px 32px', background: '#0f0f0f', borderBottom: '1px solid #222',
      position: 'sticky', top: 0, zIndex: 100
    }}>
      <Link to="/" style={{ color: '#7c6df1', fontWeight: 700, fontSize: 20, textDecoration: 'none' }}>
        ⚡ Helplytics
      </Link>
      {user ? (
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <Link to="/explore" style={navLink}>Explore</Link>
          <Link to="/create" style={navLink}>+ Request</Link>
          <Link to="/leaderboard" style={navLink}>Leaderboard</Link>
          <Link to="/dashboard" style={navLink}>Dashboard</Link>
          <button onClick={handleLogout} style={btnStyle}>Logout</button>
        </div>
      ) : (
        <Link to="/auth" style={btnStyle}>Get Started</Link>
      )}
    </nav>
  );
}

const navLink = { color: '#aaa', textDecoration: 'none', fontSize: 14 };
const btnStyle = {
  background: '#7c6df1', color: '#fff', border: 'none',
  padding: '8px 18px', borderRadius: 8, cursor: 'pointer', fontSize: 14
};