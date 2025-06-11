import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  // Determine colors based on system theme instead of app store
  const isDarkMode = colorScheme === 'dark';
  const activeColor = isDarkMode ? '#FFFFFF' : '#0F766E';
  const inactiveColor = isDarkMode ? '#6B7280' : '#9CA3AF';
  const bgColor = isDarkMode ? '#1F2937' : '#FFFFFF';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: {
          backgroundColor: bgColor,
        },
        // Common header styles
        headerStyle: {
          backgroundColor: bgColor,
        },
        headerTintColor: isDarkMode ? '#FFFFFF' : '#000000',
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      
      {/* Business Tab */}
      <Tabs.Screen
        name="business"
        options={{
          title: "Business",
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <Ionicons name="business" size={24} color={color} />
          ),
        }}
      />
      
      {/* Create Tab (Center) */}
      <Tabs.Screen
        name="create"
        options={{
          title: "",
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="add-circle"
              size={30}
              color="#0F766E"
              style={{ 
                marginBottom: 2,
              }}
            />
          ),
        }}
      />
      
      {/* Reports Tab */}
      <Tabs.Screen
        name="reports"
        options={{
          title: "Reports",
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <Ionicons name="bar-chart" size={24} color={color} />
          ),
        }}
      />
      
      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
