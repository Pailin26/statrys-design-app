import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";
import { styles, durationMs } from "./Overlay.styles";

export interface OverlayProps {
  /** Full-bleed scrim behind a modal/bottom sheet. Fades in/out as this flips. */
  visible: boolean;
  onPress?: () => void;
}

// Web's Overlay is driven by a parent AnimatePresence/motion.div (Framer
// Motion, web-only); native has no such library wired up yet, so this
// drives its own fade with RN's built-in Animated — no new dependency for
// a single opacity tween.
export function Overlay({ visible, onPress }: OverlayProps) {
  const opacity = useRef(new Animated.Value(visible ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: durationMs,
      useNativeDriver: true,
    }).start();
  }, [visible, opacity]);

  return (
    <Animated.View style={[StyleSheet.absoluteFill, styles.overlay, { opacity }]} pointerEvents={visible ? "auto" : "none"}>
      <Pressable style={StyleSheet.absoluteFill} onPress={onPress} accessibilityElementsHidden accessibilityLabel="" />
    </Animated.View>
  );
}
