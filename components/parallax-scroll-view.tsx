import React from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';

export interface ParallaxScrollViewProps {
  children: React.ReactNode;
  headerImage?: React.ReactNode;
  headerBackgroundColor?: string;
  style?: ViewStyle;
}

export function ParallaxScrollView({ 
  children, 
  headerImage, 
  headerBackgroundColor,
  style 
}: ParallaxScrollViewProps) {
  return (
    <ScrollView style={[styles.container, style]}>
      {headerImage}
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});