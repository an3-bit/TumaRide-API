import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const containerStyle = {
  minHeight: '100vh',
  background: '#f8fdf9',
  padding: '32px 0',
};
const cardStyle = {
  background: '#fff',
  borderRadius: 16,
  boxShadow: '0 2px 16px #e8f5e9',
  maxWidth: 600,
  margin: '32px auto',
  padding: 40,
  width: '100%',
};
const sectionTitle = {
  fontWeight: 700,
  fontSize: 18,
  margin: '32px 0 12px 0',
  color: '#222',
};
const label = { color: '#888', fontWeight: 500, fontSize: 15, marginBottom: 4 };
const value = { color: '#222', fontWeight: 500, fontSize: 15, marginBottom: 4 };
const row = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 };
const inputRadio = { marginRight: 12 };
const button = {
  background: '#1db954',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  padding: '1rem 0',
  width: '100%',
  fontWeight: 700,
  fontSize: 18,
  margin: '24px 0',
  cursor: 'pointer',
  transition: 'background 0.2s',
};
const mapStyle = {
  width: '100%',
  height: 280,
  borderRadius: 16,
  marginTop: 24,
  objectFit: 'cover',
  border: '1px solid #e8f5e9',
};

const Payment = () => {
  const navigate = useNavigate();
  const [payment, setPayment] = useState('wallet');
  const [packageData, setPackageData] = useState(null);
  const [deliveryCost, setDeliveryCost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paid, setPaid] = useState(false);

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

  const receipt = {
    id: 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    amount: `KSH ${deliveryCost?.totalCost?.toLocaleString() || 0}`,
    method: payment === 'wallet' ? 'Wallet' : 'M-PESA',
  };

  if (loading || !packageData || !deliveryCost) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ color: '#666' }}>Loading payment details...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ textAlign: 'center', fontWeight: 800, fontSize: 32, marginBottom: 32 }}>Payment</h2>
        
        {/* Payment Method */}
        <div style={sectionTitle}>Payment Method</div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ ...row, background: '#f8fdf9', borderRadius: 8, padding: 12, cursor: 'pointer' }}>
            <input type="radio" name="payment" value="wallet" checked={payment === 'wallet'} onChange={() => setPayment('wallet')} style={inputRadio} />
            Wallet
          </label>
          <label style={{ ...row, background: '#f8fdf9', borderRadius: 8, padding: 12, cursor: 'pointer' }}>
            <input type="radio" name="payment" value="mpesa" checked={payment === 'mpesa'} onChange={() => setPayment('mpesa')} style={inputRadio} />
            M-PESA
          </label>
        </div>
        
        {/* Delivery Details */}
        <div style={sectionTitle}>Delivery Details</div>
        <div style={row}>
          <span style={label}>Package Title</span>
          <span style={value}>{packageData.title}</span>
        </div>
        <div style={row}>
          <span style={label}>Pickup Location</span>
          <span style={value}>{packageData.from.name}</span>
        </div>
        <div style={row}>
          <span style={label}>Delivery Location</span>
          <span style={value}>{packageData.to.name}</span>
        </div>
        <div style={row}>
          <span style={label}>Package Type</span>
          <span style={value}>{packageData.type.charAt(0).toUpperCase() + packageData.type.slice(1)}</span>
        </div>
        <div style={row}>
          <span style={label}>Package Size</span>
          <span style={value}>{packageData.size.charAt(0).toUpperCase() + packageData.size.slice(1)}</span>
        </div>
        <div style={row}>
          <span style={label}>Distance</span>
          <span style={value}>{deliveryCost.distance} km</span>
        </div>
        <div style={row}>
          <span style={label}>Total Cost</span>
          <span style={value}>KSH {deliveryCost.totalCost.toLocaleString()}</span>
        </div>
        
        {/* Confirm and Pay */}
        {!paid && (
          <button style={button} onClick={() => setPaid(true)}>Confirm and Pay</button>
        )}
        
        {/* Digital Receipt */}
        {paid && (
          <>
            <div style={sectionTitle}>Digital Receipt</div>
            <div style={row}>
              <span style={label}>Transaction ID</span>
              <span style={value}>{receipt.id}</span>
            </div>
            <div style={row}>
              <span style={label}>Date</span>
              <span style={value}>{receipt.date}</span>
            </div>
            <div style={row}>
              <span style={label}>Amount Paid</span>
              <span style={value}>{receipt.amount}</span>
            </div>
            <div style={row}>
              <span style={label}>Payment Method</span>
              <span style={value}>{receipt.method}</span>
            </div>
            <div style={{ textAlign: 'center', margin: '24px 0 0 0', color: '#222', fontWeight: 500 }}>
              Payment Successful! Your parcel is on its way.
            </div>
            <button style={button} onClick={() => navigate('/sender/tracking')}>Track Delivery</button>
            <img 
              src={`https://maps.googleapis.com/maps/api/staticmap?center=${packageData.from.coordinates[1]},${packageData.from.coordinates[0]}&zoom=12&size=600x280&maptype=roadmap&markers=color:green%7Clabel:P%7C${packageData.from.coordinates[1]},${packageData.from.coordinates[0]}&markers=color:red%7Clabel:D%7C${packageData.to.coordinates[1]},${packageData.to.coordinates[0]}`} 
              alt="Delivery Route Map" 
              style={mapStyle} 
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Payment; 