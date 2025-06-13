import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme, View, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import { theme, Theme, navigationTheme } from './index';


// Font loading function using local assets
const useLoadFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
          'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
          'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
          'Poppins': require('../assets/fonts/Poppins-Regular.ttf'), // Default fallback
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
        // Continue rendering even if fonts fail to load
        setFontsLoaded(true);
      }
    }

    loadFonts();
  }, []);

  return fontsLoaded;
};

type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  navigationTheme: typeof navigationTheme;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

// Loading component
const LoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.neutral[6] }}>
    <ActivityIndicator size="large" color={theme.colors.primary[1]} />
  </View>
);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const colorScheme = useColorScheme();
  const fontsLoaded = useLoadFonts();
  
  const isDark = colorScheme === 'dark';
  const currentTheme = theme;

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <ThemeContext.Provider value={{ 
      theme: currentTheme, 
      isDark, 
      navigationTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
