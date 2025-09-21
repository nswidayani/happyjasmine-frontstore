import { useEffect } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';
import ImageSlider from './ImageSlider';
import Link from 'next/link';

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
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(0, 95, 115, 0.1) 0%, rgba(255, 227, 71, 0.1) 100%)',
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
          {/* Dark overlay to make video darker */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              zIndex: 1,
            }}
          />
        </>
      )}

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 4, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem', lg: '5rem' },
                fontWeight: 900,
                mb: { xs: 1.5, md: 2 },
                textShadow: '0 6px 30px rgba(0,0,0,0.4)',
                background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              {heroData?.title || 'Selamat Datang'}
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Typography
              variant="h5"
              component="p"
              sx={{
                fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                mb: { xs: 3, md: 4 },
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              component={heroData?.buttonUrl ? Link : 'button'}
              href={heroData?.buttonUrl || '#'}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: { xs: 3, md: 5 },
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: 600,
                borderRadius: '50px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                '&:hover': {
                  bgcolor: 'grey.50',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
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
              component={heroData?.secondButtonUrl ? Link : 'button'}
              href={heroData?.secondButtonUrl || '#'}
              sx={{
                borderColor: 'rgba(255, 255, 255, 0.3)',
                color: 'white',
                px: { xs: 3, md: 5 },
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: 500,
                borderRadius: '50px',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                minWidth: { xs: '140px', md: '180px' },
              }}
            >
              {heroData?.secondButtonText || 'Pelajari Lebih Lanjut'}
            </Button>
          </Box>
          </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
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
      </motion.div>

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
