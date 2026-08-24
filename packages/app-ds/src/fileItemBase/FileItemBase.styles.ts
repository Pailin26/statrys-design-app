import { StyleSheet } from "react-native";
import {
  BgNeutralPrimary,
  BorderNeutralPrimary,
  BorderErrorBold,
  BgNeutralSecondary,
  TextPrimary,
  TextSecondary,
  LinkPrimary,
  IconSecondary,
  ButtonPrimary,
  RadiusMd,
  Radius2xl,
  BorderWidthBase,
  FontPrimary,
  FontWeightRegular,
  FontWeightMedium,
  FontWeightBold,
  FontSizeSm,
  FontSizeXs,
  Space1,
  Space3,
  Space4,
  Space5,
  Space6,
  Space8,
} from "@statrys/tokens";
import { nativeFontFamily } from "../nativeFont";

// Every value here is an existing shared token — no semantic/fileItemBase.json.
// 65px min-height, the 24×27 file icon, its tag pill, and the 30×30 trailing
// button have no matching tokens, so they're plain literals. Same for the
// tag's #ff1607 background and FILE_ICON_STROKE's #C8D2E1 below — per
// accounting's own ui/FileItemBase (the source of truth), the file-type tag
// color is "a decorative format-color convention (like an OS file icon),
// not a semantic state token", so it's intentionally not tokenized.
export const styles = StyleSheet.create({
  root: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    gap: Space5,
    width: "100%",
    minHeight: 65,
    paddingVertical: Space6,
    paddingHorizontal: Space8,
    backgroundColor: BgNeutralPrimary,
    borderWidth: BorderWidthBase,
    borderColor: BorderNeutralPrimary,
    borderRadius: Radius2xl,
    overflow: "hidden",
  },
  error: { alignItems: "flex-start", borderColor: BorderErrorBold },
  progressFill: { position: "absolute", top: -1, bottom: -1, left: -1, backgroundColor: BgNeutralSecondary },
  icon: { flexShrink: 0, width: 24, height: 27 },
  tag: {
    position: "absolute",
    left: 0,
    bottom: -2,
    paddingVertical: 2,
    paddingHorizontal: 3,
    borderRadius: RadiusMd,
    backgroundColor: "#ff1607",
    color: "white",
    fontFamily: nativeFontFamily(FontPrimary, FontWeightBold),
    fontWeight: String(FontWeightBold) as "700",
    fontSize: 7,
    textTransform: "uppercase",
  },
  body: { flex: 1, minWidth: 0, flexDirection: "column", justifyContent: "center", gap: Space1 },
  name: {
    color: TextPrimary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightRegular),
    fontWeight: String(FontWeightRegular) as "400",
    fontSize: FontSizeSm,
    lineHeight: FontSizeSm * 1.3,
  },
  metaRow: { flexDirection: "row", alignItems: "center", gap: Space1 },
  meta: {
    color: TextSecondary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightRegular),
    fontWeight: String(FontWeightRegular) as "400",
    fontSize: FontSizeXs,
    lineHeight: FontSizeXs * 1.3,
  },
  divider: { width: 1, height: 9, backgroundColor: BorderNeutralPrimary },
  errorCaption: {
    color: TextSecondary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightRegular),
    fontWeight: String(FontWeightRegular) as "400",
    fontSize: FontSizeXs,
    lineHeight: FontSizeXs * 1.3,
  },
  retry: {
    color: LinkPrimary,
    textTransform: "capitalize",
    fontFamily: nativeFontFamily(FontPrimary, FontWeightMedium),
    fontWeight: String(FontWeightMedium) as "500",
    fontSize: FontSizeSm,
  },
  iconBtn: { width: 30, height: 30, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  replaceBtn: { paddingVertical: Space3, paddingHorizontal: Space4, flexShrink: 0 },
  replaceBtnText: {
    color: ButtonPrimary,
    textTransform: "uppercase",
    fontFamily: nativeFontFamily(FontPrimary, FontWeightMedium),
    fontWeight: String(FontWeightMedium) as "500",
    fontSize: FontSizeSm,
  },
});

export const ICON_BTN_COLOR = IconSecondary;
export const UPLOAD_ROW_COLOR = IconSecondary;
export const FILE_ICON_STROKE = "#C8D2E1";
