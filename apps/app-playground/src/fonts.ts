import { useFonts } from "expo-font";

// Registered under weight-specific names, not "GT Walsheim LC" + fontWeight —
// RN has no font-weight-selection-within-one-family the way CSS does, so
// each weight is its own family name here (see packages/app-ds/src/
// nativeFont.ts, which maps the token system's bare family+weight to these
// exact names — keep the two in sync).
//
// Uses .ttf, not .woff2 — RN has no woff2 decoder on true native
// (iOS/Android), only on the web target (react-native-web, where it just
// becomes a real @font-face). .ttf works on both. Sourced from Statrys' own
// GT Walsheim LC license (order_120580), not from accounting's repo, which
// only ever had the web .woff2 build.
export function useAppFonts() {
  return useFonts({
    "GTWalsheimLC-Regular": require("../../../packages/tokens/fonts/GTWalsheimLC-Regular.ttf"),
    "GTWalsheimLC-Medium": require("../../../packages/tokens/fonts/GTWalsheimLC-Medium.ttf"),
    "GTWalsheimLC-Bold": require("../../../packages/tokens/fonts/GTWalsheimLC-Bold.ttf"),
    "GTWalsheimLC-Black": require("../../../packages/tokens/fonts/GTWalsheimLC-Black.ttf"),
  });
}
