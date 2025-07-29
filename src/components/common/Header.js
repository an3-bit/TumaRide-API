import React from 'react';
import { Link } from 'react-router-dom';

const headerStyle = {
  background: '#fff',
  color: '#1db954',
  borderBottom: '1px solid #e8f5e9',
  padding: '0.7rem 0',
  position: 'sticky',
  top: 0,
  zIndex: 10,
};
const navStyle = {
  maxWidth: 1100,
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 16px',
};
const logoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  textDecoration: 'none',
};
const logoImg = {
  width: 36,
  height: 36,
  objectFit: 'contain',
  borderRadius: 8,
  background: '#f8fdf9',
};
const navLinks = {
  display: 'flex',
  gap: 18,
  alignItems: 'center',
};
const linkStyle = {
  color: '#1db954',
  fontWeight: 700,
  fontSize: 16,
  textDecoration: 'none',
  padding: '6px 12px',
  borderRadius: 6,
  transition: 'background 0.2s',
};
const linkActive = {
  background: '#e8f5e9',
};

const Header = () => (
  <header style={headerStyle}>
    <nav style={navStyle}>
      <Link to="/" style={logoStyle}>
        <img src="/iconT.png" alt="TumaRide Logo" style={logoImg} />
        <span style={{ fontWeight: 800, fontSize: 22, color: '#1db954', letterSpacing: 1 }}>TumaRide</span>
      </Link>
      <div style={navLinks}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/auth/signup" style={linkStyle}>Sign Up</Link>
        <Link to="/auth/login" style={linkStyle}>Log In</Link>
      </div>
    </nav>
  </header>
);

export default Header; 