import { useState } from 'react';
import { AppBar, Toolbar, Box, Button, IconButton, Container } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import FullPageMenu from './FullPageMenu';

export default function Header({ logo = '/logo.svg' }) {
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
                  src={logo}
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
                  color: 'primary.main',
                  '&:hover': {
                    transform: 'scale(1.25)'
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                <MenuIcon sx={{ fontSize: 40 }} />
                MENU
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Full Page Menu */}
      <FullPageMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
