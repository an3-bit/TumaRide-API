import React from 'react';

const OnboardingFlow = () => (
  <div style={{ maxWidth: 400, margin: '3rem auto', padding: 24, background: '#fff', border: '1px solid #1db954', borderRadius: 8 }}>
    <h2 style={{ color: '#1db954' }}>Welcome to TumaRide</h2>
    {/* Onboarding steps placeholder */}
    <ol style={{ color: '#1db954' }}>
      <li>Sign up or Login</li>
      <li>Set up your profile</li>
      <li>Start sending or delivering parcels!</li>
    </ol>
  </div>
);

export default OnboardingFlow; 