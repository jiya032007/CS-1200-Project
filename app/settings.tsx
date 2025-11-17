
import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Pressable, Switch } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleLogout = () => {
    // Implement your logout logic here
    router.replace('/login'); // Redirect to login screen after logout
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>Settings</ThemedText>

        {/* Account Section */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Account</ThemedText>
          <Pressable style={styles.row}>
            <ThemedText style={styles.rowLabel}>Edit Profile</ThemedText>
            <ThemedText style={styles.rowValue}>〉</ThemedText>
          </Pressable>
          <Pressable style={styles.row}>
            <ThemedText style={styles.rowLabel}>Change Password</ThemedText>
            <ThemedText style={styles.rowValue}>〉</ThemedText>
          </Pressable>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Notifications</ThemedText>
          <View style={styles.row}>
            <ThemedText style={styles.rowLabel}>Push Notifications</ThemedText>
            <Switch value={pushNotifications} onValueChange={setPushNotifications} />
          </View>
          <View style={styles.row}>
            <ThemedText style={styles.rowLabel}>Email Notifications</ThemedText>
            <Switch value={emailNotifications} onValueChange={setEmailNotifications} />
          </View>
        </View>

        {/* Theme Section */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Theme</ThemedText>
          <View style={styles.row}>
            <ThemedText style={styles.rowLabel}>Dark Mode</ThemedText>
            <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
          </View>
          <View style={styles.row}>
            <ThemedText style={styles.rowLabel}>Light Mode</ThemedText>
            <Switch value={!isDarkMode} onValueChange={() => setIsDarkMode(!isDarkMode)} />
          </View>
        </View>

        {/* Logout Button */}
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <ThemedText style={styles.logoutButtonText}>Log Out</ThemedText>
        </Pressable>

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
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E6F4FE',
    marginBottom: 15,
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
  logoutButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
