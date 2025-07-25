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
  stat: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 12,
    fontWeight: 700,
    fontSize: 18,
  },
  trip: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #e8f5e9',
    fontSize: 15,
  },
};

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ color: '#222', fontWeight: 800, marginBottom: 24, textAlign: 'left', fontSize: '1.5rem' }}>Earnings</h2>
        <div style={styles.stat}><span>Total Earnings</span> <span style={{ color: '#1db954' }}>$1,250</span></div>
        <div style={styles.stat}><span>Trips Completed</span> <span style={{ color: '#1db954' }}>75</span></div>
        <div style={styles.stat}><span>Average Rating</span> <span style={{ color: '#e53e3e' }}>4.8</span></div>
        <h3 style={{ color: '#222', fontWeight: 700, margin: '24px 0 12px 0', fontSize: 18 }}>Trip History</h3>
        <div style={styles.trip}><span>Trip #12345</span> <span>$25</span></div>
        <div style={styles.trip}><span>Trip #67890</span> <span>$30</span></div>
        <div style={styles.trip}><span>Trip #11223</span> <span>$20</span></div>
        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button type="button" onClick={() => navigate('/rider/availability')} style={{ background: '#7c3aed', color: '#fff', border: 'none', padding: '0.8rem 0', borderRadius: 8, width: '100%', fontWeight: 700, fontSize: 16 }}>Set Availability</button>
          <button type="button" onClick={() => navigate('/rider/new-delivery-request')} style={{ background: '#1db954', color: '#fff', border: 'none', padding: '0.8rem 0', borderRadius: 8, width: '100%', fontWeight: 700, fontSize: 16 }}>New Delivery Request</button>
          <button type="button" onClick={() => navigate('/rider/withdraw')} style={{ background: '#e8f5e9', color: '#222', border: 'none', padding: '0.8rem 0', borderRadius: 8, width: '100%', fontWeight: 700, fontSize: 16 }}>Withdraw</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 