import React from "react";
import { Pressable, Text } from "react-native";
import { containerColors, labelColors } from "../button/Button.styles";
import { styles } from "./FAB.styles";

export type FABHierarchy = "primary" | "secondary" | "tertiary";

export interface FABProps {
  label?: string;
  onPress?: () => void;
  hierarchy?: FABHierarchy;
  /** Icon-only circle FAB (46×46); pass the icon via `icon`. */
  circle?: boolean;
  /** Rounded pill only: show the collapsed 46px-circle-equivalent look (label
   *  hidden, iconLeft stays) — toggle on scroll for the pill→circle interaction.
   *  Web smoothly morphs this; ported as a static conditional render, no
   *  react-native-reanimated dependency for a single collapse animation. */
  collapsed?: boolean;
  icon?: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  disabled?: boolean;
  accessibilityLabel?: string;
}

// Same color rules as Button — reuses its containerColors/labelColors maps
// (the Figma FAB uses the exact same color tokens as Button). What differs:
// fully-rounded pill shape, shadow.lg, 20px icon slots, and a 46×46 circle
// shape. `inverse` isn't ported — app-ds's own Button doesn't have an
// inverse hierarchy yet either.
export function FAB({
  label,
  onPress,
  hierarchy = "primary",
  circle = false,
  collapsed = false,
  icon,
  iconLeft,
  iconRight,
  disabled = false,
  accessibilityLabel,
}: FABProps) {
  const container = containerColors[hierarchy];
  const labelC = labelColors[hierarchy];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.fab,
        circle ? styles.circle : styles.rounded,
        !circle && collapsed && styles.collapsed,
        container.base,
        pressed && !disabled && "pressed" in container ? container.pressed : null,
        disabled ? container.disabled : null,
      ]}
    >
      {circle ? (
        icon
      ) : (
        <>
          {iconLeft}
          {label && !collapsed && (
            <Text
              style={[
                styles.label,
                { color: labelC.base },
                "disabled" in labelC && disabled ? { color: labelC.disabled } : null,
              ]}
              numberOfLines={1}
            >
              {label}
            </Text>
          )}
          {iconRight}
        </>
      )}
    </Pressable>
  );
}
