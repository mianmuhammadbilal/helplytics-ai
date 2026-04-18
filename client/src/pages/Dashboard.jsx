import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, token } = useAuth();
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/requests')
      .then(r => setRequests(r.data.slice(0, 5)));
  }, []);

  const stats = [
    { label: 'Open Requests', value: requests.filter(r => r.status === 'open').length, icon: '🔓', color: '#7c6df1' },
    { label: 'In Progress', value: requests.filter(r => r.status === 'in_progress').length, icon: '⚡', color: '#f59e0b' },
    { label: 'Solved Today', value: requests.filter(r => r.status === 'solved').length, icon: '✅', color: '#22c55e' },
    { label: 'Your Score', value: user?.trustScore || 0, icon: '⭐', color: '#ec4899' },
  ];

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ color: '#fff', marginBottom: 4 }}>Welcome back, {user?.name} 👋</h2>
        <p style={{ color: '#888', marginBottom: 28, fontSize: 14 }}>Here's what's happening in your community</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: '#111', border: '1px solid #1f1f1f', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.value}</div>
              <div style={{ color: '#888', fontSize: 13 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
          <button onClick={() => navigate('/create')} style={{ background: '#7c6df1', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 8, cursor: 'pointer' }}>+ New Request</button>
          <button onClick={() => navigate('/explore')} style={{ background: '#111', color: '#fff', border: '1px solid #333', padding: '10px 20px', borderRadius: 8, cursor: 'pointer' }}>Browse Requests</button>
        </div>

        <h3 style={{ color: '#fff', marginBottom: 16 }}>Recent Requests</h3>
        {requests.map(req => (
          <div key={req._id} onClick={() => navigate(`/request/${req._id}`)}
            style={{ background: '#111', border: '1px solid #1f1f1f', borderRadius: 10, padding: 16, marginBottom: 8, cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#fff', fontSize: 14 }}>{req.title}</span>
            <span style={{ color: req.status === 'solved' ? '#22c55e' : '#7c6df1', fontSize: 12 }}>{req.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}