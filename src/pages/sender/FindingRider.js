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

const FindingRider = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/sender/rider-found');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ color: '#1db954', fontWeight: 800, marginBottom: 24, textAlign: 'center', fontSize: '2rem' }}>Finding a rider</h2>
        <div style={{ color: '#222', marginBottom: 16, textAlign: 'center' }}>We are searching for a rider to deliver your package. This may take a few minutes.</div>
        <div style={{ width: '100%', background: '#e8f5e9', borderRadius: 8, height: 8, marginBottom: 8 }}>
          <div style={{ width: '40%', height: 8, background: '#1db954', borderRadius: 8, transition: 'width 1s' }} />
        </div>
        <div style={{ color: '#888', fontSize: 14, textAlign: 'center' }}>Searching for riders...</div>
      </div>
    </div>
  );
};

export default FindingRider; 