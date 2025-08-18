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
import Speed from '@mui/icons-material/Speed';
import Security from '@mui/icons-material/Security';
import IntegrationInstructions from '@mui/icons-material/IntegrationInstructions';
import Star from '@mui/icons-material/Star';
import Support from '@mui/icons-material/Support';
import TrendingUp from '@mui/icons-material/TrendingUp';
import Cloud from '@mui/icons-material/Cloud';
import Devices from '@mui/icons-material/Devices';
import Analytics from '@mui/icons-material/Analytics';
import Code from '@mui/icons-material/Code';
import Business from '@mui/icons-material/Business';
import School from '@mui/icons-material/School';
import Favorite from '@mui/icons-material/Favorite';
import Lightbulb from '@mui/icons-material/Lightbulb';
import Rocket from '@mui/icons-material/Rocket';
import Shield from '@mui/icons-material/Shield';
import FlashOn from '@mui/icons-material/FlashOn';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import EmojiEvents from '@mui/icons-material/EmojiEvents';

const iconMap = {
  Speed,
  Security,
  Integration: IntegrationInstructions,
  Star,
  Support,
  TrendingUp,
  Cloud,
  Devices,
  Analytics,
  Code,
  Business,
  School,
  Favorite,
  Lightbulb,
  Rocket,
  Shield,
  Zap: FlashOn,
  Heart: FavoriteBorder,
  Diamond: Star,
  Award: EmojiEvents,
};

export default function AdminDashboard({ onLogout }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/content');
      const data = await response.json();
      setContent(data);
    } catch (error) {
      setError('Failed to fetch content');
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        setError('Failed to save content');
      }
    } catch (error) {
      setError('Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    onLogout();
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
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>Hero Section</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Title"
                    value={content?.hero?.title || ''}
                    onChange={(e) => setContent({
                      ...content,
                      hero: { ...content.hero, title: e.target.value }
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Subtitle"
                    multiline
                    rows={2}
                    value={content?.hero?.subtitle || ''}
                    onChange={(e) => setContent({
                      ...content,
                      hero: { ...content.hero, subtitle: e.target.value }
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Button Text"
                    value={content?.hero?.buttonText || ''}
                    onChange={(e) => setContent({
                      ...content,
                      hero: { ...content.hero, buttonText: e.target.value }
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Image Slider</Typography>
                  
                  {/* Preview Section */}
                  <Box sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>
                      Preview (showing first slide):
                    </Typography>
                    {content?.hero?.imageSlider?.[0] && (
                      <Box
                        sx={{
                          height: 200,
                          backgroundImage: `url(${content.hero.imageSlider[0].image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          borderRadius: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                        }}
                      >
                        <Box
                          sx={{
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            color: 'white',
                            p: 2,
                            borderRadius: 1,
                            textAlign: 'center',
                            maxWidth: '80%',
                          }}
                        >
                          <Typography variant="h6" sx={{ mb: 1 }}>
                            {content.hero.imageSlider[0].title || 'No title'}
                          </Typography>
                          <Typography variant="body2">
                            {content.hero.imageSlider[0].subtitle || 'No subtitle'}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </Box>
                  
                  {content?.hero?.imageSlider?.map((slide, index) => (
                    <Paper key={slide.id} sx={{ p: 2, mb: 2, border: '1px solid #e0e0e0' }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={3}>
                          <TextField
                            fullWidth
                            label="Image URL"
                            value={slide.image || ''}
                            onChange={(e) => {
                              const newSlider = [...content.hero.imageSlider];
                              newSlider[index] = { ...slide, image: e.target.value };
                              setContent({
                                ...content,
                                hero: { ...content.hero, imageSlider: newSlider }
                              });
                            }}
                            error={slide.image && !slide.image.startsWith('/') && !slide.image.startsWith('http')}
                            helperText={slide.image && !slide.image.startsWith('/') && !slide.image.startsWith('http') ? 'Please enter a valid URL or path starting with / or http' : ''}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <TextField
                            fullWidth
                            label="Title"
                            value={slide.title || ''}
                            onChange={(e) => {
                              const newSlider = [...content.hero.imageSlider];
                              newSlider[index] = { ...slide, title: e.target.value };
                              setContent({
                                ...content,
                                hero: { ...content.hero, imageSlider: newSlider }
                              });
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            fullWidth
                            label="Subtitle"
                            value={slide.subtitle || ''}
                            onChange={(e) => {
                              const newSlider = [...content.hero.imageSlider];
                              newSlider[index] = { ...slide, subtitle: e.target.value };
                              setContent({
                                ...content,
                                hero: { ...content.hero, imageSlider: newSlider }
                              });
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => {
                              const newSlider = content.hero.imageSlider.filter((_, i) => i !== index);
                              setContent({
                                ...content,
                                hero: { ...content.hero, imageSlider: newSlider }
                              });
                            }}
                          >
                            Remove
                          </Button>
                        </Grid>
                      </Grid>
                    </Paper>
                  ))}
                  <Button
                    variant="outlined"
                    onClick={() => {
                      const newSlide = {
                        id: Date.now(),
                        image: '',
                        title: '',
                        subtitle: ''
                      };
                      const newSlider = [...(content?.hero?.imageSlider || []), newSlide];
                      setContent({
                        ...content,
                        hero: { ...content.hero, imageSlider: newSlider }
                      });
                    }}
                    sx={{ mt: 1 }}
                  >
                    Add New Slide
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Features Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>Features Section</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Section Title"
                    value={content?.features?.title || ''}
                    onChange={(e) => setContent({
                      ...content,
                      features: { ...content.features, title: e.target.value }
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Section Description"
                    multiline
                    rows={2}
                    value={content?.features?.description || ''}
                    onChange={(e) => setContent({
                      ...content,
                      features: { ...content.features, description: e.target.value }
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Feature Items</Typography>
                  
                  {/* Preview Section */}
                  <Box sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>
                      Preview (showing first 3 features):
                    </Typography>
                    <Grid container spacing={2}>
                      {content?.features?.items?.slice(0, 3).map((feature, index) => {
                        const IconComponent = iconMap[feature.icon] || Speed;
                        return (
                          <Grid item xs={12} md={4} key={feature.id}>
                            <Box
                              sx={{
                                p: 2,
                                border: '1px solid #e0e0e0',
                                borderRadius: 1,
                                backgroundColor: 'white',
                                textAlign: 'center',
                                height: '100%',
                              }}
                            >
                              <IconComponent
                                sx={{
                                  fontSize: 40,
                                  color: 'primary.main',
                                  mb: 1,
                                }}
                              />
                              <Typography variant="h6" sx={{ mb: 1, fontSize: '0.9rem' }}>
                                {feature.title || 'No title'}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                                {feature.description || 'No description'}
                              </Typography>
                            </Box>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Box>
                  
                  {content?.features?.items?.map((feature, index) => (
                    <Paper key={feature.id} sx={{ p: 2, mb: 2, border: '1px solid #e0e0e0' }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={1}>
                          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                            #{index + 1}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <TextField
                            select
                            fullWidth
                            label="Icon"
                            value={feature.icon || ''}
                            onChange={(e) => {
                              const newItems = [...content.features.items];
                              newItems[index] = { ...feature, icon: e.target.value };
                              setContent({
                                ...content,
                                features: { ...content.features, items: newItems }
                              });
                            }}
                          >
                            <option value="Speed">Speed</option>
                            <option value="Security">Security</option>
                            <option value="Integration">Integration</option>
                            <option value="Star">Star</option>
                            <option value="Support">Support</option>
                            <option value="TrendingUp">Trending Up</option>
                            <option value="Cloud">Cloud</option>
                            <option value="Devices">Devices</option>
                            <option value="Analytics">Analytics</option>
                            <option value="Code">Code</option>
                            <option value="Business">Business</option>
                            <option value="School">School</option>
                            <option value="Favorite">Favorite</option>
                            <option value="Lightbulb">Lightbulb</option>
                            <option value="Rocket">Rocket</option>
                            <option value="Shield">Shield</option>
                            <option value="Zap">Zap</option>
                            <option value="Heart">Heart</option>
                            <option value="Diamond">Diamond</option>
                            <option value="Award">Award</option>
                          </TextField>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <TextField
                            fullWidth
                            label="Title"
                            value={feature.title || ''}
                            onChange={(e) => {
                              const newItems = [...content.features.items];
                              newItems[index] = { ...feature, title: e.target.value };
                              setContent({
                                ...content,
                                features: { ...content.features, items: newItems }
                              });
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            fullWidth
                            label="Description"
                            multiline
                            rows={2}
                            value={feature.description || ''}
                            onChange={(e) => {
                              const newItems = [...content.features.items];
                              newItems[index] = { ...feature, description: e.target.value };
                              setContent({
                                ...content,
                                features: { ...content.features, items: newItems }
                              });
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => {
                                if (index > 0) {
                                  const newItems = [...content.features.items];
                                  [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
                                  setContent({
                                    ...content,
                                    features: { ...content.features, items: newItems }
                                  });
                                }
                              }}
                              disabled={index === 0}
                            >
                              ↑
                            </Button>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => {
                                if (index < content.features.items.length - 1) {
                                  const newItems = [...content.features.items];
                                  [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
                                  setContent({
                                    ...content,
                                    features: { ...content.features, items: newItems }
                                  });
                                }
                              }}
                              disabled={index === content.features.items.length - 1}
                            >
                              ↓
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={() => {
                                const newItems = content.features.items.filter((_, i) => i !== index);
                                setContent({
                                  ...content,
                                  features: { ...content.features, items: newItems }
                                });
                              }}
                            >
                              Remove
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Paper>
                  ))}
                  <Button
                    variant="outlined"
                    onClick={() => {
                      const newFeature = {
                        id: Date.now(),
                        icon: 'Speed',
                        title: '',
                        description: ''
                      };
                      const newItems = [...(content?.features?.items || []), newFeature];
                      setContent({
                        ...content,
                        features: { ...content.features, items: newItems }
                      });
                    }}
                    sx={{ mt: 1 }}
                  >
                    Add New Feature
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* About Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>About Section</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Title"
                    value={content?.about?.title || ''}
                    onChange={(e) => setContent({
                      ...content,
                      about: { ...content.about, title: e.target.value }
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    multiline
                    rows={4}
                    value={content?.about?.description || ''}
                    onChange={(e) => setContent({
                      ...content,
                      about: { ...content.about, description: e.target.value }
                    })}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>Contact Section</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Title"
                    value={content?.contact?.title || ''}
                    onChange={(e) => setContent({
                      ...content,
                      contact: { ...content.contact, title: e.target.value }
                    })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={content?.contact?.email || ''}
                    onChange={(e) => setContent({
                      ...content,
                      contact: { ...content.contact, email: e.target.value }
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    value={content?.contact?.description || ''}
                    onChange={(e) => setContent({
                      ...content,
                      contact: { ...content.contact, description: e.target.value }
                    })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={content?.contact?.phone || ''}
                    onChange={(e) => setContent({
                      ...content,
                      contact: { ...content.contact, phone: e.target.value }
                    })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Address"
                    value={content?.contact?.address || ''}
                    onChange={(e) => setContent({
                      ...content,
                      contact: { ...content.contact, address: e.target.value }
                    })}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)}>
        <Alert severity="success">Content saved successfully!</Alert>
      </Snackbar>

      <Snackbar open={!!error} autoHideDuration={3000} onClose={() => setError('')}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Box>
  );
}
