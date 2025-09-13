import { Box, Typography, Container, Grid, Link, IconButton, Divider } from '@mui/material';
import { Facebook, Instagram, WhatsApp, Phone, Email, LocationOn } from '@mui/icons-material';

export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        py: 6,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Happy Jasmine
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
              Premium Teh Tarik & Happy Tea experience with authentic Malaysian flavors.
              Discover the perfect blend of tradition and taste.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                component={Link}
                href="https://facebook.com/happyjasmine"
                target="_blank"
                sx={{ color: 'primary.contrastText', '&:hover': { color: 'secondary.main' } }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                component={Link}
                href="https://instagram.com/happyjasmine"
                target="_blank"
                sx={{ color: 'primary.contrastText', '&:hover': { color: 'secondary.main' } }}
              >
                <Instagram />
              </IconButton>
              <IconButton
                component={Link}
                href="https://wa.me/1234567890"
                target="_blank"
                sx={{ color: 'primary.contrastText', '&:hover': { color: 'secondary.main' } }}
              >
                <WhatsApp />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" sx={{ color: 'primary.contrastText', textDecoration: 'none', '&:hover': { color: 'secondary.main' } }}>
                Home
              </Link>
              <Link href="/products" sx={{ color: 'primary.contrastText', textDecoration: 'none', '&:hover': { color: 'secondary.main' } }}>
                Products
              </Link>
              <Link href="/about" sx={{ color: 'primary.contrastText', textDecoration: 'none', '&:hover': { color: 'secondary.main' } }}>
                About Us
              </Link>
              <Link href="/contact" sx={{ color: 'primary.contrastText', textDecoration: 'none', '&:hover': { color: 'secondary.main' } }}>
                Contact
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Contact Info
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn sx={{ fontSize: 20 }} />
                <Typography variant="body2">
                  123 Business St, City, State 12345
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ fontSize: 20 }} />
                <Typography variant="body2">
                  +1 (555) 123-4567
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ fontSize: 20 }} />
                <Typography variant="body2">
                  hello@happyjasmine.com
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, bgcolor: 'rgba(255, 255, 255, 0.2)' }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            © 2024 Happy Jasmine. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.8rem', opacity: 0.8 }}>
            Made with ❤️ for authentic Malaysian tea lovers
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}