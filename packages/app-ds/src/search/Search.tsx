import React, { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { Search as SearchIcon, X, Mic } from "lucide-react-native";
import { styles, iconColor, placeholderColor } from "./Search.styles";

export interface SearchProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  /** Paints the focused border + clear button without real focus. */
  forceFocus?: boolean;
  /** Trailing mic action (Figma showAction). */
  showAction?: boolean;
  onMicPress?: () => void;
  accessibilityLabel?: string;
  autoFocus?: boolean;
}

export function Search({
  value = "",
  onChange,
  placeholder,
  disabled = false,
  error = false,
  onFocus,
  onBlur,
  forceFocus = false,
  showAction = true,
  onMicPress,
  accessibilityLabel,
  autoFocus = false,
}: SearchProps) {
  const [focused, setFocused] = useState(false);
  const showClear = focused || forceFocus;
  const isFocusedLook = showClear && !error;

  return (
    <View style={[styles.field, isFocusedLook && styles.focused, error && styles.error, disabled && styles.disabled]}>
      <SearchIcon size={20} strokeWidth={1} color={iconColor(disabled)} />
      <TextInput
        style={[styles.input, disabled && styles.disabledText]}
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
        autoFocus={autoFocus}
        accessibilityLabel={accessibilityLabel}
      />
      {/* X replaces the mic while focused, same convention as PageHeader's search pill. */}
      {showClear ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Clear search" onPress={() => onChange?.("")}>
          <X size={20} strokeWidth={1} color={iconColor(disabled)} />
        </Pressable>
      ) : (
        showAction && (
          <Pressable accessibilityRole="button" accessibilityLabel="Voice search" disabled={disabled} onPress={onMicPress}>
            <Mic size={20} strokeWidth={1} color={iconColor(disabled)} />
          </Pressable>
        )
      )}
    </View>
  );
}
