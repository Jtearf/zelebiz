import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../../lib/hooks/useAuth';
import { Button } from '../../lib/components/ui/Button';
import { Input } from '../../lib/components/ui/Input';
import { Checkbox } from 'expo-checkbox';
import { Ionicons } from '@expo/vector-icons';

export default function SignUpScreen() {
  const router = useRouter();
  const { register } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    if (!firstName || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!agreeToTerms) {
      setError('You must agree to the Terms and Conditions');
      return;
    }

    setError('');
    setIsLoading(true);
    
    try {
      const lastName = ''; // Optionally add a separate field for last name
      const result = await register(email, password, firstName, lastName);
      if (!result.success) {
        setError(result.error || 'An error occurred during registration');
      } else {
        // Navigate to main app on successful registration
        router.replace('/(tabs)');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration');
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
            <Text style={styles.title}>Welcome to us,</Text>
            <Text style={styles.subtitle}>Hello there, create New account</Text>
          </View>
          
          <View style={styles.imageContainer}>
            <View style={styles.iconCircle}>
              <Ionicons name="person" size={40} color="#4F46E5" />
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
              placeholder="Name"
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize="words"
            />
            
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
            
            <View style={styles.termsContainer}>
              <Checkbox
                value={agreeToTerms}
                onValueChange={setAgreeToTerms}
                color={agreeToTerms ? '#4F46E5' : undefined}
                style={styles.checkbox}
              />
              <Text style={styles.termsText}>
                By creating an account your aggree to our{' '}
                <Text style={styles.termsLink}>Term and Condtions</Text>
              </Text>
            </View>
            
            <Button
              title="Sign Up"
              onPress={handleSignUp}
              isLoading={isLoading}
              style={styles.signUpButton}
            />
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>Have an account?</Text>
            <Link href="/(auth)/sign-in" asChild>
              <TouchableOpacity>
                <Text style={styles.signInLink}>Sign In</Text>
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
  profileIcon: {
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
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  checkbox: {
    marginRight: 8,
    borderRadius: 4,
  },
  termsText: {
    color: '#6B7280',
    fontSize: 14,
    flex: 1,
  },
  termsLink: {
    color: '#4F46E5',
    fontWeight: '500',
  },
  signUpButton: {
    marginTop: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  footerText: {
    color: '#6B7280',
    marginRight: 5,
  },
  signInLink: {
    color: '#4F46E5',
    fontWeight: '600',
  },
});
