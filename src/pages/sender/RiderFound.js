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
    textAlign: 'center',
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

const RiderFound = () => {
  const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ color: '#1db954', fontWeight: 800, marginBottom: 24, fontSize: '2rem' }}>Rider found</h2>
        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Rider" style={{ width: 80, height: 80, borderRadius: '50%', marginBottom: 12 }} />
        <div style={{ fontWeight: 700, fontSize: 18, color: '#222' }}>Ethan Carter</div>
        <div style={{ color: '#888', fontSize: 15, marginBottom: 8 }}>4.8 ★ | 123 trips</div>
        <div style={{ color: '#222', fontSize: 15, marginBottom: 16 }}>Ethan is heading to your destination and can take your package.</div>
        <button onClick={() => navigate('/sender/tracking')} style={{ background: '#1db954', color: '#fff', border: 'none', padding: '0.8rem 0', borderRadius: 8, width: '48%', fontWeight: 700, fontSize: 16, marginRight: '4%' }}>Accept</button>
        <button onClick={() => navigate('/sender/finding-rider')} style={{ background: '#eee', color: '#222', border: 'none', padding: '0.8rem 0', borderRadius: 8, width: '48%', fontWeight: 700, fontSize: 16 }}>Decline</button>
      </div>
    </div>
  );
};

export default RiderFound; 