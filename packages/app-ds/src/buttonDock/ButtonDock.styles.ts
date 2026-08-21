import { StyleSheet } from "react-native";
import { AlphaWhite40, BgNeutralPrimary, Radius3xl, Space4, Space6, Space8 } from "@statrys/tokens";
import { parseCssBoxShadow } from "../nativeShadow";

// Every value here is an existing shared token — no semantic/buttonDock.json.
// 16px top / 32px bottom padding (Figma's home-indicator allowance) has no
// matching single token, so it's a plain literal.
const opaqueShadow = parseCssBoxShadow("0px 10px 30px 0px rgba(0, 0, 0, 0.2)");

export const styles = StyleSheet.create({
  root: {
    width: "100%",
    borderTopLeftRadius: Radius3xl,
    borderTopRightRadius: Radius3xl,
    paddingTop: 16,
    paddingBottom: 32,
  },
  // Approximates web's transparent→white-40 gradient + backdrop blur with a
  // flat tint (no expo-blur/expo-linear-gradient dependency).
  frost: { backgroundColor: AlphaWhite40 },
  // A slot with real content needs a solid, legible surface, not a frosted tint.
  opaque: { backgroundColor: BgNeutralPrimary, ...opaqueShadow },
  sticky: { position: "absolute", bottom: 0, left: 0, right: 0 },
  accessory: { paddingHorizontal: Space8, paddingBottom: Space6 },
  slot: { paddingHorizontal: Space8, paddingBottom: Space6 },
  actions: { flexDirection: "column", gap: Space4, paddingHorizontal: Space8 },
  actionsHorizontal: { flexDirection: "row" },
  flexButton: { flex: 1 },
});
