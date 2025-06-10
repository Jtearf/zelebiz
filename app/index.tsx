import React, { useEffect } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { Redirect, useRouter } from "expo-router";
import { useAuth } from "../lib/hooks/useAuth";

// Decide where to redirect based on authentication status
export default function Index() {
  const router = useRouter();
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

  // Once auth is loaded, redirect based on authentication status
  if (isSignedIn) {
    // If signed in, go to the main app tabs
    return <Redirect href="/(tabs)" />;
  } else {
    // If not signed in, go to sign in page
    return <Redirect href="/(auth)/sign-in" as any />;
  }
}
