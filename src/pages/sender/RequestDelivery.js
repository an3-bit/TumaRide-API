import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResponsiveContainer from '../../components/common/ResponsiveContainer';

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

const RequestDelivery = () => {
  const navigate = useNavigate();
  const [pickupLocation, setPickupLocation] = useState('');
  const [destinationLocation, setDestinationLocation] = useState('');
  const [pickupCoordinates, setPickupCoordinates] = useState(null);
  const [destinationCoordinates, setDestinationCoordinates] = useState(null);

  // Function to get coordinates from location name (simplified - in real app would use geocoding API)
  const getCoordinates = async (locationName) => {
    // This is a simplified version - in a real app you'd use a geocoding service
    // For demo purposes, returning mock coordinates
    const mockCoordinates = {
      'Nairobi Warehouse': [-122.27652, 37.805186],
      'Mombasa Delivery Hub': [39.6682, -4.0435],
      'Nairobi CBD': [-122.27652, 37.805186],
      'Westlands': [-122.27652, 37.805186],
      'Kilimani': [-122.27652, 37.805186],
    };
    
    return mockCoordinates[locationName] || [-122.27652, 37.805186]; // Default coordinates
  };

  const handleContinue = async () => {
    if (!pickupLocation || !destinationLocation) {
      alert('Please enter both pickup and destination locations');
      return;
    }

    // Get coordinates for both locations
    const pickupCoords = await getCoordinates(pickupLocation);
    const destCoords = await getCoordinates(destinationLocation);

    // Store data in sessionStorage to pass to next screen
    const deliveryData = {
      from: {
        name: pickupLocation,
        coordinates: pickupCoords
      },
      to: {
        name: destinationLocation,
        coordinates: destCoords
      }
    };

    sessionStorage.setItem('deliveryData', JSON.stringify(deliveryData));
    navigate('/sender/delivery-details');
  };

  return (
    <ResponsiveContainer>
      <h2 style={{ color: '#1db954', fontWeight: 800, marginBottom: 32, textAlign: 'center', fontSize: '2rem' }}>Where to?</h2>
      
      <div style={{ marginBottom: 24 }}>
        <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#222' }}>Pickup Location</label>
        <input 
          placeholder="Enter pickup location (e.g., Nairobi Warehouse)" 
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
          style={inputBase} 
        />
      </div>

      <div style={{ marginBottom: 24 }}>
        <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#222' }}>Destination</label>
        <input 
          placeholder="Enter destination (e.g., Mombasa Delivery Hub)" 
          value={destinationLocation}
          onChange={(e) => setDestinationLocation(e.target.value)}
          style={inputBase} 
        />
      </div>

      <button 
        type="button" 
        onClick={handleContinue} 
        style={{ ...buttonBase, background: '#1db954', color: '#fff', marginTop: 8 }}
      >
        Continue
      </button>
    </ResponsiveContainer>
  );
};

export default RequestDelivery; 