import { Box, Typography, Container, Grid, Card, CardContent, Button } from '@mui/material';
import { Email, Phone, LocationOn, Send } from '@mui/icons-material';

export default function ContactSection({ contactData }) {
  return (
    <Box 
      sx={{ 
        py: { xs: 12, md: 20 },
        bgcolor: 'var(--background)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, var(--border) 50%, transparent 100%)',
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
          background: 'radial-gradient(circle, var(--primary-light) 0%, transparent 70%)',
          opacity: 0.02,
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
          background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
          opacity: 0.02,
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
              background: 'var(--gradient-primary)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
            }}
          >
            {contactData?.title || 'Get in Touch'}
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              color: 'var(--muted)',
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
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '20px',
                boxShadow: 'var(--shadow-sm)',
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
                  background: 'var(--gradient-primary)',
                  transform: 'scaleX(0)',
                  transition: 'transform 0.3s ease',
                },
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 'var(--shadow-xl)',
                  borderColor: 'var(--primary-light)',
                  '&::before': {
                    transform: 'scaleX(1)',
                  },
                  '& .icon-wrapper': {
                    transform: 'scale(1.1)',
                    background: 'var(--gradient-primary)',
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
                    background: 'var(--card-hover)',
                    mb: 3,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <Email 
                    className="icon"
                    sx={{ 
                      fontSize: 32, 
                      color: 'var(--primary)',
                      transition: 'all 0.3s ease',
                    }} 
                  />
                </Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'var(--foreground)' }}>
                  Email
                </Typography>
                <Typography variant="body1" color="var(--muted)" sx={{ mb: 2, fontWeight: 400 }}>
                  {contactData?.email || 'hello@company.com'}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: 'var(--border)',
                    color: 'var(--primary)',
                    borderRadius: '20px',
                    px: 2,
                    '&:hover': {
                      borderColor: 'var(--primary)',
                      bgcolor: 'var(--primary)',
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
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '20px',
                boxShadow: 'var(--shadow-sm)',
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
                  background: 'var(--gradient-accent)',
                  transform: 'scaleX(0)',
                  transition: 'transform 0.3s ease',
                },
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 'var(--shadow-xl)',
                  borderColor: 'var(--primary-light)',
                  '&::before': {
                    transform: 'scaleX(1)',
                  },
                  '& .icon-wrapper': {
                    transform: 'scale(1.1)',
                    background: 'var(--gradient-accent)',
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
                    background: 'var(--card-hover)',
                    mb: 3,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <Phone 
                    className="icon"
                    sx={{ 
                      fontSize: 32, 
                      color: 'var(--primary)',
                      transition: 'all 0.3s ease',
                    }} 
                  />
                </Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'var(--foreground)' }}>
                  Phone
                </Typography>
                <Typography variant="body1" color="var(--muted)" sx={{ mb: 2, fontWeight: 400 }}>
                  {contactData?.phone || '+1 (555) 123-4567'}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: 'var(--border)',
                    color: 'var(--primary)',
                    borderRadius: '20px',
                    px: 2,
                    '&:hover': {
                      borderColor: 'var(--primary)',
                      bgcolor: 'var(--primary)',
                      color: 'white',
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
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '20px',
                boxShadow: 'var(--shadow-sm)',
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
                  background: 'var(--gradient-secondary)',
                  transform: 'scaleX(0)',
                  transition: 'transform 0.3s ease',
                },
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 'var(--shadow-xl)',
                  borderColor: 'var(--primary-light)',
                  '&::before': {
                    transform: 'scaleX(1)',
                  },
                  '& .icon-wrapper': {
                    transform: 'scale(1.1)',
                    background: 'var(--gradient-secondary)',
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
                    background: 'var(--card-hover)',
                    mb: 3,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <LocationOn 
                    className="icon"
                    sx={{ 
                      fontSize: 32, 
                      color: 'var(--primary)',
                      transition: 'all 0.3s ease',
                    }} 
                  />
                </Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'var(--foreground)' }}>
                  Address
                </Typography>
                <Typography variant="body1" color="var(--muted)" sx={{ mb: 2, fontWeight: 400, lineHeight: 1.6 }}>
                  {contactData?.address || '123 Business St, City, State 12345'}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: 'var(--border)',
                    color: 'var(--primary)',
                    borderRadius: '20px',
                    px: 2,
                    '&:hover': {
                      borderColor: 'var(--primary)',
                      bgcolor: 'var(--primary)',
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

        {/* Contact Form Section */}
        <Box 
          sx={{ 
            maxWidth: '600px', 
            mx: 'auto',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, color: 'var(--foreground)' }}>
            Send us a Message
          </Typography>
          
          <Box
            sx={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '20px',
              p: 4,
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<Send />}
              sx={{
                bgcolor: 'var(--primary)',
                color: 'white',
                px: 6,
                py: 2,
                borderRadius: '50px',
                fontWeight: 600,
                fontSize: '1.1rem',
                boxShadow: 'var(--shadow-md)',
                '&:hover': {
                  bgcolor: 'var(--primary-dark)',
                  transform: 'translateY(-2px)',
                  boxShadow: 'var(--shadow-lg)',
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
