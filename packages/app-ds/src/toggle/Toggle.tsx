import React from "react";
import { Pressable, View } from "react-native";
import { styles, knobLeft } from "./Toggle.styles";

// `selected` (not accounting ui/Toggle's `checked`) to match web-ds's Toggle
// prop shape — see docs/contributing.md's "same name + props shape across
// platforms" rule.
export interface ToggleProps {
  selected?: boolean;
  disabled?: boolean;
  onChange?: (selected: boolean) => void;
  accessibilityLabel?: string;
}

export function Toggle({ selected = false, disabled = false, onChange, accessibilityLabel }: ToggleProps) {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: selected, disabled }}
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      onPress={() => onChange?.(!selected)}
      style={[
        styles.track,
        disabled ? (selected ? styles.trackSelectedDisabled : styles.trackDisabled) : selected && styles.trackSelected,
      ]}
    >
      <View
        style={[
          styles.knob,
          { left: knobLeft(selected, disabled) },
          disabled && styles.knobDisabled,
        ]}
      />
    </Pressable>
  );
}
