'use client';

import { useEffect, useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '../components/ThemeProvider';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import ProductsSection from '../components/ProductsSection';

export default function Home() {
  const { updateTheme } = useTheme();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const updateThemeRef = useRef(updateTheme);

  useEffect(() => {
    updateThemeRef.current = updateTheme;
  }, [updateTheme]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content');
        const data = await response.json();
        setContent(data);
        
        // Apply theme from content if available
        if (data.theme) {
          updateThemeRef.current({
            mode: data.theme.mode || 'light',
            primaryColor: data.theme.primaryColor || '#005F73',
            secondaryColor: data.theme.secondaryColor || '#FFE347',
            warningColor: data.theme.warningColor || '#FF90AD',
            backgroundDefault: data.theme.backgroundDefault || '#F5F5F5',
            backgroundPaper: data.theme.backgroundPaper || '#FFFFFF',
          });
        }
      } catch (error) {
        console.error('Failed to fetch content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

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
      {/* <FeaturesSection features={content?.features} /> */}
      <ProductsSection products={content?.products} />
      {/* <AboutSection aboutData={content?.about} /> */}
      <ContactSection contactData={content?.contact} />
      
      {/* Footer */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'primary.contrastText', 
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
