import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  StyleProp,
  ViewStyle,
  TextStyle
} from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';

interface ToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
  error?: string;
  size?: 'small' | 'medium' | 'large';
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export const Toggle = ({
  value,
  onValueChange,
  label,
  disabled = false,
  error,
  size = 'medium',
  containerStyle,
  labelStyle
}: ToggleProps) => {
  const { theme } = useTheme();
  
  // Dynamic sizing
  const getSizes = () => {
    switch (size) {
      case 'small':
        return {
          toggleWidth: 36,
          toggleHeight: 20,
          thumbSize: 16,
          thumbOffset: 16
        };
      case 'large':
        return {
          toggleWidth: 56,
          toggleHeight: 30,
          thumbSize: 26,
          thumbOffset: 26
        };
      default: // medium
        return {
          toggleWidth: 46,
          toggleHeight: 24, 
          thumbSize: 20,
          thumbOffset: 22
        };
    }
  };
  
  const sizes = getSizes();
  
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.mainContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => !disabled && onValueChange(!value)}
          disabled={disabled}
          style={[
            styles.toggleContainer,
            {
              width: sizes.toggleWidth,
              height: sizes.toggleHeight,
              backgroundColor: value 
                ? theme.colors.primary[1]
                : theme.colors.neutral[4],
              borderRadius: sizes.toggleHeight / 2,
              opacity: disabled ? 0.5 : 1,
              borderColor: error ? theme.colors.semantic.error : 'transparent',
              borderWidth: error ? 1 : 0,
            }
          ]}
        >
          <View
            style={[
              styles.thumb,
              {
                width: sizes.thumbSize,
                height: sizes.thumbSize,
                borderRadius: sizes.thumbSize / 2,
                transform: [
                  {
                    translateX: value ? sizes.thumbOffset : 2
                  }
                ]
              }
            ]}
          />
        </TouchableOpacity>
        
        {label && (
          <Text
            style={[
              styles.label,
              theme.typography.body2,
              { color: disabled ? theme.colors.neutral[3] : theme.colors.neutral[1] },
              labelStyle
            ]}
          >
            {label}
          </Text>
        )}
      </View>
      
      {error && (
        <Text
          style={[
            styles.errorText,
            { color: theme.colors.semantic.error }
          ]}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleContainer: {
    padding: 2,
    justifyContent: 'center',
  },
  thumb: {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  label: {
    marginLeft: 10,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  }
});
