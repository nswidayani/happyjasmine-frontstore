import { useState, useEffect } from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import FeaturesSection from './FeaturesSection';
import ProductsSection from './ProductsSection';

export default function ProductsFeaturesSection({ features, products }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (newValue) => {
    setActiveTab(newValue);
  };

  const tabLabels = [
    { label: 'Varian Rasa', icon: '🧃' },
    { label: 'Keunggulan', icon: '💚' }
  ];

  return (
    <Box sx={{ 
      py: { xs: 6, md: 8 }, 
      px: { xs: 2, sm: 3 },
      position: 'relative',
      background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.light || theme.palette.secondary.main} 100%)`,
      overflow: 'hidden'
    }}>
      {/* Creative Background Elements */}
      {/* Floating Bubbles */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 0
      }}>
        {/* Large Bubble 1 */}
        <Box sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.15)',
          animation: 'float 6s ease-in-out infinite',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '20%',
            left: '20%',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.2)'
          }
        }} />
        
        {/* Medium Bubble 2 */}
        <Box sx={{
          position: 'absolute',
          top: '60%',
          right: '10%',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          animation: 'float 8s ease-in-out infinite reverse',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '25%',
            left: '25%',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.15)'
          }
        }} />
        
        {/* Small Bubble 3 */}
        <Box sx={{
          position: 'absolute',
          top: '20%',
          right: '30%',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.08)',
          animation: 'float 10s ease-in-out infinite'
        }} />
        
        {/* Tiny Bubble 4 */}
        <Box sx={{
          position: 'absolute',
          bottom: '20%',
          left: '20%',
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.12)',
          animation: 'float 12s ease-in-out infinite reverse'
        }} />
      </Box>

      {/* Curvy Lines */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 0
      }}>
        {/* Curvy Line 1 - Top */}
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
          transform: 'rotate(-15deg)'
        }} />
        
        {/* Curvy Line 2 - Bottom */}
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
          transform: 'rotate(25deg)'
        }} />
        
        {/* Curvy Line 3 - Middle */}
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100px',
          height: '60px',
          border: '2px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '50px',
          transform: 'translate(-50%, -50%) rotate(45deg)'
        }} />
      </Box>

      {/* Main Content Container */}
      <Box sx={{
        position: 'relative',
        zIndex: 1,
        background: `rgba(${theme.palette.secondary.main === '#FFE347' ? '255, 227, 71' : '255, 255, 255'}, 0.08)`,
        borderRadius: { xs: '20px', md: '30px' },
        p: { xs: 3, sm: 4, md: 5 },
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        border: `2px solid rgba(${theme.palette.secondary.main === '#FFE347' ? '255, 227, 71' : '255, 255, 255'}, 0.2)`,
        backdropFilter: 'blur(10px)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-2px',
          left: '-2px',
          right: '-2px',
          bottom: '-2px',
          background: `linear-gradient(45deg, rgba(${theme.palette.secondary.main === '#FFE347' ? '255, 227, 71' : '255, 255, 255'}, 0.2), rgba(${theme.palette.secondary.main === '#FFE347' ? '255, 227, 71' : '255, 255, 255'}, 0.05))`,
          borderRadius: { xs: '20px', md: '30px' },
          zIndex: -1
        }
      }}>
        {/* Eye-catching Tabs */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mb: { xs: 4, md: 6 },
          position: 'relative'
        }}>
                     {/* Tab Container with Background */}
           <Box sx={{
             display: 'flex',
             bgcolor: `rgba(${theme.palette.secondary.main === '#FFE347' ? '255, 227, 71' : '255, 255, 255'}, 0.15)`,
             backdropFilter: 'blur(10px)',
             borderRadius: '50px',
             p: 0.5,
             border: '2px solid',
             borderColor: `rgba(${theme.palette.secondary.main === '#FFE347' ? '255, 227, 71' : '255, 255, 255'}, 0.3)`,
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
               background: `linear-gradient(135deg, rgba(${theme.palette.secondary.main === '#FFE347' ? '255, 227, 71' : '255, 255, 255'}, 0.3) 0%, rgba(${theme.palette.secondary.main === '#FFE347' ? '255, 227, 71' : '255, 255, 255'}, 0.1) 100%)`,
               borderRadius: '50px',
               zIndex: 0
             },
             '&::after': {
               content: '""',
               position: 'absolute',
               top: '-2px',
               left: '-2px',
               right: '-2px',
               bottom: '-2px',
               background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.light || theme.palette.secondary.main}, ${theme.palette.primary.main})`,
               borderRadius: '50px',
               zIndex: -1,
               animation: 'gradientShift 3s ease infinite',
               backgroundSize: '400% 400%'
             }
           }}>
            {tabLabels.map((tab, index) => (
              <Box
                key={tab.label}
                onClick={() => handleTabChange(index)}
                className={`tab-hover-pulse ${activeTab === index ? 'tab-hover-glow' : ''}`}
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: { xs: 3, sm: 4 },
                  py: { xs: 1.5, sm: 2 },
                  borderRadius: '40px',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: activeTab === index ? 'scale(1.05)' : 'scale(1)',
                  background: activeTab === index 
                    ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
                    : 'transparent',
                  color: activeTab === index ? 'white' : 'text.primary',
                  fontWeight: activeTab === index ? 700 : 500,
                  boxShadow: activeTab === index 
                    ? '0 8px 25px rgba(0, 0, 0, 0.2)' 
                    : 'none',
                  '&:hover': {
                    transform: activeTab === index ? 'scale(1.05)' : 'scale(1.02)',
                    background: activeTab === index 
                      ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`
                      : `rgba(${theme.palette.secondary.main === '#FFE347' ? '255, 227, 71' : '255, 255, 255'}, 0.2)`,
                    color: activeTab === index ? 'white' : 'primary.main'
                  },
                  '&:active': {
                    transform: 'scale(0.98)',
                    animation: 'tabBounce 0.8s ease-in-out'
                  }
                }}
              >
                <Typography 
                  variant="h6" 
                  className={`tab-icon-float ${activeTab === index ? 'gradient-text-animated' : ''}`}
                  sx={{ 
                    fontSize: { xs: '1.5rem', sm: '1.8rem' },
                    filter: activeTab === index ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {tab.icon}
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    fontWeight: 'inherit',
                    textTransform: 'none',
                    letterSpacing: '0.5px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {tab.label}
                </Typography>
                
                {/* Active tab indicator */}
                {activeTab === index && (
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: '-2px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '20px',
                      height: '4px',
                      background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4)',
                      borderRadius: '2px',
                      animation: 'tabPulse 2s ease-in-out infinite'
                    }}
                  />
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Content Area */}
        <Box sx={{ 
          position: 'relative',
          minHeight: '400px',
          background: `rgba(${theme.palette.secondary.main === '#FFE347' ? '255, 227, 71' : '255, 255, 255'}, 0.1)`,
          borderRadius: '20px',
          p: 3,
          border: `1px solid rgba(${theme.palette.secondary.main === '#FFE347' ? '255, 227, 71' : '255, 255, 255'}, 0.2)`,
          backdropFilter: 'blur(5px)',
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
            opacity: 0.6
          }
        }}>
          {/* Products Tab */}
          <Box
            sx={{
              display: activeTab === 0 ? 'block' : 'none',
              animation: activeTab === 0 ? 'fadeInUp 0.6s ease-out' : 'none',
              '@keyframes fadeInUp': {
                '0%': {
                  opacity: 0,
                  transform: 'translateY(20px)'
                },
                '100%': {
                  opacity: 1,
                  transform: 'translateY(0)'
                }
              }
            }}
          >
            <ProductsSection products={products} />
          </Box>

          {/* Features Tab */}
          <Box
            sx={{
              display: activeTab === 1 ? 'block' : 'none',
              animation: activeTab === 1 ? 'fadeInUp 0.6s ease-out' : 'none',
              '@keyframes fadeInUp': {
                '0%': {
                  opacity: 0,
                  transform: 'translateY(20px)'
                },
                '100%': {
                  opacity: 1,
                  transform: 'translateY(0)'
                }
              }
            }}
          >
            <FeaturesSection features={features} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
