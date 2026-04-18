import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Explore() {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState({ urgency: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(filter).toString();
    axios.get(`http://localhost:5000/api/requests?${params}`)
      .then(r => setRequests(r.data));
  }, [filter]);

  const urgencyColor = u => u === 'high' ? '#ef4444' : u === 'medium' ? '#f59e0b' : '#22c55e';

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <div>
            <h2 style={{ color: '#fff', margin: 0 }}>Explore Requests</h2>
            <p style={{ color: '#888', fontSize: 14, margin: '4px 0 0' }}>{requests.length} open requests</p>
          </div>
          <select value={filter.urgency} onChange={e => setFilter({...filter, urgency: e.target.value})}
            style={{ background: '#111', border: '1px solid #333', color: '#fff', padding: '8px 12px', borderRadius: 8 }}>
            <option value="">All Urgency</option>
            <option value="high">🔴 High</option>
            <option value="medium">🟡 Medium</option>
            <option value="low">🟢 Low</option>
          </select>
        </div>

        {requests.map(req => (
          <div key={req._id} onClick={() => navigate(`/request/${req._id}`)}
            style={{ background: '#111', border: '1px solid #1f1f1f', borderRadius: 12, padding: 20, marginBottom: 12, cursor: 'pointer', transition: 'border-color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#7c6df1'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#1f1f1f'}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <h3 style={{ color: '#fff', margin: 0, fontSize: 16 }}>{req.title}</h3>
              <span style={{ color: urgencyColor(req.urgency), fontSize: 12, background: '#1a1a1a', padding: '3px 8px', borderRadius: 10 }}>
                {req.urgency}
              </span>
            </div>
            <p style={{ color: '#888', fontSize: 13, margin: '0 0 12px', lineHeight: 1.5 }}>
              {req.description.substring(0, 120)}...
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {req.tags?.map(tag => (
                <span key={tag} style={{ background: '#1a1a2e', color: '#7c6df1', padding: '3px 8px', borderRadius: 6, fontSize: 12 }}>#{tag}</span>
              ))}
              <span style={{ color: '#555', fontSize: 12, marginLeft: 'auto' }}>by {req.author?.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}