import { Theme } from './index';

/**
 * Type augmentation for global modules
 */
declare module 'react-native' {
  // We're not currently extending these interfaces
  // If custom props are needed in the future, add them here
}

/**
 * Type augmentation for React Navigation
 */
declare module '@react-navigation/native' {
  /**
   * Enhanced type definition for useTheme hook
   */
  export function useTheme(): {
    colors: {
      primary: string;
      background: string;
      card: string;
      text: string;
      border: string;
      notification: string;
    };
  };
}
