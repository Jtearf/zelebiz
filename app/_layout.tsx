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
      />
    </AppProviders>
  );
}

// Export the layout component as default
const Layout = RootLayout;
export default Layout;
