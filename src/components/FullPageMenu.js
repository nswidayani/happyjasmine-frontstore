import { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  Typography,
  Container,
  Grid,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Close as CloseIcon,
  Home as HomeIcon,
  Category as ProductsIcon,
  Info as AboutIcon,
  Campaign as CampaignIcon,
  AdminPanelSettings as AdminIcon
} from '@mui/icons-material';
import Link from 'next/link';

const menuItems = [
  {
    title: 'Beranda',
    description: 'Selamat datang di Happy Jasmine',
    icon: <HomeIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    path: '/#hero',
    color: 'rgba(255, 255, 255, 0.9)'
  },
  {
    title: 'Produk',
    description: 'Jelajahi produk menakjubkan kami',
    icon: <ProductsIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    path: '/#products',
    color: 'rgba(255, 255, 255, 0.9)'
  },
  {
    title: 'Tentang',
    description: 'Pelajari lebih lanjut tentang perusahaan kami',
    icon: <AboutIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    path: '/#about',
    color: 'rgba(255, 255, 255, 0.9)'
  },
  {
    title: 'Kampanye',
    description: 'Segera hadir...',
    icon: <CampaignIcon sx={{ fontSize: 48, color: 'rgba(255, 255, 255, 0.5)' }} />,
    path: '#',
    color: 'rgba(255, 255, 255, 0.5)',
    disabled: true
  },
  {
    title: 'Admin',
    description: 'Akses panel admin',
    icon: <AdminIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
    path: '/admin',
    color: 'rgba(255, 255, 255, 0.9)',
    external: true
  }
];

export default function FullPageMenu({ open, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (open) {
      // Small delay to ensure DOM is ready
      setTimeout(() => setAnimateIn(true), 50);
    } else {
      setAnimateIn(false);
    }
  }, [open]);

  const handleMenuClick = (item) => {
    if (!item.disabled) {
      onClose();
      
      if (item.external) {
        // For external links like Admin, navigate directly
        window.location.href = item.path;
      } else if (item.path.includes('#')) {
        // Smooth scroll to section if it's an anchor link
        const element = document.querySelector(item.path.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  if (!open) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: 'warning.main',
        zIndex: theme.zIndex.modal + 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: { xs: 20, md: 40 },
          right: { xs: 20, md: 40 },
          color: 'white',
          bgcolor: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          '&:hover': {
            bgcolor: 'rgba(255, 255, 255, 0.2)',
            transform: 'scale(1.1)'
          },
          transition: 'all 0.3s ease-in-out',
          zIndex: 1
        }}
      >
        <CloseIcon sx={{ fontSize: 28 }} />
      </IconButton>

      {/* Menu Content */}
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        
        {/* Mobile Fallback Layout */}
        {isMobile && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
            {menuItems.map((item, index) => (
              <Box
                key={`mobile-${item.title}`}
                component={item.disabled ? 'div' : 'button'}
                onClick={() => handleMenuClick(item)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3,
                  p: 3,
                  width: '100%',
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 2,
                  cursor: item.disabled ? 'default' : 'pointer',
                  color: item.disabled ? 'rgba(255, 255, 255, 0.5)' : 'primary.main',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': item.disabled ? {} : {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateX(8px)'
                  }
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    flexShrink: 0
                  }}
                >
                  {item.icon}
                </Box>
                
                <Box sx={{ textAlign: 'left', flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, color: 'primary.main' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8, color: 'primary.main' }}>
                    {item.description}
                  </Typography>
                  {item.disabled && (
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                      Segera Hadir
                    </Typography>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {/* Desktop Grid Layout */}
        {!isMobile && (
          <Grid 
            container 
            spacing={isMobile ? 2 : 4} 
            justifyContent="center"
            sx={{ 
              opacity: animateIn ? 1 : 0,
              transform: animateIn ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              width: '100%'
            }}
          >
            {menuItems.map((item, index) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                md={4} 
                lg={3}
                key={item.title}
                sx={{
                  opacity: animateIn ? 1 : 0,
                  transform: animateIn ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`,
                  minWidth: { xs: '100%', sm: 'auto' },
                  display: 'block',
                  visibility: 'visible'
                }}
              >
                <Box
                  component={item.disabled ? 'div' : 'button'}
                  onClick={() => handleMenuClick(item)}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    p: 4,
                    width: '100%',
                    minHeight: 200,
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 3,
                    cursor: item.disabled ? 'default' : 'pointer',
                    color: item.color,
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': item.disabled ? {} : {
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-8px) scale(1.02)',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
                    },
                    '&:active': item.disabled ? {} : {
                      transform: 'translateY(-4px) scale(1.01)'
                    }
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      transition: 'all 0.3s ease-in-out'
                    }}
                  >
                    {item.icon}
                  </Box>
                  
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 700,
                      fontSize: { xs: '1.5rem', md: '2rem' }
                    }}
                  >
                    {item.title}
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      opacity: 0.8,
                      fontSize: { xs: '0.9rem', md: '1rem' },
                      maxWidth: 200,
                      mx: 'auto'
                    }}
                  >
                    {item.description}
                  </Typography>

                  {item.disabled && (
                    <Box
                      sx={{
                        mt: 1,
                        px: 2,
                        py: 0.5,
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: 2,
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      <Typography variant="caption" sx={{ opacity: 0.7 }}>
                        Coming Soon
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Additional Info */}
        <Box
          sx={{
            mt: 6,
            opacity: animateIn ? 1 : 0,
            transform: animateIn ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.4s'
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.9rem'
            }}
          >
            Happy Jasmine - Membawa kebahagiaan melalui produk berkualitas
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
