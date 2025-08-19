import { AppBar, Toolbar, Box, Button, Container } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        bgcolor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 20px rgba(0, 95, 115, 0.1)',
        borderBottom: '1px solid rgba(0, 95, 115, 0.05)'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
            >
              <Image
                src="/logo.svg"
                alt="Happy Jasmine"
                width={120}
                height={60}
                style={{
                  height: 'auto',
                  maxWidth: '100%'
                }}
                priority
              />
            </Box>
          </Link>

          {/* Navigation */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button 
              color="primary" 
              sx={{ 
                fontWeight: 500,
                color: 'text.primary',
                '&:hover': {
                  bgcolor: 'rgba(0, 95, 115, 0.1)'
                }
              }}
            >
              Home
            </Button>
            <Button 
              color="primary" 
              sx={{ 
                fontWeight: 500,
                color: 'text.primary',
                '&:hover': {
                  bgcolor: 'rgba(0, 95, 115, 0.1)'
                }
              }}
            >
              About
            </Button>
            <Button 
              color="primary" 
              sx={{ 
                fontWeight: 500,
                color: 'text.primary',
                '&:hover': {
                  bgcolor: 'rgba(0, 95, 115, 0.1)'
                }
              }}
            >
              Contact
            </Button>
            <Button 
              variant="contained"
              href="/admin"
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                px: 3,
                py: 1,
                borderRadius: '25px',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: 'primary.dark',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 20px rgba(0, 95, 115, 0.3)'
                },
                transition: 'all 0.2s ease'
              }}
            >
              Admin
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
