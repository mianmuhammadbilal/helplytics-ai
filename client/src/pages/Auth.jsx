import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'both' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Page load hote hi backend warm karo
  useEffect(() => {
    fetch('https://helplytics-ai-a3hz.vercel.app/ping').catch(() => {});
  }, []);

  const handleSubmit = async () => {
    setLoading(true); setError('');
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
      const { data } = await axios.post(
        `https://helplytics-ai-a3hz.vercel.app${endpoint}`, form
      );

      if (!isLogin) {
        setShowPopup(true);
        setIsLogin(true);
        setForm({ name: '', email: form.email, password: '', role: 'both' });
        setTimeout(() => setShowPopup(false), 2000);
      } else {
        login(data.user, data.token);
        if (!data.user.isOnboarded) {
          navigate('/onboarding');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e8f0e9 0%, #f5f0e8 40%, #f0e8e0 100%)',
      display: 'flex', flexDirection: 'column', position: 'relative'
    }}>

      {/* Success Popup */}
      {showPopup && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 999
        }}>
          <div style={{
            background: '#fff', borderRadius: 20, padding: '40px 48px',
            textAlign: 'center', maxWidth: 400, width: '90%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'linear-gradient(135deg, #108077, #1ab5a8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px', fontSize: 28, color: '#fff', fontWeight: 700
            }}>✓</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1a1a1a', marginBottom: 8 }}>
              Welcome to Helplytics!
            </h2>
            <p style={{ color: '#888', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
              Account created successfully. Now login to set up your profile.
            </p>
            <div style={{
              background: 'rgba(16,128,119,0.08)', border: '1px solid rgba(16,128,119,0.2)',
              borderRadius: 10, padding: '10px 16px'
            }}>
              <span style={{ color: '#108077', fontSize: 13, fontWeight: 600 }}>
                ✨ Login to continue onboarding...
              </span>
            </div>
          </div>
        </div>
      )}
      
      {/* 
      {/* Main Content */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: '40px 24px'
      }}>
        <div style={{ display: 'flex', gap: 24, maxWidth: 960, width: '100%', alignItems: 'stretch' }}>

          {/* Left Card */}
          <div style={{
            background: '#14302c', borderRadius: 20, padding: '48px 40px',
            flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#88b5b0', textTransform: 'uppercase' }}>COMMUNITY ACCESS</div>
            <h2 style={{ fontSize: 42, fontWeight: 800, color: '#fff', lineHeight: 1.15, margin: 0 }}>
              Enter the support network.
            </h2>
            <p style={{ color: '#a8c5c0', fontSize: 15, lineHeight: 1.7, margin: 0 }}>
              Choose your role, set your identity, and jump into a multi-page product flow designed for asking, offering, and tracking help with a premium interface.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
              {[
                'Role-based entry for Need Help, Can Help, or Both',
                'Direct path into dashboard, requests, AI Center, and community feed',
                'Persistent session powered by MongoDB & JWT',
              ].map(item => (
                <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: '#1ab5a8', fontSize: 16, marginTop: 1 }}>•</span>
                  <span style={{ color: '#c8dbd9', fontSize: 14, lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Card */}
          <div style={{
            background: '#fff', borderRadius: 20, padding: '48px 40px',
            flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#108077', textTransform: 'uppercase', marginBottom: 12 }}>LOGIN / SIGNUP</div>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: '#1a1a1a', lineHeight: 1.2, marginBottom: 28 }}>
              Authenticate your community profile
            </h2>

            {error && (
              <div style={{
                background: '#fee2e2', border: '1px solid #fca5a5',
                color: '#dc2626', padding: '10px 14px', borderRadius: 10,
                marginBottom: 16, fontSize: 13
              }}>{error}</div>
            )}

            {!isLogin && (
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Full Name</label>
                <input
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  style={inputStyle}
                />
              </div>
            )}

            {!isLogin && (
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Role selection</label>
                <select
                  value={form.role}
                  onChange={e => setForm({...form, role: e.target.value})}
                  style={inputStyle}
                >
                  <option value="need_help">Need Help</option>
                  <option value="can_help">Can Help</option>
                  <option value="both">Both</option>
                </select>
              </div>
            )}

            <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Email</label>
                <input
                  placeholder="community@helplytics.ai"
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  style={inputStyle}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm({...form, password: e.target.value})}
                  style={inputStyle}
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #108077, #1ab5a8)',
                color: '#fff', border: 'none', padding: '15px',
                borderRadius: 50, fontSize: 16, fontWeight: 600, cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                opacity: loading ? 0.7 : 1
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(16,128,119,0.45)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              {loading ? 'Please wait...' : isLogin ? 'Login' : 'Create Account'}
            </button>

            <p style={{ color: '#888', textAlign: 'center', marginTop: 20, fontSize: 14 }}>
              {isLogin ? "Don't have an account? " : "Already have one? "}
              <span
                onClick={() => { setIsLogin(!isLogin); setError(''); }}
                style={{ color: '#108077', cursor: 'pointer', fontWeight: 600 }}
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%', background: '#f9f9f9',
  border: '1px solid rgba(0,0,0,0.12)', borderRadius: 10,
  padding: '12px 14px', color: '#1a1a1a', fontSize: 14,
  outline: 'none', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif'
};

const labelStyle = {
  display: 'block', fontSize: 13, fontWeight: 500, color: '#555', marginBottom: 6
};