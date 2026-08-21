import { StyleSheet } from "react-native";
import {
  LoadingTrackColor,
  LoadingGradientStart,
  LoadingGradientMid,
  LoadingGradientEnd,
  LoadingLogoColor,
  LoadingBox2xs,
  LoadingR2xs,
  LoadingStroke2xs,
  LoadingBoxXs,
  LoadingRXs,
  LoadingStrokeXs,
  LoadingBoxSm,
  LoadingRSm,
  LoadingStrokeSm,
  LoadingBoxMd,
  LoadingRMd,
  LoadingStrokeMd,
  LoadingBoxLg,
  LoadingRLg,
  LoadingStrokeLg,
} from "@statrys/tokens";

export type LoadingSize = "2xs" | "xs" | "sm" | "md" | "lg";

// Per-size geometry (box/track radius+stroke, whether the centered logo
// shows) — from semantic/loading.json. `logo` isn't a style value so it
// stays a plain flag here rather than living in tokens.
export const SIZES: Record<LoadingSize, { box: number; r: number; stroke: number; logo: boolean }> = {
  "2xs": { box: LoadingBox2xs, r: LoadingR2xs, stroke: LoadingStroke2xs, logo: false },
  xs: { box: LoadingBoxXs, r: LoadingRXs, stroke: LoadingStrokeXs, logo: false },
  sm: { box: LoadingBoxSm, r: LoadingRSm, stroke: LoadingStrokeSm, logo: true },
  md: { box: LoadingBoxMd, r: LoadingRMd, stroke: LoadingStrokeMd, logo: true },
  lg: { box: LoadingBoxLg, r: LoadingRLg, stroke: LoadingStrokeLg, logo: true },
};

export const LOGO_COLOR = LoadingLogoColor;
export const TRACK_COLOR = LoadingTrackColor;
export const GRADIENT_START = LoadingGradientStart;
export const GRADIENT_MID = LoadingGradientMid;
export const GRADIENT_END = LoadingGradientEnd;

export const styles = StyleSheet.create({
  root: { position: "relative", alignItems: "center", justifyContent: "center" },
  logo: { position: "absolute" },
});
