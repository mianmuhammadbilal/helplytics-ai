import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function CreateRequest() {
  const [form, setForm] = useState({ title: '', description: '', category: '', tags: [], urgency: 'medium' });
  const [aiResult, setAiResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  const analyzeWithAI = async () => {
    if (!form.title || !form.description) return;
    setAnalyzing(true);
    try {
      const { data } = await axios.post('http://localhost:5000/api/ai/analyze', {
        title: form.title, description: form.description
      });
      setAiResult(data);
      setForm(f => ({ ...f, category: data.category, tags: data.tags, urgency: data.urgency }));
    } catch {}
    setAnalyzing(false);
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/requests', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/explore');
    } catch (err) {
      alert('Error creating request');
    }
  };

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <h2 style={{ color: '#fff', marginBottom: 4 }}>Create Help Request</h2>
        <p style={{ color: '#888', marginBottom: 28, fontSize: 14 }}>Describe your problem and AI will help categorize it</p>

        <div style={cardStyle}>
          <input placeholder="Request title..." value={form.title} onChange={e => setForm({...form, title: e.target.value})} style={inputStyle} />
          <textarea placeholder="Describe your problem in detail..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={5} style={{...inputStyle, resize: 'vertical'}} />

          <button onClick={analyzeWithAI} disabled={analyzing} style={{
            background: '#1e1b4b', color: '#7c6df1', border: '1px solid #7c6df1',
            padding: '10px 20px', borderRadius: 8, cursor: 'pointer', marginBottom: 16
          }}>
            {analyzing ? '🤖 Analyzing...' : '✨ AI Auto-Categorize'}
          </button>

          {aiResult && (
            <div style={{ background: '#0f0f1a', border: '1px solid #2d2b5a', borderRadius: 8, padding: 16, marginBottom: 16 }}>
              <p style={{ color: '#7c6df1', fontSize: 13, marginBottom: 8 }}>🤖 AI Suggestions Applied:</p>
              <p style={{ color: '#aaa', fontSize: 13 }}>Category: <span style={{ color: '#fff' }}>{aiResult.category}</span></p>
              <p style={{ color: '#aaa', fontSize: 13 }}>Urgency: <span style={{ color: '#fff' }}>{aiResult.urgency}</span></p>
              <p style={{ color: '#aaa', fontSize: 13 }}>Summary: <span style={{ color: '#fff' }}>{aiResult.summary}</span></p>
            </div>
          )}

          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {['low', 'medium', 'high'].map(u => (
              <button key={u} onClick={() => setForm({...form, urgency: u})} style={{
                padding: '6px 16px', borderRadius: 6, border: '1px solid',
                borderColor: form.urgency === u ? urgencyColor(u) : '#333',
                background: form.urgency === u ? '#1a1a1a' : 'transparent',
                color: form.urgency === u ? urgencyColor(u) : '#666', cursor: 'pointer', fontSize: 13
              }}>{u.charAt(0).toUpperCase() + u.slice(1)}</button>
            ))}
          </div>

          <button onClick={handleSubmit} style={{ width: '100%', background: '#7c6df1', color: '#fff', border: 'none', padding: 12, borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>
            Post Request
          </button>
        </div>
      </div>
    </div>
  );
}

const urgencyColor = u => u === 'high' ? '#ef4444' : u === 'medium' ? '#f59e0b' : '#22c55e';
const cardStyle = { background: '#111', border: '1px solid #222', borderRadius: 12, padding: 24 };
const inputStyle = { width: '100%', background: '#1a1a1a', border: '1px solid #333', borderRadius: 8, padding: '10px 12px', color: '#fff', marginBottom: 12, fontSize: 14, boxSizing: 'border-box', outline: 'none' };