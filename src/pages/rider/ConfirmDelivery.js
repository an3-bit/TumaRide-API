import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  input: {
    display: 'block',
    margin: '1rem 0',
    padding: 12,
    width: '100%',
    borderRadius: 8,
    border: '1px solid #e8f5e9',
    fontSize: 16,
    boxSizing: 'border-box',
  },
  button: {
    background: '#7c3aed',
    color: '#fff',
    border: 'none',
    padding: '0.9rem 0',
    borderRadius: 8,
    width: '100%',
    fontWeight: 700,
    fontSize: 18,
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  errorMessage: {
    color: '#d32f2f',
    background: '#ffebee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    border: '1px solid #ffcdd2',
    fontSize: 14,
  },
  successMessage: {
    color: '#2e7d32',
    background: '#e8f5e9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    border: '1px solid #c8e6c9',
    fontSize: 14,
  },
};

const ConfirmDelivery = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [deliveryData, setDeliveryData] = useState(null);

  useEffect(() => {
    // Get delivery data from sessionStorage or localStorage
    // This would typically come from the previous screens in the rider journey
    const storedDeliveryData = sessionStorage.getItem('currentDelivery') || localStorage.getItem('currentDelivery');
    
    if (storedDeliveryData) {
      setDeliveryData(JSON.parse(storedDeliveryData));
    } else {
      // For demo purposes, use mock data
      setDeliveryData({
        rider_id: '6878cf4a67fd6c3790aebd5d',
        sender_id: '68775a0c85b04bb80e812822',
        package_id: '6880e3b35bbfaabed5c133aa'
      });
    }
  }, []);

  const handleConfirmDelivery = async (e) => {
    e.preventDefault();
    
    if (!otp.trim()) {
      setError('Please enter the OTP from the recipient');
      return;
    }

    if (!deliveryData) {
      setError('Delivery data not found. Please try again.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Prepare delivery confirmation data according to backend specification
      const deliveryConfirmationData = {
        rider_id: deliveryData.rider_id,
        sender_id: deliveryData.sender_id,
        package_id: deliveryData.package_id
      };

      // Send to backend API
      const response = await fetch('https://tumaridesapi.onrender.com/user/delivery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify(deliveryConfirmationData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to confirm delivery');
      }

      setSuccess(true);
      
      // Clear delivery data from storage
      sessionStorage.removeItem('currentDelivery');
      localStorage.removeItem('currentDelivery');
      
      // Navigate to home page after a short delay
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (err) {
      setError(err.message || 'Failed to confirm delivery. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ color: '#222', fontWeight: 800, marginBottom: 24, textAlign: 'left', fontSize: '1.5rem' }}>Confirm Delivery</h2>
        
        <div style={{ color: '#888', fontSize: 15, marginBottom: 16 }}>
          Please confirm the delivery of the parcel. You may be required to provide a photo of the delivered parcel or an OTP from the recipient.
        </div>

        {deliveryData && (
          <div style={{ 
            background: '#f8fdf9', 
            borderRadius: 8, 
            padding: 16, 
            marginBottom: 16,
            border: '1px solid #e8f5e9'
          }}>
            <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>Delivery Details:</div>
            <div style={{ fontSize: 13, color: '#888' }}>
              <div>Package ID: {deliveryData.package_id}</div>
              <div>Sender ID: {deliveryData.sender_id}</div>
              <div>Rider ID: {deliveryData.rider_id}</div>
            </div>
          </div>
        )}

        <form onSubmit={handleConfirmDelivery}>
          <input 
            placeholder="Enter OTP from recipient" 
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={styles.input}
            required
          />
          
          {error && (
            <div style={styles.errorMessage}>
              {error}
            </div>
          )}
          
          {success && (
            <div style={styles.successMessage}>
              Delivery confirmed successfully! Redirecting to home...
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={loading || success}
            style={{ 
              ...styles.button, 
              background: loading || success ? '#ccc' : '#7c3aed'
            }}
          >
            {loading ? 'Confirming Delivery...' : success ? 'Delivery Confirmed!' : 'Confirm Delivery'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmDelivery; 