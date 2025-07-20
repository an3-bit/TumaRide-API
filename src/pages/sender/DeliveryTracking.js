import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const primary = '#1db954';
const secondary = '#fff';

export default function DeliveryTracking() {
  const [photo, setPhoto] = useState(null);
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
          <input type="file" accept="image/*" onChange={handlePhoto} style={{ display: 'none' }} id="tracking-photo-upload" />
          <label htmlFor="tracking-photo-upload" style={{ cursor: 'pointer' }}>
            <img src={photo || 'https://via.placeholder.com/100x100?text=Photo'} alt="" style={{ width: 100, height: 100, borderRadius: '50%', border: `2px solid ${primary}`, objectFit: 'cover', marginBottom: 12 }} />
            <div style={{ color: primary, fontWeight: 600, fontSize: 16 }}>Upload Photo</div>
          </label>
        </div>
        <h2 style={{ color: primary, textAlign: 'center' }}>Delivery Tracking</h2>
        <div style={{ margin: '2rem 0', background: '#e8f5e9', borderRadius: 8, padding: 24, textAlign: 'center' }}>
          <p>Live tracking and delivery status will appear here.</p>
        </div>
        <div style={{ marginTop: 18, textAlign: 'center' }}>
          <button onClick={() => setShowOnboarding(true)} style={{ background: 'none', color: primary, border: 'none', fontWeight: 600, cursor: 'pointer' }}>Go to onboarding</button>
        </div>
      </div>
    </div>
  );
} 