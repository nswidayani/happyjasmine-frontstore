'use client';

import { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { useTheme } from './ThemeProvider';
import { getContent } from '../lib/supabase';
import ProductsHeader from './products/ProductsHeader';
import ProductCarousel from './products/ProductCarousel';
import ProductCard from './products/ProductCard';

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
      image: '/products/WhatsApp Image 2025-08-18 at 16.42.28.jpeg',
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
    if (displayProducts.length <= 3) return; // Don't auto-advance if only 3 or fewer products
    
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

  const handleRefresh = () => { fetchProducts(); };

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
          bgcolor: 'primary.main',
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
        <ProductsHeader count={displayProducts.length} onRefresh={handleRefresh} showRefresh={isClient} />

        {/* Products Carousel */}
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
            {isClient && displayProducts.length > 3 && (
              <ProductCarousel
                products={displayProducts}
                currentIndex={currentSlide}
                onPrev={prevSlide}
                onNext={nextSlide}
                onGoTo={goToSlide}
              />
            )}
            {/* Fallback for 3 or fewer products - show them all */}
            {isClient && displayProducts.length <= 3 && (
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: 4, 
                flexWrap: 'wrap',
                py: 4
              }}>
                {displayProducts.map((product, index) => (
                  <Box key={product.id} sx={{ 
                    flex: index === 1 ? '1 1 auto' : '0 0 auto',
                    maxWidth: index === 1 ? '600px' : '400px'
                  }}>
                    <ProductCard 
                      product={product} 
                      variant={index === 1 ? 'focused' : 'compact'}
                      isFocused={index === 1}
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )}

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'primary.main',
              color: 'secondary.main',
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
            Jelajah Semua Rasa
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductsSection;
