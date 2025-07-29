import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const EyeIcon = ({ visible }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}>
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
    <circle cx="12" cy="12" r="3" fill={visible ? 'none' : '#888'} />
  </svg>
);

const formModalBg = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.18)',
  zIndex: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
const formModal = {
  background: '#fff',
  borderRadius: 16,
  boxShadow: '0 2px 24px #e8f5e9',
  padding: 36,
  minWidth: 340,
  maxWidth: 400,
  width: '100%',
  zIndex: 101,
  position: 'relative',
};
const closeBtn = {
  position: 'absolute',
  top: 12,
  right: 16,
  background: 'none',
  border: 'none',
  fontSize: 22,
  color: '#888',
  cursor: 'pointer',
};
const heroStyle = {
  minHeight: '100vh',
  background: '#f8fdf9',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 32,
};
const logoStyle = {
  width: 180,
  height: 150,
  objectFit: 'contain',
  borderRadius: 16,
  background: '#fff',
  boxShadow: '0 1px 8px #e8f5e9',
};
const signInBtn = {
  background: '#1db954',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  padding: '0.9rem 2.2rem',
  fontWeight: 700,
  fontSize: 18,
  cursor: 'pointer',
  boxShadow: '0 1px 4px #e8f5e9',
  transition: 'background 0.2s',
};

const ADMIN_EMAIL = 'admin@tumaride.com';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showForm, setShowForm] = useState(true); // Open by default if user lands directly
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('https://tumaridesapi.onrender.com/user/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Login failed');
      } else {
        setSuccess(true);
        setTimeout(() => {
          if (email === ADMIN_EMAIL) {
            navigate('/admin');
          } else if (data.user && data.user.type && data.user.type.includes('rider')) {
            navigate('/rider');
          } else {
            navigate('/sender');
          }
        }, 1000);
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={heroStyle}>
      <img src="/iconT.png" alt="TumaRide Delivery" style={logoStyle} />
      <button style={signInBtn} onClick={() => setShowForm(true)}>Sign In</button>
      <div style={{ color: '#888', marginTop: 16, fontSize: 16 }}>
        Don't have an account? <Link to="/auth/signup" style={{ color: '#1db954', fontWeight: 600 }}>Sign Up</Link>
      </div>
      {showForm && (
        <div style={formModalBg}>
          <form onSubmit={handleLogin} style={formModal}>
            <button type="button" style={closeBtn} onClick={() => setShowForm(false)} aria-label="Close">×</button>
            <h2 style={{ color: '#1db954', fontWeight: 800, marginBottom: 24, textAlign: 'center' }}>Sign In</h2>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" required style={{ display: 'block', margin: '1rem 0', padding: 12, width: '100%', borderRadius: 8, border: '1px solid #e8f5e9', fontSize: 16 }} />
            <div style={{ position: 'relative', margin: '1rem 0' }}>
              <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type={showPassword ? 'text' : 'password'} required style={{ display: 'block', padding: 12, width: '100%', borderRadius: 8, border: '1px solid #e8f5e9', fontSize: 16 }} />
              <button type="button" onClick={() => setShowPassword(v => !v)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }} tabIndex={-1} aria-label="Toggle password visibility">
                <EyeIcon visible={showPassword} />
              </button>
            </div>
            <div style={{ textAlign: 'right', marginBottom: 8 }}>
              <Link to="/auth/request-reset" style={{ color: '#1db954', fontWeight: 500, fontSize: 15 }}>Forgot Password?</Link>
            </div>
            {error && <div style={{ color: 'red', marginBottom: 12, textAlign: 'center' }}>{error}</div>}
            {success && <div style={{ color: 'green', marginBottom: 12, textAlign: 'center' }}>Login successful!</div>}
            <button type="submit" disabled={loading} style={{ background: '#1db954', color: '#fff', border: 'none', padding: '0.9rem 0', borderRadius: 8, width: '100%', fontWeight: 700, fontSize: 18, marginTop: 8 }}>{loading ? 'Signing In...' : 'Sign In'}</button>
            <div style={{ textAlign: 'center', marginTop: 18, color: '#888' }}>
              Don't have an account? <Link to="/auth/signup" style={{ color: '#1db954', fontWeight: 600 }}>Sign Up</Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login; 