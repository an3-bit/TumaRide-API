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
};

const ConfirmPickup = () => {
  const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ color: '#222', fontWeight: 800, marginBottom: 24, textAlign: 'left', fontSize: '1.5rem' }}>Pickup details</h2>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
          <img src="https://randomuser.me/api/portraits/men/44.jpg" alt="Sender" style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 12 }} />
          <div>
            <div style={{ color: '#222', fontWeight: 700 }}>Liam Carter</div>
            <div style={{ color: '#888', fontSize: 14 }}>Sender</div>
          </div>
        </div>
        <div style={{ marginBottom: 8 }}><b>Pickup:</b> 123 Main St, Anytown</div>
        <div style={{ marginBottom: 8 }}><b>Dropoff:</b> 456 Oak Ave, Anytown</div>
        <div style={{ marginBottom: 8 }}><b>Size:</b> Small</div>
        <div style={{ marginBottom: 8 }}><b>Contents:</b> Documents</div>
        <div style={{ marginBottom: 16 }}><b>Pickup code:</b> 1234</div>
        <button type="button" onClick={() => navigate('/rider/dropoff')} style={{ background: '#7c3aed', color: '#fff', border: 'none', padding: '0.9rem 0', borderRadius: 8, width: '100%', fontWeight: 700, fontSize: 18 }}>Confirm pickup</button>
      </div>
    </div>
  );
};

export default ConfirmPickup; 