import { StyleSheet } from "react-native";
import { BgBeigeSecondary, BorderNeutralPrimary, RadiusXl, Space1 } from "@statrys/tokens";

// Every value here is an existing shared token — no semantic/segmentedControls.json.
export const styles = StyleSheet.create({
  track: { flexDirection: "row", alignItems: "center", width: "100%", padding: Space1, borderRadius: RadiusXl, backgroundColor: BgBeigeSecondary },
  separator: { flexShrink: 0, width: 1, height: 20, backgroundColor: BorderNeutralPrimary },
});
