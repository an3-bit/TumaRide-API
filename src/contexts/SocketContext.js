import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('https://tumaridesapi.onrender.com', {
      transports: ['websocket', 'polling'],
      autoConnect: true,
    });

    setSocket(newSocket);

    // Connection event handlers
    newSocket.on('connect', () => {
      console.log('Connected to Socket.IO server');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
      setIsConnected(false);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      setIsConnected(false);
    });

    // Listen for new package notifications (for riders)
    newSocket.on('new_package_available', (packageData) => {
      console.log('New package available:', packageData);
      setNotifications(prev => [...prev, {
        id: Date.now(),
        type: 'new_package',
        data: packageData,
        timestamp: new Date(),
        read: false
      }]);
    });

    // Listen for delivery updates (for senders)
    newSocket.on('delivery_update', (updateData) => {
      console.log('Delivery update:', updateData);
      setNotifications(prev => [...prev, {
        id: Date.now(),
        type: 'delivery_update',
        data: updateData,
        timestamp: new Date(),
        read: false
      }]);
    });

    // Listen for rider assignment (for senders)
    newSocket.on('rider_assigned', (assignmentData) => {
      console.log('Rider assigned:', assignmentData);
      setNotifications(prev => [...prev, {
        id: Date.now(),
        type: 'rider_assigned',
        data: assignmentData,
        timestamp: new Date(),
        read: false
      }]);
    });

    // Cleanup on unmount
    return () => {
      newSocket.close();
    };
  }, []);

  // Function to join rider room (when rider goes online)
  const joinRiderRoom = (riderId) => {
    if (socket && isConnected) {
      socket.emit('join_rider_room', { rider_id: riderId });
      console.log('Joined rider room:', riderId);
    }
  };

  // Function to leave rider room (when rider goes offline)
  const leaveRiderRoom = (riderId) => {
    if (socket && isConnected) {
      socket.emit('leave_rider_room', { rider_id: riderId });
      console.log('Left rider room:', riderId);
    }
  };

  // Function to join sender room (for delivery updates)
  const joinSenderRoom = (senderId) => {
    if (socket && isConnected) {
      socket.emit('join_sender_room', { sender_id: senderId });
      console.log('Joined sender room:', senderId);
    }
  };

  // Function to leave sender room
  const leaveSenderRoom = (senderId) => {
    if (socket && isConnected) {
      socket.emit('leave_sender_room', { sender_id: senderId });
      console.log('Left sender room:', senderId);
    }
  };

  // Function to emit new package creation (from sender)
  const emitNewPackage = (packageData) => {
    if (socket && isConnected) {
      socket.emit('new_package_created', packageData);
      console.log('Emitted new package:', packageData);
    }
  };

  // Function to emit rider assignment (when rider accepts package)
  const emitRiderAssignment = (assignmentData) => {
    if (socket && isConnected) {
      socket.emit('rider_assigned_to_package', assignmentData);
      console.log('Emitted rider assignment:', assignmentData);
    }
  };

  // Function to mark notification as read
  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  // Function to clear all notifications
  const clearNotifications = () => {
    setNotifications([]);
  };

  // Function to get unread notifications count
  const getUnreadCount = () => {
    return notifications.filter(notification => !notification.read).length;
  };

  const value = {
    socket,
    isConnected,
    notifications,
    joinRiderRoom,
    leaveRiderRoom,
    joinSenderRoom,
    leaveSenderRoom,
    emitNewPackage,
    emitRiderAssignment,
    markNotificationAsRead,
    clearNotifications,
    getUnreadCount,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
}; 