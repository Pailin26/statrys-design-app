import { StyleSheet } from "react-native";
import {
  AlphaWhite40,
  ShadowMd,
  RadiusFull,
  TextPrimary,
  TextOnColor,
  TextDisabled,
  TextPlaceholder,
  TextNeutralInversePrimary,
  ButtonPrimary,
  FieldBorderFocus,
  FieldBgDisabled,
  BorderErrorBold,
  FontPrimary,
  FontWeightMedium,
  FontWeightRegular,
  TypographyCardTitleLgMobile,
  TypographyCardTitleMdMobile,
  TypographyBodyMd,
  FontSizeSm,
  Space1,
  Space4,
  Space6,
  Space8,
  Space24,
} from "@statrys/tokens";
import { nativeFontFamily } from "../nativeFont";
import { parseCssBoxShadow } from "../nativeShadow";

// Every value here is an existing shared token — no semantic/pageHeader.json.
// The glass buttons'/pill's backdrop blur has no RN equivalent without a new
// dependency (expo-blur) — approximated with a flat AlphaWhite40 tint, same
// call as BottomSheet's frosted action button. 36px button size / 38px
// search pill height have no matching token, so they're plain literals.
const mdShadow = parseCssBoxShadow(ShadowMd);
const primaryButtonShadow = parseCssBoxShadow("0px 4px 7px 0px rgba(0, 0, 0, 0.1)");

export const styles = StyleSheet.create({
  header: { width: "100%" },
  row: { flexDirection: "row", alignItems: "center", gap: Space6, height: Space24, paddingHorizontal: Space8 },
  left: { flexDirection: "column", alignItems: "flex-start", gap: Space8, paddingVertical: Space6, paddingHorizontal: Space8 },
  leftCollapsed: { gap: 0, paddingVertical: 6, paddingHorizontal: Space8 },
  buttonRow: { flexDirection: "row", alignItems: "center", gap: Space6, width: "100%" },
  compactTitle: {
    flex: 1,
    color: TextPrimary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightMedium),
    fontWeight: String(FontWeightMedium) as "500",
    fontSize: TypographyCardTitleMdMobile,
    lineHeight: TypographyCardTitleMdMobile * 0.9,
    letterSpacing: -TypographyCardTitleMdMobile * 0.05,
  },
  slotInner: { width: "100%", flexDirection: "column", gap: Space4 },
  spacer: { width: 36, height: 36 },
  glassPill: {
    flexDirection: "row",
    alignItems: "center",
    height: 36,
    paddingHorizontal: Space6,
    borderRadius: RadiusFull,
    backgroundColor: AlphaWhite40,
    flexShrink: 0,
    ...mdShadow,
  },
  rightGroup: { flexDirection: "row", alignItems: "center", gap: Space8, flexShrink: 0 },
  primaryButton: {
    width: 36,
    height: 36,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RadiusFull,
    backgroundColor: ButtonPrimary,
    ...primaryButtonShadow,
  },
  glassButton: {
    width: 36,
    height: 36,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RadiusFull,
    backgroundColor: AlphaWhite40,
    ...mdShadow,
  },
  titleBlock: { flex: 1, justifyContent: "center", alignItems: "flex-start", gap: Space1 },
  centered: { alignItems: "center" },
  titleLg: {
    color: TextPrimary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightMedium),
    fontWeight: String(FontWeightMedium) as "500",
    fontSize: TypographyCardTitleLgMobile,
    lineHeight: TypographyCardTitleLgMobile * 0.9,
    letterSpacing: -TypographyCardTitleLgMobile * 0.05,
  },
  titleMd: {
    color: TextPrimary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightMedium),
    fontWeight: String(FontWeightMedium) as "500",
    fontSize: TypographyCardTitleMdMobile,
    lineHeight: TypographyCardTitleMdMobile * 0.9,
    letterSpacing: -TypographyCardTitleMdMobile * 0.05,
  },
  text: {
    color: TextPrimary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightRegular),
    fontWeight: String(FontWeightRegular) as "400",
    fontSize: FontSizeSm,
    lineHeight: FontSizeSm * 1.3,
  },
  onColorText: { color: TextOnColor },
  searchPill: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: Space4,
    height: 38,
    paddingHorizontal: Space8,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: RadiusFull,
    backgroundColor: AlphaWhite40,
    ...mdShadow,
  },
  searchPillFocused: { borderColor: FieldBorderFocus },
  searchPillError: { borderColor: BorderErrorBold },
  searchPillDisabled: { backgroundColor: FieldBgDisabled },
  pillInput: {
    flex: 1,
    padding: 0,
    color: TextPrimary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightRegular),
    fontWeight: String(FontWeightRegular) as "400",
    fontSize: TypographyBodyMd,
  },
  disabledText: { color: TextDisabled },
});

export const GLASS_ICON_COLOR = TextPrimary;
export const DISABLED_ICON_COLOR = TextDisabled;
export const PLACEHOLDER_COLOR = TextPlaceholder;
export const PRIMARY_ICON_COLOR = TextNeutralInversePrimary;
