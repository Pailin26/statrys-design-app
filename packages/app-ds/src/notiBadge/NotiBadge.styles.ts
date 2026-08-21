import { StyleSheet } from "react-native";
import {
  NotiBadgeSolidBg,
  NotiBadgeSolidText,
  NotiBadgeInverseBg,
  NotiBadgeInverseBorder,
  NotiBadgeInverseText,
  NotiBadgeHeight,
  NotiBadgeMinWidth,
  NotiBadgePaddingVertical,
  NotiBadgePaddingHorizontal,
  NotiBadgeBorderWidth,
  NotiBadgeRadius,
  NotiBadgeFontFamily,
  NotiBadgeFontWeight,
  NotiBadgeFontSize,
  NotiBadgeLineHeight,
  NotiBadgeShadow,
} from "@statrys/tokens";
import { nativeFontFamily } from "../nativeFont";
import { parseCssBoxShadow } from "../nativeShadow";

// Every value here comes from semantic/notiBadge.json.
const shadow = parseCssBoxShadow(NotiBadgeShadow);

export const styles = StyleSheet.create({
  badge: {
    height: NotiBadgeHeight,
    minWidth: NotiBadgeMinWidth,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: NotiBadgePaddingVertical,
    paddingHorizontal: NotiBadgePaddingHorizontal,
    borderRadius: NotiBadgeRadius,
    ...shadow,
  },
  solid: { backgroundColor: NotiBadgeSolidBg },
  inverse: { backgroundColor: NotiBadgeInverseBg, borderWidth: NotiBadgeBorderWidth, borderColor: NotiBadgeInverseBorder },
  label: {
    fontFamily: nativeFontFamily(NotiBadgeFontFamily, NotiBadgeFontWeight),
    fontWeight: String(NotiBadgeFontWeight) as "500",
    fontSize: NotiBadgeFontSize,
    lineHeight: NotiBadgeFontSize * NotiBadgeLineHeight,
  },
  labelSolid: { color: NotiBadgeSolidText },
  labelInverse: { color: NotiBadgeInverseText },
});
