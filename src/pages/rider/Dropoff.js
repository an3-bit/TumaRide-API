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
    padding: 0,
    minWidth: 320,
    maxWidth: 400,
    width: '100%',
    overflow: 'hidden',
  },
  map: {
    height: 160,
    background: '#e8f5e9',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    padding: 24,
  },
};

const Dropoff = () => {
  const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.map}>
          <span style={{ color: '#1db954', fontWeight: 700, fontSize: 20 }}>Map Placeholder</span>
        </div>
        <div style={styles.details}>
          <div style={{ color: '#888', fontSize: 15, marginBottom: 8 }}>Drop-off location</div>
          <div style={{ marginBottom: 16 }}><b>Home:</b> 123 Main St, San Francisco, CA</div>
          <button type="button" onClick={() => navigate('/rider/confirm-delivery')} style={{ background: '#7c3aed', color: '#fff', border: 'none', padding: '0.9rem 0', borderRadius: 8, width: '100%', fontWeight: 700, fontSize: 18 }}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default Dropoff; 