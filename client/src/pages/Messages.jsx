import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Messages() {
  const { token, user } = useAuth();
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([
    { from: 'Ayesha Khan', to: 'Sara Noor', text: 'I checked your portfolio request. Share the breakpoint screenshots and I can suggest fixes.', time: '09:45 AM' },
    { from: 'Hassan Ali', to: 'Ayesha Khan', text: 'Your event poster concept is solid. I would tighten the CTA and reduce the background texture.', time: '11:10 AM' },
  ]);
  const [form, setForm] = useState({ to: '', message: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    axios.get('https://helplytics-ai-a3hz.vercel.app/api/requests/meta/leaderboard')
      .then(r => setUsers(r.data));
  }, []);

  const handleSend = () => {
    if (!form.to || !form.message.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, {
      from: user?.name || 'You',
      to: form.to,
      text: form.message,
      time
    }]);
    setForm({ to: form.to, message: '' });
    setSent(true);
    setTimeout(() => setSent(false), 2000);
  };

  const avatarColors = ['#f97316', '#3b82f6', '#8b5cf6', '#ec4899', '#10b981'];
  const getColor = (name) => avatarColors[(name?.charCodeAt(0) || 0) % avatarColors.length];
  const getInitials = (name) => name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  return (
    <div style={{ background: '#f5f0e8', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

      {/* Hero Banner */}
      <div style={{ background: '#282f31', margin: '24px 24px 0', borderRadius: 16, padding: '36px 40px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#88a0a0', textTransform: 'uppercase', marginBottom: 12 }}>INTERACTION / MESSAGING</div>
        <h1 style={{ fontSize: 42, fontWeight: 800, color: '#fff', margin: '0 0 12px', lineHeight: 1.15 }}>
          Keep support moving through direct communication.
        </h1>
        <p style={{ color: '#94a8a8', fontSize: 15, margin: 0 }}>
          Basic messaging gives helpers and requesters a clear follow-up path once a match happens.
        </p>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20, padding: '24px' }}>

        {/* Left — Conversation Stream */}
        <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 16, padding: '28px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#108077', textTransform: 'uppercase', marginBottom: 10 }}>CONVERSATION STREAM</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1a1a1a', marginBottom: 24 }}>Recent messages</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                padding: '18px 0',
                borderBottom: i < messages.length - 1 ? '1px solid rgba(0,0,0,0.07)' : 'none'
              }}>
                <div style={{ flex: 1, paddingRight: 16 }}>
                  {/* From → To */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: getColor(msg.from),
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontWeight: 700, fontSize: 11, flexShrink: 0
                    }}>{getInitials(msg.from)}</div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a' }}>
                      {msg.from} → {msg.to}
                    </span>
                  </div>
                  {/* Message text */}
                  <p style={{ color: '#555', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{msg.text}</p>
                </div>
                {/* Time bubble */}
                <div style={{
                  background: '#f0f0f0', color: '#888',
                  padding: '8px 12px', borderRadius: 20,
                  fontSize: 12, fontWeight: 600, textAlign: 'center',
                  whiteSpace: 'nowrap', flexShrink: 0
                }}>
                  {msg.time.split(' ')[0]}<br />{msg.time.split(' ')[1]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Send Message */}
        <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 16, padding: '28px', height: 'fit-content' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#108077', textTransform: 'uppercase', marginBottom: 10 }}>SEND MESSAGE</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#1a1a1a', marginBottom: 24, lineHeight: 1.2 }}>Start a conversation</h2>

          {/* To */}
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>To</label>
            <select value={form.to} onChange={e => setForm({...form, to: e.target.value})} style={inputStyle}>
              <option value="">Select a person</option>
              {users.map(u => (
                <option key={u._id} value={u.name}>{u.name}</option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>Message</label>
            <textarea
              placeholder="Share support details, ask for files, or suggest next steps."
              value={form.message}
              onChange={e => setForm({...form, message: e.target.value})}
              rows={5}
              style={{...inputStyle, resize: 'vertical'}}
            />
          </div>

          {/* Send Button */}
          <button onClick={handleSend} disabled={!form.to || !form.message.trim()} style={{
            width: '100%',
            background: sent ? '#dcfce7' : 'linear-gradient(135deg, #108077, #1ab5a8)',
            color: sent ? '#16a34a' : '#fff',
            border: 'none', padding: '13px',
            borderRadius: 50, fontSize: 15, fontWeight: 600,
            cursor: (!form.to || !form.message.trim()) ? 'not-allowed' : 'pointer',
            opacity: (!form.to || !form.message.trim()) ? 0.6 : 1,
            transition: 'transform 0.2s, box-shadow 0.2s, background 0.3s'
          }}
            onMouseEnter={e => { if (form.to && form.message.trim()) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(16,128,119,0.4)'; }}}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            {sent ? '✓ Message sent!' : 'Send'}
          </button>
        </div>

      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%', background: '#fafafa',
  border: '1px solid rgba(0,0,0,0.1)', borderRadius: 8,
  padding: '11px 14px', color: '#1a1a1a', fontSize: 14,
  outline: 'none', boxSizing: 'border-box',
  fontFamily: 'Inter, sans-serif'
};

const labelStyle = {
  display: 'block', fontSize: 13, fontWeight: 500,
  color: '#555', marginBottom: 6
};