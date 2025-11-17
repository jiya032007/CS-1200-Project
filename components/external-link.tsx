import React from 'react';
import { Linking, TouchableOpacity, Text, StyleSheet } from 'react-native';

export interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  style?: any;
}

export function ExternalLink({ href, children, style }: ExternalLinkProps) {
  const handlePress = () => {
    Linking.openURL(href);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={style}>
      {typeof children === 'string' ? (
        <Text style={styles.link}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  link: {
    color: '#5B9FFF',
    textDecorationLine: 'underline',
  },
});