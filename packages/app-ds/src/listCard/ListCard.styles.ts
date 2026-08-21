import { StyleSheet } from "react-native";
import { BgNeutralPrimary, BorderNeutralPrimary, BorderWidthBase, Radius2xl, Space8 } from "@statrys/tokens";

// Every value here is an existing shared token — no semantic/listCard.json.
export const styles = StyleSheet.create({
  card: {
    width: "100%",
    overflow: "hidden",
    borderRadius: Radius2xl,
    backgroundColor: BgNeutralPrimary,
    borderWidth: BorderWidthBase,
    borderColor: BorderNeutralPrimary,
    paddingHorizontal: Space8,
  },
  gray: { borderColor: "transparent" },
});
