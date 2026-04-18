import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'both' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
      const { data } = await axios.post(`http://localhost:5000${endpoint}`, form);
      login(data.user, data.token);
      navigate(isLogin ? '/dashboard' : '/onboarding');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#111', border: '1px solid #222', borderRadius: 16, padding: 40, width: 380 }}>
        <h2 style={{ color: '#fff', marginBottom: 8 }}>{isLogin ? 'Welcome back' : 'Join Helplytics'}</h2>
        <p style={{ color: '#888', marginBottom: 28, fontSize: 14 }}>Community-powered learning platform</p>

        {error && <div style={{ background: '#2d1b1b', color: '#f87171', padding: 10, borderRadius: 8, marginBottom: 16, fontSize: 13 }}>{error}</div>}

        {!isLogin && <input placeholder="Full Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={inputStyle} />}
        <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={inputStyle} />
        <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} style={inputStyle} />

        {!isLogin && (
          <div style={{ marginBottom: 16 }}>
            <p style={{ color: '#888', fontSize: 13, marginBottom: 8 }}>I want to:</p>
            <div style={{ display: 'flex', gap: 8 }}>
              {[['need_help', '🙋 Get Help'], ['can_help', '🤝 Give Help'], ['both', '⚡ Both']].map(([val, label]) => (
                <button key={val} onClick={() => setForm({...form, role: val})} style={{
                  flex: 1, padding: '8px 4px', borderRadius: 8, border: '1px solid',
                  borderColor: form.role === val ? '#7c6df1' : '#333',
                  background: form.role === val ? '#1e1b4b' : 'transparent',
                  color: form.role === val ? '#7c6df1' : '#666',
                  cursor: 'pointer', fontSize: 12
                }}>{label}</button>
              ))}
            </div>
          </div>
        )}

        <button onClick={handleSubmit} style={{ width: '100%', background: '#7c6df1', color: '#fff', border: 'none', padding: 12, borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>
          {isLogin ? 'Login' : 'Create Account'}
        </button>

        <p style={{ color: '#666', textAlign: 'center', marginTop: 16, fontSize: 13 }}>
          {isLogin ? "Don't have an account? " : "Already have one? "}
          <span onClick={() => setIsLogin(!isLogin)} style={{ color: '#7c6df1', cursor: 'pointer' }}>
            {isLogin ? 'Sign up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
}

const inputStyle = { width: '100%', background: '#1a1a1a', border: '1px solid #333', borderRadius: 8, padding: '10px 12px', color: '#fff', marginBottom: 12, fontSize: 14, boxSizing: 'border-box' };