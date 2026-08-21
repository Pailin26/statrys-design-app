import { StyleSheet } from "react-native";
import {
  BgNeutralInversePrimary,
  TextNeutralInversePrimary,
  LinkInverse,
  IconSuccessPrimary,
  IconErrorPrimary,
  IconWarningPrimary,
  RadiusXl,
  FontPrimary,
  FontWeightMedium,
  FontWeightRegular,
  FontSizeSm,
  Space1,
  Space2,
  Space4,
  Space6,
  Space8,
} from "@statrys/tokens";
import { nativeFontFamily } from "../nativeFont";

export type ToastVariant = "default" | "success" | "error" | "warning";

// Every value here is an existing shared token — no semantic/toastMessage.json.
// 356px max-width and the custom shadow have no matching token.
export const styles = StyleSheet.create({
  toast: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Space4,
    width: "100%",
    maxWidth: 356,
    paddingVertical: Space6,
    paddingHorizontal: Space8,
    borderRadius: RadiusXl,
    backgroundColor: BgNeutralInversePrimary,
    shadowColor: "rgb(0, 0, 0)",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 30,
    elevation: 8,
  },
  icon: { flexShrink: 0 },
  content: { flex: 1, minWidth: 0, flexDirection: "column", gap: Space4, alignItems: "flex-start" },
  textBlock: { flexDirection: "column", gap: Space1, width: "100%" },
  title: {
    color: TextNeutralInversePrimary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightMedium),
    fontWeight: String(FontWeightMedium) as "500",
    fontSize: FontSizeSm,
    lineHeight: FontSizeSm * 1.3,
  },
  subtitle: {
    color: TextNeutralInversePrimary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightRegular),
    fontWeight: String(FontWeightRegular) as "400",
    fontSize: FontSizeSm,
    lineHeight: FontSizeSm * 1.3,
  },
  link: { flexDirection: "row", alignItems: "center", gap: Space2 },
  linkText: {
    color: LinkInverse,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightMedium),
    fontWeight: String(FontWeightMedium) as "500",
    fontSize: FontSizeSm,
  },
});

export function iconColor(variant: Exclude<ToastVariant, "default">): string {
  return { success: IconSuccessPrimary, error: IconErrorPrimary, warning: IconWarningPrimary }[variant];
}

export const LINK_COLOR = LinkInverse;
