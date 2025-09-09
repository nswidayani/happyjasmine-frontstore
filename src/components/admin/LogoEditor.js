import { useState } from 'react';
import { Box, Typography, Grid, Paper, TextField, Button } from '@mui/material';
import { uploadFileToStorage } from '../../lib/supabase';

export default function LogoEditor({ content, setContent, onError, onUploadNotice }) {
  const logo = content?.logo || '/logo.svg';
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file) => {
    try {
      if (!file) return;
      setUploading(true);
      const upload = await uploadFileToStorage(file, 'logos');
      if (upload.success) {
        setContent({ ...content, logo: upload.url });
        onUploadNotice && onUploadNotice('Logo uploaded successfully');
      } else {
        onError && onError(upload.error || 'Failed to upload logo');
      }
    } catch (err) {
      onError && onError('Failed to upload logo');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Logo Settings</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 2 }}>Current Logo Preview</Typography>
          <Box sx={{ mb: 3, p: 2, border: '1px solid rgba(0, 95, 115, 0.2)', borderRadius: 1, backgroundColor: 'background.default' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 100 }}>
              <img
                src={logo}
                alt="Logo Preview"
                style={{
                  maxHeight: '80px',
                  maxWidth: '200px',
                  objectFit: 'contain'
                }}
              />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Logo URL"
            value={logo}
            onChange={(e) => setContent({ ...content, logo: e.target.value })}
            placeholder="https://example.com/logo.svg"
          />
        </Grid>

        <Grid item xs={12}>
          <input
            type="file"
            id="logo-upload"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={async (e) => {
              const inputEl = e.target;
              const file = inputEl.files?.[0];
              await handleUpload(file);
              inputEl.value = '';
            }}
          />
          <label htmlFor="logo-upload">
            <Button
              component="span"
              variant="outlined"
              fullWidth
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload New Logo'}
            </Button>
          </label>
          <Typography variant="caption" sx={{ mt: 1, color: 'text.secondary' }}>
            Supported formats: PNG, JPG, SVG, WebP. Recommended size: 200x80px or similar aspect ratio.
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}