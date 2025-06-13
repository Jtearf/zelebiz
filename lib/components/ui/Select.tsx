import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  StyleProp,
  ViewStyle,
  TextStyle,
  Dimensions
} from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';

interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectProps {
  options: SelectOption[];
  selectedValue?: string | number;
  onValueChange: (value: string | number) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  selectStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export const Select = ({
  options,
  selectedValue,
  onValueChange,
  placeholder = 'Select an option',
  label,
  disabled = false,
  error,
  containerStyle,
  selectStyle,
  labelStyle
}: SelectProps) => {
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  
  const selectedOption = options.find(option => option.value === selectedValue);
  
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

      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.selectContainer,
          {
            borderColor: error ? 
              theme.colors.semantic.error : 
              theme.colors.neutral[4],
            borderRadius: theme.spacing(1),
            paddingVertical: theme.spacing(1.5),
            paddingHorizontal: theme.spacing(1.5),
            opacity: disabled ? 0.5 : 1,
          },
          selectStyle
        ]}
        onPress={() => !disabled && setModalVisible(true)}
        disabled={disabled}
      >
        <Text style={[
          selectedOption ? theme.typography.body1 : styles.placeholder,
          { 
            color: selectedOption ? 
              theme.colors.neutral[1] : 
              theme.colors.neutral[3],
            flex: 1
          }
        ]}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        
        <Text style={[
          styles.arrow,
          { color: theme.colors.neutral[3] }
        ]}>
          ▼
        </Text>
      </TouchableOpacity>

      {error && (
        <Text style={[
          styles.errorText,
          { color: theme.colors.semantic.error }
        ]}>
          {error}
        </Text>
      )}

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View 
            style={[
              styles.modalContent,
              {
                backgroundColor: theme.colors.neutral[6],
                borderRadius: theme.spacing(1),
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }
            ]}
            onStartShouldSetResponder={() => true}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            <Text style={[
              styles.modalTitle,
              theme.typography.h6,
              { color: theme.colors.neutral[1] }
            ]}>
              {placeholder}
            </Text>
            
            <FlatList
              data={options}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    {
                      paddingVertical: theme.spacing(1.5),
                      paddingHorizontal: theme.spacing(2),
                      backgroundColor: 
                        item.value === selectedValue ? 
                          theme.colors.primary[4] : 
                          'transparent',
                    }
                  ]}
                  onPress={() => {
                    onValueChange(item.value);
                    setModalVisible(false);
                  }}
                >
                  <Text style={[
                    theme.typography.body1,
                    { 
                      color: item.value === selectedValue ? 
                        theme.colors.primary[1] : 
                        theme.colors.neutral[1] 
                    }
                  ]}>
                    {item.label}
                  </Text>
                  
                  {item.value === selectedValue && (
                    <Text style={{ color: theme.colors.primary[1] }}>✓</Text>
                  )}
                </TouchableOpacity>
              )}
              style={styles.optionsList}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: '100%',
  },
  label: {
    marginBottom: 8,
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  placeholder: {
    fontSize: 16,
  },
  arrow: {
    fontSize: 12,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.85,
    maxWidth: 400,
    maxHeight: '80%',
  },
  modalTitle: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  optionsList: {
    flexGrow: 0,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
