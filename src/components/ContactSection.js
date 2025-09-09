import { Box, Typography, Container, Grid, Card, CardContent, Button, Divider } from '@mui/material';
import { Email, Phone, LocationOn, Send, Map as MapIcon } from '@mui/icons-material';
import { useTheme } from './ThemeProvider';
import LocationsMap from './LocationsMap';

export default function ContactSection({ contactData }) {
  const { theme } = useTheme();
  
  return (
    <Box 
      sx={{ 
        py: { xs: 12, md: 20 },
        bgcolor: 'background.default',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(0, 95, 115, 0.2) 50%, transparent 100%)',
        }
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: 250,
          height: 250,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 95, 115, 0.1) 0%, transparent 70%)',
          opacity: 0.1,
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '10%',
          width: 180,
          height: 180,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 227, 71, 0.1) 0%, transparent 70%)',
          opacity: 0.1,
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box textAlign="center" sx={{ mb: { xs: 8, md: 12 } }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              mb: 3,
              fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem', lg: '4rem' },
              fontWeight: 700,
              color: 'primary.main',
              letterSpacing: '-0.02em',
            }}
          >
            {contactData?.title || 'Get in Touch'}
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            {contactData?.description || 'Ready to get started? Contact us today!'}
          </Typography>
        </Box>
        
        <Grid container spacing={6} justifyContent="center" sx={{ mb: 8 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card 
              className="card"
              sx={{
                textAlign: 'center',
                height: '100%',
                background: 'background.paper',
                border: '1px solid rgba(0, 95, 115, 0.2)',
                borderRadius: '20px',
                boxShadow: '0 4px 6px rgba(0, 95, 115, 0.1)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'primary.main',
                  transform: 'scaleX(0)',
                  transition: 'transform 0.3s ease',
                },
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 8px 25px rgba(0, 95, 115, 0.15)',
                  borderColor: 'primary.main',
                  '&::before': {
                    transform: 'scaleX(1)',
                  },
                  '& .icon-wrapper': {
                    transform: 'scale(1.1)',
                    background: 'primary.main',
                  },
                  '& .icon': {
                    color: 'white',
                  }
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box 
                  className="icon-wrapper"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 70,
                    height: 70,
                    borderRadius: '18px',
                    background: 'rgba(0, 95, 115, 0.1)',
                    mb: 3,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <Email 
                    className="icon"
                    sx={{ 
                      fontSize: 32, 
                      color: 'primary.main',
                      transition: 'all 0.3s ease',
                    }} 
                  />
                </Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                  Email
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2, fontWeight: 400 }}>
                  {contactData?.email || 'hello@company.com'}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: 'rgba(0, 95, 115, 0.2)',
                    color: 'primary.main',
                    borderRadius: '20px',
                    px: 2,
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'primary.main',
                      color: 'white',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  Send Email
                </Button>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Card 
              className="card"
              sx={{
                textAlign: 'center',
                height: '100%',
                background: 'background.paper',
                border: '1px solid rgba(0, 95, 115, 0.2)',
                borderRadius: '20px',
                boxShadow: '0 4px 6px rgba(0, 95, 115, 0.1)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'secondary.main',
                  transform: 'scaleX(0)',
                  transition: 'transform 0.3s ease',
                },
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 8px 25px rgba(0, 95, 115, 0.15)',
                  borderColor: 'secondary.main',
                  '&::before': {
                    transform: 'scaleX(1)',
                  },
                  '& .icon-wrapper': {
                    transform: 'scale(1.1)',
                    background: 'secondary.main',
                  },
                  '& .icon': {
                    color: 'primary.main',
                  }
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box 
                  className="icon-wrapper"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 70,
                    height: 70,
                    borderRadius: '18px',
                    background: 'rgba(255, 227, 71, 0.1)',
                    mb: 3,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <Phone 
                    className="icon"
                    sx={{ 
                      fontSize: 32, 
                      color: 'secondary.main',
                      transition: 'all 0.3s ease',
                    }} 
                  />
                </Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                  Phone
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2, fontWeight: 400 }}>
                  {contactData?.phone || '+1 (555) 123-4567'}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: 'rgba(0, 95, 115, 0.2)',
                    color: 'secondary.main',
                    borderRadius: '20px',
                    px: 2,
                    '&:hover': {
                      borderColor: 'secondary.main',
                      bgcolor: 'secondary.main',
                      color: 'primary.main',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  Call Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Card 
              className="card"
              sx={{
                textAlign: 'center',
                height: '100%',
                background: 'background.paper',
                border: '1px solid rgba(0, 95, 115, 0.2)',
                borderRadius: '20px',
                boxShadow: '0 4px 6px rgba(0, 95, 115, 0.1)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'warning.main',
                  transform: 'scaleX(0)',
                  transition: 'transform 0.3s ease',
                },
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 8px 25px rgba(0, 95, 115, 0.15)',
                  borderColor: 'warning.main',
                  '&::before': {
                    transform: 'scaleX(1)',
                  },
                  '& .icon-wrapper': {
                    transform: 'scale(1.1)',
                    background: 'warning.main',
                  },
                  '& .icon': {
                    color: 'white',
                  }
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box 
                  className="icon-wrapper"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 70,
                    height: 70,
                    borderRadius: '18px',
                    background: 'rgba(255, 144, 173, 0.1)',
                    mb: 3,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <LocationOn 
                    className="icon"
                    sx={{ 
                      fontSize: 32, 
                      color: 'warning.main',
                      transition: 'all 0.3s ease',
                    }} 
                  />
                </Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                  Address
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2, fontWeight: 400, lineHeight: 1.6 }}>
                  {contactData?.address || '123 Business St, City, State 12345'}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: 'rgba(0, 95, 115, 0.2)',
                    color: 'warning.main',
                    borderRadius: '20px',
                    px: 2,
                    '&:hover': {
                      borderColor: 'warning.main',
                      bgcolor: 'warning.main',
                      color: 'white',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  Get Directions
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

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
                color: 'primary.main',
                letterSpacing: '-0.02em',
              }}
            >
              Find Us
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '1rem', md: '1.2rem' },
                color: 'text.secondary',
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              Discover our business locations across the region
            </Typography>
          </Box>

          <LocationsMap />
        </Box>

        {/* Contact Form Section */}
        <Box 
          sx={{ 
            maxWidth: '600px', 
            mx: 'auto',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, color: 'text.primary' }}>
            Send us a Message
          </Typography>
          
          <Box
            sx={{
              background: 'background.paper',
              border: '1px solid rgba(0, 95, 115, 0.2)',
              borderRadius: '20px',
              p: 4,
              boxShadow: '0 4px 6px rgba(0, 95, 115, 0.1)',
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<Send />}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                px: 6,
                py: 2,
                borderRadius: '50px',
                fontWeight: 600,
                fontSize: '1.1rem',
                boxShadow: '0 4px 12px rgba(0, 95, 115, 0.2)',
                '&:hover': {
                  bgcolor: 'primary.dark',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(0, 95, 115, 0.3)',
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              Start Conversation
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
