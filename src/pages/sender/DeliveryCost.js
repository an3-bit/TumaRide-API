import React, { useState, useEffect } from 'react';
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

const DeliveryCost = () => {
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState(null);
  const [deliveryCost, setDeliveryCost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get package data from previous screen
    const storedData = sessionStorage.getItem('packageData');
    if (storedData) {
      const data = JSON.parse(storedData);
      setPackageData(data);
      
      // Calculate delivery cost based on distance and package size
      calculateDeliveryCost(data);
    } else {
      // If no data, redirect back to request delivery
      navigate('/sender/request-delivery');
    }
  }, [navigate]);

  const calculateDeliveryCost = (data) => {
    // Calculate distance between coordinates (simplified)
    const from = data.from.coordinates;
    const to = data.to.coordinates;
    
    // Simple distance calculation (in real app, use proper distance calculation)
    const distance = Math.sqrt(
      Math.pow(from[0] - to[0], 2) + Math.pow(from[1] - to[1], 2)
    ) * 100; // Rough conversion to km
    
    // Base cost calculation
    let baseFare = 500; // Base fare in KSH
    let distanceFee = Math.round(distance * 50); // 50 KSH per km
    let serviceFee = Math.round((baseFare + distanceFee) * 0.1); // 10% service fee
    
    // Adjust based on package size
    const sizeMultiplier = {
      'small': 1.0,
      'medium': 1.2,
      'large': 1.5,
      'extra-large': 2.0
    };
    
    const multiplier = sizeMultiplier[data.size] || 1.0;
    const totalCost = Math.round((baseFare + distanceFee + serviceFee) * multiplier);
    
    setDeliveryCost({
      baseFare,
      distanceFee,
      serviceFee,
      totalCost,
      distance: Math.round(distance)
    });
    setLoading(false);
  };

  const handleConfirmDelivery = () => {
    // Store delivery cost for next screens
    sessionStorage.setItem('deliveryCost', JSON.stringify(deliveryCost));
    navigate('/sender/finding-rider');
  };

  if (loading || !packageData) {
    return (
      <ResponsiveContainer>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ color: '#666' }}>Calculating delivery cost...</div>
        </div>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer>
      <h2 style={{ color: '#1db954', fontWeight: 800, marginBottom: 32, textAlign: 'center', fontSize: '2rem' }}>Delivery Cost</h2>
      
      {/* Package Details */}
      <div style={{ marginBottom: 24, background: '#fafafa', borderRadius: 12, padding: 20, boxShadow: '0 1px 4px #e8f5e9' }}>
        <h4 style={{ color: '#222', marginBottom: 12, fontWeight: 600 }}>Package Details</h4>
        <div style={{ fontSize: 16, marginBottom: 8 }}>
          <strong>Title:</strong> {packageData.title}
        </div>
        <div style={{ fontSize: 16, marginBottom: 8 }}>
          <strong>Type:</strong> {packageData.type.charAt(0).toUpperCase() + packageData.type.slice(1)}
        </div>
        <div style={{ fontSize: 16, marginBottom: 8 }}>
          <strong>Size:</strong> {packageData.size.charAt(0).toUpperCase() + packageData.size.slice(1)}
        </div>
        <div style={{ fontSize: 16, marginBottom: 8 }}>
          <strong>Value:</strong> KSH {packageData.cost.toLocaleString()}
        </div>
        <div style={{ fontSize: 16, marginBottom: 8 }}>
          <strong>From:</strong> {packageData.from.name}
        </div>
        <div style={{ fontSize: 16 }}>
          <strong>To:</strong> {packageData.to.name}
        </div>
      </div>

      {/* Cost Breakdown */}
      <div style={{ marginBottom: 24, background: '#fafafa', borderRadius: 12, padding: 20, boxShadow: '0 1px 4px #e8f5e9' }}>
        <h4 style={{ color: '#222', marginBottom: 12, fontWeight: 600 }}>Cost Breakdown</h4>
        <div style={{ fontSize: 16, marginBottom: 8 }}>
          <strong>Distance:</strong> {deliveryCost.distance} km
        </div>
        <div style={{ fontSize: 16, marginBottom: 8 }}>
          <strong>Base fare:</strong> KSH {deliveryCost.baseFare.toLocaleString()}
        </div>
        <div style={{ fontSize: 16, marginBottom: 8 }}>
          <strong>Distance fee:</strong> KSH {deliveryCost.distanceFee.toLocaleString()}
        </div>
        <div style={{ fontSize: 16, marginBottom: 8 }}>
          <strong>Service fee:</strong> KSH {deliveryCost.serviceFee.toLocaleString()}
        </div>
        <div style={{ 
          fontWeight: 700, 
          fontSize: 20, 
          marginTop: 16, 
          paddingTop: 16, 
          borderTop: '1px solid #e8f5e9',
          color: '#1db954'
        }}>
          Total: KSH {deliveryCost.totalCost.toLocaleString()}
        </div>
      </div>

      <button 
        type="button" 
        onClick={handleConfirmDelivery} 
        style={{ ...buttonBase, background: '#1db954', color: '#fff', marginTop: 8 }}
      >
        Confirm Delivery
      </button>
    </ResponsiveContainer>
  );
};

export default DeliveryCost; 