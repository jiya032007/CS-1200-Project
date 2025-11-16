
import React, { useState } from 'react';
import { StyleSheet, TextInput, Button, Alert } from 'react-native';
import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';
import { Link, useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config'; // Adjust the path as needed

export default function NewAccountScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCreateAccount = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        router.push('/(tabs)');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert('Signup Failed', errorMessage);
      });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>NEW ACCOUNT</ThemedText>
      <ThemedText style={styles.sessionCode}>Session code: CE23U1</ThemedText>
      <ThemedText style={styles.label}>Username/gmail</ThemedText>
      <TextInput 
        style={styles.input} 
        placeholder="Enter your username" 
        value={email} 
        onChangeText={setEmail} 
        autoCapitalize="none" 
      />
      <ThemedText style={styles.label}>Password</ThemedText>
      <TextInput 
        style={styles.input} 
        placeholder="Enter your password" 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword} 
      />
      <ThemedText style={styles.label}>Confirm Password</ThemedText>
      <TextInput 
        style={styles.input} 
        placeholder="Retype your Password" 
        secureTextEntry 
        value={confirmPassword} 
        onChangeText={setConfirmPassword} 
      />
      <Button title="Create new account" onPress={handleCreateAccount} color="#00FFFF" />
      <Link href="/(auth)" style={styles.link}>back to login</Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000033',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#00FFFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
  sessionCode: {
    textAlign: 'center',
    color: '#00FFFF',
    marginBottom: 20,
  },
  label: {
    color: '#FFFFFF',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  link: {
    color: '#00FFFF',
    textAlign: 'center',
    marginVertical: 10,
  },
});
