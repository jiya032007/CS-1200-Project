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
import { signIn } from '@/services/authService';
import { generateSessionCode } from '@/utils/sessionCode';

export default function LoginScreen() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [sessionCode, setSessionCode] = useState<string>('');

  useEffect(() => {
    setSessionCode(generateSessionCode());
  }, []);

  const handleLogin = async (): Promise<void> => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    const result = await signIn(email, password);
    if (result.success) {
      Alert.alert('Success', 'Logged in successfully');
      router.replace('/(tabs)');
    } else {
      let errorMessage = 'Login failed. Please try again.';
      if (result.error) {
        switch (result.error) {
          case 'auth/user-not-found':
          case 'auth/invalid-email':
            errorMessage = 'No account found with this email address.';
            break;
          case 'auth/wrong-password':
          case 'auth/invalid-credential':
            errorMessage = 'Incorrect password. Please try again.';
            break;
          default:
            errorMessage = result.error;
            break;
        }
      }
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <Text style={styles.title}>login</Text>
      <Text style={styles.sessionCode}>Session code: {sessionCode}</Text>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Username/ Email</Text>
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

        <TouchableOpacity 
          style={styles.checkboxContainer}
          onPress={() => setRememberMe(!rememberMe)}
        >
          <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]} />
          <Text style={styles.checkboxLabel}>Remember me</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/(auth)/forgot-password')}>
          <Text style={styles.forgotPassword}>Forgot Password</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
          <Text style={styles.newAccount}>New account</Text>
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
    fontSize: 48,
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 10,
    borderRadius: 3,
  },
  checkboxChecked: {
    backgroundColor: '#5B9FFF',
  },
  checkboxLabel: {
    color: '#fff',
  },
  loginButton: {
    backgroundColor: '#5B9FFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#5B9FFF',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginBottom: 15,
  },
  newAccount: {
    color: '#fff',
    textAlign: 'center',
    textDecorationLine: 'underline',
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