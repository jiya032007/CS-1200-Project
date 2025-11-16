
import React from 'react';
import { StyleSheet, Button } from 'react-native';
import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase-config'; // Adjust the path as needed
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        router.replace('/(auth)'); // Redirect to the login screen
      })
      .catch((error) => {
        // An error happened.
        console.error('Sign out error', error);
      });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Profile</ThemedText>
      {/* Placeholder for profile management */}
      <Button title="Sign Out" onPress={handleSignOut} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
