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
import { resetPassword } from '../services/authService';
import { generateSessionCode } from '../utils/sessionCode';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [sessionCode, setSessionCode] = useState('');

  useEffect(() => {
    setSessionCode(generateSessionCode());
  }, []);

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    const result = await resetPassword(email);
    if (result.success) {
      Alert.alert(
        'Success', 
        'Password reset email sent! Check your inbox.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } else {
      Alert.alert('Error', result.error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <Text style={styles.title}>forgot password</Text>
      <Text style={styles.sessionCode}>Session code: {sessionCode}</Text>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Email :</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          placeholderTextColor="#6B7FD7"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TouchableOpacity style={styles.sendButton} onPress={handleResetPassword}>
          <Text style={styles.sendButtonText}>Send Code on Email</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.backToLogin}>back to login</Text>
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 20,
  },
  title: {
    fontSize: 38,
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
    color: '#6B7FD7',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#3a3a6e',
  },
  sendButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#5B9FFF',
    borderRadius: 8,
    padding: 15,
    marginTop: 10,
  },
  sendButtonText: {
    color: '#5B9FFF',
    textAlign: 'center',
    fontSize: 16,
  },
  backToLogin: {
    color: '#fff',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 20,
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

export default ForgotPasswordScreen;