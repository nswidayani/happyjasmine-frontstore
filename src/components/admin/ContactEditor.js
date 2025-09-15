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

        {/* Social Media Links */}
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Social Media Links</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Facebook URL"
            placeholder="https://facebook.com/yourpage"
            value={contact?.facebook || ''}
            onChange={(e) => setContent({ ...content, contact: { ...contact, facebook: e.target.value } })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Instagram URL"
            placeholder="https://instagram.com/youraccount"
            value={contact?.instagram || ''}
            onChange={(e) => setContent({ ...content, contact: { ...contact, instagram: e.target.value } })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="WhatsApp Number"
            placeholder="60123456789"
            value={contact?.whatsapp || ''}
            onChange={(e) => setContent({ ...content, contact: { ...contact, whatsapp: e.target.value } })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="TikTok URL"
            placeholder="https://tiktok.com/@youraccount"
            value={contact?.tiktok || ''}
            onChange={(e) => setContent({ ...content, contact: { ...contact, tiktok: e.target.value } })}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="YouTube URL"
            placeholder="https://youtube.com/yourchannel"
            value={contact?.youtube || ''}
            onChange={(e) => setContent({ ...content, contact: { ...contact, youtube: e.target.value } })}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}


