
import React, { useContext, useState } from 'react';
import { StyleSheet, Pressable, Alert, Switch, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';
import { logout } from '@/services/authService';
import { ThemeContext } from './_layout';

export default function SettingsScreen() {
  const router = useRouter();
  const { colorScheme, setColorScheme } = useContext(ThemeContext);
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

  const isDarkMode = colorScheme === 'dark';

  const toggleTheme = () => {
    setColorScheme(isDarkMode ? 'light' : 'dark');
  }

  return (
    <ThemedView style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <ThemedText type='title' style={[styles.title, isDarkMode ? styles.darkTitle : styles.lightTitle]}>
        Settings
      </ThemedText>

      {/* Account Section */}
      <ThemedView style={[styles.section, isDarkMode ? styles.darkSection : styles.lightSection]}>
        <ThemedText style={[styles.sectionTitle, isDarkMode ? styles.darkSectionTitle : styles.lightSectionTitle]}>Account</ThemedText>
        <Pressable style={styles.button} onPress={() => handleNavigate('/(tabs)/profile')}>
          <ThemedText style={styles.buttonText}>Edit Profile</ThemedText>
        </Pressable>
        <Pressable style={styles.button} onPress={() => handleNavigate('/change-password')}>
          <ThemedText style={styles.buttonText}>Change Password</ThemedText>
        </Pressable>
      </ThemedView>

      {/* General Section */}
      <ThemedView style={[styles.section, isDarkMode ? styles.darkSection : styles.lightSection]}>
        <ThemedText style={[styles.sectionTitle, isDarkMode ? styles.darkSectionTitle : styles.lightSectionTitle]}>General</ThemedText>
        <View style={styles.switchRow}>
          <ThemedText style={[styles.switchLabel, isDarkMode ? styles.darkTitle : styles.lightTitle]}>Dark Mode</ThemedText>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleTheme}
            value={isDarkMode}
          />
        </View>
        <View style={styles.switchRow}>
          <ThemedText style={[styles.switchLabel, isDarkMode ? styles.darkTitle : styles.lightTitle]}>Notifications</ThemedText>
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
  lightContainer: {
    backgroundColor: '#ffffff',
  },
  darkContainer: {
    backgroundColor: '#1a1a2e',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  lightTitle: {
    color: '#000000',
  },
  darkTitle: {
    color: '#E6F4FE',
  },
  section: {
    marginBottom: 20,
    borderRadius: 10,
    padding: 15,
  },
  lightSection: {
    backgroundColor: '#f0f0f0',
  },
  darkSection: {
    backgroundColor: '#2a2a3e',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  lightSectionTitle: {
    color: '#000000',
  },
  darkSectionTitle: {
    color: '#E6F4FE',
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
