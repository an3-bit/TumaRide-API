import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const primary = '#1db954';
const secondary = '#fff';

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
    <div style={{ minHeight: '100vh', background: '#f8fdf9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: secondary, borderRadius: 16, boxShadow: '0 2px 16px #e8f5e9', padding: 36, minWidth: 320, maxWidth: 400, width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
          <input type="file" accept="image/*" onChange={handlePhoto} style={{ display: 'none' }} id="sender-photo-upload" />
          <label htmlFor="sender-photo-upload" style={{ cursor: 'pointer' }}>
            <img src={photo || 'https://via.placeholder.com/100x100?text=Photo'} alt="" style={{ width: 100, height: 100, borderRadius: '50%', border: `2px solid ${primary}`, objectFit: 'cover', marginBottom: 12 }} />
            <div style={{ color: primary, fontWeight: 600, fontSize: 16 }}>Upload Photo</div>
          </label>
        </div>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', marginBottom: 16, padding: 12, borderRadius: 8, border: `1px solid ${primary}` }} />
        <button style={{ background: primary, color: secondary, border: 'none', borderRadius: 8, padding: '1rem 0', fontWeight: 700, fontSize: 18, width: '100%' }}>Save</button>
        <div style={{ marginTop: 18, textAlign: 'center' }}>
          <button onClick={() => setShowOnboarding(true)} style={{ background: 'none', color: primary, border: 'none', fontWeight: 600, cursor: 'pointer' }}>Go to onboarding</button>
        </div>
      </div>
    </div>
  );
} 