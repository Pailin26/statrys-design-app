import { StyleSheet } from "react-native";
import {
  RadiusFull,
  ShadowLg,
  FontPrimary,
  FontWeightMedium,
  FontSizeBase,
  ButtonMinHeightMd,
  ButtonPaddingVerticalMd,
  ButtonPaddingHorizontalMd,
  Space2,
  Space6,
} from "@statrys/tokens";
import { nativeFontFamily } from "../nativeFont";
import { parseCssBoxShadow } from "../nativeShadow";

// Every value here is an existing shared/Button token — no semantic/fab.json.
// The 46×46 circle size is Figma-specific to FAB (not Button's own 44px
// circle), so it's a plain literal.
const fabShadow = parseCssBoxShadow(ShadowLg);

export const styles = StyleSheet.create({
  fab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Space2,
    flexShrink: 0,
    borderRadius: RadiusFull,
    ...fabShadow,
  },
  rounded: { minHeight: ButtonMinHeightMd, paddingVertical: ButtonPaddingVerticalMd, paddingHorizontal: ButtonPaddingHorizontalMd },
  circle: { width: 46, height: 46, padding: 0 },
  // 20px icon + 12px×2 = the DS circle's 46px equivalent look on a pill.
  collapsed: { padding: Space6, gap: 0 },
  label: {
    fontFamily: nativeFontFamily(FontPrimary, FontWeightMedium),
    fontWeight: String(FontWeightMedium) as "500",
    fontSize: FontSizeBase,
    textTransform: "uppercase",
  },
});
