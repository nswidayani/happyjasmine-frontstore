import { Card, CardMedia, CardContent, Typography, Box, Button } from '@mui/material';
import { useTheme as useAppTheme } from '../ThemeProvider';

export default function ProductCard({ product, variant = 'default', isFocused = false }) {
  const { theme } = useAppTheme();
  if (!product) return null;

  // Size variants for different display modes
  const sizeVariants = {
    default: {
      maxWidth: 600,
      imageHeight: 'auto',
      maxImageHeight: '400px',
      titleVariant: 'h4',
      descriptionFontSize: '1.1rem',
      priceFontSize: '1.3rem',
      buttonSize: 'large',
      padding: 4
    },
    focused: {
      maxWidth: { xs: '280px', sm: '400px', md: '500px', lg: '600px' },
      imageHeight: 'auto',
      maxImageHeight: { xs: '200px', sm: '280px', md: '350px', lg: '400px' },
      titleVariant: 'h4',
      descriptionFontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem', lg: '1.2rem' },
      priceFontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem', lg: '1.8rem' },
      buttonSize: 'large',
      padding: { xs: 2, sm: 3, md: 4, lg: 5 }
    },
    compact: {
      maxWidth: { xs: '180px', sm: '220px', md: '280px', lg: '320px' },
      imageHeight: 'auto',
      maxImageHeight: { xs: '120px', sm: '150px', md: '180px', lg: '200px' },
      titleVariant: 'h6',
      descriptionFontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.9rem', lg: '1rem' },
      priceFontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem', lg: '1.3rem' },
      buttonSize: 'small',
      padding: { xs: 1.5, sm: 2, md: 2.5, lg: 3 }
    }
  };

  const size = sizeVariants[variant] || sizeVariants.default;

  return (
    <Card
      sx={{
        maxWidth: size.maxWidth,
        width: '100%',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        bgcolor: 'primary.main',
        border: isFocused ? '3px solid' : '2px solid transparent',
        borderColor: isFocused ? 'secondary.main' : 'transparent',
        transform: isFocused ? 'scale(1.05)' : 'scale(1)',
        boxShadow: isFocused
          ? '0 12px 40px rgba(0, 95, 115, 0.25)'
          : '0 4px 20px rgba(0, 95, 115, 0.1)',
        '&:hover': {
          transform: isFocused ? 'scale(1.08)' : 'translateY(-4px)',
          boxShadow: isFocused
            ? '0 16px 50px rgba(0, 95, 115, 0.3)'
            : '0 8px 25px rgba(0, 95, 115, 0.15)',
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
          height: size.imageHeight,
          maxHeight: size.maxImageHeight,
          aspectRatio: 'auto',
          borderRadius: '20px',
          objectFit: 'contain',
          borderBottom: `1px solid ${theme.palette.divider}`,
          transition: 'all 0.3s ease-in-out'
        }}
      />
      <CardContent sx={{ p: size.padding, textAlign: 'center' }}>
        <Typography
          variant={size.titleVariant}
          component="h3"
          sx={{
            color: 'secondary.main',
            mb: 2,
            fontWeight: 600,
            fontSize: isFocused ? { xs: '1.5rem', sm: '1.8rem', md: '2rem', lg: '2.2rem' } : undefined
          }}
        >
          {product.name}
        </Typography>
        {/*<Typography*/}
        {/*  variant="body1"*/}
        {/*  sx={{*/}
        {/*    color: 'secondary.main',*/}
        {/*    mb: 3,*/}
        {/*    lineHeight: 1.6,*/}
        {/*    fontSize: size.descriptionFontSize*/}
        {/*  }}*/}
        {/*>*/}
        {/*  {product.description}*/}
        {/*</Typography>*/}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Typography
            variant="h5"
            sx={{
              color: 'secondary.main',
              fontWeight: 700,
              fontSize: size.priceFontSize
            }}
          >
            {product.price}
          </Typography>
          <Button
            variant="contained"
            size={size.buttonSize}
            sx={{
              bgcolor: 'secondary.main',
              color: 'primary.main',
              fontWeight: 700,
              px: isFocused ? { xs: 3, sm: 4, md: 5 } : { xs: 2, sm: 3, md: 4 },
              py: isFocused ? { xs: 1.5, sm: 2 } : { xs: 1, sm: 1.5 },
              '&:hover': {
                bgcolor: 'seconday.dark',
                transform: 'scale(1.05)'
              },
              transition: 'all 0.2s ease-in-out'
            }}
          >
            Detail
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}


