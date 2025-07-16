import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('sender');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    if (role === 'mover') {
      navigate('/rider');
    } else {
      navigate('/sender');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fdf9' }}>
      <form onSubmit={handleSignUp} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #e8f5e9', padding: 36, minWidth: 340, maxWidth: 400 }}>
        <h2 style={{ color: '#1db954', fontWeight: 800, marginBottom: 24, textAlign: 'center' }}>Sign Up</h2>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required style={{ display: 'block', margin: '1rem 0', padding: 12, width: '100%', borderRadius: 8, border: '1px solid #e8f5e9', fontSize: 16 }} />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" required style={{ display: 'block', margin: '1rem 0', padding: 12, width: '100%', borderRadius: 8, border: '1px solid #e8f5e9', fontSize: 16 }} />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" required style={{ display: 'block', margin: '1rem 0', padding: 12, width: '100%', borderRadius: 8, border: '1px solid #e8f5e9', fontSize: 16 }} />
        <div style={{ margin: '1rem 0', textAlign: 'center' }}>
          <label style={{ marginRight: 16 }}>
            <input type="radio" name="role" value="sender" checked={role === 'sender'} onChange={() => setRole('sender')} /> Sender
          </label>
          <label>
            <input type="radio" name="role" value="mover" checked={role === 'mover'} onChange={() => setRole('mover')} /> Mover
          </label>
        </div>
        <button type="submit" style={{ background: '#1db954', color: '#fff', border: 'none', padding: '0.9rem 0', borderRadius: 8, width: '100%', fontWeight: 700, fontSize: 18, marginTop: 8 }}>Sign Up</button>
        <div style={{ textAlign: 'center', marginTop: 18, color: '#888' }}>
          Already have an account? <Link to="/auth/login" style={{ color: '#1db954', fontWeight: 600 }}>Sign In</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp; 