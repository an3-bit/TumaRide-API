import React from 'react';
import { Link } from 'react-router-dom';

const navFixedStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  zIndex: 100,
  background: '#fff',
  borderBottom: '1px solid #e8f5e9',
};

const navContainerStyle = {
  maxWidth: 1200,
  margin: '0 auto',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 24px',
  boxSizing: 'border-box',
};

const hamburgerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: 36,
  height: 36,
  cursor: 'pointer',
  zIndex: 200,
};

const barStyle = {
  width: 28,
  height: 4,
  background: '#1db954',
  margin: '4px 0',
  borderRadius: 2,
  transition: 'all 0.3s',
};

const navLinksStyle = {
  display: 'flex',
  gap: 24,
  alignItems: 'center',
  position: 'static',
  paddingRight: 0,
  minWidth: 0,
  flexWrap: 'wrap',
};

const bookBtnStyle = {
  background: '#1db954',
  color: '#fff',
  padding: '0.5rem 1.5rem',
  borderRadius: 6,
  textDecoration: 'none',
  fontWeight: 500,
  minWidth: 120,
  marginLeft: 8,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  border: 'none',
  display: 'inline-block',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

function ResponsiveNavbar() {
  const [open, setOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 900);
  // Responsive listener
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // Close menu on navigation
  const handleNav = () => setOpen(false);
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  return (
    <>
      <nav style={navFixedStyle}>
        <div style={navContainerStyle}>
          <div style={{ fontWeight: 700, fontSize: 24, color: '#1db954' }}>TumaRide</div>
          {/* Hamburger Icon (mobile only) */}
          {isMobile && (
            <div
              style={hamburgerStyle}
              className="navbar-hamburger"
              onClick={() => setOpen(o => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              tabIndex={0}
              role="button"
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setOpen(o => !o); }}
            >
              <div style={barStyle} />
              <div style={barStyle} />
              <div style={barStyle} />
            </div>
          )}
          {/* Links (desktop only) */}
          {!isMobile && (
            <div style={navLinksStyle} className={`navbar-links`}>
              <Link to="/" style={{ color: '#222', textDecoration: 'none', fontWeight: 500 }} onClick={handleNav}>Home</Link>
              <a href="#services" style={{ color: '#222', textDecoration: 'none', fontWeight: 500 }} onClick={handleNav}>Services</a>
              <a href="#pricing" style={{ color: '#222', textDecoration: 'none', fontWeight: 500 }} onClick={handleNav}>Pricing</a>
              <a href="#contact" style={{ color: '#222', textDecoration: 'none', fontWeight: 500 }} onClick={handleNav}>Contact</a>
              <Link to="/auth/login" style={{ color: '#1db954', textDecoration: 'none', fontWeight: 500, marginLeft: 16 }} onClick={handleNav}>Sign In</Link>
              <Link to="/sender/request-delivery" style={bookBtnStyle} onClick={handleNav}>Book Delivery</Link>
            </div>
          )}
        </div>
        {/* Mobile Overlay Menu */}
        {isMobile && open && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(255,255,255,0.98)',
              zIndex: 199,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 32,
              transition: 'all 0.3s',
            }}
            className="navbar-links-mobile"
          >
            <Link to="/" style={{ color: '#222', textDecoration: 'none', fontWeight: 600, fontSize: 22 }} onClick={handleNav}>Home</Link>
            <a href="#services" style={{ color: '#222', textDecoration: 'none', fontWeight: 600, fontSize: 22 }} onClick={handleNav}>Services</a>
            <a href="#pricing" style={{ color: '#222', textDecoration: 'none', fontWeight: 600, fontSize: 22 }} onClick={handleNav}>Pricing</a>
            <a href="#contact" style={{ color: '#222', textDecoration: 'none', fontWeight: 600, fontSize: 22 }} onClick={handleNav}>Contact</a>
            <Link to="/auth/login" style={{ color: '#1db954', textDecoration: 'none', fontWeight: 700, fontSize: 22, marginTop: 12 }} onClick={handleNav}>Sign In</Link>
            <Link to="/sender/request-delivery" style={{ background: '#1db954', color: '#fff', padding: '0.9rem 2.2rem', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 22, marginTop: 8 }} onClick={handleNav}>Book Delivery</Link>
          </div>
        )}
      </nav>
      {/* Offset for fixed nav */}
      <div style={{ height: 80 }} />
    </>
  );
}

export default ResponsiveNavbar; 