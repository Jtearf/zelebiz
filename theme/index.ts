import { DefaultTheme } from '@react-navigation/native';
import { Platform, TextStyle, ViewStyle } from 'react-native';

// Font configuration
const fontConfig = {
  poppins: {
    regular: 'Poppins-Regular',
    medium: 'Poppins-Medium',
    semibold: 'Poppins-SemiBold',
    default: 'Poppins', // Default fallback
  },
};

// Color palette
export const colors = {
  // Primary colors
  primary: {
    1: '#281C9D',
    2: '#5655B9',
    3: '#A8A3D7',
    4: '#F2F1F9',
  },
  // Neutral colors
  neutral: {
    1: '#343434',
    2: '#898989',
    3: '#989898',
    4: '#CACACA',
    5: '#E0E0E0',
    6: '#FFFFFF',
  },
  // Semantic colors
  semantic: {
    error: '#FF4267',
    info: '#0890FE',
    warning: '#FFAF2A',
    success: '#52D5BA',
    highlight: '#FB6B18',
  },
  // Common
  background: '#FFFFFF',
  text: '#343434',
};

/**
 * Typography styles for the application
 * Includes headings, body text, captions and other text styles
 */
export const typography = {
  // Headings
  h1: {
    fontFamily: fontConfig.poppins.semibold,
    fontSize: 32,
    lineHeight: 40,
    color: colors.neutral[1],
  },
  h2: {
    fontFamily: fontConfig.poppins.semibold,
    fontSize: 28,
    lineHeight: 36,
    color: colors.neutral[1],
  },
  h3: {
    fontFamily: fontConfig.poppins.semibold,
    fontSize: 24,
    lineHeight: 32,
    color: colors.neutral[1],
  },
  h4: {
    fontFamily: fontConfig.poppins.semibold,
    fontSize: 20,
    lineHeight: 28,
    color: colors.neutral[1],
  },
  h5: {
    fontFamily: fontConfig.poppins.semibold,
    fontSize: 18,
    lineHeight: 24,
    color: colors.neutral[1],
  },
  h6: {
    fontFamily: fontConfig.poppins.semibold,
    fontSize: 16,
    lineHeight: 22,
    color: colors.neutral[1],
  },
  
  // Body text
  body1: {
    fontFamily: fontConfig.poppins.regular,
    fontSize: 16,
    lineHeight: 24,
    color: colors.neutral[1],
  },
  body2: {
    fontFamily: fontConfig.poppins.regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.neutral[2],
  },
  
  body3: {
    fontFamily: fontConfig.poppins.regular,
    fontSize: 13,
    lineHeight: 18,
    color: colors.neutral[2],
  },
  
  // Captions and overlines
  caption: {
    fontFamily: fontConfig.poppins.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.neutral[3],
  },
  overline: {
    fontFamily: fontConfig.poppins.medium,
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 1.5,
    color: colors.neutral[3],
    textTransform: 'uppercase' as const,
  },
  
  // Buttons
  button: {
    fontFamily: fontConfig.poppins.medium,
    fontSize: 16,
    lineHeight: 24,
    textTransform: 'none' as const,
  },
  
  // Inputs
  input: {
    fontFamily: fontConfig.poppins.regular,
    fontSize: 16,
    lineHeight: 24,
  },
  
  // Labels
  label: {
    fontFamily: fontConfig.poppins.medium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.neutral[2],
  },
  
  // Helper text
  helperText: {
    fontFamily: fontConfig.poppins.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.neutral[3],
  },
};

/**
 * Component-specific styles
 * Defines base styling for UI components like buttons, inputs, and cards
 */
export const components = {
  button: {
    primary: {
      backgroundColor: colors.primary[1],
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 24,
    },
    secondary: {
      backgroundColor: colors.primary[4],
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 24,
    },
  },
  input: {
    borderWidth: 1,
    borderColor: colors.neutral[4],
    borderRadius: 8,
    padding: 12,
    fontFamily: fontConfig.poppins.regular,
    fontSize: 16,
    color: colors.neutral[1],
  },
  card: {
    backgroundColor: colors.neutral[6],
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
};

/**
 * Navigation theme configuration
 * Extends React Navigation's DefaultTheme with our custom colors
 */
export const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary[1],
    background: colors.neutral[6],
    card: colors.neutral[6],
    text: colors.neutral[1],
    border: colors.neutral[5],
    notification: colors.semantic.error,
  },
};

// Theme type
export type Theme = {
  colors: typeof colors;
  typography: typeof typography;
  components: typeof components;
  fontConfig: typeof fontConfig;
  spacing: (multiplier?: number) => number;
  isAndroid: boolean;
  isIOS: boolean;
};

// Export theme object
export const theme: Theme = {
  colors,
  typography,
  components,
  fontConfig,
  spacing: (multiplier = 1) => 8 * multiplier,
  isAndroid: Platform.OS === 'android',
  isIOS: Platform.OS === 'ios',
};

export default theme;
