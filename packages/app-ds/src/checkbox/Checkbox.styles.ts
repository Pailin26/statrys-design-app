import { StyleSheet } from "react-native";
import {
  CheckboxWrapperSizeSm,
  CheckboxWrapperSizeMd,
  CheckboxBoxSizeSm,
  CheckboxBoxSizeMd,
  CheckboxRadiusSm,
  CheckboxRadiusMd,
  CheckboxSelectedBorderWidthMd,
  BorderWidthSm,
  BorderWidthMd,
  IconSecondary,
  IconBrand,
  IconDisabled,
  BgNeutralDisabled,
  BgNeutralPrimary,
  TextPrimary,
  TextSecondary,
  FontPrimary,
  FontWeightRegular,
  FontSizeSm,
  FontSizeXs,
  Space4,
} from "@statrys/tokens";
import { nativeFontFamily } from "../nativeFont";

// Every value here is an existing shared token, plus the pre-existing
// component/checkbox.json (sizing values with no shared equivalent — added
// alongside web-ds's Checkbox, not by this port).
export const styles = StyleSheet.create({
  root: { flexDirection: "row", gap: Space4 },
  rootWithDescription: { alignItems: "flex-start" },
  rootNoDescription: { alignItems: "center" },
  wrapper: { alignItems: "center", justifyContent: "center", flexShrink: 0 },
  wrapperSm: { width: CheckboxWrapperSizeSm, height: CheckboxWrapperSizeSm },
  wrapperMd: { width: CheckboxWrapperSizeMd, height: CheckboxWrapperSizeMd },
  box: { alignItems: "center", justifyContent: "center" },
  boxSm: { width: CheckboxBoxSizeSm, height: CheckboxBoxSizeSm, borderRadius: CheckboxRadiusSm },
  boxMd: { width: CheckboxBoxSizeMd, height: CheckboxBoxSizeMd, borderRadius: CheckboxRadiusMd },
  text: { flexDirection: "column" },
  label: {
    fontFamily: nativeFontFamily(FontPrimary, FontWeightRegular),
    fontWeight: String(FontWeightRegular) as "400",
    fontSize: FontSizeSm,
    lineHeight: FontSizeSm * 1.3,
    color: TextPrimary,
  },
  description: {
    fontFamily: nativeFontFamily(FontPrimary, FontWeightRegular),
    fontWeight: String(FontWeightRegular) as "400",
    fontSize: FontSizeXs,
    lineHeight: FontSizeXs * 1.3,
    color: TextSecondary,
  },
});

// `sm`/`md` above only set the wrapper/box *size* (shared with `styles[size]`
// applied twice in Checkbox.tsx — once for wrapper, once for box); this
// covers the box's colors + border width, which vary by selected/disabled
// *and* size (md's selected border-width has its own token).
export function boxState(selected: boolean, disabled: boolean, size: "sm" | "md") {
  if (disabled) {
    return { backgroundColor: BgNeutralDisabled, borderWidth: BorderWidthSm, borderColor: IconDisabled };
  }
  if (selected) {
    return {
      backgroundColor: IconBrand,
      borderColor: IconBrand,
      borderWidth: size === "md" ? CheckboxSelectedBorderWidthMd : BorderWidthMd,
    };
  }
  return { backgroundColor: "transparent", borderWidth: BorderWidthSm, borderColor: IconSecondary };
}

export function iconColor(disabled: boolean): string {
  // White is invisible against bg.neutral.disabled's near-transparent fill —
  // match the border color instead, same call web-ds's Checkbox makes.
  return disabled ? IconDisabled : BgNeutralPrimary;
}

export function iconSize(size: "sm" | "md"): number {
  return (size === "md" ? CheckboxBoxSizeMd : CheckboxBoxSizeSm) * 0.7;
}
