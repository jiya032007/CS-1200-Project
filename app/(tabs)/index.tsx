
import React from 'react';
import { StyleSheet, ScrollView, View, Pressable } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const recentSessions = [
    { id: '1', name: 'Team Brainstorm', code: 'A1B2C3' },
    { id: '2', name: 'Project Alpha', code: 'D4E5F6' },
    { id: '3', name: 'Marketing Sync', code: 'G7H8I9' },
  ];

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>Team Decision Helper</ThemedText>
        <ThemedText style={styles.subtitle}>Welcome back! Ready to make some great decisions?</ThemedText>

        <View style={styles.actionsContainer}>
          <Pressable style={styles.mainButton}>
            <ThemedText style={styles.mainButtonText}>🚀 Start New Session</ThemedText>
          </Pressable>
          <Pressable style={styles.secondaryButton}>
            <ThemedText style={styles.secondaryButtonText}>🤝 Join a Session</ThemedText>
          </Pressable>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Recent Activity</ThemedText>
          {recentSessions.map((session) => (
            <ThemedView key={session.id} style={styles.card}>
              <ThemedText style={styles.cardTitle}>{session.name}</ThemedText>
              <ThemedText style={styles.cardCode}>Code: {session.code}</ThemedText>
            </ThemedView>
          ))}
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Quick Actions</ThemedText>
          <View style={styles.quickActionsContainer}>
            <Link href="/settings" asChild>
              <Pressable style={styles.quickActionButton}>
                <ThemedText style={styles.quickActionButtonText}>⚙️</ThemedText>
                <ThemedText style={styles.quickActionLabel}>Settings</ThemedText>
              </Pressable>
            </Link>
            <Pressable style={styles.quickActionButton}>
              <ThemedText style={styles.quickActionButtonText}>📊</ThemedText>
              <ThemedText style={styles.quickActionLabel}>Analytics</ThemedText>
            </Pressable>
            <Pressable style={styles.quickActionButton}>
              <ThemedText style={styles.quickActionButtonText}>💡</ThemedText>
              <ThemedText style={styles.quickActionLabel}>Ideas</ThemedText>
            </Pressable>
          </View>
        </View>

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
    marginBottom: 10,
    color: '#E6F4FE',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#a9a9a9',
  },
  actionsContainer: {
    marginBottom: 40,
  },
  mainButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  mainButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#334155',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E6F4FE',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#334155',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardCode: {
    color: '#a9a9a9',
    fontSize: 14,
    marginTop: 5,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickActionButton: {
    alignItems: 'center',
  },
  quickActionButtonText: {
    fontSize: 30,
  },
  quickActionLabel: {
    color: '#a9a9a9',
    marginTop: 5,
  },
});
