import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ResponsiveContainer from '../../components/common/ResponsiveContainer';
import { useSocket } from '../../contexts/SocketContext';
import NewPackageNotification from '../../components/rider/NewPackageNotification';

const buttonBase = {
  border: 'none',
  borderRadius: 8,
  width: '100%',
  fontWeight: 700,
  fontSize: 18,
  padding: '1rem 0',
  marginBottom: 8,
  cursor: 'pointer',
  transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
  boxShadow: '0 1px 4px #e8f5e9',
};

const inputBase = {
  width: '100%',
  marginBottom: 16,
  padding: 14,
  borderRadius: 8,
  border: '1px solid #e8f5e9',
  fontSize: 17,
  background: '#fafafa',
};

const statGrid = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: 24,
  marginBottom: 32,
};

const statCard = {
  background: '#f8fdf9',
  borderRadius: 12,
  padding: 20,
  textAlign: 'center',
  fontWeight: 700,
  fontSize: 18,
  color: '#222',
  boxShadow: '0 1px 4px #e8f5e9',
};

const tripList = {
  marginTop: 24,
  background: '#fafafa',
  borderRadius: 12,
  padding: 20,
  boxShadow: '0 1px 4px #e8f5e9',
};

const notificationBadgeStyle = {
  position: 'absolute',
  top: -8,
  right: -8,
  background: '#e53e3e',
  color: '#fff',
  borderRadius: '50%',
  width: 20,
  height: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 12,
  fontWeight: 700,
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { 
    notifications, 
    joinRiderRoom, 
    leaveRiderRoom, 
    markNotificationAsRead, 
    getUnreadCount,
    isConnected 
  } = useSocket();
  
  const [currentNotification, setCurrentNotification] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Get rider ID from localStorage or session
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const riderId = user._id || '6878cf4a67fd6c3790aebd5d'; // Fallback for demo

    // Join rider room when component mounts
    if (isConnected) {
      joinRiderRoom(riderId);
    }

    // Cleanup when component unmounts
    return () => {
      if (isConnected) {
        leaveRiderRoom(riderId);
      }
    };
  }, [isConnected, joinRiderRoom, leaveRiderRoom]);

  useEffect(() => {
    // Check for new package notifications
    const newPackageNotification = notifications.find(
      notification => notification.type === 'new_package' && !notification.read
    );

    if (newPackageNotification && !showNotification) {
      setCurrentNotification(newPackageNotification);
      setShowNotification(true);
    }
  }, [notifications, showNotification]);

  const handleAcceptPackage = async (packageData) => {
    try {
      // Store the accepted package data
      sessionStorage.setItem('acceptedPackage', JSON.stringify(packageData));
      
      // Mark notification as read
      if (currentNotification) {
        markNotificationAsRead(currentNotification.id);
      }
      
      setShowNotification(false);
      setCurrentNotification(null);
      
      // You could also emit an event to inform the sender that the package was accepted
      // emitRiderAssignment({ package_id: packageData._id, rider_id: user._id });
      
    } catch (error) {
      console.error('Error accepting package:', error);
    }
  };

  const handleDeclinePackage = (packageData) => {
    // Mark notification as read
    if (currentNotification) {
      markNotificationAsRead(currentNotification.id);
    }
    
    setShowNotification(false);
    setCurrentNotification(null);
    
    // You could emit an event to inform the system that the package was declined
    console.log('Package declined:', packageData);
  };

  const handleCloseNotification = () => {
    if (currentNotification) {
      markNotificationAsRead(currentNotification.id);
    }
    setShowNotification(false);
    setCurrentNotification(null);
  };

  const unreadCount = getUnreadCount();

  return (
    <>
      <ResponsiveContainer>
        <h2 style={{ color: '#222', fontWeight: 800, marginBottom: 32, textAlign: 'left', fontSize: '2rem' }}>Earnings Dashboard</h2>
        
        {/* Connection Status */}
        <div style={{ 
          background: isConnected ? '#e8f5e9' : '#ffebee', 
          color: isConnected ? '#2e7d32' : '#d32f2f',
          padding: 12, 
          borderRadius: 8, 
          marginBottom: 24,
          fontSize: 14,
          fontWeight: 500
        }}>
          {isConnected ? '🟢 Connected - Ready for new deliveries' : '🔴 Disconnected - Check your connection'}
        </div>

        <div style={statGrid}>
          <div style={statCard}>
            <div>Total Earnings</div>
            <div style={{ color: '#1db954', fontSize: 22 }}>KSH 1,250</div>
          </div>
          <div style={statCard}>
            <div>Trips Completed</div>
            <div style={{ color: '#1db954', fontSize: 22 }}>75</div>
          </div>
          <div style={statCard}>
            <div>Avg. Rating</div>
            <div style={{ color: '#e53e3e', fontSize: 22 }}>4.8</div>
          </div>
        </div>

        <h3 style={{ color: '#222', fontWeight: 700, margin: '32px 0 12px 0', fontSize: 20 }}>Trip History</h3>
        <div style={tripList}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span>Trip #12345</span> 
            <span>KSH 25</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span>Trip #67890</span> 
            <span>KSH 30</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Trip #11223</span> 
            <span>KSH 20</span>
          </div>
        </div>

        <div style={{ marginTop: 40, display: 'flex', gap: 16 }}>
          <button 
            type="button" 
            onClick={() => navigate('/rider/availability')} 
            style={{ ...buttonBase, background: '#7c3aed', color: '#fff' }}
          >
            Set Availability
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/rider/new-delivery-request')} 
            style={{ ...buttonBase, background: '#1db954', color: '#fff', position: 'relative' }}
          >
            New Delivery Request
            {unreadCount > 0 && (
              <div style={notificationBadgeStyle}>
                {unreadCount > 9 ? '9+' : unreadCount}
              </div>
            )}
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/rider/withdraw')} 
            style={{ ...buttonBase, background: '#e8f5e9', color: '#222' }}
          >
            Withdraw
          </button>
        </div>
      </ResponsiveContainer>

      {/* Real-time notification */}
      {showNotification && currentNotification && (
        <NewPackageNotification
          notification={currentNotification}
          onAccept={handleAcceptPackage}
          onDecline={handleDeclinePackage}
          onClose={handleCloseNotification}
        />
      )}
    </>
  );
};

export default Dashboard; 