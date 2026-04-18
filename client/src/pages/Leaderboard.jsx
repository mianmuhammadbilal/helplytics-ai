import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/requests/meta/leaderboard')
      .then(r => setUsers(r.data));
  }, []);

  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: 4 }}>🏆 Leaderboard</h2>
        <p style={{ color: '#888', textAlign: 'center', marginBottom: 32, fontSize: 14 }}>Top community helpers this month</p>

        {users.map((u, i) => (
          <div key={u._id} style={{
            background: i < 3 ? '#111' : '#0d0d0d',
            border: `1px solid ${i === 0 ? '#f59e0b33' : '#1f1f1f'}`,
            borderRadius: 12, padding: '16px 20px', marginBottom: 10,
            display: 'flex', alignItems: 'center', gap: 16
          }}>
            <span style={{ fontSize: 24, width: 32 }}>{medals[i] || `#${i + 1}`}</span>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#fff', fontWeight: 600 }}>{u.name}</div>
              <div style={{ color: '#888', fontSize: 12 }}>{u.helpedCount} people helped</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#7c6df1', fontWeight: 700, fontSize: 18 }}>{u.trustScore}</div>
              <div style={{ color: '#555', fontSize: 11 }}>trust score</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}