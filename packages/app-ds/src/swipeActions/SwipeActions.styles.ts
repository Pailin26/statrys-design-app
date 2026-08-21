import { StyleSheet } from "react-native";
import { BgNeutralTertiary, TextPrimary, BgErrorBold, TextOnColor, RadiusLg, Space3, Space16 } from "@statrys/tokens";

// Every value here is an existing shared token — no semantic/swipeActions.json.
export const styles = StyleSheet.create({
  root: { flexDirection: "row", alignItems: "center", gap: Space3, flexShrink: 0 },
  more: {
    width: Space16,
    height: Space16,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RadiusLg,
    backgroundColor: BgNeutralTertiary,
  },
  delete: {
    width: Space16,
    height: Space16,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: RadiusLg,
    backgroundColor: BgErrorBold,
  },
});

export const MORE_ICON_COLOR = TextPrimary;
export const DELETE_ICON_COLOR = TextOnColor;
