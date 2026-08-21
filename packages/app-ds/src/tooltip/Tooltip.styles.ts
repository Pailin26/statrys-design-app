import { StyleSheet } from "react-native";
import {
  BgBeigeSecondary,
  TextPrimary,
  TextSecondary,
  BgNeutralInversePrimary,
  TextNeutralInversePrimary,
  TextNeutralInverseSecondary,
  RadiusXl,
  FontPrimary,
  FontWeightMedium,
  FontSizeXs,
  Space2,
  Space4,
  Space6,
} from "@statrys/tokens";
import { nativeFontFamily } from "../nativeFont";

// Every value here is an existing shared token — no semantic/tooltip.json.
// shadow.tooltip is a 2-layer CSS filter: drop-shadow(0px 12px 8px
// rgba(35,40,77,0.08)) drop-shadow(0px 4px 3px rgba(35,40,77,0.03)) — RN's
// shadow* props support only one layer, so this keeps just the larger
// (first) layer as a plain literal shadow, dropping the second.
export const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    shadowColor: "rgb(35, 40, 77)",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 8,
    elevation: 4,
  },
  rootRow: { flexDirection: "row" },
  alignStart: { alignItems: "flex-start" },
  alignEnd: { alignItems: "flex-end" },
  bubble: {
    borderRadius: RadiusXl,
    paddingVertical: Space4,
    paddingHorizontal: Space6,
  },
  bubbleWithDescription: {
    maxWidth: 320,
    flexDirection: "column",
    gap: Space2,
    padding: Space6,
  },
  title: {
    fontFamily: nativeFontFamily(FontPrimary, FontWeightMedium),
    fontWeight: String(FontWeightMedium) as "500",
    fontSize: FontSizeXs,
    lineHeight: FontSizeXs * 1.3,
  },
  description: {
    fontFamily: nativeFontFamily(FontPrimary, FontWeightMedium),
    fontWeight: String(FontWeightMedium) as "500",
    fontSize: FontSizeXs,
    lineHeight: FontSizeXs * 1.3,
  },
  // Arrow slot is 6px deep after a 2.5px overlap with the bubble (matches
  // web's negative-margin overlap so the shared fill hides the seam).
  arrowMarginTop: { marginBottom: -2.5 },
  arrowMarginBottom: { marginTop: -2.5 },
  arrowMarginLeft: { marginRight: -2.5 },
  arrowMarginRight: { marginLeft: -2.5 },
  arrowOffsetLeft: { marginLeft: Space6 },
  arrowOffsetRight: { marginRight: Space6 },
});

export function bubbleColors(inverse: boolean) {
  return inverse
    ? { bg: BgNeutralInversePrimary, title: TextNeutralInversePrimary, text: TextNeutralInverseSecondary }
    : { bg: BgBeigeSecondary, title: TextPrimary, text: TextSecondary };
}
