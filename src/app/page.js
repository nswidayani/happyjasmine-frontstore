'use client';

import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '../components/ThemeProvider';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';

export default function Home() {
  const { updateTheme } = useTheme();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content');
      const data = await response.json();
      setContent(data);
      
      // Apply theme from content if available
      if (data.theme) {
        updateTheme({
          mode: data.theme.mode || 'light',
          primaryColor: data.theme.primaryColor || '#1976d2',
          secondaryColor: data.theme.secondaryColor || '#dc004e',
        });
      }
    } catch (error) {
      console.error('Failed to fetch content:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
      >
        <Typography variant="h4">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header with Logo */}
      <Header />

      {/* Page Sections */}
      <HeroSection heroData={content?.hero} />
      <FeaturesSection features={content?.features} />
      <AboutSection aboutData={content?.about} />
      <ContactSection contactData={content?.contact} />
      
      {/* Footer */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          py: 3, 
          textAlign: 'center' 
        }}
      >
        <Typography variant="body2">
          © 2024 Happy Jasmine. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
