import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

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
  return (
    <Text
      style={[
        styles.default,
        type === 'title' && styles.title,
        type === 'defaultSemiBold' && styles.defaultSemiBold,
        type === 'subtitle' && styles.subtitle,
        type === 'link' && styles.link,
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