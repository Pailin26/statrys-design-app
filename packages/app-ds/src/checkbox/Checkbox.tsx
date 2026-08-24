import React from "react";
import { Pressable, Text, View } from "react-native";
import { Check, Minus } from "lucide-react-native";
import { styles, boxState, iconColor, iconSize } from "./Checkbox.styles";

// Matches web-ds's Checkbox prop shape (`selected`, flat label+description —
// no separate exported "base glyph" component, since web-ds doesn't have
// one either; accounting's ui/CheckboxBase + ui/Checkbox split is
// prototype-internal only).
export interface CheckboxProps {
  label: string;
  description?: string;
  size?: "sm" | "md";
  selected?: boolean;
  /** Dash glyph instead of a check, for a "some but not all" parent state — only shown while selected. */
  indeterminate?: boolean;
  disabled?: boolean;
  onChange?: (selected: boolean) => void;
}

export function Checkbox({
  label,
  description,
  size = "sm",
  selected = false,
  indeterminate = false,
  disabled = false,
  onChange,
}: CheckboxProps) {
  const Icon = indeterminate ? Minus : Check;
  const glyphSize = iconSize(size);

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: indeterminate ? "mixed" : selected, disabled }}
      disabled={disabled}
      onPress={() => onChange?.(!selected)}
      style={[styles.root, description ? styles.rootWithDescription : styles.rootNoDescription]}
    >
      <View style={[styles.wrapper, size === "md" ? styles.wrapperMd : styles.wrapperSm]}>
        <View style={[styles.box, size === "md" ? styles.boxMd : styles.boxSm, boxState(selected, disabled, size)]}>
          {selected && (
            <Icon width={glyphSize} height={glyphSize} color={iconColor(disabled)} strokeWidth={1} />
          )}
        </View>
      </View>
      <View style={styles.text}>
        <Text style={styles.label}>{label}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
    </Pressable>
  );
}
