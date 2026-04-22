import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Notifications() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const isGuest = !token;

  const [notifications, setNotifications] = useState([
    { title: 'New helper matched to your responsive portfolio request', sub: 'Match • 12 min ago', status: 'Unread' },
    { title: 'Your trust score increased after a solved request', sub: 'Reputation • 1 hr ago', status: 'Unread' },
    { title: 'AI Center detected rising demand for interview prep', sub: 'Insight • Today', status: 'Read' },
  ]);

  useEffect(() => {
    axios.get('https://helplytics-ai-a3hz.vercel.app/api/requests')
      .then(r => {
        const reqs = r.data;
        const dynamic = reqs.flatMap(req => {
          const notifs = [];
          if (req.status === 'solved') {
            notifs.push({
              title: `"${req.title}" was marked as solved`,
              sub: 'Status • Just now',
              status: 'Unread'
            });
          }
          if (req.helpers?.length > 0) {
            notifs.push({
              title: `${req.author?.name || 'Someone'} offered help on "${req.title}"`,
              sub: 'Match • Just now',
              status: 'Unread'
            });
          }
          notifs.push({
            title: `Your request "${req.title}" is now live in the community feed`,
            sub: 'Request • Just now',
            status: 'Unread'
          });
          return notifs;
        });
        setNotifications(prev => [...dynamic, ...prev]);
      });
  }, []);

  // Guest ke liye sirf show, click pe login
  const markRead = (index) => {
    if (isGuest) return; // Guest click pe kuch na ho
    setNotifications(prev =>
      prev.map((n, i) => i === index ? { ...n, status: 'Read' } : n)
    );
  };

  const markAllRead = () => {
    if (isGuest) return;
    setNotifications(prev => prev.map(n => ({ ...n, status: 'Read' })));
  };

  const unreadCount = notifications.filter(n => n.status === 'Unread').length;

  return (
    <div style={{ background: '#f5f0e8', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

      {/* Hero Banner */}
      <div style={{ background: '#282f31', margin: '24px 24px 0', borderRadius: 16, padding: '36px 40px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#88a0a0', textTransform: 'uppercase', marginBottom: 12 }}>NOTIFICATIONS</div>
        <h1 style={{ fontSize: 42, fontWeight: 800, color: '#fff', margin: '0 0 12px', lineHeight: 1.15 }}>
          Stay updated on requests, helpers, and trust signals.
        </h1>
        <p style={{ color: '#94a8a8', fontSize: 15, margin: 0 }}>
          Every match, status change, and community signal shows up here in real time.
        </p>
      </div>

      {/* Guest Banner */}
      {isGuest && (
        <div style={{
          margin: '16px 24px 0',
          background: 'rgba(16,128,119,0.08)',
          border: '1px solid rgba(16,128,119,0.2)',
          borderRadius: 12, padding: '14px 20px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div>
            <span style={{ fontSize: 14, color: '#108077', fontWeight: 600 }}>👀 You're viewing as a guest</span>
            <span style={{ fontSize: 13, color: '#888', marginLeft: 8 }}>Login to interact with notifications</span>
          </div>
          <button onClick={() => navigate('/auth')} style={{
            background: 'linear-gradient(135deg, #108077, #1ab5a8)',
            color: '#fff', border: 'none', padding: '8px 18px',
            borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer'
          }}>Login</button>
        </div>
      )}

      {/* Main Card */}
      <div style={{ padding: '24px' }}>
        <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 16, padding: '28px' }}>

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#108077', textTransform: 'uppercase', marginBottom: 6 }}>LIVE UPDATES</div>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1a1a1a', margin: 0 }}>
                Notification feed
                {unreadCount > 0 && (
                  <span style={{
                    display: 'inline-block', marginLeft: 10,
                    background: '#108077', color: '#fff',
                    fontSize: 12, fontWeight: 700,
                    padding: '2px 10px', borderRadius: 20,
                    verticalAlign: 'middle'
                  }}>{unreadCount}</span>
                )}
              </h2>
            </div>
            {/* Mark all read — sirf logged in user ke liye */}
            {unreadCount > 0 && !isGuest && (
              <button onClick={markAllRead} style={{
                background: 'rgba(16,128,119,0.08)', color: '#108077',
                border: '1px solid rgba(16,128,119,0.2)',
                padding: '7px 16px', borderRadius: 8,
                fontSize: 13, fontWeight: 500, cursor: 'pointer'
              }}>Mark all read</button>
            )}
          </div>

          {/* Notification List */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {notifications.map((n, i) => (
              <div
                key={i}
                onClick={() => markRead(i)}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '18px 0',
                  borderBottom: i < notifications.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
                  cursor: isGuest ? 'default' : 'pointer',
                  borderRadius: 8,
                }}
                onMouseEnter={e => {
                  if (!isGuest) e.currentTarget.style.background = 'rgba(16,128,119,0.03)';
                }}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ flex: 1, paddingRight: 16 }}>
                  <div style={{
                    fontSize: 14,
                    fontWeight: n.status === 'Unread' ? 600 : 400,
                    color: '#1a1a1a', marginBottom: 4, lineHeight: 1.4
                  }}>{n.title}</div>
                  <div style={{ fontSize: 12, color: '#aaa' }}>{n.sub}</div>
                </div>
                <span style={{
                  fontSize: 13, fontWeight: 500,
                  color: n.status === 'Unread' ? '#108077' : '#aaa',
                  whiteSpace: 'nowrap'
                }}>{n.status}</span>
              </div>
            ))}
          </div>

          {/* Guest CTA bottom */}
          {isGuest && (
            <div style={{
              marginTop: 20, padding: '20px',
              background: '#f9f7f3', borderRadius: 12,
              textAlign: 'center'
            }}>
              <p style={{ color: '#888', fontSize: 14, marginBottom: 12 }}>
                Want to interact with notifications? Join the community!
              </p>
              <button onClick={() => navigate('/auth')} style={{
                background: 'linear-gradient(135deg, #108077, #1ab5a8)',
                color: '#fff', border: 'none', padding: '10px 28px',
                borderRadius: 50, fontSize: 14, fontWeight: 600, cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >Join the platform →</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}