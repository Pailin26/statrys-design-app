import React from "react";
import { Pressable, Text, PressableProps } from "react-native";
import { styles, containerColors, labelColors } from "./Button.styles";

export type ButtonProps = {
  variant?: "primary" | "secondary" | "tertiary";
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
  const container = containerColors[variant];
  const label = labelColors[variant];

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        styles[size],
        container.base,
        pressed && !disabled && "pressed" in container ? container.pressed : null,
        disabled ? container.disabled : null,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {({ pressed }) => (
        <Text
          style={[
            styles.label,
            { color: label.base },
            pressed && !disabled && "pressed" in label ? { color: label.pressed } : null,
            disabled && "disabled" in label ? { color: label.disabled } : null,
          ]}
        >
          {children}
        </Text>
      )}
    </Pressable>
  );
}
