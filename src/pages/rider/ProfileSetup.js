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
  card: {
    background: '#fff',
    borderRadius: 16,
    boxShadow: '0 2px 16px #e8f5e9',
    padding: 32,
    minWidth: 320,
    maxWidth: 400,
    width: '100%',
  },
  '@media (maxWidth: 600px)': {
    card: {
      padding: 16,
      minWidth: 'unset',
      maxWidth: '95vw',
    },
    container: {
      padding: 0,
    },
  },
};

const ProfileSetup = () => {
  const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={{ fontWeight: 700, color: '#222', marginBottom: 8 }}>Step 1 of 3</div>
        <div style={{ width: '100%', background: '#e8f5e9', borderRadius: 8, height: 8, marginBottom: 16 }}>
          <div style={{ width: '33%', height: 8, background: '#1db954', borderRadius: 8, transition: 'width 1s' }} />
        </div>
        <div style={{ fontWeight: 700, color: '#222', marginBottom: 8 }}>Verify your identity</div>
        <div style={{ color: '#444', fontSize: 15, marginBottom: 16 }}>
          To ensure the safety of our community, we require all riders to verify their identity. Please upload the following documents:
        </div>
        <div style={{ marginBottom: 12 }}>
          <button type="button" style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#e8f5e9', border: 'none', borderRadius: 8, padding: 10, width: '100%', marginBottom: 8, color: '#222', fontWeight: 600 }}>
            <span role="img" aria-label="id">🪪</span> Upload ID
          </button>
          <button type="button" style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#e8f5e9', border: 'none', borderRadius: 8, padding: 10, width: '100%', marginBottom: 8, color: '#222', fontWeight: 600 }}>
            <span role="img" aria-label="license">🚗</span> Upload Driver's License
          </button>
          <button type="button" style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#e8f5e9', border: 'none', borderRadius: 8, padding: 10, width: '100%', color: '#222', fontWeight: 600 }}>
            <span role="img" aria-label="photo">📷</span> Upload Profile Photo
          </button>
        </div>
        <div style={{ fontWeight: 700, color: '#222', marginBottom: 8 }}>Set your preferred route</div>
        <input placeholder="Enter your route" style={{ display: 'block', margin: '1rem 0', padding: 12, width: '100%', borderRadius: 8, border: '1px solid #e8f5e9', fontSize: 16 }} />
        <button type="button" onClick={() => navigate('/rider/profile-under-review')} style={{ background: '#7c3aed', color: '#fff', border: 'none', padding: '0.9rem 0', borderRadius: 8, width: '100%', fontWeight: 700, fontSize: 18, marginTop: 8 }}>Next</button>
      </div>
    </div>
  );
};

export default ProfileSetup; 