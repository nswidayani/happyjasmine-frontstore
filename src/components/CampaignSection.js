import { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

export default function CampaignSection({ campaigns = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === campaigns.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change campaign every 5 seconds

    return () => clearInterval(timer);
  }, [campaigns.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('campaigns');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  if (!campaigns || campaigns.length === 0) {
    return null;
  }

  const currentCampaign = campaigns[currentIndex];

  return (
    <Box
      id="campaigns"
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(0, 95, 115, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 227, 71, 0.05) 0%, transparent 50%)',
          zIndex: 0,
        }
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 95, 115, 0.1) 0%, transparent 70%)',
          animation: 'float 8s ease-in-out infinite',
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 227, 71, 0.1) 0%, transparent 70%)',
          animation: 'float 6s ease-in-out infinite reverse',
          zIndex: 1,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
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
            Our Campaigns
          </Typography>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
              fontWeight: 700,
              color: 'primary.main',
              mb: 3,
            }}
          >
            Featured Promotions
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1.1rem', md: '1.2rem' },
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Discover our latest campaigns and special offers designed to bring you the best value
          </Typography>
        </Box>

        {/* Campaign Display */}
        <Box
          sx={{
            maxWidth: '800px',
            mx: 'auto',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <Card
            sx={{
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0, 95, 115, 0.15)',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(0, 95, 115, 0.1) 0%, rgba(255, 227, 71, 0.1) 100%)',
                zIndex: 1,
              }
            }}
          >
            {currentCampaign.image && (
              <CardMedia
                component="img"
                image={currentCampaign.image}
                alt={currentCampaign.title || 'Campaign'}
                sx={{
                  height: { xs: 250, md: 350 },
                  objectFit: 'cover',
                  position: 'relative',
                  zIndex: 2,
                }}
              />
            )}
            <CardContent
              sx={{
                p: { xs: 3, md: 4 },
                position: 'relative',
                zIndex: 2,
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Typography
                variant="h4"
                component="h3"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: 'primary.main',
                  fontSize: { xs: '1.5rem', md: '2rem' },
                }}
              >
                {currentCampaign.title || 'Campaign Title'}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  mb: 3,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.6,
                }}
              >
                {currentCampaign.subtitle || 'Campaign description will appear here'}
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3 }}>
                {campaigns.map((_, index) => (
                  <Box
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: index === currentIndex ? 'primary.main' : 'rgba(0, 95, 115, 0.3)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: index === currentIndex ? 'primary.main' : 'rgba(0, 95, 115, 0.5)',
                        transform: 'scale(1.2)',
                      }
                    }}
                  />
                ))}
              </Box>

              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  borderRadius: '50px',
                  fontWeight: 600,
                  boxShadow: '0 8px 25px rgba(0, 95, 115, 0.3)',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 35px rgba(0, 95, 115, 0.4)',
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                Learn More
              </Button>
            </CardContent>
          </Card>
        </Box>

        {/* Campaign Grid for smaller screens or additional campaigns */}
        {campaigns.length > 1 && (
          <Box sx={{ mt: 6 }}>
            <Grid container spacing={3}>
              {campaigns.slice(0, 3).map((campaign, index) => (
                <Grid item xs={12} sm={6} md={4} key={campaign.id}>
                  <Card
                    onClick={() => setCurrentIndex(index)}
                    sx={{
                      borderRadius: '16px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: index === currentIndex
                        ? '0 15px 35px rgba(0, 95, 115, 0.2)'
                        : '0 5px 15px rgba(0, 95, 115, 0.1)',
                      border: index === currentIndex ? '2px solid' : 'none',
                      borderColor: 'primary.main',
                      transform: index === currentIndex ? 'scale(1.02)' : 'scale(1)',
                      '&:hover': {
                        transform: 'translateY(-5px) scale(1.02)',
                        boxShadow: '0 15px 35px rgba(0, 95, 115, 0.2)',
                      }
                    }}
                  >
                    {campaign.image && (
                      <CardMedia
                        component="img"
                        image={campaign.image}
                        alt={campaign.title || 'Campaign'}
                        sx={{
                          height: 180,
                          objectFit: 'cover',
                        }}
                      />
                    )}
                    <CardContent sx={{ p: 2, textAlign: 'center' }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: 'primary.main',
                          mb: 1,
                        }}
                      >
                        {campaign.title || 'Campaign'}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          fontSize: '0.9rem',
                        }}
                      >
                        {campaign.subtitle || 'Click to view details'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </Box>
  );
}