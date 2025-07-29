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

const statGrid = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: 24,
  marginBottom: 32,
};

const statCard = {
  background: '#f8fdf9',
  borderRadius: 12,
  padding: 20,
  textAlign: 'center',
  fontWeight: 700,
  fontSize: 18,
  color: '#222',
  boxShadow: '0 1px 4px #e8f5e9',
};

const tripList = {
  marginTop: 24,
  background: '#fafafa',
  borderRadius: 12,
  padding: 20,
  boxShadow: '0 1px 4px #e8f5e9',
};

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <ResponsiveContainer>
      <h2 style={{ color: '#222', fontWeight: 800, marginBottom: 32, textAlign: 'left', fontSize: '2rem' }}>Earnings Dashboard</h2>
      <div style={statGrid}>
        <div style={statCard}><div>Total Earnings</div><div style={{ color: '#1db954', fontSize: 22 }}>$1,250</div></div>
        <div style={statCard}><div>Trips Completed</div><div style={{ color: '#1db954', fontSize: 22 }}>75</div></div>
        <div style={statCard}><div>Avg. Rating</div><div style={{ color: '#e53e3e', fontSize: 22 }}>4.8</div></div>
      </div>
      <h3 style={{ color: '#222', fontWeight: 700, margin: '32px 0 12px 0', fontSize: 20 }}>Trip History</h3>
      <div style={tripList}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}><span>Trip #12345</span> <span>$25</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}><span>Trip #67890</span> <span>$30</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Trip #11223</span> <span>$20</span></div>
      </div>
      <div style={{ marginTop: 40, display: 'flex', gap: 16 }}>
        <button type="button" onClick={() => navigate('/rider/availability')} style={{ ...buttonBase, background: '#7c3aed', color: '#fff' }}>Set Availability</button>
        <button type="button" onClick={() => navigate('/rider/new-delivery-request')} style={{ ...buttonBase, background: '#1db954', color: '#fff' }}>New Delivery Request</button>
        <button type="button" onClick={() => navigate('/rider/withdraw')} style={{ ...buttonBase, background: '#e8f5e9', color: '#222' }}>Withdraw</button>
      </div>
    </ResponsiveContainer>
  );
};

export default Dashboard; 