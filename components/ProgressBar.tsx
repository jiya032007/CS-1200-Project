import React from "react";
import { View, StyleSheet } from "react-native";

export default function ProgressBar({ pct, color }: { pct: number; color: string }) {
  return (
    <View style={styles.track}>
      <View style={[styles.bar, { width: `${pct}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: "100%",
    height: 14,
    backgroundColor: "#1A1F66",
    borderRadius: 12,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    borderRadius: 12,
  },
});
