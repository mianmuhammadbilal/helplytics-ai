import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Explore() {
  const [requests, setRequests] = useState([]);
  const [filters, setFilters] = useState({ urgency: '', category: '', skills: '', location: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.urgency) params.append('urgency', filters.urgency);
    if (filters.category) params.append('category', filters.category);
    axios.get(`https://helplytics-ai-a3hz.vercel.app/api/requests?${params}`)
      .then(r => setRequests(r.data));
  }, [filters]);

  const urgencyColor = u => u === 'high' ? '#dc2626' : u === 'medium' ? '#d97706' : '#16a34a';
  const urgencyBg = u => u === 'high' ? '#fee2e2' : u === 'medium' ? '#fef3c7' : '#dcfce7';
  const statusBg = s => s === 'solved' ? '#dcfce7' : '#f0f0f0';
  const statusColor = s => s === 'solved' ? '#16a34a' : '#555';

  const filtered = requests.filter(r => {
    if (filters.skills && !r.tags?.some(t => t.toLowerCase().includes(filters.skills.toLowerCase()))) return false;
    if (filters.location && !r.author?.location?.toLowerCase().includes(filters.location.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ background: '#f5f0e8', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

      {/* Hero Banner */}
      <div style={{ background: '#282f31', margin: '24px 24px 0', borderRadius: 16, padding: '36px 40px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#88a0a0', textTransform: 'uppercase', marginBottom: 12 }}>EXPLORE / FEED</div>
        <h1 style={{ fontSize: 40, fontWeight: 800, color: '#fff', margin: '0 0 10px', lineHeight: 1.15 }}>
          Browse help requests with filterable community context.
        </h1>
        <p style={{ color: '#94a8a8', fontSize: 15, margin: 0 }}>
          Filter by category, urgency, skills, and location to surface the best matches.
        </p>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 20, padding: '24px' }}>

        {/* Left — Filters */}
        <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 16, padding: '28px 24px', height: 'fit-content' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#888', textTransform: 'uppercase', marginBottom: 10 }}>FILTERS</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1a1a1a', marginBottom: 20 }}>Refine the feed</h2>

          {/* Category */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Category</label>
            <select value={filters.category} onChange={e => setFilters({...filters, category: e.target.value})} style={inputStyle}>
              <option value="">All categories</option>
              <option value="Programming">Programming</option>
              <option value="Design">Design</option>
              <option value="Database">Database</option>
              <option value="Web Development">Web Development</option>
              <option value="Career">Career</option>
              <option value="General">General</option>
            </select>
          </div>

          {/* Urgency */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Urgency</label>
            <select value={filters.urgency} onChange={e => setFilters({...filters, urgency: e.target.value})} style={inputStyle}>
              <option value="">All urgency levels</option>
              <option value="high">🔴 High</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🟢 Low</option>
            </select>
          </div>

          {/* Skills */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Skills</label>
            <input
              placeholder="React, Figma, Git/GitHub"
              value={filters.skills}
              onChange={e => setFilters({...filters, skills: e.target.value})}
              style={inputStyle}
            />
          </div>

          {/* Location */}
          <div style={{ marginBottom: 8 }}>
            <label style={labelStyle}>Location</label>
            <input
              placeholder="Karachi, Lahore, Remote"
              value={filters.location}
              onChange={e => setFilters({...filters, location: e.target.value})}
              style={inputStyle}
            />
          </div>

          {/* Clear */}
          {(filters.urgency || filters.category || filters.skills || filters.location) && (
            <button onClick={() => setFilters({ urgency: '', category: '', skills: '', location: '' })} style={{
              width: '100%', marginTop: 12, background: 'rgba(17,94,89,0.08)',
              color: '#115e59', border: '1px solid rgba(17,94,89,0.2)',
              padding: '9px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer'
            }}>Clear filters</button>
          )}
        </div>

        {/* Right — Request Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.length === 0 && (
            <div style={{ background: '#fff', borderRadius: 14, padding: '40px', textAlign: 'center', color: '#888' }}>
              No requests found. Try adjusting filters.
            </div>
          )}
          {filtered.map(req => (
            <div key={req._id} style={{
              background: '#fff', border: '1px solid rgba(0,0,0,0.07)',
              borderRadius: 14, padding: '22px 24px'
            }}>
              {/* Tags */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                <span style={{ background: '#f0f0f0', color: '#444', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 500 }}>{req.category || 'General'}</span>
                <span style={{ background: urgencyBg(req.urgency), color: urgencyColor(req.urgency), padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, textTransform: 'capitalize' }}>{req.urgency}</span>
                <span style={{ background: statusBg(req.status), color: statusColor(req.status), padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 500, textTransform: 'capitalize' }}>{req.status}</span>
              </div>

              {/* Title */}
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1a1a1a', marginBottom: 8 }}>{req.title}</h3>

              {/* Description */}
              <p style={{ color: '#888', fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>
                {req.description?.substring(0, 120)}...
              </p>

              {/* Skill Tags */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                {req.tags?.slice(0, 3).map(tag => (
                  <span key={tag} style={{ background: '#f5f5f5', color: '#555', padding: '3px 10px', borderRadius: 20, fontSize: 12 }}>{tag}</span>
                ))}
              </div>

              {/* Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>{req.author?.name || 'Community'}</div>
                  <div style={{ fontSize: 12, color: '#aaa' }}>Karachi • {req.helpers?.length || 1} helper interested</div>
                </div>
                <button onClick={() => navigate(`/request/${req._id}`)} style={{
                  background: 'transparent', border: '1px solid rgba(0,0,0,0.15)',
                  padding: '7px 16px', borderRadius: 8, fontSize: 13,
                  cursor: 'pointer', fontWeight: 500, color: '#1a1a1a',
                  transition: 'all 0.2s'
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(17,94,89,0.08)'; e.currentTarget.style.borderColor = '#115e59'; e.currentTarget.style.color = '#115e59'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)'; e.currentTarget.style.color = '#1a1a1a'; }}
                >Open details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%', background: '#f9f9f9',
  border: '1px solid rgba(0,0,0,0.1)', borderRadius: 8,
  padding: '9px 12px', color: '#1a1a1a', fontSize: 13,
  outline: 'none', boxSizing: 'border-box',
  fontFamily: 'Inter, sans-serif', appearance: 'auto'
};

const labelStyle = {
  display: 'block', fontSize: 12, fontWeight: 600,
  color: '#555', marginBottom: 6
};