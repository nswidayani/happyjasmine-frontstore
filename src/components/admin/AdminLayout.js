import { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Menu as MenuIcon,
  ViewInAr as ViewIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AdminSidebar from './AdminSidebar';
import { signOutUser } from '../../lib/supabase';

export default function AdminLayout({ children, onLogout }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await signOutUser();
      onLogout();
    } catch (error) {
      console.error('Logout error:', error);
      onLogout();
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getPageTitle = () => {
    if (pathname === '/admin') return 'Dashboard';
    if (pathname === '/admin/landing-page') return 'Landing Page Properties';
    if (pathname === '/admin/settings') return 'Settings';
    return 'Admin Panel';
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <AdminSidebar 
        open={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top App Bar */}
        <AppBar 
          position="sticky" 
          sx={{ 
            bgcolor: 'background.paper',
            color: 'text.primary',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            zIndex: theme.zIndex.drawer + 1
          }}
        >
          <Toolbar sx={{ 
            px: { xs: 1, sm: 2, md: 3 },
            py: { xs: 1, md: 1.5 },
            flexWrap: 'wrap',
            gap: { xs: 1, sm: 2 }
          }}>
            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleSidebar}
                sx={{ 
                  mr: { xs: 1, sm: 2 },
                  color: 'primary.main'
                }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Logo */}
            <Link href="/" style={{ textDecoration: 'none', marginRight: '16px' }}>
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
                  width={isMobile ? 50 : 60}
                  height={isMobile ? 25 : 30}
                  style={{
                    height: 'auto',
                    maxWidth: '100%',
                    filter: 'invert(0.3)'
                  }}
                  priority
                />
              </Box>
            </Link>

            {/* Page Title */}
            <Typography 
              variant={isMobile ? "subtitle1" : "h6"}
              sx={{ 
                flexGrow: 1,
                color: 'primary.main',
                fontWeight: 600,
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                minWidth: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {getPageTitle()}
            </Typography>

            {/* Action Buttons */}
            <Box sx={{ 
              display: 'flex', 
              gap: { xs: 0.5, sm: 1 },
              flexWrap: 'wrap',
              alignItems: 'center'
            }}>
              <Button 
                color="inherit" 
                href="/" 
                startIcon={<ViewIcon />}
                sx={{ 
                  color: 'primary.main',
                  borderColor: 'primary.main',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  px: { xs: 1.5, sm: 2 },
                  py: { xs: 0.5, sm: 1 },
                  minWidth: { xs: 'auto', sm: 'auto' },
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: 'white'
                  }
                }}
                variant="outlined"
                size={isMobile ? "small" : "medium"}
              >
                {isMobile ? 'View' : 'View Site'}
              </Button>
              <Button 
                color="inherit" 
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                sx={{ 
                  color: 'error.main',
                  borderColor: 'error.main',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  px: { xs: 1.5, sm: 2 },
                  py: { xs: 0.5, sm: 1 },
                  minWidth: { xs: 'auto', sm: 'auto' },
                  '&:hover': {
                    bgcolor: 'error.main',
                    color: 'white'
                  }
                }}
                variant="outlined"
                size={isMobile ? "small" : "medium"}
              >
                {isMobile ? 'Logout' : 'Logout'}
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1,
            bgcolor: 'background.default',
            minHeight: 'calc(100vh - 64px)',
            p: { xs: 1, sm: 2, md: 3 },
            width: '100%',
            overflow: 'hidden'
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
