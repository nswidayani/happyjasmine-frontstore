import { useState } from 'react';
import { AppBar, Toolbar, Box, Button, IconButton, Container } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import FullPageMenu from './FullPageMenu';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <AppBar 
        position="sticky" 
        sx={{ 
          bgcolor: 'secondary.main',
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

            {/* Menu Toggle Button */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <IconButton
                onClick={toggleMenu}
                sx={{
                  color: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    transform: 'scale(1.05)'
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                <MenuIcon sx={{ fontSize: 24 }} />
              </IconButton>
              
              <Button 
                variant="contained"
                href="/admin"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'secondary.main',
                  px: 3,
                  py: 1,
                  borderRadius: '25px',
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: 'primary.dark',
                    transform: 'translateY(-1px)',
                    color: 'secondary.main',
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

      {/* Full Page Menu */}
      <FullPageMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
