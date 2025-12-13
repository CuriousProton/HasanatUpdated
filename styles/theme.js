// styles/theme.js
// Design system: colors, spacing, typography

export const colors = {
  // Category colors - Enhanced vibrant versions
  salah: '#2563eb',      // Vibrant blue
  quran: '#059669',      // Rich emerald green
  charity: '#f59e0b',    // Bright amber
  dhikr: '#db2777',      // Bold pink
  fasting: '#7c3aed',    // Deep purple
  kindness: '#0891b2',   // Cyan
  references: '#059669',
  
  // UI colors
  primary: '#3b82f6',
  secondary: '#10b981',
  tertiary: '#f59e0b',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  
  // Text colors
  text: {
    primary: '#1f2937',
    secondary: '#6b7280',
    tertiary: '#9ca3af',
    light: '#d1d5db',
    white: '#ffffff',
  },
  
  // Background colors
  background: {
    primary: '#ffffff',
    secondary: '#f9fafb',
    tertiary: '#f3f4f6',
    dark: '#1f2937',
  },
  
  // Border colors
  border: {
    light: '#e5e7eb',
    medium: '#d1d5db',
    dark: '#9ca3af',
  },
  
  // Reward colors
  reward: {
    gold: '#f59e0b',
    green: '#10b981',
    blue: '#3b82f6',
    purple: '#8b5cf6',
  },
  
  // Prayer time colors (based on time of day)
  prayers: {
    fajr: '#fda4af',      // Soft pink/rose - dawn (early morning light)
    dhuhr: '#fbbf24',    // Bright golden yellow - midday sun
    asr: '#fb923c',       // Warm orange - afternoon sun
    maghrib: '#f97316',   // Deep orange-red - dusk/sunset
    isha: '#4c1d95',      // Deep indigo/purple - night sky
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const fontSize = {
  xs: 11,
  sm: 12,
  md: 14,
  base: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
  massive: 48,
};

export const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};