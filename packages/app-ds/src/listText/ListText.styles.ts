import { StyleSheet } from "react-native";
import {
  TextPrimary,
  TextPlaceholder,
  TextErrorPrimary,
  TextWarningPrimary,
  TextSecondary,
  FontPrimary,
  FontWeightMedium,
  FontWeightRegular,
  FontSizeSm,
  FontSizeXs,
  Space2,
} from "@statrys/tokens";
import { nativeFontFamily } from "../nativeFont";

// Every value here is an existing shared token — no semantic/listText.json.
export const styles = StyleSheet.create({
  root: { flexDirection: "column", alignItems: "flex-end", justifyContent: "center", minWidth: 0 },
  currency: { flexDirection: "row", alignItems: "center", gap: Space2, minWidth: 0 },
  flag: { flexShrink: 0 },
  text: {
    minWidth: 0,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightMedium),
    fontWeight: String(FontWeightMedium) as "500",
  },
  textMd: { fontSize: FontSizeSm, lineHeight: FontSizeSm * 1.3 },
  textSm: { fontSize: FontSizeXs, lineHeight: FontSizeXs * 1.3 },
  description: {
    color: TextSecondary,
    textAlign: "right",
    fontFamily: nativeFontFamily(FontPrimary, FontWeightRegular),
    fontWeight: String(FontWeightRegular) as "400",
    fontSize: FontSizeXs,
    lineHeight: FontSizeXs * 1.3,
  },
});

export function textColor(error: boolean, warning: boolean, placeholder: boolean): string {
  if (error) return TextErrorPrimary;
  if (warning) return TextWarningPrimary;
  if (placeholder) return TextPlaceholder;
  return TextPrimary;
}
