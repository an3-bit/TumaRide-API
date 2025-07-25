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

const Withdraw = () => {
  const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={{ color: '#888', fontSize: 15, marginBottom: 8 }}>Available balance</div>
        <div style={{ color: '#222', fontWeight: 700, fontSize: 20, marginBottom: 16 }}>Ksh 1,200</div>
        <div style={{ color: '#888', fontSize: 15, marginBottom: 8 }}>Withdrawal method</div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
          <span role="img" aria-label="mpesa" style={{ fontSize: 20, marginRight: 8 }}>📱</span>
          <span style={{ color: '#222', fontWeight: 600 }}>M-PESA</span>
          <span style={{ color: '#888', fontSize: 14, marginLeft: 8 }}>0712345678</span>
        </div>
        <input placeholder="Enter amount" style={{ display: 'block', margin: '1rem 0', padding: 12, width: '100%', borderRadius: 8, border: '1px solid #e8f5e9', fontSize: 16 }} />
        <button type="button" style={{ background: '#7c3aed', color: '#fff', border: 'none', padding: '0.9rem 0', borderRadius: 8, width: '100%', fontWeight: 700, fontSize: 18 }}>Withdraw</button>
        <button type="button" onClick={() => navigate('/rider/dashboard')} style={{ background: '#1db954', color: '#fff', border: 'none', padding: '0.8rem 0', borderRadius: 8, width: '100%', fontWeight: 700, fontSize: 16, marginTop: 16 }}>Back to Dashboard</button>
      </div>
    </div>
  );
};

export default Withdraw; 