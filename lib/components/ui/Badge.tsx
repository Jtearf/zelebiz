import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';

type BadgeType = 'primary' | 'success' | 'error' | 'warning' | 'info';
type BadgeSize = 'small' | 'medium' | 'large';

interface BadgeProps {
  content?: string | number;
  type?: BadgeType;
  size?: BadgeSize;
  dot?: boolean;
  outline?: boolean;
  children?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Badge = ({
  content,
  type = 'primary',
  size = 'medium',
  dot = false,
  outline = false,
  children,
  containerStyle,
  textStyle,
}: BadgeProps) => {
  const { theme } = useTheme();
  
  const getBadgeColor = () => {
    switch (type) {
      case 'success':
        return theme.colors.semantic.success;
      case 'error':
        return theme.colors.semantic.error;
      case 'warning':
        return theme.colors.semantic.warning;
      case 'info':
        return theme.colors.semantic.info;
      default: // primary
        return theme.colors.primary[1];
    }
  };
  
  const getSizeStyles = () => {
    if (dot) {
      switch (size) {
        case 'small':
          return {
            width: 6,
            height: 6,
          };
        case 'large':
          return {
            width: 12,
            height: 12,
          };
        default: // medium
          return {
            width: 8,
            height: 8,
          };
      }
    } else {
      switch (size) {
        case 'small':
          return {
            height: 16,
            paddingHorizontal: 4,
            fontSize: 10,
            minWidth: 16,
          };
        case 'large':
          return {
            height: 24,
            paddingHorizontal: 8,
            fontSize: 14,
            minWidth: 24,
          };
        default: // medium
          return {
            height: 20,
            paddingHorizontal: 6,
            fontSize: 12,
            minWidth: 20,
          };
      }
    }
  };
  
  const badgeColor = getBadgeColor();
  const sizeStyles = getSizeStyles();
  
  const renderBadge = () => (
    <View
      style={[
        styles.badge,
        dot ? styles.dotBadge : styles.contentBadge,
        {
          backgroundColor: outline ? theme.colors.neutral[6] : badgeColor,
          borderColor: badgeColor,
          borderWidth: outline ? 1 : 0,
          borderRadius: dot ? (sizeStyles.width || 8) / 2 : 100,
          width: dot ? sizeStyles.width || 8 : undefined,
          height: dot ? sizeStyles.height || 8 : sizeStyles.height,
          minWidth: dot ? undefined : sizeStyles.minWidth,
          paddingHorizontal: dot ? undefined : sizeStyles.paddingHorizontal,
        },
        containerStyle,
      ]}
    >
      {!dot && content != null && (
        <Text
          style={[
            styles.text,
            { 
              color: outline ? badgeColor : theme.colors.neutral[6],
              fontSize: sizeStyles.fontSize,
              fontFamily: theme.fontConfig.poppins.medium,
            },
            textStyle,
          ]}
        >
          {content}
        </Text>
      )}
    </View>
  );
  
  if (children) {
    return (
      <View style={styles.container}>
        {children}
        <View style={styles.badgeWrapper}>{renderBadge()}</View>
      </View>
    );
  }
  
  return renderBadge();
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  badgeWrapper: {
    position: 'absolute',
    top: -4,
    right: -8,
    zIndex: 10,
  },
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotBadge: {
    // Dot badges are just circles with no content
  },
  contentBadge: {
    flexDirection: 'row',
  },
  text: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 12,
    overflow: 'hidden',
  },
});
