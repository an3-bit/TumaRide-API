import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const EyeIcon = ({ visible }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}>
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
    <circle cx="12" cy="12" r="3" fill={visible ? 'none' : '#888'} />
  </svg>
);

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
      const res = await fetch('https://tumaridesapi.onrender.com/api/v1/auth/register', {
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
          if (type === 'mover') {
            navigate('/rider');
          } else {
            navigate('/sender');
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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fdf9' }}>
      <form onSubmit={handleSignUp} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #e8f5e9', padding: 36, minWidth: 340, maxWidth: 400 }}>
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
  );
};

export default SignUp; 