import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { supabase } from '../../lib/config/supabase';
import { Button } from '../../lib/components/ui/Button';
import { Input } from '../../lib/components/ui/Input';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleSendResetLink = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Use Supabase's built-in password reset functionality
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        // This URL should be configured in Supabase's dashboard as an allowed redirect URL
        // It will redirect users after they click the reset link in their email
        redirectTo: 'zelebizapp://reset-password',
      });

      if (error) throw error;
      
      // Show success message
      setResetSent(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send password reset link');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Forgot password</Text>
          </View>
          
          <View style={styles.formContainer}>
            {resetSent ? (
              <View style={styles.successContainer}>
                <Text style={styles.successTitle}>Check your email</Text>
                <Text style={styles.successText}>
                  We've sent a password reset link to <Text style={styles.emailHighlight}>{email}</Text>
                </Text>
                <Text style={styles.instructionSecondary}>
                  Click the link in the email to reset your password.
                </Text>
                <Button
                  title="Return to login"
                  onPress={() => router.push('/(auth)/sign-in' as any)}
                  style={styles.returnButton}
                />
              </View>
            ) : (
              <>
                <Text style={styles.instruction}>Enter your email address</Text>
                
                {error ? (
                  <Text style={styles.errorText}>{error}</Text>
                ) : null}
                
                <Input
                  placeholder="you@example.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                
                <Text style={styles.noteText}>
                  We'll send you an email with a link to reset your password
                </Text>
                
                <Button
                  title="Send reset link"
                  onPress={handleSendResetLink}
                  isLoading={isLoading}
                  style={styles.sendButton}
                />
                
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={() => router.back()}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
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
    marginBottom: 20,
  },
  instructionSecondary: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 30,
  },
  errorText: {
    color: '#EF4444',
    marginBottom: 10,
  },
  noteText: {
    color: '#6B7280',
    fontSize: 14,
    marginTop: 15,
    marginBottom: 15,
  },
  sendButton: {
    marginVertical: 15,
  },
  returnButton: {
    marginTop: 20,
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  cancelButtonText: {
    fontSize: 14,
    color: '#4F46E5',
    fontWeight: '500',
  },
  successContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#10B981',
    marginBottom: 15,
  },
  successText: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 10,
  },
  emailHighlight: {
    fontWeight: '600',
    color: '#4F46E5',
  }
});
