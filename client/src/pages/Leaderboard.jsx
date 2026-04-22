import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://helplytics-ai-a3hz.vercel.app/api/requests/meta/leaderboard')
      .then(r => setUsers(r.data));
  }, []);

  const avatarColors = ['#2a5c54', '#f97316', '#3b82f6', '#8b5cf6', '#ec4899', '#10b981'];
  const getColor = (name) => avatarColors[(name?.charCodeAt(0) || 0) % avatarColors.length];
  const getInitials = (name) => name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  const badges = [
    'Code Rescuer • Bug Hunter',
    'Community Voice',
    'Design Ally',
    'Problem Solver',
    'Mentor Pro',
  ];

  const progressColor = (i) => {
    const colors = [
      { start: '#f59e0b', end: '#108077' },
      { start: '#f97316', end: '#108077' },
      { start: '#f59e0b', end: '#108077' },
      { start: '#f97316', end: '#108077' },
      { start: '#f59e0b', end: '#108077' },
    ];
    return colors[i % colors.length];
  };

  return (
    <div style={{ background: '#f5f0e8', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

      {/* Hero Banner */}
      <div style={{ background: '#282f31', margin: '24px 24px 0', borderRadius: 16, padding: '36px 40px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#88a0a0', textTransform: 'uppercase', marginBottom: 12 }}>LEADERBOARD</div>
        <h1 style={{ fontSize: 42, fontWeight: 800, color: '#fff', margin: '0 0 12px', lineHeight: 1.15 }}>
          Recognize the people who keep the community moving.
        </h1>
        <p style={{ color: '#94a8a8', fontSize: 15, margin: 0 }}>
          Trust score, contribution count, and badges create visible momentum for reliable helpers.
        </p>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, padding: '24px' }}>

        {/* Left — Rankings */}
        <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 16, padding: '28px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#108077', textTransform: 'uppercase', marginBottom: 8 }}>TOP HELPERS</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#1a1a1a', marginBottom: 24 }}>Rankings</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {users.map((u, i) => (
              <div key={u._id} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '16px 0',
                borderBottom: i < users.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none'
              }}>
                {/* Avatar */}
                <div style={{
                  width: 42, height: 42, borderRadius: '50%',
                  background: getColor(u.name),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 700, fontSize: 14, flexShrink: 0
                }}>{getInitials(u.name)}</div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a', marginBottom: 3 }}>
                    #{i + 1} {u.name}
                  </div>
                  <div style={{ fontSize: 12, color: '#aaa' }}>
                    {u.skills?.slice(0, 3).join(', ') || 'Community Helper'}
                  </div>
                </div>

                {/* Score */}
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a' }}>{u.trustScore}%</div>
                  <div style={{ fontSize: 12, color: '#aaa' }}>{u.helpedCount || 0} contributions</div>
                </div>
              </div>
            ))}

            {users.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#aaa', fontSize: 14 }}>
                No helpers yet. Be the first!
              </div>
            )}
          </div>
        </div>

        {/* Right — Badge System */}
        <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 16, padding: '28px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#108077', textTransform: 'uppercase', marginBottom: 8 }}>BADGE SYSTEM</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#1a1a1a', marginBottom: 24 }}>Trust and achievement</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {users.map((u, i) => {
              const pc = progressColor(i);
              const progress = Math.min(100, (u.trustScore || 0));
              return (
                <div key={u._id} style={{
                  padding: '16px 0',
                  borderBottom: i < users.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none'
                }}>
                  {/* Progress Bar */}
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ height: 8, background: '#f0f0f0', borderRadius: 10, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', width: `${progress}%`,
                        background: `linear-gradient(90deg, ${pc.start}, ${pc.end})`,
                        borderRadius: 10, transition: 'width 0.6s ease'
                      }} />
                    </div>
                  </div>

                  {/* Name + Badge */}
                  <div style={{ fontWeight: 700, fontSize: 16, color: '#1a1a1a', marginBottom: 4 }}>{u.name}</div>
                  <div style={{ fontSize: 16, color: '#aaa' }}>{badges[i % badges.length]}</div>
                </div>
              );
            })}

            {users.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#aaa', fontSize: 14 }}>
                No badges yet. Start helping!
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}