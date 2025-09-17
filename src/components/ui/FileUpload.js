import { useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { uploadFileToStorage } from '../../lib/supabase';

export default function FileUpload({
  onUpload,
  onError,
  folder = 'uploads',
  accept = 'image/*',
  label = 'Upload File',
  disabled = false,
  variant = 'outlined',
  size = 'medium',
  fullWidth = false,
  showPreview = false,
  currentFile = null,
  previewHeight = 100,
  sx = {}
}) {
  const [uploading, setUploading] = useState(false);
  const uploadId = `file-upload-${Date.now()}`;

  const handleUpload = async (file) => {
    if (!file) return;

    try {
      setUploading(true);
      const result = await uploadFileToStorage(file, folder);

      if (result.success) {
        onUpload && onUpload(result.url);
      } else {
        onError && onError(result.error || 'Upload failed');
      }
    } catch (error) {
      onError && onError('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
    // Reset input
    event.target.value = '';
  };

  return (
    <Box sx={{ width: fullWidth ? '100%' : 'auto', ...sx }}>
      {showPreview && currentFile && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
            Current file:
          </Typography>
          <Box
            component="img"
            src={currentFile}
            alt="Current file"
            sx={{
              width: '100%',
              maxWidth: 200,
              height: previewHeight,
              objectFit: 'cover',
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider'
            }}
          />
        </Box>
      )}

      <input
        type="file"
        id={uploadId}
        style={{ display: 'none' }}
        accept={accept}
        onChange={handleFileChange}
        disabled={uploading || disabled}
      />

      <label htmlFor={uploadId}>
        <Button
          component="span"
          variant={variant}
          size={size}
          disabled={uploading || disabled}
          fullWidth={fullWidth}
          startIcon={uploading ? <CircularProgress size={16} /> : <CloudUploadIcon />}
          sx={{
            minWidth: 120,
            ...sx
          }}
        >
          {uploading ? 'Uploading...' : label}
        </Button>
      </label>
    </Box>
  );
}