import { StyleSheet } from "react-native";
import { Neutral3, Brand5, TextPrimary } from "@statrys/tokens";

export type LoadingSize = "2xs" | "xs" | "sm" | "md" | "lg";

// Per-size geometry (box/track radius+stroke, whether the centered logo
// shows) — bespoke SVG math from the Figma assets, same as accounting
// ui/Loading's SIZES table. No existing token matches these, so kept as
// plain literals rather than inventing a semantic/loading.json for values
// nothing else will ever reuse.
export const SIZES: Record<LoadingSize, { box: number; r: number; stroke: number; logo: boolean }> = {
  "2xs": { box: 16, r: 7.2, stroke: 1.6, logo: false },
  xs: { box: 24, r: 10.8, stroke: 2.4, logo: false },
  sm: { box: 32, r: 14.7, stroke: 2.6, logo: true },
  md: { box: 64, r: 29.5, stroke: 5, logo: true },
  lg: { box: 116, r: 55, stroke: 6, logo: true },
};

export const LOGO_COLOR = TextPrimary;
export const TRACK_COLOR = Neutral3;
// Gradient/Strong's three stops — first is the existing Brand5 primitive;
// the other two are gradient-only colors with no standalone token to alias.
export const GRADIENT_START = Brand5;
export const GRADIENT_MID = "#FF553A";
export const GRADIENT_END = "#FF7FC4";

export const styles = StyleSheet.create({
  root: { position: "relative", alignItems: "center", justifyContent: "center" },
  logo: { position: "absolute" },
});
