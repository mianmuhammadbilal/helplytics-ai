export default function Messages() {
  return (
    <div style={{ background: '#f5f0e8', minHeight: '100vh', padding: '40px 24px', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#888', textTransform: 'uppercase', marginBottom: 8 }}>MESSAGES</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#1a1a1a', marginBottom: 24 }}>Your conversations</h1>
        <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 14, padding: '40px', textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>💬</div>
          <p style={{ color: '#888', fontSize: 15 }}>No messages yet. Help someone to start a conversation!</p>
        </div>
      </div>
    </div>
  );
}