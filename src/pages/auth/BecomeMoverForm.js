import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function BecomeMoverForm() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    idFile: null,
    photoFile: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [idPreview, setIdPreview] = useState(null);
  const fileInputRef = useRef();
  const photoInputRef = useRef();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'idFile' && files[0]) {
      setForm(f => ({ ...f, idFile: files[0] }));
      setIdPreview(URL.createObjectURL(files[0]));
    } else if (name === 'photoFile' && files[0]) {
      setForm(f => ({ ...f, photoFile: files[0] }));
      setPhotoPreview(URL.createObjectURL(files[0]));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handlePhotoCapture = (e) => {
    if (e.target.files && e.target.files[0]) {
      setForm(f => ({ ...f, photoFile: e.target.files[0] }));
      setPhotoPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send form data to backend
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fdf9' }}>
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #e8f5e9', padding: 36, minWidth: 340, maxWidth: 400, textAlign: 'center' }}>
          <h2 style={{ color: '#1db954', fontWeight: 800, marginBottom: 24 }}>Request Submitted!</h2>
          <p style={{ color: '#444', fontSize: 18, marginBottom: 18 }}>
            Thank you for applying to become a mover. We have received your details and documents.<br />
            You will receive feedback after verification.
          </p>
          <Link to="/" style={{ display: 'inline-block', marginTop: 18, background: '#1db954', color: '#fff', padding: '0.7rem 2rem', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 16 }}>Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fdf9' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #e8f5e9', padding: 36, minWidth: 340, maxWidth: 400 }}>
        <h2 style={{ color: '#1db954', fontWeight: 800, marginBottom: 24, textAlign: 'center' }}>Become a Mover</h2>
        <label style={{ fontWeight: 600, marginBottom: 6 }}>Full Name</label>
        <input name="fullName" value={form.fullName} onChange={handleChange} required placeholder="Enter your full name" style={{ display: 'block', margin: '0.5rem 0 1rem 0', padding: 12, width: '100%', borderRadius: 8, border: '1px solid #e8f5e9', fontSize: 16 }} />
        <label style={{ fontWeight: 600, marginBottom: 6 }}>Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Enter your email" style={{ display: 'block', margin: '0.5rem 0 1rem 0', padding: 12, width: '100%', borderRadius: 8, border: '1px solid #e8f5e9', fontSize: 16 }} />
        <label style={{ fontWeight: 600, marginBottom: 6 }}>Phone Number</label>
        <input name="phone" value={form.phone} onChange={handleChange} required placeholder="Enter your phone number" style={{ display: 'block', margin: '0.5rem 0 1rem 0', padding: 12, width: '100%', borderRadius: 8, border: '1px solid #e8f5e9', fontSize: 16 }} />
        <label style={{ fontWeight: 600, marginBottom: 6 }}>Upload National ID</label>
        <input name="idFile" type="file" accept="image/*,.pdf" onChange={handleChange} ref={fileInputRef} required style={{ display: 'block', margin: '0.5rem 0 1rem 0' }} />
        {idPreview && <img src={idPreview} alt="ID Preview" style={{ width: 120, marginBottom: 12, borderRadius: 8, border: '1px solid #e8f5e9' }} />}
        <label style={{ fontWeight: 600, marginBottom: 6 }}>Upload or Take a Photo</label>
        <input name="photoFile" type="file" accept="image/*" capture="user" onChange={handlePhotoCapture} ref={photoInputRef} required style={{ display: 'block', margin: '0.5rem 0 1rem 0' }} />
        {photoPreview && <img src={photoPreview} alt="Photo Preview" style={{ width: 120, marginBottom: 12, borderRadius: '50%', border: '1px solid #e8f5e9' }} />}
        <button type="submit" style={{ background: '#1db954', color: '#fff', border: 'none', padding: '0.9rem 0', borderRadius: 8, width: '100%', fontWeight: 700, fontSize: 18, marginTop: 8 }}>Submit Application</button>
      </form>
    </div>
  );
} 