import React from 'react';
import { useNavigate } from 'react-router-dom';
import ResponsiveContainer from '../../components/common/ResponsiveContainer';

const buttonBase = {
  border: 'none',
  borderRadius: 8,
  width: '100%',
  fontWeight: 700,
  fontSize: 18,
  padding: '1rem 0',
  marginBottom: 8,
  cursor: 'pointer',
  transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
  boxShadow: '0 1px 4px #e8f5e9',
};

const Tracking = () => {
  const navigate = useNavigate();
  return (
    <ResponsiveContainer>
      <div style={{ height: 180, background: '#e8f5e9', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}>
        <span style={{ color: '#1db954', fontWeight: 700, fontSize: 24 }}>Map Placeholder</span>
      </div>
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
      <button type="button" onClick={() => navigate('/sender/payment')} style={{ ...buttonBase, background: '#1db954', color: '#fff', marginTop: 24 }}>Proceed to Payment</button>
    </ResponsiveContainer>
  );
};

export default Tracking; 