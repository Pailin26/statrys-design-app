import { StyleSheet } from "react-native";
import {
  BgNeutralPrimary,
  ShadowBottomsheets,
  ShadowMd,
  Radius5xl,
  RadiusFull,
  AlphaWhite40,
  TextPrimary,
  IconDisabled,
  FontPrimary,
  FontWeightMedium,
  TypographyCardTitleMdMobile,
  Space4,
  Space6,
  Space8,
  Space16,
  Space24,
} from "@statrys/tokens";
import { nativeFontFamily } from "../nativeFont";
import { parseCssBoxShadow } from "../nativeShadow";

// Every value here is an existing shared token — no semantic/bottomSheet.json.
// The header's white→transparent gradient fade and the action button's
// backdrop blur have no RN equivalent without a new dependency
// (expo-linear-gradient / expo-blur) — both approximated with a flat
// AlphaWhite40 tint instead, same "no new dep, document it" call as Badge's
// gradient fallback.
const bottomsheetsShadow = parseCssBoxShadow(ShadowBottomsheets);
const mdShadow = parseCssBoxShadow(ShadowMd);

export const styles = StyleSheet.create({
  sheet: {
    width: "100%",
    backgroundColor: BgNeutralPrimary,
    borderTopLeftRadius: Radius5xl,
    borderTopRightRadius: Radius5xl,
    overflow: "hidden",
    ...bottomsheetsShadow,
  },
  header: { width: "100%", backgroundColor: AlphaWhite40 },
  indicator: { alignItems: "center", justifyContent: "flex-start", height: Space24, paddingTop: Space4 },
  grabber: { width: 48, height: 5, borderRadius: RadiusFull, backgroundColor: IconDisabled },
  titleRow: { flexDirection: "row", alignItems: "center", gap: Space6, height: 60, paddingHorizontal: Space8 },
  title: {
    flex: 1,
    color: TextPrimary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightMedium),
    fontWeight: String(FontWeightMedium) as "500",
    fontSize: TypographyCardTitleMdMobile,
    lineHeight: TypographyCardTitleMdMobile * 0.9,
  },
  // Frosted 36px action button — same recipe as PageHeader's glass button.
  actionButton: {
    width: 36,
    height: 36,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RadiusFull,
    backgroundColor: AlphaWhite40,
    ...mdShadow,
  },
  content: { width: "100%" },
  bottomPad: { height: Space16, flexShrink: 0 },
  footer: { width: "100%", flexShrink: 0 },
});
