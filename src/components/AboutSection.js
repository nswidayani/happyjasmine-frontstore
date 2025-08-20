import { Box, Typography, Container, Grid, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

export default function AboutSection({ aboutData }) {
  return (
    <Box 
      sx={{ 
        py: { xs: 12, md: 20 },
        bgcolor: 'secondary.main',
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
          top: '15%',
          left: '10%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--primary-light) 0%, transparent 70%)',
          opacity: 0.02,
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '15%',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
          opacity: 0.02,
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ pr: { md: 4 } }}>
              <Typography
                variant="overline"
                sx={{
                  color: 'primary.main',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  mb: 2,
                  display: 'block',
                  fontSize: '0.875rem',
                }}
              >
                About Us
              </Typography>
              
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  mb: 4,
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem', lg: '4rem' },
                  fontWeight: 700,
                  color: 'primary.main',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  mb: 2,
                  display: 'block',
                }}
              >
                {aboutData?.title || 'About Our Company'}
              </Typography>
              
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1.1rem', md: '1.2rem' },
                  lineHeight: 1.8,
                  color: 'var(--muted)',
                  mb: 4,
                  fontWeight: 400,
                }}
              >
                {aboutData?.description || 'We are a leading technology company dedicated to providing innovative solutions that help businesses grow and succeed in the digital age.'}
              </Typography>
              
              {/* <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    bgcolor: 'var(--primary)',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    borderRadius: '50px',
                    fontWeight: 600,
                    boxShadow: 'var(--shadow-md)',
                    '&:hover': {
                      bgcolor: 'var(--primary-dark)',
                      transform: 'translateY(-2px)',
                      boxShadow: 'var(--shadow-lg)',
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  Learn More
                </Button>
                
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'var(--border)',
                    color: 'var(--foreground)',
                    px: 4,
                    py: 1.5,
                    borderRadius: '50px',
                    fontWeight: 500,
                    '&:hover': {
                      borderColor: 'var(--primary)',
                      bgcolor: 'var(--primary)',
                      color: 'white',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  Contact Us
                </Button>
              </Box> */}
            </Box>
          </Grid>
          
          {/* <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '-20px',
                  left: '-20px',
                  right: '20px',
                  bottom: '20px',
                  background: 'var(--gradient-primary)',
                  borderRadius: '24px',
                  zIndex: 0,
                  opacity: 0.1,
                }
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: { xs: '300px', md: '450px' },
                  borderRadius: '20px',
                  background: 'var(--gradient-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 1,
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                  }
                }}
              >
                <Box
                  sx={{
                    textAlign: 'center',
                    color: 'white',
                    zIndex: 2,
                    position: 'relative',
                  }}
                >
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 600, 
                      mb: 1,
                      textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    }}
                  >
                    Innovation
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      opacity: 0.9,
                      textShadow: '0 1px 5px rgba(0,0,0,0.1)',
                    }}
                  >
                    Driving the future forward
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid> */}
        </Grid>
      </Container>
    </Box>
  );
}
