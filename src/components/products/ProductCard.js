import { Card, CardMedia, CardContent, Typography, Box, Button } from '@mui/material';
import { useTheme as useAppTheme } from '../ThemeProvider';

export default function ProductCard({ product }) {
  const { theme } = useAppTheme();
  if (!product) return null;
  return (
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
      <CardContent sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h3" sx={{ color: 'primary.main', mb: 2, fontWeight: 600 }}>
          {product.name}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.primary', mb: 3, lineHeight: 1.6, fontSize: '1.1rem' }}>
          {product.description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h5" sx={{ color: 'secondary.main', fontWeight: 700, fontSize: '1.5rem' }}>
            {product.price}
          </Typography>
          <Button variant="contained" size="large" sx={{ bgcolor: 'primary.main', color: 'white', px: 4, py: 1.5, '&:hover': { bgcolor: 'primary.dark' } }}>
            Learn More
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}


