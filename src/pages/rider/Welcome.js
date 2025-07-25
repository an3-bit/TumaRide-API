import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f8fdf9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  form: {
    background: '#fff',
    borderRadius: 16,
    boxShadow: '0 2px 16px #e8f5e9',
    padding: 32,
    minWidth: 320,
    maxWidth: 400,
    width: '100%',
  },
  '@media (maxWidth: 600px)': {
    form: {
      padding: 16,
      minWidth: 'unset',
      maxWidth: '95vw',
    },
    container: {
      padding: 0,
    },
  },
};

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <form style={styles.form}>
        <h2 style={{ color: '#1db954', fontWeight: 800, marginBottom: 24, textAlign: 'center', fontSize: '2rem' }}>Welcome to TumaRide</h2>
        <div style={{ color: '#222', marginBottom: 16, textAlign: 'center' }}>
          Join our community of riders and start earning by delivering packages on your trips.
        </div>
        <input placeholder="Email" type="email" style={{ display: 'block', margin: '1rem 0', padding: 12, width: '100%', borderRadius: 8, border: '1px solid #e8f5e9', fontSize: 16 }} />
        <input placeholder="Password" type="password" style={{ display: 'block', margin: '1rem 0', padding: 12, width: '100%', borderRadius: 8, border: '1px solid #e8f5e9', fontSize: 16 }} />
        <button type="button" onClick={() => navigate('/rider/profile-setup')} style={{ background: '#7c3aed', color: '#fff', border: 'none', padding: '0.9rem 0', borderRadius: 8, width: '100%', fontWeight: 700, fontSize: 18, marginTop: 8 }}>Sign Up</button>
        <div style={{ textAlign: 'center', marginTop: 18, color: '#888' }}>
          Already have an account? <span style={{ color: '#1db954', fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate('/auth/login')}>Log In</span>
        </div>
      </form>
    </div>
  );
};

export default Welcome; 