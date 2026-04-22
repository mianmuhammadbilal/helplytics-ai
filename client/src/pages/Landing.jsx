import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Landing() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ members: 0, requests: 0, solved: 0 });
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    axios.get('https://helplytics-ai-a3hz.vercel.app/api/requests').then(r => {
      const all = r.data;
      setStats({
        members: 384,
        requests: all.length || 72,
        solved: all.filter(x => x.status === 'solved').length || 69
      });
      setFeatured(all.slice(0, 3));
    }).catch(() => {
      setStats({ members: 384, requests: 72, solved: 69 });
    });
  }, []);

  return (
    <div style={{ background: '#f5f0e8', minHeight: '100vh', fontFamily: 'Inter, sans-serif', color: '#1a1a1a' }}>

      {/* Hero Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, padding: '48px 32px 32px', maxWidth: 1100, margin: '0 auto' }}>

        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{
            background: '#fff', border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: 16, padding: '32px 32px 28px'
          }}>
            <div style={{
              display: 'inline-block', fontSize: 11, fontWeight: 700,
              letterSpacing: 1.5, color: '#555', marginBottom: 20,
              textTransform: 'uppercase'
            }}>SMIT Grand Coding Night 2026</div>

            <h1 style={{ fontSize: 48, fontWeight: 800, lineHeight: 1.1, marginBottom: 20, color: '#1a1a1a' }}>
              Find help faster. Become help that matters.
            </h1>

            <p style={{ color: '#666', fontSize: 15, lineHeight: 1.6, marginBottom: 28 }}>
              Helplytics AI is a community-powered support network for students, mentors, creators, and builders. Ask for help, offer help, track impact, and let AI surface smarter matches across the platform.
            </p>

            <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
              <button onClick={() => navigate('/dashboard')} style={{
                background: 'linear-gradient(135deg, #108077, #1ab5a8)',
                color: '#fff', border: 'none',
                padding: '12px 26px', borderRadius: 50,
                fontSize: 14, fontWeight: 600, cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(16,128,119,0.45)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >Open product demo</button>
              <button onClick={() => navigate('/create')} style={{
                background: 'transparent', color: '#1a1a1a',
                border: '1px solid rgba(0,0,0,0.2)', padding: '11px 22px',
                borderRadius: 8, fontSize: 14, cursor: 'pointer'
              }}>Post a request</button>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { label: 'MEMBERS', value: `${stats.members}+`, desc: 'Students, mentors, and helpers in the loop.' },
                { label: 'REQUESTS', value: `${stats.requests}+`, desc: 'Support posts shared across learning journeys.' },
                { label: 'SOLVED', value: `${stats.solved}+`, desc: 'Problems resolved through fast community action.' },
              ].map(s => (
                <div key={s.label} style={{
                  flex: 1, background: '#f9f7f3', border: '1px solid rgba(0,0,0,0.07)',
                  borderRadius: 12, padding: '16px'
                }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#888', marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#1a1a1a', marginBottom: 4 }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: '#888', lineHeight: 1.4 }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div style={{
          background: '#16332f', borderRadius: 16, padding: '32px',
          color: '#f5f0e8', display: 'flex', flexDirection: 'column', gap: 20
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#88b0aa', marginBottom: 12, textTransform: 'uppercase' }}>LIVE PRODUCT FEEL</div>
              <h2 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.15, color: '#f5f0e8' }}>
                More than a form. More like an ecosystem.
              </h2>
            </div>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#f59e0b', flexShrink: 0 }} />
          </div>

          <p style={{ color: '#a8c5c0', fontSize: 14, lineHeight: 1.6 }}>
            A polished multi-page experience inspired by product platforms, with AI summaries, trust scores, contribution signals, notifications, and leaderboard momentum built directly in React, Node, and MongoDB.
          </p>

          {[
            { title: 'AI request intelligence', desc: 'Auto-categorization, urgency detection, tags, rewrite suggestions, and trend snapshots.' },
            { title: 'Community trust graph', desc: 'Badges, helper rankings, trust score boosts, and visible contribution history.' },
          ].map(f => (
            <div key={f.title} style={{
              background: '#e1e1d9', border: 'none',
              borderRadius: 12, padding: '16px 20px'
            }}>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6, color: '#000' }}>{f.title}</div>
              <div style={{ color: '#333', fontSize: 13, lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}

          <div style={{ background: '#e1e1d9', border: 'none', borderRadius: 12, padding: '16px 20px' }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#000', marginBottom: 4 }}>100%</div>
            <div style={{ color: '#333', fontSize: 13 }}>Top trust score currently active across the sample mentor network.</div>
          </div>
        </div>
      </div>

      {/* Core Flow Section */}
      <div style={{ padding: '48px 32px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#888', marginBottom: 8, textTransform: 'uppercase' }}>CORE FLOW</div>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: '#1a1a1a' }}>From struggling alone to solving together</h2>
          </div>
          <button onClick={() => navigate('/onboarding')} style={{
            background: '#fff', border: '1px solid rgba(0,0,0,0.15)',
            padding: '10px 20px', borderRadius: 8, fontSize: 14, cursor: 'pointer', fontWeight: 500
          }}>Try onboarding AI</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { title: 'Ask for help clearly', desc: 'Create structured requests with category, urgency, AI suggestions, and tags that attract the right people.' },
            { title: 'Discover the right people', desc: 'Use the explore feed, helper lists, notifications, and messaging to move quickly once a match happens.' },
            { title: 'Track real contribution', desc: 'Trust scores, badges, solved requests, and rankings help the community recognize meaningful support.' },
          ].map(f => (
            <div key={f.title} style={{
              background: '#fff', border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: 14, padding: '24px'
            }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: '#1a1a1a' }}>{f.title}</h3>
              <p style={{ color: '#777', fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Requests */}
      <div style={{ padding: '0 32px 60px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: '#888', marginBottom: 8, textTransform: 'uppercase' }}>FEATURED REQUESTS</div>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: '#1a1a1a' }}>Community problems currently in motion</h2>
          </div>
          <button onClick={() => navigate('/explore')} style={{
            background: '#fff', border: '1px solid rgba(0,0,0,0.15)',
            padding: '10px 20px', borderRadius: 8, fontSize: 14, cursor: 'pointer', fontWeight: 500
          }}>View full feed</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {featured.length > 0 ? featured.map(req => (
            <div key={req._id} style={{
              background: '#fff', border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: 14, padding: '20px', display: 'flex', flexDirection: 'column', gap: 10
            }}>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <span style={{ background: '#f0f0f0', padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 500 }}>{req.category || 'General'}</span>
                <span style={{
                  background: req.urgency === 'high' ? '#fee2e2' : req.urgency === 'medium' ? '#fef3c7' : '#dcfce7',
                  color: req.urgency === 'high' ? '#dc2626' : req.urgency === 'medium' ? '#d97706' : '#16a34a',
                  padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                  textTransform: 'capitalize'
                }}>{req.urgency}</span>
                <span style={{
                  background: req.status === 'solved' ? '#dcfce7' : '#f0f0f0',
                  color: req.status === 'solved' ? '#16a34a' : '#555',
                  padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 500,
                  textTransform: 'capitalize'
                }}>{req.status}</span>
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.4 }}>{req.title}</h3>
              <p style={{ color: '#888', fontSize: 13, lineHeight: 1.5 }}>{req.description?.substring(0, 90)}...</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {req.tags?.slice(0, 3).map(tag => (
                  <span key={tag} style={{ background: '#f5f5f5', color: '#555', padding: '2px 8px', borderRadius: 6, fontSize: 12 }}>{tag}</span>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>{req.author?.name || 'Community'}</div>
                  <div style={{ fontSize: 12, color: '#aaa' }}>Karachi • {req.helpers?.length || 1} helper interested</div>
                </div>
                <button onClick={() => navigate(`/request/${req._id}`)} style={{
                  background: 'transparent', border: '1px solid rgba(0,0,0,0.15)',
                  padding: '6px 14px', borderRadius: 7, fontSize: 13, cursor: 'pointer', fontWeight: 500
                }}>Open details</button>
              </div>
            </div>
          )) : [1, 2, 3].map(i => (
            <div key={i} style={{
              background: '#fff', border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: 14, padding: '20px', display: 'flex', flexDirection: 'column', gap: 10
            }}>
              <div style={{ display: 'flex', gap: 6 }}>
                <span style={{ background: '#f0f0f0', padding: '3px 10px', borderRadius: 20, fontSize: 12 }}>Web Development</span>
                <span style={{ background: '#fee2e2', color: '#dc2626', padding: '3px 10px', borderRadius: 20, fontSize: 12 }}>High</span>
                <span style={{ background: '#dcfce7', color: '#16a34a', padding: '3px 10px', borderRadius: 20, fontSize: 12 }}>Solved</span>
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 700 }}>Need help making portfolio responsive</h3>
              <p style={{ color: '#888', fontSize: 13 }}>HTML/CSS portfolio breaks on tablets before demo day.</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>Sara Noor</div>
                  <div style={{ fontSize: 12, color: '#aaa' }}>Karachi • 1 helper interested</div>
                </div>
                <button style={{
                  background: 'transparent', border: '1px solid rgba(0,0,0,0.15)',
                  padding: '6px 14px', borderRadius: 7, fontSize: 13, cursor: 'pointer'
                }}>Open details</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', padding: '20px 32px', textAlign: 'center' }}>
        <p style={{ color: '#aaa', fontSize: 13 }}>
          Helplytics AI is built as a premium-feel, multi-page community support product using React, Node, Express, and MongoDB.
        </p>
      </div>

    </div>
  );
}