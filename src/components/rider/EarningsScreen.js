import React from 'react';

const EarningsScreen = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h2 style={{ color: '#1db954' }}>Earnings</h2>
    {/* Earnings info placeholder */}
    <div style={{ margin: '2rem 0', background: '#e8f5e9', borderRadius: 8, padding: 24 }}>
      <h3>Total Earnings</h3>
      <p>KES 0</p>
      <button style={{ background: '#1db954', color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: 4, marginTop: 16 }}>Withdraw to M-PESA</button>
    </div>
  </div>
);

export default EarningsScreen; 