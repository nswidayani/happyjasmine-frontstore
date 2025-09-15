import { useEffect } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import ImageSlider from './ImageSlider';

export default function HeroSection({ heroData }) {
  console.log('HeroSection received heroData:', heroData);
  console.log('Background video URL:', heroData?.backgroundVideo);

  // Test video URL accessibility
  useEffect(() => {
    if (heroData?.backgroundVideo) {
      fetch(heroData.backgroundVideo, { method: 'HEAD' })
        .then(response => {
          console.log('Video URL accessible:', response.ok, response.status);
        })
        .catch(error => {
          console.error('Video URL not accessible:', error);
        });
    }
  }, [heroData?.backgroundVideo]);

  // If image slider data exists, use the slider
  // if (heroData?.imageSlider && heroData.imageSlider.length > 0) {
  //   return <ImageSlider slides={heroData.imageSlider} />;
  // }

  // Fallback to static hero section
  return (
    <Box
      id="hero"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        overflow: 'hidden',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(0, 95, 115, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 227, 71, 0.2) 0%, transparent 50%)',
          zIndex: 3,
        }
      }}
    >
      {/* Video Background */}
      {heroData?.backgroundVideo && (
        <>
          <Box
            component="video"
            autoPlay
            muted
            loop
            playsInline
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
              backgroundColor: 'black', // Fallback background
            }}
            onLoadStart={() => console.log('Video load started:', heroData.backgroundVideo)}
            onLoadedData={() => console.log('Video loaded successfully:', heroData.backgroundVideo)}
            onError={(e) => {
              console.error('Video failed to load:', heroData.backgroundVideo, e);
              e.target.style.display = 'none';
            }}
            onCanPlay={() => console.log('Video can play:', heroData.backgroundVideo)}
          >
            <source src={heroData.backgroundVideo} type="video/mp4" />
            <source src={heroData.backgroundVideo} type="video/webm" />
            <source src={heroData.backgroundVideo} type="video/ogg" />
            Your browser does not support the video tag.
          </Box>
          {/* Debug indicator */}
          <Box
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: 'white',
              padding: '5px 10px',
              borderRadius: '4px',
              fontSize: '12px',
              zIndex: 10,
            }}
          >
            Video: {heroData.backgroundVideo ? 'Set' : 'Not Set'}
          </Box>
        </>
      )}
      {/* Floating geometric shapes */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          animation: 'float 6s ease-in-out infinite',
          zIndex: 3,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.08)',
          animation: 'float 8s ease-in-out infinite reverse',
          zIndex: 3,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '20%',
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.06)',
          animation: 'float 7s ease-in-out infinite',
          zIndex: 3,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 4 }}>
        <Box 
          textAlign="center"
          sx={{
            maxWidth: '900px',
            mx: 'auto',
            mb: 4,
            px: { xs: 3, md: 5 },
            py: { xs: 4, md: 6 },
            background: 'linear-gradient(135deg, rgba(0, 95, 115, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%)',
            borderRadius: '24px',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem', lg: '5rem' },
              fontWeight: 900,
              mb: { xs: 2, md: 3 },
              textShadow: '0 6px 30px rgba(0,0,0,0.4)',
              background: 'linear-gradient(135deg, #ffffff 0%, #d0d0d0 50%, rgba(0, 95, 115, 0.3) 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            {heroData?.title || 'Selamat Datang'}
          </Typography>

          <Typography
            variant="h5"
            component="p"
            sx={{
              fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
              mb: { xs: 4, md: 6 },
              opacity: 1,
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.6,
              fontWeight: 400,
              color: 'white',
              textShadow: '0 4px 20px rgba(0,0,0,0.6)',
            }}
          >
            {heroData?.subtitle || 'Transformasikan bisnis Anda dengan solusi inovatif kami'}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: { xs: 3, md: 5 },
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: 600,
                borderRadius: '50px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                '&:hover': {
                  bgcolor: 'grey.50',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                minWidth: { xs: '140px', md: '180px' },
              }}
            >
              {heroData?.buttonText || 'Mulai'}
            </Button>

            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'rgba(255, 255, 255, 0.3)',
                color: 'white',
                px: { xs: 3, md: 5 },
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: 500,
                borderRadius: '50px',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                minWidth: { xs: '140px', md: '180px' },
              }}
            >
              Pelajari Lebih Lanjut
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Scroll indicator */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 4,
          animation: 'bounce 2s infinite',
        }}
      >
        <Box
          sx={{
            width: 2,
            height: 30,
            background: 'rgba(255, 255, 255, 0.6)',
            borderRadius: 1,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 6,
              height: 6,
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '50%',
            }
          }}
        />
      </Box>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }
      `}</style>
    </Box>
  );
}
