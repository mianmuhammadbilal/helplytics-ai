import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#fff' }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '100px 20px 60px' }}>
        <div style={{ 
          display: 'inline-block', background: '#1a1a2e', color: '#7c6df1',
          padding: '6px 14px', borderRadius: 20, fontSize: 13, marginBottom: 20
        }}>
        </div>
        <h1 style={{ fontSize: 56, fontWeight: 800, margin: '0 0 20px', lineHeight: 1.1 }}>
          Learn Together,<br />
          <span style={{ color: '#7c6df1' }}>Grow Together</span>
        </h1>
        <p style={{ color: '#888', fontSize: 18, maxWidth: 500, margin: '0 auto 40px' }}>
          AI-powered community where students help students. Ask questions, share skills, build trust.
        </p>
        <button onClick={() => navigate('/auth')} style={{
          background: '#7c6df1', color: '#fff', border: 'none',
          padding: '14px 32px', borderRadius: 10, fontSize: 16,
          cursor: 'pointer', fontWeight: 600
        }}>
          Join the Community →
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 40, padding: '40px 20px', borderTop: '1px solid #1a1a1a' }}>
        {[['1,240+', 'Community Members'], ['3,800+', 'Problems Solved'], ['98%', 'Satisfaction Rate']].map(([num, label]) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: '#7c6df1' }}>{num}</div>
            <div style={{ color: '#888', fontSize: 14 }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}