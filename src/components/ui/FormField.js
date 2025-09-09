import { TextField, Box, Typography } from '@mui/material';

export default function FormField({
  label,
  value,
  onChange,
  type = 'text',
  multiline = false,
  rows = 2,
  required = false,
  placeholder = '',
  helperText = '',
  error = false,
  fullWidth = true,
  sx = {},
  ...props
}) {
  return (
    <TextField
      label={label}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      type={type}
      multiline={multiline}
      rows={rows}
      required={required}
      placeholder={placeholder}
      helperText={helperText}
      error={error}
      fullWidth={fullWidth}
      variant="outlined"
      sx={{
        '& .MuiOutlinedInput-root': {
          '&:hover fieldset': {
            borderColor: 'primary.main',
          },
        },
        ...sx
      }}
      {...props}
    />
  );
}

// Specialized form field for URLs
export function UrlField({ label, value, onChange, ...props }) {
  return (
    <FormField
      label={label}
      value={value}
      onChange={onChange}
      placeholder="https://example.com/image.jpg"
      helperText="Enter a full URL starting with https://"
      {...props}
    />
  );
}

// Specialized form field for rich text
export function RichTextField({ label, value, onChange, ...props }) {
  return (
    <FormField
      label={label}
      value={value}
      onChange={onChange}
      multiline
      rows={4}
      placeholder="Enter detailed description..."
      {...props}
    />
  );
}