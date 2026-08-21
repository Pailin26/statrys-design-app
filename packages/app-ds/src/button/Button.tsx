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

const CONTAINER_SIZE = { sm: styles.containerSm, md: styles.containerMd, lg: styles.containerLg };
const TEXT_SIZE = { sm: styles.textSm, md: styles.textMd, lg: styles.textLg };

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
        CONTAINER_SIZE[size],
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
            TEXT_SIZE[size],
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
