import React, { useState } from 'react';
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
  // Demo data
  const delivery = {
    pickup: '123 Elm Street, Nairobi',
    dropoff: '456 Oak Avenue, Nairobi',
    time: '10:00 AM - 11:00 AM',
    cost: 'KES 500',
  };
  const receipt = {
    id: 'TXN123456789',
    date: 'July 26, 2024',
    amount: 'KES 500',
    method: payment === 'wallet' ? 'Wallet' : 'M-PESA',
  };
  const [paid, setPaid] = useState(false);

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
        <div style={row}><span style={label}>Pickup Location</span><span style={value}>{delivery.pickup}</span></div>
        <div style={row}><span style={label}>Delivery Location</span><span style={value}>{delivery.dropoff}</span></div>
        <div style={row}><span style={label}>Estimated Time</span><span style={value}>{delivery.time}</span></div>
        <div style={row}><span style={label}>Total Cost</span><span style={value}>{delivery.cost}</span></div>
        {/* Confirm and Pay */}
        {!paid && (
          <button style={button} onClick={() => setPaid(true)}>Confirm and Pay</button>
        )}
        {/* Digital Receipt */}
        {paid && (
          <>
            <div style={sectionTitle}>Digital Receipt</div>
            <div style={row}><span style={label}>Transaction ID</span><span style={value}>{receipt.id}</span></div>
            <div style={row}><span style={label}>Date</span><span style={value}>{receipt.date}</span></div>
            <div style={row}><span style={label}>Amount Paid</span><span style={value}>{receipt.amount}</span></div>
            <div style={row}><span style={label}>Payment Method</span><span style={value}>{receipt.method}</span></div>
            <div style={{ textAlign: 'center', margin: '24px 0 0 0', color: '#222', fontWeight: 500 }}>Payment Successful! Your parcel is on its way.</div>
            <button style={button} onClick={() => navigate('/sender/tracking')}>Track Delivery</button>
            <img src="https://maps.googleapis.com/maps/api/staticmap?center=Nairobi,Kenya&zoom=12&size=600x280&maptype=roadmap&markers=color:green%7Clabel:P%7C-1.2921,36.8219" alt="Map of Nairobi" style={mapStyle} />
          </>
        )}
      </div>
    </div>
  );
};

export default Payment; 