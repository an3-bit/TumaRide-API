import React, { useState } from 'react';

const primary = '#1db954';
const secondary = '#fff';

const roles = [
  { key: 'sender', label: 'Sender', desc: 'Send packages easily and track deliveries.' },
  { key: 'mover', label: 'Mover', desc: 'Earn by delivering packages on your route.' },
];

function WelcomeScreen({ onSelectRole }) {
  return (
    <div style={{ maxWidth: 400, margin: '3rem auto', padding: 24, background: secondary, border: `1px solid ${primary}`, borderRadius: 16, textAlign: 'center' }}>
      <h2 style={{ color: primary, fontWeight: 800, fontSize: 28, marginBottom: 16 }}>Welcome to TumaRide</h2>
      <p style={{ color: '#222', fontSize: 18, marginBottom: 32 }}>Get started by choosing your role:</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {roles.map(r => (
          <button key={r.key} onClick={() => onSelectRole(r.key)} style={{ background: primary, color: secondary, border: 'none', borderRadius: 8, padding: '1rem 0', fontWeight: 700, fontSize: 18, marginBottom: 4, cursor: 'pointer' }}>{r.label}</button>
        ))}
      </div>
    </div>
  );
}

function SenderOnboarding({ onDone }) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({ name: '', pickup: '' });
  return (
    <div style={{ maxWidth: 400, margin: '3rem auto', padding: 24, background: secondary, border: `1px solid ${primary}`, borderRadius: 16 }}>
      {step === 0 && (
        <>
          <h2 style={{ color: primary, fontWeight: 800, fontSize: 24, marginBottom: 16 }}>Profile</h2>
          <input placeholder="Name" value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} style={{ width: '100%', marginBottom: 16, padding: 12, borderRadius: 8, border: `1px solid ${primary}` }} />
          <input placeholder="Default pickup location" value={profile.pickup} onChange={e => setProfile(p => ({ ...p, pickup: e.target.value }))} style={{ width: '100%', marginBottom: 16, padding: 12, borderRadius: 8, border: `1px solid ${primary}` }} />
          <button onClick={() => setStep(1)} style={{ background: primary, color: secondary, border: 'none', borderRadius: 8, padding: '1rem 0', fontWeight: 700, fontSize: 18, width: '100%' }}>Continue</button>
        </>
      )}
      {step === 1 && (
        <>
          <h2 style={{ color: primary, fontWeight: 800, fontSize: 24, marginBottom: 16 }}>Request a Ride</h2>
          <input placeholder="Enter destination" style={{ width: '100%', marginBottom: 16, padding: 12, borderRadius: 8, border: `1px solid ${primary}` }} />
          <input placeholder="Enter pickup location" style={{ width: '100%', marginBottom: 16, padding: 12, borderRadius: 8, border: `1px solid ${primary}` }} />
          <button onClick={() => setStep(2)} style={{ background: primary, color: secondary, border: 'none', borderRadius: 8, padding: '1rem 0', fontWeight: 700, fontSize: 18, width: '100%' }}>Continue</button>
        </>
      )}
      {step === 2 && (
        <>
          <h2 style={{ color: primary, fontWeight: 800, fontSize: 24, marginBottom: 16 }}>Delivery Details</h2>
          <input placeholder="Pickup Location" style={{ width: '100%', marginBottom: 16, padding: 12, borderRadius: 8, border: `1px solid ${primary}` }} />
          <input placeholder="Drop-off Location" style={{ width: '100%', marginBottom: 16, padding: 12, borderRadius: 8, border: `1px solid ${primary}` }} />
          <select style={{ width: '100%', marginBottom: 16, padding: 12, borderRadius: 8, border: `1px solid ${primary}` }}><option>Parcel Type</option></select>
          <select style={{ width: '100%', marginBottom: 16, padding: 12, borderRadius: 8, border: `1px solid ${primary}` }}><option>Parcel Size</option></select>
          <select style={{ width: '100%', marginBottom: 16, padding: 12, borderRadius: 8, border: `1px solid ${primary}` }}><option>Preferred Pickup Time</option></select>
          <button onClick={onDone} style={{ background: primary, color: secondary, border: 'none', borderRadius: 8, padding: '1rem 0', fontWeight: 700, fontSize: 18, width: '100%' }}>Finish</button>
        </>
      )}
    </div>
  );
}

function MoverOnboarding({ onDone }) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({ name: '', route: '' });
  return (
    <div style={{ maxWidth: 400, margin: '3rem auto', padding: 24, background: secondary, border: `1px solid ${primary}`, borderRadius: 16 }}>
      {step === 0 && (
        <>
          <h2 style={{ color: primary, fontWeight: 800, fontSize: 24, marginBottom: 16 }}>Profile Setup</h2>
          <input placeholder="Name" value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} style={{ width: '100%', marginBottom: 16, padding: 12, borderRadius: 8, border: `1px solid ${primary}` }} />
          <input placeholder="Preferred route" value={profile.route} onChange={e => setProfile(p => ({ ...p, route: e.target.value }))} style={{ width: '100%', marginBottom: 16, padding: 12, borderRadius: 8, border: `1px solid ${primary}` }} />
          <button onClick={() => setStep(1)} style={{ background: primary, color: secondary, border: 'none', borderRadius: 8, padding: '1rem 0', fontWeight: 700, fontSize: 18, width: '100%' }}>Continue</button>
        </>
      )}
      {step === 1 && (
        <>
          <h2 style={{ color: primary, fontWeight: 800, fontSize: 24, marginBottom: 16 }}>Verify your identity</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8 }}>Upload ID</label>
            <input type="file" style={{ marginBottom: 12 }} />
            <label style={{ display: 'block', marginBottom: 8 }}>Upload Driver's License</label>
            <input type="file" style={{ marginBottom: 12 }} />
            <label style={{ display: 'block', marginBottom: 8 }}>Upload Profile Photo</label>
            <input type="file" style={{ marginBottom: 12 }} />
          </div>
          <button onClick={onDone} style={{ background: primary, color: secondary, border: 'none', borderRadius: 8, padding: '1rem 0', fontWeight: 700, fontSize: 18, width: '100%' }}>Finish</button>
        </>
      )}
    </div>
  );
}

const OnboardingFlow = () => {
  const [role, setRole] = useState(null);
  const [done, setDone] = useState(false);
  return (
    <div style={{ minHeight: '100vh', background: '#f8fdf9' }}>
      {!role && <WelcomeScreen onSelectRole={setRole} />}
      {role === 'sender' && !done && <SenderOnboarding onDone={() => setDone(true)} />}
      {role === 'mover' && !done && <MoverOnboarding onDone={() => setDone(true)} />}
      {done && (
        <div style={{ maxWidth: 400, margin: '3rem auto', padding: 24, background: secondary, border: `1px solid ${primary}`, borderRadius: 16, textAlign: 'center' }}>
          <h2 style={{ color: primary, fontWeight: 800, fontSize: 28, marginBottom: 16 }}>You're all set!</h2>
          <p style={{ color: '#222', fontSize: 18, marginBottom: 32 }}>You can now start using TumaRide as a {role}.</p>
        </div>
      )}
    </div>
  );
};

export default OnboardingFlow; 