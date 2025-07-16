import React from 'react';

const LocationPicker = ({ label, onSelect }) => (
  <div style={{ margin: '1rem 0' }}>
    <label style={{ color: '#1db954' }}>{label}</label>
    <input type="text" placeholder="Enter location..." style={{ padding: '0.5rem', width: '100%', border: '1px solid #1db954', borderRadius: 4 }} />
    <button style={{ marginTop: 8, background: '#1db954', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: 4 }} onClick={onSelect}>Pick</button>
  </div>
);

export default LocationPicker; 