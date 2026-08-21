import { StyleSheet } from "react-native";
import {
  ChipsText,
  ChipsActiveBorder,
  ChipsBorder,
  ChipsRadius,
  ChipsPaddingHorizontal,
  ChipsHeight,
  ChipsInputBg,
  ChipsInputPressedBg,
  ChipsInputPressedBorder,
  ChipsGap,
  ChipsDismissIconColor,
  ChipsDismissSize,
  ChipsFontFamily,
  ChipsFontWeight,
  ChipsFontSize,
} from "@statrys/tokens";
import { nativeFontFamily } from "../nativeFont";

// Every value here comes from semantic/chips.json.
export const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: ChipsHeight,
    paddingHorizontal: ChipsPaddingHorizontal,
    borderWidth: 1,
    borderColor: ChipsBorder,
    borderRadius: ChipsRadius,
    backgroundColor: "transparent",
  },
  active: { borderColor: ChipsActiveBorder },
  input: { gap: ChipsGap, backgroundColor: ChipsInputBg },
  inputPressed: { backgroundColor: ChipsInputPressedBg, borderColor: ChipsInputPressedBorder },
  label: {
    color: ChipsText,
    fontFamily: nativeFontFamily(ChipsFontFamily, ChipsFontWeight),
    fontWeight: String(ChipsFontWeight) as "500",
    fontSize: ChipsFontSize,
  },
  dismiss: { width: ChipsDismissSize, height: ChipsDismissSize, alignItems: "center", justifyContent: "center" },
});

export const dismissIconColor = ChipsDismissIconColor;
