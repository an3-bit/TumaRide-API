import React from 'react';

const PaymentForm = () => (
  <form style={{ background: '#fff', border: '1px solid #1db954', borderRadius: 8, padding: 24, maxWidth: 400, margin: '2rem auto' }}>
    <h2 style={{ color: '#1db954' }}>Payment</h2>
    {/* Payment options placeholder */}
    <div style={{ margin: '1rem 0' }}>
      <label>
        <input type="radio" name="payment" value="wallet" defaultChecked /> Wallet
      </label>
      <label style={{ marginLeft: 16 }}>
        <input type="radio" name="payment" value="mpesa" /> M-PESA
      </label>
    </div>
    <button type="submit" style={{ background: '#1db954', color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: 4 }}>Pay</button>
  </form>
);

export default PaymentForm; 