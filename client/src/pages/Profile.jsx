import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, token, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    location: user?.location || '',
    skills: '',
    interests: '',
  });
  const [saved, setSaved] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Latest profile server se fetch karo
    if (token) {
      axios.get(`https://helplytics-ai-a3hz.vercel.app/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(r => {
        setProfileData(r.data);
        setForm({
          name: r.data.name || '',
          location: r.data.location || '',
          skills: r.data.skills?.join(', ') || '',
          interests: r.data.interests?.join(', ') || '',
        });
      }).catch(() => {
        // Fallback to localStorage user
        setProfileData(user);
        setForm({
          name: user?.name || '',
          location: user?.location || '',
          skills: user?.skills?.join(', ') || '',
          interests: user?.interests?.join(', ') || '',
        });
      });
    }
  }, [token]);

  const handleSave = async () => {
    try {
      const updated = await axios.put(
        'https://helplytics-ai-a3hz.vercel.app/api/auth/profile',
        {
          name: form.name,
          location: form.location,
          skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
          interests: form.interests.split(',').map(s => s.trim()).filter(Boolean),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfileData(updated.data);
      updateUser({
        name: form.name,
        location: form.location,
        skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
        interests: form.interests.split(',').map(s => s.trim()).filter(Boolean),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      alert('Error saving profile');
    }
  };

  const displayUser = profileData || user;
  const badges = ['Design Ally', 'Fast Responder', 'Top Mentor'];

  return (
    <div style={{ background: '#f5f0e8', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

      {/* Hero Banner */}
      <div style={{ background: '#282f31', margin: '24px 24px 0', borderRadius: 16, padding: '36px 40px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#88a0a0', textTransform: 'uppercase', marginBottom: 12 }}>PROFILE</div>
        <h1 style={{ fontSize: 48, fontWeight: 800, color: '#fff', margin: '0 0 10px', lineHeight: 1.1 }}>
          {displayUser?.name || 'Your Name'}
        </h1>
        <p style={{ color: '#94a8a8', fontSize: 15, margin: 0 }}>
          {displayUser?.role?.replace('_', ' ') || 'Both'} • {displayUser?.location || 'Location not set'}
        </p>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20, padding: '24px' }}>

        {/* Left — Public Profile */}
        <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 16, padding: '28px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#108077', textTransform: 'uppercase', marginBottom: 8 }}>PUBLIC PROFILE</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1a1a1a', marginBottom: 24 }}>Skills and reputation</h2>

          {/* Trust Score */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '14px 0', borderBottom: '1px solid rgba(0,0,0,0.06)'
          }}>
            <span style={{ fontSize: 14, color: '#555' }}>Trust score</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a' }}>
              {displayUser?.trustScore || 0}%
            </span>
          </div>

          {/* Contributions */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '14px 0', borderBottom: '1px solid rgba(0,0,0,0.06)',
            marginBottom: 20
          }}>
            <span style={{ fontSize: 14, color: '#555' }}>Contributions</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a' }}>
              {displayUser?.helpedCount || 0}
            </span>
          </div>

          {/* Skills */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a', marginBottom: 10 }}>Skills</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {displayUser?.skills?.length > 0 ? (
                displayUser.skills.map(skill => (
                  <span key={skill} style={{
                    background: 'rgba(16,128,119,0.08)',
                    color: '#108077',
                    border: '1px solid rgba(16,128,119,0.2)',
                    padding: '5px 14px', borderRadius: 20, fontSize: 13
                  }}>{skill}</span>
                ))
              ) : (
                <span style={{ color: '#aaa', fontSize: 13 }}>No skills added yet</span>
              )}
            </div>
          </div>

          {/* Badges */}
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a', marginBottom: 10 }}>Badges</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {(displayUser?.trustScore >= 10 ? badges : badges.slice(0, 1)).map(badge => (
                <span key={badge} style={{
                  background: 'rgba(16,128,119,0.06)',
                  color: '#108077',
                  border: '1px solid rgba(16,128,119,0.15)',
                  padding: '5px 14px', borderRadius: 20, fontSize: 13
                }}>{badge}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Edit Profile */}
        <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 16, padding: '28px', height: 'fit-content' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#108077', textTransform: 'uppercase', marginBottom: 8 }}>EDIT PROFILE</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#1a1a1a', marginBottom: 24, lineHeight: 1.2 }}>
            Update your identity
          </h2>

          {/* Name + Location */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Name</label>
              <input
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                placeholder="Your name"
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Location</label>
              <input
                value={form.location}
                onChange={e => setForm({...form, location: e.target.value})}
                placeholder="Karachi"
                style={inputStyle}
              />
            </div>
          </div>

          {/* Skills */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Skills</label>
            <input
              value={form.skills}
              onChange={e => setForm({...form, skills: e.target.value})}
              placeholder="Figma, UI/UX, HTML/CSS, Career Guidance"
              style={inputStyle}
            />
          </div>

          {/* Interests */}
          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>Interests</label>
            <input
              value={form.interests}
              onChange={e => setForm({...form, interests: e.target.value})}
              placeholder="Hackathons, UI/UX, Community Building"
              style={inputStyle}
            />
          </div>

          {/* Save Button */}
          <button onClick={handleSave} style={{
            width: '100%',
            background: saved
              ? '#dcfce7'
              : 'linear-gradient(135deg, #108077, #1ab5a8)',
            color: saved ? '#16a34a' : '#fff',
            border: 'none', padding: '13px',
            borderRadius: 50, fontSize: 15, fontWeight: 600,
            cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s, background 0.3s'
          }}
            onMouseEnter={e => { if (!saved) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(16,128,119,0.4)'; }}}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            {saved ? '✓ Profile saved!' : 'Save profile'}
          </button>
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