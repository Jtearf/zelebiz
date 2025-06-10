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
          headerShown: true,
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTintColor: '#111827',
          headerShadowVisible: false,
          // headerBackTitleVisible is not supported in the current type
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
