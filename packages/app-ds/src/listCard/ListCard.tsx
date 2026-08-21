import React from "react";
import { View, ViewStyle } from "react-native";
import { styles } from "./ListCard.styles";

export interface ListCardProps {
  children: React.ReactNode;
  /** Surface this card sits on: "neutral" (default) adds a hairline border for a white page background; "gray" drops it. */
  onLayer?: "neutral" | "gray";
  style?: ViewStyle;
}

export function ListCard({ children, onLayer = "neutral", style }: ListCardProps) {
  return <View style={[styles.card, onLayer === "gray" && styles.gray, style]}>{children}</View>;
}
