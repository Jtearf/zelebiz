import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { supabase } from '../../lib/config/supabase';
import { Button } from '../../lib/components/ui/Button';
import { Input } from '../../lib/components/ui/Input';

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { token } = useLocalSearchParams();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleResetPassword = async () => {
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
      // Update the user's password
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;
      
      // Navigate to success screen
      router.replace('/(auth)/password-success' as any);
    } catch (err: any) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Handle the deep link with reset token if available
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error || !data.session) {
        // If there's no active session and we don't have a token,
        // redirect to the login screen
        if (!token) {
          router.replace('/(auth)/sign-in' as any);
        }
      }
    };

    checkSession();
  }, [router, token]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Reset password</Text>
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
              placeholder="••••••••••••"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            
            <Button
              title="Reset password"
              onPress={handleResetPassword}
              isLoading={isLoading}
              style={styles.resetButton}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  resetButton: {
    marginVertical: 25,
  },
});
