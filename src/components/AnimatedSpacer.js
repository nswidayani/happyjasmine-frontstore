'use client';

import { Box } from '@mui/material';

export default function AnimatedSpacer() {
  return (
    <Box
      sx={{
        height: { xs: 60, md: 100 },
        background: 'linear-gradient(135deg, rgba(0, 95, 115, 0.1) 0%, rgba(255, 227, 71, 0.1) 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(0, 95, 115, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 227, 71, 0.1) 0%, transparent 50%)',
          animation: 'float 6s ease-in-out infinite',
        },
        '@keyframes float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      }}
    />
  );
}