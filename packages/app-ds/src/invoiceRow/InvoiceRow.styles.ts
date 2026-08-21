import { StyleSheet } from "react-native";
import {
  BorderNeutralPrimary,
  BgNeutralSecondary,
  TextPrimary,
  TextSecondary,
  RadiusXl,
  BorderWidthBase,
  FontPrimary,
  FontWeightMedium,
  FontWeightRegular,
  FontSizeSm,
  FontSizeXs,
  Space1,
  Space2,
  Space3,
  Space4,
  Space6,
} from "@statrys/tokens";
import { nativeFontFamily } from "../nativeFont";

// Every value here is an existing shared token — no semantic/invoiceRow.json.
// 80px min-height has no matching token, so it's a plain literal.
export const styles = StyleSheet.create({
  row: { flexDirection: "column", justifyContent: "center", gap: Space2, minHeight: 80, width: "100%", paddingVertical: Space6 },
  rowBorder: { borderBottomWidth: BorderWidthBase, borderBottomColor: BorderNeutralPrimary },
  topGroup: { flexDirection: "column", gap: Space1, width: "100%" },
  main: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: Space4, width: "100%" },
  info: { flex: 1, minWidth: 0, flexDirection: "column", alignItems: "flex-start", gap: Space2 },
  title: {
    width: "100%",
    color: TextPrimary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightMedium),
    fontWeight: String(FontWeightMedium) as "500",
    fontSize: FontSizeSm,
    lineHeight: FontSizeSm * 1.3,
  },
  titleRow: { flexDirection: "row", alignItems: "center", gap: Space3, width: "100%", minWidth: 0 },
  invoiceNo: {
    color: TextSecondary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightRegular),
    fontWeight: String(FontWeightRegular) as "400",
    fontSize: FontSizeXs,
    lineHeight: FontSizeXs * 1.3,
  },
  amountCol: { flexShrink: 0, flexDirection: "column", alignItems: "flex-end", gap: Space2 },
  amount: {
    color: TextPrimary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightMedium),
    fontWeight: String(FontWeightMedium) as "500",
    fontSize: FontSizeSm,
    lineHeight: FontSizeSm * 1.3,
  },
  // Hugs its content (not the row's full width).
  credited: {
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    gap: Space3,
    maxWidth: "100%",
    padding: Space4,
    borderRadius: RadiusXl,
    backgroundColor: BgNeutralSecondary,
  },
  creditedText: {
    minWidth: 0,
    color: TextPrimary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightMedium),
    fontWeight: String(FontWeightMedium) as "500",
    fontSize: FontSizeXs,
    lineHeight: FontSizeXs * 1.3,
  },
});

export const fileIconColor = TextSecondary;
