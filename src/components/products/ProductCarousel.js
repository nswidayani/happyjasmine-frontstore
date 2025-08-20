import { Box, IconButton, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import ProductCard from './ProductCard';

export default function ProductCarousel({ products, currentIndex, onPrev, onNext, onGoTo }) {
  if (!products || products.length === 0) return null;

  // Calculate the three products to show
  const getVisibleProducts = () => {
    const prevIndex = (currentIndex - 1 + products.length) % products.length;
    const nextIndex = (currentIndex + 1) % products.length;
    
    return [
      { product: products[prevIndex], variant: 'compact', isFocused: false },
      { product: products[currentIndex], variant: 'focused', isFocused: true },
      { product: products[nextIndex], variant: 'compact', isFocused: false }
    ];
  };

  const visibleProducts = getVisibleProducts();

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      {/* Navigation Arrows */}
      <IconButton
        onClick={onPrev}
        sx={{
          position: 'absolute',
          left: { xs: 5, sm: 10, md: -25 },
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'background.paper',
          color: 'primary.main',
          border: '2px solid',
          borderColor: 'primary.main',
          zIndex: 10,
          width: { xs: 36, sm: 40, md: 44 },
          height: { xs: 36, sm: 40, md: 44 },
          '&:hover': { 
            bgcolor: 'primary.main', 
            color: 'white',
            transform: 'translateY(-50%) scale(1.1)'
          },
          transition: 'all 0.2s ease-in-out',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}
      >
        <ChevronLeft />
      </IconButton>

      <IconButton
        onClick={onNext}
        sx={{
          position: 'absolute',
          right: { xs: 5, sm: 10, md: -25 },
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'background.paper',
          color: 'primary.main',
          border: '2px solid',
          borderColor: 'primary.main',
          zIndex: 10,
          width: { xs: 36, sm: 40, md: 44 },
          height: { xs: 36, sm: 40, md: 44 },
          '&:hover': { 
            bgcolor: 'primary.main', 
            color: 'white',
            transform: 'translateY(-50%) scale(1.1)'
          },
          transition: 'all 0.2s ease-in-out',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}
      >
        <ChevronRight />
      </IconButton>

      {/* Mobile View: Single Product Slider */}
      <Box sx={{ 
        display: { xs: 'block', md: 'none' },
        textAlign: 'center',
        py: { xs: 2, sm: 3 }
      }}>
        <ProductCard 
          product={products[currentIndex]} 
          variant="default"
          isFocused={false}
        />
      </Box>

      {/* Desktop/Tablet View: 3-Product Carousel */}
      <Box sx={{ 
        display: { xs: 'none', md: 'flex' },
        justifyContent: 'center', 
        alignItems: 'center',
        gap: { md: 3, lg: 4 },
        px: { md: 3, lg: 4 },
        py: { md: 4 }
      }}>
        {visibleProducts.map((item, index) => (
          <Box
            key={`${item.product.id}-${index}`}
            sx={{
              flex: index === 1 ? '1 1 auto' : '0 0 auto',
              maxWidth: index === 1 
                ? { md: '500px', lg: '600px' }
                : { md: '280px', lg: '320px' },
              width: '100%',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: index === 1 
                ? 'scale(1)' 
                : { md: 'scale(0.8)', lg: 'scale(0.85)' },
              opacity: index === 1 ? 1 : { md: 0.7, lg: 0.7 },
              filter: index === 1 ? 'none' : 'brightness(0.85) saturate(0.9)',
              '&:hover': {
                transform: index === 1 
                  ? 'scale(1.02)' 
                  : { md: 'scale(0.85)', lg: 'scale(0.9)' },
                opacity: index === 1 ? 1 : { md: 0.9, lg: 0.9 },
                filter: index === 1 ? 'none' : 'brightness(0.9) saturate(1)'
              }
            }}
          >
            <ProductCard 
              product={item.product} 
              variant={item.variant} 
              isFocused={item.isFocused} 
            />
          </Box>
        ))}
      </Box>

      {/* Dots Indicator */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: { xs: 0.5, sm: 1 }, 
        mt: { xs: 2, sm: 3, md: 4 } 
      }}>
        {products.map((_, index) => (
          <Box
            key={index}
            onClick={() => onGoTo(index)}
            sx={{
              width: index === currentIndex 
                ? { xs: 14, sm: 16 } 
                : { xs: 10, sm: 12 },
              height: index === currentIndex 
                ? { xs: 14, sm: 16 } 
                : { xs: 10, sm: 12 },
              borderRadius: '50%',
              bgcolor: index === currentIndex ? 'primary.main' : 'rgba(0, 95, 115, 0.2)',
              cursor: 'pointer',
              transition: 'all 0.3s ease-in-out',
              '&:hover': { 
                bgcolor: index === currentIndex ? 'primary.dark' : 'rgba(0, 95, 115, 0.4)',
                transform: 'scale(1.2)'
              }
            }}
          />
        ))}
      </Box>

      {/* Slide Counter */}
      <Typography 
        variant="body2" 
        sx={{ 
          textAlign: 'center', 
          color: 'text.secondary', 
          mt: { xs: 1, sm: 2 },
          fontSize: { xs: '0.8rem', sm: '0.9rem' },
          fontWeight: 500
        }}
      >
        {currentIndex + 1} of {products.length}
      </Typography>
    </Box>
  );
}
