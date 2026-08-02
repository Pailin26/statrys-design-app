import React from "react";
import { Pressable, Text, PressableProps } from "react-native";
import { styles } from "./Button.styles";

export type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  children: string;
  onPress?: PressableProps["onPress"];
};

export function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  children,
  onPress,
}: ButtonProps) {
  return (
    <Pressable
      style={[styles.base, styles[variant], styles[size], disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.label, variant === "ghost" && styles.ghostLabel]}>{children}</Text>
    </Pressable>
  );
}
