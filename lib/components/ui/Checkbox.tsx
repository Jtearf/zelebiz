import React from 'react';
import { 
  View, 
  TouchableOpacity, 
  StyleSheet, 
  Text, 
  StyleProp, 
  ViewStyle,
  TextStyle 
} from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';

interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
  label?: string;
  disabled?: boolean;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export const Checkbox = ({
  checked,
  onPress,
  label,
  disabled = false,
  error,
  containerStyle,
  labelStyle
}: CheckboxProps) => {
  const { theme } = useTheme();
  
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        disabled={disabled}
        style={[
          styles.checkboxContainer,
          {
            borderColor: error 
              ? theme.colors.semantic.error 
              : checked 
                ? theme.colors.primary[1] 
                : theme.colors.neutral[4],
            backgroundColor: checked 
              ? theme.colors.primary[1] 
              : 'transparent',
            opacity: disabled ? 0.5 : 1,
          }
        ]}
      >
        {checked && (
          <Text style={[
            styles.checkmark, 
            { color: theme.colors.neutral[6] }
          ]}>✓</Text>
        )}
      </TouchableOpacity>
      
      {label && (
        <TouchableOpacity 
          activeOpacity={0.7}
          onPress={onPress}
          disabled={disabled}
          style={styles.labelContainer}
        >
          <Text style={[
            theme.typography.body2, 
            { color: disabled ? theme.colors.neutral[3] : theme.colors.neutral[1] },
            labelStyle
          ]}>
            {label}
          </Text>
        </TouchableOpacity>
      )}
      
      {error && (
        <Text style={[
          styles.errorText,
          { color: theme.colors.semantic.error }
        ]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
  checkboxContainer: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  labelContainer: {
    flexShrink: 1,
    marginLeft: 8,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkmark: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 28,
  },
});
