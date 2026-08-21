import React from "react";
import { Pressable } from "react-native";
import { X } from "lucide-react-native";
import { styles, iconColor, hoverBg } from "./XClose.styles";

export type XCloseSize = "sm" | "md";

export interface XCloseProps {
  size?: XCloseSize;
  /** Light-on-dark palette for dark surfaces (e.g. ToastMessage). */
  inverse?: boolean;
  onPress?: () => void;
  accessibilityLabel?: string;
}

const HIT_SIZE = { sm: styles.sizeSm, md: styles.sizeMd };
const GLYPH_SIZE = { sm: 10, md: 16 };

// Web's XClose has its own momentary Hover state (pointer enter/leave); the
// native equivalent of a hover-only surface is Pressable's `pressed` state,
// there being no persistent pointer-hover concept on touch.
export function XClose({ size = "sm", inverse = false, onPress, accessibilityLabel = "Close" }: XCloseProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        HIT_SIZE[size],
        pressed && { backgroundColor: hoverBg(inverse) },
      ]}
    >
      <X size={GLYPH_SIZE[size]} color={iconColor(inverse)} />
    </Pressable>
  );
}
