import React from 'react';

const DeliveryAlert = ({ delivery, onAccept, onReject }) => (
  <div style={{ background: '#fff', border: '1px solid #1db954', borderRadius: 8, padding: 24, maxWidth: 400, margin: '2rem auto', textAlign: 'center' }}>
    <h2 style={{ color: '#1db954' }}>New Delivery Alert</h2>
    {/* Delivery info placeholder */}
    <div style={{ margin: '1rem 0' }}>
      <p>Pickup: {delivery?.pickup || 'Pickup Location'}</p>
      <p>Drop-off: {delivery?.dropoff || 'Drop-off Location'}</p>
      <p>Parcel: {delivery?.parcelType || 'Parcel Type'}</p>
    </div>
    <button onClick={onAccept} style={{ background: '#1db954', color: '#fff', border: 'none', padding: '0.5rem 1.5rem', borderRadius: 4, marginRight: 8 }}>Accept</button>
    <button onClick={onReject} style={{ background: '#fff', color: '#1db954', border: '1px solid #1db954', padding: '0.5rem 1.5rem', borderRadius: 4 }}>Reject</button>
  </div>
);

export default DeliveryAlert; 