import React from 'react';

const footerFixedStyle = {
  position: 'fixed',
  left: 0,
  bottom: 0,
  width: '100vw',
  background: '#fff',
  borderTop: '1px solid #e8f5e9',
  color: '#888',
  fontSize: 14,
  textAlign: 'center',
  padding: '1.2rem 0',
  zIndex: 99,
};

const MinimalFooter = () => (
  <>
    {/* Offset for fixed footer */}
    <div style={{ height: 60 }} />
    <footer style={footerFixedStyle}>
      © {new Date().getFullYear()} TumaRide. All rights reserved.
    </footer>
  </>
);

export default MinimalFooter; 