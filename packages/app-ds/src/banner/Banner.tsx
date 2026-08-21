import React from "react";
import { Pressable, Text, View } from "react-native";
import { CircleCheck, TriangleAlert, OctagonAlert, Info, X } from "lucide-react-native";
import { styles, iconColor, bannerColors, CLOSE_ICON_COLOR } from "./Banner.styles";
import type { BannerColor } from "./Banner.styles";

export type { BannerColor };

const ICONS: Record<BannerColor, typeof CircleCheck> = {
  success: CircleCheck,
  warning: TriangleAlert,
  error: OctagonAlert,
  info: Info,
};

export interface BannerProps {
  color: BannerColor;
  text: string;
  /** Bold headline above `text` (Figma "Title + Text") — omit for "Text only". */
  title?: string;
  /** Trailing "View Details" text link — shown when `onLinkPress` is provided. */
  linkLabel?: string;
  onLinkPress?: () => void;
  /** Dismiss (×) button — shown when provided. */
  onDismiss?: () => void;
}

export function Banner({ color, text, title, linkLabel = "View Details", onLinkPress, onDismiss }: BannerProps) {
  const Icon = ICONS[color];

  return (
    <View style={[styles.banner, bannerColors[color]]}>
      <View style={styles.icon}>
        <Icon size={16} strokeWidth={1.67} color={iconColor(color)} />
      </View>
      <View style={styles.body}>
        <View style={styles.textGroup}>
          {title && <Text style={styles.title}>{title}</Text>}
          <Text style={title ? styles.textCaption : styles.text}>{text}</Text>
        </View>
        {onLinkPress && (
          <Pressable onPress={onLinkPress}>
            <Text style={styles.link}>{linkLabel}</Text>
          </Pressable>
        )}
      </View>
      {onDismiss && (
        <Pressable accessibilityRole="button" accessibilityLabel="Dismiss" onPress={onDismiss} style={styles.close}>
          <X size={20} strokeWidth={1.67} color={CLOSE_ICON_COLOR} />
        </Pressable>
      )}
    </View>
  );
}
