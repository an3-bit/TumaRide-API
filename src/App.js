import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SenderDashboard from './pages/sender/SenderDashboard';
import RiderDashboard from './pages/rider/RiderDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import RequestDelivery from './pages/sender/RequestDelivery';
import BecomeMoverForm from './pages/auth/BecomeMoverForm';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sender" element={<SenderDashboard />} />
        <Route path="/rider" element={<RiderDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/sender/request-delivery" element={<RequestDelivery />} />
        <Route path="/auth/become-mover" element={<BecomeMoverForm />} />
        {/* Other routes handled elsewhere */}
      </Routes>
    </Router>
  );
}

export default App;
