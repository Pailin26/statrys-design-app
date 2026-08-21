import { StyleSheet } from "react-native";
import { BorderNeutralPrimary, Space4 } from "@statrys/tokens";

// Every value here is an existing shared token — no semantic/horizontalTabs.json.
export const styles = StyleSheet.create({
  row: { position: "relative", flexDirection: "row", alignItems: "center" },
  buttonRow: { gap: Space4 },
  underlineRow: { gap: 0 },
  track: { position: "absolute", bottom: 0, left: 0, right: 0, height: 1, backgroundColor: BorderNeutralPrimary },
});
