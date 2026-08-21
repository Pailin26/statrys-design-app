import { StyleSheet } from "react-native";
import {
  BgSuccessSubtle,
  BgWarningSubtle,
  BgErrorSubtle,
  BgInfoSubtle,
  BorderSuccessSubtle,
  BorderWarningSubtle,
  BorderErrorSubtle,
  BorderInfoSubtle,
  IconSuccessPrimary,
  IconWarningPrimary,
  IconErrorPrimary,
  IconInfoPrimary,
  IconSecondary,
  TextPrimary,
  LinkPrimary,
  Radius2xl,
  Space1,
  Space2,
  Space10,
  BorderWidthBase,
  FontPrimary,
  FontWeightRegular,
  FontWeightMedium,
  FontSizeXs,
  FontSizeSm,
} from "@statrys/tokens";
import { nativeFontFamily } from "../nativeFont";

export type BannerColor = "info" | "success" | "warning" | "error";

// Every value here is an existing shared token — no semantic/banner.json.
// 11px/13px padding has no matching space token, so it's a plain literal.
export const styles = StyleSheet.create({
  banner: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Space2,
    width: "100%",
    paddingVertical: 11,
    paddingHorizontal: 13,
    borderWidth: BorderWidthBase,
    borderRadius: Radius2xl,
  },
  icon: { flexShrink: 0 },
  body: { flexDirection: "column", gap: Space1, flex: 1 },
  textGroup: { flexDirection: "column", gap: Space1 },
  title: {
    color: TextPrimary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightMedium),
    fontWeight: String(FontWeightMedium) as "500",
    fontSize: FontSizeSm,
  },
  text: {
    color: TextPrimary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightRegular),
    fontWeight: String(FontWeightRegular) as "400",
    fontSize: FontSizeSm,
  },
  // Detail line under a title is caption-sized (12px) — only "Text only"
  // (no title) stays body-sm (14px), via `text` above.
  textCaption: {
    color: TextPrimary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightRegular),
    fontWeight: String(FontWeightRegular) as "400",
    fontSize: FontSizeXs,
  },
  link: {
    color: LinkPrimary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightMedium),
    fontWeight: String(FontWeightMedium) as "500",
    fontSize: FontSizeSm,
  },
  close: { flexShrink: 0, width: Space10, height: Space10, alignItems: "center", justifyContent: "center" },
});

export const CLOSE_ICON_COLOR = IconSecondary;

export const bannerColors: Record<BannerColor, { backgroundColor: string; borderColor: string }> = {
  success: { backgroundColor: BgSuccessSubtle, borderColor: BorderSuccessSubtle },
  warning: { backgroundColor: BgWarningSubtle, borderColor: BorderWarningSubtle },
  error: { backgroundColor: BgErrorSubtle, borderColor: BorderErrorSubtle },
  info: { backgroundColor: BgInfoSubtle, borderColor: BorderInfoSubtle },
};

export function iconColor(color: BannerColor): string {
  return { success: IconSuccessPrimary, warning: IconWarningPrimary, error: IconErrorPrimary, info: IconInfoPrimary }[color];
}
