import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ResponsiveContainer from '../../components/common/ResponsiveContainer';
import { useSocket } from '../../contexts/SocketContext';

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

const selectBase = {
  ...inputBase,
  appearance: 'none',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  background: `#fafafa url("data:image/svg+xml,%3Csvg width='16' height='16' fill='gray' viewBox='0 0 16 16'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E") no-repeat right 12px center/16px 16px`,
};

const textareaBase = {
  ...inputBase,
  minHeight: 100,
  resize: 'vertical',
  fontFamily: 'inherit',
};

const DeliveryDetails = () => {
  const navigate = useNavigate();
  const { emitNewPackage } = useSocket();
  const [deliveryData, setDeliveryData] = useState(null);
  const [packageTitle, setPackageTitle] = useState('');
  const [packageDescription, setPackageDescription] = useState('');
  const [packageType, setPackageType] = useState('');
  const [packageSize, setPackageSize] = useState('');
  const [packageCost, setPackageCost] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Get delivery data from previous screen
    const storedData = sessionStorage.getItem('deliveryData');
    if (storedData) {
      setDeliveryData(JSON.parse(storedData));
    } else {
      // If no data, redirect back to request delivery
      navigate('/sender/request-delivery');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!packageTitle || !packageDescription || !packageType || !packageSize || !packageCost) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Get sender_id from localStorage or session (assuming user is logged in)
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const senderId = user._id || '68775a0c85b04bb80e812822'; // Fallback for demo

      const packageData = {
        sender_id: senderId,
        type: packageType.toLowerCase(),
        size: packageSize.toLowerCase(),
        title: packageTitle,
        description: packageDescription,
        cost: parseInt(packageCost),
        from: deliveryData.from,
        to: deliveryData.to
      };

      // Send to backend API
      const response = await fetch('https://tumaridesapi.onrender.com/user/package', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify(packageData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create package');
      }

      // Store package data for next screens
      const finalPackageData = {
        ...packageData,
        _id: result._id || result.id
      };
      sessionStorage.setItem('packageData', JSON.stringify(finalPackageData));

      // Emit new package event for real-time notifications to riders
      const notificationData = {
        ...finalPackageData,
        estimatedEarnings: Math.round(packageData.cost * 0.3), // 30% of package value as estimated earnings
        distance: Math.sqrt(
          Math.pow(packageData.from.coordinates[0] - packageData.to.coordinates[0], 2) + 
          Math.pow(packageData.from.coordinates[1] - packageData.to.coordinates[1], 2)
        ) * 100 // Rough distance calculation
      };
      emitNewPackage(notificationData);

      // Navigate to delivery cost screen
      navigate('/sender/delivery-cost');

    } catch (err) {
      setError(err.message || 'Failed to create package. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!deliveryData) {
    return (
      <ResponsiveContainer>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ color: '#666' }}>Loading...</div>
        </div>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer>
      <h2 style={{ color: '#1db954', fontWeight: 800, marginBottom: 32, textAlign: 'center', fontSize: '2rem' }}>Package Details</h2>
      
      {/* Show delivery route summary */}
      <div style={{ 
        background: '#f8fdf9', 
        borderRadius: 12, 
        padding: 20, 
        marginBottom: 24, 
        border: '1px solid #e8f5e9' 
      }}>
        <h4 style={{ color: '#222', marginBottom: 12, fontWeight: 600 }}>Delivery Route</h4>
        <div style={{ fontSize: 16, marginBottom: 8 }}>
          <strong>From:</strong> {deliveryData.from.name}
        </div>
        <div style={{ fontSize: 16 }}>
          <strong>To:</strong> {deliveryData.to.name}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#222' }}>Package Title</label>
          <input 
            placeholder="e.g., Glass Vase, Documents, Electronics" 
            value={packageTitle}
            onChange={(e) => setPackageTitle(e.target.value)}
            style={inputBase} 
            required
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#222' }}>Description</label>
          <textarea 
            placeholder="Describe your package (e.g., Handle with care. A decorative glass vase meant for display.)" 
            value={packageDescription}
            onChange={(e) => setPackageDescription(e.target.value)}
            style={textareaBase} 
            required
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#222' }}>Package Type</label>
          <select 
            value={packageType}
            onChange={(e) => setPackageType(e.target.value)}
            style={selectBase}
            required
          >
            <option value="">Select Package Type</option>
            <option value="fragile">Fragile</option>
            <option value="document">Document</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="food">Food</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#222' }}>Package Size</label>
          <select 
            value={packageSize}
            onChange={(e) => setPackageSize(e.target.value)}
            style={selectBase}
            required
          >
            <option value="">Select Package Size</option>
            <option value="small">Small (Up to 1kg)</option>
            <option value="medium">Medium (1-5kg)</option>
            <option value="large">Large (5-15kg)</option>
            <option value="extra-large">Extra Large (15kg+)</option>
          </select>
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#222' }}>Package Value (KSH)</label>
          <input 
            type="number"
            placeholder="e.g., 1500" 
            value={packageCost}
            onChange={(e) => setPackageCost(e.target.value)}
            style={inputBase} 
            min="0"
            required
          />
        </div>

        {error && (
          <div style={{ 
            color: '#d32f2f', 
            background: '#ffebee', 
            padding: 12, 
            borderRadius: 8, 
            marginBottom: 16,
            border: '1px solid #ffcdd2'
          }}>
            {error}
          </div>
        )}

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            ...buttonBase, 
            background: loading ? '#ccc' : '#1db954', 
            color: '#fff', 
            marginTop: 8 
          }}
        >
          {loading ? 'Creating Package...' : 'Continue'}
        </button>
      </form>
    </ResponsiveContainer>
  );
};

export default DeliveryDetails; 