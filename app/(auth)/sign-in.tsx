import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../../lib/hooks/useAuth';
import { Button } from '../../lib/components/ui/Button';
import { Input } from '../../lib/components/ui/Input';
import { Ionicons } from '@expo/vector-icons';

export default function SignInScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setError('');
    setIsLoading(true);
    
    try {
      const result = await login(email, password);
      if (!result.success) {
        setError(result.error || 'Invalid email or password');
      } else {
        // Navigate to main app on successful login
        router.replace('/(tabs)');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign in');
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
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Hello there, sign in to continue</Text>
          </View>
          
          <View style={styles.imageContainer}>
            <View style={styles.iconCircle}>
              <Ionicons name="lock-closed" size={24} color="#4F46E5" />
            </View>
            <View style={[styles.dot, styles.purpleDot]} />
            <View style={[styles.dot, styles.redDot]} />
            <View style={[styles.dot, styles.greenDot]} />
            <View style={[styles.dot, styles.blueDot]} />
            <View style={[styles.dot, styles.orangeDot]} />
          </View>
          
          <View style={styles.formContainer}>
            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : null}
            
            <Input
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <Input
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            
            <TouchableOpacity 
              style={styles.forgotPassword}
              onPress={() => router.push('/(auth)/forgot-password' as any)}
            >
              <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
            </TouchableOpacity>
            
            <Button
              title="Sign In"
              onPress={handleSignIn}
              isLoading={isLoading}
              style={styles.signInButton}
            />
          </View>
          
          <View style={styles.fingerprint}>
            <Ionicons name="finger-print" size={48} color="#4F46E5" />
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <Link href={'/(auth)/sign-up' as any} asChild>
              <TouchableOpacity>
                <Text style={styles.signUpLink}>Sign Up</Text>
              </TouchableOpacity>
            </Link>
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
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4F46E5', // Deep purple
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280', // Gray
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
    position: 'relative',
    height: 120,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EEF2FF', // Light purple
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockIcon: {
    width: 40,
    height: 40,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    position: 'absolute',
  },
  purpleDot: {
    backgroundColor: '#4F46E5',
    top: 20,
    left: '30%',
  },
  redDot: {
    backgroundColor: '#F87171',
    top: 40,
    right: '30%',
  },
  greenDot: {
    backgroundColor: '#10B981',
    top: 60,
    left: '35%',
  },
  blueDot: {
    backgroundColor: '#3B82F6',
    bottom: 30,
    right: '35%',
  },
  orangeDot: {
    backgroundColor: '#F59E0B',
    bottom: 50,
    left: '40%',
  },
  formContainer: {
    marginBottom: 20,
  },
  errorText: {
    color: '#EF4444',
    marginBottom: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#4F46E5',
    fontSize: 14,
  },
  signInButton: {
    marginTop: 10,
  },
  fingerprint: {
    alignItems: 'center',
    marginVertical: 20,
  },
  fingerprintIcon: {
    width: 40,
    height: 40,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  footerText: {
    color: '#6B7280',
    marginRight: 5,
  },
  signUpLink: {
    color: '#4F46E5',
    fontWeight: '600',
  },
});
