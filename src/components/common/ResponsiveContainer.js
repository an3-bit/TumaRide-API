import React from 'react';

const containerStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#f8fdf9',
  padding: '32px 16px',
};

const innerStyle = {
  width: '100%',
  maxWidth: 900,
  background: '#fff',
  borderRadius: 20,
  boxShadow: '0 2px 24px #e8f5e9',
  padding: 40,
  margin: '0 auto',
  transition: 'max-width 0.3s, padding 0.3s',
};

// Responsive adjustments
function getResponsiveInnerStyle() {
  if (window.innerWidth < 600) {
    return { ...innerStyle, maxWidth: '98vw', padding: 16 };
  } else if (window.innerWidth < 900) {
    return { ...innerStyle, maxWidth: 600, padding: 24 };
  }
  return innerStyle;
}

export default function ResponsiveContainer({ children, style = {}, innerCustomStyle = {} }) {
  const [responsiveStyle, setResponsiveStyle] = React.useState(getResponsiveInnerStyle());

  React.useEffect(() => {
    function handleResize() {
      setResponsiveStyle(getResponsiveInnerStyle());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ ...containerStyle, ...style }}>
      <div style={{ ...responsiveStyle, ...innerCustomStyle }}>
        {children}
      </div>
    </div>
  );
} 