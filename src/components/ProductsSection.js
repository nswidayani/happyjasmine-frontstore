'use client';

import { Box, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import { useTheme } from './ThemeProvider';

const ProductsSection = ({ products = [] }) => {
  const { theme } = useTheme();

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

  const displayProducts = products.length > 0 ? products : defaultProducts;

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
        <Box sx={{ textAlign: 'center', mb: 6 }}>
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
            Discover our premium collection of high-quality products designed to meet your needs
          </Typography>
        </Box>

        {/* Products Grid */}
        <Grid container spacing={4}>
          {displayProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  bgcolor: 'background.paper',
                  border: `2px solid transparent`,
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 25px rgba(0, 95, 115, 0.15)',
                    borderColor: 'secondary.main',
                  }
                }}
              >
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.name}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '400px',
                    aspectRatio: 'auto',
                    objectFit: 'contain',
                    borderBottom: `1px solid ${theme.palette.divider}`
                  }}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    p: 3
                  }}
                >
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      color: 'primary.main',
                      mb: 1,
                      fontWeight: 600
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.primary',
                      mb: 2,
                      flexGrow: 1,
                      lineHeight: 1.6
                    }}
                  >
                    {product.description}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mt: 'auto'
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'secondary.main',
                        fontWeight: 700,
                        fontSize: '1.25rem'
                      }}
                    >
                      {product.price}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: 'primary.main',
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'primary.dark',
                        },
                        px: 3,
                        py: 1
                      }}
                    >
                      Learn More
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

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
