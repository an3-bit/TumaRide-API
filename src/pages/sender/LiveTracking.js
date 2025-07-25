import React from 'react';

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
    padding: 0,
    minWidth: 320,
    maxWidth: 400,
    width: '100%',
  },
  '@media (maxWidth: 600px)': {
    card: {
      padding: 0,
      minWidth: 'unset',
      maxWidth: '95vw',
    },
    container: {
      padding: 0,
    },
  },
};

const LiveTracking = () => (
  <div style={styles.container}>
    <div style={styles.card}>
      <div style={{ height: 180, background: '#e8f5e9', borderTopLeftRadius: 16, borderTopRightRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: '#1db954', fontWeight: 700, fontSize: 20 }}>Map Placeholder</span>
      </div>
      <div style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
          <img src="https://randomuser.me/api/portraits/men/47.jpg" alt="Rider" style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 12 }} />
          <div>
            <div style={{ color: '#222', fontWeight: 700 }}>Rider: Alex</div>
            <div style={{ color: '#888', fontSize: 14 }}>Arriving in 15 min</div>
          </div>
        </div>
        <div style={{ color: '#222', fontWeight: 600, marginBottom: 12 }}>Delivery: Phone <span style={{ color: '#888', fontWeight: 400, fontSize: 14, marginLeft: 8 }}>Package: 2kg</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
          <button style={{ background: '#e8f5e9', color: '#1db954', border: 'none', padding: '0.7rem 0', borderRadius: 8, width: '48%', fontWeight: 700, fontSize: 16 }}>Message</button>
          <button style={{ background: '#1db954', color: '#fff', border: 'none', padding: '0.7rem 0', borderRadius: 8, width: '48%', fontWeight: 700, fontSize: 16 }}>Call</button>
        </div>
      </div>
    </div>
  </div>
);

export default LiveTracking; 