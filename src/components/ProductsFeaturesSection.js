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
            py: { xs: 6, md: 8 },
            width: '100%',
            position: 'relative',
            background: 'transparent',
            overflow: 'hidden',
            minHeight: '100vh'
          }}
      >
        {/* Enhanced Interactive Background Elements */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 0
        }}>
          {/* Parallax Floating Bubbles with Mouse Following */}
          {[...Array(8)].map((_, index) => (
              <Box
                  key={`bubble-${index}`}
                  sx={{
                    position: 'absolute',
                    top: `${10 + (index * 12)}%`,
                    left: `${5 + (index * 15)}%`,
                    width: `${60 + (index * 15)}px`,
                    height: `${60 + (index * 15)}px`,
                    borderRadius: '50%',
                    background: `rgba(255, 255, 255, ${0.08 + (index * 0.02)})`,
                    animation: `float${index % 3} ${6 + index}s ease-in-out infinite`,
                    transform: `translate(${mousePosition.x * (0.5 + index * 0.1)}px, ${mousePosition.y * (0.3 + index * 0.05)}px)`,
                    transition: 'transform 0.3s ease-out',
                    backdropFilter: 'blur(2px)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '10%',
                      left: '10%',
                      width: '30%',
                      height: '30%',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.4)',
                      animation: 'bubbleShine 3s ease-in-out infinite'
                    },
                    '&:hover': {
                      transform: 'scale(1.1)',
                      transition: 'transform 0.3s ease'
                    }
                  }}
              />
          ))}

          {/* Interactive Particles */}
          {[...Array(12)].map((_, index) => (
              <Box
                  key={`particle-${index}`}
                  sx={{
                    position: 'absolute',
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: `${2 + Math.random() * 4}px`,
                    height: `${2 + Math.random() * 4}px`,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.6)',
                    animation: `particleFloat ${10 + Math.random() * 10}s linear infinite`,
                    transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.1}px)`,
                    transition: 'transform 0.5s ease-out'
                  }}
              />
          ))}

          {/* Enhanced Curvy Lines with Breathing Effect */}
          <Box sx={{
            position: 'absolute',
            top: '15%',
            left: '-50px',
            width: '200px',
            height: '100px',
            border: '3px solid rgba(255, 255, 255, 0.1)',
            borderTop: 'none',
            borderRight: 'none',
            borderRadius: '0 0 0 100px',
            transform: 'rotate(-15deg)',
            animation: 'breathe 4s ease-in-out infinite, drift 20s ease-in-out infinite'
          }} />

          <Box sx={{
            position: 'absolute',
            bottom: '25%',
            right: '-30px',
            width: '150px',
            height: '80px',
            border: '2px solid rgba(255, 255, 255, 0.08)',
            borderBottom: 'none',
            borderLeft: 'none',
            borderRadius: '100px 0 0 0',
            transform: 'rotate(25deg)',
            animation: 'breathe 6s ease-in-out infinite reverse, drift 25s ease-in-out infinite reverse'
          }} />

          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100px',
            height: '60px',
            border: '2px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '50px',
            transform: 'translate(-50%, -50%) rotate(45deg)',
            animation: 'breathe 8s ease-in-out infinite, spin 30s linear infinite'
          }} />
        </Box>

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
            mb: { xs: 4, md: 6 },
            position: 'relative',
            px: { xs: 2, sm: 3 }
          }}>
            {/* Tab Container with Enhanced Glassmorphism */}
            <Box sx={{
              display: 'flex',
              background: `rgba(${theme.palette.secondary.main === '#FFE347' ? '255, 227, 71' : '255, 255, 255'}, 0.1)`,
              backdropFilter: 'blur(20px)',
              borderRadius: '50px',
              p: 0.75,
              border: `1px solid rgba(${theme.palette.secondary.main === '#FFE347' ? '255, 227, 71' : '255, 255, 255'}, 0.2)`,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(45deg, rgba(${theme.palette.secondary.main === '#FFE347' ? '255, 227, 71' : '255, 255, 255'}, 0.1) 0%, transparent 50%, rgba(${theme.palette.secondary.main === '#FFE347' ? '255, 227, 71' : '255, 255, 255'}, 0.1) 100%)`,
                animation: 'shimmer 3s ease-in-out infinite',
                pointerEvents: 'none'
              }
            }}>
              {tabLabels.map((tab, index) => (
                  <Box
                      key={index}
                      ref={el => tabsRef.current[index] = el}
                      onClick={() => handleTabChange(index)}
                      className="magnetic-tab"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        px: { xs: 3, sm: 4, md: 5 },
                        py: { xs: 1.5, sm: 2 },
                        borderRadius: '40px',
                        cursor: 'pointer',
                        position: 'relative',
                        zIndex: 2,
                        overflow: 'hidden',
                        minWidth: { xs: '120px', sm: '140px', md: '160px' },
                        justifyContent: 'center',
                        // Active tab with tertiary background
                        background: activeTab === index
                            ? theme.palette.tertiary.main
                            : 'transparent',
                        color: activeTab === index
                            ? 'white'
                            : theme.palette.text.primary,
                        boxShadow: activeTab === index
                            ? '0 6px 20px rgba(255, 144, 173, 0.4)'
                            : 'none',
                        transform: activeTab === index ? 'translateY(-2px)' : 'translateY(0)',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: activeTab === index
                              ? 'linear-gradient(135deg, rgba(255, 144, 173, 0.8) 0%, rgba(255, 144, 173, 0.9) 100%)'
                              : 'transparent',
                          borderRadius: '40px',
                          zIndex: -1,
                          transition: 'all 0.4s ease'
                        },
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          width: '0',
                          height: '0',
                          background: 'rgba(255, 255, 255, 0.3)',
                          borderRadius: '50%',
                          transition: 'all 0.6s ease',
                          zIndex: -1
                        },
                        '&:hover': {
                          '&::after': {
                            width: '120%',
                            height: '120%'
                          }
                        }
                      }}
                  >
                    <Typography
                        sx={{
                          fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                          fontWeight: activeTab === index ? 600 : 500,
                          position: 'relative',
                          zIndex: 3,
                          transition: 'all 0.3s ease'
                        }}
                    >
                      {tab.icon}
                    </Typography>
                    <Typography
                        sx={{
                          fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
                          fontWeight: activeTab === index ? 600 : 500,
                          position: 'relative',
                          zIndex: 3,
                          whiteSpace: 'nowrap',
                          animation: activeTab === index ? 'iconBounce 1s ease-in-out' : 'none',
                          transition: 'all 0.3s ease'
                        }}
                    >
                      {tab.label}
                    </Typography>
                  </Box>
              ))}
            </Box>
          </Box>

          {/* Enhanced Content Area */}
          <Box sx={{
            position: 'relative',
            width: '100%',
            minHeight: '400px',
            background: `rgba(${theme.palette.secondary.main === '#FFE347' ? '255, 227, 71' : '255, 255, 255'}, 0.1)`,
            border: `1px solid rgba(${theme.palette.secondary.main === '#FFE347' ? '255, 227, 71' : '255, 255, 255'}, 0.2)`,
            backdropFilter: 'blur(10px)',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100px',
              height: '4px',
              background: `linear-gradient(90deg, transparent 0%, ${theme.palette.primary.main} 50%, transparent 100%)`,
              borderRadius: '2px',
              opacity: 0.6,
              animation: 'topBarPulse 3s ease-in-out infinite'
            }
          }}>
            {/* Content with Slide Transition */}
            <Box sx={{
              width: '100%',
              opacity: isTransitioning ? 0.3 : 1,
              transform: isTransitioning ? 'scale(0.98)' : 'scale(1)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              filter: isTransitioning ? 'blur(2px)' : 'blur(0px)'
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

          /* Magnetic effect for tabs */
          @media (min-width: 900px) {
            .magnetic-tab {
              transition: transform 0.2s ease-out;
            }

            .magnetic-tab:hover {
              transform: translateY(-2px) scale(1.02);
            }
          }
        `}</style>
      </Box>
  );
}