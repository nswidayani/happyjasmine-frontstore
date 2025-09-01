'use client';

import { useEffect, useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '../components/ThemeProvider';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import CampaignSection from '../components/CampaignSection';
import AnimatedSpacer from '../components/AnimatedSpacer';
import ProductsFeaturesSection from '../components/ProductsFeaturesSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import { getContent } from '../lib/supabase';

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
        const result = await getContent();
        if (result.success) {
          setContent(result.data);
          
          // Apply theme from content if available
          if (result.data.theme) {
            updateThemeRef.current({
              mode: result.data.theme.mode || 'light',
              primaryColor: result.data.theme.primaryColor || '#005F73',
              secondaryColor: result.data.theme.secondaryColor || '#FFE347',
              warningColor: result.data.theme.warningColor || '#FF90AD',
              backgroundDefault: result.data.theme.backgroundDefault || '#F5F5F5',
              backgroundPaper: result.data.theme.backgroundPaper || '#FFFFFF',
            });
          }
        } else {
          console.error('Failed to fetch content:', result.error);
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
      <AnimatedSpacer />
      <CampaignSection campaigns={content?.hero?.campaigns} />
      <ProductsFeaturesSection products={content?.products} features={content?.features} />
      <AboutSection aboutData={content?.about} />
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
