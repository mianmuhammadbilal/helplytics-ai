export default function Notifications() {
  const notifications = [
    { title: 'New helper matched to your responsive portfolio request', sub: 'Match • 12 min ago', status: 'Unread', color: '#108077', bg: '#e6f4f3' },
    { title: 'Your trust score increased after a solved request', sub: 'Reputation • 1 hr ago', status: 'Unread', color: '#108077', bg: '#e6f4f3' },
    { title: 'AI Center detected rising demand for interview prep', sub: 'Insight • Today', status: 'Read', color: '#888', bg: '#f0f0f0' },
  ];

  return (
    <div style={{ background: '#f5f0e8', minHeight: '100vh', padding: '40px 24px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#888', textTransform: 'uppercase', marginBottom: 8 }}>NOTIFICATIONS</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#1a1a1a', marginBottom: 24 }}>Latest updates</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {notifications.map((n, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 14, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', marginBottom: 4 }}>{n.title}</div>
                <div style={{ fontSize: 12, color: '#aaa' }}>{n.sub}</div>
              </div>
              <span style={{ background: n.bg, color: n.color, padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', marginLeft: 16 }}>{n.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}