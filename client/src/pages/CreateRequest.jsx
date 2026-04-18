import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function CreateRequest() {
  const [form, setForm] = useState({ title: '', description: '', category: '', tags: [], urgency: 'medium' });
  const [aiResult, setAiResult] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  const analyzeWithAI = async () => {
    if (!form.title || !form.description) return;
    setAnalyzing(true);
    try {
      const { data } = await axios.post('https://helplytics-ai-a3hz.vercel.app/api/ai/analyze', {
        title: form.title, description: form.description
      });
      setAiResult(data);
      setForm(f => ({ ...f, category: data.category, tags: data.tags, urgency: data.urgency }));
    } catch {}
    setAnalyzing(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post('https://helplytics-ai-a3hz.vercel.app/api/requests', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/explore');
    } catch { alert('Error creating request'); }
    setLoading(false);
  };

  const urgencyColor = u => u === 'high' ? '#ef4444' : u === 'medium' ? '#f59e0b' : '#22c55e';

  return (
    <div style={{ background: '#050508', minHeight: '100vh', padding: '40px 24px' }}>
      <div style={{ maxWidth: 660, margin: '0 auto' }}>

        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>Create Help Request</h1>
          <p style={{ color: '#64748b', fontSize: 14 }}>Describe your problem — AI will categorize it automatically</p>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 20, padding: 28
        }}>
          <label style={labelStyle}>Request Title</label>
          <input placeholder="e.g. Need help with React useEffect..." value={form.title}
            onChange={e => setForm({...form, title: e.target.value})} style={inputStyle} />

          <label style={labelStyle}>Description</label>
          <textarea placeholder="Describe your problem in detail..." value={form.description}
            onChange={e => setForm({...form, description: e.target.value})}
            rows={5} style={{...inputStyle, resize: 'vertical'}} />

          {/* AI Button */}
          <button onClick={analyzeWithAI} disabled={analyzing || !form.title || !form.description} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(99,102,241,0.1)', color: '#818cf8',
            border: '1px solid rgba(99,102,241,0.3)', padding: '10px 18px',
            borderRadius: 10, marginBottom: 20, fontSize: 14, fontWeight: 500,
            opacity: (!form.title || !form.description) ? 0.5 : 1,
            transition: 'all 0.2s'
          }}>
            <span style={{ fontSize: 16 }}>✨</span>
            {analyzing ? 'Analyzing with Gemini AI...' : 'Auto-categorize with AI'}
          </button>

          {/* AI Result */}
          {aiResult && (
            <div style={{
              background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: 12, padding: 16, marginBottom: 20
            }}>
              <p style={{ color: '#818cf8', fontSize: 12, fontWeight: 600, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>
                ✨ AI Analysis Applied
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
                <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '8px 12px' }}>
                  <div style={{ color: '#475569', fontSize: 11, marginBottom: 2 }}>CATEGORY</div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{aiResult.category}</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '8px 12px' }}>
                  <div style={{ color: '#475569', fontSize: 11, marginBottom: 2 }}>URGENCY</div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: urgencyColor(aiResult.urgency) }}>{aiResult.urgency}</div>
                </div>
              </div>
              <div style={{ color: '#64748b', fontSize: 13, lineHeight: 1.5 }}>{aiResult.summary}</div>
            </div>
          )}

          {/* Urgency Select */}
          <label style={labelStyle}>Urgency Level</label>
          <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
            {['low', 'medium', 'high'].map(u => (
              <button key={u} onClick={() => setForm({...form, urgency: u})} style={{
                flex: 1, padding: '10px', borderRadius: 10,
                border: `1px solid ${form.urgency === u ? urgencyColor(u) : 'rgba(255,255,255,0.08)'}`,
                background: form.urgency === u ? `${urgencyColor(u)}15` : 'rgba(255,255,255,0.02)',
                color: form.urgency === u ? urgencyColor(u) : '#475569',
                fontSize: 13, fontWeight: 500, transition: 'all 0.2s'
              }}>
                {u === 'low' ? '🟢' : u === 'medium' ? '🟡' : '🔴'} {u.charAt(0).toUpperCase() + u.slice(1)}
              </button>
            ))}
          </div>

          <button onClick={handleSubmit} disabled={loading} style={{
            width: '100%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: '#fff', border: 'none', padding: '13px',
            borderRadius: 10, fontSize: 15, fontWeight: 600,
            boxShadow: '0 0 20px rgba(99,102,241,0.3)', opacity: loading ? 0.7 : 1
          }}>
            {loading ? 'Posting...' : 'Post Request →'}
          </button>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%', background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10,
  padding: '11px 14px', color: '#fff', marginBottom: 16, fontSize: 14,
  outline: 'none', boxSizing: 'border-box'
};
const labelStyle = { display: 'block', color: '#64748b', fontSize: 12, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.8 };