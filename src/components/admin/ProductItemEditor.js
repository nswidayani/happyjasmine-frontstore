import { useState } from 'react';
import { Box, Grid, TextField, Button } from '@mui/material';
import { uploadImageToStorage } from '../../lib/supabase';

export default function ProductItemEditor({
  product,
  index,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  onUploadNotice,
  onError,
}) {
  const [uploading, setUploading] = useState(false);

  const handleFieldChange = (field, value) => {
    onChange({ ...product, [field]: value });
  };

  const handleUpload = async (file) => {
    try {
      if (!file) return;
      setUploading(true);
      const upload = await uploadImageToStorage(file, 'products');
      if (upload.success) {
        onChange({ ...product, image: upload.url });
        onUploadNotice && onUploadNotice('Image uploaded');
      } else {
        onError && onError(upload.error || 'Failed to upload image');
      }
    } catch (err) {
      onError && onError('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          label="Name"
          value={product.name || ''}
          onChange={(e) => handleFieldChange('name', e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Description"
          multiline
          rows={2}
          value={product.description || ''}
          onChange={(e) => handleFieldChange('description', e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <TextField
          fullWidth
          label="Price"
          value={product.price || ''}
          onChange={(e) => handleFieldChange('price', e.target.value)}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          label="Image URL"
          value={product.image || ''}
          onChange={(e) => handleFieldChange('image', e.target.value)}
        />
        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          <input
            type="file"
            id={`product-image-${index}`}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={async (e) => {
              const inputEl = e.target;
              const file = inputEl.files?.[0];
              await handleUpload(file);
              inputEl.value = '';
            }}
          />
          <label htmlFor={`product-image-${index}`}>
            <Button component="span" variant="outlined" size="small" disabled={uploading}>
              {uploading ? 'Uploading...' : 'Upload Image'}
            </Button>
          </label>
          <Button variant="outlined" color="error" size="small" onClick={onRemove}>
            Remove
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" size="small" onClick={onMoveUp} disabled={isFirst}>
            ↑ Move Up
          </Button>
          <Button variant="outlined" size="small" onClick={onMoveDown} disabled={isLast}>
            ↓ Move Down
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}


