import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Alert,
  Snackbar,
  CircularProgress
} from '@mui/material';
import { getContent, updateContent } from '../../lib/supabase';
import HeroEditor from './HeroEditor';
import ProductsFeaturesEditor from './ProductsFeaturesEditor';
import AboutEditor from './AboutEditor';
import ContactEditor from './ContactEditor';

export default function LandingPageProperties() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [uploadNotice, setUploadNotice] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const result = await getContent();
      if (result.success) {
        setContent(result.data);
      } else {
        setError('Failed to fetch content: ' + result.error);
      }
    } catch (error) {
      setError('Failed to fetch content');
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async () => {
    setSaving(true);
    try {
      const result = await updateContent(content);
      if (result.success) {
        setSuccess(true);
      } else {
        setError('Failed to save content: ' + result.error);
      }
    } catch (error) {
      setError('Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Box textAlign="center">
          <CircularProgress size={60} sx={{ color: 'primary.main', mb: 3 }} />
          <Typography variant="h6" color="text.secondary">
            Loading content...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 1, sm: 2 } }}>
      {/* Header */}
      <Box sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            mb: { xs: 1, sm: 2 }, 
            color: 'primary.main', 
            fontWeight: 700,
            fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' }
          }}
        >
          Landing Page Properties
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Manage your landing page content, hero section, features, products, and more.
        </Typography>
        
        {/* Save Button */}
        <Paper 
          sx={{ 
            p: 3, 
            mb: 4, 
            bgcolor: 'primary.light', 
            color: 'primary.contrastText',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
              Save Your Changes
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Don't forget to save your changes after editing the content.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Typography 
              variant="body2" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                opacity: 0.8
              }}
            >
              {saving ? 'Saving...' : 'Ready to save'}
            </Typography>
            <Box
              component="button"
              onClick={saveContent}
              disabled={saving}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                border: 'none',
                borderRadius: 2,
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                cursor: saving ? 'not-allowed' : 'pointer',
                opacity: saving ? 0.6 : 1,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  bgcolor: 'grey.100',
                  transform: saving ? 'none' : 'translateY(-2px)'
                },
                '&:active': {
                  transform: 'translateY(0)'
                }
              }}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Content Editors */}
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {/* Hero Section */}
        <Grid item xs={12}>
          <HeroEditor 
            content={content} 
            setContent={setContent}
            onError={setError}
            onUploadNotice={setUploadNotice}
          />
        </Grid>

        {/* Products and Features Section */}
        <Grid item xs={12}>
          <ProductsFeaturesEditor 
            content={content} 
            setContent={setContent} 
            onError={setError} 
            onUploadNotice={setUploadNotice} 
          />
        </Grid>

        {/* About Section */}
        <Grid item xs={12}>
          <AboutEditor 
            content={content} 
            setContent={setContent} 
          />
        </Grid>

        {/* Contact Section */}
        <Grid item xs={12}>
          <ContactEditor 
            content={content} 
            setContent={setContent} 
          />
        </Grid>
      </Grid>

      {/* Notifications */}
      <Snackbar open={success} autoHideDuration={4000} onClose={() => setSuccess(false)}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Content saved successfully! Your changes are now live.
        </Alert>
      </Snackbar>

      <Snackbar open={!!error} autoHideDuration={5000} onClose={() => setError('')}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar open={!!uploadNotice} autoHideDuration={3000} onClose={() => setUploadNotice('')}>
        <Alert severity="success" sx={{ width: '100%' }}>
          {uploadNotice}
        </Alert>
      </Snackbar>
    </Container>
  );
}
