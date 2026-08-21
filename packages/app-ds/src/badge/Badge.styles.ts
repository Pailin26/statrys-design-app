import { StyleSheet } from "react-native";
import {
  TextPrimary,
  TextSuccessPrimary,
  TextWarningPrimary,
  TextErrorPrimary,
  TextInfoPrimary,
  TextBrand,
  TextOnColor,
  TextSuccessInverse,
  TextWarningInverse,
  TextErrorInverse,
  TextInfoInverse,
  BgNeutralInverseTertiary,
  BgSuccessBold,
  BgWarningBold,
  BgErrorBold,
  BgInfoBold,
  BgBrandPrimary,
  BgNeutralPrimary,
  BorderNeutralPrimary,
  RadiusMd,
  BorderWidthBase,
  FontPrimary,
  FontWeightMedium,
  FontWeightRegular,
  FontSizeXs,
  FontSizeSm,
  FontSizeBase,
  Space1,
  Space2,
  Space3,
  Space4,
  Space5,
  Space8,
  Space9,
  Space10,
} from "@statrys/tokens";
import { nativeFontFamily } from "../nativeFont";

// Every value here is an existing shared token (bg.*/text.*/border.*/space.*)
// — no semantic/badge.json, this component's values don't need their own
// per-component aliases (see docs/contributing.md's aliasing rule: only
// needed when a value must be overridable independent of the shared token).
export const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Space2,
    borderRadius: RadiusMd,
    alignSelf: "flex-start",
  },
  containerSm: { height: Space8, paddingVertical: Space1, paddingHorizontal: Space3 },
  containerMd: { height: Space9, paddingVertical: Space1, paddingHorizontal: Space4 },
  containerLg: { height: Space10, paddingVertical: Space1, paddingHorizontal: Space5 },
  // variant=text: no fill/border, no horizontal padding (base container
  // padding above is overridden back to 0 here).
  textVariant: { backgroundColor: "transparent", paddingHorizontal: 0 },
  label: { fontFamily: nativeFontFamily(FontPrimary, FontWeightMedium), fontWeight: String(FontWeightMedium) as "500" },
  labelText: {
    fontFamily: nativeFontFamily(FontPrimary, FontWeightRegular),
    fontWeight: String(FontWeightRegular) as "400",
    textTransform: "uppercase",
  },
  textSm: { fontSize: FontSizeXs },
  textMd: { fontSize: FontSizeSm },
  textLg: { fontSize: FontSizeBase },
});

// subtle/text share one fixed container look (only the label color varies
// by `color` — see textColors below); bold's background instead varies per
// `color`, so it's its own map (boldBg) rather than living here.
export const containerColors = {
  subtle: { backgroundColor: BgNeutralPrimary, borderWidth: BorderWidthBase, borderColor: BorderNeutralPrimary },
  text: {},
} as const;

// `custom` has no real gradient on native yet (no expo-linear-gradient/
// masked-view dependency) — solid brand color stands in for it, same as
// before.
export const boldBg = {
  neutral: BgNeutralInverseTertiary,
  success: BgSuccessBold,
  warning: BgWarningBold,
  error: BgErrorBold,
  info: BgInfoBold,
  custom: BgBrandPrimary,
} as const;

export const textColors = {
  subtle: {
    neutral: TextPrimary,
    success: TextSuccessPrimary,
    warning: TextWarningPrimary,
    error: TextErrorPrimary,
    info: TextInfoPrimary,
    custom: TextBrand,
  },
  text: {
    neutral: TextPrimary,
    success: TextSuccessPrimary,
    warning: TextWarningPrimary,
    error: TextErrorPrimary,
    info: TextInfoPrimary,
    custom: TextBrand,
  },
  bold: {
    neutral: TextOnColor,
    success: TextSuccessInverse,
    warning: TextWarningInverse,
    error: TextErrorInverse,
    info: TextInfoInverse,
    custom: TextOnColor,
  },
} as const;
