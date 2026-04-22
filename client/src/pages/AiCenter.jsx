import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AiCenter() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get('https://helplytics-ai-a3hz.vercel.app/api/requests')
      .then(r => setRequests(r.data));
  }, []);

  const highUrgency = requests.filter(r => r.urgency === 'high').length;
  const mentorPool = requests.filter(r => r.helpers?.length > 0).length;
  const trendCategory = requests.length > 0
    ? requests.reduce((acc, r) => {
        acc[r.category] = (acc[r.category] || 0) + 1;
        return acc;
      }, {})
    : {};
  const topCategory = Object.keys(trendCategory).sort((a, b) => trendCategory[b] - trendCategory[a])[0] || 'Web Development';

  const aiSummary = (req) => {
    if (req.urgency === 'high') return `${req.category || 'Web Development'} request with high urgency. Best suited for members with relevant expertise.`;
    if (req.category === 'Design') return `A visual design critique request where feedback on hierarchy, spacing, and messaging would create the most value.`;
    if (req.category === 'Career') return `Career coaching request focused on confidence-building, behavioral answers, and entry-level frontend interviews.`;
    return `Responsive layout issue with a short deadline. Best helpers are frontend mentors comfortable with CSS grids and media queries.`;
  };

  const urgencyBg = u => u === 'high' ? '#fee2e2' : u === 'medium' ? '#fef3c7' : '#dcfce7';
  const urgencyColor = u => u === 'high' ? '#dc2626' : u === 'medium' ? '#d97706' : '#16a34a';

  return (
    <div style={{ background: '#f5f0e8', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

      {/* Hero Banner */}
      <div style={{ background: '#282f31', margin: '24px 24px 0', borderRadius: 16, padding: '36px 40px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#88a0a0', textTransform: 'uppercase', marginBottom: 12 }}>AI CENTER</div>
        <h1 style={{ fontSize: 42, fontWeight: 800, color: '#fff', margin: '0 0 12px', lineHeight: 1.15 }}>
          See what the platform intelligence is noticing.
        </h1>
        <p style={{ color: '#94a8a8', fontSize: 15, margin: 0 }}>
          AI-like insights summarize demand trends, helper readiness, urgency signals, and request recommendations.
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, padding: '24px 24px 0' }}>
        {/* Trend Pulse */}
        <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 16, padding: '28px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#108077', textTransform: 'uppercase', marginBottom: 12 }}>TREND PULSE</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: '#1a1a1a', marginBottom: 10, lineHeight: 1.1 }}>{topCategory}</div>
          <p style={{ color: '#888', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            Most common support area based on active community requests.
          </p>
        </div>

        {/* Urgency Watch */}
        <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 16, padding: '28px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#108077', textTransform: 'uppercase', marginBottom: 12 }}>URGENCY WATCH</div>
          <div style={{ fontSize: 48, fontWeight: 800, color: '#1a1a1a', marginBottom: 10 }}>{highUrgency}</div>
          <p style={{ color: '#888', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            Requests currently flagged high priority by the urgency detector.
          </p>
        </div>

        {/* Mentor Pool */}
        <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 16, padding: '28px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#108077', textTransform: 'uppercase', marginBottom: 12 }}>MENTOR POOL</div>
          <div style={{ fontSize: 48, fontWeight: 800, color: '#1a1a1a', marginBottom: 10 }}>{mentorPool}</div>
          <p style={{ color: '#888', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            Trusted helpers with strong response history and contribution signals.
          </p>
        </div>
      </div>

      {/* AI Recommendations */}
      <div style={{ padding: '24px' }}>
        <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 16, padding: '28px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#108077', textTransform: 'uppercase', marginBottom: 10 }}>AI RECOMMENDATIONS</div>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: '#1a1a1a', marginBottom: 24 }}>Requests needing attention</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {requests.slice(0, 6).map((req, i) => (
              <div key={req._id} style={{
                border: '1px solid rgba(0,0,0,0.07)', borderRadius: 12,
                padding: '20px 24px',
                transition: 'border-color 0.2s'
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(16,128,119,0.3)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.07)'}
              >
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', marginBottom: 8 }}>{req.title}</h3>
                <p style={{ color: '#888', fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>
                  {aiSummary(req)}
                </p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span style={{
                    background: 'rgba(16,128,119,0.08)', color: '#108077',
                    border: '1px solid rgba(16,128,119,0.15)',
                    padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500
                  }}>{req.category || 'General'}</span>
                  <span style={{
                    background: urgencyBg(req.urgency), color: urgencyColor(req.urgency),
                    padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                    textTransform: 'capitalize'
                  }}>{req.urgency?.charAt(0).toUpperCase() + req.urgency?.slice(1)}</span>
                </div>
              </div>
            ))}

            {requests.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#aaa', fontSize: 14 }}>
                No requests yet. Community is warming up!
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}