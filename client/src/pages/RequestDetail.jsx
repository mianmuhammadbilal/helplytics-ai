import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function RequestDetail() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/requests/${id}`)
      .then(r => setRequest(r.data));
  }, [id]);

  const handleHelp = async () => {
    await axios.post(`http://localhost:5000/api/requests/${id}/help`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert('You offered to help!');
  };

  const handleSolve = async () => {
    await axios.patch(`http://localhost:5000/api/requests/${id}/solve`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    navigate('/explore');
  };

  if (!request) return <div style={{ color: '#fff', padding: 40 }}>Loading...</div>;

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <button onClick={() => navigate('/explore')} style={{ background: 'none', border: 'none', color: '#7c6df1', cursor: 'pointer', marginBottom: 20 }}>← Back</button>
        <div style={{ background: '#111', border: '1px solid #222', borderRadius: 12, padding: 28 }}>
          <h2 style={{ color: '#fff', marginBottom: 8 }}>{request.title}</h2>
          <p style={{ color: '#888', lineHeight: 1.6, marginBottom: 24 }}>{request.description}</p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={handleHelp} style={{ background: '#7c6df1', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 8, cursor: 'pointer' }}>🤝 I Can Help</button>
            <button onClick={handleSolve} style={{ background: '#22c55e', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 8, cursor: 'pointer' }}>✅ Mark Solved</button>
          </div>
        </div>
      </div>
    </div>
  );
}