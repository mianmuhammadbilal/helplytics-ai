import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{ background: '#111', border: '1px solid #222', borderRadius: 12, padding: 28 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#7c6df1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 16 }}>
            {user?.name?.charAt(0)}
          </div>
          <h2 style={{ color: '#fff', marginBottom: 4 }}>{user?.name}</h2>
          <p style={{ color: '#888', marginBottom: 20 }}>{user?.email}</p>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ background: '#1a1a1a', borderRadius: 8, padding: '12px 20px', textAlign: 'center' }}>
              <div style={{ color: '#7c6df1', fontSize: 22, fontWeight: 700 }}>{user?.trustScore || 0}</div>
              <div style={{ color: '#888', fontSize: 12 }}>Trust Score</div>
            </div>
            <div style={{ background: '#1a1a1a', borderRadius: 8, padding: '12px 20px', textAlign: 'center' }}>
              <div style={{ color: '#22c55e', fontSize: 22, fontWeight: 700 }}>{user?.helpedCount || 0}</div>
              <div style={{ color: '#888', fontSize: 12 }}>Helped</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}