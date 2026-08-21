import { StyleSheet } from "react-native";
import {
  FieldBg,
  FieldBgDisabled,
  FieldBorder,
  RadiusXl,
  TextPrimary,
  TextDisabled,
  FontPrimary,
  FontWeightMedium,
  FontSizeSm,
  BorderWidthBase,
  Space16,
  Space24,
} from "@statrys/tokens";
import { nativeFontFamily } from "../nativeFont";

// Every value here is an existing shared token — no semantic/numberStepper.json.
// 36px button width has no matching token, so it's a plain literal.
export const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    height: Space24,
    backgroundColor: FieldBg,
    borderWidth: BorderWidthBase,
    borderColor: FieldBorder,
    borderRadius: RadiusXl,
    overflow: "hidden",
  },
  disabled: { backgroundColor: FieldBgDisabled },
  btn: { width: 36, height: "100%", alignItems: "center", justifyContent: "center" },
  value: {
    minWidth: Space16,
    textAlign: "center",
    color: TextPrimary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightMedium),
    fontWeight: String(FontWeightMedium) as "500",
    fontSize: FontSizeSm,
  },
});

export const btnColor = (disabled: boolean): string => (disabled ? TextDisabled : TextPrimary);
