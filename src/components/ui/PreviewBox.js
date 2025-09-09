import { Box, Typography, Paper } from '@mui/material';

export default function PreviewBox({
  title = 'Preview',
  children,
  sx = {},
  showTitle = true,
  elevation = 0,
  ...props
}) {
  return (
    <Paper
      sx={{
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.default',
        ...sx
      }}
      elevation={elevation}
      {...props}
    >
      {showTitle && (
        <Typography
          variant="subtitle2"
          sx={{
            mb: 2,
            color: 'text.secondary',
            fontWeight: 600
          }}
        >
          {title}
        </Typography>
      )}
      {children}
    </Paper>
  );
}

// Specialized preview for images
export function ImagePreview({ src, alt, title = 'Image Preview', height = 200, ...props }) {
  return (
    <PreviewBox title={title} {...props}>
      {src ? (
        <Box
          component="img"
          src={src}
          alt={alt || 'Preview'}
          sx={{
            width: '100%',
            height: height,
            objectFit: 'cover',
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider'
          }}
        />
      ) : (
        <Box
          sx={{
            width: '100%',
            height: height,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            backgroundColor: 'grey.100'
          }}
        >
          <Typography variant="body2" color="text.secondary">
            No image selected
          </Typography>
        </Box>
      )}
    </PreviewBox>
  );
}

// Specialized preview for text content
export function TextPreview({ title, subtitle, buttonText, height = 200, ...props }) {
  return (
    <PreviewBox title="Content Preview" {...props}>
      <Box
        sx={{
          height: height,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          p: 2,
          background: 'linear-gradient(135deg, rgba(0, 95, 115, 0.1) 0%, rgba(255, 227, 71, 0.1) 100%)',
          borderRadius: 2
        }}
      >
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>
          {title || 'Title'}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, opacity: 0.8 }}>
          {subtitle || 'Subtitle will appear here'}
        </Typography>
        <Typography variant="button" sx={{ fontWeight: 600 }}>
          {buttonText || 'Button Text'}
        </Typography>
      </Box>
    </PreviewBox>
  );
}