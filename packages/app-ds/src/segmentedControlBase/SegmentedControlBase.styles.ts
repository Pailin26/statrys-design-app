import { StyleSheet } from "react-native";
import { TextSecondary, TextPrimary, BgNeutralPrimary, RadiusLg, FontPrimary, FontWeightMedium, FontSizeXs, Space2, Space4, Space6 } from "@statrys/tokens";
import { nativeFontFamily } from "../nativeFont";
import { parseCssBoxShadow } from "../nativeShadow";

// Every value here is an existing shared token — no semantic/segmentedControlBase.json.
// The thumb's shadow has no matching token, so it's a plain literal.
const thumbShadow = parseCssBoxShadow("0px 4px 2px rgba(0, 0, 0, 0.06)");

export const styles = StyleSheet.create({
  segment: {
    flex: 1,
    minWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Space4,
    paddingHorizontal: Space6,
    borderRadius: RadiusLg,
    backgroundColor: "transparent",
  },
  thumb: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: RadiusLg,
    backgroundColor: BgNeutralPrimary,
    ...thumbShadow,
  },
  content: { flexDirection: "row", alignItems: "center", gap: Space2, minWidth: 0 },
  label: {
    color: TextSecondary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightMedium),
    fontWeight: String(FontWeightMedium) as "500",
    fontSize: FontSizeXs,
    lineHeight: FontSizeXs * 1.3,
  },
  labelActive: { color: TextPrimary },
});
