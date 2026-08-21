import { StyleSheet } from "react-native";
import {
  FieldBg,
  FieldBorder,
  FieldBorderFocus,
  FieldBgDisabled,
  BorderErrorBold,
  BgErrorSubtle,
  BorderWarningBold,
  TextPrimary,
  TextPlaceholder,
  TextSecondary,
  TextDisabled,
  TextErrorPrimary,
  TextWarningPrimary,
  RadiusXl,
  FontPrimary,
  FontWeightRegular,
  FontWeightMedium,
  FontSizeSm,
  FontSizeXs,
  FontSizeBase,
  BorderWidthBase,
  Space2,
  Space4,
  Space8,
  Space24,
} from "@statrys/tokens";
import { nativeFontFamily } from "../nativeFont";

// Every value here is an existing shared token — no semantic/textField.json.
export const styles = StyleSheet.create({
  field: {
    flexDirection: "row",
    alignItems: "center",
    gap: Space4,
    height: Space24,
    width: "100%",
    paddingHorizontal: Space8,
    backgroundColor: FieldBg,
    borderWidth: BorderWidthBase,
    borderColor: FieldBorder,
    borderRadius: RadiusXl,
  },
  withSelector: { gap: Space8 },
  focused: { borderColor: FieldBorderFocus },
  error: { borderColor: BorderErrorBold, backgroundColor: BgErrorSubtle },
  highlight: { borderColor: BorderWarningBold },
  disabled: { backgroundColor: FieldBgDisabled },
  input: {
    flex: 1,
    minWidth: 0,
    padding: 0,
    color: TextPrimary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightRegular),
    fontWeight: String(FontWeightRegular) as "400",
    fontSize: FontSizeSm,
  },
  disabledText: { color: TextDisabled },
  // Country-code / currency / unit selector (flag + label + chevron).
  selector: { flexDirection: "row", alignItems: "center", gap: Space2 },
  selectorText: {
    color: TextPrimary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightRegular),
    fontWeight: String(FontWeightRegular) as "400",
    fontSize: FontSizeSm,
  },
  flag: {},
  flagDisabled: { opacity: 0.4 },
  leftIcon: {},
  rightIcon: { flexShrink: 0 },
  // Dropdown / date-picker: the whole row is one tap target.
  picker: { flex: 1, flexDirection: "row", alignItems: "center", gap: Space4, height: "100%" },
  pickerText: {
    flex: 1,
    minWidth: 0,
    color: TextPrimary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightRegular),
    fontWeight: String(FontWeightRegular) as "400",
    fontSize: FontSizeSm,
  },
  placeholderText: { color: TextPlaceholder },
  // Label + caption wrapper (Figma "Fields").
  labeled: { flexDirection: "column", alignItems: "flex-start", gap: Space2, width: "100%" },
  label: {
    color: TextPrimary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightRegular),
    fontWeight: String(FontWeightRegular) as "400",
    fontSize: FontSizeSm,
  },
  // Red only while THIS field currently fails validation — never merely for
  // being mandatory (the label text itself always stays text.primary).
  asterisk: { fontSize: FontSizeBase, fontWeight: String(FontWeightMedium) as "500", color: TextPrimary },
  asteriskError: { fontSize: FontSizeBase, fontWeight: String(FontWeightMedium) as "500", color: TextErrorPrimary },
  caption: {
    color: TextSecondary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightRegular),
    fontWeight: String(FontWeightRegular) as "400",
    fontSize: FontSizeXs,
    lineHeight: FontSizeXs * 1.3,
  },
  captionError: { color: TextErrorPrimary },
  captionHighlight: { color: TextWarningPrimary },
});

export const PLACEHOLDER_COLOR = TextPlaceholder;

export function iconColor(kind: "primary" | "secondary", disabled: boolean): string {
  if (disabled) return TextDisabled;
  return kind === "primary" ? TextPrimary : TextSecondary;
}
