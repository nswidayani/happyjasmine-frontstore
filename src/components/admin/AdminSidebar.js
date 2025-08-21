import { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Web as WebIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/admin',
    description: 'Overview and analytics'
  },
  {
    text: 'Landing Page',
    icon: <WebIcon />,
    path: '/admin/landing-page',
    description: 'Content and properties'
  },
  {
    text: 'Settings',
    icon: <SettingsIcon />,
    path: '/admin/settings',
    description: 'Configuration and preferences'
  }
];

export default function AdminSidebar({ open, onClose, currentPath }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();

  const drawerWidth = 280;

  const handleNavigation = (path) => {
    if (isMobile) {
      onClose();
    }
  };

  const drawerContent = (
    <Box sx={{ width: drawerWidth, height: '100%' }}>
      {/* Header */}
      <Box sx={{ 
        p: 3, 
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WebIcon sx={{ color: 'primary.main', fontSize: 28 }} />
          <Box>
            <Box sx={{ fontWeight: 700, fontSize: '1.1rem', color: 'primary.main' }}>
              Admin Panel
            </Box>
            <Box sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
              Happy Jasmine
            </Box>
          </Box>
        </Box>
        {isMobile && (
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      {/* Navigation Menu */}
      <List sx={{ px: 2, py: 1 }}>
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
              <Link href={item.path} style={{ textDecoration: 'none', width: '100%' }}>
                <ListItemButton
                  sx={{
                    borderRadius: 2,
                    bgcolor: isActive ? 'primary.main' : 'transparent',
                    color: isActive ? 'primary.contrastText' : 'text.primary',
                    '&:hover': {
                      bgcolor: isActive ? 'primary.dark' : 'action.hover',
                    },
                    transition: 'all 0.2s ease-in-out',
                    py: 2
                  }}
                >
                  <ListItemIcon sx={{ 
                    color: isActive ? 'primary.contrastText' : 'primary.main',
                    minWidth: 40
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text}
                    secondary={item.description}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 600 : 500,
                      fontSize: '0.95rem'
                    }}
                    secondaryTypographyProps={{
                      fontSize: '0.75rem',
                      color: isActive ? 'rgba(255,255,255,0.7)' : 'text.secondary'
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* User Info */}
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Box sx={{ fontSize: '0.8rem', color: 'text.secondary', mb: 1 }}>
          Logged in as Admin
        </Box>
        <Box sx={{ fontSize: '0.7rem', color: 'text.disabled' }}>
          Happy Jasmine Admin Panel
        </Box>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}
