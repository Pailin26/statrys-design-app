import { StyleSheet } from "react-native";
import {
  ButtonPrimary,
  ButtonPrimaryActive,
  ButtonSecondaryBg,
  ButtonSecondaryBgActive,
  ButtonSecondaryBgDisabled,
  ButtonSecondaryActive,
  ButtonTertiaryActive,
  ButtonDisabled,
  ButtonTextOnFill,
  ButtonTextOnFillDisabled,
  ButtonRadius,
  ButtonRadiusFull,
  ButtonFontFamily,
  ButtonFontWeight,
  ButtonFontSizeSm,
  ButtonPaddingVerticalSm,
  ButtonPaddingHorizontalSm,
  ButtonHeightSm,
  ButtonSquareSizeSm,
  ButtonCircleSizeSm,
  ButtonFontSizeMd,
  ButtonPaddingVerticalMd,
  ButtonPaddingHorizontalMd,
  ButtonMinHeightMd,
  ButtonSquareSizeMd,
  ButtonCircleSizeMd,
  ButtonFontSizeLg,
  ButtonPaddingVerticalLg,
  ButtonPaddingHorizontalLg,
  ButtonMinHeightLg,
  ButtonSquareSizeLg,
  ButtonCircleSizeLg,
} from "@statrys/tokens";
import { nativeFontFamily } from "../nativeFont";

// Every value here comes from the component-level semantic tokens in
// packages/tokens/semantic/button.json (never a primitive directly, so
// changing button.* there is the only edit needed to restyle every Button
// everywhere).
//
// nativeFontFamily maps to a weight-specific registered family name (RN has
// no font-weight-selection-within-one-family the way CSS does) — the
// consuming app must have actually registered that name via expo-font (see
// apps/app-playground/src/fonts.ts) for this to render as anything but the
// OS default; on true native (iOS/Android) it still won't, since we only
// have a woff2 (web) build of this font, no .ttf/.otf.
//
// RN's Text does not inherit font styles from an ancestor View/Pressable
// (unlike CSS on web) — layout (padding/height) goes on the container,
// fontSize goes on the Text, so they're kept as separate style groups below.
export const styles = StyleSheet.create({
  base: { borderRadius: ButtonRadius, alignItems: "center", justifyContent: "center", borderWidth: 1 },
  containerSm: { paddingVertical: ButtonPaddingVerticalSm, paddingHorizontal: ButtonPaddingHorizontalSm, height: ButtonHeightSm },
  containerMd: { paddingVertical: ButtonPaddingVerticalMd, paddingHorizontal: ButtonPaddingHorizontalMd, minHeight: ButtonMinHeightMd },
  containerLg: { paddingVertical: ButtonPaddingVerticalLg, paddingHorizontal: ButtonPaddingHorizontalLg, minHeight: ButtonMinHeightLg },
  label: { fontFamily: nativeFontFamily(ButtonFontFamily, ButtonFontWeight), fontWeight: String(ButtonFontWeight) as "500" },
  textSm: { fontSize: ButtonFontSizeSm },
  textMd: { fontSize: ButtonFontSizeMd },
  textLg: { fontSize: ButtonFontSizeLg },
  // Shape=Rounded — pill radius instead of the default rec radius.
  rounded: { borderRadius: ButtonRadiusFull },
  // Shape=Square/Circle — icon-only, fixed square box. No Inverse=True
  // variant exists in Figma for these, so they're not meant to combine with
  // an inverse hierarchy.
  square: { padding: 0 },
  circle: { padding: 0, borderRadius: ButtonRadiusFull },
  squareSm: { width: ButtonSquareSizeSm, height: ButtonSquareSizeSm },
  circleSm: { width: ButtonCircleSizeSm, height: ButtonCircleSizeSm },
  squareMd: { width: ButtonSquareSizeMd, height: ButtonSquareSizeMd },
  circleMd: { width: ButtonCircleSizeMd, height: ButtonCircleSizeMd },
  squareLg: { width: ButtonSquareSizeLg, height: ButtonSquareSizeLg },
  circleLg: { width: ButtonCircleSizeLg, height: ButtonCircleSizeLg },
});

// Hierarchy/states mirror apa-statrys/accounting's real Button
// (src/app/ui/Button/index.module.css): primary = filled, secondary =
// outline, tertiary = text-only. Merged onto `base` by variant + pressed +
// disabled state (see Button.tsx) since RN has no :hover/:active/:disabled.
export const containerColors = {
  primary: {
    base: { backgroundColor: ButtonPrimary, borderColor: ButtonPrimary },
    pressed: { backgroundColor: ButtonPrimaryActive, borderColor: ButtonPrimaryActive },
    disabled: { backgroundColor: ButtonDisabled, borderColor: "transparent" },
  },
  secondary: {
    base: { backgroundColor: ButtonSecondaryBg, borderColor: ButtonPrimary },
    pressed: { backgroundColor: ButtonSecondaryBgActive, borderColor: ButtonSecondaryActive },
    disabled: { backgroundColor: ButtonSecondaryBgDisabled, borderColor: ButtonDisabled },
  },
  tertiary: {
    base: { backgroundColor: "transparent", borderColor: "transparent" },
    pressed: { backgroundColor: ButtonTertiaryActive },
    disabled: {},
  },
} as const;

export const labelColors = {
  primary: { base: ButtonTextOnFill, disabled: ButtonTextOnFillDisabled },
  secondary: { base: ButtonPrimary, pressed: ButtonSecondaryActive, disabled: ButtonDisabled },
  tertiary: { base: ButtonPrimary, disabled: ButtonDisabled },
} as const;
