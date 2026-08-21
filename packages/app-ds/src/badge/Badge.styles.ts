import { StyleSheet } from "react-native";
import {
  BadgeTextNeutral,
  BadgeTextSuccess,
  BadgeTextWarning,
  BadgeTextError,
  BadgeTextInfo,
  BadgeCustomApproxText,
  BadgeBoldBgNeutral,
  BadgeBoldBgSuccess,
  BadgeBoldBgWarning,
  BadgeBoldBgError,
  BadgeBoldBgInfo,
  BadgeCustomApproxBg,
  BadgeBoldTextNeutral,
  BadgeBoldTextSuccess,
  BadgeBoldTextWarning,
  BadgeBoldTextError,
  BadgeBoldTextInfo,
  BadgeTextOnGradient,
  BadgeSubtleBg,
  BadgeSubtleBorder,
  BadgeRadius,
  BadgeGap,
  BadgeBorderWidth,
  BadgeFontFamily,
  BadgeFontWeight,
  BadgeFontWeightText,
  BadgeFontSizeSm,
  BadgeFontSizeMd,
  BadgeFontSizeLg,
  BadgeHeightSm,
  BadgeHeightMd,
  BadgeHeightLg,
  BadgePaddingVertical,
  BadgePaddingHorizontalSm,
  BadgePaddingHorizontalMd,
  BadgePaddingHorizontalLg,
} from "@statrys/tokens";
import { nativeFontFamily } from "../nativeFont";

// Every value here comes from semantic/badge.json — see Button.styles.ts for
// the token-aliasing rule this follows. `bold`'s background varies per
// color (containerColors.bold), unlike `subtle`/`text` which share one
// background across colors and only vary the label color (textColors) — see
// apa-statrys/accounting's ui/Badge/index.module.css, this mirrors its
// --badge-* custom-property split.
export const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: BadgeGap,
    borderRadius: BadgeRadius,
    alignSelf: "flex-start",
  },
  containerSm: { height: BadgeHeightSm, paddingVertical: BadgePaddingVertical, paddingHorizontal: BadgePaddingHorizontalSm },
  containerMd: { height: BadgeHeightMd, paddingVertical: BadgePaddingVertical, paddingHorizontal: BadgePaddingHorizontalMd },
  containerLg: { height: BadgeHeightLg, paddingVertical: BadgePaddingVertical, paddingHorizontal: BadgePaddingHorizontalLg },
  // variant=text: no fill/border, no horizontal padding (base container
  // padding above is overridden back to 0 here).
  textVariant: { backgroundColor: "transparent", paddingHorizontal: 0 },
  label: { fontFamily: nativeFontFamily(BadgeFontFamily, BadgeFontWeight), fontWeight: String(BadgeFontWeight) as "500" },
  labelText: {
    fontFamily: nativeFontFamily(BadgeFontFamily, BadgeFontWeightText),
    fontWeight: String(BadgeFontWeightText) as "400",
    textTransform: "uppercase",
  },
  textSm: { fontSize: BadgeFontSizeSm },
  textMd: { fontSize: BadgeFontSizeMd },
  textLg: { fontSize: BadgeFontSizeLg },
});

// subtle/text share one fixed container look (only the label color varies
// by `color` — see textColors below); bold's background instead varies per
// `color`, so it's its own map (boldBg) rather than living here.
export const containerColors = {
  subtle: { backgroundColor: BadgeSubtleBg, borderWidth: BadgeBorderWidth, borderColor: BadgeSubtleBorder },
  text: {},
} as const;

export const boldBg = {
  neutral: BadgeBoldBgNeutral,
  success: BadgeBoldBgSuccess,
  warning: BadgeBoldBgWarning,
  error: BadgeBoldBgError,
  info: BadgeBoldBgInfo,
  custom: BadgeCustomApproxBg,
} as const;

// subtle/text share one text-color set (--badge-primary in the web source);
// bold uses its own per-color "on fill" set. `custom` only exists for
// bold/text (no Figma Subtle+Custom) and is a solid-color approximation on
// native — see badge.customApproxBg/customApproxText's token comment for why.
export const textColors = {
  subtle: {
    neutral: BadgeTextNeutral,
    success: BadgeTextSuccess,
    warning: BadgeTextWarning,
    error: BadgeTextError,
    info: BadgeTextInfo,
    custom: BadgeCustomApproxText,
  },
  text: {
    neutral: BadgeTextNeutral,
    success: BadgeTextSuccess,
    warning: BadgeTextWarning,
    error: BadgeTextError,
    info: BadgeTextInfo,
    custom: BadgeCustomApproxText,
  },
  bold: {
    neutral: BadgeBoldTextNeutral,
    success: BadgeBoldTextSuccess,
    warning: BadgeBoldTextWarning,
    error: BadgeBoldTextError,
    info: BadgeBoldTextInfo,
    custom: BadgeTextOnGradient,
  },
} as const;
