import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
  ImageStyle
} from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';

type AvatarSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
type AvatarShape = 'circle' | 'square';

interface AvatarProps {
  source?: ImageSourcePropType;
  name?: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  backgroundColor?: string;
  borderColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Avatar = ({
  source,
  name,
  size = 'medium',
  shape = 'circle',
  backgroundColor,
  borderColor,
  containerStyle,
  imageStyle,
  textStyle,
}: AvatarProps) => {
  const { theme } = useTheme();
  
  const getSizeValue = () => {
    switch (size) {
      case 'xsmall':
        return 24;
      case 'small':
        return 32;
      case 'large':
        return 48;
      case 'xlarge':
        return 64;
      default: // medium
        return 40;
    }
  };
  
  const getFontSize = () => {
    switch (size) {
      case 'xsmall':
        return 10;
      case 'small':
        return 12;
      case 'large':
        return 18;
      case 'xlarge':
        return 24;
      default: // medium
        return 16;
    }
  };
  
  const sizeValue = getSizeValue();
  const fontSize = getFontSize();
  
  // Generate initials from name
  const getInitials = () => {
    if (!name) return '';
    
    const nameParts = name.trim().split(/\s+/);
    if (nameParts.length >= 2) {
      // First letter of first and last names
      return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
    } else if (nameParts.length === 1 && nameParts[0].length > 0) {
      // First letter only if only one name
      return nameParts[0][0].toUpperCase();
    }
    
    return '';
  };
  
  const getBackgroundColor = () => {
    if (backgroundColor) return backgroundColor;
    
    if (name) {
      // Generate consistent color based on name
      const colors = [
        theme.colors.primary[1],
        theme.colors.primary[2],
        theme.colors.semantic.info,
        theme.colors.semantic.success,
        theme.colors.semantic.warning,
      ];
      
      // Simple hash function for name
      const hash = name.split('').reduce((acc, char) => {
        return acc + char.charCodeAt(0);
      }, 0);
      
      return colors[hash % colors.length];
    }
    
    return theme.colors.neutral[4]; // Default color
  };
  
  return (
    <View
      style={[
        styles.container,
        {
          width: sizeValue,
          height: sizeValue,
          borderRadius: shape === 'circle' ? sizeValue / 2 : theme.spacing(1),
          backgroundColor: source ? 'transparent' : getBackgroundColor(),
          borderWidth: borderColor ? 1 : 0,
          borderColor: borderColor || 'transparent',
        },
        containerStyle,
      ]}
    >
      {source ? (
        <Image
          source={source}
          style={[
            styles.image,
            {
              width: sizeValue,
              height: sizeValue,
              borderRadius: shape === 'circle' ? sizeValue / 2 : theme.spacing(1),
            },
            imageStyle,
          ]}
          resizeMode="cover"
        />
      ) : name ? (
        <Text
          style={[
            styles.text,
            {
              fontSize,
              color: theme.colors.neutral[6],
              fontFamily: theme.fontConfig.poppins.medium,
            },
            textStyle,
          ]}
        >
          {getInitials()}
        </Text>
      ) : (
        <Text
          style={[
            styles.text,
            {
              fontSize,
              color: theme.colors.neutral[6],
              fontFamily: theme.fontConfig.poppins.medium,
            },
            textStyle,
          ]}
        >
          ?
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    textAlign: 'center',
  },
});
