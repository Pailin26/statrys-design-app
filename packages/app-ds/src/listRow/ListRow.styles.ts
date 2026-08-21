import { StyleSheet } from "react-native";
import {
  BorderNeutralPrimary,
  BgNeutralPrimaryHover,
  TextPrimary,
  TextSecondary,
  TextErrorPrimary,
  IconSecondary,
  FontPrimary,
  FontWeightRegular,
  FontWeightMedium,
  FontSizeSm,
  FontSizeXs,
  BorderWidthBase,
  Space1,
  Space2,
  Space3,
  Space4,
  Space6,
} from "@statrys/tokens";
import { nativeFontFamily } from "../nativeFont";

// Every value here is an existing shared token — no semantic/listRow.json.
// 56px min-height and the 30px chevron slot have no matching tokens.
export const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    justifyContent: "center",
    gap: Space1,
    width: "100%",
    minHeight: 56,
    paddingVertical: Space6,
    borderBottomWidth: BorderWidthBase,
    borderBottomColor: BorderNeutralPrimary,
  },
  noBorder: { borderBottomColor: "transparent" },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: Space4, width: "100%" },
  // Label is a fixed, short field name we control — it never truncates. The
  // value is the variable-length data, so it shrinks/ellipsizes instead.
  labelInline: {
    flexShrink: 0,
    fontSize: FontSizeSm,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightRegular),
    fontWeight: String(FontWeightRegular) as "400",
    lineHeight: FontSizeSm * 1.3,
    color: TextPrimary,
  },
  labelBlock: { flexShrink: 0, flexDirection: "column", alignItems: "flex-start", justifyContent: "center" },
  labelMedium: {
    fontSize: FontSizeSm,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightMedium),
    fontWeight: String(FontWeightMedium) as "500",
    lineHeight: FontSizeSm * 1.3,
    color: TextPrimary,
  },
  description: {
    fontSize: FontSizeXs,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightRegular),
    fontWeight: String(FontWeightRegular) as "400",
    lineHeight: FontSizeXs * 1.3,
    color: TextSecondary,
  },
  caption: {
    fontSize: FontSizeXs,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightRegular),
    fontWeight: String(FontWeightRegular) as "400",
    lineHeight: FontSizeXs * 1.3,
    color: TextPrimary,
  },
  captionError: { color: TextErrorPrimary },
  trailingGroup: { flexDirection: "row", alignItems: "center", justifyContent: "flex-end", gap: Space2, flex: 1, minWidth: 0 },
  chevron: { width: 30, height: 30, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  // Swipe-revealed state — the peek box gets the row's usual min-height/padding.
  swiped: { flexDirection: "row", alignItems: "center", gap: Space3, paddingVertical: 0 },
  swipePeek: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Space4,
    flex: 1,
    minWidth: 0,
    minHeight: 56,
    paddingVertical: Space6,
    paddingHorizontal: Space4,
    backgroundColor: BgNeutralPrimaryHover,
  },
  swipePeekStacked: {
    flexDirection: "column",
    gap: Space1,
    flex: 1,
    minWidth: 0,
    minHeight: 56,
    paddingVertical: Space6,
    paddingHorizontal: Space4,
    backgroundColor: BgNeutralPrimaryHover,
  },
  swipePeekRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: Space4, width: "100%" },
});

export const chevronColor = IconSecondary;
