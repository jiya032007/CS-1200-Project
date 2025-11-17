
import React, { useState } from 'react';
import { StyleSheet, Pressable, Alert, Switch, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import { logout } from '@/services/authService';
import { useTheme } from '../context/ThemeContext';

export default function SettingsScreen() {
  const router = useRouter();
  const { theme, setThemeName } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      router.replace('/(auth)/login');
    } else {
      Alert.alert('Logout Failed', result.error || 'An unexpected error occurred.');
    }
  };

  const handleNavigate = (path: string) => {
    router.push(path as any);
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(previousState => !previousState);
  };

  const isDarkMode = theme.statusBarStyle === 'light-content';

  const toggleTheme = () => {
    setThemeName(isDarkMode ? 'blue' : 'default');
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type='title' style={styles.title}>
        Settings
      </ThemedText>

      {/* Account Section */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Account</ThemedText>
        <Pressable style={styles.button} onPress={() => handleNavigate('/(tabs)/profile')}>
          <ThemedText style={styles.buttonText}>Edit Profile</ThemedText>
        </Pressable>
        <Pressable style={styles.button} onPress={() => handleNavigate('/change-password')}>
          <ThemedText style={styles.buttonText}>Change Password</ThemedText>
        </Pressable>
      </ThemedView>

      {/* General Section */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>General</ThemedText>
        <View style={styles.switchRow}>
          <ThemedText style={styles.switchLabel}>Dark Mode</ThemedText>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleTheme}
            value={isDarkMode}
          />
        </View>
        <View style={styles.switchRow}>
          <ThemedText style={styles.switchLabel}>Notifications</ThemedText>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={notificationsEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleNotifications}
            value={notificationsEnabled}
          />
        </View>
        <Pressable style={styles.button} onPress={() => handleNavigate('/privacy-policy')}>
          <ThemedText style={styles.buttonText}>Privacy Policy</ThemedText>
        </Pressable>
        <Pressable style={styles.button} onPress={() => handleNavigate('/terms-of-service')}>
          <ThemedText style={styles.buttonText}>Terms of Service</ThemedText>
        </Pressable>
      </ThemedView>

      {/* Logout Button */}
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <ThemedText style={styles.logoutButtonText}>Log Out</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 20,
    borderRadius: 10,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#5B9FFF',
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
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
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  switchLabel: {
    fontSize: 16,
  },
});
