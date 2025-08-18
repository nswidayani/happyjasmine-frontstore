import { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Container, Button } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

export default function ImageSlider({ slides = [] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: 'var(--gradient-primary)',
      }}
    >
      {slides.map((slide, index) => (
        <Box
          key={slide.id}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: index === currentSlide ? 1 : 0,
            transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.8) 0%, rgba(139, 92, 246, 0.8) 100%)',
              zIndex: 1,
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
              zIndex: 2,
            }
          }}
        >
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
            <Box
              textAlign="center"
              sx={{
                maxWidth: '900px',
                mx: 'auto',
                px: { xs: 2, md: 4 },
              }}
            >
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem', lg: '5rem' },
                  fontWeight: 800,
                  mb: { xs: 2, md: 3 },
                  textShadow: '0 4px 20px rgba(0,0,0,0.2)',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  opacity: 0,
                  animation: index === currentSlide ? 'slideInUp 0.8s ease-out 0.2s forwards' : 'none',
                }}
              >
                {slide.title}
              </Typography>
              
              <Typography
                variant="h5"
                component="p"
                sx={{
                  fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                  mb: { xs: 4, md: 6 },
                  opacity: 0.95,
                  maxWidth: '700px',
                  mx: 'auto',
                  lineHeight: 1.6,
                  fontWeight: 400,
                  color: 'rgba(255, 255, 255, 0.9)',
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                  opacity: 0,
                  animation: index === currentSlide ? 'slideInUp 0.8s ease-out 0.4s forwards' : 'none',
                }}
              >
                {slide.subtitle}
              </Typography>
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  justifyContent: 'center', 
                  flexWrap: 'wrap',
                  opacity: 0,
                  animation: index === currentSlide ? 'slideInUp 0.8s ease-out 0.6s forwards' : 'none',
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: 'white',
                    color: 'var(--primary)',
                    px: { xs: 3, md: 5 },
                    py: { xs: 1.5, md: 2 },
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    fontWeight: 600,
                    borderRadius: '50px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                    '&:hover': {
                      bgcolor: 'grey.50',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    minWidth: { xs: '140px', md: '180px' },
                  }}
                >
                  Get Started
                </Button>
                
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.4)',
                    color: 'white',
                    px: { xs: 3, md: 5 },
                    py: { xs: 1.5, md: 2 },
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    fontWeight: 500,
                    borderRadius: '50px',
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255, 255, 255, 0.15)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    minWidth: { xs: '140px', md: '180px' },
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      ))}

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <IconButton
            onClick={prevSlide}
            sx={{
              position: 'absolute',
              left: { xs: 10, md: 30 },
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              width: { xs: 48, md: 56 },
              height: { xs: 48, md: 56 },
              zIndex: 4,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                transform: 'translateY(-50%) scale(1.1)',
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <ChevronLeft sx={{ fontSize: { xs: 24, md: 28 } }} />
          </IconButton>
          
          <IconButton
            onClick={nextSlide}
            sx={{
              position: 'absolute',
              right: { xs: 10, md: 30 },
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              width: { xs: 48, md: 56 },
              height: { xs: 48, md: 56 },
              zIndex: 4,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                transform: 'translateY(-50%) scale(1.1)',
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <ChevronRight sx={{ fontSize: { xs: 24, md: 28 } }} />
          </IconButton>
        </>
      )}

      {/* Dots Indicator */}
      {slides.length > 1 && (
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: 20, md: 40 },
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1.5,
            zIndex: 4,
          }}
        >
          {slides.map((_, index) => (
            <Box
              key={index}
              onClick={() => goToSlide(index)}
              sx={{
                width: { xs: 10, md: 12 },
                height: { xs: 10, md: 12 },
                borderRadius: '50%',
                backgroundColor: index === currentSlide ? 'white' : 'rgba(255,255,255,0.4)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                border: '2px solid transparent',
                '&:hover': {
                  backgroundColor: 'white',
                  transform: 'scale(1.3)',
                  borderColor: 'rgba(255,255,255,0.6)',
                },
              }}
            />
          ))}
        </Box>
      )}

      {/* Scroll indicator */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 4,
          animation: 'bounce 2s infinite',
          display: { xs: 'none', md: 'block' },
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
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
