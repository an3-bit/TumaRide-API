import React from 'react';

const Loading = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '2rem' }}>
    <div style={{
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #1db954',
      borderRadius: '50%',
      width: 40,
      height: 40,
      animation: 'spin 1s linear infinite'
    }} />
    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    <span style={{ marginTop: 10, color: '#1db954' }}>Loading...</span>
  </div>
);

export default Loading; 