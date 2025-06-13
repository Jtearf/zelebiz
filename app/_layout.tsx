import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AppProviders } from "../lib/components/providers/AppProviders";
import { ThemeProvider } from "../theme/ThemeProvider";
import { useColorScheme } from "react-native";
import { theme } from "../theme";
import "./global.css";

// Create the layout component
function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider>
      <AppProviders>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.neutral[6],
            },
            headerTintColor: theme.colors.neutral[1],
            headerTitleStyle: {
              fontFamily: theme.typography.h4.fontFamily,
              fontSize: theme.typography.h4.fontSize,
              color: theme.colors.neutral[1],
            } as const,
            contentStyle: {
              backgroundColor: theme.colors.neutral[6],
            },
            headerBackTitle: '',
            headerShadowVisible: false,
          }}
        >
          {/* Index screen - handles auth redirect */}
          <Stack.Screen 
            name="index" 
            options={{
              headerShown: false,
              animation: "fade"
            }} 
          />
          
          {/* Auth group - hide tab bar and header */}
          <Stack.Screen 
            name="auth" 
            options={{
              headerShown: false,
              presentation: "modal"
            }} 
          />
          
          {/* Tabs group - hide header since tabs has its own headers */}
          <Stack.Screen 
            name="(tabs)" 
            options={{
              headerShown: false,
              animation: "fade"
            }} 
          />
        </Stack>
      </AppProviders>
    </ThemeProvider>
  );
}

// Export the layout component as default
export default RootLayout;
