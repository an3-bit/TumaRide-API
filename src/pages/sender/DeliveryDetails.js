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

const selectBase = {
  ...inputBase,
  appearance: 'none',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  background: `#fafafa url("data:image/svg+xml,%3Csvg width='16' height='16' fill='gray' viewBox='0 0 16 16'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E") no-repeat right 12px center/16px 16px`,
};

const DeliveryDetails = () => {
  const navigate = useNavigate();
  return (
    <ResponsiveContainer>
      <h2 style={{ color: '#1db954', fontWeight: 800, marginBottom: 32, textAlign: 'center', fontSize: '2rem' }}>Delivery Details</h2>
      <input placeholder="Pickup Location" style={inputBase} />
      <input placeholder="Drop-off Location" style={inputBase} />
      <select style={selectBase}>
        <option>Parcel Type</option>
        <option>Document</option>
        <option>Box</option>
        <option>Bag</option>
      </select>
      <select style={selectBase}>
        <option>Parcel Size</option>
        <option>Small</option>
        <option>Medium</option>
        <option>Large</option>
      </select>
      <select style={selectBase}>
        <option>Preferred Pickup Time</option>
        <option>Morning</option>
        <option>Afternoon</option>
        <option>Evening</option>
      </select>
      <button type="button" onClick={() => navigate('/sender/delivery-cost')} style={{ ...buttonBase, background: '#1db954', color: '#fff', marginTop: 8 }}>Continue</button>
    </ResponsiveContainer>
  );
};

export default DeliveryDetails; 