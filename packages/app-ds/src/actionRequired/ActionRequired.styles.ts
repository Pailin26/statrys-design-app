import { StyleSheet } from "react-native";
import { BgNeutralPrimary, RadiusXl, ShadowLg, TextPrimary, TextSecondary, FontPrimary, FontWeightMedium, FontWeightRegular, FontSizeSm, FontSizeXs, Space2, Space4, Space6 } from "@statrys/tokens";
import { nativeFontFamily } from "../nativeFont";
import { parseCssBoxShadow } from "../nativeShadow";

// Every value here is an existing shared token — no semantic/actionRequired.json.
// 60px minHeight has no matching token, so it's a plain literal.
const cardShadow = parseCssBoxShadow(ShadowLg);

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: Space4,
    backgroundColor: BgNeutralPrimary,
    borderRadius: RadiusXl,
    padding: Space6,
    minHeight: 60,
    ...cardShadow,
  },
  body: { flex: 1, minWidth: 0, flexDirection: "column", gap: Space2 },
  title: {
    color: TextPrimary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightMedium),
    fontWeight: String(FontWeightMedium) as "500",
    fontSize: FontSizeSm,
  },
  description: {
    color: TextSecondary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightRegular),
    fontWeight: String(FontWeightRegular) as "400",
    fontSize: FontSizeXs,
  },
});
