import { Box, Typography, Grid, Paper, TextField, Slider } from '@mui/material';
import FileUpload from '../ui/FileUpload';

export default function FeaturesEditor({ content, setContent }) {
  const features = content?.features || {};

  const handleImageUpload = (url) => {
    setContent({ ...content, features: { ...features, image: url } });
  };

  const handleImageError = (error) => {
    console.error('Image upload error:', error);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>Features Section</Typography>

      <Grid container spacing={3}>
        {/* Image Upload */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 2 }}>Feature Image</Typography>
          <FileUpload
            onUpload={handleImageUpload}
            onError={handleImageError}
            folder="features"
            accept="image/*"
            label="Upload Feature Image"
            showPreview={true}
            currentFile={features?.image}
            previewHeight={150}
            fullWidth
          />
        </Grid>

        {/* Image Width Control */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 2 }}>Image Width: {features?.imageWidth || 50}%</Typography>
          <Slider
            value={features?.imageWidth || 50}
            onChange={(e, newValue) => setContent({ ...content, features: { ...features, imageWidth: newValue } })}
            min={30}
            max={70}
            step={5}
            marks={[
              { value: 30, label: '30%' },
              { value: 50, label: '50%' },
              { value: 70, label: '70%' }
            ]}
            valueLabelDisplay="auto"
            sx={{ mt: 2 }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Adjust the width of the image on desktop. Text will occupy the remaining space.
          </Typography>
        </Grid>

        {/* Title */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Section Title"
            value={features?.title || ''}
            onChange={(e) => setContent({ ...content, features: { ...features, title: e.target.value } })}
            placeholder="Enter section title"
          />
        </Grid>

        {/* Description */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Section Description"
            multiline
            rows={3}
            value={features?.description || ''}
            onChange={(e) => setContent({ ...content, features: { ...features, description: e.target.value } })}
            placeholder="Enter section description"
          />
        </Grid>

        {/* Content */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Additional Content"
            multiline
            rows={6}
            value={features?.content || ''}
            onChange={(e) => setContent({ ...content, features: { ...features, content: e.target.value } })}
            placeholder="Enter additional content for the section"
            helperText="This content will appear below the title and description"
          />
        </Grid>
      </Grid>

      {/* Preview */}
      <Box sx={{ mt: 4, p: 3, border: '1px solid rgba(0, 95, 115, 0.2)', borderRadius: 1, backgroundColor: 'background.default' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Preview</Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {features?.image && (
            <Box
              component="img"
              src={features.image}
              alt="Preview"
              sx={{
                width: `${features?.imageWidth || 50}%`,
                maxWidth: 200,
                height: 120,
                objectFit: 'cover',
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider'
              }}
            />
          )}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" sx={{ mb: 1, fontSize: '1.1rem' }}>
              {features?.title || 'Section Title'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {features?.description || 'Section description'}
            </Typography>
            {features?.content && (
              <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                {features.content.length > 100 ? `${features.content.substring(0, 100)}...` : features.content}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}


