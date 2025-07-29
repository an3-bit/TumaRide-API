import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const EyeIcon = ({ visible }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}>
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
    <circle cx="12" cy="12" r="3" fill={visible ? 'none' : '#888'} />
  </svg>
);

const featureCards = [
  {
    title: 'Fast Delivery',
    desc: 'Experience lightning-fast delivery times, ensuring your parcels reach their destination swiftly.',
    icon: '🚀',
  },
  {
    title: 'Wide Coverage',
    desc: 'Our extensive network covers a wide range of locations, providing reliable delivery services across the country.',
    icon: '🌍',
  },
  {
    title: 'Real-Time Tracking',
    desc: 'Stay informed with real-time tracking updates, allowing you to monitor your parcel’s journey every step of the way.',
    icon: '📦',
  },
];

const heroStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 48,
  padding: '48px 0 32px 0',
  maxWidth: 1100,
  margin: '0 auto',
  flexWrap: 'wrap',
};
const heroLeft = {
  flex: '0 0 340px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
const heroRight = {
  flex: '1 1 400px',
  minWidth: 320,
};
const headline = {
  fontSize: '2.5rem',
  fontWeight: 800,
  color: '#222',
  marginBottom: 16,
  lineHeight: 1.1,
};
const subheadline = {
  fontSize: 18,
  color: '#444',
  marginBottom: 28,
  maxWidth: 420,
};
const buttonRow = {
  display: 'flex',
  gap: 16,
  marginBottom: 8,
};
const signupBtn = {
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
const loginBtn = {
  background: '#f3f3f3',
  color: '#222',
  border: 'none',
  borderRadius: 8,
  padding: '0.9rem 2.2rem',
  fontWeight: 700,
  fontSize: 18,
  cursor: 'pointer',
  boxShadow: '0 1px 4px #e8f5e9',
  transition: 'background 0.2s',
};
const whySection = {
  maxWidth: 1100,
  margin: '48px auto 0 auto',
  padding: '0 16px',
};
const cardRow = {
  display: 'flex',
  gap: 24,
  marginTop: 32,
  flexWrap: 'wrap',
};
const card = {
  flex: '1 1 260px',
  background: '#fff',
  border: '1px solid #e8f5e9',
  borderRadius: 16,
  padding: 28,
  minWidth: 220,
  boxShadow: '0 1px 8px #f3f3f3',
  marginBottom: 16,
};
const cardIcon = {
  fontSize: 32,
  marginBottom: 12,
};
const cardTitle = {
  fontWeight: 700,
  fontSize: 18,
  marginBottom: 8,
  color: '#222',
};
const cardDesc = {
  color: '#444',
  fontSize: 15,
};
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

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [type, setType] = useState('sender');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== repeatPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('https://tumaridesapi.onrender.com/user/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          repeat_password: repeatPassword,
          type: [type === 'mover' ? 'rider' : 'sender']
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Registration failed');
      } else {
        setSuccess(true);
        setTimeout(() => {
          setShowForm(false);
          if (type === 'mover') {
            navigate('/rider/profile-setup');
          } else {
            navigate('/sender/request-delivery');
          }
        }, 1200);
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fdf9' }}>
      {/* Hero Section */}
      <div style={heroStyle}>
        <div style={heroLeft}>
          <img src="/iconT.png" alt="TumaRide Delivery" style={{ width: 240, height: 200, objectFit: 'contain', borderRadius: 16, background: '#fff', boxShadow: '0 1px 8px #e8f5e9' }} />
        </div>
        <div style={heroRight}>
          <div style={headline}>Fast, Reliable, and Secure Parcel Delivery</div>
          <div style={subheadline}>
            TumaRide offers a seamless delivery experience, ensuring your parcels arrive safely and on time. Sign up or log in to get started.
          </div>
          <div style={buttonRow}>
            <button style={signupBtn} onClick={() => setShowForm(true)}>Sign Up</button>
            <Link to="/auth/login" style={{ textDecoration: 'none' }}><button style={loginBtn}>Log In</button></Link>
          </div>
        </div>
      </div>
      {/* Why Choose Section */}
      <div style={whySection}>
        <h2 style={{ fontWeight: 800, fontSize: 28, color: '#222', marginBottom: 8 }}>Why Choose TumaRide?</h2>
        <div style={{ color: '#444', fontSize: 17, marginBottom: 8 }}>We provide a comprehensive suite of delivery services tailored to meet your needs.</div>
        <div style={cardRow}>
          {featureCards.map(cardData => (
            <div key={cardData.title} style={card}>
              <div style={cardIcon}>{cardData.icon}</div>
              <div style={cardTitle}>{cardData.title}</div>
              <div style={cardDesc}>{cardData.desc}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Sign Up Form Modal */}
      {showForm && (
        <div style={formModalBg}>
          <form onSubmit={handleSignUp} style={formModal}>
            <button type="button" style={closeBtn} onClick={() => setShowForm(false)} aria-label="Close">×</button>
            <h2 style={{ color: '#1db954', fontWeight: 800, marginBottom: 24, textAlign: 'center' }}>Sign Up</h2>
            <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" required style={{ display: 'block', margin: '1rem 0', padding: 12, width: '100%', borderRadius: 8, border: '1px solid #e8f5e9', fontSize: 16 }} />
            <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" required style={{ display: 'block', margin: '1rem 0', padding: 12, width: '100%', borderRadius: 8, border: '1px solid #e8f5e9', fontSize: 16 }} />
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" required style={{ display: 'block', margin: '1rem 0', padding: 12, width: '100%', borderRadius: 8, border: '1px solid #e8f5e9', fontSize: 16 }} />
            <div style={{ position: 'relative', margin: '1rem 0' }}>
              <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type={showPassword ? 'text' : 'password'} required style={{ display: 'block', padding: 12, width: '100%', borderRadius: 8, border: '1px solid #e8f5e9', fontSize: 16 }} />
              <button type="button" onClick={() => setShowPassword(v => !v)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }} tabIndex={-1} aria-label="Toggle password visibility">
                <EyeIcon visible={showPassword} />
              </button>
            </div>
            <div style={{ position: 'relative', margin: '1rem 0' }}>
              <input value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} placeholder="Repeat Password" type={showRepeatPassword ? 'text' : 'password'} required style={{ display: 'block', padding: 12, width: '100%', borderRadius: 8, border: '1px solid #e8f5e9', fontSize: 16 }} />
              <button type="button" onClick={() => setShowRepeatPassword(v => !v)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }} tabIndex={-1} aria-label="Toggle repeat password visibility">
                <EyeIcon visible={showRepeatPassword} />
              </button>
            </div>
            <div style={{ margin: '1rem 0', textAlign: 'center' }}>
              <label style={{ marginRight: 16 }}>
                <input type="radio" name="type" value="sender" checked={type === 'sender'} onChange={() => setType('sender')} /> Sender
              </label>
              <label>
                <input type="radio" name="type" value="mover" checked={type === 'mover'} onChange={() => setType('mover')} /> Rider
              </label>
            </div>
            {error && <div style={{ color: 'red', marginBottom: 12, textAlign: 'center' }}>{error}</div>}
            {success && <div style={{ color: 'green', marginBottom: 12, textAlign: 'center' }}>Registration successful!</div>}
            <button type="submit" disabled={loading} style={{ background: '#1db954', color: '#fff', border: 'none', padding: '0.9rem 0', borderRadius: 8, width: '100%', fontWeight: 700, fontSize: 18, marginTop: 8 }}>{loading ? 'Signing Up...' : 'Sign Up'}</button>
            <div style={{ textAlign: 'center', marginTop: 18, color: '#888' }}>
              Already have an account? <Link to="/auth/login" style={{ color: '#1db954', fontWeight: 600 }}>Sign In</Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignUp; 