import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/config/supabase';
import { Button } from '../../lib/components/ui/Button';
import { Input } from '../../lib/components/ui/Input';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendCode = async () => {
    if (!phoneNumber) {
      setError('Please enter your phone number');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // For now using email-based password reset via Supabase
      // In a real app with phone authentication, you'd use a different flow
      const { error } = await supabase.auth.resetPasswordForEmail(
        `${phoneNumber}@example.com`, // Replace with actual email
        {
          redirectTo: 'exp://localhost:8081/reset-password',
        }
      );

      if (error) throw error;
      
      // Navigate to verification code screen
      router.push({
        pathname: '/(auth)/verification-code',
        params: { phoneNumber }
      });
    } catch (err: any) {
      setError(err.message || 'Failed to send reset code');
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
            <Text style={styles.instruction}>Type your phone number</Text>
            
            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : null}
            
            <Input
              placeholder="(+84)"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
            
            <Text style={styles.noteText}>
              We texted you a code to verify your phone number
            </Text>
            
            <Button
              title="Send"
              onPress={handleSendCode}
              isLoading={isLoading}
              style={styles.sendButton}
            />
          </View>
          
          {/* Number pad UI */}
          <View style={styles.numberPad}>
            <View style={styles.numberRow}>
              <TouchableOpacity style={styles.numberKey} onPress={() => setPhoneNumber(phoneNumber + '1')}>
                <Text style={styles.numberText}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.numberKey} onPress={() => setPhoneNumber(phoneNumber + '2')}>
                <Text style={styles.numberText}>2</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.numberKey} onPress={() => setPhoneNumber(phoneNumber + '3')}>
                <Text style={styles.numberText}>3</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.numberRow}>
              <TouchableOpacity style={styles.numberKey} onPress={() => setPhoneNumber(phoneNumber + '4')}>
                <Text style={styles.numberText}>4</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.numberKey} onPress={() => setPhoneNumber(phoneNumber + '5')}>
                <Text style={styles.numberText}>5</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.numberKey} onPress={() => setPhoneNumber(phoneNumber + '6')}>
                <Text style={styles.numberText}>6</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.numberRow}>
              <TouchableOpacity style={styles.numberKey} onPress={() => setPhoneNumber(phoneNumber + '7')}>
                <Text style={styles.numberText}>7</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.numberKey} onPress={() => setPhoneNumber(phoneNumber + '8')}>
                <Text style={styles.numberText}>8</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.numberKey} onPress={() => setPhoneNumber(phoneNumber + '9')}>
                <Text style={styles.numberText}>9</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.numberRow}>
              <TouchableOpacity style={styles.numberKey} onPress={() => setPhoneNumber(phoneNumber + '.')}>
                <Text style={styles.numberText}>.</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.numberKey} onPress={() => setPhoneNumber(phoneNumber + '0')}>
                <Text style={styles.numberText}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.numberKey} onPress={() => setPhoneNumber(phoneNumber.slice(0, -1))}>
                <Text style={styles.numberText}>⌫</Text>
              </TouchableOpacity>
            </View>
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
  errorText: {
    color: '#EF4444',
    marginBottom: 10,
  },
  noteText: {
    color: '#6B7280',
    fontSize: 14,
    marginTop: 15,
    marginBottom: 20,
  },
  sendButton: {
    marginVertical: 15,
  },
  numberPad: {
    marginTop: 30,
    paddingBottom: 30,
  },
  numberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  numberKey: {
    flex: 1,
    height: 60,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  numberText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#111827',
  },
});
