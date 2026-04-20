import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function RequestDetail() {
  const { id } = useParams();
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [helped, setHelped] = useState(false);

  useEffect(() => {
    axios.get(`https://helplytics-ai-a3hz.vercel.app/api/requests/${id}`)
      .then(r => setRequest(r.data));
  }, [id]);

  const handleHelp = async () => {
    try {
      await axios.post(`https://helplytics-ai-a3hz.vercel.app/api/requests/${id}/help`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHelped(true);
      const r = await axios.get(`https://helplytics-ai-a3hz.vercel.app/api/requests/${id}`);
      setRequest(r.data);
    } catch { alert('Error'); }
  };

  const handleSolve = async () => {
    try {
      await axios.patch(`https://helplytics-ai-a3hz.vercel.app/api/requests/${id}/solve`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/explore');
    } catch { alert('Error'); }
  };

  const urgencyColor = u => u === 'high' ? '#dc2626' : u === 'medium' ? '#d97706' : '#16a34a';
  const urgencyBg = u => u === 'high' ? '#fee2e2' : u === 'medium' ? '#fef3c7' : '#dcfce7';
  const statusBg = s => s === 'solved' ? '#dcfce7' : '#f0f0f0';
  const statusColor = s => s === 'solved' ? '#16a34a' : '#555';

  const avatarColors = ['#f97316', '#3b82f6', '#8b5cf6', '#ec4899', '#10b981'];
  const getColor = (name) => avatarColors[(name?.charCodeAt(0) || 0) % avatarColors.length];
  const getInitials = (name) => name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  if (!request) return (
    <div style={{ background: '#f5f0e8', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ color: '#888', fontSize: 15 }}>Loading request...</div>
    </div>
  );

  return (
    <div style={{ background: '#f5f0e8', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

      {/* Hero Banner */}
      <div style={{ background: '#282f31', margin: '24px 24px 0', borderRadius: 16, padding: '36px 40px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#88a0a0', textTransform: 'uppercase', marginBottom: 14 }}>REQUEST DETAIL</div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          <span style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '4px 12px', borderRadius: 20, fontSize: 13 }}>{request.category || 'General'}</span>
          <span style={{ background: urgencyBg(request.urgency), color: urgencyColor(request.urgency), padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 600, textTransform: 'capitalize' }}>{request.urgency}</span>
          <span style={{ background: statusBg(request.status), color: statusColor(request.status), padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 600, textTransform: 'capitalize' }}>{request.status}</span>
        </div>

        <h1 style={{ fontSize: 40, fontWeight: 800, color: '#fff', margin: '0 0 14px', lineHeight: 1.15 }}>
          {request.title}
        </h1>
        <p style={{ color: '#94a8a8', fontSize: 15, margin: 0, lineHeight: 1.6 }}>
          {request.description}
        </p>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20, padding: '24px' }}>

        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* AI Summary */}
          <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 16, padding: '28px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#888', textTransform: 'uppercase', marginBottom: 20 }}>AI SUMMARY</div>

            {/* AI Avatar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, background: '#108077',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 800, fontSize: 14
              }}>H</div>
              <span style={{ fontWeight: 600, fontSize: 14, color: '#1a1a1a' }}>Helplytics AI</span>
            </div>

            <p style={{ color: '#555', fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
              {request.aiSummary || `This request is about ${request.category || 'a topic'} and requires community support. The requester needs practical guidance and hands-on assistance to move forward effectively.`}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {request.tags?.map(tag => (
                <span key={tag} style={{ background: '#f0f0f0', color: '#555', padding: '5px 14px', borderRadius: 20, fontSize: 13 }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 16, padding: '28px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#888', textTransform: 'uppercase', marginBottom: 20 }}>ACTIONS</div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <button onClick={handleHelp} disabled={helped} style={{
                background: helped ? '#dcfce7' : 'linear-gradient(135deg, #108077, #1ab5a8)',
                color: helped ? '#16a34a' : '#fff', border: 'none',
                padding: '11px 24px', borderRadius: 50,
                fontSize: 14, fontWeight: 600, cursor: helped ? 'default' : 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
                onMouseEnter={e => { if (!helped) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(16,128,119,0.4)'; }}}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                {helped ? '✓ Helping' : 'I can help'}
              </button>

              {request.author?._id === user?.id && (
                <button onClick={handleSolve} style={{
                  background: 'transparent', color: '#1a1a1a',
                  border: '1px solid rgba(0,0,0,0.2)', padding: '11px 24px',
                  borderRadius: 50, fontSize: 14, fontWeight: 500, cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#115e59'; e.currentTarget.style.color = '#115e59'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)'; e.currentTarget.style.color = '#1a1a1a'; }}
                >Mark as solved</button>
              )}

              {request.author?._id !== user?.id && (
                <button onClick={handleSolve} style={{
                  background: 'transparent', color: '#1a1a1a',
                  border: '1px solid rgba(0,0,0,0.2)', padding: '11px 24px',
                  borderRadius: 50, fontSize: 14, fontWeight: 500, cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#115e59'; e.currentTarget.style.color = '#115e59'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)'; e.currentTarget.style.color = '#1a1a1a'; }}
                >Mark as solved</button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Requester */}
          <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 16, padding: '28px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#888', textTransform: 'uppercase', marginBottom: 16 }}>REQUESTER</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: getColor(request.author?.name),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: 15
              }}>{getInitials(request.author?.name)}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15, color: '#1a1a1a' }}>{request.author?.name || 'Community Member'}</div>
                <div style={{ fontSize: 13, color: '#aaa', marginTop: 2 }}>Trust Score: {request.author?.trustScore || 0}</div>
              </div>
            </div>
          </div>

          {/* Helpers */}
          <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 16, padding: '28px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#108077', textTransform: 'uppercase', marginBottom: 8 }}>HELPERS</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1a1a1a', marginBottom: 20 }}>People ready to support</h3>

            {request.helpers?.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {request.helpers.map((helper, i) => (
                  <div key={helper._id || i} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    paddingBottom: i < request.helpers.length - 1 ? 16 : 0,
                    borderBottom: i < request.helpers.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none'
                  }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%',
                      background: getColor(helper.name),
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontWeight: 700, fontSize: 13, flexShrink: 0
                    }}>{getInitials(helper.name)}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 14, color: '#1a1a1a', marginBottom: 3 }}>{helper.name}</div>
                      <div style={{ fontSize: 12, color: '#aaa' }}>{helper.skills?.join(', ') || 'Community Helper'}</div>
                    </div>
                    <div style={{
                      background: '#f0f0f0', color: '#555',
                      padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600
                    }}>Trust {helper.trustScore || 0}%</div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>🤝</div>
                <p style={{ color: '#aaa', fontSize: 13 }}>No helpers yet. Be the first!</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}