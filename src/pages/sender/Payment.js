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

const Payment = () => {
  const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <form style={styles.form}>
        <h2 style={{ color: '#1db954', fontWeight: 800, marginBottom: 24, textAlign: 'center', fontSize: '2rem' }}>Choose payment method</h2>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', background: '#e8f5e9', borderRadius: 8, padding: 12, marginBottom: 8 }}>
            <input type="radio" name="payment" defaultChecked /> TumaRide Wallet <span style={{ color: '#888', fontSize: 14, marginLeft: 8 }}>Balance: KES1,200</span>
          </label>
          <label style={{ display: 'block', background: '#e8f5e9', borderRadius: 8, padding: 12 }}>
            <input type="radio" name="payment" /> M-PESA <span style={{ color: '#888', fontSize: 14, marginLeft: 8 }}>Pay with M-PESA</span>
          </label>
        </div>
        <button type="button" onClick={() => navigate('/sender/receipt')} style={{ background: '#1db954', color: '#fff', border: 'none', padding: '0.9rem 0', borderRadius: 8, width: '100%', fontWeight: 700, fontSize: 18, marginTop: 8 }}>Continue</button>
      </form>
    </div>
  );
};

export default Payment; 