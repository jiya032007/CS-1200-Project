import React from 'react';
import { StyleSheet, Button, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.replace('/(auth)/login');
    } catch (error: any) {
      console.error('Sign out error:', error.message);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>Profile</ThemedText>
        <ThemedText style={styles.email}>
          {auth.currentUser?.email || 'No user logged in'}
        </ThemedText>
        <View style={styles.buttonContainer}>
          <Button title="Sign Out" onPress={handleSignOut} color="#5B9FFF" />
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    marginBottom: 20,
  },
  email: {
    fontSize: 16,
    marginBottom: 30,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
