import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://helplytics-ai-a3hz.vercel.app/api/requests')
      .then(r => setRequests(r.data.slice(0, 3)));
  }, []);

  const urgencyColor = u => u === 'high' ? '#dc2626' : u === 'medium' ? '#d97706' : '#16a34a';
  const urgencyBg = u => u === 'high' ? '#fee2e2' : u === 'medium' ? '#fef3c7' : '#dcfce7';
  const statusBg = s => s === 'solved' ? '#dcfce7' : '#f0f0f0';
  const statusColor = s => s === 'solved' ? '#16a34a' : '#555';

  const stats = [
    { label: 'TRUST SCORE', value: `${user?.trustScore || 92}%`, desc: 'Driven by solved requests and consistent support.' },
    { label: 'HELPING', value: user?.helpedCount || 2, desc: 'Requests where you are currently listed as a helper.' },
    { label: 'OPEN REQUESTS', value: requests.filter(r => r.status === 'open').length || 2, desc: 'Community requests currently active across the feed.' },
    { label: 'AI PULSE', value: '1 trends', desc: 'Trend count detected in the latest request activity.' },
  ];

  const notifications = [
    { title: 'New helper matched to your responsive portfolio request', sub: 'Match • 12 min ago', status: 'Unread', statusColor: '#108077', statusBg: '#e6f4f3' },
    { title: 'Your trust score increased after a solved request', sub: 'Reputation • 1 hr ago', status: 'Unread', statusColor: '#108077', statusBg: '#e6f4f3' },
    { title: 'AI Center detected rising demand for interview prep', sub: 'Insight • Today', status: 'Read', statusColor: '#888', statusBg: '#f0f0f0' },
  ];

  return (
    <div style={{ background: '#f5f0e8', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

      {/* Welcome Banner */}
      <div style={{ background: '#2a3132', margin: '24px 24px 0', borderRadius: 16, padding: '36px 40px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#88a0a0', textTransform: 'uppercase', marginBottom: 12 }}>DASHBOARD</div>
        <h1 style={{ fontSize: 40, fontWeight: 800, color: '#fff', margin: '0 0 10px' }}>
          Welcome back, {user?.name || 'User'}.
        </h1>
        <p style={{ color: '#94a8a8', fontSize: 15, margin: 0 }}>
          Your command center for requests, AI insights, helper momentum, and live community activity.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, padding: '24px 24px 0' }}>
        {stats.map(s => (
          <div key={s.label} style={{
            background: '#fff', border: '1px solid rgba(0,0,0,0.07)',
            borderRadius: 14, padding: '24px'
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#888', marginBottom: 10, textTransform: 'uppercase' }}>{s.label}</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#1a1a1a', marginBottom: 8 }}>{s.value}</div>
            <div style={{ fontSize: 13, color: '#888', lineHeight: 1.5 }}>{s.desc}</div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20, padding: '24px' }}>

        {/* Left — Recent Requests */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#888', textTransform: 'uppercase', marginBottom: 8 }}>RECENT REQUESTS</div>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: '#1a1a1a', lineHeight: 1.2, margin: 0 }}>What the community needs right now</h2>
            </div>
            <button onClick={() => navigate('/explore')} style={{
              background: '#fff', border: '1px solid rgba(0,0,0,0.12)',
              padding: '10px 16px', borderRadius: 10, fontSize: 13,
              cursor: 'pointer', fontWeight: 500, whiteSpace: 'nowrap', marginLeft: 16
            }}>Go to feed</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {requests.map(req => (
              <div key={req._id} style={{
                background: '#fff', border: '1px solid rgba(0,0,0,0.07)',
                borderRadius: 14, padding: '20px'
              }}>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                  <span style={{ background: '#f0f0f0', color: '#444', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 500 }}>{req.category || 'General'}</span>
                  <span style={{ background: urgencyBg(req.urgency), color: urgencyColor(req.urgency), padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, textTransform: 'capitalize' }}>{req.urgency}</span>
                  <span style={{ background: statusBg(req.status), color: statusColor(req.status), padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 500, textTransform: 'capitalize' }}>{req.status}</span>
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', marginBottom: 8 }}>{req.title}</h3>
                <p style={{ color: '#888', fontSize: 13, lineHeight: 1.5, marginBottom: 12 }}>{req.description?.substring(0, 100)}...</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                  {req.tags?.slice(0, 3).map(tag => (
                    <span key={tag} style={{ background: '#f5f5f5', color: '#555', padding: '3px 10px', borderRadius: 20, fontSize: 12 }}>{tag}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>{req.author?.name || 'Community'}</div>
                    <div style={{ fontSize: 12, color: '#aaa' }}>Karachi • {req.helpers?.length || 1} helper interested</div>
                  </div>
                  <button onClick={() => navigate(`/request/${req._id}`)} style={{
                    background: 'transparent', border: '1px solid rgba(0,0,0,0.15)',
                    padding: '7px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontWeight: 500
                  }}>Open details</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* AI Insights */}
          <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 14, padding: '24px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#888', textTransform: 'uppercase', marginBottom: 12 }}>AI INSIGHTS</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1a1a1a', marginBottom: 20 }}>Suggested actions for you</h3>
            {[
              { label: 'Most requested category', value: 'Web Development' },
              { label: 'Your strongest trust driver', value: 'Design Ally' },
              { label: 'AI says you can mentor in', value: 'HTML/CSS, UI/UX, Career Guidance, Figma' },
              { label: 'Your active requests', value: '1' },
            ].map(item => (
              <div key={item.label} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                padding: '12px 0', borderBottom: '1px solid rgba(0,0,0,0.06)'
              }}>
                <span style={{ fontSize: 13, color: '#888', flex: 1 }}>{item.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a', textAlign: 'right', maxWidth: 160 }}>{item.value}</span>
              </div>
            ))}
          </div>

          {/* Notifications */}
          <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 14, padding: '24px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#888', textTransform: 'uppercase', marginBottom: 12 }}>NOTIFICATIONS</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1a1a1a', marginBottom: 16 }}>Latest updates</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {notifications.map((n, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                  padding: '12px 0', borderBottom: i < notifications.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none'
                }}>
                  <div style={{ flex: 1, paddingRight: 12 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.4, marginBottom: 4 }}>{n.title}</div>
                    <div style={{ fontSize: 12, color: '#aaa' }}>{n.sub}</div>
                  </div>
                  <span style={{
                    background: n.statusBg, color: n.statusColor,
                    padding: '3px 10px', borderRadius: 20, fontSize: 11,
                    fontWeight: 600, whiteSpace: 'nowrap'
                  }}>{n.status}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}