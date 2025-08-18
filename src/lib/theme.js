import { createTheme } from '@mui/material/styles';

export const createCustomTheme = (themeConfig = {}) => {
  const { mode = 'light', primaryColor = '#1976d2', secondaryColor = '#dc004e' } = themeConfig;
  
  return createTheme({
    palette: {
      mode,
      primary: {
        main: primaryColor,
      },
      secondary: {
        main: secondaryColor,
      },
      background: {
        default: mode === 'dark' ? '#121212' : '#f5f5f5',
        paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Bemio", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: 'clamp(2rem, 5vw, 4rem)',
        fontStyle: 'italic',
      },
      h2: {
        fontWeight: 600,
        fontSize: 'clamp(1.5rem, 4vw, 3rem)',
        fontStyle: 'italic',
      },
      h3: {
        fontWeight: 600,
        fontSize: 'clamp(1.25rem, 3vw, 2rem)',
        fontStyle: 'italic',
      },
      h4: {
        fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
        fontStyle: 'italic',
      },
      h5: {
        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
        fontStyle: 'italic',
      },
      body1: {
        fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
        fontStyle: 'italic',
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
            padding: '8px 24px',
            '@media (max-width: 600px)': {
              padding: '6px 16px',
              fontSize: '0.875rem',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: mode === 'dark' 
              ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)'
              : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingLeft: '16px',
            paddingRight: '16px',
            '@media (max-width: 600px)': {
              paddingLeft: '12px',
              paddingRight: '12px',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: mode === 'dark'
              ? '0 2px 4px -1px rgba(0, 0, 0, 0.4)'
              : '0 2px 4px -1px rgba(0, 0, 0, 0.2)',
          },
        },
      },
    },
  });
};

// Default theme
const theme = createCustomTheme();
export default theme;
