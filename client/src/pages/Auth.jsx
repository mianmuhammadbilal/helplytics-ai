import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'both' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true); setError('');
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
      const { data } = await axios.post(`http://localhost:5000${endpoint}`, form);
      login(data.user, data.token);
      navigate(isLogin ? '/dashboard' : '/onboarding');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
    setLoading(false);
  };

  const roles = [
    { value: 'need_help', label: '🙋 Need Help', desc: 'Get support' },
    { value: 'can_help', label: '🤝 Give Help', desc: 'Support others' },
    { value: 'both', label: '⚡ Both', desc: 'Full access' },
  ];

  return (
    <div style={{
      background: '#050508', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20, position: 'relative', overflow: 'hidden'
    }}>
      {/* Glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20, padding: '40px 36px', width: '100%', maxWidth: 420,
        backdropFilter: 'blur(20px)', position: 'relative'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, margin: '0 auto 12px'
          }}>⚡</div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>
            {isLogin ? 'Welcome back' : 'Join Helplytics'}
          </h2>
          <p style={{ color: '#64748b', fontSize: 14 }}>
            {isLogin ? 'Sign in to your account' : 'Create your free account'}
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
            color: '#fca5a5', padding: '10px 14px', borderRadius: 10, marginBottom: 16, fontSize: 13
          }}>{error}</div>
        )}

        {!isLogin && (
          <input placeholder="Full Name" value={form.name}
            onChange={e => setForm({...form, name: e.target.value})} style={inputStyle} />
        )}
        <input placeholder="Email address" value={form.email}
          onChange={e => setForm({...form, email: e.target.value})} style={inputStyle} />
        <input type="password" placeholder="Password" value={form.password}
          onChange={e => setForm({...form, password: e.target.value})} style={inputStyle} />

        {!isLogin && (
          <div style={{ marginBottom: 20 }}>
            <p style={{ color: '#64748b', fontSize: 12, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>I want to</p>
            <div style={{ display: 'flex', gap: 8 }}>
              {roles.map(r => (
                <button key={r.value} onClick={() => setForm({...form, role: r.value})} style={{
                  flex: 1, padding: '10px 6px', borderRadius: 10,
                  border: `1px solid ${form.role === r.value ? '#6366f1' : 'rgba(255,255,255,0.08)'}`,
                  background: form.role === r.value ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.02)',
                  color: form.role === r.value ? '#818cf8' : '#475569',
                  fontSize: 12, textAlign: 'center', transition: 'all 0.2s'
                }}>
                  <div style={{ fontWeight: 600, marginBottom: 2 }}>{r.label}</div>
                  <div style={{ fontSize: 11, opacity: 0.7 }}>{r.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        <button onClick={handleSubmit} disabled={loading} style={{
          width: '100%',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          color: '#fff', border: 'none', padding: '13px',
          borderRadius: 10, fontSize: 15, fontWeight: 600,
          opacity: loading ? 0.7 : 1,
          boxShadow: '0 0 20px rgba(99,102,241,0.3)'
        }}>
          {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
        </button>

        <p style={{ color: '#475569', textAlign: 'center', marginTop: 20, fontSize: 14 }}>
          {isLogin ? "Don't have an account? " : "Already have one? "}
          <span onClick={() => { setIsLogin(!isLogin); setError(''); }}
            style={{ color: '#818cf8', cursor: 'pointer', fontWeight: 600 }}>
            {isLogin ? 'Sign up' : 'Sign in'}
          </span>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%', background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10,
  padding: '11px 14px', color: '#fff', marginBottom: 12, fontSize: 14,
  outline: 'none', boxSizing: 'border-box',
  transition: 'border-color 0.2s'
};