import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { ChevronRight, Check } from "lucide-react-native";
import { Avatar } from "../avatar/Avatar";
import { styles, DISABLED_AVATAR_BG, DISABLED_AVATAR_TEXT, trailingIconColor, checkIconColor } from "./Tile.styles";

export type TileTrailing = "none" | "chevron" | "check";

export interface TileProps {
  /** Usually a plain string; pass a fragment of mixed-weight nodes when a row needs a
   *  regular-weight label + medium-weight value inline (e.g. a sort option's "Label: Value"). */
  title: React.ReactNode;
  /** Figma's Size axis — "sm" (54px) is a tighter row for denser lists; padding, gap and
   *  typography stay the same as "md" (65px), only the row height shrinks. */
  size?: "md" | "sm";
  /** Second line under the title (Figma showText). */
  text?: string;
  /** Inline "Primary"/"Sent"-style tag rendered right after the title — a small fixed
   *  beige-tertiary pill baked into Tile itself, not the general Badge. */
  badgeLabel?: string;
  /** Arbitrary node rendered right after the title, sharing the same row as badgeLabel. */
  titleBadge?: React.ReactNode;
  /** 24px leading icon (inherits the state color). */
  icon?: React.ReactNode;
  /** 30px leading country flag (e.g. <USFlag size={30} />). */
  flag?: React.ReactNode;
  /** Leading 40px initials avatar — pass the initials, e.g. "OR". */
  avatar?: string;
  /** Avatar background tint — defaults to Bg/Beige/primary when omitted. */
  avatarColor?: string;
  trailing?: TileTrailing;
  /** Custom 20px trailing icon in place of the chevron/check. Takes priority over `trailing`. */
  trailingIcon?: React.ReactNode;
  /** Skip the reserved 30px trailing slot when trailing="none". */
  reserveTrailing?: boolean;
  selected?: boolean;
  disabled?: boolean;
  /** Validation error border — not a Figma axis, just this token swapped in for `selected`'s brand border. */
  error?: boolean;
  /** "gray" = borderless, for tiles on the app's gray page background. */
  onLayer?: "neutral" | "gray";
  onPress?: () => void;
}

// Web animates titleBadge's mount/unmount (fade+scale, AnimatePresence);
// ported as a plain conditional render — no react-native-reanimated
// dependency for a single exit animation.
export function Tile({
  title,
  size = "md",
  text,
  badgeLabel,
  titleBadge,
  icon,
  flag,
  avatar,
  avatarColor,
  trailing = "none",
  trailingIcon,
  reserveTrailing = true,
  selected = false,
  disabled = false,
  error = false,
  onLayer = "neutral",
  onPress,
}: TileProps) {
  const [pressed, setPressed] = useState(false);
  // Pressed is its own `state` axis in Figma (alongside Selected/Disabled),
  // not layered on top of them — only show it on an otherwise-plain,
  // interactive tile.
  const showPressed = pressed && !selected && !disabled && !error;

  // Order matters — mirrors the web CSS's source-order cascade: gray's
  // borderless look is overridden by selected/error's border regardless of
  // layer, but respected by pressed's border (pressed stays borderless on
  // gray). disabled only ever touches background, never border-color.
  const tileStyle = [
    styles.tile,
    size === "sm" && styles.sm,
    onLayer === "gray" && styles.gray,
    selected && styles.selected,
    showPressed && (onLayer === "gray" ? styles.grayPressed : styles.pressed),
    disabled && styles.disabled,
    error && styles.error,
  ];

  const content = (
    <>
      {avatar ? (
        <Avatar
          size="lg"
          initials={avatar}
          color={disabled ? DISABLED_AVATAR_BG : avatarColor}
          textColor={disabled ? DISABLED_AVATAR_TEXT : undefined}
        />
      ) : flag ? (
        <View style={[styles.flag, disabled && styles.flagDisabled]}>{flag}</View>
      ) : icon ? (
        <View style={styles.icon}>{icon}</View>
      ) : null}
      <View style={styles.textBlock}>
        {badgeLabel || titleBadge ? (
          <View style={styles.titleRow}>
            <Text style={[styles.title, disabled && styles.disabledText]} numberOfLines={1}>
              {title}
            </Text>
            {badgeLabel && <Text style={styles.badgePill}>{badgeLabel}</Text>}
            {titleBadge}
          </View>
        ) : (
          <Text style={[styles.title, disabled && styles.disabledText]} numberOfLines={1}>
            {title}
          </Text>
        )}
        {text && (
          <Text style={[styles.text, disabled && styles.disabledText]} numberOfLines={1}>
            {text}
          </Text>
        )}
      </View>
      {(trailingIcon || trailing !== "none" || reserveTrailing) && (
        <View style={styles.trailing}>
          {trailingIcon
            ? trailingIcon
            : trailing === "chevron"
              ? <ChevronRight size={20} strokeWidth={1} color={trailingIconColor(disabled)} />
              : trailing === "check"
                ? <Check size={16} strokeWidth={1} color={checkIconColor()} />
                : null}
        </View>
      )}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        disabled={disabled}
        onPress={onPress}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        style={tileStyle}
      >
        {content}
      </Pressable>
    );
  }
  return <View style={tileStyle}>{content}</View>;
}
