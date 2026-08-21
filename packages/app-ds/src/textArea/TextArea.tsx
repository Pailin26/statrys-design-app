import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { styles, placeholderColor, rowsHeight } from "./TextArea.styles";

export interface TextAreaProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  error?: boolean;
  /** Paints the focused border without real focus. */
  forceFocus?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  accessibilityLabel?: string;
  /** Label above the field (Figma "TextArea" wrapper). */
  label?: string;
  /** Appends " *" to the label. */
  mandatory?: boolean;
  /** Helper text below the field; red when `error` is set. */
  caption?: string;
}

export function TextArea({
  value = "",
  onChange,
  placeholder,
  rows = 5,
  disabled = false,
  error = false,
  forceFocus = false,
  onFocus,
  onBlur,
  accessibilityLabel,
  label,
  mandatory = false,
  caption,
}: TextAreaProps) {
  const [focused, setFocused] = useState(false);
  const isFocusedLook = (focused || forceFocus) && !error;

  const field = (
    <TextInput
      style={[
        styles.field,
        { minHeight: rowsHeight(rows) },
        isFocusedLook && styles.focused,
        error && styles.error,
        disabled && styles.disabled,
      ]}
      multiline
      value={value}
      onChangeText={onChange}
      onFocus={() => {
        setFocused(true);
        onFocus?.();
      }}
      onBlur={() => {
        setFocused(false);
        onBlur?.();
      }}
      placeholder={placeholder}
      placeholderTextColor={placeholderColor(disabled)}
      editable={!disabled}
      accessibilityLabel={accessibilityLabel}
    />
  );

  if (!label && !caption) return field;
  return (
    <View style={styles.labeled}>
      {label && (
        <Text style={styles.label}>
          {label}
          {mandatory && <Text style={error ? styles.asteriskError : styles.asterisk}> *</Text>}
        </Text>
      )}
      {field}
      {caption && <Text style={[styles.caption, error && styles.captionError]}>{caption}</Text>}
    </View>
  );
}
