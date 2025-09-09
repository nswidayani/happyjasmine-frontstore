// Design tokens and constants for consistent styling

export const COLORS = {
  primary: {
    main: '#005F73',
    light: '#338BA8',
    dark: '#003D4D',
    contrastText: '#FFFFFF'
  },
  secondary: {
    main: '#FFE347',
    light: '#FFF176',
    dark: '#FBC02D',
    contrastText: '#000000'
  },
  warning: {
    main: '#FF90AD',
    light: '#FFB3C1',
    dark: '#E87195'
  },
  background: {
    default: '#F5F5F5',
    paper: '#FFFFFF'
  }
};

export const SPACING = {
  xs: 1,      // 8px
  sm: 1.5,    // 12px
  md: 2,      // 16px
  lg: 3,      // 24px
  xl: 4,      // 32px
  xxl: 6,     // 48px
  xxxl: 8     // 64px
};

export const BORDER_RADIUS = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  xxl: '32px',
  round: '50%'
};

export const SHADOWS = {
  sm: '0 2px 8px rgba(0, 0, 0, 0.1)',
  md: '0 4px 16px rgba(0, 0, 0, 0.15)',
  lg: '0 8px 32px rgba(0, 0, 0, 0.2)',
  xl: '0 16px 48px rgba(0, 0, 0, 0.25)'
};

export const TRANSITIONS = {
  fast: '0.15s cubic-bezier(0.4, 0, 0.2, 1)',
  normal: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '0.5s cubic-bezier(0.4, 0, 0.2, 1)'
};

export const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536
};

// Common component styles
export const COMPONENT_STYLES = {
  card: {
    borderRadius: BORDER_RADIUS.lg,
    boxShadow: SHADOWS.sm,
    border: '1px solid rgba(0, 95, 115, 0.1)',
    transition: TRANSITIONS.normal,
    '&:hover': {
      boxShadow: SHADOWS.md,
      transform: 'translateY(-2px)'
    }
  },

  button: {
    borderRadius: BORDER_RADIUS.xl,
    fontWeight: 600,
    textTransform: 'none',
    transition: TRANSITIONS.normal
  },

  input: {
    '& .MuiOutlinedInput-root': {
      borderRadius: BORDER_RADIUS.md,
      transition: TRANSITIONS.fast,
      '&:hover fieldset': {
        borderColor: COLORS.primary.main
      },
      '&.Mui-focused fieldset': {
        borderColor: COLORS.primary.main
      }
    }
  },

  glassmorphism: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: BORDER_RADIUS.xl
  }
};

// Admin-specific styles
export const ADMIN_STYLES = {
  section: {
    p: 3,
    mb: 3,
    borderRadius: BORDER_RADIUS.lg,
    border: '1px solid rgba(0, 95, 115, 0.1)'
  },

  preview: {
    p: 2,
    border: '1px solid rgba(0, 95, 115, 0.2)',
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: 'background.default'
  },

  formField: {
    mb: 2,
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: COLORS.primary.main
      }
    }
  }
};

// Animation keyframes (for CSS-in-JS)
export const ANIMATIONS = {
  float: `
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
    }
  `,
  pulse: `
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.7; transform: scale(1.2); }
    }
  `,
  fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `
};

// Common validation patterns
export const VALIDATION = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  url: /^https?:\/\/.+/,
  phone: /^[\+]?[1-9][\d]{0,15}$/
};

// File upload configurations
export const UPLOAD_CONFIG = {
  image: {
    accept: 'image/*',
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
  },
  video: {
    accept: 'video/*',
    maxSize: 50 * 1024 * 1024, // 50MB
    allowedTypes: ['video/mp4', 'video/webm', 'video/ogg']
  },
  document: {
    accept: '.pdf,.doc,.docx,.txt',
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
  }
};

// API endpoints and configurations
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  storageBucket: 'assets',
  contentTable: 'content',
  productsTable: 'products',
  categoriesTable: 'product_categories',
  locationsTable: 'locations'
};

export default {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  TRANSITIONS,
  BREAKPOINTS,
  COMPONENT_STYLES,
  ADMIN_STYLES,
  ANIMATIONS,
  VALIDATION,
  UPLOAD_CONFIG,
  API_CONFIG
};