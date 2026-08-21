import { StyleSheet } from "react-native";
import {
  FieldBg,
  FieldBorder,
  FieldBorderFocus,
  FieldBgDisabled,
  BorderErrorBold,
  BgErrorSubtle,
  TextPrimary,
  TextPlaceholder,
  TextSecondary,
  TextDisabled,
  TextErrorPrimary,
  RadiusXl,
  FontPrimary,
  FontWeightRegular,
  FontWeightMedium,
  FontSizeSm,
  FontSizeXs,
  FontSizeBase,
  BorderWidthBase,
  Space2,
  Space6,
  Space8,
} from "@statrys/tokens";
import { nativeFontFamily } from "../nativeFont";

// Every value here is an existing shared token — no semantic/textArea.json.
export const styles = StyleSheet.create({
  field: {
    width: "100%",
    paddingVertical: Space6,
    paddingHorizontal: Space8,
    backgroundColor: FieldBg,
    borderWidth: BorderWidthBase,
    borderColor: FieldBorder,
    borderRadius: RadiusXl,
    color: TextPrimary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightRegular),
    fontWeight: String(FontWeightRegular) as "400",
    fontSize: FontSizeSm,
    textAlignVertical: "top",
  },
  focused: { borderColor: FieldBorderFocus },
  error: { borderColor: BorderErrorBold, backgroundColor: BgErrorSubtle },
  disabled: { backgroundColor: FieldBgDisabled, color: TextDisabled },
  labeled: { flexDirection: "column", alignItems: "flex-start", gap: Space2, width: "100%" },
  label: {
    color: TextPrimary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightRegular),
    fontWeight: String(FontWeightRegular) as "400",
    fontSize: FontSizeSm,
  },
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
});

const LINE_HEIGHT = FontSizeSm * 1.3;

// `rows` has no direct RN multiline-TextInput equivalent (iOS ignores
// numberOfLines for sizing) — approximated as a minHeight covering that many
// lines plus the field's own vertical padding.
export function rowsHeight(rows: number): number {
  return rows * LINE_HEIGHT + Space6 * 2;
}

export function placeholderColor(disabled: boolean): string {
  return disabled ? TextDisabled : TextPlaceholder;
}
