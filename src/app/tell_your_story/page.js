'use client';

import { Box, Typography, TextField, Button } from '@mui/material';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function TellYourStory() {
  return (
    <Box>
      <Header />

      <Box sx={{ py: 8, px: 4, maxWidth: '800px', mx: 'auto' }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Bagikan cerita serumu
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 4, color: 'text.secondary' }}>
          Berbagi cerita Anda dengan komunitas kami. Ceritakan pengalaman, inspirasi, atau apa saja yang ingin Anda bagikan.
        </Typography>

        <Box component="form" sx={{ maxWidth: '600px', mx: 'auto', '& .MuiTextField-root': { mb: 2 } }}>
          <TextField
            fullWidth
            label="Nama"
            id="name"
            name="name"
            placeholder="Masukkan nama Anda"
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Cerita Anda"
            id="story"
            name="story"
            placeholder="Tulis cerita Anda di sini..."
            multiline
            rows={6}
            variant="outlined"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 2 }}
          >
            Bagikan Cerita
          </Button>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}