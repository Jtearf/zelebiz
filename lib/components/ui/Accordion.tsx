import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface AccordionItemProps {
  title: string;
  content: React.ReactNode;
  expanded?: boolean;
  onToggle?: (expanded: boolean) => void;
  icon?: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItemProps[];
  multiple?: boolean;
  animated?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  headerTextStyle?: StyleProp<TextStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}

export const Accordion = ({
  items,
  multiple = false,
  animated = true,
  containerStyle,
  headerStyle,
  headerTextStyle,
  contentContainerStyle,
  contentStyle,
}: AccordionProps) => {
  const { theme } = useTheme();
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});
  
  const toggleItem = (index: number) => {
    if (animated) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    
    const isExpanded = !!expandedItems[index];
    
    if (multiple) {
      setExpandedItems({
        ...expandedItems,
        [index]: !isExpanded,
      });
    } else {
      setExpandedItems({
        [index]: !isExpanded,
      });
    }
    
    // Call the onToggle callback if provided
    if (items[index].onToggle) {
      items[index].onToggle(!isExpanded);
    }
  };
  
  return (
    <View style={[styles.container, containerStyle]}>
      {items.map((item, index) => {
        // Check if this item is expanded, either through controlled or uncontrolled mode
        const isExpanded = item.expanded !== undefined ? item.expanded : !!expandedItems[index];
        
        return (
          <View
            key={index}
            style={[
              styles.item,
              {
                borderColor: theme.colors.neutral[4],
                borderTopWidth: index === 0 ? 1 : 0,
              },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => toggleItem(index)}
              style={[
                styles.header,
                {
                  backgroundColor: theme.colors.neutral[6],
                  borderBottomWidth: isExpanded ? 1 : 0,
                  borderColor: theme.colors.neutral[4],
                  paddingVertical: theme.spacing(1.5),
                  paddingHorizontal: theme.spacing(2),
                },
                headerStyle,
              ]}
            >
              <Text
                style={[
                  theme.typography.body1,
                  { color: theme.colors.neutral[1] },
                  headerTextStyle,
                ]}
              >
                {item.title}
              </Text>
              
              <View style={styles.iconContainer}>
                {item.icon || (
                  <Text
                    style={{
                      color: theme.colors.neutral[2],
                      fontSize: 18,
                      transform: [{ rotate: isExpanded ? '180deg' : '0deg' }],
                    }}
                  >
                    ▼
                  </Text>
                )}
              </View>
            </TouchableOpacity>
            
            {isExpanded && (
              <View
                style={[
                  styles.contentContainer,
                  {
                    backgroundColor: theme.colors.neutral[6],
                    borderBottomWidth: 1,
                    borderColor: theme.colors.neutral[4],
                    paddingVertical: theme.spacing(2),
                    paddingHorizontal: theme.spacing(2),
                  },
                  contentContainerStyle,
                ]}
              >
                <View style={[styles.content, contentStyle]}>
                  {typeof item.content === 'string' ? (
                    <Text
                      style={[
                        theme.typography.body2,
                        { color: theme.colors.neutral[1] },
                      ]}
                    >
                      {item.content}
                    </Text>
                  ) : (
                    item.content
                  )}
                </View>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  item: {
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    marginLeft: 8,
  },
  contentContainer: {},
  content: {},
});
