import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Onboarding() {
  const [form, setForm] = useState({ skills: '', interests: '', location: '' });
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await axios.put('https://helplytics-ai-a3hz.vercel.app/api/auth/profile', {
      skills: form.skills.split(',').map(s => s.trim()),
      interests: form.interests.split(',').map(s => s.trim()),
      location: form.location
    }, { headers: { Authorization: `Bearer ${token}` } });
    navigate('/dashboard');
  };

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#111', border: '1px solid #222', borderRadius: 16, padding: 40, width: 400 }}>
        <h2 style={{ color: '#fff', marginBottom: 8 }}>Setup Your Profile</h2>
        <p style={{ color: '#888', marginBottom: 24, fontSize: 14 }}>Help us personalize your experience</p>
        <input placeholder="Your skills (e.g. React, Python, Design)" value={form.skills} onChange={e => setForm({...form, skills: e.target.value})} style={inputStyle} />
        <input placeholder="Interests (e.g. Web Dev, AI, Gaming)" value={form.interests} onChange={e => setForm({...form, interests: e.target.value})} style={inputStyle} />
        <input placeholder="Location (e.g. Karachi)" value={form.location} onChange={e => setForm({...form, location: e.target.value})} style={inputStyle} />
        <button onClick={handleSubmit} style={{ width: '100%', background: '#7c6df1', color: '#fff', border: 'none', padding: 12, borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>
          Complete Setup →
        </button>
      </div>
    </div>
  );
}

const inputStyle = { width: '100%', background: '#1a1a1a', border: '1px solid #333', borderRadius: 8, padding: '10px 12px', color: '#fff', marginBottom: 12, fontSize: 14, boxSizing: 'border-box' };