'use client';

import { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Button, CircularProgress, Alert, IconButton } from '@mui/material';
import { Refresh, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useTheme } from './ThemeProvider';
import { getContent } from '../lib/firebase';

const ProductsSection = ({ products: propProducts = [] }) => {
  const { theme } = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Default products if none provided
  const defaultProducts = [
    {
      id: 1,
      name: 'Product 1',
      description: 'High-quality product with excellent features',
      image: '/products/WhatsApp Image 2025-08-18 at 16.45.48.jpeg',
      price: '$99.99'
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Premium product designed for modern needs',
      image: '/products/WhatsApp Image 2025-08-18 at 16.42.28 (2).jpeg',
      price: '$149.99'
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Innovative solution for everyday challenges',
      image: '/products/WhatsApp Image 2025-08-18 at 16.42.28 (1).jpeg',
      price: '$79.99'
    },
    {
      id: 4,
      name: 'Product 4',
      description: 'Reliable product built to last',
      image: '/products/WhatsApp Image 2025-08-18 at 16.42.28.jpeg',
      price: '$129.99'
    },
    {
      id: 5,
      name: 'Product 5',
      description: 'Cutting-edge technology for the future',
      image: '/products/WhatsApp Image 2025-08-18 at 16.42.27.jpeg',
      price: '$199.99'
    }
  ];

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('Fetching products...', { propProducts: propProducts.length });
      
      // If products are passed as props, use them
      if (propProducts.length > 0) {
        console.log('Using products from props');
        setProducts(propProducts);
        setLoading(false);
        return;
      }

      // Otherwise, fetch from Firebase
      console.log('Fetching from Firebase...');
      const result = await getContent();
      console.log('Firebase result:', result);
      
      if (result.success && result.data.products) {
        console.log('Setting products from Firebase:', result.data.products);
        setProducts(result.data.products);
      } else {
        // Fallback to default products if Firebase fetch fails
        console.log('Using default products');
        setProducts(defaultProducts);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setError('Failed to load products');
      setProducts(defaultProducts);
    } finally {
      setLoading(false);
    }
  }, [propProducts]);

  const displayProducts = products.length > 0 ? products : defaultProducts;

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Set client flag to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Auto-advance slider - only on client side
  useEffect(() => {
    if (!isClient) return; // Wait for client hydration
    if (displayProducts.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % displayProducts.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [displayProducts.length, isClient]);

  // Show a simple loading state during SSR to prevent hydration mismatch
  if (!isClient) {
    return (
      <Box
        sx={{
          py: 8,
          bgcolor: 'background.default',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography variant="h4" color="text.secondary">
          Loading...
        </Typography>
      </Box>
    );
  }

  const handleRefresh = () => {
    fetchProducts();
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % displayProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + displayProducts.length) % displayProducts.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Show loading state - only show on client to prevent hydration mismatch
  if (loading && isClient) {
    return (
      <Box
        sx={{
          py: 8,
          bgcolor: 'background.default',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <CircularProgress size={60} sx={{ color: 'primary.main', mb: 3 }} />
        <Typography variant="h6" color="text.secondary">
          Loading products...
        </Typography>
      </Box>
    );
  }

  // Show error state - only show on client to prevent hydration mismatch
  if (error && isClient) {
    return (
      <Box
        sx={{
          py: 8,
          bgcolor: 'background.default',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Alert severity="error" sx={{ mb: 3, maxWidth: 600 }}>
          {error}
        </Alert>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Showing default products
        </Typography>
        <Button
          variant="outlined"
          onClick={handleRefresh}
          sx={{ color: 'primary.main', borderColor: 'primary.main' }}
        >
          Try Again
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        py: 8,
        bgcolor: 'background.default',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <Box sx={{ maxWidth: 'lg', mx: 'auto', px: 3 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 6, position: 'relative' }}>
          {isClient && (
            <IconButton
              onClick={handleRefresh}
              sx={{
                position: 'absolute',
                right: 0,
                top: 0,
                color: 'primary.main',
                '&:hover': {
                  transform: 'rotate(180deg)',
                  transition: 'transform 0.3s ease-in-out'
                }
              }}
            >
              <Refresh />
            </IconButton>
          )}
          <Typography
            variant="h2"
            sx={{
              color: 'primary.main',
              mb: 2,
              fontWeight: 700
            }}
          >
            Our Products
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            Discover our premium collection of {displayProducts.length} high-quality products designed to meet your needs
          </Typography>
        </Box>

        {/* Products Slider */}
        {displayProducts.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              No products available at the moment
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Check back soon for our latest products!
            </Typography>
            <Button
              variant="outlined"
              onClick={handleRefresh}
              sx={{ color: 'primary.main', borderColor: 'primary.main' }}
            >
              Try Again
            </Button>
          </Box>
        ) : (
          <Box sx={{ position: 'relative', mb: 6 }}>
            {/* Navigation Arrows - only show on client */}
            {isClient && (
              <>
                <IconButton
                  onClick={prevSlide}
                  sx={{
                    position: 'absolute',
                    left: -20,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'background.paper',
                    color: 'primary.main',
                    border: '2px solid',
                    borderColor: 'primary.main',
                    zIndex: 2,
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'white',
                    },
                    '@media (max-width: 600px)': {
                      left: 10,
                    }
                  }}
                >
                  <ChevronLeft />
                </IconButton>

                <IconButton
                  onClick={nextSlide}
                  sx={{
                    position: 'absolute',
                    right: -20,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'background.paper',
                    color: 'primary.main',
                    border: '2px solid',
                    borderColor: 'primary.main',
                    zIndex: 2,
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'white',
                    },
                    '@media (max-width: 600px)': {
                      right: 10,
                    }
                  }}
                >
                  <ChevronRight />
                </IconButton>
              </>
            )}

            {/* Current Product Card */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card
                sx={{
                  maxWidth: 600,
                  width: '100%',
                  transition: 'all 0.3s ease-in-out',
                  bgcolor: 'background.paper',
                  border: '2px solid transparent',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0, 95, 115, 0.15)',
                    borderColor: 'secondary.main',
                  }
                }}
              >
                <CardMedia
                  component="img"
                  image={displayProducts[currentSlide]?.image}
                  alt={displayProducts[currentSlide]?.name}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '400px',
                    aspectRatio: 'auto',
                    objectFit: 'contain',
                    borderBottom: `1px solid ${theme.palette.divider}`
                  }}
                />
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Typography
                    variant="h4"
                    component="h3"
                    sx={{
                      color: 'primary.main',
                      mb: 2,
                      fontWeight: 600
                    }}
                  >
                    {displayProducts[currentSlide]?.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.primary',
                      mb: 3,
                      lineHeight: 1.6,
                      fontSize: '1.1rem'
                    }}
                  >
                    {displayProducts[currentSlide]?.description}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: 2
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        color: 'secondary.main',
                        fontWeight: 700,
                        fontSize: '1.5rem'
                      }}
                    >
                      {displayProducts[currentSlide]?.price}
                    </Typography>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        bgcolor: 'primary.main',
                        color: 'white',
                        px: 4,
                        py: 1.5,
                        '&:hover': {
                          bgcolor: 'primary.dark',
                        },
                      }}
                    >
                      Learn More
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            {/* Slide Indicators - only show on client */}
            {isClient && (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 1 }}>
                  {displayProducts.map((_, index) => (
                    <Box
                      key={index}
                      onClick={() => goToSlide(index)}
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        bgcolor: index === currentSlide ? 'primary.main' : 'rgba(0, 95, 115, 0.2)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          bgcolor: index === currentSlide ? 'primary.dark' : 'rgba(0, 95, 115, 0.4)',
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
                    mt: 2
                  }}
                >
                  {currentSlide + 1} of {displayProducts.length}
                </Typography>
              </>
            )}
          </Box>
        )}

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'secondary.main',
              color: 'primary.main',
              px: 4,
              py: 2,
              fontSize: '1.1rem',
              fontWeight: 600,
              '&:hover': {
                bgcolor: 'secondary.dark',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.3s ease-in-out'
            }}
          >
            View All Products
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductsSection;
