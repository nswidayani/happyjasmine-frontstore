import { Typography, Grid, Paper, TextField } from '@mui/material';

export default function AboutEditor({ content, setContent }) {
  const about = content?.about || {};

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>About Section</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Title"
            value={about?.title || ''}
            onChange={(e) => setContent({ ...content, about: { ...about, title: e.target.value } })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={4}
            value={about?.description || ''}
            onChange={(e) => setContent({ ...content, about: { ...about, description: e.target.value } })}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}


