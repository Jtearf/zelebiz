import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/config/supabase';
import { Button } from '../../lib/components/ui/Button';
import { Input } from '../../lib/components/ui/Input';

export default function ChangePasswordScreen() {
  const router = useRouter();
  const statusBarHeight = Constants.statusBarHeight;
  const { phoneNumber } = useLocalSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChangePassword = async () => {
    if (!password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // In a real app, you'd verify the code and update password with your auth API
      // For Supabase, we would typically use the update password API
      // Since we don't have a real flow with verification tokens, we're just simulating success
      
      // Navigate to success screen
      router.push('/auth/password-success');
    } catch (err: any) {
      setError(err.message || 'Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View style={{ height: Platform.OS === 'ios' ? 0 : statusBarHeight }} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView style={styles.scrollView}>
          <View style={styles.contentContainer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#4F46E5" />
            <Text style={styles.backButtonText}>Change Password</Text>
          </TouchableOpacity>
          <View style={styles.header}>
            <Text style={styles.title}>Change password</Text>
          </View>
          
          <View style={styles.formContainer}>
            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : null}
            
            <Text style={styles.instruction}>Type your new password</Text>
            
            <Input
              placeholder="••••••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            
            <Text style={styles.instruction}>Confirm password</Text>
            
            <Input
              placeholder="••••••••••••|"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            
            <Button
              title="Change password"
              onPress={handleChangePassword}
              isLoading={isLoading}
              style={styles.changeButton}
            />
          </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButtonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#4F46E5',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  formContainer: {
    marginBottom: 20,
  },
  instruction: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 20,
    marginBottom: 10,
  },
  errorText: {
    color: '#EF4444',
    marginBottom: 10,
  },
  changeButton: {
    marginVertical: 25,
  },
});
