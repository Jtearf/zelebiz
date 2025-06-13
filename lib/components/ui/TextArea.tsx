import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInputProps
} from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';

interface TextAreaProps extends Omit<TextInputProps, 'style'> {
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  numberOfLines?: number;
  maxLength?: number;
  showCharacterCount?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export const TextArea = ({
  value,
  onChangeText,
  label,
  placeholder,
  error,
  numberOfLines = 4,
  maxLength,
  showCharacterCount = false,
  containerStyle,
  inputStyle,
  labelStyle,
  ...rest
}: TextAreaProps) => {
  const { theme } = useTheme();
  
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[
          theme.typography.label,
          styles.label,
          { color: theme.colors.neutral[2] },
          labelStyle
        ]}>
          {label}
        </Text>
      )}
      
      <View style={[
        styles.inputContainer,
        {
          borderColor: error ? theme.colors.semantic.error : theme.colors.neutral[4],
          borderRadius: theme.spacing(1),
          borderWidth: 1,
          minHeight: 24 * numberOfLines + 16, // Approximate line height plus padding
        }
      ]}>
        <TextInput
          style={[
            styles.input,
            theme.typography.body1,
            {
              color: theme.colors.neutral[1],
              textAlignVertical: 'top',
              paddingVertical: theme.spacing(1),
              paddingHorizontal: theme.spacing(1.5),
            },
            inputStyle
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.neutral[3]}
          multiline
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          {...rest}
        />
      </View>
      
      <View style={styles.footer}>
        {error && (
          <Text style={[
            styles.errorText,
            { color: theme.colors.semantic.error }
          ]}>
            {error}
          </Text>
        )}
        
        {showCharacterCount && maxLength && (
          <Text style={[
            styles.charCount,
            theme.typography.caption,
            { color: theme.colors.neutral[3] },
            error ? { flex: 1, textAlign: 'right' } : undefined
          ]}>
            {value.length}/{maxLength}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    marginBottom: 8,
  },
  inputContainer: {
    width: '100%',
    overflow: 'hidden',
  },
  input: {
    width: '100%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  errorText: {
    fontSize: 12,
    flex: 1,
  },
  charCount: {
    fontSize: 12,
    textAlign: 'right',
  },
});
