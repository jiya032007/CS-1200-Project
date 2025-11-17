import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

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
  const { theme } = useTheme();
  return <View style={[{ backgroundColor: theme.backgroundColor }, styles.default, style]} {...rest} />;
}

const styles = StyleSheet.create({
  default: {
    flex: 1,
  },
});