import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Pressable } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { auth } from '@/config/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>Profile</ThemedText>

        {user && (
          <ThemedView style={styles.row}>
            <ThemedText style={styles.rowLabel}>Email</ThemedText>
            <ThemedText style={styles.rowValue}>{user.email}</ThemedText>
          </ThemedView>
        )}

        <Link href="/settings" asChild>
          <Pressable style={styles.row}>
            <ThemedText style={styles.rowLabel}>Settings</ThemedText>
            <ThemedText style={styles.rowValue}>〉</ThemedText>
          </Pressable>
        </Link>

      </ThemedView>
    </ScrollView>
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
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#E6F4FE',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  rowLabel: {
    color: '#ffffff',
    fontSize: 16,
  },
  rowValue: {
    color: '#a9a9a9',
    fontSize: 16,
  },
});
