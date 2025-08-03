import React, { useState, useRef } from 'react';
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

const uploadButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  background: '#e8f5e9',
  border: 'none',
  borderRadius: 8,
  padding: 12,
  width: '100%',
  marginBottom: 8,
  color: '#222',
  fontWeight: 600,
  fontSize: 16,
  cursor: 'pointer',
  transition: 'background 0.2s',
};

const uploadedButtonStyle = {
  ...uploadButtonStyle,
  background: '#1db954',
  color: '#fff',
};

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // File upload states
  const [idCardFile, setIdCardFile] = useState(null);
  const [driversLicenseFile, setDriversLicenseFile] = useState(null);
  const [passportPhotoFile, setPassportPhotoFile] = useState(null);
  const [preferredRoute, setPreferredRoute] = useState('');
  
  // Vehicle information states
  const [vehicleType, setVehicleType] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  
  // File input refs
  const idCardRef = useRef();
  const driversLicenseRef = useRef();
  const passportPhotoRef = useRef();

  const handleFileUpload = (file, setFile, type) => {
    if (file) {
      setFile(file);
      setError('');
    }
  };

  const triggerFileInput = (ref) => {
    ref.current.click();
  };

  const uploadFileToServer = async (file) => {
    // In a real app, you would upload the file to a file storage service first
    // and get back a document_id. For demo purposes, we'll generate a mock ID
    const formData = new FormData();
    formData.append('file', file);
    
    // Mock upload - in real app, replace with actual file upload endpoint
    // const response = await fetch('https://tumaridesapi.onrender.com/upload', {
    //   method: 'POST',
    //   body: formData
    // });
    // const result = await response.json();
    // return result.document_id;
    
    // For demo, return a mock document ID
    return '64dbe57a6f1e8b45678ef' + Math.random().toString(36).substr(2, 6);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!idCardFile || !driversLicenseFile || !passportPhotoFile) {
      setError('Please upload all required documents');
      return;
    }

    if (!preferredRoute.trim()) {
      setError('Please enter your preferred route');
      return;
    }

    if (!vehicleType) {
      setError('Please select your vehicle type');
      return;
    }

    if (!plateNumber.trim()) {
      setError('Please enter your vehicle plate number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Get rider_id from localStorage or session (assuming user is logged in)
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const riderId = user._id || '6878cf4a67fd6c3790aebd5d'; // Fallback for demo

      // Upload files and get document IDs
      const idCardDocumentId = await uploadFileToServer(idCardFile);
      const driversLicenseDocumentId = await uploadFileToServer(driversLicenseFile);
      const passportPhotoDocumentId = await uploadFileToServer(passportPhotoFile);

      // Prepare KYC data according to backend specification
      const kycData = {
        rider_id: riderId,
        data: {
          id_card_document_id: [idCardDocumentId],
          driversLincence_document_id: [driversLicenseDocumentId],
          passport_photo_document_id: [passportPhotoDocumentId]
        }
      };

      // Send KYC data to backend API
      const kycResponse = await fetch('https://tumaridesapi.onrender.com/user/kyc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify(kycData)
      });

      const kycResult = await kycResponse.json();

      if (!kycResponse.ok) {
        throw new Error(kycResult.message || 'Failed to submit KYC documents');
      }

      // Prepare vehicle data according to backend specification
      const vehicleData = {
        rider_id: riderId,
        status: 'active',
        type: vehicleType,
        full_plate: plateNumber.toUpperCase()
      };

      // Send vehicle data to backend API
      const vehicleResponse = await fetch('https://tumaridesapi.onrender.com/user/ride', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify(vehicleData)
      });

      const vehicleResult = await vehicleResponse.json();

      if (!vehicleResponse.ok) {
        throw new Error(vehicleResult.message || 'Failed to submit vehicle information');
      }

      setSuccess(true);
      
      // Store route preference
      sessionStorage.setItem('riderRoute', preferredRoute);
      
      // Navigate to next screen after a short delay
      setTimeout(() => {
        navigate('/rider/profile-under-review');
      }, 1500);

    } catch (err) {
      setError(err.message || 'Failed to submit information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResponsiveContainer>
      <form onSubmit={handleSubmit}>
        <div style={{ fontWeight: 700, color: '#222', marginBottom: 8 }}>Step 1 of 3</div>
        <div style={{ width: '100%', background: '#e8f5e9', borderRadius: 8, height: 8, marginBottom: 16 }}>
          <div style={{ width: '33%', height: 8, background: '#1db954', borderRadius: 8, transition: 'width 1s' }} />
        </div>
        
        <div style={{ fontWeight: 700, color: '#222', marginBottom: 8 }}>Verify your identity</div>
        <div style={{ color: '#444', fontSize: 16, marginBottom: 16 }}>
          To ensure the safety of our community, we require all riders to verify their identity. Please upload the following documents:
        </div>
        
        {/* Hidden file inputs */}
        <input 
          type="file" 
          ref={idCardRef}
          accept="image/*,.pdf"
          style={{ display: 'none' }}
          onChange={(e) => handleFileUpload(e.target.files[0], setIdCardFile, 'idCard')}
        />
        <input 
          type="file" 
          ref={driversLicenseRef}
          accept="image/*,.pdf"
          style={{ display: 'none' }}
          onChange={(e) => handleFileUpload(e.target.files[0], setDriversLicenseFile, 'driversLicense')}
        />
        <input 
          type="file" 
          ref={passportPhotoRef}
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => handleFileUpload(e.target.files[0], setPassportPhotoFile, 'passportPhoto')}
        />
        
        {/* Upload buttons */}
        <div style={{ marginBottom: 24 }}>
          <button 
            type="button" 
            style={idCardFile ? uploadedButtonStyle : uploadButtonStyle}
            onClick={() => triggerFileInput(idCardRef)}
          >
            <span role="img" aria-label="id">🪪</span> 
            {idCardFile ? `ID Card Uploaded: ${idCardFile.name}` : 'Upload ID Card'}
          </button>
          
          <button 
            type="button" 
            style={driversLicenseFile ? uploadedButtonStyle : uploadButtonStyle}
            onClick={() => triggerFileInput(driversLicenseRef)}
          >
            <span role="img" aria-label="license">🚗</span> 
            {driversLicenseFile ? `Driver's License Uploaded: ${driversLicenseFile.name}` : 'Upload Driver\'s License'}
          </button>
          
          <button 
            type="button" 
            style={passportPhotoFile ? uploadedButtonStyle : uploadButtonStyle}
            onClick={() => triggerFileInput(passportPhotoRef)}
          >
            <span role="img" aria-label="photo">📷</span> 
            {passportPhotoFile ? `Passport Photo Uploaded: ${passportPhotoFile.name}` : 'Upload Passport Photo'}
          </button>
        </div>

        {/* Vehicle Information */}
        <div style={{ fontWeight: 700, color: '#222', marginBottom: 8 }}>Vehicle Information</div>
        <div style={{ color: '#444', fontSize: 16, marginBottom: 16 }}>
          Please provide details about your delivery vehicle:
        </div>
        
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#222' }}>Vehicle Type</label>
          <select 
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            style={selectBase}
            required
          >
            <option value="">Select Vehicle Type</option>
            <option value="bike">Motorcycle/Bike</option>
            <option value="car">Car</option>
            <option value="van">Van</option>
            <option value="truck">Truck</option>
          </select>
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#222' }}>License Plate Number</label>
          <input 
            placeholder="e.g., KDA 456B" 
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}
            style={inputBase} 
            required
          />
        </div>
        
        <div style={{ fontWeight: 700, color: '#222', marginBottom: 8 }}>Set your preferred route</div>
        <input 
          placeholder="Enter your preferred delivery route" 
          value={preferredRoute}
          onChange={(e) => setPreferredRoute(e.target.value)}
          style={inputBase} 
          required
        />
        
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
        
        {success && (
          <div style={{ 
            color: '#2e7d32', 
            background: '#e8f5e9', 
            padding: 12, 
            borderRadius: 8, 
            marginBottom: 16,
            border: '1px solid #c8e6c9'
          }}>
            Profile submitted successfully! Redirecting...
          </div>
        )}
        
        <button 
          type="submit" 
          disabled={loading || success}
          style={{ 
            ...buttonBase, 
            background: loading || success ? '#ccc' : '#7c3aed', 
            color: '#fff', 
            marginTop: 8 
          }}
        >
          {loading ? 'Submitting Profile...' : success ? 'Profile Submitted!' : 'Submit for Verification'}
        </button>
      </form>
    </ResponsiveContainer>
  );
};

export default ProfileSetup; 