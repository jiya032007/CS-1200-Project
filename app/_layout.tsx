
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { createContext, useState, useContext } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

interface ThemeContextType {
  colorScheme: 'light' | 'dark';
  setColorScheme: (colorScheme: 'light' | 'dark') => void;
}

export const ThemeContext = createContext<ThemeContextType> ({
  colorScheme: 'light',
  setColorScheme: () => {},
});

export default function RootLayout() {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>(useRNColorScheme() ?? 'light');

  return (
    <ThemeContext.Provider value={{ colorScheme, setColorScheme }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack initialRouteName="(auth)">
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          <Stack.Screen name="settings" options={{ title: 'Settings', headerBackTitle: 'Back' }} />
          <Stack.Screen name="privacy-policy" options={{ title: 'Privacy Policy', headerBackTitle: 'Back' }} />
          <Stack.Screen name="terms-of-service" options={{ title: 'Terms of Service', headerBackTitle: 'Back' }} />
          <Stack.Screen name="notifications" options={{ title: 'Notifications', headerBackTitle: 'Back' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
