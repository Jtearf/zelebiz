import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'default' | 'bordered' | 'elevated';
  padding?: number;
}

export const Card = ({ 
  children, 
  style, 
  variant = 'default',
  padding
}: CardProps) => {
  const { theme } = useTheme();
  
  return (
    <View style={[
      styles.card,
      {
        backgroundColor: theme.colors.neutral[6],
        borderRadius: theme.spacing(1.5),
        padding: padding !== undefined ? padding : theme.spacing(2),
        ...(variant === 'bordered' && { 
          borderWidth: 1,
          borderColor: theme.colors.neutral[5],
        }),
        ...(variant === 'elevated' && {
          shadowColor: theme.isIOS ? '#000' : undefined,
          shadowOffset: theme.isIOS ? { width: 0, height: 2 } : undefined,
          shadowOpacity: theme.isIOS ? 0.1 : undefined,
          shadowRadius: theme.isIOS ? 4 : undefined,
          elevation: theme.isAndroid ? 3 : undefined,
        }),
      },
      style
    ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
});
