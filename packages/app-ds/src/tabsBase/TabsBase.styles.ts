import { StyleSheet } from "react-native";
import {
  RadiusLg,
  BgNeutralPrimary,
  BorderNeutralPrimary,
  BgBrandPrimary,
  TextSecondary,
  TextOnColor,
  TextPrimary,
  IconBrand,
  FontPrimary,
  FontWeightMedium,
  FontSizeSm,
  BorderWidthBase,
  BorderWidthMd,
  Space1,
  Space3,
  Space5,
} from "@statrys/tokens";
import { nativeFontFamily } from "../nativeFont";

// Every value here is an existing shared token — no semantic/tabsBase.json,
// except badgeOverlay's top/right offset below, which has no matching
// token (a cosmetic nudge anchoring the badge to the tab's corner), so
// it's a plain literal.
export const styles = StyleSheet.create({
  tab: {
    position: "relative", // anchors badgeOverlay for the button-style unread badge
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Space1,
    flexShrink: 0,
    paddingVertical: Space3,
    paddingHorizontal: Space5,
  },
  label: {
    fontFamily: nativeFontFamily(FontPrimary, FontWeightMedium),
    fontWeight: String(FontWeightMedium) as "500",
    fontSize: FontSizeSm,
  },
  labelInactive: { color: TextSecondary },
  labelButtonActive: { color: TextOnColor },
  labelUnderlineActive: { color: TextPrimary },
  // Button style: white pill w/ hairline border → orange pill when active.
  button: { borderRadius: RadiusLg, backgroundColor: BgNeutralPrimary, borderWidth: BorderWidthBase, borderColor: BorderNeutralPrimary },
  buttonActive: { backgroundColor: BgBrandPrimary, borderColor: BgBrandPrimary },
  // Underline style: 1.5px brand underline + dark text when active. The
  // inactive underline stays (transparent) so rows don't shift on switch.
  underline: { backgroundColor: "transparent", borderBottomWidth: BorderWidthMd, borderBottomColor: "transparent" },
  underlineActive: { borderBottomColor: IconBrand },
  // Unread badge placement — button style overlays the corner.
  badgeOverlay: { position: "absolute", top: -7, right: -5 },
});
