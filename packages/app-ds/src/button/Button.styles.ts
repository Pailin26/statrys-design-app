import { StyleSheet } from "react-native";
import {
  ButtonPrimary,
  ButtonPrimaryActive,
  ButtonSecondaryActive,
  ButtonTertiaryActive,
  ButtonDisabled,
  TextNeutralInversePrimary,
  TextNeutralInverseDisabled,
} from "@statrys/tokens";

export const styles = StyleSheet.create({
  base: { borderRadius: 8, alignItems: "center", justifyContent: "center", borderWidth: 1 },
  sm: { paddingVertical: 6, paddingHorizontal: 12 },
  md: { paddingVertical: 10, paddingHorizontal: 16 },
  lg: { paddingVertical: 14, paddingHorizontal: 20 },
  label: { fontWeight: "600" },
});

// Hierarchy/states mirror apa-statrys/accounting's real Button
// (src/app/ui/Button/index.module.css): primary = filled, secondary =
// outline, tertiary = text-only. Merged onto `base` by variant + pressed +
// disabled state (see Button.tsx) since RN has no :hover/:active/:disabled.
export const containerColors = {
  primary: {
    base: { backgroundColor: ButtonPrimary, borderColor: ButtonPrimary },
    pressed: { backgroundColor: ButtonPrimaryActive, borderColor: ButtonPrimaryActive },
    disabled: { backgroundColor: ButtonDisabled, borderColor: "transparent" },
  },
  secondary: {
    base: { backgroundColor: "transparent", borderColor: ButtonPrimary },
    pressed: { borderColor: ButtonSecondaryActive },
    disabled: { borderColor: ButtonDisabled },
  },
  tertiary: {
    base: { backgroundColor: "transparent", borderColor: "transparent" },
    pressed: { backgroundColor: ButtonTertiaryActive },
    disabled: {},
  },
} as const;

export const labelColors = {
  primary: { base: TextNeutralInversePrimary, disabled: TextNeutralInverseDisabled },
  secondary: { base: ButtonPrimary, pressed: ButtonSecondaryActive, disabled: ButtonDisabled },
  tertiary: { base: ButtonPrimary, disabled: ButtonDisabled },
} as const;
