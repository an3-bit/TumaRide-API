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

const ProfileSetup = () => {
  const navigate = useNavigate();
  return (
    <ResponsiveContainer>
      <div style={{ fontWeight: 700, color: '#222', marginBottom: 8 }}>Step 1 of 3</div>
      <div style={{ width: '100%', background: '#e8f5e9', borderRadius: 8, height: 8, marginBottom: 16 }}>
        <div style={{ width: '33%', height: 8, background: '#1db954', borderRadius: 8, transition: 'width 1s' }} />
      </div>
      <div style={{ fontWeight: 700, color: '#222', marginBottom: 8 }}>Verify your identity</div>
      <div style={{ color: '#444', fontSize: 16, marginBottom: 16 }}>
        To ensure the safety of our community, we require all riders to verify their identity. Please upload the following documents:
      </div>
      <div style={{ marginBottom: 12 }}>
        <button type="button" style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#e8f5e9', border: 'none', borderRadius: 8, padding: 12, width: '100%', marginBottom: 8, color: '#222', fontWeight: 600, fontSize: 16 }}>
          <span role="img" aria-label="id">🪪</span> Upload ID
        </button>
        <button type="button" style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#e8f5e9', border: 'none', borderRadius: 8, padding: 12, width: '100%', marginBottom: 8, color: '#222', fontWeight: 600, fontSize: 16 }}>
          <span role="img" aria-label="license">🚗</span> Upload Driver's License
        </button>
        <button type="button" style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#e8f5e9', border: 'none', borderRadius: 8, padding: 12, width: '100%', color: '#222', fontWeight: 600, fontSize: 16 }}>
          <span role="img" aria-label="photo">📷</span> Upload Profile Photo
        </button>
      </div>
      <div style={{ fontWeight: 700, color: '#222', marginBottom: 8 }}>Set your preferred route</div>
      <input placeholder="Enter your route" style={inputBase} />
      <button type="button" onClick={() => navigate('/rider/profile-under-review')} style={{ ...buttonBase, background: '#7c3aed', color: '#fff', marginTop: 8 }}>Next</button>
    </ResponsiveContainer>
  );
};

export default ProfileSetup; 