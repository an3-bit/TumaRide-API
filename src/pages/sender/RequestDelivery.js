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

const inputBase = {
  width: '100%',
  marginBottom: 16,
  padding: 14,
  borderRadius: 8,
  border: '1px solid #e8f5e9',
  fontSize: 17,
  background: '#fafafa',
};

const RequestDelivery = () => {
  const navigate = useNavigate();
  return (
    <ResponsiveContainer>
      <h2 style={{ color: '#1db954', fontWeight: 800, marginBottom: 32, textAlign: 'center', fontSize: '2rem' }}>Where to?</h2>
      <input placeholder="Enter destination" style={inputBase} />
      <input placeholder="Enter pickup location" style={inputBase} />
      <button type="button" onClick={() => navigate('/sender/delivery-details')} style={{ ...buttonBase, background: '#1db954', color: '#fff', marginTop: 8 }}>Request a Ride</button>
    </ResponsiveContainer>
  );
};

export default RequestDelivery; 