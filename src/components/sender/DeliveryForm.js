import React from 'react';

const DeliveryForm = () => (
  <form style={{ background: '#fff', border: '1px solid #1db954', borderRadius: 8, padding: 24, maxWidth: 400, margin: '2rem auto' }}>
    <h2 style={{ color: '#1db954' }}>Send a Parcel</h2>
    {/* Form fields for pickup, drop-off, parcel type, size, time */}
    <input placeholder="Pickup Location" style={{ display: 'block', margin: '1rem 0', padding: 8, width: '100%' }} />
    <input placeholder="Drop-off Location" style={{ display: 'block', margin: '1rem 0', padding: 8, width: '100%' }} />
    <input placeholder="Parcel Type" style={{ display: 'block', margin: '1rem 0', padding: 8, width: '100%' }} />
    <input placeholder="Size" style={{ display: 'block', margin: '1rem 0', padding: 8, width: '100%' }} />
    <input placeholder="Pickup Time" type="datetime-local" style={{ display: 'block', margin: '1rem 0', padding: 8, width: '100%' }} />
    <button type="submit" style={{ background: '#1db954', color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: 4 }}>Request Delivery</button>
  </form>
);

export default DeliveryForm; 