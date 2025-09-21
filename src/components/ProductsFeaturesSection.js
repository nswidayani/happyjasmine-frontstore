import { useState, useEffect, useRef } from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import FeaturesSection from './FeaturesSection';
import ProductsSection from './ProductsSection';

export default function ProductsFeaturesSection({ features, products }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeTab, setActiveTab] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);
  const tabsRef = useRef([]);

  const handleTabChange = (newValue) => {
    if (newValue !== activeTab) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveTab(newValue);
        setTimeout(() => setIsTransitioning(false), 100);
      }, 150);
    }
  };

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const tabLabels = [
    { label: 'Varian Rasa', icon: '🧃' },
    { label: 'Keunggulan', icon: '💚' }
  ];

  return (
      <Box
          id="products"
          ref={containerRef}
          sx={{
            pt: 0,
            pb: 0,
            width: '100%',
            position: 'relative',
            background: theme.palette.secondary.main,
            overflow: 'hidden',
            minHeight: '80vh'
          }}
      >

        {/* Main Content Container */}
        <Box sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%'
        }}>
          {/* Enhanced Tabs Container */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 3,
            mb: 0,
            position: 'relative',
            px: { xs: 2, sm: 3 },
            zIndex: 10
          }}>
            {/* Compact Tab Container with Primary Background */}
            <Box className="tab-container" sx={{
              display: 'flex',
              background: theme.palette.primary.main,
              borderRadius: '30px',
              p: 1,
              border: `2px solid ${theme.palette.primary.dark}`,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
              position: 'relative',
            }}>
              {tabLabels.map((tab, index) => (
                  <Box
                      key={index}
                      ref={el => tabsRef.current[index] = el}
                      onClick={() => handleTabChange(index)}
                      className="compact-tab"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        px: { xs: 3, sm: 4 },
                        py: { xs: 2, sm: 2.5 },
                        borderRadius: '25px',
                        cursor: 'pointer',
                        position: 'relative',
                        zIndex: 2,
                        overflow: 'hidden',
                        minWidth: { xs: '120px', sm: '130px' },
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        // Compact active tab styling with white background
                        background: activeTab === index
                            ? '#FFFFFF'
                            : 'rgba(255, 255, 255, 0.2)',
                        color: activeTab === index
                            ? theme.palette.primary.main
                            : '#FFFFFF',
                        boxShadow: activeTab === index
                            ? '0 4px 15px rgba(0, 0, 0, 0.2)'
                            : 'none',
                        transform: activeTab === index ? 'scale(1.02)' : 'scale(1)',
                        '&:hover': {
                          background: activeTab === index
                              ? '#FFFFFF'
                              : 'rgba(255, 255, 255, 0.3)',
                          transform: 'scale(1.02)',
                          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
                        },
                        '&:active': {
                          transform: 'scale(0.98)',
                          transition: 'all 0.1s ease',
                        }
                      }}
                  >
                    <Typography
                        sx={{
                          fontSize: { xs: '1rem', sm: '1.1rem' },
                          fontWeight: activeTab === index ? 600 : 500,
                          position: 'relative',
                          zIndex: 3,
                          transition: 'all 0.3s ease',
                        }}
                    >
                      {tab.icon}
                    </Typography>
                    <Typography
                        sx={{
                          fontSize: { xs: '0.8rem', sm: '0.9rem' },
                          fontWeight: activeTab === index ? 600 : 500,
                          position: 'relative',
                          zIndex: 3,
                          whiteSpace: 'nowrap',
                          letterSpacing: '0.3px',
                          transition: 'all 0.3s ease'
                        }}
                    >
                      {tab.label}
                    </Typography>
                  </Box>
              ))}
            </Box>
          </Box>

          {/* Simplified Content Area */}
          <Box sx={{
            position: 'relative',
            width: '100%',
            minHeight: '400px',
            background: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            // borderRadius: '16px',
            overflow: 'hidden',
          }}>
            {/* Simplified Content */}
            <Box sx={{
              width: '100%',
              opacity: isTransitioning ? 0.7 : 1,
              transition: 'opacity 0.3s ease',
            }}>
              {activeTab === 0 ? (
                  <ProductsSection products={products} />
              ) : (
                  <FeaturesSection features={features} />
              )}
            </Box>
          </Box>
        </Box>

        {/* Enhanced Global Styles for Animations */}
        <style jsx global>{`
          @keyframes float0 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(2deg); }
          }

          @keyframes float1 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-10px) rotate(-1deg); }
            66% { transform: translateY(-20px) rotate(1deg); }
          }

          @keyframes float2 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-8px) rotate(1deg); }
            75% { transform: translateY(-12px) rotate(-1deg); }
          }

          @keyframes particleFloat {
            0% { transform: translateY(100vh) scale(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100px) scale(1); opacity: 0; }
          }

          @keyframes bubbleShine {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.2); }
          }

          @keyframes breathe {
            0%, 100% { transform: scale(1) rotate(-15deg); opacity: 0.6; }
            50% { transform: scale(1.1) rotate(-15deg); opacity: 1; }
          }

          @keyframes drift {
            0%, 100% { transform: translateX(0px) translateY(0px); }
            25% { transform: translateX(10px) translateY(-5px); }
            50% { transform: translateX(-5px) translateY(-10px); }
            75% { transform: translateX(-10px) translateY(5px); }
          }

          @keyframes spin {
            from { transform: translate(-50%, -50%) rotate(45deg); }
            to { transform: translate(-50%, -50%) rotate(405deg); }
          }

          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes shimmer {
            0%, 100% { opacity: 0.2; transform: translateX(-100%); }
            50% { opacity: 0.5; transform: translateX(100%); }
          }

          @keyframes iconBounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-8px); }
            60% { transform: translateY(-4px); }
          }

          @keyframes topBarPulse {
            0%, 100% { opacity: 0.6; width: 100px; }
            50% { opacity: 1; width: 150px; }
          }

          @keyframes ripple {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
          }

          /* Enhanced tab transitions */
          .tab-entering {
            animation: slideInFromRight 0.6s ease-out;
          }

          .tab-exiting {
            animation: slideOutToLeft 0.6s ease-out;
          }

          @keyframes slideInFromRight {
            0% { transform: translateX(100%) scale(0.9); opacity: 0; }
            100% { transform: translateX(0) scale(1); opacity: 1; }
          }

          @keyframes slideOutToLeft {
            0% { transform: translateX(0) scale(1); opacity: 1; }
            100% { transform: translateX(-100%) scale(0.9); opacity: 0; }
          }

          /* Compact tab effects */
          .compact-tab {
            transition: all 0.3s ease;
          }

          .compact-tab:hover {
            transform: scale(1.02);
          }

          .compact-tab:active {
            transform: scale(0.98);
            transition: all 0.1s ease;
          }
        `}</style>
      </Box>
  );
}