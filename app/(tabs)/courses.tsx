
import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '../../components/themed-text';
import { ThemedView } from '../../components/themed-view';

export default function CoursesScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Courses</ThemedText>
      {/* Placeholder for course management */}
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
