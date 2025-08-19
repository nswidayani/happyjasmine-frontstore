import { Typography, Grid, Paper, TextField } from '@mui/material';

export default function ContactEditor({ content, setContent }) {
  const contact = content?.contact || {};

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Contact Section</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Title"
            value={contact?.title || ''}
            onChange={(e) => setContent({ ...content, contact: { ...contact, title: e.target.value } })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Email"
            value={contact?.email || ''}
            onChange={(e) => setContent({ ...content, contact: { ...contact, email: e.target.value } })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            value={contact?.description || ''}
            onChange={(e) => setContent({ ...content, contact: { ...contact, description: e.target.value } })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Phone"
            value={contact?.phone || ''}
            onChange={(e) => setContent({ ...content, contact: { ...contact, phone: e.target.value } })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Address"
            value={contact?.address || ''}
            onChange={(e) => setContent({ ...content, contact: { ...contact, address: e.target.value } })}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}


