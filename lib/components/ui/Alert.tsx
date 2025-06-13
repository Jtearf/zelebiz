import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  Animated,
} from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  type?: AlertType;
  title?: string;
  message: string;
  closable?: boolean;
  autoClose?: boolean;
  duration?: number;
  onClose?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  messageStyle?: StyleProp<TextStyle>;
}

export const Alert = ({
  type = 'info',
  title,
  message,
  closable = true,
  autoClose = false,
  duration = 5000,
  onClose,
  containerStyle,
  titleStyle,
  messageStyle,
}: AlertProps) => {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(true);
  const fadeAnim = new Animated.Value(1);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        close();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration]);

  const getAlertColors = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: theme.colors.semantic.success + '20', // 20% opacity
          borderColor: theme.colors.semantic.success,
          iconColor: theme.colors.semantic.success,
          textColor: theme.colors.neutral[1],
          icon: '✓',
        };
      case 'error':
        return {
          backgroundColor: theme.colors.semantic.error + '20',
          borderColor: theme.colors.semantic.error,
          iconColor: theme.colors.semantic.error,
          textColor: theme.colors.neutral[1],
          icon: '✕',
        };
      case 'warning':
        return {
          backgroundColor: theme.colors.semantic.warning + '20',
          borderColor: theme.colors.semantic.warning,
          iconColor: theme.colors.semantic.warning,
          textColor: theme.colors.neutral[1],
          icon: '⚠',
        };
      default: // info
        return {
          backgroundColor: theme.colors.semantic.info + '20',
          borderColor: theme.colors.semantic.info,
          iconColor: theme.colors.semantic.info,
          textColor: theme.colors.neutral[1],
          icon: 'ℹ',
        };
    }
  };

  const alertColors = getAlertColors();

  const close = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
      if (onClose) onClose();
    });
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: alertColors.backgroundColor,
          borderColor: alertColors.borderColor,
          borderLeftWidth: 4,
          borderRadius: theme.spacing(1),
          opacity: fadeAnim,
        },
        containerStyle,
      ]}
    >
      <View style={styles.iconContainer}>
        <Text
          style={[
            styles.icon,
            { color: alertColors.iconColor },
          ]}
        >
          {alertColors.icon}
        </Text>
      </View>

      <View style={styles.contentContainer}>
        {title && (
          <Text
            style={[
              theme.typography.h6,
              styles.title,
              { color: alertColors.textColor },
              titleStyle,
            ]}
          >
            {title}
          </Text>
        )}
        <Text
          style={[
            theme.typography.body2,
            { color: alertColors.textColor },
            messageStyle,
          ]}
        >
          {message}
        </Text>
      </View>

      {closable && (
        <TouchableOpacity
          style={styles.closeButton}
          onPress={close}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Text style={{ color: theme.colors.neutral[3], fontSize: 16 }}>✕</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    marginVertical: 8,
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
  icon: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 4,
  },
  closeButton: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
