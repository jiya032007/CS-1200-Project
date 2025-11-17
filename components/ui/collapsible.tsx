import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

export interface CollapsibleProps {
  children: React.ReactNode;
  title?: React.ReactNode;
}

export function Collapsible({ children, title }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>
      {title && (
        <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={styles.header}>
          {title}
        </TouchableOpacity>
      )}
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  header: {
    padding: 12,
  },
  content: {
    padding: 12,
  },
});