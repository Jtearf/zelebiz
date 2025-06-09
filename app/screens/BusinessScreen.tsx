import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function BusinessScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Business</Text>
      <Text style={styles.subtitle}>Manage your business operations</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
