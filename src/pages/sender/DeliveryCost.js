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

const DeliveryCost = () => {
  const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ color: '#1db954', fontWeight: 800, marginBottom: 24, textAlign: 'center', fontSize: '2rem' }}>Delivery cost</h2>
        <div style={{ marginBottom: 16 }}>
          <h4 style={{ color: '#222', marginBottom: 8 }}>Delivery details</h4>
          <div style={{ fontSize: 15, marginBottom: 4 }}>From: <span style={{ color: '#222' }}>123 Main Street, New York</span></div>
          <div style={{ fontSize: 15, marginBottom: 4 }}>To: <span style={{ color: '#222' }}>456 Oak Avenue, Los Angeles</span></div>
          <div style={{ fontSize: 15, marginBottom: 4 }}>Package size: <span style={{ color: '#222' }}>Medium</span></div>
          <div style={{ fontSize: 15, marginBottom: 4 }}>Package value: <span style={{ color: '#222' }}>$50</span></div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <h4 style={{ color: '#222', marginBottom: 8 }}>Cost breakdown</h4>
          <div style={{ fontSize: 15, marginBottom: 4 }}>Base fare: <span style={{ color: '#222' }}>$10.00</span></div>
          <div style={{ fontSize: 15, marginBottom: 4 }}>Distance fee: <span style={{ color: '#222' }}>$5.00</span></div>
          <div style={{ fontSize: 15, marginBottom: 4 }}>Service fee: <span style={{ color: '#222' }}>$2.00</span></div>
          <div style={{ fontWeight: 700, fontSize: 16, marginTop: 8 }}>Estimated total: <span style={{ color: '#1db954' }}>$17.00</span></div>
        </div>
        <button type="button" onClick={() => navigate('/sender/finding-rider')} style={{ background: '#1db954', color: '#fff', border: 'none', padding: '0.9rem 0', borderRadius: 8, width: '100%', fontWeight: 700, fontSize: 18, marginTop: 8 }}>Confirm delivery</button>
      </div>
    </div>
  );
};

export default DeliveryCost; 