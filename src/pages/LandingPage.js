import React from 'react';
import { Link } from 'react-router-dom';
// Install App Button logic
function InstallAppButton() {
  const [deferredPrompt, setDeferredPrompt] = React.useState(null);
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          setShow(false);
        }
      }}
      style={{
        display: 'block',
        background: '#1db954',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        padding: '1rem 2rem',
        fontWeight: 700,
        fontSize: 18,
        margin: '1.5rem auto 0 auto',
        width: '90%',
        maxWidth: 340,
        boxShadow: '0 2px 8px #e8f5e9',
      }}
      className="install-app-btn"
    >
      Install App
    </button>
  );
}
// Responsive Navbar with Hamburger
function ResponsiveNavbar() {
  const [open, setOpen] = React.useState(false);
  // Close menu on navigation
  const handleNav = () => setOpen(false);
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', background: '#fff', borderBottom: '1px solid #e8f5e9', position: 'relative' }}>
      <div style={{ fontWeight: 700, fontSize: 24, color: '#1db954' }}>TumaRide</div>
      {/* Hamburger Icon */}
      <div style={{ display: 'none', cursor: 'pointer', zIndex: 20 }} className="navbar-hamburger" onClick={() => setOpen(o => !o)}>
        <div style={{ width: 28, height: 4, background: '#1db954', margin: '5px 0', borderRadius: 2 }} />
        <div style={{ width: 28, height: 4, background: '#1db954', margin: '5px 0', borderRadius: 2 }} />
        <div style={{ width: 28, height: 4, background: '#1db954', margin: '5px 0', borderRadius: 2 }} />
      </div>
      {/* Links */}
      <div
        style={{
          display: 'flex',
          gap: 32,
          alignItems: 'center',
          position: 'static',
        }}
        className={`navbar-links${open ? ' open' : ''}`}
      >
        <Link to="/" style={{ color: '#222', textDecoration: 'none', fontWeight: 500 }} onClick={handleNav}>Home</Link>
        <a href="#services" style={{ color: '#222', textDecoration: 'none', fontWeight: 500 }} onClick={handleNav}>Services</a>
        <a href="#pricing" style={{ color: '#222', textDecoration: 'none', fontWeight: 500 }} onClick={handleNav}>Pricing</a>
        <a href="#contact" style={{ color: '#222', textDecoration: 'none', fontWeight: 500 }} onClick={handleNav}>Contact</a>
        <Link to="/auth/login" style={{ color: '#1db954', textDecoration: 'none', fontWeight: 500, marginLeft: 16 }} onClick={handleNav}>Sign In</Link>
        <Link to="/sender/request-delivery" style={{ background: '#1db954', color: '#fff', padding: '0.5rem 1.5rem', borderRadius: 6, textDecoration: 'none', fontWeight: 500, marginLeft: 8 }} onClick={handleNav}>Book Delivery</Link>
      </div>
      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 900px) {
          .navbar-links {
            display: none !important;
          }
          .navbar-hamburger {
            display: block !important;
          }
          .navbar-links.open {
            display: flex !important;
            flex-direction: column;
            gap: 0;
            position: absolute;
            top: 100%;
            right: 0;
            background: #fff;
            width: 100vw;
            left: 0;
            box-shadow: 0 8px 32px #e8f5e9;
            z-index: 10;
            padding: 2rem 0 1rem 0;
          }
          .navbar-links.open a, .navbar-links.open .router-link {
            margin: 0.7rem 0;
            font-size: 20px;
            text-align: center;
          }
        }
      `}</style>
    </nav>
  );
}

const HERO_IMG = 'https://images.pexels.com/photos/4391470/pexels-photo-4391470.jpeg?auto=compress&w=800';

const statStyle = { textAlign: 'center', flex: 1 };

// Vehicle cards and component (moved to top)
const vehicleCards = [
  {
    icon: '🏍️',
    title: 'Motorcycle',
    desc: 'Perfect for documents and small packages up to 20kg',
    price: 'From KES 150',
    btn: 'Select Bike',
    active: false,
  },
  {
    icon: '🛺',
    title: 'TukTuk',
    desc: 'Ideal for medium packages and multiple items up to 100kg',
    price: 'From KES 300',
    btn: 'Select TukTuk',
    active: true,
  },
  {
    icon: '🚐',
    title: 'Van',
    desc: 'For large deliveries and bulk items up to 1000kg',
    price: 'From KES 500',
    btn: 'Select Van',
    active: false,
  },
];

const vehicleCardStyle = {
  background: '#fff',
  border: '1px solid #e8f5e9',
  borderRadius: 16,
  padding: 32,
  minWidth: 260,
  maxWidth: 320,
  flex: 1,
  textAlign: 'center',
  boxShadow: '0 2px 8px #f8fdf9',
  margin: 8,
  transition: 'box-shadow 0.2s, transform 0.2s',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};
const vehicleCardHover = {
  boxShadow: '0 8px 32px #e8f5e9',
  transform: 'translateY(-6px) scale(1.03)',
  border: '1.5px solid #b2f2d7',
};

function VehicleCard({ icon, title, desc, price, btn, active }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      style={{ ...vehicleCardStyle, ...(hover ? vehicleCardHover : {}) }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={{ fontSize: 48, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 4 }}>{title}</div>
      <div style={{ color: '#666', margin: '12px 0 0 0', fontSize: 16 }}>{desc}</div>
      <div style={{ color: '#1db954', fontWeight: 700, fontSize: 20, margin: '16px 0 20px 0' }}>{price}</div>
      <button
        style={active
          ? { width: '100%', padding: '12px 0', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: 16, marginTop: 12, cursor: 'pointer', background: 'linear-gradient(90deg, #1db954 60%, #4be285 100%)', color: '#fff' }
          : { width: '100%', padding: '12px 0', borderRadius: 8, border: 'none', fontWeight: 600, fontSize: 16, marginTop: 12, cursor: 'pointer', background: '#e8fdf9', color: '#1db954', borderColor: '#b2f2d7', borderStyle: 'solid', borderWidth: 1 }
        }
      >
        {btn}
      </button>
    </div>
  );
}

const features = [
  {
    icon: <span style={{ fontSize: 32, color: '#1db954' }}>💸</span>,
    title: 'Earn on the Move',
    desc: 'Travelers get paid to deliver packages along their route. Sign up, get verified, and start earning instantly.',
  },
  {
    icon: <span style={{ fontSize: 32, color: '#1db954' }}>🤝</span>,
    title: 'Smart Matching',
    desc: 'We match travelers and businesses based on destination and timing for seamless, efficient delivery.',
  },
  {
    icon: <span style={{ fontSize: 32, color: '#FFD600' }}>🔒</span>,
    title: 'Verified & Secure',
    desc: 'All travelers are verified for safety. Businesses can trust their packages are in good hands.',
  },
  {
    icon: <span style={{ fontSize: 32, color: '#1db954' }}>💰</span>,
    title: 'Lower Delivery Costs',
    desc: 'Businesses save money by leveraging travelers already headed to their destination—no need for expensive couriers.',
  },
  {
    icon: <span style={{ fontSize: 32, color: '#1db954' }}>📦</span>,
    title: 'Flexible for All',
    desc: 'Whether you’re a business or an individual, send and receive packages with ease and flexibility.',
  },
  {
    icon: <span style={{ fontSize: 32, color: '#1db954' }}>📱</span>,
    title: 'Easy Booking & Tracking',
    desc: 'Book, match, and track your delivery—all from your phone. Real-time updates for peace of mind.',
  },
];

const stats = [
  { value: '10,000+', label: 'Deliveries Completed' },
  { value: '500+', label: 'Verified Travelers' },
  { value: '4.9/5', label: 'Customer Rating' },
  { value: '24/7', label: 'Support' },
];

const featureCardStyle = {
  background: '#fff',
  borderRadius: 16,
  boxShadow: '0 2px 12px #f2f2f2',
  padding: '32px 28px',
  minWidth: 260,
  maxWidth: 340,
  flex: 1,
  margin: 12,
  textAlign: 'left',
  transition: 'box-shadow 0.2s, transform 0.2s',
  cursor: 'pointer',
  border: '1px solid #f2f2f2',
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
};

const featureCardHover = {
  boxShadow: '0 8px 32px #e8f5e9',
  transform: 'translateY(-6px) scale(1.03)',
  border: '1.5px solid #b2f2d7',
};

function FeatureCard({ icon, title, desc }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      style={{ ...featureCardStyle, ...(hover ? featureCardHover : {}) }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div>{icon}</div>
      <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 4 }}>{title}</div>
      <div style={{ color: '#666', fontSize: 16 }}>{desc}</div>
    </div>
  );
}

const howItWorksSteps = [
  {
    icon: '🧑‍💼',
    title: 'For Businesses',
    steps: [
      'Book a delivery and specify your package destination.',
      'Get matched with a verified traveler going your way.',
      'Hand over your package and track it in real time.',
      'Save on delivery costs and get peace of mind.',
    ],
  },
  {
    icon: '🧑‍🦰',
    title: 'For Travelers',
    steps: [
      'Sign up and get verified as a mover.',
      'Input your travel destination and schedule.',
      'Get matched with packages along your route.',
      'Pick up, deliver, and earn on the move!', 
    ],
  },
];

function HowItWorks() {
  return (
    <section style={{ maxWidth: 1100, margin: '4rem auto 0 auto', textAlign: 'center' }}>
      <h2 style={{ fontWeight: 800, fontSize: 32, marginBottom: 10 }}>How It Works</h2>
      <p style={{ color: '#7a8593', fontSize: 20, marginBottom: 36 }}>
        TumaRide connects businesses and travelers for smarter, cheaper, and more flexible delivery.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32 }}>
        {howItWorksSteps.map((role, idx) => (
          <div key={role.title} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px #e8f5e9', padding: 32, minWidth: 320, maxWidth: 400, margin: 12, textAlign: 'left' }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>{role.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 12 }}>{role.title}</div>
            <ol style={{ color: '#444', fontSize: 17, paddingLeft: 20 }}>
              {role.steps.map((s, i) => <li key={i} style={{ marginBottom: 10 }}>{s}</li>)}
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
}

const LandingPage = () => (
  <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8fdf9', color: '#222' }}>
    {/* Header */}
    <ResponsiveNavbar />
    {/* Install App button for small screens */}
    <InstallAppButton />
    {/* Hero Section */}
    <section className="hero-section" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem 2rem 1rem', background: '#f8fdf9', minHeight: 420 }}>
      <div style={{ flex: 1, minWidth: 340, maxWidth: 540, marginRight: 32 }} className="hero-section">
        <div style={{ background: '#e8f5e9', color: '#1db954', display: 'inline-block', padding: '6px 20px', borderRadius: 20, fontWeight: 600, fontSize: 15, marginBottom: 24 }}>
          ● Now serving Nairobi & Mombasa
        </div>
        <h1 style={{ fontSize: 54, fontWeight: 800, margin: '0 0 12px 0', lineHeight: 1.1 }}>
          Earn on the Move<br />
          <span style={{ color: '#1db954' }}>Deliver Smarter</span><br />
          For Travelers & Businesses
        </h1>
        <p style={{ fontSize: 20, color: '#555', marginBottom: 36, marginTop: 8, maxWidth: 500 }}>
          Travelers earn by carrying packages along their route. Businesses save on delivery by matching with verified travelers going to their destination. Everyone wins with TumaRide.
        </p>
        <div style={{ display: 'flex', gap: 18, marginBottom: 40 }}>
          <Link to="/sender/request-delivery" style={{ background: '#1db954', color: '#fff', padding: '1.1rem 2.2rem', borderRadius: 12, textDecoration: 'none', fontWeight: 700, fontSize: 18, boxShadow: '0 2px 8px #e8f5e9', display: 'flex', alignItems: 'center', gap: 8 }}>
            Book a Delivery <span style={{ fontSize: 22, marginLeft: 4 }}>→</span>
          </Link>
          <Link to="/auth/become-mover" style={{ background: '#fff', color: '#1db954', border: '1.5px solid #d1f5e0', padding: '1.1rem 2.2rem', borderRadius: 12, fontWeight: 700, fontSize: 18, display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            Become a Mover
          </Link>
        </div>
        <div style={{ display: 'flex', gap: 48, marginTop: 24, maxWidth: 420 }}>
          <div style={statStyle}><div style={{ fontWeight: 700, fontSize: 26, color: '#1db954' }}>10K+</div><div style={{ color: '#888', fontSize: 16 }}>Deliveries</div></div>
          <div style={statStyle}><div style={{ fontWeight: 700, fontSize: 26, color: '#1db954' }}>500+</div><div style={{ color: '#888', fontSize: 16 }}>Travelers</div></div>
          <div style={statStyle}><div style={{ fontWeight: 700, fontSize: 26, color: '#1db954' }}>4.9</div><div style={{ color: '#888', fontSize: 16 }}>Rating</div></div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 440, maxWidth: 600, position: 'relative', marginTop: 24, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 370 }}>
        <div style={{ position: 'relative', width: '100%', height: 340, maxWidth: 520, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={HERO_IMG} alt="Delivery Rider" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 28, boxShadow: '0 8px 32px #e8f5e9' }} />
          {/* Live Tracking badge */}
          <div style={{ position: 'absolute', top: 18, left: 18, background: '#fff', color: '#222', padding: '10px 22px', borderRadius: 14, fontWeight: 700, fontSize: 16, boxShadow: '0 2px 12px #e8f5e9', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span style={{ fontWeight: 700 }}>Live Tracking</span>
            <span style={{ color: '#888', fontWeight: 400, fontSize: 13 }}>Real-time updates</span>
          </div>
          {/* KES 150 badge */}
          <div style={{ position: 'absolute', bottom: 18, right: 18, background: '#fff', color: '#1db954', padding: '14px 28px', borderRadius: 14, fontWeight: 700, fontSize: 22, boxShadow: '0 2px 12px #e8f5e9', textAlign: 'center' }}>
            KES 150
            <div style={{ color: '#888', fontWeight: 400, fontSize: 14 }}>Average delivery</div>
          </div>
        </div>
      </div>
      {/* Responsive hero text styles */}
      <style>{`
        @media (max-width: 600px) {
          .hero-section h1 {
            font-size: 2.1rem !important;
            text-align: center !important;
          }
          .hero-section p {
            font-size: 1.05rem !important;
            text-align: center !important;
            max-width: 100vw !important;
          }
          .hero-section {
            text-align: center !important;
            margin-right: 0 !important;
          }
        }
      `}</style>
    </section>

    {/* Get an Instant Quote Section */}
    <section style={{ maxWidth: 900, margin: '3rem auto 0 auto', textAlign: 'center' }}>
      <h2 style={{ fontWeight: 800, fontSize: 32, marginBottom: 10 }}>Get an Instant Quote</h2>
      <p style={{ color: '#7a8593', fontSize: 18, marginBottom: 32 }}>Calculate your delivery cost in seconds. No hidden fees, transparent pricing.</p>
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #f8f5e9', padding: 32, maxWidth: 800, margin: '0 auto', border: '1px solid #e8f5e9' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          <span style={{ fontSize: 22, color: '#1db954', marginRight: 8 }}>🧮</span>
          <span style={{ fontWeight: 700, fontSize: 24 }}>Quick Quote Calculator</span>
        </div>
        <form style={{ display: 'flex', flexWrap: 'wrap', gap: 18, justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <label style={{ fontWeight: 600, marginBottom: 6 }}>Pickup Location</label>
            <div style={{ display: 'flex', alignItems: 'center', background: '#f8fdf9', border: '1px solid #e8f5e9', borderRadius: 8, padding: '0 12px', width: 180 }}>
              <span style={{ fontSize: 18, color: '#b2b2b2', marginRight: 6 }}>📍</span>
              <input placeholder="Enter pickup address" style={{ border: 'none', background: 'transparent', outline: 'none', padding: 10, width: '100%', fontSize: 16 }} />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <label style={{ fontWeight: 600, marginBottom: 6 }}>Dropoff Location</label>
            <div style={{ display: 'flex', alignItems: 'center', background: '#f8fdf9', border: '1px solid #e8f5e9', borderRadius: 8, padding: '0 12px', width: 180 }}>
              <span style={{ fontSize: 18, color: '#b2b2b2', marginRight: 6 }}>📍</span>
              <input placeholder="Enter dropoff address" style={{ border: 'none', background: 'transparent', outline: 'none', padding: 10, width: '100%', fontSize: 16 }} />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <label style={{ fontWeight: 600, marginBottom: 6 }}>Destinations</label>
            <select style={{ background: '#f8fdf9', border: '1px solid #e8f5e9', borderRadius: 8, padding: 10, width: 160, fontSize: 16 }}>
              <option>1 Destination</option>
              <option>2 Destinations</option>
              <option>3 Destinations</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <label style={{ fontWeight: 600, marginBottom: 6 }}>Vehicle Type</label>
            <div style={{ display: 'flex', alignItems: 'center', background: '#f8fdf9', border: '1px solid #e8f5e9', borderRadius: 8, padding: '0 12px', width: 160 }}>
              <span style={{ fontSize: 18, color: '#b2b2b2', marginRight: 6 }}>🛵</span>
              <select style={{ border: 'none', background: 'transparent', outline: 'none', padding: 10, width: '100%', fontSize: 16 }}>
                <option>Select vehicle</option>
                <option>Motorcycle</option>
                <option>TukTuk</option>
                <option>Van</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button type="button" style={{ background: '#b2f2d7', color: '#1db954', border: 'none', padding: '0.9rem 2.2rem', borderRadius: 8, fontWeight: 700, fontSize: 18, marginTop: 22, boxShadow: '0 2px 8px #e8f5e9', transition: 'background 0.2s' }}>Calculate Price</button>
          </div>
        </form>
      </div>
    </section>

    {/* How It Works Section */}
    <HowItWorks />

    {/* Simple Pricing Section - Choose Your Vehicle Style */}
    <section id="pricing" style={{ maxWidth: 1100, margin: '3rem auto', textAlign: 'center' }}>
      <h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 32 }}>Choose Your Vehicle Based on your Package Needs</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
        {vehicleCards.map((v, i) => <VehicleCard key={i} {...v} />)}
      </div>
    </section>

    {/* Features Section (redesigned) */}
    <section style={{ maxWidth: 1200, margin: '4rem auto 0 auto', textAlign: 'center' }}>
      <h2 style={{ fontWeight: 800, fontSize: 32, marginBottom: 10 }}>Why Choose TumaRide?</h2>
      <p style={{ color: '#7a8593', fontSize: 20, marginBottom: 36 }}>
        Travelers earn, businesses save. TumaRide is the smart way to move parcels across Kenya.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 0 }}>
        {features.map((f, i) => <FeatureCard key={i} {...f} />)}
      </div>
      {/* Stats Bar */}
      <div style={{ background: 'linear-gradient(90deg, #1db954 60%, #4be285 100%)', color: '#fff', display: 'flex', justifyContent: 'center', gap: 0, padding: '2.5rem 0', fontWeight: 700, fontSize: 28, borderRadius: 20, margin: '3rem 0 0 0' }}>
        {stats.map((s, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontWeight: 800, fontSize: 32 }}>{s.value}</div>
            <div style={{ fontWeight: 400, fontSize: 18, marginTop: 6 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>

    {/* Minimal Footer */}
    <footer style={{ background: '#fff', borderTop: '1px solid #e8f5e9', padding: '2rem 1rem', color: '#888', fontSize: 14, textAlign: 'center' }}>
      © 2025 TumaRide. All rights reserved.
    </footer>
  </div>
);

export default LandingPage; 