import React from "react";
import { Text, View } from "react-native";
import { styles } from "./EmptyState.styles";

export interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}

// Illustrated zero-state for a register with no rows at all: hand-drawn
// icon, title + subtitle stack, then a primary CTA. Distinct from a "no
// results match this filter/search" message — this is the full-page
// zero-data state, shown in place of the list/tabs/sort row entirely.
export function EmptyState({ icon, title, subtitle, action }: EmptyStateProps) {
  return (
    <View style={styles.root}>
      {icon}
      <View style={styles.text}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      {action}
    </View>
  );
}
