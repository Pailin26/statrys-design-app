import { StyleSheet } from "react-native";
import {
  XCloseIcon,
  XCloseIconInverse,
  XCloseHoverBg,
  XCloseHoverBgInverse,
  XCloseSizeSm,
  XCloseSizeMd,
  XCloseRadiusSm,
  XCloseRadiusMd,
} from "@statrys/tokens";

// Every value here comes from semantic/xClose.json.
export const styles = StyleSheet.create({
  base: { alignItems: "center", justifyContent: "center" },
  sizeSm: { width: XCloseSizeSm, height: XCloseSizeSm, borderRadius: XCloseRadiusSm },
  sizeMd: { width: XCloseSizeMd, height: XCloseSizeMd, borderRadius: XCloseRadiusMd },
});

export const iconColor = (inverse: boolean) => (inverse ? XCloseIconInverse : XCloseIcon);
export const hoverBg = (inverse: boolean) => (inverse ? XCloseHoverBgInverse : XCloseHoverBg);
