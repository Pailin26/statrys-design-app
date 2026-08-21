import { useFonts } from "expo-font";

// Registered under weight-specific names, not "GT Walsheim LC" + fontWeight —
// RN has no font-weight-selection-within-one-family the way CSS does, so
// each weight is its own family name here (see packages/app-ds/src/
// nativeFont.ts, which maps the token system's bare family+weight to these
// exact names — keep the two in sync).
//
// This only makes the font render on the *web* target: woff2 becomes a real
// @font-face there. On true native (iOS/Android) it still won't, since
// accounting only ships a woff2 (web) build of this font — RN itself has no
// woff2 decoder, a genuine .ttf/.otf would be needed.
export function useAppFonts() {
  return useFonts({
    "GTWalsheimLC-Regular": require("../../../packages/tokens/fonts/GTWalsheimLC-Regular.woff2"),
    "GTWalsheimLC-Medium": require("../../../packages/tokens/fonts/GTWalsheimLC-Medium.woff2"),
    "GTWalsheimLC-Bold": require("../../../packages/tokens/fonts/GTWalsheimLC-Bold.woff2"),
    "GTWalsheimLC-Black": require("../../../packages/tokens/fonts/GTWalsheimLC-Black.woff2"),
  });
}
