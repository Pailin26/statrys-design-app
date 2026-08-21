import { StyleSheet } from "react-native";
import {
  FieldBg,
  FieldBorder,
  FieldBorderFocus,
  FieldBgDisabled,
  BorderErrorBold,
  TextPrimary,
  TextPlaceholder,
  TextDisabled,
  FontPrimary,
  FontWeightRegular,
  FontSizeSm,
  BorderWidthBase,
  RadiusXl,
  Space4,
  Space8,
} from "@statrys/tokens";
import { nativeFontFamily } from "../nativeFont";

// Every value here is an existing shared token — no semantic/search.json.
// 36px height has no matching space token, so it's a plain literal.
export const styles = StyleSheet.create({
  field: {
    flexDirection: "row",
    alignItems: "center",
    gap: Space4,
    height: 36,
    width: "100%",
    paddingHorizontal: Space8,
    backgroundColor: FieldBg,
    borderWidth: BorderWidthBase,
    borderColor: FieldBorder,
    borderRadius: RadiusXl,
  },
  focused: { borderColor: FieldBorderFocus },
  error: { borderColor: BorderErrorBold },
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
});

export function iconColor(disabled: boolean): string {
  return disabled ? TextDisabled : TextPrimary;
}

export function placeholderColor(disabled: boolean): string {
  return disabled ? TextDisabled : TextPlaceholder;
}
