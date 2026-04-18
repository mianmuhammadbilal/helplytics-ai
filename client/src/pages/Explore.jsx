import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Explore() {
  const [requests, setRequests] = useState([]);
  const [urgency, setUrgency] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const params = urgency ? `?urgency=${urgency}` : '';
    axios.get(`https://helplytics-ai-a3hz.vercel.app/api/requests${params}`).then(r => setRequests(r.data));
  }, [urgency]);

  const urgencyColor = u => u === 'high' ? '#ef4444' : u === 'medium' ? '#f59e0b' : '#22c55e';
  const urgencyBg = u => u === 'high' ? 'rgba(239,68,68,0.1)' : u === 'medium' ? 'rgba(245,158,11,0.1)' : 'rgba(34,197,94,0.1)';

  return (
    <div style={{ background: '#050508', minHeight: '100vh', padding: '40px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>Explore Requests</h1>
            <p style={{ color: '#64748b', fontSize: 14 }}>{requests.length} requests from the community</p>
          </div>
          {/* Filters */}
          <div style={{ display: 'flex', gap: 8 }}>
            {['', 'high', 'medium', 'low'].map(u => (
              <button key={u} onClick={() => setUrgency(u)} style={{
                padding: '7px 14px', borderRadius: 8, fontSize: 13,
                border: `1px solid ${urgency === u ? '#6366f1' : 'rgba(255,255,255,0.08)'}`,
                background: urgency === u ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.03)',
                color: urgency === u ? '#818cf8' : '#64748b',
                cursor: 'pointer', transition: 'all 0.2s'
              }}>
                {u === '' ? 'All' : u === 'high' ? '🔴 High' : u === 'medium' ? '🟡 Medium' : '🟢 Low'}
              </button>
            ))}
          </div>
        </div>

        {/* Request Cards */}
        <div style={{ display: 'grid', gap: 12 }}>
          {requests.map(req => (
            <div key={req._id} onClick={() => navigate(`/request/${req._id}`)}
              style={{
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 16, padding: 22, cursor: 'pointer', transition: 'all 0.2s'
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.35)'; e.currentTarget.style.background = 'rgba(99,102,241,0.04)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, flex: 1, paddingRight: 16 }}>{req.title}</h3>
                <span style={{
                  background: urgencyBg(req.urgency), color: urgencyColor(req.urgency),
                  padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap'
                }}>{req.urgency}</span>
              </div>

              <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6, marginBottom: 14 }}>
                {req.description?.substring(0, 130)}...
              </p>

              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                {req.tags?.slice(0, 3).map(tag => (
                  <span key={tag} style={{
                    background: 'rgba(99,102,241,0.1)', color: '#818cf8',
                    padding: '3px 10px', borderRadius: 6, fontSize: 12
                  }}>#{tag}</span>
                ))}
                {req.category && (
                  <span style={{
                    background: 'rgba(168,85,247,0.1)', color: '#c084fc',
                    padding: '3px 10px', borderRadius: 6, fontSize: 12
                  }}>{req.category}</span>
                )}
                <span style={{ color: '#334155', fontSize: 12, marginLeft: 'auto' }}>
                  by {req.author?.name || 'Community'} · {req.helpers?.length || 0} helpers
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}