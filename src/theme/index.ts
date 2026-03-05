// src/theme/index.ts
export const Colors = {
  ink: '#0d1117',
  ink2: '#1c2333',
  cream: '#faf8f4',
  paper: '#f2ede4',
  gold: '#c8a84b',
  gold2: '#e8d08a',
  teal: '#14766e',
  teal2: '#1da096',
  muted: '#8a8070',
  border: '#e4ddd0',
  white: '#ffffff',
  red: '#c94040',
  green: '#28764a',
  overlay: 'rgba(13,17,23,0.6)',
};

export const Fonts = {
  display: 'Georgia', // closest to Cormorant on RN
  body: 'System',
  mono: 'Courier New',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 999,
};

export const Shadow = {
  soft: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  strong: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
};
