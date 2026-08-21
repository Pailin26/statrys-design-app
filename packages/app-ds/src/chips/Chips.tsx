import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { X } from "lucide-react-native";
import { styles, dismissIconColor } from "./Chips.styles";

export type ChipsType = "filter" | "input";

export interface ChipsProps {
  label: string;
  type?: ChipsType;
  /** Filter type only — the active/selected toggle state. */
  active?: boolean;
  /** Filter type only (or an input chip that's also tappable, e.g. to edit) — tap anywhere on the chip. */
  onPress?: () => void;
  /** Input type only — shows the trailing "x" and fires this when it's tapped. */
  onDismiss?: () => void;
}

export function Chips({ label, type = "filter", active = false, onPress, onDismiss }: ChipsProps) {
  const isInput = type === "input";
  const [pressed, setPressed] = useState(false);

  if (isInput) {
    // Never a Pressable nested around the dismiss Pressable — the label
    // (+ optional onPress) and the dismiss button are two independent tap
    // targets, not one control inside another.
    return (
      <View
        style={[styles.chip, styles.input, pressed && styles.inputPressed]}
        onTouchStart={() => setPressed(true)}
        onTouchEnd={() => setPressed(false)}
        onTouchCancel={() => setPressed(false)}
      >
        <Pressable onPress={onPress}>
          <Text style={[styles.label]} numberOfLines={1}>
            {label}
          </Text>
        </Pressable>
        {onDismiss && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Remove ${label}`}
            onPress={onDismiss}
            style={styles.dismiss}
          >
            <X size={16} strokeWidth={1.67} color={dismissIconColor} />
          </Pressable>
        )}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={[styles.chip, active && styles.active]}
    >
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}
