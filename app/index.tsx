import React from "react";
import { Text, View } from "react-native";

// Instead of redirecting, let's just render the home screen
// This avoids the redirect navigation issues
export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Welcome to Zelebiz!</Text>
      <Text style={{ marginTop: 8, color: "#666" }}>
        Navigate using the tabs below
      </Text>
    </View>
  );
}
