import { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
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
        position: 'relative',
        height: { xs: '50vh', md: '60vh', lg: '70vh' },
        minHeight: { xs: 350, md: 450, lg: 550 },
        overflow: 'hidden',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Fullwidth Background Image */}
      {currentCampaign.image && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${currentCampaign.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 30%, rgba(0, 0, 0, 0.2) 70%, rgba(0, 0, 0, 0.5) 100%)',
              zIndex: 1,
            }
          }}
        />
      )}

      {/* Overlay Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          textAlign: 'center',
          px: { xs: 2, md: 4 },
          pb: { xs: 10, md: 12 },
          color: 'white',
        }}
      >
        {/* Campaign Title */}
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontSize: { xs: '2rem', sm: '2.8rem', md: '4rem', lg: '4.5rem' },
            fontWeight: 900,
            mb: { xs: 2.5, md: 3.5 },
            lineHeight: 1.05,
            color: 'white',
            textShadow: '0 3px 15px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.6), 2px 2px 4px rgba(0,0,0,0.5)',
            letterSpacing: '-0.02em',
            maxWidth: { xs: '95%', sm: '85%', md: '900px', lg: '1000px' },
            mx: 'auto',
            px: { xs: 2, md: 3 },
          }}
        >
          {currentCampaign.title || 'Campaign Title'}
        </Typography>

        {/* Campaign Subtitle */}
        <Typography
          variant="h5"
          component="p"
          sx={{
            fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.6rem', lg: '1.8rem' },
            mb: { xs: 4, md: 5 },
            maxWidth: '700px',
            lineHeight: 1.5,
            fontWeight: 400,
            color: 'rgba(255, 255, 255, 0.95)',
            mx: 'auto',
            textShadow: '0 2px 8px rgba(0,0,0,0.7), 1px 1px 3px rgba(0,0,0,0.5)',
            px: { xs: 2, md: 3 },
          }}
        >
          {currentCampaign.subtitle || 'Campaign description will appear here'}
        </Typography>

        {/* CTA Button */}
        {currentCampaign.buttonUrl ? (
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            href={currentCampaign.buttonUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              px: { xs: 4, md: 6 },
              py: { xs: 1.5, md: 2 },
              borderRadius: '50px',
              fontSize: { xs: '1rem', md: '1.2rem' },
              fontWeight: 700,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4), 0 2px 6px rgba(0, 0, 0, 0.3)',
              '&:hover': {
                bgcolor: 'primary.dark',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5), 0 3px 8px rgba(0, 0, 0, 0.4)',
              },
              transition: 'all 0.3s ease',
              minWidth: { xs: '180px', md: '220px' },
            }}
          >
            {currentCampaign.buttonText || 'Learn More'}
          </Button>
        ) : (
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              px: { xs: 4, md: 6 },
              py: { xs: 1.5, md: 2 },
              borderRadius: '50px',
              fontSize: { xs: '1rem', md: '1.2rem' },
              fontWeight: 700,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4), 0 2px 6px rgba(0, 0, 0, 0.3)',
              '&:hover': {
                bgcolor: 'primary.dark',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5), 0 3px 8px rgba(0, 0, 0, 0.4)',
              },
              transition: 'all 0.3s ease',
              minWidth: { xs: '180px', md: '220px' },
            }}
          >
            {currentCampaign.buttonText || 'Learn More'}
          </Button>
        )}
      </Box>


      {/* Side Navigation Arrows */}
      {campaigns.length > 1 && (
        <>
          <Box
            onClick={() => setCurrentIndex(currentIndex === 0 ? campaigns.length - 1 : currentIndex - 1)}
            sx={{
              position: 'absolute',
              left: { xs: 15, md: 30 },
              bottom: { xs: 150, md: 180 },
              zIndex: 3,
              width: { xs: 55, md: 70 },
              height: { xs: 55, md: 70 },
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(255, 255, 255, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '2px solid rgba(255, 255, 255, 0.5)',
                transform: 'scale(1.15)',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.5)',
              },
              '&:active': {
                transform: 'scale(1.05)',
              }
            }}
          >
            <Typography variant="h4" sx={{ color: 'white', fontSize: { xs: '1.8rem', md: '2.2rem' }, fontWeight: 'bold', lineHeight: 1 }}>
              ‹
            </Typography>
          </Box>

          <Box
            onClick={() => setCurrentIndex(currentIndex === campaigns.length - 1 ? 0 : currentIndex + 1)}
            sx={{
              position: 'absolute',
              right: { xs: 15, md: 30 },
              bottom: { xs: 150, md: 180 },
              zIndex: 3,
              width: { xs: 55, md: 70 },
              height: { xs: 55, md: 70 },
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(255, 255, 255, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '2px solid rgba(255, 255, 255, 0.5)',
                transform: 'scale(1.15)',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.5)',
              },
              '&:active': {
                transform: 'scale(1.05)',
              }
            }}
          >
            <Typography variant="h4" sx={{ color: 'white', fontSize: { xs: '1.8rem', md: '2.2rem' }, fontWeight: 'bold', lineHeight: 1 }}>
              ›
            </Typography>
          </Box>
        </>
      )}


      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

      `}</style>
    </Box>
  );
}