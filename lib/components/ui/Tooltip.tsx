import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
  TextStyle,
  Dimensions,
  LayoutChangeEvent,
  LayoutRectangle,
} from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  content: string;
  position?: TooltipPosition;
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  tooltipStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<TextStyle>;
}

export const Tooltip = ({
  content,
  position = 'top',
  children,
  containerStyle,
  tooltipStyle,
  contentStyle,
}: TooltipProps) => {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);
  const [childLayout, setChildLayout] = useState<LayoutRectangle | null>(null);
  const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
  
  const calculatePosition = () => {
    if (!childLayout) return { top: 0, left: 0 };
    
    const tooltipWidth = Math.min(200, windowWidth * 0.7);
    const tooltipHeight = 40; // Approximate
    
    const GAP = 8;
    
    switch (position) {
      case 'bottom':
        return {
          top: childLayout.y + childLayout.height + GAP,
          left: childLayout.x + (childLayout.width / 2) - (tooltipWidth / 2),
        };
      case 'left':
        return {
          top: childLayout.y + (childLayout.height / 2) - (tooltipHeight / 2),
          left: childLayout.x - tooltipWidth - GAP,
        };
      case 'right':
        return {
          top: childLayout.y + (childLayout.height / 2) - (tooltipHeight / 2),
          left: childLayout.x + childLayout.width + GAP,
        };
      default: // top
        return {
          top: childLayout.y - tooltipHeight - GAP,
          left: childLayout.x + (childLayout.width / 2) - (tooltipWidth / 2),
        };
    }
  };
  
  const getArrowStyle = () => {
    const size = 8;
    
    switch (position) {
      case 'bottom':
        return {
          top: -size,
          left: '50%',
          marginLeft: -size,
          borderLeftWidth: size,
          borderRightWidth: size,
          borderBottomWidth: size,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: theme.colors.neutral[1],
        };
      case 'left':
        return {
          top: '50%',
          right: -size,
          marginTop: -size,
          borderTopWidth: size,
          borderBottomWidth: size,
          borderLeftWidth: size,
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
          borderLeftColor: theme.colors.neutral[1],
        };
      case 'right':
        return {
          top: '50%',
          left: -size,
          marginTop: -size,
          borderTopWidth: size,
          borderBottomWidth: size,
          borderRightWidth: size,
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
          borderRightColor: theme.colors.neutral[1],
        };
      default: // top
        return {
          bottom: -size,
          left: '50%',
          marginLeft: -size,
          borderLeftWidth: size,
          borderRightWidth: size,
          borderTopWidth: size,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderTopColor: theme.colors.neutral[1],
        };
    }
  };
  
  const tooltipPos = calculatePosition();
  
  const handleLayout = (event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setChildLayout({ x, y, width, height });
  };
  
  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);
  
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableWithoutFeedback
        onPress={showTooltip}
        onLongPress={showTooltip}
        delayLongPress={250}
      >
        <View onLayout={handleLayout}>
          {children}
        </View>
      </TouchableWithoutFeedback>
      
      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={hideTooltip}
      >
        <TouchableWithoutFeedback onPress={hideTooltip}>
          <View style={styles.modalContainer}>
            <View
              style={[
                styles.tooltip,
                {
                  backgroundColor: theme.colors.neutral[1],
                  top: tooltipPos.top,
                  left: tooltipPos.left,
                  borderRadius: theme.spacing(0.5),
                },
                tooltipStyle,
              ]}
            >
              <View style={[styles.arrow, getArrowStyle()]} />
              <Text
                style={[
                  styles.content,
                  { color: theme.colors.neutral[6] },
                  contentStyle,
                ]}
              >
                {content}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
  modalContainer: {
    flex: 1,
    position: 'relative',
  },
  tooltip: {
    position: 'absolute',
    padding: 8,
    maxWidth: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  arrow: {
    position: 'absolute',
    width: 0,
    height: 0,
  },
  content: {
    fontSize: 12,
    textAlign: 'center',
  },
});
