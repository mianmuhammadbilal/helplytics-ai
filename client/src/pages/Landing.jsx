import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#050508', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{ position: 'relative', overflow: 'hidden', padding: '120px 20px 80px', textAlign: 'center' }}>
        {/* Glow background */}
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)',
          padding: '6px 16px', borderRadius: 20, fontSize: 13, color: '#a5b4fc', marginBottom: 32
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1', display: 'inline-block' }} />
        </div>

        <h1 style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, marginBottom: 24, maxWidth: 700, margin: '0 auto 24px' }}>
          Find help faster.{' '}
          <span style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Become help
          </span>
          {' '}that matters.
        </h1>

        <p style={{ color: '#94a3b8', fontSize: 18, maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.7 }}>
          AI-powered community where students connect, share skills, and solve problems together in real time.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/auth')} style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: '#fff', border: 'none', padding: '14px 28px',
            borderRadius: 10, fontSize: 15, fontWeight: 600,
            boxShadow: '0 0 30px rgba(99,102,241,0.4)'
          }}>
            Join the Community →
          </button>
          <button onClick={() => navigate('/explore')} style={{
            background: 'rgba(255,255,255,0.05)', color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)', padding: '14px 28px',
            borderRadius: 10, fontSize: 15, fontWeight: 600
          }}>
            Explore Requests
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 2, padding: '0 20px 80px', flexWrap: 'wrap' }}>
        {[
          { num: '1,240+', label: 'Community Members', icon: '👥' },
          { num: '3,800+', label: 'Problems Solved', icon: '✅' },
          { num: '98%', label: 'Satisfaction Rate', icon: '⭐' },
          { num: '24/7', label: 'Always Active', icon: '🔥' },
        ].map((s, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 16, padding: '28px 40px', textAlign: 'center', flex: '1', minWidth: 160, maxWidth: 220
          }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 30, fontWeight: 700, background: 'linear-gradient(135deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.num}</div>
            <div style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div style={{ padding: '0 20px 100px', maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12 }}>More than a form. <span style={{ color: '#6366f1' }}>More like an ecosystem.</span></h2>
          <p style={{ color: '#64748b', fontSize: 16 }}>Everything you need to ask, help, and grow together.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { icon: '🤖', title: 'AI Request Intelligence', desc: 'Auto-categorization, urgency detection, smart tags, and rewrite suggestions powered by Gemini.' },
            { icon: '🏆', title: 'Trust & Reputation', desc: 'Earn trust scores, unlock badges, and climb the leaderboard by helping your community.' },
            { icon: '⚡', title: 'Real-time Feed', desc: 'Browse, filter, and respond to help requests instantly with a clean community feed.' },
          ].map((f, i) => (
            <div key={i} style={{
              background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.15)',
              borderRadius: 16, padding: 28,
              transition: 'border-color 0.2s'
            }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10 }}>{f.title}</h3>
              <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}