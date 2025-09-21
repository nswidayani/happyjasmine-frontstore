import { Box, Typography, Container, Grid, Link, IconButton, Divider } from '@mui/material';
import { Facebook, Instagram, WhatsApp, Phone, Email, LocationOn } from '@mui/icons-material';
import { TikTokIcon, YouTubeIcon } from './SocialIcons';

export default function Footer({ contactData }) {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #005F73 0%, #0A9396 50%, #94D2BD 100%)',
        color: 'white',
        py: { xs: 3, sm: 4 },
        px: { xs: 2, sm: 3 },
        mt: 0,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Ccircle cx="20" cy="20" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.08,
        },
        boxShadow: '0 -2px 12px rgba(0, 0, 0, 0.08)',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Social Media & Contact Info - Simple Layout */}
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 4, md: 6 },
          alignItems: { xs: 'center', md: 'flex-start' },
          justifyContent: 'center'
        }}>

          {/* Social Media Icons */}
          <Box sx={{
            display: 'flex',
            gap: { xs: 1, sm: 1.5 },
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <IconButton
              component={Link}
              href={contactData?.facebook || 'https://facebook.com/happyjasmine'}
              target="_blank"
              sx={{
                width: { xs: 44, sm: 48 },
                height: { xs: 44, sm: 48 },
                bgcolor: 'rgba(24, 119, 242, 0.1)',
                color: '#1877F2',
                borderRadius: '12px',
                '&:hover': {
                  bgcolor: '#1877F2',
                  color: 'white',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <Facebook sx={{ fontSize: { xs: 22, sm: 24 } }} />
            </IconButton>
            <IconButton
              component={Link}
              href={contactData?.instagram || 'https://instagram.com/happyjasmine'}
              target="_blank"
              sx={{
                width: { xs: 44, sm: 48 },
                height: { xs: 44, sm: 48 },
                bgcolor: 'rgba(225, 48, 108, 0.1)',
                color: '#E1306C',
                borderRadius: '12px',
                '&:hover': {
                  bgcolor: '#E1306C',
                  color: 'white',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <Instagram sx={{ fontSize: { xs: 22, sm: 24 } }} />
            </IconButton>
            <IconButton
              component={Link}
              href={`https://wa.me/${contactData?.whatsapp || '1234567890'}`}
              target="_blank"
              sx={{
                width: { xs: 44, sm: 48 },
                height: { xs: 44, sm: 48 },
                bgcolor: 'rgba(37, 211, 102, 0.1)',
                color: '#25D366',
                borderRadius: '12px',
                '&:hover': {
                  bgcolor: '#25D366',
                  color: 'white',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <WhatsApp sx={{ fontSize: { xs: 22, sm: 24 } }} />
            </IconButton>
            <IconButton
              component={Link}
              href={contactData?.tiktok || 'https://tiktok.com/@happyjasmine'}
              target="_blank"
              sx={{
                width: { xs: 44, sm: 48 },
                height: { xs: 44, sm: 48 },
                bgcolor: 'rgba(0, 0, 0, 0.1)',
                color: '#000000',
                borderRadius: '12px',
                '&:hover': {
                  bgcolor: '#000000',
                  color: 'white',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <TikTokIcon sx={{ fontSize: { xs: 22, sm: 24 } }} />
            </IconButton>
            <IconButton
              component={Link}
              href={contactData?.youtube || 'https://youtube.com/happyjasmine'}
              target="_blank"
              sx={{
                width: { xs: 44, sm: 48 },
                height: { xs: 44, sm: 48 },
                bgcolor: 'rgba(255, 0, 0, 0.1)',
                color: '#FF0000',
                borderRadius: '12px',
                '&:hover': {
                  bgcolor: '#FF0000',
                  color: 'white',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <YouTubeIcon sx={{ fontSize: { xs: 22, sm: 24 } }} />
            </IconButton>
          </Box>

          {/* Contact Info */}
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 1.5, sm: 2 },
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              p: { xs: 1, sm: 1.5 },
              borderRadius: '8px',
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.08)',
                transform: 'translateY(-1px)',
                boxShadow: '0 3px 8px rgba(0, 0, 0, 0.12)',
              }
            }}>
              <Phone sx={{ fontSize: { xs: 18, sm: 20 }, color: '#FFE347', flexShrink: 0 }} />
              <Typography variant="body2" sx={{ opacity: 0.95, fontSize: { xs: '0.8rem', sm: '0.85rem' } }}>
                {contactData?.phone || '+1 (555) 123-4567'}
              </Typography>
            </Box>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              p: { xs: 1, sm: 1.5 },
              borderRadius: '8px',
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.08)',
                transform: 'translateY(-1px)',
                boxShadow: '0 3px 8px rgba(0, 0, 0, 0.12)',
              }
            }}>
              <Email sx={{ fontSize: { xs: 18, sm: 20 }, color: '#FFE347', flexShrink: 0 }} />
              <Typography variant="body2" sx={{ opacity: 0.95, fontSize: { xs: '0.8rem', sm: '0.85rem' } }}>
                {contactData?.email || 'hello@happyjasmine.com'}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Copyright */}
        <Box sx={{
          textAlign: 'center',
          mt: { xs: 3, sm: 4 },
          pt: { xs: 2, sm: 3 },
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <Typography
            variant="body2"
            sx={{
              opacity: 0.8,
              fontSize: { xs: '0.75rem', sm: '0.8rem' },
              letterSpacing: '0.02em',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
            }}
          >
            © 2024 Happy Jasmine. Seluruh hak cipta dilindungi.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}