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

const Receipt = () => {
  const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&q=80" alt="Success" style={{ width: 80, height: 80, borderRadius: 16, marginBottom: 16 }} />
        <h2 style={{ color: '#1db954', fontWeight: 800, marginBottom: 12, fontSize: '2rem' }}>Payment Successful</h2>
        <div style={{ color: '#222', marginBottom: 16 }}>Your payment has been successfully processed. Thank you for using TumaRide!</div>
        <div style={{ textAlign: 'left', marginBottom: 16 }}>
          <div style={{ color: '#888', fontSize: 15 }}>Date <span style={{ color: '#222', float: 'right' }}>July 26, 2024</span></div>
          <div style={{ color: '#888', fontSize: 15 }}>Time <span style={{ color: '#222', float: 'right' }}>10:30 AM</span></div>
          <div style={{ color: '#888', fontSize: 15 }}>Amount <span style={{ color: '#222', float: 'right' }}>$25.00</span></div>
          <div style={{ color: '#888', fontSize: 15 }}>Payment Method <span style={{ color: '#222', float: 'right' }}>Credit Card</span></div>
          <div style={{ color: '#888', fontSize: 15 }}>Transaction ID <span style={{ color: '#222', float: 'right' }}>TXN1234567890</span></div>
        </div>
        <button onClick={() => navigate('/sender/live-tracking')} style={{ background: '#1db954', color: '#fff', border: 'none', padding: '0.8rem 0', borderRadius: 8, width: '100%', fontWeight: 700, fontSize: 16, marginTop: 8 }}>Done</button>
      </div>
    </div>
  );
};

export default Receipt; 