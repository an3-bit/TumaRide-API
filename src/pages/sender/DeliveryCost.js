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

const DeliveryCost = () => {
  const navigate = useNavigate();
  return (
    <ResponsiveContainer>
      <h2 style={{ color: '#1db954', fontWeight: 800, marginBottom: 32, textAlign: 'center', fontSize: '2rem' }}>Delivery cost</h2>
      <div style={{ marginBottom: 24, background: '#fafafa', borderRadius: 12, padding: 20, boxShadow: '0 1px 4px #e8f5e9' }}>
        <h4 style={{ color: '#222', marginBottom: 8 }}>Delivery details</h4>
        <div style={{ fontSize: 16, marginBottom: 4 }}>From: <span style={{ color: '#222' }}>123 Main Street, New York</span></div>
        <div style={{ fontSize: 16, marginBottom: 4 }}>To: <span style={{ color: '#222' }}>456 Oak Avenue, Los Angeles</span></div>
        <div style={{ fontSize: 16, marginBottom: 4 }}>Package size: <span style={{ color: '#222' }}>Medium</span></div>
        <div style={{ fontSize: 16, marginBottom: 4 }}>Package value: <span style={{ color: '#222' }}>$50</span></div>
      </div>
      <div style={{ marginBottom: 24, background: '#fafafa', borderRadius: 12, padding: 20, boxShadow: '0 1px 4px #e8f5e9' }}>
        <h4 style={{ color: '#222', marginBottom: 8 }}>Cost breakdown</h4>
        <div style={{ fontSize: 16, marginBottom: 4 }}>Base fare: <span style={{ color: '#222' }}>$10.00</span></div>
        <div style={{ fontSize: 16, marginBottom: 4 }}>Distance fee: <span style={{ color: '#222' }}>$5.00</span></div>
        <div style={{ fontSize: 16, marginBottom: 4 }}>Service fee: <span style={{ color: '#222' }}>$2.00</span></div>
        <div style={{ fontWeight: 700, fontSize: 18, marginTop: 8 }}>Estimated total: <span style={{ color: '#1db954' }}>$17.00</span></div>
      </div>
      <button type="button" onClick={() => navigate('/sender/finding-rider')} style={{ ...buttonBase, background: '#1db954', color: '#fff', marginTop: 8 }}>Confirm delivery</button>
    </ResponsiveContainer>
  );
};

export default DeliveryCost; 