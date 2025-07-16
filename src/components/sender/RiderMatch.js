import React from 'react';

const RiderMatch = ({ rider, onAccept, onDecline }) => (
  <div style={{ background: '#fff', border: '1px solid #1db954', borderRadius: 8, padding: 24, maxWidth: 400, margin: '2rem auto', textAlign: 'center' }}>
    <h2 style={{ color: '#1db954' }}>Rider Matched!</h2>
    {/* Rider info placeholder */}
    <div style={{ margin: '1rem 0' }}>
      <img src={rider?.photo || 'https://via.placeholder.com/80'} alt="Rider" style={{ borderRadius: '50%', width: 80, height: 80 }} />
      <h3>{rider?.name || 'Rider Name'}</h3>
      <p>Rating: {rider?.rating || '5.0'}</p>
    </div>
    <button onClick={onAccept} style={{ background: '#1db954', color: '#fff', border: 'none', padding: '0.5rem 1.5rem', borderRadius: 4, marginRight: 8 }}>Accept</button>
    <button onClick={onDecline} style={{ background: '#fff', color: '#1db954', border: '1px solid #1db954', padding: '0.5rem 1.5rem', borderRadius: 4 }}>Decline</button>
  </div>
);

export default RiderMatch; 