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
  },
  '@media (maxWidth: 600px)': {
    card: {
      padding: 0,
      minWidth: 'unset',
      maxWidth: '95vw',
    },
    container: {
      padding: 0,
    },
  },
};

const Tracking = () => {
  const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={{ height: 180, background: '#e8f5e9', borderTopLeftRadius: 16, borderTopRightRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#1db954', fontWeight: 700, fontSize: 20 }}>Map Placeholder</span>
        </div>
        <div style={{ padding: 24 }}>
          <h4 style={{ color: '#222', marginBottom: 8 }}>Delivery details</h4>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sender" style={{ width: 32, height: 32, borderRadius: '50%', marginRight: 8 }} />
            <span style={{ color: '#222', fontWeight: 600 }}>Sophia Carter</span>
            <span style={{ color: '#888', fontSize: 13, marginLeft: 8 }}>Sender</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
            <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Receiver" style={{ width: 32, height: 32, borderRadius: '50%', marginRight: 8 }} />
            <span style={{ color: '#222', fontWeight: 600 }}>Ethan Bennett</span>
            <span style={{ color: '#888', fontSize: 13, marginLeft: 8 }}>Receiver</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
            <img src="https://randomuser.me/api/portraits/men/46.jpg" alt="Rider" style={{ width: 32, height: 32, borderRadius: '50%', marginRight: 8 }} />
            <span style={{ color: '#222', fontWeight: 600 }}>Liam Harper</span>
            <span style={{ color: '#888', fontSize: 13, marginLeft: 8 }}>Rider</span>
          </div>
          <div style={{ color: '#222', fontWeight: 600, marginTop: 12 }}><span role="img" aria-label="clock">⏰</span> 10:30 AM <span style={{ color: '#888', fontWeight: 400, fontSize: 14, marginLeft: 8 }}>Estimated delivery time</span></div>
          <button type="button" onClick={() => navigate('/sender/payment')} style={{ background: '#1db954', color: '#fff', border: 'none', padding: '0.9rem 0', borderRadius: 8, width: '100%', fontWeight: 700, fontSize: 18, marginTop: 24 }}>Proceed to Payment</button>
        </div>
      </div>
    </div>
  );
};

export default Tracking; 