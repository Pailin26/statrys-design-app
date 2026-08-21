import { StyleSheet } from "react-native";
import {
  BorderNeutralPrimary,
  IconBrand,
  TextPrimary,
  TextSecondary,
  TextSuccessPrimary,
  RadiusFull,
  BorderWidthBase,
  FontPrimary,
  FontWeightRegular,
  FontWeightBold,
  FontSizeSm,
  FontSizeXs,
  Space1,
  Space2,
  Space4,
  Space8,
} from "@statrys/tokens";
import { nativeFontFamily } from "../nativeFont";

// Every value here is an existing shared token — no semantic/notificationItem.json.
// The 20px icon column and 6.5px unread dot have no matching tokens.
export const styles = StyleSheet.create({
  item: { width: "100%", paddingVertical: Space8 },
  itemBorder: { borderBottomWidth: BorderWidthBase, borderBottomColor: BorderNeutralPrimary },
  row: { flexDirection: "row", alignItems: "flex-start", width: "100%" },
  iconCol: { width: 20, height: 20, flexShrink: 0, alignItems: "center", justifyContent: "center" },
  dot: { width: 6.5, height: 6.5, borderRadius: RadiusFull, backgroundColor: IconBrand },
  textCol: { flex: 1, minWidth: 0, flexDirection: "column", gap: Space4 },
  headRow: { flexDirection: "row", alignItems: "flex-start", gap: Space4, width: "100%" },
  titleStack: { flex: 1, minWidth: 0, flexDirection: "column", gap: Space1 },
  title: {
    color: TextPrimary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightRegular),
    fontWeight: String(FontWeightRegular) as "400",
    fontSize: FontSizeSm,
    lineHeight: FontSizeSm * 1.3,
  },
  titleBold: {
    color: TextPrimary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightBold),
    fontWeight: String(FontWeightBold) as "700",
    fontSize: FontSizeSm,
    lineHeight: FontSizeSm * 1.3,
  },
  text: {
    color: TextSecondary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightRegular),
    fontWeight: String(FontWeightRegular) as "400",
    fontSize: FontSizeXs,
    lineHeight: FontSizeXs * 1.3,
  },
  timeRow: { flexDirection: "row", alignItems: "center", gap: Space2 },
  time: {
    color: TextSecondary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightRegular),
    fontWeight: String(FontWeightRegular) as "400",
    fontSize: FontSizeXs,
    lineHeight: FontSizeXs * 1.3,
  },
  amountCol: { flexShrink: 0, alignItems: "center" },
  amount: {
    color: TextSuccessPrimary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightRegular),
    fontWeight: String(FontWeightRegular) as "400",
    fontSize: FontSizeSm,
    lineHeight: FontSizeSm * 1.3,
  },
  amountBold: {
    color: TextSuccessPrimary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightBold),
    fontWeight: String(FontWeightBold) as "700",
    fontSize: FontSizeSm,
    lineHeight: FontSizeSm * 1.3,
  },
});

export const timeIconColor = TextSecondary;
