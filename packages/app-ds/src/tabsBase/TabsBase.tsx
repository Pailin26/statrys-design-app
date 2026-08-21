import React from "react";
import { Pressable, Text, View } from "react-native";
import { NotiBadge } from "../notiBadge/NotiBadge";
import { styles } from "./TabsBase.styles";

export type TabsBaseVariant = "button" | "underline";

export interface TabsBaseProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
  variant?: TabsBaseVariant;
  /** Optional leading icon — 12px (Figma "DropdownIcon" slot). */
  icon?: React.ReactNode;
  /** Unread count (Figma showUnread) — renders a NotiBadge in the corner.
   *  Button-style overlays it absolutely on the tab's edge; underline-style
   *  sits it inline after the label. Active + button-style flips the badge
   *  to `inverse` since the tab itself is brand-colored. */
  unread?: string;
}

// Compose several into a row (see HorizontalTabs) to make a tab bar.
export function TabsBase({ label, active = false, onPress, variant = "button", icon, unread }: TabsBaseProps) {
  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={[
        styles.tab,
        variant === "button" ? styles.button : styles.underline,
        active && (variant === "button" ? styles.buttonActive : styles.underlineActive),
      ]}
    >
      {icon}
      <Text
        style={[
          styles.label,
          active
            ? variant === "button"
              ? styles.labelButtonActive
              : styles.labelUnderlineActive
            : styles.labelInactive,
        ]}
      >
        {label}
      </Text>
      {unread &&
        (variant === "button" ? (
          <View style={styles.badgeOverlay}>
            <NotiBadge count={unread} inverse={active} />
          </View>
        ) : (
          <NotiBadge count={unread} />
        ))}
    </Pressable>
  );
}
