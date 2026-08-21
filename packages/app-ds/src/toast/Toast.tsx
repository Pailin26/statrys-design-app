import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { ToastMessage } from "../toastMessage/ToastMessage";
import type { ToastVariant } from "../toastMessage/ToastMessage";
import { styles } from "./Toast.styles";

export interface ToastProps {
  open: boolean;
  /** Short, scannable title (e.g. "Invoice sent"). */
  message?: string;
  /** Optional second line (e.g. "Marked as sent"). */
  subtext?: string;
  onDone?: () => void;
  duration?: number;
  variant?: ToastVariant;
  /** Optional "View Details"-style trailing link. */
  action?: { label: string; onPress: () => void };
  /** Distance (px) from the page's true bottom edge. Default 96 clears a single-button
   *  ButtonDock or a FAB with a little breathing room. Pass ~150 on a page whose dock is
   *  "double"/"triple" at the moment the toast fires, or ~16 on a page with no bottom chrome at all. */
  bottomOffset?: number;
}

// Bottom toast — auto-hides after `duration`, or dismiss immediately via
// its own close button. Anchored above the page's bottom chrome (see
// `bottomOffset`) so it never covers a dock/FAB. Caller renders this inside
// a positioned (relative) container that fills the screen.
export function Toast({ open, message = "Invoice sent", subtext, onDone, duration = 3000, variant = "success", action, bottomOffset = 96 }: ToastProps) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(progress, { toValue: open ? 1 : 0, stiffness: 380, damping: 30, mass: 1, useNativeDriver: true }).start();
  }, [open, progress]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => onDone?.(), duration);
    return () => clearTimeout(t);
  }, [open, duration, onDone]);

  const translateY = progress.interpolate({ inputRange: [0, 1], outputRange: [40, 0] });

  return (
    <Animated.View
      pointerEvents={open ? "box-none" : "none"}
      style={[styles.toast, { bottom: bottomOffset, opacity: progress, transform: [{ translateY }] }]}
    >
      <ToastMessage variant={variant} title={message} subtitle={subtext} action={action} onClose={() => onDone?.()} />
    </Animated.View>
  );
}
