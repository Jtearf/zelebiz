import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StyleProp,
  ViewStyle,
  TextStyle,
  LayoutChangeEvent,
  Animated
} from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';

interface TabItem {
  key: string;
  title: string;
  icon?: React.ReactNode;
  badge?: number | string;
}

interface TabsProps {
  items: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
  type?: 'line' | 'card';
  size?: 'small' | 'medium' | 'large';
  scrollable?: boolean;
  animated?: boolean;
  tabBarStyle?: StyleProp<ViewStyle>;
  tabStyle?: StyleProp<ViewStyle>;
  activeTabStyle?: StyleProp<ViewStyle>;
  tabTextStyle?: StyleProp<TextStyle>;
  activeTabTextStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  indicatorStyle?: StyleProp<ViewStyle>;
}

export const Tabs = ({
  items,
  activeKey,
  onChange,
  type = 'line',
  size = 'medium',
  scrollable = false,
  animated = true,
  tabBarStyle,
  tabStyle,
  activeTabStyle,
  tabTextStyle,
  activeTabTextStyle,
  containerStyle,
  indicatorStyle
}: TabsProps) => {
  const { theme } = useTheme();
  const [tabWidths, setTabWidths] = useState<{ [key: string]: number }>({});
  const [tabPositions, setTabPositions] = useState<{ [key: string]: number }>({});
  const animatedPosition = new Animated.Value(0);
  const animatedWidth = new Animated.Value(0);
  
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: theme.spacing(0.75),
          paddingHorizontal: theme.spacing(1),
          fontSize: 13,
        };
      case 'large':
        return {
          paddingVertical: theme.spacing(1.5),
          paddingHorizontal: theme.spacing(3),
          fontSize: 16,
        };
      default: // medium
        return {
          paddingVertical: theme.spacing(1),
          paddingHorizontal: theme.spacing(2),
          fontSize: 14,
        };
    }
  };
  
  const sizeStyles = getSizeStyles();
  
  const handleTabLayout = (key: string, event: LayoutChangeEvent, index: number) => {
    const { width, x } = event.nativeEvent.layout;
    
    setTabWidths(prev => ({ ...prev, [key]: width }));
    setTabPositions(prev => ({ ...prev, [key]: x }));
    
    if (key === activeKey && animated) {
      Animated.parallel([
        Animated.timing(animatedPosition, {
          toValue: x,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animatedWidth, {
          toValue: width,
          duration: 300,
          useNativeDriver: false,
        })
      ]).start();
    }
  };
  
  React.useEffect(() => {
    if (animated && tabPositions[activeKey] !== undefined && tabWidths[activeKey] !== undefined) {
      Animated.parallel([
        Animated.timing(animatedPosition, {
          toValue: tabPositions[activeKey],
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animatedWidth, {
          toValue: tabWidths[activeKey],
          duration: 300,
          useNativeDriver: false,
        })
      ]).start();
    }
  }, [activeKey, tabPositions, tabWidths, animated]);
  
  const renderTabBar = () => {
    const TabContainer = scrollable ? ScrollView : View;
    
    return (
      <TabContainer
        horizontal={scrollable}
        showsHorizontalScrollIndicator={false}
        style={[
          styles.tabBar,
          type === 'card' && {
            backgroundColor: theme.colors.neutral[5],
            borderRadius: theme.spacing(1),
            padding: theme.spacing(0.5),
          },
          tabBarStyle
        ]}
        contentContainerStyle={scrollable ? { flexGrow: 1 } : undefined}
      >
        {items.map((item, index) => {
          const isActive = activeKey === item.key;
          
          return (
            <TouchableOpacity
              key={item.key}
              onPress={() => onChange(item.key)}
              onLayout={(e) => handleTabLayout(item.key, e, index)}
              style={[
                styles.tab,
                {
                  paddingVertical: sizeStyles.paddingVertical,
                  paddingHorizontal: sizeStyles.paddingHorizontal,
                },
                type === 'card' && isActive && {
                  backgroundColor: theme.colors.neutral[6],
                  borderRadius: theme.spacing(0.5),
                },
                tabStyle,
                isActive && activeTabStyle
              ]}
            >
              <View style={styles.tabContent}>
                {item.icon && <View style={styles.icon}>{item.icon}</View>}
                <Text
                  style={[
                    styles.tabText,
                    {
                      fontSize: sizeStyles.fontSize,
                      color: isActive
                        ? theme.colors.primary[1]
                        : theme.colors.neutral[2],
                      fontFamily: isActive
                        ? theme.fontConfig.poppins.medium
                        : theme.fontConfig.poppins.regular,
                    },
                    tabTextStyle,
                    isActive && activeTabTextStyle
                  ]}
                >
                  {item.title}
                </Text>
                {item.badge && (
                  <View
                    style={[
                      styles.badge,
                      {
                        backgroundColor: theme.colors.semantic.error,
                        marginLeft: theme.spacing(0.5),
                      },
                    ]}
                  >
                    <Text style={[
                      styles.badgeText,
                      { color: theme.colors.neutral[6] }
                    ]}>
                      {item.badge}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </TabContainer>
    );
  };
  
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.tabBarWrapper}>
        {renderTabBar()}
        
        {type === 'line' && (
          <Animated.View
            style={[
              styles.indicator,
              {
                backgroundColor: theme.colors.primary[1],
                height: 2,
                width: animated ? animatedWidth : tabWidths[activeKey] || 0,
                left: animated ? animatedPosition : tabPositions[activeKey] || 0,
              },
              indicatorStyle
            ]}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  tabBarWrapper: {
    position: 'relative',
  },
  tabBar: {
    flexDirection: 'row',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    textAlign: 'center',
  },
  icon: {
    marginRight: 4,
  },
  badge: {
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
  },
});
