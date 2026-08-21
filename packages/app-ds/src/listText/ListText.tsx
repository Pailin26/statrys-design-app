import React from "react";
import { Text, View } from "react-native";
import { styles, textColor } from "./ListText.styles";

export interface ListTextProps {
  text: string;
  /** Second line under `text`, right-aligned, secondary color — mutually exclusive with `flag`. */
  description?: string;
  /** Leading icon (e.g. a country flag) — switches to the one-line "Currency" layout. */
  flag?: React.ReactNode;
  size?: "sm" | "md";
  /** Render `text` as a muted placeholder (e.g. an unset "Select issue date"). */
  placeholder?: boolean;
  /** Flag the value as invalid — red text, wins over `warning`. */
  error?: boolean;
  /** Soft attention state (e.g. a value that must be re-picked) — amber text. */
  warning?: boolean;
}

// Value display for a ListRow's trailing edge. Three layouts, inferred from
// which props are set: plain value, value + a right-aligned description
// below it, or a leading flag/icon + value (the "Currency" layout).
export function ListText({ text, description, flag, size = "md", placeholder = false, error = false, warning = false }: ListTextProps) {
  const color = textColor(error, warning, placeholder);
  const textStyle = [styles.text, size === "sm" ? styles.textSm : styles.textMd, { color }];

  if (flag) {
    return (
      <View style={styles.currency}>
        <View style={styles.flag}>{flag}</View>
        <Text style={textStyle} numberOfLines={1}>
          {text}
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.root}>
      <Text style={textStyle} numberOfLines={1}>
        {text}
      </Text>
      {description && (
        <Text style={styles.description} numberOfLines={1}>
          {description}
        </Text>
      )}
    </View>
  );
}
