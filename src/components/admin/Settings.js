import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert
} from '@mui/material';
import { useState } from 'react';

export default function Settings() {
  const [settings, setSettings] = useState({
    autoSave: true,
    notifications: true,
    darkMode: false,
    language: 'en',
    timezone: 'UTC'
  });

  const [saved, setSaved] = useState(false);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    // Here you would typically save to backend
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" sx={{ mb: 2, color: 'primary.main', fontWeight: 700 }}>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Configure your admin panel preferences and system settings.
        </Typography>
      </Box>

      {saved && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Settings saved successfully!
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* General Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
              General Settings
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.autoSave}
                    onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
                    color="primary"
                  />
                }
                label="Auto-save changes"
                labelPlacement="start"
                sx={{ justifyContent: 'space-between', m: 0 }}
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications}
                    onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                    color="primary"
                  />
                }
                label="Enable notifications"
                labelPlacement="start"
                sx={{ justifyContent: 'space-between', m: 0 }}
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.darkMode}
                    onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
                    color="primary"
                  />
                }
                label="Dark mode"
                labelPlacement="start"
                sx={{ justifyContent: 'space-between', m: 0 }}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Regional Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
              Regional Settings
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                select
                label="Language"
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
                fullWidth
                SelectProps={{
                  native: true,
                }}
              >
                <option value="en">English</option>
                <option value="id">Bahasa Indonesia</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </TextField>
              
              <TextField
                select
                label="Timezone"
                value={settings.timezone}
                onChange={(e) => handleSettingChange('timezone', e.target.value)}
                fullWidth
                SelectProps={{
                  native: true,
                }}
              >
                <option value="UTC">UTC (Coordinated Universal Time)</option>
                <option value="WIB">WIB (Western Indonesian Time)</option>
                <option value="WITA">WITA (Central Indonesian Time)</option>
                <option value="WIT">WIT (Eastern Indonesian Time)</option>
              </TextField>
            </Box>
          </Paper>
        </Grid>

        {/* System Information */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
              System Information
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    Admin Panel Version
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    v1.0.0
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    Last Updated
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {new Date().toLocaleDateString()}
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    Database Status
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: 'success.main' }}>
                    Connected
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    Storage Status
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: 'success.main' }}>
                    Active
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Save Button */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleSave}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: 'primary.dark',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease-in-out'
              }}
            >
              Save Settings
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
