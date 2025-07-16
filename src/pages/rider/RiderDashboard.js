import React from 'react';

const RiderDashboard = () => (
  <div style={{ padding: '2rem' }}>
    <h2 style={{ color: '#1db954' }}>Rider Dashboard</h2>
    {/* Rider dashboard stats placeholder */}
    <div style={{ display: 'flex', gap: 24, margin: '2rem 0' }}>
      <div style={{ background: '#e8f5e9', borderRadius: 8, padding: 16, flex: 1, textAlign: 'center' }}>
        <h3>Trips</h3>
        <p>0</p>
      </div>
      <div style={{ background: '#e8f5e9', borderRadius: 8, padding: 16, flex: 1, textAlign: 'center' }}>
        <h3>Earnings</h3>
        <p>KES 0</p>
      </div>
      <div style={{ background: '#e8f5e9', borderRadius: 8, padding: 16, flex: 1, textAlign: 'center' }}>
        <h3>Rating</h3>
        <p>5.0</p>
      </div>
    </div>
  </div>
);

export default RiderDashboard; 