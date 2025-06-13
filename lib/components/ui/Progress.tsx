import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  Animated,
} from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';

type ProgressType = 'line' | 'circle';
type ProgressSize = 'small' | 'medium' | 'large';
type ProgressStatus = 'normal' | 'success' | 'error' | 'warning';

interface ProgressProps {
  type?: ProgressType;
  percent: number;
  size?: ProgressSize;
  status?: ProgressStatus;
  showInfo?: boolean;
  strokeWidth?: number;
  containerStyle?: StyleProp<ViewStyle>;
  progressStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Progress = ({
  type = 'line',
  percent = 0,
  size = 'medium',
  status = 'normal',
  showInfo = true,
  strokeWidth,
  containerStyle,
  progressStyle,
  textStyle,
}: ProgressProps) => {
  const { theme } = useTheme();
  
  // Clamp percent between 0-100
  const clampedPercent = Math.min(Math.max(0, percent), 100);
  
  // Determine color based on status
  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return theme.colors.semantic.success;
      case 'error':
        return theme.colors.semantic.error;
      case 'warning':
        return theme.colors.semantic.warning;
      default:
        return theme.colors.primary[1];
    }
  };
  
  // Size options
  const getSizeStyles = () => {
    if (type === 'line') {
      switch (size) {
        case 'small':
          return {
            height: 4,
            fontSize: 12,
          };
        case 'large':
          return {
            height: 12,
            fontSize: 16,
          };
        default: // medium
          return {
            height: 8,
            fontSize: 14,
          };
      }
    } else { // circle
      switch (size) {
        case 'small':
          return {
            size: 64,
            strokeWidth: strokeWidth || 4,
            fontSize: 14,
          };
        case 'large':
          return {
            size: 120,
            strokeWidth: strokeWidth || 8,
            fontSize: 20,
          };
        default: // medium
          return {
            size: 80,
            strokeWidth: strokeWidth || 6,
            fontSize: 16,
          };
      }
    }
  };
  
  const sizeStyles = getSizeStyles();
  const statusColor = getStatusColor();
  
  // Render line progress
  const renderLineProgress = () => (
    <View style={styles.lineContainer}>
      <View
        style={[
          styles.lineOuter,
          {
            height: sizeStyles.height || 8,
            backgroundColor: theme.colors.neutral[4],
            borderRadius: (sizeStyles.height || 8) / 2,
          },
          progressStyle,
        ]}
      >
        <View
          style={[
            styles.lineInner,
            {
              width: `${clampedPercent}%`,
              height: sizeStyles.height || 8,
              backgroundColor: statusColor,
              borderRadius: (sizeStyles.height || 8) / 2,
            },
          ]}
        />
      </View>
      
      {showInfo && (
        <Text
          style={[
            styles.text,
            {
              fontSize: sizeStyles.fontSize,
              color: theme.colors.neutral[1],
              marginLeft: theme.spacing(1),
              fontFamily: theme.fontConfig.poppins.medium,
            },
            textStyle,
          ]}
        >
          {clampedPercent}%
        </Text>
      )}
    </View>
  );
  
  // Render circle progress
  const renderCircleProgress = () => {
    const size = sizeStyles.size || 80;
    const strokeWidth = sizeStyles.strokeWidth || 6;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (clampedPercent / 100) * circumference;
    
    return (
      <View style={styles.circleContainer}>
        <View style={{ width: size, height: size }}>
          <View style={styles.circleBackground}>
            <View
              style={[
                styles.circle,
                {
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  borderWidth: strokeWidth,
                  borderColor: theme.colors.neutral[4],
                },
              ]}
            />
            
            {/* This would ideally use SVG but keeping it React Native only */}
            <View
              style={[
                styles.circleProgress,
                {
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  borderWidth: strokeWidth,
                  borderColor: statusColor,
                  
                  // Simulate progress with border. Not perfect but works for demo
                  borderTopColor: clampedPercent < 25 ? 'transparent' : statusColor,
                  borderRightColor: clampedPercent < 50 ? 'transparent' : statusColor,
                  borderBottomColor: clampedPercent < 75 ? 'transparent' : statusColor,
                  
                  transform: [
                    { rotateZ: `${clampedPercent * 3.6}deg` }
                  ],
                },
              ]}
            />
          </View>
          
          {showInfo && (
            <View style={styles.circleTextContainer}>
              <Text
                style={[
                  {
                    fontSize: sizeStyles.fontSize,
                    color: theme.colors.neutral[1],
                    fontFamily: theme.fontConfig.poppins.medium,
                  },
                  textStyle,
                ]}
              >
                {clampedPercent}%
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };
  
  return (
    <View style={[styles.container, containerStyle]}>
      {type === 'line' ? renderLineProgress() : renderCircleProgress()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lineOuter: {
    flex: 1,
    overflow: 'hidden',
  },
  lineInner: {
    height: '100%',
  },
  text: {
    textAlign: 'right',
  },
  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleBackground: {
    position: 'relative',
  },
  circle: {
    borderStyle: 'solid',
  },
  circleProgress: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
  },
  circleTextContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
