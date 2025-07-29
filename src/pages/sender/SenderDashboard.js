import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ResponsiveContainer from '../../components/common/ResponsiveContainer';

const primary = '#1db954';
const secondary = '#fff';

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
  border: `1px solid #1db954`,
  fontSize: 17,
  background: '#fafafa',
};

export default function SenderDashboard() {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handlePhoto = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  if (showOnboarding) {
    return <Link to="/auth/onboarding">Complete your profile in onboarding</Link>;
  }

  return (
    <ResponsiveContainer>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
        <input type="file" accept="image/*" onChange={handlePhoto} style={{ display: 'none' }} id="sender-photo-upload" />
        <label htmlFor="sender-photo-upload" style={{ cursor: 'pointer' }}>
          <img src={photo || 'https://via.placeholder.com/100x100?text=Photo'} alt="" style={{ width: 100, height: 100, borderRadius: '50%', border: `2px solid #1db954`, objectFit: 'cover', marginBottom: 12 }} />
          <div style={{ color: '#1db954', fontWeight: 600, fontSize: 16 }}>Upload Photo</div>
        </label>
      </div>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={inputBase} />
      <button style={{ ...buttonBase, background: '#1db954', color: '#fff' }}>Save</button>
      <div style={{ marginTop: 18, textAlign: 'center' }}>
        <button onClick={() => setShowOnboarding(true)} style={{ background: 'none', color: '#1db954', border: 'none', fontWeight: 600, cursor: 'pointer' }}>Go to onboarding</button>
      </div>
    </ResponsiveContainer>
  );
} 