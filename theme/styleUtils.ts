import { TextStyle, ViewStyle, StyleSheet } from 'react-native';
import { theme } from './index';

/**
 * Type for named styles used in StyleSheet creation
 */
type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | any };

/**
 * Creates type-safe stylesheets
 * @param styles Object containing styles
 * @returns StyleSheet object with the provided styles
 */
export function createStyles<T extends NamedStyles<T> | NamedStyles<any>>(
  styles: T | NamedStyles<T>
): T {
  return StyleSheet.create(styles);
}

/**
 * Applies a typography style from theme with optional additional styles
 * @param style Typography style key from theme
 * @param additionalStyles Additional text styles to apply
 * @returns Combined text style
 */
export function applyTextStyle(style: keyof typeof theme.typography, additionalStyles: TextStyle = {}) {
  return {
    ...theme.typography[style],
    ...additionalStyles,
  };
}

/**
 * Color type and shade definitions for type safety
 */
type ColorType = keyof typeof theme.colors;
type PrimaryShade = keyof typeof theme.colors.primary;
type NeutralShade = keyof typeof theme.colors.neutral;
type SemanticShade = keyof typeof theme.colors.semantic;

/**
 * Gets colors from the theme with type safety
 * @param type Color type (primary, neutral, semantic, etc)
 * @param shade Specific shade within the color type
 * @returns Color as a string (hex code)
 */
export function getColor(type: 'primary', shade: PrimaryShade): string;
export function getColor(type: 'neutral', shade: NeutralShade): string;
export function getColor(type: 'semantic', shade: SemanticShade): string;
export function getColor(type: ColorType, shade?: any): string {
  if (shade === undefined) {
    return theme.colors[type] as unknown as string;
  }
  return theme.colors[type][shade as keyof (typeof theme.colors)[typeof type]];
}

// Helper components for common UI elements
export const commonStyles = createStyles({
  // Buttons
  primaryButton: {
    ...theme.components.button.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    ...theme.components.button.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    ...theme.typography.body1,
    color: theme.colors.neutral[6],
  },
  secondaryButtonText: {
    ...theme.typography.body1,
    color: theme.colors.primary[1],
  },
  
  // Inputs
  input: {
    ...theme.components.input,
  },
  inputLabel: {
    ...theme.typography.body3,
    color: theme.colors.neutral[2],
    marginBottom: 4,
  },
  
  // Cards
  card: {
    ...theme.components.card,
  },
  
  // Containers
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutral[6],
    padding: 16,
  },
  
  // Utility
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex1: {
    flex: 1,
  },
  mb16: {
    marginBottom: 16,
  },
  mt16: {
    marginTop: 16,
  },
  mr8: {
    marginRight: 8,
  },
  ml8: {
    marginLeft: 8,
  },
  p16: {
    padding: 16,
  },
});

// Export theme for direct access
export { theme };
