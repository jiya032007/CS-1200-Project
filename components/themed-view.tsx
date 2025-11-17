import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';

export interface ThemedViewProps extends ViewProps {
  lightColor?: string;
  darkColor?: string;
}

export function ThemedView({ 
  style, 
  lightColor,
  darkColor,
  ...rest 
}: ThemedViewProps) {
  return <View style={[styles.default, style]} {...rest} />;
}

const styles = StyleSheet.create({
  default: {
    backgroundColor: '#1a1a2e',
  },
});