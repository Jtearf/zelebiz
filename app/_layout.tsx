import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AppProviders } from "../lib/components/providers/AppProviders";
import "./global.css";

// Create the layout component
function RootLayout() {
  return (
    <AppProviders>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTintColor: '#000000',
          contentStyle: {
            backgroundColor: '#F9FAFB',
          },
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
  );
}

// Export the layout component as default
const Layout = RootLayout;
export default Layout;
