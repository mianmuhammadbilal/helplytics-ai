import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 32px', background: '#f5f0e8',
      borderBottom: '1px solid rgba(0,0,0,0.08)',
      position: 'sticky', top: 0, zIndex: 100
    }}>
      {/* Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8, background: '#108077',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 800, fontSize: 14
        }}>H</div>
        <span style={{ fontWeight: 700, fontSize: 15, color: '#1a1a1a' }}>Helplytics AI</span>
      </Link>

      {/* Nav Links */}
      <div style={{ display: 'flex', gap: 4 }}>
        {[
          { label: 'Home', path: '/' },
          { label: 'Explore', path: '/explore' },
          { label: 'Leaderboard', path: '/leaderboard' },
          { label: 'AI Center', path: '/dashboard' },
        ].map(({ label, path }) => (
          <Link key={path} to={path} style={{
            background: isActive(path) ? '#fff' : 'transparent',
            border: isActive(path) ? '1px solid rgba(0,0,0,0.12)' : '1px solid transparent',
            padding: '7px 16px', borderRadius: 8, fontSize: 14,
            color: '#1a1a1a', fontWeight: isActive(path) ? 500 : 400,
            textDecoration: 'none', transition: 'all 0.2s'
          }}>{label}</Link>
        ))}
      </div>

      {/* Right Side */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        {user ? (
  <>
    <Link to="/create" style={{
      background: 'linear-gradient(135deg, #108077, #1ab5a8)',
      color: '#fff', border: 'none', padding: '8px 18px',
      borderRadius: 8, fontSize: 14, fontWeight: 600,
      textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s',
      display: 'inline-block'
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(16,128,119,0.4)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
    >+ New Request</Link>
    <div style={{
      width: 32, height: 32, borderRadius: '50%',
      background: 'linear-gradient(135deg, #108077, #1ab5a8)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 13, fontWeight: 700, color: '#fff'
    }}>
      {user.name?.charAt(0).toUpperCase()}
    </div>
    <button onClick={handleLogout} style={{
      background: 'rgba(16,128,119,0.1)', color: '#108077',
      border: '1px solid rgba(16,128,119,0.3)',
      padding: '6px 14px', borderRadius: 8, fontSize: 13, fontWeight: 500,
      cursor: 'pointer'
    }}>Logout</button>
  </>
) : (
  <>
    <button onClick={() => navigate('/explore')} style={{
      background: 'rgba(0,0,0,0.06)', color: '#1a1a1a',
      border: '1px solid rgba(0,0,0,0.12)',
      padding: '8px 20px', borderRadius: 50,
      fontSize: 14, cursor: 'pointer', fontWeight: 400
    }}>Live community signals</button>
    <button onClick={() => navigate('/auth')} style={{
      background: 'linear-gradient(135deg, #108077, #1ab5a8)',
      color: '#fff', border: 'none',
      padding: '10px 22px', borderRadius: 50,
      fontSize: 14, fontWeight: 600, cursor: 'pointer',
      transition: 'transform 0.2s, box-shadow 0.2s'
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(16,128,119,0.45)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
    >Join the platform</button>
  </>
)}
      </div>
    </nav>
  );
}