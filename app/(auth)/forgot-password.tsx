
import React from 'react';
import { StyleSheet, TextInput, Button } from 'react-native';
import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';
import { Link } from 'expo-router';

export default function ForgotPasswordScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>FORGOT PASSWORD</ThemedText>
      <ThemedText style={styles.sessionCode}>Session code: CE23U1</ThemedText>
      <ThemedText style={styles.label}>Email:</ThemedText>
      <TextInput style={styles.input} placeholder="Enter your username" />
      <Button title="Send Code on Email" onPress={() => {}} color="#00FFFF" />
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
