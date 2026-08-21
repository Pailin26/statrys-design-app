import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { ChevronLeft, Search, Mic, X } from "lucide-react-native";
import { styles, GLASS_ICON_COLOR, DISABLED_ICON_COLOR, PLACEHOLDER_COLOR } from "./PageHeader.styles";

export type PageHeaderType = "left" | "left-on-scroll" | "center" | "search";

export interface PageHeaderProps {
  type?: PageHeaderType;
  title?: string;
  /** Secondary line under the title (Figma showText). */
  text?: string;
  /** Hide the back button (Figma showLeftButton). */
  showBack?: boolean;
  onBack?: () => void;
  backIcon?: React.ReactNode;
  backLabel?: string;
  /** Hide the right-side button (Figma showRightButton) — an invisible 36px spacer keeps the "center" title optically centered. */
  showSearch?: boolean;
  onSearchPress?: () => void;
  rightIcon?: React.ReactNode;
  rightLabel?: string;
  onRightPress?: () => void;
  right?: React.ReactNode;
  rightSlot?: React.ReactNode;
  primaryIcon?: React.ReactNode;
  primaryLabel?: string;
  onPrimaryPress?: () => void;
  /** type="search" only — the pill's controlled input + mic action. */
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  onMicPress?: () => void;
  showAction?: boolean;
  /** type="search" only — focus the input on mount. */
  autoFocusSearch?: boolean;
  error?: boolean;
  disabled?: boolean;
  /** type="left" only — custom content replacing the big-title slot. */
  children?: React.ReactNode;
  /** type="left" only — show the compact title next to the back button instead of the big title slot. */
  collapsed?: boolean;
  /** The header sits over a dark/colored backdrop at rest — recolor the title/text to onColor. */
  onColor?: boolean;
}

function GlassButton({
  onPress,
  accessibilityLabel,
  children,
}: {
  onPress?: () => void;
  accessibilityLabel: string;
  children: React.ReactNode;
}) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={accessibilityLabel} onPress={onPress} style={styles.glassButton}>
      {children}
    </Pressable>
  );
}

export function PageHeader({
  type = "left-on-scroll",
  title,
  text,
  showBack = true,
  onBack,
  backIcon,
  backLabel,
  showSearch = true,
  onSearchPress,
  rightIcon,
  rightLabel,
  onRightPress,
  right,
  rightSlot,
  primaryIcon,
  primaryLabel,
  onPrimaryPress,
  searchValue = "",
  onSearchChange,
  searchPlaceholder,
  onMicPress,
  showAction = true,
  autoFocusSearch = false,
  error = false,
  disabled = false,
  children,
  collapsed = false,
  onColor = false,
}: PageHeaderProps) {
  const [focused, setFocused] = useState(false);

  const back = showBack && (
    <GlassButton accessibilityLabel={backLabel ?? "Back"} onPress={onBack}>
      {backIcon ?? <ChevronLeft size={20} strokeWidth={1} color={GLASS_ICON_COLOR} />}
    </GlassButton>
  );
  const mainRight = right ? (
    right
  ) : rightSlot ? (
    <View style={styles.glassPill}>{rightSlot}</View>
  ) : !showSearch ? (
    <View style={styles.spacer} />
  ) : rightIcon ? (
    <GlassButton accessibilityLabel={rightLabel ?? "Action"} onPress={onRightPress}>
      {rightIcon}
    </GlassButton>
  ) : (
    <GlassButton accessibilityLabel="Search" onPress={onSearchPress}>
      <Search size={20} strokeWidth={1} color={GLASS_ICON_COLOR} />
    </GlassButton>
  );
  const searchButton = primaryIcon ? (
    <View style={styles.rightGroup}>
      {mainRight}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={primaryLabel ?? "Primary action"}
        onPress={onPrimaryPress}
        style={styles.primaryButton}
      >
        {primaryIcon}
      </Pressable>
    </View>
  ) : (
    mainRight
  );

  if (type === "left") {
    // Web smoothly morphs the big title into the compact row on `collapsed`
    // (grid-rows + opacity/transform transitions); ported as a plain
    // conditional render — no react-native-reanimated dependency for a
    // single collapse animation.
    return (
      <View style={[styles.header, styles.left, collapsed && styles.leftCollapsed]}>
        <View style={styles.buttonRow}>
          {back || <View />}
          {collapsed && (
            <Text style={[styles.compactTitle, onColor && styles.onColorText]} numberOfLines={1}>
              {title}
            </Text>
          )}
          {searchButton}
        </View>
        {!collapsed && (
          <View style={styles.slotInner}>
            {children ?? (
              <>
                <Text style={[styles.titleLg, onColor && styles.onColorText]}>{title}</Text>
                {text && <Text style={[styles.text, onColor && styles.onColorText]}>{text}</Text>}
              </>
            )}
          </View>
        )}
      </View>
    );
  }

  if (type === "search") {
    const showClear = focused;
    return (
      <View style={[styles.header, styles.row]}>
        {back}
        <View style={[styles.searchPill, focused && styles.searchPillFocused, error && styles.searchPillError, disabled && styles.searchPillDisabled]}>
          <Search size={20} strokeWidth={1} color={disabled ? DISABLED_ICON_COLOR : GLASS_ICON_COLOR} />
          <TextInput
            style={[styles.pillInput, disabled && styles.disabledText]}
            value={searchValue}
            onChangeText={onSearchChange}
            placeholder={searchPlaceholder}
            placeholderTextColor={PLACEHOLDER_COLOR}
            autoFocus={autoFocusSearch}
            editable={!disabled}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          {/* X replaces the mic while focused, same convention as Search. */}
          {showClear ? (
            <Pressable accessibilityRole="button" accessibilityLabel="Clear search" disabled={disabled} onPress={() => onSearchChange?.("")}>
              <X size={20} strokeWidth={1} color={GLASS_ICON_COLOR} />
            </Pressable>
          ) : (
            showAction && (
              <Pressable accessibilityRole="button" accessibilityLabel="Voice search" disabled={disabled} onPress={onMicPress}>
                <Mic size={20} strokeWidth={1} color={disabled ? DISABLED_ICON_COLOR : GLASS_ICON_COLOR} />
              </Pressable>
            )
          )}
        </View>
      </View>
    );
  }

  // "left-on-scroll" and "center" share the compact row layout and the same
  // card-title-md (18px) size. Web tweens the title's box position on a
  // type change (motion `layout`) and crossfades the text line
  // (AnimatePresence) — dropped for native, same "no new dependency" call
  // as `collapsed` above; renders the current type/text directly.
  return (
    <View style={[styles.header, styles.row]}>
      {back}
      <View style={[styles.titleBlock, type === "center" && styles.centered]}>
        {title && <Text style={[styles.titleMd, onColor && styles.onColorText]}>{title}</Text>}
        {text && <Text style={[styles.text, onColor && styles.onColorText]}>{text}</Text>}
      </View>
      {searchButton}
    </View>
  );
}
