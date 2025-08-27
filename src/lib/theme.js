// src/lib/theme.js
import { createTheme } from '@mui/material/styles';

export const createCustomTheme = (themeConfig = {}) => {
  const {
    mode = 'light',
    primaryColor = '#FFE347',
    secondaryColor = '#005F73',
    tertiaryColor = '#FF90AD',
    warningColor = '#FF90AD',
    backgroundDefault = '#F5F5F5',
    backgroundPaper = '#FFFFFF',
  } = themeConfig;

  return createTheme({
    palette: {
      mode,
      primary: {
        main: primaryColor,
        contrastText: '#fff',
      },
      secondary: {
        main: secondaryColor,
        contrastText: '#005F73',
      },
      tertiary: {
        main: tertiaryColor,
        contrastText: '#1A1A1A',
      },
      warning: {
        main: warningColor,
        contrastText: '#fff',
      },
      background: {
        default: backgroundDefault,
        paper: backgroundPaper,
      },
      text: {
        primary: '#222222',
        secondary: primaryColor,
      },
      info: {
        main: primaryColor,
        contrastText: '#fff',
      },
      success: {
        main: secondaryColor,
        contrastText: '#005F73',
      },
      error: {
        main: warningColor,
        contrastText: '#fff',
      },
    },
    typography: {
      fontFamily: '"Gilroy", sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: 'clamp(2rem, 5vw, 4rem)',
        color: primaryColor,
      },
      h2: {
        fontWeight: 600,
        fontSize: 'clamp(1.5rem, 4vw, 3rem)',
        color: primaryColor,
      },
      h3: {
        fontWeight: 600,
        fontSize: 'clamp(1.25rem, 3vw, 2rem)',
        color: primaryColor,
      },
      h4: {
        fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
        color: primaryColor,
      },
      h5: {
        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
        color: primaryColor,
      },
      body1: {
        fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
        color: '#222222',
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
          containedPrimary: {
            backgroundColor: primaryColor,
            color: '#fff',
            '&:hover': {
              backgroundColor: '#004d5a',
            },
          },
          containedSecondary: {
            backgroundColor: secondaryColor,
            color: '#005F73',
            '&:hover': {
              backgroundColor: '#e6d13f',
            },
          },
          containedWarning: {
            backgroundColor: warningColor,
            color: '#fff',
            '&:hover': {
              backgroundColor: '#e67a99',
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
                : '0 4px 6px -1px rgba(0, 95, 115, 0.1), 0 2px 4px -1px rgba(0, 95, 115, 0.06)',
            backgroundColor: backgroundPaper,
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
            backgroundColor: primaryColor,
            color: '#fff',
            boxShadow: mode === 'dark'
                ? '0 2px 4px -1px rgba(0, 0, 0, 0.4)'
                : '0 2px 4px -1px rgba(0, 95, 115, 0.2)',
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          standardWarning: {
            backgroundColor: warningColor,
            color: '#fff',
          },
        },
      },
    },
  });
};

const theme = createCustomTheme();
export default theme;