import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Grid,
  TextField,
  Paper,
  Alert,
  Snackbar,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { getContent, updateContent, signOutUser } from '../lib/supabase';
import HeroEditor from './admin/HeroEditor';
import FeaturesEditor from './admin/FeaturesEditor';
import ProductsEditor from './admin/ProductsEditor';
import AboutEditor from './admin/AboutEditor';
import ContactEditor from './admin/ContactEditor';

export default function AdminDashboard({ onLogout }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [uploadNotice, setUploadNotice] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
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

  const handleLogout = async () => {
    try {
      await signOutUser();
      onLogout();
    } catch (error) {
      console.error('Logout error:', error);
      onLogout();
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h4">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar>
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
                width={80}
                height={40}
                style={{
                  height: 'auto',
                  maxWidth: '100%',
                  filter: 'invert(1)' // Make logo white in dark header
                }}
                priority
              />
            </Box>
          </Link>
          
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Button color="inherit" href="/" sx={{ mr: 2 }}>
            View Site
          </Button>
          <Button color="inherit" onClick={saveContent} disabled={saving} sx={{ mr: 2 }}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" sx={{ mb: 4 }}>
          Content Management
        </Typography>

        <Grid container spacing={4}>
          {/* Hero Section */}
          <Grid item xs={12}>
            <HeroEditor content={content} setContent={setContent} onError={setError} onUploadNotice={setUploadNotice} />
          </Grid>

          {/* Features Section */}
          <Grid item xs={12}>
            <FeaturesEditor content={content} setContent={setContent} />
          </Grid>

          {/* Products Section */}
          <Grid item xs={12}>
            <ProductsEditor content={content} setContent={setContent} onError={setError} onUploadNotice={setUploadNotice} />
          </Grid>

          {/* About Section */}
          <Grid item xs={12}>
            <AboutEditor content={content} setContent={setContent} />
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12}>
            <ContactEditor content={content} setContent={setContent} />
          </Grid>
        </Grid>
      </Container>

      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
        <Alert severity="success">Content saved successfully!</Alert>
      </Snackbar>

      <Snackbar open={!!error} autoHideDuration={3000} onClose={() => setError('')}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>

      <Snackbar open={!!uploadNotice} autoHideDuration={2000} onClose={() => setUploadNotice('')}>
        <Alert severity="success">{uploadNotice}</Alert>
      </Snackbar>
    </Box>
  );
}
