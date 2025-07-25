import React, { useState } from 'react';
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
  toggle: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    margin: '1.5rem 0',
  },
};

const Availability = () => {
  const [available, setAvailable] = useState(false);
  const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ color: '#222', fontWeight: 800, marginBottom: 24, textAlign: 'left', fontSize: '1.5rem' }}>Set your availability</h2>
        <div style={styles.toggle}>
          <span style={{ color: '#222', fontWeight: 600 }}>Available</span>
          <label style={{ position: 'relative', display: 'inline-block', width: 48, height: 28 }}>
            <input type="checkbox" checked={available} onChange={() => setAvailable(v => !v)} style={{ opacity: 0, width: 0, height: 0 }} />
            <span style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, background: available ? '#7c3aed' : '#e8f5e9', borderRadius: 28, transition: '0.2s' }} />
            <span style={{ position: 'absolute', left: available ? 24 : 4, top: 4, width: 20, height: 20, background: '#fff', borderRadius: '50%', boxShadow: '0 1px 4px #e8f5e9', transition: '0.2s' }} />
          </label>
        </div>
        <div style={{ color: '#888', fontSize: 15, marginBottom: 8 }}>You'll be able to receive delivery requests</div>
        <button type="button" onClick={() => navigate('/rider/dashboard')} style={{ background: '#1db954', color: '#fff', border: 'none', padding: '0.8rem 0', borderRadius: 8, width: '100%', fontWeight: 700, fontSize: 16, marginTop: 24 }}>Back to Dashboard</button>
      </div>
    </div>
  );
};

export default Availability; 