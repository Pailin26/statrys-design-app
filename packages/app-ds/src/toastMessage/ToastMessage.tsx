import React from "react";
import { Pressable, Text, View } from "react-native";
import Svg, { Circle, Path, Rect } from "react-native-svg";
import { ArrowUpRight } from "lucide-react-native";
import { XClose } from "../xClose/XClose";
import { styles, iconColor, LINK_COLOR } from "./ToastMessage.styles";
import type { ToastVariant } from "./ToastMessage.styles";

export type { ToastVariant };

// Filled status glyphs (Figma's icons are a solid colored disc/triangle +
// white mark — not an outline icon like Lucide's, so these are ported
// faithfully rather than substituted). `fill` is the wrapping color;
// the inner mark is always white regardless of variant.
function SuccessIcon({ fill }: { fill: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Circle cx={10} cy={10} r={10} fill={fill} />
      <Path d="M5.8 10.3L8.4 12.9L14.2 7.1" stroke="white" strokeWidth={1.67} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function ErrorIcon({ fill }: { fill: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Circle cx={10} cy={10} r={10} fill={fill} />
      <Rect x={9.2} y={5} width={1.6} height={6.5} rx={0.8} fill="white" />
      <Circle cx={10} cy={14} r={1} fill="white" />
    </Svg>
  );
}
function WarningIcon({ fill }: { fill: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path d="M10 2.3L18 17H2L10 2.3Z" fill={fill} stroke={fill} strokeWidth={2} strokeLinejoin="round" />
      <Rect x={9.2} y={7.5} width={1.6} height={5} rx={0.8} fill="white" />
      <Circle cx={10} cy={14.3} r={1} fill="white" />
    </Svg>
  );
}

const ICONS: Record<Exclude<ToastVariant, "default">, React.ComponentType<{ fill: string }>> = {
  success: SuccessIcon,
  error: ErrorIcon,
  warning: WarningIcon,
};

export interface ToastMessageProps {
  variant?: ToastVariant;
  title: string;
  subtitle?: string;
  /** Optional trailing link (Figma "View Details") — omit for a plain toast. */
  action?: { label: string; onPress: () => void };
  onClose: () => void;
}

// Dark inverse surface, an optional leading status icon, title + optional
// subtitle, an optional "View Details"-style action link, and a close
// button. Purely presentational — no positioning, timer, or animation.
export function ToastMessage({ variant = "default", title, subtitle, action, onClose }: ToastMessageProps) {
  const Icon = variant === "default" ? null : ICONS[variant];
  return (
    <View style={styles.toast}>
      {Icon && (
        <View style={styles.icon}>
          <Icon fill={iconColor(variant)} />
        </View>
      )}
      <View style={styles.content}>
        <View style={styles.textBlock}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        {action && (
          <Pressable onPress={action.onPress} style={styles.link}>
            <Text style={styles.linkText}>{action.label}</Text>
            <ArrowUpRight size={16} strokeWidth={1.67} color={LINK_COLOR} />
          </Pressable>
        )}
      </View>
      <XClose size="sm" inverse onPress={onClose} accessibilityLabel="Dismiss" />
    </View>
  );
}
