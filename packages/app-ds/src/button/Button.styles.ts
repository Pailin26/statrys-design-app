import { StyleSheet } from "react-native";

// TODO: replace raw hex values with @statrys/tokens once the JS token
// output (tokens.js) is wired in — kept literal here for scaffold clarity.
export const styles = StyleSheet.create({
  base: { borderRadius: 8, alignItems: "center", justifyContent: "center" },
  primary: { backgroundColor: "#ff4a15" },
  secondary: { backgroundColor: "#1b1b1b" },
  ghost: { backgroundColor: "transparent" },
  sm: { paddingVertical: 6, paddingHorizontal: 12 },
  md: { paddingVertical: 10, paddingHorizontal: 16 },
  lg: { paddingVertical: 14, paddingHorizontal: 20 },
  disabled: { opacity: 0.5 },
  label: { color: "#ffffff", fontWeight: "600" },
});
