'use client';

import { useEffect, useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '../../components/ThemeProvider';
import Header from '../../components/Header';
import AboutSection from '../../components/AboutSection';
import Footer from '../../components/Footer';
import { getContent, incrementVisitCount } from '../../lib/supabase';

export default function AboutPage() {
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

  // Increment visit count on page load
  useEffect(() => {
    const trackVisit = async () => {
      try {
        await incrementVisitCount('about');
      } catch (error) {
        console.error('Failed to track visit:', error);
      }
    };

    trackVisit();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h4">Memuat...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      {/* Header with Logo */}
      <Header logo={content?.logo || '/logo.svg'} />

      {/* About Section */}
      <AboutSection aboutData={content?.about} />

      {/* Footer */}
      <Footer contactData={content?.contact} />
    </Box>
  );
}