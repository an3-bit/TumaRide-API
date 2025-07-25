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
import OnboardingFlow from './pages/auth/OnboardingFlow';
import ResetPassword from './pages/auth/ResetPassword';
import RequestReset from './pages/auth/RequestReset';
import DeliveryDetails from './pages/sender/DeliveryDetails';
import DeliveryCost from './pages/sender/DeliveryCost';
import FindingRider from './pages/sender/FindingRider';
import RiderFound from './pages/sender/RiderFound';
import Tracking from './pages/sender/Tracking';
import Payment from './pages/sender/Payment';
import Receipt from './pages/sender/Receipt';
import LiveTracking from './pages/sender/LiveTracking';
import Welcome from './pages/rider/Welcome';
import ProfileSetup from './pages/rider/ProfileSetup';
import ProfileUnderReview from './pages/rider/ProfileUnderReview';
import Availability from './pages/rider/Availability';
import NewDeliveryRequest from './pages/rider/NewDeliveryRequest';
import Pickup from './pages/rider/Pickup';
import ConfirmPickup from './pages/rider/ConfirmPickup';
import Dropoff from './pages/rider/Dropoff';
import ConfirmDelivery from './pages/rider/ConfirmDelivery';
import Dashboard from './pages/rider/Dashboard';
import Withdraw from './pages/rider/Withdraw';
import './App.css';

function App() {
  React.useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      window.addEventListener('appinstalled', () => {
        window.location.href = '/auth/onboarding';
      }, { once: true });
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

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
        <Route path="/sender/delivery-details" element={<DeliveryDetails />} />
        <Route path="/sender/delivery-cost" element={<DeliveryCost />} />
        <Route path="/sender/finding-rider" element={<FindingRider />} />
        <Route path="/sender/rider-found" element={<RiderFound />} />
        <Route path="/sender/tracking" element={<Tracking />} />
        <Route path="/sender/payment" element={<Payment />} />
        <Route path="/sender/receipt" element={<Receipt />} />
        <Route path="/sender/live-tracking" element={<LiveTracking />} />
        <Route path="/auth/become-mover" element={<BecomeMoverForm />} />
        <Route path="/auth/onboarding" element={<OnboardingFlow />} />
        <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
        <Route path="/auth/request-reset" element={<RequestReset />} />
        <Route path="/rider/welcome" element={<Welcome />} />
        <Route path="/rider/profile-setup" element={<ProfileSetup />} />
        <Route path="/rider/profile-under-review" element={<ProfileUnderReview />} />
        <Route path="/rider/availability" element={<Availability />} />
        <Route path="/rider/new-delivery-request" element={<NewDeliveryRequest />} />
        <Route path="/rider/pickup" element={<Pickup />} />
        <Route path="/rider/confirm-pickup" element={<ConfirmPickup />} />
        <Route path="/rider/dropoff" element={<Dropoff />} />
        <Route path="/rider/confirm-delivery" element={<ConfirmDelivery />} />
        <Route path="/rider/dashboard" element={<Dashboard />} />
        <Route path="/rider/withdraw" element={<Withdraw />} />
        {/* Other routes handled elsewhere */}
      </Routes>
    </Router>
  );
}

export default App;
