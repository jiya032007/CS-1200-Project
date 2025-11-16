
import { StyleSheet, TextInput, Button, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config'; // Adjust the path as needed

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setChecked] = useState(false);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        router.push('/(tabs)');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert('Login Failed', errorMessage);
      });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>login</ThemedText>
      <ThemedText style={styles.sessionCode}>Session code: CE23U1</ThemedText>
      <ThemedText style={styles.label}>Username/ Email</ThemedText>
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
      <Link href="/(auth)/forgot-password" style={styles.link}>Forgot Password</Link>
      <ThemedView style={styles.rememberMeContainer}>
        <Checkbox value={isChecked} onValueChange={setChecked} />
        <ThemedText>Remember me</ThemedText>
      </ThemedView>
      <Button title="Login" onPress={handleLogin} color="#00FFFF" />
      <Link href="/(auth)/new-account" style={styles.link}>New account</Link>
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
    fontSize: 40,
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
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    backgroundColor: 'transparent',
  },
});
