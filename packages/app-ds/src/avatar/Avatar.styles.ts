import { StyleSheet } from "react-native";
import {
  AvatarSquareBg,
  AvatarInitialsColor,
  AvatarFontFamily,
  AvatarFontWeight,
  AvatarBoxXs,
  AvatarRadiusXs,
  AvatarFontSizeXs,
  AvatarLetterSpacingXs,
  AvatarBoxSm,
  AvatarRadiusSm,
  AvatarFontSizeSm,
  AvatarLetterSpacingSm,
  AvatarBoxMd,
  AvatarRadiusMd,
  AvatarFontSizeMd,
  AvatarLetterSpacingMd,
  AvatarBoxLg,
  AvatarRadiusLg,
  AvatarFontSizeLg,
  AvatarLetterSpacingLg,
  AvatarBoxXl,
  AvatarRadiusXl,
  AvatarFontSizeXl,
  AvatarLetterSpacingXl,
  AvatarBox2xl,
  AvatarRadius2xl,
  AvatarFontSize2xl,
  AvatarLetterSpacing2xl,
  AvatarBox3xl,
  AvatarRadius3xl,
  AvatarFontSize3xl,
  AvatarLetterSpacing3xl,
} from "@statrys/tokens";
import { nativeFontFamily } from "../nativeFont";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

export const SIZES: Record<AvatarSize, { box: number; radius: number; fontSize: number; letterSpacing: number }> = {
  xs: { box: AvatarBoxXs, radius: AvatarRadiusXs, fontSize: AvatarFontSizeXs, letterSpacing: AvatarLetterSpacingXs },
  sm: { box: AvatarBoxSm, radius: AvatarRadiusSm, fontSize: AvatarFontSizeSm, letterSpacing: AvatarLetterSpacingSm },
  md: { box: AvatarBoxMd, radius: AvatarRadiusMd, fontSize: AvatarFontSizeMd, letterSpacing: AvatarLetterSpacingMd },
  lg: { box: AvatarBoxLg, radius: AvatarRadiusLg, fontSize: AvatarFontSizeLg, letterSpacing: AvatarLetterSpacingLg },
  xl: { box: AvatarBoxXl, radius: AvatarRadiusXl, fontSize: AvatarFontSizeXl, letterSpacing: AvatarLetterSpacingXl },
  "2xl": { box: AvatarBox2xl, radius: AvatarRadius2xl, fontSize: AvatarFontSize2xl, letterSpacing: AvatarLetterSpacing2xl },
  "3xl": { box: AvatarBox3xl, radius: AvatarRadius3xl, fontSize: AvatarFontSize3xl, letterSpacing: AvatarLetterSpacing3xl },
};

export const SQUARE_BG = AvatarSquareBg;
export const INITIALS_COLOR = AvatarInitialsColor;

export const styles = StyleSheet.create({
  root: { alignItems: "center", justifyContent: "center", overflow: "hidden" },
  photo: {},
  image: { width: "100%", height: "100%", resizeMode: "cover" },
  // lineHeight: 1 (web) means "tight, equal to fontSize" — set per-size in
  // the component from SIZES[size].fontSize rather than here, since RN's
  // lineHeight is an absolute number, not a multiplier.
  initials: {
    fontFamily: nativeFontFamily(AvatarFontFamily, AvatarFontWeight),
    fontWeight: String(AvatarFontWeight) as "400",
  },
});
