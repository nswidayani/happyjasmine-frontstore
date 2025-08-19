import { IconButton, Box, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

export default function SliderControls({ count, current, onPrev, onNext, onGoTo }) {
  return (
    <>
      <IconButton
        onClick={onPrev}
        sx={{
          position: 'absolute',
          left: -20,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'background.paper',
          color: 'primary.main',
          border: '2px solid',
          borderColor: 'primary.main',
          zIndex: 2,
          '&:hover': { bgcolor: 'primary.main', color: 'white' },
          '@media (max-width: 600px)': { left: 10 }
        }}
      >
        <ChevronLeft />
      </IconButton>

      <IconButton
        onClick={onNext}
        sx={{
          position: 'absolute',
          right: -20,
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'background.paper',
          color: 'primary.main',
          border: '2px solid',
          borderColor: 'primary.main',
          zIndex: 2,
          '&:hover': { bgcolor: 'primary.main', color: 'white' },
          '@media (max-width: 600px)': { right: 10 }
        }}
      >
        <ChevronRight />
      </IconButton>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, gap: 1 }}>
        {Array.from({ length: count }).map((_, index) => (
          <Box
            key={index}
            onClick={() => onGoTo(index)}
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              bgcolor: index === current ? 'primary.main' : 'rgba(0, 95, 115, 0.2)',
              cursor: 'pointer',
              transition: 'all 0.3s ease-in-out',
              '&:hover': { bgcolor: index === current ? 'primary.dark' : 'rgba(0, 95, 115, 0.4)' }
            }}
          />
        ))}
      </Box>
      <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary', mt: 2 }}>
        {current + 1} of {count}
      </Typography>
    </>
  );
}


