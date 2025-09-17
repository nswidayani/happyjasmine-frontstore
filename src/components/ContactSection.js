import { Box, Typography, Container, Grid, Card, CardContent, Button, IconButton, Link } from '@mui/material';
import { Email, Phone, LocationOn, Send, Map as MapIcon, Facebook, Instagram, WhatsApp } from '@mui/icons-material';
import { useTheme } from './ThemeProvider';
import LocationsMap from './LocationsMap';

export default function ContactSection({ contactData }) {
  const { theme } = useTheme();

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'primary.main',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'rgba(0, 0, 0, 0.1)',
        }
      }}
    >

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>


        {/* Social Media & Contact Icons */}
        <Box sx={{ mb: 8 }}>
          <Box textAlign="center" sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              component="h3"
              sx={{
                mb: 2,
                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                fontWeight: 700,
                color: 'primary.contrastText',
                letterSpacing: '-0.02em',
              }}
            >
              Terhubung Dengan Kami
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'primary.contrastText',
                maxWidth: '500px',
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Ikuti kami di media sosial dan hubungi kami
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
            {/* Facebook */}
            <Box sx={{ textAlign: 'center' }}>
              <IconButton
                component={Link}
                href={contactData?.facebook || 'https://facebook.com/company'}
                target="_blank"
                sx={{
                  width: 70,
                  height: 70,
                  bgcolor: 'rgba(24, 119, 242, 0.1)',
                  color: '#1877F2',
                  borderRadius: '20px',
                  '&:hover': {
                    bgcolor: '#1877F2',
                    color: 'white',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <Facebook sx={{ fontSize: 32 }} />
              </IconButton>
              <Typography variant="body2" sx={{ mt: 1, fontWeight: 500, color: 'primary.contrastText' }}>
                Facebook
              </Typography>
            </Box>

            {/* Instagram */}
            <Box sx={{ textAlign: 'center' }}>
              <IconButton
                component={Link}
                href={contactData?.instagram || 'https://instagram.com/company'}
                target="_blank"
                sx={{
                  width: 70,
                  height: 70,
                  bgcolor: 'rgba(225, 48, 108, 0.1)',
                  color: '#E1306C',
                  borderRadius: '20px',
                  '&:hover': {
                    bgcolor: '#E1306C',
                    color: 'white',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <Instagram sx={{ fontSize: 32 }} />
              </IconButton>
              <Typography variant="body2" sx={{ mt: 1, fontWeight: 500, color: 'primary.contrastText' }}>
                Instagram
              </Typography>
            </Box>

            {/* WhatsApp */}
            <Box sx={{ textAlign: 'center' }}>
              <IconButton
                component={Link}
                href={`https://wa.me/${contactData?.whatsapp || '1234567890'}`}
                target="_blank"
                sx={{
                  width: 70,
                  height: 70,
                  bgcolor: 'rgba(37, 211, 102, 0.1)',
                  color: '#25D366',
                  borderRadius: '20px',
                  '&:hover': {
                    bgcolor: '#25D366',
                    color: 'white',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <WhatsApp sx={{ fontSize: 32 }} />
              </IconButton>
              <Typography variant="body2" sx={{ mt: 1, fontWeight: 500, color: 'primary.contrastText' }}>
                WhatsApp
              </Typography>
            </Box>

            {/* TikTok */}
            <Box sx={{ textAlign: 'center' }}>
              <IconButton
                component={Link}
                href={contactData?.tiktok || 'https://tiktok.com/@company'}
                target="_blank"
                sx={{
                  width: 70,
                  height: 70,
                  bgcolor: 'rgba(0, 0, 0, 0.1)',
                  color: '#000000',
                  borderRadius: '20px',
                  '&:hover': {
                    bgcolor: '#000000',
                    color: 'white',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <Typography sx={{ fontSize: 24, fontWeight: 'bold' }}>TT</Typography>
              </IconButton>
              <Typography variant="body2" sx={{ mt: 1, fontWeight: 500, color: 'primary.contrastText' }}>
                TikTok
              </Typography>
            </Box>

            {/* YouTube */}
            <Box sx={{ textAlign: 'center' }}>
              <IconButton
                component={Link}
                href={contactData?.youtube || 'https://youtube.com/company'}
                target="_blank"
                sx={{
                  width: 70,
                  height: 70,
                  bgcolor: 'rgba(255, 0, 0, 0.1)',
                  color: '#FF0000',
                  borderRadius: '20px',
                  '&:hover': {
                    bgcolor: '#FF0000',
                    color: 'white',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <Typography sx={{ fontSize: 24, fontWeight: 'bold' }}>YT</Typography>
              </IconButton>
              <Typography variant="body2" sx={{ mt: 1, fontWeight: 500, color: 'primary.contrastText' }}>
                YouTube
              </Typography>
            </Box>

            {/* Phone */}
            <Box sx={{ textAlign: 'center' }}>
              <IconButton
                component={Link}
                href={`tel:${contactData?.phone || '+1 (555) 123-4567'}`}
                sx={{
                  width: 70,
                  height: 70,
                  bgcolor: 'rgba(255, 227, 71, 0.1)',
                  color: 'secondary.main',
                  borderRadius: '20px',
                  '&:hover': {
                    bgcolor: 'secondary.main',
                    color: 'primary.main',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <Phone sx={{ fontSize: 32 }} />
              </IconButton>
              <Typography variant="body2" sx={{ mt: 1, fontWeight: 500, color: 'primary.contrastText' }}>
                Telepon
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Locations Map Section */}
        <Box sx={{ mb: 8 }}>
          <Box textAlign="center" sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              component="h3"
              sx={{
                mb: 2,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 700,
                color: 'primary.contrastText',
                letterSpacing: '-0.02em',
              }}
            >
              Temukan Kami
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
                color: 'primary.contrastText',
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              Temukan lokasi bisnis kami di seluruh wilayah
            </Typography>
          </Box>

          <Box
            sx={{
              width: '100%',
              height: '400px',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 8px 25px rgba(0, 95, 115, 0.15)',
              border: '2px solid rgba(0, 95, 115, 0.1)',
            }}
          >
            <LocationsMap />
          </Box>
        </Box>

      </Container>
    </Box>
  );
}
