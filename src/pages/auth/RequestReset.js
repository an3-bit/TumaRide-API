import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RequestReset = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('https://tumaridesapi.onrender.com/api/v1/notification/reset-password-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to send reset link');
      } else {
        setSuccess(true);
        setTimeout(() => navigate('/auth/login'), 2000);
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fdf9' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #e8f5e9', padding: 36, minWidth: 340, maxWidth: 400 }}>
        <h2 style={{ color: '#1db954', fontWeight: 800, marginBottom: 24, textAlign: 'center' }}>Request Password Reset</h2>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" type="email" required style={{ display: 'block', margin: '1rem 0', padding: 12, width: '100%', borderRadius: 8, border: '1px solid #e8f5e9', fontSize: 16 }} />
        {error && <div style={{ color: 'red', marginBottom: 12, textAlign: 'center' }}>{error}</div>}
        {success && <div style={{ color: 'green', marginBottom: 12, textAlign: 'center' }}>Reset link sent! Check your email.</div>}
        <button type="submit" disabled={loading} style={{ background: '#1db954', color: '#fff', border: 'none', padding: '0.9rem 0', borderRadius: 8, width: '100%', fontWeight: 700, fontSize: 18, marginTop: 8 }}>{loading ? 'Sending...' : 'Send Reset Link'}</button>
      </form>
    </div>
  );
};

export default RequestReset; 