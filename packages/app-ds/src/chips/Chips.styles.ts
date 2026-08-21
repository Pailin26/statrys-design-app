import { StyleSheet } from "react-native";
import {
  ButtonSecondary,
  ButtonPaddingHorizontalSm,
  BorderNeutralPrimary,
  RadiusMd,
  BgNeutralPrimary,
  BgNeutralPrimaryHover,
  BorderBeigePrimaryHover,
  TextSecondary,
  Space2,
  FontPrimary,
  FontWeightMedium,
  FontSizeSm,
} from "@statrys/tokens";
import { nativeFontFamily } from "../nativeFont";

// Every value here is an existing shared token — no semantic/chips.json.
// Fixed 30px height / 16px dismiss hit target have no matching token
// (nothing in the space scale lands on 30 or 16-as-a-square-icon-box), so
// they're plain literals.
export const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    paddingHorizontal: ButtonPaddingHorizontalSm,
    borderWidth: 1,
    borderColor: BorderNeutralPrimary,
    borderRadius: RadiusMd,
    backgroundColor: "transparent",
  },
  active: { borderColor: ButtonSecondary },
  input: { gap: Space2, backgroundColor: BgNeutralPrimary },
  inputPressed: { backgroundColor: BgNeutralPrimaryHover, borderColor: BorderBeigePrimaryHover },
  label: {
    color: ButtonSecondary,
    fontFamily: nativeFontFamily(FontPrimary, FontWeightMedium),
    fontWeight: String(FontWeightMedium) as "500",
    fontSize: FontSizeSm,
  },
  dismiss: { width: 16, height: 16, alignItems: "center", justifyContent: "center" },
});

export const dismissIconColor = TextSecondary;
