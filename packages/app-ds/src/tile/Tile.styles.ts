import { StyleSheet } from "react-native";
import {
  BgNeutralPrimary,
  BorderNeutralPrimary,
  BgNeutralPrimaryHover,
  BgBrandPrimary,
  BorderNeutralPrimaryHover,
  BgNeutralDisabled,
  BorderErrorBold,
  TextNeutralInverseDisabled,
  TextPrimary,
  TextSecondary,
  TextDisabled,
  BgBeigeTertiary,
  RadiusMd,
  Radius2xl,
  BorderWidthBase,
  FontPrimary,
  FontWeightRegular,
  FontWeightMedium,
  FontSizeSm,
  FontSizeXs,
  Space1,
  Space3,
  Space5,
  Space6,
  Space8,
} from "@statrys/tokens";
import { nativeFontFamily } from "../nativeFont";

// Every value here is an existing shared token — no semantic/tile.json.
// 65px/54px row heights and the 30px trailing slot have no matching
// tokens, so they're plain literals.
export const styles = StyleSheet.create({
  tile: {
    flexDirection: "row",
    alignItems: "center",
    gap: Space5,
    height: 65,
    width: "100%",
    paddingVertical: Space3,
    paddingHorizontal: Space8,
    backgroundColor: BgNeutralPrimary,
    borderWidth: BorderWidthBase,
    borderColor: BorderNeutralPrimary,
    borderRadius: Radius2xl,
  },
  sm: { height: 54 },
  gray: { borderColor: "transparent" },
  selected: { backgroundColor: BgNeutralPrimaryHover, borderColor: BgBrandPrimary },
  pressed: { backgroundColor: BgNeutralPrimaryHover, borderColor: BorderNeutralPrimaryHover },
  grayPressed: { backgroundColor: BgNeutralPrimaryHover, borderColor: "transparent" },
  disabled: { backgroundColor: BgNeutralDisabled },
  error: { borderColor: BorderErrorBold },
  icon: { flexShrink: 0 },
  flag: { flexShrink: 0 },
  flagDisabled: { opacity: 0.4 },
  textBlock: { flex: 1, minWidth: 0, flexDirection: "column", justifyContent: "center", gap: Space1 },
  title: {
    color: TextPrimary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightRegular),
    fontWeight: String(FontWeightRegular) as "400",
    fontSize: FontSizeSm,
    lineHeight: FontSizeSm * 1.3,
  },
  titleRow: { flexDirection: "row", alignItems: "center", gap: Space6, minWidth: 0 },
  badgePill: {
    height: 18,
    paddingVertical: 2,
    paddingHorizontal: Space3,
    borderRadius: RadiusMd,
    backgroundColor: BgBeigeTertiary,
    color: TextPrimary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightMedium),
    fontWeight: String(FontWeightMedium) as "500",
    fontSize: FontSizeXs,
    lineHeight: FontSizeXs * 1.3,
  },
  text: {
    color: TextSecondary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightRegular),
    fontWeight: String(FontWeightRegular) as "400",
    fontSize: FontSizeXs,
    lineHeight: FontSizeXs * 1.3,
  },
  disabledText: { color: TextDisabled },
  trailing: { width: 30, height: 30, alignItems: "center", justifyContent: "center" },
});

export const DISABLED_AVATAR_BG = BgNeutralDisabled;
export const DISABLED_AVATAR_TEXT = TextNeutralInverseDisabled;

export function trailingIconColor(disabled: boolean): string {
  return disabled ? TextDisabled : TextSecondary;
}

export function checkIconColor(): string {
  return BgBrandPrimary;
}
