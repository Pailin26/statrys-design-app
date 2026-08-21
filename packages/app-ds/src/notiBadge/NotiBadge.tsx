import React from "react";
import { Text, View, ViewStyle } from "react-native";
import { styles } from "./NotiBadge.styles";

export interface NotiBadgeProps {
  count?: string;
  /** White pill with a brand border/text — use on a brand-colored surface where the solid variant would disappear. */
  inverse?: boolean;
  style?: ViewStyle;
}

export function NotiBadge({ count = "99+", inverse = false, style }: NotiBadgeProps) {
  return (
    <View style={[styles.badge, inverse ? styles.inverse : styles.solid, style]}>
      <Text style={[styles.label, inverse ? styles.labelInverse : styles.labelSolid]}>{count}</Text>
    </View>
  );
}
