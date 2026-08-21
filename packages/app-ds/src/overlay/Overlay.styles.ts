import { StyleSheet } from "react-native";
import { OverlayBackground, OverlayDuration } from "@statrys/tokens";

// Every value here comes from semantic/overlay.json. OverlayDuration builds
// to a raw "350ms" string on native (no ms-stripping transform is
// registered for the "duration" token type — only "dimension" gets that),
// so it's parsed here rather than passed straight to Animated.timing.
export const durationMs = Number.parseInt(OverlayDuration, 10);

export const styles = StyleSheet.create({
  overlay: { backgroundColor: OverlayBackground },
});
