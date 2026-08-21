import { StyleSheet } from "react-native";
import {
  BgBrandPrimary,
  TextOnColor,
  BgNeutralPrimary,
  BorderBrandPrimary,
  TextBrand,
  Space7,
  Space1,
  Space2,
  BorderWidthBase,
  RadiusFull,
  FontPrimary,
  FontWeightMedium,
  FontSizeXs,
  ShadowSm,
} from "@statrys/tokens";
import { nativeFontFamily } from "../nativeFont";
import { parseCssBoxShadow } from "../nativeShadow";

// Every value here is an existing shared token — no semantic/notiBadge.json,
// this component's dimensions/colors all match existing tokens exactly.
const shadow = parseCssBoxShadow(ShadowSm);
const LINE_HEIGHT_RATIO = 1.3; // matches accounting ui/NotiBadge's line-height: 1.3 (no lineHeight token exists to alias)

export const styles = StyleSheet.create({
  badge: {
    height: Space7,
    minWidth: Space7,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Space1,
    paddingHorizontal: Space2,
    borderRadius: RadiusFull,
    ...shadow,
  },
  solid: { backgroundColor: BgBrandPrimary },
  inverse: { backgroundColor: BgNeutralPrimary, borderWidth: BorderWidthBase, borderColor: BorderBrandPrimary },
  label: {
    fontFamily: nativeFontFamily(FontPrimary, FontWeightMedium),
    fontWeight: String(FontWeightMedium) as "500",
    fontSize: FontSizeXs,
    lineHeight: FontSizeXs * LINE_HEIGHT_RATIO,
  },
  labelSolid: { color: TextOnColor },
  labelInverse: { color: TextBrand },
});
