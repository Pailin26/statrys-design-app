import React from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "./BottomSheet.styles";

export interface BottomSheetProps {
  title?: string;
  /** 20px icon for the header's frosted 36px action button (Figma icon-swap slot). */
  action?: React.ReactNode;
  onAction?: () => void;
  /** Accessible name for the action button. */
  actionLabel?: string;
  /** Hide the whole header — grabber and title row (Figma showHeader). */
  showHeader?: boolean;
  /** Sticky footer slot (Figma showStickyButton) — pass a `ButtonDock`; renders
   *  in place of the plain bottom pad. */
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

// Presentational only, same as web — modal behavior (scrim, slide-up motion,
// positioning) stays with the caller. Web pins the header via CSS `position:
// sticky` against the sheet's own scrolling container; that only matters
// when `children` scrolls *under* this header, so on native the caller
// should put children in its own ScrollView below this header (a sibling,
// not a descendant of it) — plain flex column order already keeps the
// header fixed without needing a sticky concept.
export function BottomSheet({
  title,
  action,
  onAction,
  actionLabel = "Action",
  showHeader = true,
  footer,
  children,
}: BottomSheetProps) {
  return (
    <View style={styles.sheet}>
      {showHeader && (
        <View style={styles.header}>
          <View style={styles.indicator}>
            <View style={styles.grabber} />
          </View>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            {action && (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={actionLabel}
                onPress={onAction}
                style={styles.actionButton}
              >
                {action}
              </Pressable>
            )}
          </View>
        </View>
      )}
      <View style={styles.content}>{children}</View>
      {footer ? <View style={styles.footer}>{footer}</View> : <View style={styles.bottomPad} />}
    </View>
  );
}
