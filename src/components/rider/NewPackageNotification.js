import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewPackageNotification.css';

const notificationStyle = {
  position: 'fixed',
  top: 100,
  right: 20,
  background: '#fff',
  borderRadius: 12,
  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
  padding: 20,
  maxWidth: 350,
  width: '100%',
  zIndex: 1000,
  border: '2px solid #1db954',
};

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 12,
};

const titleStyle = {
  fontWeight: 700,
  fontSize: 16,
  color: '#222',
  margin: 0,
};

const closeButtonStyle = {
  background: 'none',
  border: 'none',
  fontSize: 18,
  color: '#888',
  cursor: 'pointer',
  padding: 0,
  width: 24,
  height: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const packageInfoStyle = {
  marginBottom: 16,
};

const infoRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 6,
  fontSize: 14,
};

const labelStyle = {
  color: '#666',
  fontWeight: 500,
};

const valueStyle = {
  color: '#222',
  fontWeight: 600,
};

const buttonRowStyle = {
  display: 'flex',
  gap: 8,
};

const acceptButtonStyle = {
  flex: 1,
  background: '#1db954',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  padding: '10px 16px',
  fontWeight: 600,
  fontSize: 14,
  cursor: 'pointer',
  transition: 'background 0.2s',
};

const declineButtonStyle = {
  flex: 1,
  background: '#f3f3f3',
  color: '#666',
  border: 'none',
  borderRadius: 8,
  padding: '10px 16px',
  fontWeight: 600,
  fontSize: 14,
  cursor: 'pointer',
  transition: 'background 0.2s',
};

const NewPackageNotification = ({ notification, onAccept, onDecline, onClose }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAccept = async () => {
    setLoading(true);
    try {
      await onAccept(notification.data);
      // Navigate to pickup screen or show confirmation
      navigate('/rider/confirm-pickup');
    } catch (error) {
      console.error('Error accepting package:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDecline = () => {
    onDecline(notification.data);
  };

  const formatDistance = (distance) => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    }
    return `${distance.toFixed(1)}km`;
  };

  const formatCost = (cost) => {
    return `KSH ${cost.toLocaleString()}`;
  };

  return (
    <div style={notificationStyle} className="notification-enter">
      <div style={headerStyle}>
        <h3 style={titleStyle}>🚚 New Delivery Request</h3>
        <button 
          style={closeButtonStyle} 
          onClick={onClose}
          aria-label="Close notification"
        >
          ×
        </button>
      </div>

      <div style={packageInfoStyle}>
        <div style={infoRowStyle}>
          <span style={labelStyle}>From:</span>
          <span style={valueStyle}>{notification.data.from?.name || 'Pickup Location'}</span>
        </div>
        <div style={infoRowStyle}>
          <span style={labelStyle}>To:</span>
          <span style={valueStyle}>{notification.data.to?.name || 'Delivery Location'}</span>
        </div>
        <div style={infoRowStyle}>
          <span style={labelStyle}>Package:</span>
          <span style={valueStyle}>{notification.data.title || 'Package'}</span>
        </div>
        <div style={infoRowStyle}>
          <span style={labelStyle}>Size:</span>
          <span style={valueStyle}>{notification.data.size?.charAt(0).toUpperCase() + notification.data.size?.slice(1) || 'Medium'}</span>
        </div>
        <div style={infoRowStyle}>
          <span style={labelStyle}>Distance:</span>
          <span style={valueStyle}>{formatDistance(notification.data.distance || 5)}</span>
        </div>
        <div style={infoRowStyle}>
          <span style={labelStyle}>Earnings:</span>
          <span style={{ ...valueStyle, color: '#1db954' }}>
            {formatCost(notification.data.estimatedEarnings || 500)}
          </span>
        </div>
      </div>

      <div style={buttonRowStyle}>
        <button 
          style={declineButtonStyle}
          onClick={handleDecline}
          disabled={loading}
        >
          Decline
        </button>
        <button 
          style={acceptButtonStyle}
          onClick={handleAccept}
          disabled={loading}
        >
          {loading ? 'Accepting...' : 'Accept'}
        </button>
      </div>
    </div>
  );
};

export default NewPackageNotification; 