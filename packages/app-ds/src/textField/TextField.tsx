import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Chevron, CalendarIcon } from "./icons";
import { USFlag } from "./USFlag";
import { styles, iconColor, PLACEHOLDER_COLOR } from "./TextField.styles";

export type TextFieldType = "text" | "left-icon" | "dropdown" | "date-picker" | "mobile" | "currency" | "unit";

const KEYBOARD_TYPE: Record<string, "default" | "email-address" | "phone-pad" | "numeric"> = {
  email: "email-address",
  tel: "phone-pad",
  number: "numeric",
};

export interface TextFieldProps {
  type?: TextFieldType;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  /** Paints the focused border without real focus. */
  forceFocus?: boolean;
  /** 20px leading icon for type="left-icon" or "dropdown" (inherits the state color). */
  icon?: React.ReactNode;
  /** Selector label — defaults per type: "+1" (mobile), "USD" (currency), "Unit" (unit). */
  selectorLabel?: string;
  /** Selector flag for mobile/currency (Figma icon-swap slot; defaults to the US flag). */
  selectorIcon?: React.ReactNode;
  /** Tap on the country-code / currency / unit selector. */
  onSelectorPress?: () => void;
  /** Explicit override for whether the mobile/currency/unit selector shows its chevron —
   *  defaults to auto (shown only when `onSelectorPress` is set). */
  selectorChevron?: boolean;
  /** Tap on a dropdown / date-picker field. */
  onPress?: () => void;
  /** Native input type (text/left-icon/mobile/currency/unit only) — defaults to "text". */
  inputType?: "text" | "email" | "password" | "tel" | "number";
  onFocus?: () => void;
  onBlur?: () => void;
  accessibilityLabel?: string;
  /** Label above the field (Figma "Fields" wrapper). */
  label?: string;
  /** Appends " *" to the label. */
  mandatory?: boolean;
  /** Helper text below the field; red when `error` is set, yellow when `highlight` is set (error wins if both are set). */
  caption?: string;
  /** Trailing icon/button after the input — not a Figma axis, just a slot for the caller's own trailing control. */
  iconRight?: React.ReactNode;
  /** Soft warning border (e.g. an OCR-missing value to complete) — not a Figma state, just this token swapped in for the field's normal border. */
  highlight?: boolean;
}

const SELECTOR_DEFAULTS: Partial<Record<TextFieldType, string>> = {
  mobile: "+1",
  currency: "USD",
  unit: "Unit",
};

export function TextField({
  type = "text",
  value = "",
  onChange,
  placeholder,
  disabled = false,
  error = false,
  forceFocus = false,
  icon,
  selectorLabel,
  selectorIcon,
  onSelectorPress,
  selectorChevron,
  onPress,
  inputType = "text",
  onFocus,
  onBlur,
  accessibilityLabel,
  label,
  mandatory = false,
  caption,
  iconRight,
  highlight = false,
}: TextFieldProps) {
  const [focused, setFocused] = useState(false);
  const hasSelector = type === "mobile" || type === "currency" || type === "unit";
  const isFocusedLook = (focused || forceFocus) && !error;

  const fieldStyle = [
    styles.field,
    hasSelector && styles.withSelector,
    isFocusedLook && styles.focused,
    error && styles.error,
    highlight && !error && styles.highlight,
    disabled && styles.disabled,
  ];

  // No onSelectorPress → nothing to tap (e.g. a currency fixed per invoice) —
  // render plain text rather than a control that implies it's interactive.
  const showChevron = selectorChevron ?? !!onSelectorPress;
  const selectorContent = (
    <>
      {type !== "unit" && <View style={[styles.flag, disabled && styles.flagDisabled]}>{selectorIcon ?? <USFlag />}</View>}
      <Text style={[styles.selectorText, disabled && styles.disabledText]}>{selectorLabel ?? SELECTOR_DEFAULTS[type]}</Text>
      {showChevron && <Chevron size={16} color={iconColor("secondary", disabled)} />}
    </>
  );
  const selector = hasSelector && (
    onSelectorPress ? (
      <Pressable accessibilityRole="button" disabled={disabled} onPress={onSelectorPress} style={styles.selector}>
        {selectorContent}
      </Pressable>
    ) : (
      <View style={styles.selector}>{selectorContent}</View>
    )
  );

  let field: React.ReactNode;
  if (type === "dropdown" || type === "date-picker") {
    field = (
      <View style={fieldStyle}>
        <Pressable accessibilityRole="button" accessibilityLabel={accessibilityLabel} disabled={disabled} onPress={onPress} style={styles.picker}>
          {type === "dropdown" && icon && <View style={styles.leftIcon}>{icon}</View>}
          <Text style={[styles.pickerText, !value && styles.placeholderText, disabled && styles.disabledText]} numberOfLines={1}>
            {value || placeholder}
          </Text>
          {type === "dropdown" ? (
            <Chevron size={24} color={iconColor("secondary", disabled)} />
          ) : (
            <CalendarIcon color={iconColor("primary", disabled)} />
          )}
        </Pressable>
      </View>
    );
  } else {
    field = (
      <View style={fieldStyle}>
        {type === "left-icon" && icon && <View style={styles.leftIcon}>{icon}</View>}
        {type !== "unit" && selector}
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
          placeholderTextColor={PLACEHOLDER_COLOR}
          editable={!disabled}
          keyboardType={KEYBOARD_TYPE[inputType] ?? "default"}
          secureTextEntry={inputType === "password"}
          accessibilityLabel={accessibilityLabel}
        />
        {type === "unit" && selector}
        {iconRight && <View style={styles.rightIcon}>{iconRight}</View>}
      </View>
    );
  }

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
      {caption && (
        <Text style={[styles.caption, error ? styles.captionError : highlight ? styles.captionHighlight : null]}>{caption}</Text>
      )}
    </View>
  );
}
