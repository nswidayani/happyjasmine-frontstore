import { Box } from '@mui/material';

export default function AnimatedSpacer() {
  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '80px', md: '120px' },
        background: 'linear-gradient(135deg, rgba(0, 95, 115, 0.05) 0%, rgba(255, 227, 71, 0.05) 100%)',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
          animation: 'wave 3s ease-in-out infinite',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(0, 95, 115, 0.3) 20%, rgba(255, 227, 71, 0.3) 80%, transparent 100%)',
          animation: 'pulse 2s ease-in-out infinite',
        }
      }}
    >
      {/* Floating elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '20%',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'rgba(0, 95, 115, 0.6)',
          animation: 'floatUp 4s ease-in-out infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          left: '70%',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: 'rgba(255, 227, 71, 0.6)',
          animation: 'floatUp 3s ease-in-out infinite reverse',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '40%',
          left: '85%',
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          background: 'rgba(0, 95, 115, 0.4)',
          animation: 'floatUp 5s ease-in-out infinite',
        }}
      />

      <style jsx>{`
        @keyframes wave {
          0%, 100% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scaleX(0.8);
          }
          50% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scaleX(1.2);
          }
        }

        @keyframes floatUp {
          0%, 100% {
            transform: translateY(0px);
            opacity: 0.4;
          }
          50% {
            transform: translateY(-20px);
            opacity: 1;
          }
        }
      `}</style>
    </Box>
  );
}