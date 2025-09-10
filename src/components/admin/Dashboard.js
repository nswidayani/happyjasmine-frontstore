import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardHeader,
  Avatar
} from '@mui/material';
import {
  Web as WebIcon,
  Edit as EditIcon,
  Settings as SettingsIcon,
  TrendingUp as TrendingIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { getVisitCount, supabase } from '../../lib/supabase';

export default function Dashboard() {
  const [visitCount, setVisitCount] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchVisitCount = async () => {
      try {
        const result = await getVisitCount('landing');
        if (result.success) {
          setVisitCount(result.count);
        }
      } catch (error) {
        console.error('Failed to fetch visit count:', error);
      }
    };

    fetchVisitCount();

    // Set up real-time subscription for visit count updates
    const subscription = supabase
      .channel('visit_counts_changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'visit_counts',
          filter: 'page_type=eq.landing'
        },
        (payload) => {
          console.log('Visit count updated:', payload);
          setIsUpdating(true);
          setVisitCount(payload.new.visit_count);
          // Reset updating state after a brief delay
          setTimeout(() => setIsUpdating(false), 1000);
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const stats = [
    {
      title: 'Landing Page',
      value: 'Active',
      description: 'Your landing page is live and accessible',
      icon: <WebIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      color: 'primary.main'
    },
    {
      title: 'Page Visits',
      value: visitCount.toLocaleString(),
      description: 'Total visits to your landing page (real-time)',
      icon: <VisibilityIcon sx={{ fontSize: 40, color: 'info.main' }} />,
      color: 'info.main'
    },
    {
      title: 'Content Sections',
      value: '5',
      description: 'Hero, Features, Products, About, Contact',
      icon: <EditIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
      color: 'secondary.main'
    },
    {
      title: 'Products',
      value: '5',
      description: 'Active products in your catalog',
      icon: <TrendingIcon sx={{ fontSize: 40, color: 'success.main' }} />,
      color: 'success.main'
    },
    {
      title: 'Settings',
      value: 'Configured',
      description: 'Admin panel is fully set up',
      icon: <SettingsIcon sx={{ fontSize: 40, color: 'info.main' }} />,
      color: 'info.main'
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      {/* Welcome Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" sx={{ mb: 2, color: 'primary.main', fontWeight: 700 }}>
          Welcome to Admin Panel
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Manage your Happy Jasmine landing page content and settings from one central location.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                },
                ...(stat.title === 'Page Visits' && isUpdating && {
                  animation: 'pulse 1s ease-in-out',
                  '@keyframes pulse': {
                    '0%': { boxShadow: '0 0 0 0 rgba(25, 118, 210, 0.4)' },
                    '50%': { boxShadow: '0 0 0 8px rgba(25, 118, 210, 0)' },
                    '100%': { boxShadow: '0 0 0 0 rgba(25, 118, 210, 0)' }
                  }
                })
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: `${stat.color}20`, 
                    color: stat.color,
                    width: 60,
                    height: 60,
                    mr: 2
                  }}
                >
                  {stat.icon}
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.title}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {stat.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box 
                component="button"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 2,
                  border: '1px solid',
                  borderColor: 'primary.main',
                  borderRadius: 2,
                  bgcolor: 'transparent',
                  color: 'primary.main',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: 'white'
                  }
                }}
                onClick={() => window.location.href = '/admin/landing-page'}
              >
                <EditIcon />
                <Box textAlign="left">
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Edit Landing Page
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Modify content, images, and layout
                  </Typography>
                </Box>
              </Box>
              
              <Box 
                component="button"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 2,
                  border: '1px solid',
                  borderColor: 'secondary.main',
                  borderRadius: 2,
                  bgcolor: 'transparent',
                  color: 'secondary.main',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    bgcolor: 'secondary.main',
                    color: 'white'
                  }
                }}
                onClick={() => window.location.href = '/admin/settings'}
              >
                <SettingsIcon />
                <Box textAlign="left">
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Configure Settings
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Manage admin preferences
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
              Recent Activity
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                  Last Updated
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Landing page content
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Ready for review and publishing
                </Typography>
              </Box>
              
              <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                  System Status
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: 'success.main' }}>
                  All systems operational
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Admin panel running smoothly
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
