import { StyleSheet } from "react-native";
import { TextPrimary, TextSecondary, FontPrimary, FontWeightMedium, FontWeightRegular, TypographyBodyMd, FontSizeSm, Space1, Space8 } from "@statrys/tokens";
import { nativeFontFamily } from "../nativeFont";

// Every value here is an existing shared token — no semantic/emptyState.json.
// 56px top padding has no matching token.
export const styles = StyleSheet.create({
  root: { flexDirection: "column", alignItems: "center", justifyContent: "center", gap: Space8, width: "100%", paddingTop: 56 },
  text: { flexDirection: "column", alignItems: "center", gap: Space1 },
  title: {
    color: TextPrimary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightMedium),
    fontWeight: String(FontWeightMedium) as "500",
    fontSize: TypographyBodyMd,
    lineHeight: TypographyBodyMd * 1.3,
    textAlign: "center",
  },
  subtitle: {
    color: TextSecondary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightRegular),
    fontWeight: String(FontWeightRegular) as "400",
    fontSize: FontSizeSm,
    lineHeight: FontSizeSm * 1.3,
    textAlign: "center",
  },
});
