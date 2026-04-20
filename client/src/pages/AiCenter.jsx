export default function AiCenter() {
  const insights = [
    { label: 'Most requested category', value: 'Web Development', icon: '📊' },
    { label: 'Trending skill this week', value: 'React & Tailwind', icon: '🔥' },
    { label: 'Top helper category', value: 'Design Ally', icon: '🏆' },
    { label: 'AI detected rising demand', value: 'Interview Prep', icon: '🤖' },
  ];

  return (
    <div style={{ background: '#f5f0e8', minHeight: '100vh', padding: '40px 24px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ background: '#2a3132', borderRadius: 16, padding: '36px 40px', marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#88a0a0', textTransform: 'uppercase', marginBottom: 12 }}>AI CENTER</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#fff', margin: '0 0 10px' }}>AI Insights & Trends</h1>
          <p style={{ color: '#94a8a8', fontSize: 15, margin: 0 }}>Real-time intelligence from community activity, request patterns, and helper behavior.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {insights.map(item => (
            <div key={item.label} style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 14, padding: '28px' }}>
              <div style={{ fontSize: 32, marginBottom: 14 }}>{item.icon}</div>
              <div style={{ fontSize: 12, color: '#888', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>{item.label}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#1a1a1a' }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}