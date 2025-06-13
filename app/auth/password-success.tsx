import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';
import { Button } from '../../lib/components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

export default function PasswordSuccessScreen() {
  const router = useRouter();
  const statusBarHeight = Constants.statusBarHeight;

  const handleDone = () => {
    // Navigate to sign-in screen
    router.replace('/auth/sign-in');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View style={{ height: Platform.OS === 'ios' ? 0 : statusBarHeight }} />
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#4F46E5" />
        <Text style={styles.backButtonText}>Password Success</Text>
      </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="checkmark-circle" size={120} color="#4F46E5" />
        </View>
        
        <Text style={styles.title}>Change password successfully!</Text>
        
        <Text style={styles.message}>
          You have successfully change password.
          Please use the new password when Sign in.
        </Text>
        
        <Button
          title="Ok"
          onPress={handleDone}
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  backButtonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#4F46E5',
  },
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    width: 240,
    height: 240,
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4F46E5',
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  button: {
    width: '100%',
  },
});
