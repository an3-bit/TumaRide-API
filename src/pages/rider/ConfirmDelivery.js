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

const ConfirmDelivery = () => {
  const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ color: '#222', fontWeight: 800, marginBottom: 24, textAlign: 'left', fontSize: '1.5rem' }}>Confirm Delivery</h2>
        <div style={{ color: '#888', fontSize: 15, marginBottom: 16 }}>
          Please confirm the delivery of the parcel. You may be required to provide a photo of the delivered parcel or an OTP from the recipient.
        </div>
        <input placeholder="Enter OTP" style={{ display: 'block', margin: '1rem 0', padding: 12, width: '100%', borderRadius: 8, border: '1px solid #e8f5e9', fontSize: 16 }} />
        <button type="button" onClick={() => navigate('/rider/dashboard')} style={{ background: '#7c3aed', color: '#fff', border: 'none', padding: '0.9rem 0', borderRadius: 8, width: '100%', fontWeight: 700, fontSize: 18 }}>Confirm Delivery</button>
      </div>
    </div>
  );
};

export default ConfirmDelivery; 