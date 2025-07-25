import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f8fdf9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  card: {
    background: '#fff',
    borderRadius: 16,
    boxShadow: '0 2px 16px #e8f5e9',
    padding: 32,
    minWidth: 320,
    maxWidth: 400,
    width: '100%',
    textAlign: 'center',
  },
  '@media (maxWidth: 600px)': {
    card: {
      padding: 16,
      minWidth: 'unset',
      maxWidth: '95vw',
    },
    container: {
      padding: 0,
    },
  },
};

const ProfileUnderReview = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/rider/dashboard');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Rider" style={{ width: 80, height: 80, borderRadius: '50%', marginBottom: 12 }} />
        <div style={{ fontWeight: 700, fontSize: 22, color: '#222', marginBottom: 4 }}>Alex</div>
        <div style={{ color: '#888', fontSize: 15, marginBottom: 8 }}>Rider</div>
        <div style={{ color: '#222', fontSize: 15, marginBottom: 16 }}>Your profile is under review. We'll notify you once it's approved.</div>
      </div>
    </div>
  );
};

export default ProfileUnderReview; 