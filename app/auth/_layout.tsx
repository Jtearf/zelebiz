import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "expo-status-bar";

// Layout for the authentication group
export default function AuthLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTintColor: '#111827',
          headerShadowVisible: false,
          // Hide the group name from appearing in the header
          headerTitle: "",
          // Using headerBackTitle instead which is the correct property
          headerBackTitle: '',
          contentStyle: {
            backgroundColor: '#FFFFFF',
          },
        }}
      />
    </>
  );
}
