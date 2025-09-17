import { Box, Typography, Grid, Card, CardContent, CardMedia, Chip, Container } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function ProductGrid({
  products,
  selectedCategory,
  categories,
  sidebarWidth = 280
}) {
  const router = useRouter();
  return (
    <Box sx={{ mb: 4 }}>
      {/* Filter indicator */}
      {selectedCategory && (
        <Box sx={{ mb: 2, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#666' }}>
            Showing: {categories.find(cat => cat.id === selectedCategory)?.name || 'Category'}
          </Typography>
        </Box>
      )}

      {/* Simple grid */}
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              sx={{
                cursor: 'pointer',
                border: '1px solid #ddd',
                borderRadius: 1,
                overflow: 'hidden',
                transition: 'box-shadow 0.2s',
                '&:hover': {
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }
              }}
              onClick={() => router.push(`/products/${product.id}`)}
            >
              {/* Image */}
              <Box sx={{ height: 200, bgcolor: '#f5f5f5' }}>
                {product.images && product.images.length > 0 ? (
                  <CardMedia
                    component="img"
                    height="100%"
                    image={product.images[0]}
                    alt={product.title}
                    sx={{ objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = '/placeholder.jpg';
                    }}
                  />
                ) : (
                  <Box sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#999'
                  }}>
                    <Typography variant="body2">No Image</Typography>
                  </Box>
                )}
              </Box>

              {/* Content */}
              <CardContent sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ fontSize: '0.8rem', mb: 1, fontWeight: 300 }}>
                  {product.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* No products */}
      {products.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1" sx={{ color: '#666' }}>
            No products found
          </Typography>
        </Box>
      )}
    </Box>
  );
}