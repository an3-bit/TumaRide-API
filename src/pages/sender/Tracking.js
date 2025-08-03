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

const Tracking = () => {
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState(null);
  const [deliveryCost, setDeliveryCost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get package and delivery cost data from sessionStorage
    const storedPackageData = sessionStorage.getItem('packageData');
    const storedDeliveryCost = sessionStorage.getItem('deliveryCost');
    
    if (storedPackageData && storedDeliveryCost) {
      setPackageData(JSON.parse(storedPackageData));
      setDeliveryCost(JSON.parse(storedDeliveryCost));
    } else {
      // If no data, redirect back to request delivery
      navigate('/sender/request-delivery');
    }
    setLoading(false);
  }, [navigate]);

  if (loading || !packageData || !deliveryCost) {
    return (
      <ResponsiveContainer>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ color: '#666' }}>Loading tracking information...</div>
        </div>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer>
      {/* Map with actual coordinates */}
      <div style={{ 
        height: 280, 
        background: '#e8f5e9', 
        borderRadius: 16, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginBottom: 32,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <img 
          src={`https://maps.googleapis.com/maps/api/staticmap?center=${packageData.from.coordinates[1]},${packageData.from.coordinates[0]}&zoom=10&size=600x280&maptype=roadmap&markers=color:green%7Clabel:P%7C${packageData.from.coordinates[1]},${packageData.from.coordinates[0]}&markers=color:red%7Clabel:D%7C${packageData.to.coordinates[1]},${packageData.to.coordinates[0]}&path=color:0x1db954%7Cweight:3%7C${packageData.from.coordinates[1]},${packageData.from.coordinates[0]}%7C${packageData.to.coordinates[1]},${packageData.to.coordinates[0]}`} 
          alt="Delivery Route Map" 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            borderRadius: 16
          }} 
        />
      </div>

      {/* Package Details */}
      <div style={{ 
        background: '#f8fdf9', 
        borderRadius: 12, 
        padding: 20, 
        marginBottom: 24, 
        border: '1px solid #e8f5e9' 
      }}>
        <h4 style={{ color: '#222', marginBottom: 16, fontWeight: 600 }}>Package Details</h4>
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
      </div>

      {/* Delivery Route */}
      <div style={{ 
        background: '#f8fdf9', 
        borderRadius: 12, 
        padding: 20, 
        marginBottom: 24, 
        border: '1px solid #e8f5e9' 
      }}>
        <h4 style={{ color: '#222', marginBottom: 16, fontWeight: 600 }}>Delivery Route</h4>
        <div style={{ fontSize: 16, marginBottom: 12 }}>
          <strong>From:</strong> {packageData.from.name}
        </div>
        <div style={{ fontSize: 16, marginBottom: 12 }}>
          <strong>To:</strong> {packageData.to.name}
        </div>
        <div style={{ fontSize: 16, marginBottom: 8 }}>
          <strong>Distance:</strong> {deliveryCost.distance} km
        </div>
        <div style={{ fontSize: 16, marginBottom: 8 }}>
          <strong>Estimated Cost:</strong> KSH {deliveryCost.totalCost.toLocaleString()}
        </div>
      </div>

      {/* Contact Information */}
      <div style={{ 
        background: '#f8fdf9', 
        borderRadius: 12, 
        padding: 20, 
        marginBottom: 24, 
        border: '1px solid #e8f5e9' 
      }}>
        <h4 style={{ color: '#222', marginBottom: 16, fontWeight: 600 }}>Contact Information</h4>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ 
            width: 40, 
            height: 40, 
            borderRadius: '50%', 
            background: '#1db954', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            marginRight: 12,
            color: '#fff',
            fontWeight: 600
          }}>
            S
          </div>
          <div>
            <div style={{ color: '#222', fontWeight: 600 }}>Sender</div>
            <div style={{ color: '#666', fontSize: 14 }}>Package Owner</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ 
            width: 40, 
            height: 40, 
            borderRadius: '50%', 
            background: '#ff6b6b', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            marginRight: 12,
            color: '#fff',
            fontWeight: 600
          }}>
            R
          </div>
          <div>
            <div style={{ color: '#222', fontWeight: 600 }}>Receiver</div>
            <div style={{ color: '#666', fontSize: 14 }}>Delivery Destination</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ 
            width: 40, 
            height: 40, 
            borderRadius: '50%', 
            background: '#4ecdc4', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            marginRight: 12,
            color: '#fff',
            fontWeight: 600
          }}>
            D
          </div>
          <div>
            <div style={{ color: '#222', fontWeight: 600 }}>Driver</div>
            <div style={{ color: '#666', fontSize: 14 }}>Assigned Rider</div>
          </div>
        </div>
      </div>

      {/* Estimated Time */}
      <div style={{ 
        background: '#e8f5e9', 
        borderRadius: 12, 
        padding: 16, 
        marginBottom: 24, 
        textAlign: 'center' 
      }}>
        <div style={{ color: '#1db954', fontWeight: 600, fontSize: 18, marginBottom: 4 }}>
          ⏰ Estimated Delivery Time
        </div>
        <div style={{ color: '#222', fontWeight: 600, fontSize: 16 }}>
          {new Date(Date.now() + deliveryCost.distance * 60000).toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })} - {new Date(Date.now() + deliveryCost.distance * 90000).toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>

      <button 
        type="button" 
        onClick={() => navigate('/sender/payment')} 
        style={{ ...buttonBase, background: '#1db954', color: '#fff', marginTop: 8 }}
      >
        Proceed to Payment
      </button>
    </ResponsiveContainer>
  );
};

export default Tracking; 