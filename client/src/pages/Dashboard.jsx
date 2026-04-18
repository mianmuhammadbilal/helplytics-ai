import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://helplytics-ai-a3hz.vercel.app/api/requests').then(r => setRequests(r.data.slice(0, 6)));
  }, []);

  const stats = [
    { label: 'Open Requests', value: requests.filter(r => r.status === 'open').length, icon: '🔓', color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
    { label: 'In Progress', value: requests.filter(r => r.status === 'in_progress').length, icon: '⚡', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
    { label: 'Solved', value: requests.filter(r => r.status === 'solved').length, icon: '✅', color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
    { label: 'Trust Score', value: user?.trustScore || 0, icon: '⭐', color: '#ec4899', bg: 'rgba(236,72,153,0.1)' },
  ];

  const urgencyColor = u => u === 'high' ? '#ef4444' : u === 'medium' ? '#f59e0b' : '#22c55e';
  const urgencyBg = u => u === 'high' ? 'rgba(239,68,68,0.1)' : u === 'medium' ? 'rgba(245,158,11,0.1)' : 'rgba(34,197,94,0.1)';

  return (
    <div style={{ background: '#050508', minHeight: '100vh', padding: '40px 24px' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 6 }}>
            Welcome back, <span style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{user?.name}</span> 👋
          </h1>
          <p style={{ color: '#64748b', fontSize: 15 }}>Here's what's happening in your community today.</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
          {stats.map(s => (
            <div key={s.label} style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16, padding: 20
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{s.icon}</div>
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: s.color, marginBottom: 4 }}>{s.value}</div>
              <div style={{ color: '#64748b', fontSize: 13 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
          <button onClick={() => navigate('/create')} style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff',
            border: 'none', padding: '11px 22px', borderRadius: 10, fontWeight: 600, fontSize: 14
          }}>+ Post Request</button>
          <button onClick={() => navigate('/explore')} style={{
            background: 'rgba(255,255,255,0.05)', color: '#94a3b8',
            border: '1px solid rgba(255,255,255,0.08)', padding: '11px 22px', borderRadius: 10, fontSize: 14
          }}>Browse Feed</button>
          <button onClick={() => navigate('/leaderboard')} style={{
            background: 'rgba(255,255,255,0.05)', color: '#94a3b8',
            border: '1px solid rgba(255,255,255,0.08)', padding: '11px 22px', borderRadius: 10, fontSize: 14
          }}>🏆 Leaderboard</button>
        </div>

        {/* Recent Requests */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600 }}>Recent Requests</h2>
            <span onClick={() => navigate('/explore')} style={{ color: '#6366f1', fontSize: 13, cursor: 'pointer' }}>View all →</span>
          </div>
          <div style={{ display: 'grid', gap: 10 }}>
            {requests.map(req => (
              <div key={req._id} onClick={() => navigate(`/request/${req._id}`)}
                style={{
                  background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 12, padding: '16px 20px', cursor: 'pointer',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  transition: 'border-color 0.2s, background 0.2s'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'; e.currentTarget.style.background = 'rgba(99,102,241,0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, marginBottom: 4, fontSize: 15 }}>{req.title}</div>
                  <div style={{ color: '#64748b', fontSize: 13 }}>by {req.author?.name || 'Community'}</div>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{
                    background: urgencyBg(req.urgency), color: urgencyColor(req.urgency),
                    padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 500
                  }}>{req.urgency}</span>
                  <span style={{
                    background: 'rgba(99,102,241,0.1)', color: '#818cf8',
                    padding: '3px 10px', borderRadius: 20, fontSize: 12
                  }}>{req.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}