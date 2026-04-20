import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function CreateRequest() {
  const [form, setForm] = useState({ title: '', description: '', category: 'Web Development', tags: [], urgency: 'high' });
  const [tagsInput, setTagsInput] = useState('');
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
      setForm(f => ({ ...f, category: data.category || f.category, tags: data.tags || f.tags, urgency: data.urgency || f.urgency }));
      setTagsInput(data.tags?.join(', ') || tagsInput);
    } catch {}
    setAnalyzing(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
      await axios.post('https://helplytics-ai-a3hz.vercel.app/api/requests', { ...form, tags }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/explore');
    } catch { alert('Error creating request'); }
    setLoading(false);
  };

  return (
    <div style={{ background: '#f5f0e8', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

      {/* Hero Banner */}
      <div style={{ background: '#282f31', margin: '24px 24px 0', borderRadius: 16, padding: '36px 40px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#88a0a0', textTransform: 'uppercase', marginBottom: 12 }}>CREATE REQUEST</div>
        <h1 style={{ fontSize: 42, fontWeight: 800, color: '#fff', margin: '0 0 12px', lineHeight: 1.15 }}>
          Turn a rough problem into a clear help request.
        </h1>
        <p style={{ color: '#94a8a8', fontSize: 15, margin: 0 }}>
          Use built-in AI suggestions for category, urgency, tags, and a stronger description rewrite.
        </p>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 20, padding: '24px' }}>

        {/* Left — Form */}
        <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 16, padding: '28px' }}>

          {/* Title */}
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Title</label>
            <input
              placeholder="Need review on my JavaScript quiz app before submission"
              value={form.title}
              onChange={e => setForm({...form, title: e.target.value})}
              style={inputStyle}
            />
          </div>

          {/* Description */}
          <div style={{ marginBottom: 18 }}>
            <label style={labelStyle}>Description</label>
            <textarea
              placeholder="Explain the challenge, your current progress, deadline, and what kind of help would be useful."
              value={form.description}
              onChange={e => setForm({...form, description: e.target.value})}
              rows={5}
              style={{...inputStyle, resize: 'vertical'}}
            />
          </div>

          {/* Tags + Category side by side */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 }}>
            <div>
              <label style={labelStyle}>Tags</label>
              <input
                placeholder="JavaScript, Debugging, Review"
                value={tagsInput}
                onChange={e => setTagsInput(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} style={inputStyle}>
                <option>Web Development</option>
                <option>Programming</option>
                <option>Design</option>
                <option>Database</option>
                <option>Career</option>
                <option>Tools</option>
                <option>General</option>
              </select>
            </div>
          </div>

          {/* Urgency */}
          <div style={{ marginBottom: 28 }}>
            <label style={labelStyle}>Urgency</label>
            <select value={form.urgency} onChange={e => setForm({...form, urgency: e.target.value})} style={inputStyle}>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button onClick={analyzeWithAI} disabled={analyzing || !form.title || !form.description} style={{
              background: 'transparent', color: '#1a1a1a',
              border: '1px solid rgba(0,0,0,0.2)', padding: '11px 22px',
              borderRadius: 50, fontSize: 14, fontWeight: 500, cursor: 'pointer',
              opacity: (!form.title || !form.description) ? 0.5 : 1,
              transition: 'all 0.2s'
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#115e59'; e.currentTarget.style.color = '#115e59'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)'; e.currentTarget.style.color = '#1a1a1a'; }}
            >
              {analyzing ? 'Analyzing...' : 'Apply AI suggestions'}
            </button>

            <button onClick={handleSubmit} disabled={loading} style={{
              background: 'linear-gradient(135deg, #108077, #1ab5a8)',
              color: '#fff', border: 'none', padding: '11px 28px',
              borderRadius: 50, fontSize: 14, fontWeight: 600, cursor: 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(16,128,119,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              {loading ? 'Publishing...' : 'Publish request'}
            </button>
          </div>
        </div>

        {/* Right — AI Assistant */}
        <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 16, padding: '28px', height: 'fit-content' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#108077', textTransform: 'uppercase', marginBottom: 12 }}>AI ASSISTANT</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#1a1a1a', marginBottom: 24, lineHeight: 1.2 }}>Smart request guidance</h2>

          {[
            {
              label: 'Suggested category',
              value: aiResult?.category || 'Community'
            },
            {
              label: 'Detected urgency',
              value: aiResult?.urgency
                ? aiResult.urgency.charAt(0).toUpperCase() + aiResult.urgency.slice(1)
                : 'Low'
            },
            {
              label: 'Suggested tags',
              value: aiResult?.tags?.join(', ') || 'Add more detail for smarter tags'
            },
            {
              label: 'Rewrite suggestion',
              value: aiResult?.summary || 'Start describing the challenge to generate a stronger version.'
            },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
              padding: '14px 0', borderBottom: i < 3 ? '1px solid rgba(0,0,0,0.06)' : 'none',
              gap: 16
            }}>
              <span style={{ fontSize: 13, color: '#888', whiteSpace: 'nowrap', paddingTop: 1 }}>{item.label}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a', textAlign: 'right', lineHeight: 1.5 }}>{item.value}</span>
            </div>
          ))}
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