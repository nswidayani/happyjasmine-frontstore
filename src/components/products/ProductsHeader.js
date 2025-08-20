import { Box, Typography, IconButton } from '@mui/material';
import { Refresh } from '@mui/icons-material';

export default function ProductsHeader({ count, onRefresh, showRefresh }) {
  return (
    <Box sx={{ textAlign: 'center', mb: 6, position: 'relative' }}>
      {showRefresh && (
        <IconButton
          onClick={onRefresh}
          sx={{ position: 'absolute', right: 0, top: 0, color: 'primary.main', '&:hover': { transform: 'rotate(180deg)', transition: 'transform 0.3s ease-in-out' } }}
        >
          <Refresh />
        </IconButton>
      )}
      <Typography variant="h2" sx={{ color: 'primary.main', mb: 2, fontWeight: 700 }}>
        Varian Rasa HappyJasmine
      </Typography>
      <Typography variant="h5" sx={{ color: 'text.secondary', maxWidth: '600px', mx: 'auto', lineHeight: 1.6 }}>
        Pilihan Rasa Terbaik untukmu
      </Typography>
    </Box>
  );
}


