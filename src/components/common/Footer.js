import React from 'react';

const footerStyle = {
  background: '#fff',
  color: '#888',
  borderTop: '1px solid #e8f5e9',
  textAlign: 'center',
  padding: '1.2rem 0',
  fontSize: 15,
  marginTop: 40,
};

const Footer = () => (
  <footer style={footerStyle}>
    &copy; {new Date().getFullYear()} TumaRide. All rights reserved.
  </footer>
);

export default Footer; 