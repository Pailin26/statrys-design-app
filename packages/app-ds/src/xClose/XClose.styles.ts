import { StyleSheet } from "react-native";
import { IconPrimary, IconNeutralInversePrimary, Beige4, Neutral7, RadiusMd, RadiusLg, Space10 } from "@statrys/tokens";

// Every value here is an existing shared token — no semantic/xClose.json.
// `sizeMd` (30px) has no matching existing token, so it's a plain literal
// (only one-off, unshared value this component needs).
export const styles = StyleSheet.create({
  base: { alignItems: "center", justifyContent: "center" },
  sizeSm: { width: Space10, height: Space10, borderRadius: RadiusMd },
  sizeMd: { width: 30, height: 30, borderRadius: RadiusLg },
});

export const iconColor = (inverse: boolean) => (inverse ? IconNeutralInversePrimary : IconPrimary);
// Hover surfaces reuse the primitives their equivalent shared tokens are
// built from (button.tertiaryHover = beige.4; bg.neutralInverse.primaryHover
// = neutral.7) rather than reaching into those other components'/shared
// files' tokens directly.
export const hoverBg = (inverse: boolean) => (inverse ? Neutral7 : Beige4);
