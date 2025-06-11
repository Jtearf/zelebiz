import React from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { Redirect } from "expo-router";
import { useAuth } from "../lib/hooks/useAuth";

// Index page that redirects based on auth state
export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();

  // Show loading spinner until auth state is determined
  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={{ marginTop: 20, color: "#6B7280" }}>Loading...</Text>
      </View>
    );
  }

  // Simple conditional redirect
  return isSignedIn ? (
    <Redirect href="/(tabs)" />
  ) : (
    <Redirect href="/auth/sign-in" />
  );
}
