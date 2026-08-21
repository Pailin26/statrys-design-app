import { StyleSheet } from "react-native";
import {
  ButtonPrimary,
  ButtonPrimaryActive,
  ButtonSecondaryActive,
  ButtonTertiaryActive,
  ButtonDisabled,
  ButtonTextOnFill,
  ButtonTextOnFillDisabled,
  ButtonRadius,
  ButtonFontFamily,
  ButtonFontWeight,
  ButtonFontSizeSm,
  ButtonPaddingVerticalSm,
  ButtonPaddingHorizontalSm,
  ButtonHeightSm,
  ButtonFontSizeMd,
  ButtonPaddingVerticalMd,
  ButtonPaddingHorizontalMd,
  ButtonMinHeightMd,
  ButtonFontSizeLg,
  ButtonPaddingVerticalLg,
  ButtonPaddingHorizontalLg,
  ButtonMinHeightLg,
} from "@statrys/tokens";

// Every value here comes from the component-level semantic tokens in
// packages/tokens/semantic/button.json (never a primitive directly, so
// changing button.* there is the only edit needed to restyle every Button
// everywhere). NOTE: "GT Walsheim LC" won't actually render on native yet —
// accounting only ships a woff2 (web) build of this font, no .ttf/.otf, so
// there's nothing to register via expo-font. Falls back to the OS default
// until a native-compatible font file exists; the token wiring is already
// correct for when it does.
//
// RN's Text does not inherit font styles from an ancestor View/Pressable
// (unlike CSS on web) — layout (padding/height) goes on the container,
// fontSize goes on the Text, so they're kept as separate style groups below.
export const styles = StyleSheet.create({
  base: { borderRadius: ButtonRadius, alignItems: "center", justifyContent: "center", borderWidth: 1 },
  containerSm: { paddingVertical: ButtonPaddingVerticalSm, paddingHorizontal: ButtonPaddingHorizontalSm, height: ButtonHeightSm },
  containerMd: { paddingVertical: ButtonPaddingVerticalMd, paddingHorizontal: ButtonPaddingHorizontalMd, minHeight: ButtonMinHeightMd },
  containerLg: { paddingVertical: ButtonPaddingVerticalLg, paddingHorizontal: ButtonPaddingHorizontalLg, minHeight: ButtonMinHeightLg },
  label: { fontFamily: ButtonFontFamily, fontWeight: String(ButtonFontWeight) as "500" },
  textSm: { fontSize: ButtonFontSizeSm },
  textMd: { fontSize: ButtonFontSizeMd },
  textLg: { fontSize: ButtonFontSizeLg },
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
    base: { backgroundColor: "transparent", borderColor: ButtonPrimary },
    pressed: { borderColor: ButtonSecondaryActive },
    disabled: { borderColor: ButtonDisabled },
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
