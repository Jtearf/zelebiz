import React from 'react';
import { 
  View, 
  Modal as RNModal, 
  StyleSheet, 
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
  Text
} from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  containerStyle?: StyleProp<ViewStyle>;
  closeOnBackdropPress?: boolean;
}

export const Modal = ({
  visible,
  onClose,
  children,
  title,
  containerStyle,
  closeOnBackdropPress = true
}: ModalProps) => {
  const { theme } = useTheme();

  return (
    <RNModal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback 
        onPress={closeOnBackdropPress ? onClose : undefined}
      >
        <View style={[
          styles.overlay,
          { backgroundColor: 'rgba(0,0,0,0.5)' }
        ]}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={[
              styles.container,
              {
                backgroundColor: theme.colors.neutral[6],
                borderRadius: theme.spacing(1.5),
                paddingVertical: theme.spacing(2),
                paddingHorizontal: theme.spacing(2),
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              },
              containerStyle
            ]}>
              <View style={styles.header}>
                {title && (
                  <Text style={[
                    styles.title,
                    theme.typography.h5,
                    { color: theme.colors.neutral[1] }
                  ]}>
                    {title}
                  </Text>
                )}
                <TouchableOpacity 
                  onPress={onClose} 
                  style={styles.closeButton}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Text style={{ 
                    fontSize: 20,
                    color: theme.colors.neutral[3] 
                  }}>✕</Text>
                </TouchableOpacity>
              </View>
              <View>
                {children}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    maxWidth: 400,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
});
