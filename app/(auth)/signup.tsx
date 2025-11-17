import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  StatusBar 
} from 'react-native';
import { router } from 'expo-router';
import { signUp } from '@/services/authService';
import { generateSessionCode } from '@/utils/sessionCode';

export default function SignupScreen() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [sessionCode, setSessionCode] = useState<string>('');

  useEffect(() => {
    setSessionCode(generateSessionCode());
  }, []);

  const handleSignup = async (): Promise<void> => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    const result = await signUp(email, password);
    if (result.success) {
      Alert.alert('Success', 'Account created successfully', [
        { text: 'OK', onPress: () => router.replace('/(auth)/login') }
      ]);
    } else {
      Alert.alert('Error', result.error || 'Signup failed');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <Text style={styles.title}>NEW ACCOUNT</Text>
      <Text style={styles.sessionCode}>Session code: {sessionCode}</Text>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Username/gmail</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          placeholderTextColor="#6B7FD7"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#6B7FD7"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Retype your Password"
          placeholderTextColor="#6B7FD7"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.createButton} onPress={handleSignup}>
          <Text style={styles.createButtonText}>Create new account</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Text style={styles.navIcon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.navIcon}>👤</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.navIcon}>🔔</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.navIcon}>☰</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#5B9FFF',
    textAlign: 'center',
    marginTop: 60,
    textShadowColor: '#5B9FFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  sessionCode: {
    color: '#8B5CF6',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
  },
  formContainer: {
    marginTop: 40,
  },
  label: {
    color: '#fff',
    marginBottom: 8,
    fontSize: 14,
  },
  input: {
    backgroundColor: '#2a2a4e',
    borderRadius: 8,
    padding: 15,
    color: '#fff',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#3a3a6e',
  },
  createButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#5B9FFF',
    borderRadius: 8,
    padding: 15,
    marginTop: 20,
  },
  createButtonText: {
    color: '#5B9FFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navIcon: {
    fontSize: 24,
  },
});