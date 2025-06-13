import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle
} from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';

interface RadioOption {
  label: string;
  value: string | number;
}

interface RadioProps {
  options: RadioOption[];
  selectedValue?: string | number;
  onValueChange: (value: string | number) => void;
  label?: string;
  disabled?: boolean;
  error?: string;
  direction?: 'vertical' | 'horizontal';
  containerStyle?: StyleProp<ViewStyle>;
  optionStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export const Radio = ({
  options,
  selectedValue,
  onValueChange,
  label,
  disabled = false,
  error,
  direction = 'vertical',
  containerStyle,
  optionStyle,
  labelStyle
}: RadioProps) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[
          theme.typography.label,
          styles.groupLabel,
          { color: theme.colors.neutral[2] },
          labelStyle
        ]}>
          {label}
        </Text>
      )}

      <View style={[
        styles.optionsContainer,
        direction === 'horizontal' && styles.horizontal
      ]}>
        {options.map((option, index) => {
          const isSelected = selectedValue === option.value;
          
          return (
            <TouchableOpacity
              key={option.value.toString()}
              style={[
                styles.option,
                direction === 'horizontal' && { marginRight: theme.spacing(2) },
                direction === 'vertical' && { marginBottom: theme.spacing(1) },
                optionStyle
              ]}
              disabled={disabled}
              onPress={() => onValueChange(option.value)}
              activeOpacity={0.7}
            >
              <View style={[
                styles.radio,
                {
                  borderColor: error ? 
                    theme.colors.semantic.error : 
                    isSelected ? 
                      theme.colors.primary[1] : 
                      theme.colors.neutral[4],
                  opacity: disabled ? 0.5 : 1
                }
              ]}>
                {isSelected && (
                  <View style={[
                    styles.radioInner,
                    { backgroundColor: theme.colors.primary[1] }
                  ]} />
                )}
              </View>
              <Text style={[
                theme.typography.body2,
                { 
                  color: disabled ? 
                    theme.colors.neutral[3] : 
                    theme.colors.neutral[1]
                }
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      
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
    marginVertical: 8,
  },
  groupLabel: {
    marginBottom: 8,
  },
  optionsContainer: {
    flexDirection: 'column',
  },
  horizontal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
});
