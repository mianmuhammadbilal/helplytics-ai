import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Onboarding() {
  const [form, setForm] = useState({ name: '', location: '', skills: '', interests: '' });
  const [loading, setLoading] = useState(false);
  const { token, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const aiSuggestions = {
    helpWith: form.skills || 'Add your skills to see suggestions',
    needSupport: form.interests || 'Add your interests to see suggestions',
    roleFit: form.skills && form.interests ? 'Both' : 'Need more info',
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.put('https://helplytics-ai-a3hz.vercel.app/api/auth/profile', {
        skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
        interests: form.interests.split(',').map(s => s.trim()).filter(Boolean),
        location: form.location,
        name: form.name,
      }, { headers: { Authorization: `Bearer ${token}` } });
      updateUser({ isOnboarded: true });
      navigate('/dashboard');
    } catch {
      alert('Error saving profile');
    }
    setLoading(false);
  };

  return (
    <div style={{ background: '#f5f0e8', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

      {/* Top Right Logout */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px 24px 0' }}>
        <button onClick={() => { logout(); navigate('/auth'); }} style={{
          background: 'rgba(16,128,119,0.1)', color: '#108077',
          border: '1px solid rgba(16,128,119,0.3)',
          padding: '7px 18px', borderRadius: 8,
          fontSize: 13, fontWeight: 500, cursor: 'pointer'
        }}>Logout</button>
      </div>

      {/* Hero Banner */}
      <div style={{ background: '#282f31', margin: '12px 24px 0', borderRadius: 16, padding: '36px 40px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#88a0a0', textTransform: 'uppercase', marginBottom: 12 }}>ONBOARDING</div>
        <h1 style={{ fontSize: 42, fontWeight: 800, color: '#fff', margin: '0 0 12px', lineHeight: 1.15 }}>
          Shape your support identity with AI suggestions.
        </h1>
        <p style={{ color: '#94a8a8', fontSize: 15, margin: 0 }}>
          Name your strengths, interests, and location so the system can recommend where you can help and where you may need backup.
        </p>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20, padding: '24px' }}>

        {/* Left — Form */}
        <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 16, padding: '28px' }}>

          {/* Name + Location */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 }}>
            <div>
              <label style={labelStyle}>Name</label>
              <input
                placeholder="Your full name"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Location</label>
              <input
                placeholder="Karachi, Lahore, Remote"
                value={form.location}
                onChange={e => setForm({...form, location: e.target.value})}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Skills */}
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Skills</label>
            <input
              placeholder="JavaScript, React, Git/GitHub, Node.js"
              value={form.skills}
              onChange={e => setForm({...form, skills: e.target.value})}
              style={inputStyle}
            />
          </div>

          {/* Interests */}
          <div style={{ marginBottom: 28 }}>
            <label style={labelStyle}>Interests</label>
            <input
              placeholder="Web Apps, Teaching, Open Source"
              value={form.interests}
              onChange={e => setForm({...form, interests: e.target.value})}
              style={inputStyle}
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #108077, #1ab5a8)',
              color: '#fff', border: 'none', padding: '13px',
              borderRadius: 50, fontSize: 15, fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(16,128,119,0.4)'; }}}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            {loading ? 'Saving...' : 'Save onboarding'}
          </button>
        </div>

        {/* Right — AI Suggestions */}
        <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 16, padding: '28px', height: 'fit-content' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#108077', textTransform: 'uppercase', marginBottom: 10 }}>AI SUGGESTIONS</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#1a1a1a', marginBottom: 28, lineHeight: 1.2 }}>
            Your likely contribution map
          </h2>

          {[
            { label: 'You can likely help with', value: aiSuggestions.helpWith },
            { label: 'You may want support in', value: aiSuggestions.needSupport },
            { label: 'Suggested role fit', value: aiSuggestions.roleFit },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
              padding: '14px 0',
              borderBottom: i < 2 ? '1px solid rgba(0,0,0,0.06)' : 'none',
              gap: 16
            }}>
              <span style={{ fontSize: 13, color: '#888', flex: 1, lineHeight: 1.5 }}>{item.label}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a', textAlign: 'right', maxWidth: 180, lineHeight: 1.5 }}>{item.value}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%', background: '#fafafa',
  border: '1px solid rgba(0,0,0,0.1)', borderRadius: 8,
  padding: '11px 14px', color: '#1a1a1a', fontSize: 14,
  outline: 'none', boxSizing: 'border-box',
  fontFamily: 'Inter, sans-serif'
};

const labelStyle = {
  display: 'block', fontSize: 13, fontWeight: 500,
  color: '#555', marginBottom: 6
};