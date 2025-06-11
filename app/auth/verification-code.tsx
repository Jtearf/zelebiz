import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from '../../lib/config/supabase';
import { Button } from '../../lib/components/ui/Button';

export default function VerificationCodeScreen() {
  const router = useRouter();
  const { phoneNumber } = useLocalSearchParams();
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds
  
  // Format the masked phone number
  const maskedPhone = typeof phoneNumber === 'string' 
    ? phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '(+$1) $2$3xxx')
    : '';

  useEffect(() => {
    // Countdown timer
    if (timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleVerifyCode = async () => {
    if (!code || code.length < 4) {
      setError('Please enter the complete verification code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // In a real app, you would verify the code with your auth system
      // For this demo with Supabase, we're just simulating success
      
      // Navigate to change password screen
      router.push({
        pathname: '/(auth)/change-password',
        params: { phoneNumber }
      } as any);
    } catch (err: any) {
      setError(err.message || 'Failed to verify code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate resending code - in a real app, you'd call your auth API
      setTimeLeft(10 * 60); // Reset timer to 10 minutes
      
      // Show success message
      alert('A new code has been sent to your phone');
    } catch (err: any) {
      setError(err.message || 'Failed to resend code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePhoneNumber = () => {
    router.back(); // Go back to the forgot password screen
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
            <Text style={styles.instruction}>Type a code</Text>
            
            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : null}
            
            <View style={styles.codeInputContainer}>
              <TextInput
                style={styles.codeInput}
                placeholder="Code"
                value={code}
                onChangeText={setCode}
                keyboardType="numeric"
                maxLength={6}
              />
              <TouchableOpacity 
                style={styles.resendButton} 
                onPress={handleResendCode}
                disabled={isLoading}
              >
                <Text style={styles.resendButtonText}>Resend</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.noteText}>
              We texted you a code to verify your phone number {maskedPhone}
            </Text>
            
            <Text style={styles.expiryText}>
              This code will expired {formatTime(timeLeft)} minutes after this message. If you don't get a message.
            </Text>
            
            <Button
              title="Change password"
              onPress={handleVerifyCode}
              isLoading={isLoading}
              style={styles.verifyButton}
            />
            
            <TouchableOpacity 
              style={styles.changeNumberLink}
              onPress={handleChangePhoneNumber}
            >
              <Text style={styles.changeNumberText}>Change your phone number</Text>
            </TouchableOpacity>
          </View>
          
          {/* Number pad UI */}
          <View style={styles.numberPad}>
            <View style={styles.numberRow}>
              <TouchableOpacity style={styles.numberKey} onPress={() => setCode(prev => prev + '1')}>
                <Text style={styles.numberText}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.numberKey} onPress={() => setCode(prev => prev + '2')}>
                <Text style={styles.numberText}>2</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.numberKey} onPress={() => setCode(prev => prev + '3')}>
                <Text style={styles.numberText}>3</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.numberRow}>
              <TouchableOpacity style={styles.numberKey} onPress={() => setCode(prev => prev + '4')}>
                <Text style={styles.numberText}>4</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.numberKey} onPress={() => setCode(prev => prev + '5')}>
                <Text style={styles.numberText}>5</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.numberKey} onPress={() => setCode(prev => prev + '6')}>
                <Text style={styles.numberText}>6</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.numberRow}>
              <TouchableOpacity style={styles.numberKey} onPress={() => setCode(prev => prev + '7')}>
                <Text style={styles.numberText}>7</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.numberKey} onPress={() => setCode(prev => prev + '8')}>
                <Text style={styles.numberText}>8</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.numberKey} onPress={() => setCode(prev => prev + '9')}>
                <Text style={styles.numberText}>9</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.numberRow}>
              <TouchableOpacity style={styles.numberKey} onPress={() => setCode(prev => prev + '.')}>
                <Text style={styles.numberText}>.</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.numberKey} onPress={() => setCode(prev => prev + '0')}>
                <Text style={styles.numberText}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.numberKey} onPress={() => setCode(prev => prev.slice(0, -1))}>
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
  codeInputContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  codeInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginRight: 10,
  },
  resendButton: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    backgroundColor: '#4F46E5',
    borderRadius: 8,
  },
  resendButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  noteText: {
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 10,
  },
  expiryText: {
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 20,
  },
  verifyButton: {
    marginVertical: 15,
  },
  changeNumberLink: {
    alignItems: 'center',
    marginTop: 10,
  },
  changeNumberText: {
    color: '#4F46E5',
    fontSize: 14,
  },
  numberPad: {
    marginTop: 20,
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
