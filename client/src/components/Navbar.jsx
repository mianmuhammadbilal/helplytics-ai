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
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '0 32px', height: 64,
      background: 'rgba(5,5,8,0.8)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      position: 'sticky', top: 0, zIndex: 100
    }}>
      {/* Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14
        }}>⚡</div>
        <span style={{ fontWeight: 700, fontSize: 16, color: '#fff' }}>Helplytics</span>
        <span style={{
          background: 'rgba(99,102,241,0.15)', color: '#818cf8',
          fontSize: 11, padding: '2px 8px', borderRadius: 10, border: '1px solid rgba(99,102,241,0.2)'
        }}>AI</span>
      </Link>

      {/* Nav Links */}
      {user && (
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {[
            { path: '/dashboard', label: 'Dashboard' },
            { path: '/explore', label: 'Explore' },
            { path: '/leaderboard', label: 'Leaderboard' },
          ].map(({ path, label }) => (
            <Link key={path} to={path} style={{
              padding: '6px 14px', borderRadius: 8, fontSize: 14,
              color: isActive(path) ? '#fff' : '#64748b',
              background: isActive(path) ? 'rgba(99,102,241,0.15)' : 'transparent',
              transition: 'all 0.2s'
            }}>{label}</Link>
          ))}
        </div>
      )}

      {/* Right Side */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        {user ? (
          <>
            <Link to="/create" style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: '#fff', border: 'none', padding: '8px 16px',
              borderRadius: 8, fontSize: 13, fontWeight: 600
            }}>+ New Request</Link>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700, cursor: 'pointer'
            }} onClick={handleLogout} title="Logout">
              {user.name?.charAt(0).toUpperCase()}
            </div>
          </>
        ) : (
          <Link to="/auth" style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: '#fff', padding: '8px 18px', borderRadius: 8, fontSize: 14, fontWeight: 600
          }}>Get Started</Link>
        )}
      </div>
    </nav>
  );
}