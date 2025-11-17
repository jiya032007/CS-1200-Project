
import { Tabs, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/config/firebase';

export default function TabLayout() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (!user) {
        router.replace('/(auth)/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#5B9FFF',
        tabBarInactiveTintColor: '#9BA1A6',
        tabBarStyle: {
          backgroundColor: '#1a1a2e',
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <span style={{ fontSize: 24 }}>🏠</span>,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <span style={{ fontSize: 24 }}>🔍</span>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <span style={{ fontSize: 24 }}>👤</span>,
        }}
      />
    </Tabs>
  );
}
