import { Box, Typography, Container, Grid, Link, IconButton, Divider } from '@mui/material';
import { Facebook, Instagram, WhatsApp, Phone, Email, LocationOn } from '@mui/icons-material';

export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        py: 4,
        mt: 0,
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
              Pengalaman Teh Tarik Premium & Teh Bahagia dengan rasa Malaysia asli.
              Temukan perpaduan sempurna antara tradisi dan cita rasa.
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
              Tautan Cepat
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" sx={{ color: 'primary.contrastText', textDecoration: 'none', '&:hover': { color: 'secondary.main' } }}>
                Beranda
              </Link>
              <Link href="/products" sx={{ color: 'primary.contrastText', textDecoration: 'none', '&:hover': { color: 'secondary.main' } }}>
                Produk
              </Link>
              <Link href="/about" sx={{ color: 'primary.contrastText', textDecoration: 'none', '&:hover': { color: 'secondary.main' } }}>
                Tentang Kami
              </Link>
              <Link href="/contact" sx={{ color: 'primary.contrastText', textDecoration: 'none', '&:hover': { color: 'secondary.main' } }}>
                Kontak
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Info Kontak
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
            © 2024 Happy Jasmine. Seluruh hak cipta dilindungi.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}