import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  if (location.pathname === '/onboarding') return null;
  const isActive = (path) => location.pathname === path;
  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 32px', background: '#f5f0e8',
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
        {user ? (
          <>
            {[
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Explore', path: '/explore' },
  { label: 'Create Request', path: '/create' },
  { label: 'Messages', path: '/messages' },
  { label: 'Profile', path: '/profile' },
].map(({ label, path }) => (
  <Link key={path} to={path} style={{
    background: isActive(path) ? '#fff' : 'transparent',
    border: isActive(path) ? '1px solid rgba(0,0,0,0.12)' : '1px solid transparent',
    padding: '7px 14px', borderRadius: 50, fontSize: 16,
    color: isActive(path) ? '#115e59' : '#1a1a1a',
    fontWeight: isActive(path) ? 600 : 400,
    textDecoration: 'none', transition: 'all 0.2s'
  }}
    onMouseEnter={e => {
      if (!isActive(path)) {
        e.currentTarget.style.color = '#115e59';
        e.currentTarget.style.background = 'rgba(17,94,89,0.08)';
        e.currentTarget.style.border = '1px solid rgba(17,94,89,0.15)';
      }
    }}
    onMouseLeave={e => {
      if (!isActive(path)) {
        e.currentTarget.style.color = '#1a1a1a';
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.border = '1px solid transparent';
      }
    }}
  >{label}</Link>
))}
          </>
        ) : (
          <>
            {[
  { label: 'Home', path: '/' },
  { label: 'Explore', path: '/explore' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'AI Center', path: '/ai-center' },
].map(({ label, path }) => (
  <Link key={path} to={path} style={{
    background: isActive(path) ? '#fff' : 'transparent',
    border: isActive(path) ? '1px solid rgba(0,0,0,0.12)' : '1px solid transparent',
    padding: '7px 14px', borderRadius: 8, fontSize: 14,
    color: isActive(path) ? '#115e59' : '#1a1a1a',
    fontWeight: isActive(path) ? 600 : 400,
    textDecoration: 'none', transition: 'all 0.2s'
  }}
    onMouseEnter={e => {
      if (!isActive(path)) {
        e.currentTarget.style.color = '#115e59';
        e.currentTarget.style.background = 'rgba(17,94,89,0.08)';
        e.currentTarget.style.border = '1px solid rgba(17,94,89,0.15)';
      }
    }}
    onMouseLeave={e => {
      if (!isActive(path)) {
        e.currentTarget.style.color = '#1a1a1a';
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.border = '1px solid transparent';
      }
    }}
  >{label}</Link>
))}
          </>
        )}
      </div>

      {/* Right Side */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        {user ? (
          <>
            <button onClick={() => navigate('/notifications')} style={{
              background: 'transparent', border: '1px solid rgba(0,0,0,0.12)',
              padding: '7px 16px', borderRadius: 8, fontSize: 14,
              color: '#444', cursor: 'pointer'
            }}>Notifications</button>

            <button onClick={() => navigate('/ai-center')} style={{
              background: 'linear-gradient(135deg, #108077, #1ab5a8)',
              color: '#fff', border: 'none', padding: '8px 18px',
              borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(16,128,119,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >Open AI Center</button>

            <button onClick={handleLogout} style={{
              background: 'rgba(16,128,119,0.1)', color: '#108077',
              border: '1px solid rgba(16,128,119,0.3)',
              padding: '7px 16px', borderRadius: 8, fontSize: 14,
              fontWeight: 500, cursor: 'pointer'
            }}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/explore')} style={{
              background: 'rgba(0,0,0,0.06)', color: '#1a1a1a',
              border: '1px solid rgba(0,0,0,0.12)', padding: '8px 20px',
              borderRadius: 50, fontSize: 14, cursor: 'pointer'
            }}>Live community signals</button>
            <button onClick={() => navigate('/auth')} style={{
              background: 'linear-gradient(135deg, #108077, #1ab5a8)',
              color: '#fff', border: 'none', padding: '10px 22px',
              borderRadius: 50, fontSize: 14, fontWeight: 600, cursor: 'pointer',
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