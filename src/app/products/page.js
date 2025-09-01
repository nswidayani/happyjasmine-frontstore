'use client';

import { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia } from '@mui/material';
import Header from '../../components/Header';
import ProductDetail from '../../components/products/ProductDetail';
import { getProducts } from '../../lib/supabase';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const result = await getProducts();
    if (result.success) {
      setProducts(result.data);
    }
    setLoading(false);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetail = () => {
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <>
        <Header />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h4" align="center">Loading products...</Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" align="center" gutterBottom sx={{ mb: 4, color: 'primary.main' }}>
          Our Products
        </Typography>

        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 3
                  }
                }}
                onClick={() => handleProductClick(product)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.thumbnail || (product.images && product.images.length > 0 ? product.images[0] : '/placeholder.jpg')}
                  alt={product.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description ? product.description.substring(0, 100) + '...' : 'No description available'}
                  </Typography>
                  {product.het_price && (
                    <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                      HET: {product.het_price}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {products.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No products available at the moment.
            </Typography>
          </Box>
        )}

        {/* Product Detail Modal/Dialog */}
        <ProductDetail
          product={selectedProduct}
          open={!!selectedProduct}
          onClose={handleCloseDetail}
        />
      </Container>
    </>
  );
}
