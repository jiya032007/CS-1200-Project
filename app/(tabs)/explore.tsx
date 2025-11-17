import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';

export default function ExploreScreen() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>Explore</ThemedText>
        
        <Collapsible title={<ThemedText type="defaultSemiBold">Section 1</ThemedText>}>
          <ThemedText>This is collapsible content 1</ThemedText>
        </Collapsible>

        <Collapsible title={<ThemedText type="defaultSemiBold">Section 2</ThemedText>}>
          <ThemedText>This is collapsible content 2</ThemedText>
        </Collapsible>

        <Collapsible title={<ThemedText type="defaultSemiBold">Section 3</ThemedText>}>
          <ThemedText>This is collapsible content 3</ThemedText>
        </Collapsible>
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
    marginBottom: 20,
  },
});