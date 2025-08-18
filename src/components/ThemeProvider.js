'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { createCustomTheme } from '../lib/theme';

// Create emotion cache
function createEmotionCache() {
  return createCache({ key: 'css' });
}

const clientSideEmotionCache = createEmotionCache();

// Theme Context
const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeContextProvider');
  }
  return context;
};

export default function ClientThemeProvider({ children }) {
  const [emotionCache] = useState(clientSideEmotionCache);
  const [themeConfig, setThemeConfig] = useState({
    mode: 'light',
    primaryColor: '#1976d2',
    secondaryColor: '#dc004e',
  });
  const [theme, setTheme] = useState(() => createCustomTheme(themeConfig));

  const updateTheme = (newConfig) => {
    setThemeConfig(newConfig);
    setTheme(createCustomTheme(newConfig));
  };

  useEffect(() => {
    setTheme(createCustomTheme(themeConfig));
  }, [themeConfig]);

  return (
    <ThemeContext.Provider value={{ themeConfig, updateTheme }}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </CacheProvider>
    </ThemeContext.Provider>
  );
}
