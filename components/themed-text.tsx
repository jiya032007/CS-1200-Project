import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export interface ThemedTextProps extends TextProps {
  type?: 'default' | 'title' | 'link' | 'defaultSemiBold' | 'subtitle';
  lightColor?: string;
  darkColor?: string;
}

export function ThemedText({ 
  style, 
  type = 'default',
  lightColor,
  darkColor,
  ...rest 
}: ThemedTextProps) {
  const { theme } = useTheme();

  return (
    <Text
      style={[
        styles.default,
        { color: theme.textColor },
        type === 'title' && styles.title,
        type === 'defaultSemiBold' && styles.defaultSemiBold,
        type === 'subtitle' && styles.subtitle,
        type === 'link' && { color: theme.primary, textDecorationLine: 'underline' },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    color: '#fff',
    fontSize: 16,
  },
  defaultSemiBold: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  link: {
    color: '#5B9FFF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});