import React from "react";
import { Text, View } from "react-native";
import { styles, containerColors, boldBg, textColors } from "./Badge.styles";

export type BadgeColor = "neutral" | "success" | "warning" | "error" | "info" | "custom";
export type BadgeVariant = "subtle" | "bold" | "text";

export interface BadgeProps {
  label: string;
  size?: "sm" | "md" | "lg";
  variant?: BadgeVariant;
  color?: BadgeColor;
  /** Leading icon — 12px at sm/md, 16px at lg (caller sizes it; Badge only lays it out). */
  icon?: React.ReactNode;
}

const CONTAINER_SIZE = { sm: styles.containerSm, md: styles.containerMd, lg: styles.containerLg };
const TEXT_SIZE = { sm: styles.textSm, md: styles.textMd, lg: styles.textLg };

export function Badge({ label, size = "md", variant = "subtle", color = "neutral", icon }: BadgeProps) {
  return (
    <View
      style={[
        styles.base,
        CONTAINER_SIZE[size],
        variant === "text" && styles.textVariant,
        variant === "bold" ? { backgroundColor: boldBg[color] } : containerColors[variant],
      ]}
    >
      {icon}
      <Text
        style={[
          styles.label,
          TEXT_SIZE[size],
          variant === "text" && styles.labelText,
          { color: textColors[variant][color] },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}
