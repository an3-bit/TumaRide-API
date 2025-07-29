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

const Pickup = () => {
  const navigate = useNavigate();
  return (
    <ResponsiveContainer>
      <div style={{ height: 180, background: '#e8f5e9', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}>
        <span style={{ color: '#1db954', fontWeight: 700, fontSize: 24 }}>Map Placeholder</span>
      </div>
      <div style={{ color: '#888', fontSize: 16, marginBottom: 8 }}>Pickup location</div>
      <div style={{ marginBottom: 8, fontSize: 17 }}><b>Sender's address:</b> 123 Main St, San Francisco, CA</div>
      <div style={{ marginBottom: 16, fontSize: 17 }}><b>Contact:</b> Sender</div>
      <button type="button" onClick={() => navigate('/rider/confirm-pickup')} style={{ ...buttonBase, background: '#7c3aed', color: '#fff' }}>Navigate</button>
    </ResponsiveContainer>
  );
};

export default Pickup; 