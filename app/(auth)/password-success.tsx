import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../lib/components/ui/Button';

export default function PasswordSuccessScreen() {
  const router = useRouter();

  const handleDone = () => {
    // Navigate to sign-in screen
    router.replace('/(auth)/sign-in' as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={require('../../assets/images/success-illustration.png')}
          style={styles.image}
          defaultSource={require('../../assets/images/success-illustration.png')}
        />
        
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
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
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
