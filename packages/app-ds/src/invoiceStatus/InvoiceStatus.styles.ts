import { StyleSheet } from "react-native";
import {
  TextSecondary,
  TextSuccessPrimary,
  TextWarningPrimary,
  TextErrorPrimary,
  TextInfoPrimary,
  TextBrand,
  FontPrimary,
  FontWeightRegular,
  FontSizeXs,
  Space1,
} from "@statrys/tokens";
import { nativeFontFamily } from "../nativeFont";
import type { BadgeColor } from "../badge/Badge";

// Every value here is an existing shared token — no semantic/invoiceStatus.json.
export const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: Space1, width: "100%" },
  label: {
    fontFamily: nativeFontFamily(FontPrimary, FontWeightRegular),
    fontWeight: String(FontWeightRegular) as "400",
    fontSize: FontSizeXs,
    lineHeight: FontSizeXs * 1.3,
    textTransform: "uppercase",
  },
  caption: {
    color: TextSecondary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightRegular),
    fontWeight: String(FontWeightRegular) as "400",
    fontSize: FontSizeXs,
    lineHeight: FontSizeXs * 1.3,
  },
});

// `custom` is a gradient-clipped label on web; approximated with a solid
// TextBrand on native, same call as Badge's color="custom".
export function labelColor(color: BadgeColor): string {
  return {
    neutral: TextSecondary,
    success: TextSuccessPrimary,
    warning: TextWarningPrimary,
    error: TextErrorPrimary,
    info: TextInfoPrimary,
    custom: TextBrand,
  }[color];
}
