import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const stepIcons = [
  <span style={{ fontSize: 22, color: '#1db954', marginRight: 8 }}>📍</span>,
  <span style={{ fontSize: 22, color: '#1db954', marginRight: 8 }}>📦</span>,
  <span style={{ fontSize: 22, color: '#1db954', marginRight: 8 }}>💳</span>,
];

const Stepper = ({ step }) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2rem 0 2.5rem 0', gap: 32 }}>
    {[1, 2, 3].map((n, i) => (
      <React.Fragment key={n}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%', background: step === n ? '#1db954' : '#f2f2f2', color: step === n ? '#fff' : '#b2b2b2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 20, border: step === n ? 'none' : '1.5px solid #e8f5e9', transition: 'all 0.2s',
        }}>{n}</div>
        {n < 3 && <div style={{ width: 48, height: 2, background: step > n ? '#1db954' : '#e8f5e9' }} />}
      </React.Fragment>
    ))}
  </div>
);

const vehicleOptions = [
  'Select vehicle type',
  'Motorcycle',
  'TukTuk',
  'Van',
];
const destinationOptions = ['1 Destination', '2 Destinations', '3 Destinations'];
const deliveryTypes = ['On-Demand (ASAP)', 'Same Day', 'Scheduled'];

export default function RequestDelivery() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    pickup: '',
    dropoff: '',
    vehicle: '',
    destinations: '1 Destination',
    deliveryType: 'On-Demand (ASAP)',
    recipientName: '',
    recipientPhone: '',
    instructions: '',
    payment: 'M-Pesa',
  });

  // For demo, static price
  const price = 347;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fdf9', padding: '2rem 0' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          <Link to="/" style={{ color: '#222', textDecoration: 'none', fontWeight: 500, fontSize: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 22 }}>←</span> Back to Home
          </Link>
          <h1 style={{ fontWeight: 800, fontSize: 32, margin: '0 auto', textAlign: 'center' }}>Book a Delivery</h1>
        </div>
        <Stepper step={step} />
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #e8f5e9', padding: 40, maxWidth: 700, margin: '0 auto' }}>
          {step === 1 && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', fontWeight: 700, fontSize: 24, marginBottom: 24 }}>
                <span style={{ fontSize: 22, color: '#1db954', marginRight: 8 }}>📍</span> Delivery Details
              </div>
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontWeight: 600, marginBottom: 6 }}>Pickup Location</div>
                <input name="pickup" value={form.pickup} onChange={handleChange} placeholder="Enter pickup address" style={{ width: '100%', padding: 14, borderRadius: 8, border: '1px solid #e8f5e9', fontSize: 16, marginBottom: 18, background: '#f8fdf9' }} />
                <div style={{ fontWeight: 600, marginBottom: 6 }}>Dropoff Location</div>
                <input name="dropoff" value={form.dropoff} onChange={handleChange} placeholder="Enter dropoff address" style={{ width: '100%', padding: 14, borderRadius: 8, border: '1px solid #e8f5e9', fontSize: 16, marginBottom: 18, background: '#f8fdf9' }} />
                <div style={{ fontWeight: 600, marginBottom: 6 }}>Vehicle Type</div>
                <select name="vehicle" value={form.vehicle} onChange={handleChange} style={{ width: '100%', padding: 14, borderRadius: 8, border: '1px solid #e8f5e9', fontSize: 16, marginBottom: 18, background: '#f8fdf9' }}>
                  {vehicleOptions.map((v) => <option key={v}>{v}</option>)}
                </select>
                <div style={{ fontWeight: 600, marginBottom: 6 }}>Number of Destinations</div>
                <select name="destinations" value={form.destinations} onChange={handleChange} style={{ width: '100%', padding: 14, borderRadius: 8, border: '1px solid #e8f5e9', fontSize: 16, marginBottom: 18, background: '#f8fdf9' }}>
                  {destinationOptions.map((d) => <option key={d}>{d}</option>)}
                </select>
                <div style={{ fontWeight: 600, marginBottom: 6 }}>Delivery Type</div>
                <select name="deliveryType" value={form.deliveryType} onChange={handleChange} style={{ width: '100%', padding: 14, borderRadius: 8, border: '1px solid #e8f5e9', fontSize: 16, background: '#f8fdf9' }}>
                  {deliveryTypes.map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => setStep(2)} style={{ background: '#b2f2d7', color: '#1db954', border: 'none', padding: '0.9rem 2.2rem', borderRadius: 8, fontWeight: 700, fontSize: 18, marginTop: 8, boxShadow: '0 2px 8px #e8f5e9', transition: 'background 0.2s', cursor: 'pointer' }}>Next Step</button>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', fontWeight: 700, fontSize: 24, marginBottom: 24 }}>
                <span style={{ fontSize: 22, color: '#1db954', marginRight: 8 }}>📦</span> Package Information
              </div>
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontWeight: 600, marginBottom: 6 }}>Recipient Name</div>
                <input name="recipientName" value={form.recipientName} onChange={handleChange} placeholder="Enter recipient's full name" style={{ width: '100%', padding: 14, borderRadius: 8, border: '1px solid #e8f5e9', fontSize: 16, marginBottom: 18, background: '#f8fdf9' }} />
                <div style={{ fontWeight: 600, marginBottom: 6 }}>Recipient Phone</div>
                <input name="recipientPhone" value={form.recipientPhone} onChange={handleChange} placeholder="+254 7XX XXX XXX" style={{ width: '100%', padding: 14, borderRadius: 8, border: '1px solid #e8f5e9', fontSize: 16, marginBottom: 18, background: '#f8fdf9' }} />
                <div style={{ fontWeight: 600, marginBottom: 6 }}>Special Instructions (Optional)</div>
                <textarea name="instructions" value={form.instructions} onChange={handleChange} placeholder="Any special handling instructions..." style={{ width: '100%', padding: 14, borderRadius: 8, border: '1px solid #e8f5e9', fontSize: 16, marginBottom: 18, background: '#f8fdf9', minHeight: 60 }} />
                <div style={{ background: '#f8fdf9', borderRadius: 10, padding: 16, marginTop: 10, fontSize: 15 }}>
                  <b>Package Size Guide</b><br />
                  <span>🏍️ <b>Bike:</b> Documents, small items &nbsp; </span>
                  <span>🛺 <b>TukTuk:</b> Medium boxes, groceries &nbsp; </span>
                  <span>🚐 <b>Van:</b> Large items, furniture</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setStep(1)} style={{ background: '#fff', color: '#222', border: '1.5px solid #e8f5e9', padding: '0.9rem 2.2rem', borderRadius: 8, fontWeight: 700, fontSize: 18, marginTop: 8, cursor: 'pointer' }}>Previous</button>
                <button onClick={() => setStep(3)} style={{ background: '#b2f2d7', color: '#1db954', border: 'none', padding: '0.9rem 2.2rem', borderRadius: 8, fontWeight: 700, fontSize: 18, marginTop: 8, boxShadow: '0 2px 8px #e8f5e9', transition: 'background 0.2s', cursor: 'pointer' }}>Next Step</button>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', fontWeight: 700, fontSize: 24, marginBottom: 24 }}>
                <span style={{ fontSize: 22, color: '#1db954', marginRight: 8 }}>💳</span> Payment & Confirmation
              </div>
              <div style={{ background: '#f8fdf9', borderRadius: 10, padding: 24, marginBottom: 24 }}>
                <b style={{ fontSize: 18 }}>Order Summary</b>
                <div style={{ margin: '12px 0', fontSize: 16 }}>
                  <div>From: <span style={{ color: '#888' }}>{form.pickup}</span></div>
                  <div>To: <span style={{ color: '#888' }}>{form.dropoff}</span></div>
                  <div>Vehicle: <span style={{ color: '#888' }}>{form.vehicle}</span></div>
                  <div>Destinations: <span style={{ color: '#888' }}>{form.destinations}</span></div>
                  <div>Delivery Type: <span style={{ color: '#888' }}>{form.deliveryType}</span></div>
                </div>
                <hr style={{ border: 'none', borderTop: '1px solid #e8f5e9', margin: '16px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 20, fontWeight: 700 }}>
                  <span>Total:</span>
                  <span style={{ color: '#1db954', fontWeight: 800, fontSize: 24 }}>KES {price}</span>
                </div>
              </div>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>Payment Method</div>
              <select name="payment" value={form.payment} onChange={handleChange} style={{ width: '100%', padding: 14, borderRadius: 8, border: '1px solid #e8f5e9', fontSize: 16, marginBottom: 18, background: '#f8fdf9' }}>
                <option>🟩 M-Pesa</option>
                <option>💳 Card</option>
                <option>💵 Cash</option>
              </select>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setStep(2)} style={{ background: '#fff', color: '#222', border: '1.5px solid #e8f5e9', padding: '0.9rem 2.2rem', borderRadius: 8, fontWeight: 700, fontSize: 18, marginTop: 8, cursor: 'pointer' }}>Previous</button>
                <button type="submit" style={{ background: '#b2f2d7', color: '#1db954', border: 'none', padding: '0.9rem 2.2rem', borderRadius: 8, fontWeight: 700, fontSize: 18, marginTop: 8, boxShadow: '0 2px 8px #e8f5e9', transition: 'background 0.2s', cursor: 'pointer' }}>Confirm & Pay KES {price}</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 