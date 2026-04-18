import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://helplytics-ai-a3hz.vercel.app/api/requests/meta/leaderboard').then(r => setUsers(r.data));
  }, []);

  const medals = ['🥇', '🥈', '🥉'];
  const rankColors = ['#f59e0b', '#94a3b8', '#cd7c2f'];

  return (
    <div style={{ background: '#050508', minHeight: '100vh', padding: '40px 24px' }}>
      <div style={{ maxWidth: 620, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏆</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Community Leaderboard</h1>
          <p style={{ color: '#64748b', fontSize: 15 }}>Top helpers making a difference</p>
        </div>

        {/* Top 3 special */}
        {users.slice(0, 3).length > 0 && (
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 24, flexWrap: 'wrap' }}>
            {users.slice(0, 3).map((u, i) => (
              <div key={u._id} style={{
                background: `rgba(${i === 0 ? '245,158,11' : i === 1 ? '148,163,184' : '205,124,47'},0.08)`,
                border: `1px solid rgba(${i === 0 ? '245,158,11' : i === 1 ? '148,163,184' : '205,124,47'},0.2)`,
                borderRadius: 16, padding: '20px 24px', textAlign: 'center', flex: 1, minWidth: 140
              }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{medals[i]}</div>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, margin: '0 auto 10px' }}>
                  {u.name?.charAt(0)}
                </div>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{u.name}</div>
                <div style={{ color: rankColors[i], fontSize: 20, fontWeight: 700 }}>{u.trustScore}</div>
                <div style={{ color: '#475569', fontSize: 11 }}>trust score</div>
              </div>
            ))}
          </div>
        )}

        {/* Rest */}
        <div style={{ display: 'grid', gap: 8 }}>
          {users.slice(3).map((u, i) => (
            <div key={u._id} style={{
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 12, padding: '14px 20px',
              display: 'flex', alignItems: 'center', gap: 14
            }}>
              <span style={{ color: '#334155', fontSize: 15, fontWeight: 600, width: 28 }}>#{i + 4}</span>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#818cf8' }}>
                {u.name?.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, fontSize: 14 }}>{u.name}</div>
                <div style={{ color: '#475569', fontSize: 12 }}>{u.helpedCount} people helped</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#6366f1', fontWeight: 700, fontSize: 16 }}>{u.trustScore}</div>
                <div style={{ color: '#334155', fontSize: 11 }}>pts</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}