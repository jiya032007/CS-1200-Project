import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

export interface IconSymbolProps extends TextProps {
  name: string;
  size?: number;
  color?: string;
}

export function IconSymbol({ name, size = 24, color = '#fff', style, ...rest }: IconSymbolProps) {
  return (
    <Text
      style={[
        styles.icon,
        { fontSize: size, color },
        style,
      ]}
      {...rest}
    >
      {name}
    </Text>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontWeight: 'bold',
  },
});