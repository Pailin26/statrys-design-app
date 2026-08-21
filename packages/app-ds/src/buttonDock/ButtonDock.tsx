import React from "react";
import { View } from "react-native";
import { Button } from "../button/Button";
import { Checkbox } from "../checkbox/Checkbox";
import { styles } from "./ButtonDock.styles";

export type ButtonDockType = "single" | "double" | "ghost" | "triple";
export type ButtonDockStack = "vertical" | "horizontal";

interface ButtonDockCommonProps {
  /** Arbitrary content rendered above the actions (Figma "Slot", e.g. a price summary) —
   *  shares the actions row's side padding; omit for docks with no slot content. */
  slot?: React.ReactNode;
  /** Show the checkbox accessory row above the actions. */
  accessory?: boolean;
  /** Float the dock over the page's scroll area (absolute, bottom of the screen) so content
   *  frosts through the backdrop tint as it scrolls underneath. Page docks pass this; sheet
   *  footers stay in-flow. */
  sticky?: boolean;
  primaryLabel?: string;
  /** Second action: outline for 'double'/'triple', ghost text for 'ghost'. */
  secondaryLabel?: string;
  /** Third (ghost) action — 'triple' only. */
  tertiaryLabel?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
  onTertiary?: () => void;
  primaryDisabled?: boolean;
  secondaryDisabled?: boolean;
  tertiaryDisabled?: boolean;
  /** Accessory checkbox state. */
  selected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  accessoryLabel?: string;
}

/** 'single' = primary only; 'double' = primary + outline; 'triple' = primary +
 *  outline + ghost. Figma has no Stack=Horizontal variant for any of these —
 *  always vertical, so `stack` isn't offered at all. */
interface ButtonDockVerticalProps {
  type?: "single" | "double" | "triple";
  stack?: never;
}

/** 'ghost' = primary + ghost (text) action — the only type Figma pairs with
 *  Stack=Horizontal (ghost left, primary right). Can still stack vertically
 *  too (stack defaults to 'vertical'). */
interface ButtonDockGhostProps {
  type: "ghost";
  stack?: ButtonDockStack;
}

export type ButtonDockProps = ButtonDockCommonProps & (ButtonDockVerticalProps | ButtonDockGhostProps);

// Matches the DS StickyButton set. Web's frosted backdrop-blur (transparent
// → white-40 gradient + blur + feathered mask) is approximated with a flat
// AlphaWhite40 tint (no expo-blur dependency), same call as PageHeader's
// glass buttons. The "IOS controls: Keyboard" variant (a prototype-only
// mock of the on-screen keyboard + home indicator) isn't ported — a real
// RN app gets the actual system keyboard, it never needs to render one.
// `loading`/`destructive`/`success`/leading+trailing icon props aren't
// ported either — app-ds's own Button doesn't support them yet.
export function ButtonDock({
  type = "double",
  stack = "vertical",
  slot,
  accessory = false,
  sticky = false,
  primaryLabel = "Confirm",
  secondaryLabel = "Cancel",
  tertiaryLabel = "Close",
  onPrimary,
  onSecondary,
  onTertiary,
  primaryDisabled,
  secondaryDisabled,
  tertiaryDisabled,
  selected,
  onSelectedChange,
  accessoryLabel = "Remember me",
}: ButtonDockProps) {
  const horizontal = stack === "horizontal" && type === "ghost";

  const primaryButton = (
    <Button variant="primary" size="md" disabled={primaryDisabled} onPress={onPrimary}>
      {primaryLabel}
    </Button>
  );

  const secondaryButton = type !== "single" && (
    <Button variant={type === "ghost" ? "tertiary" : "secondary"} size="md" disabled={secondaryDisabled} onPress={onSecondary}>
      {secondaryLabel}
    </Button>
  );

  return (
    <View style={[styles.root, slot ? styles.opaque : styles.frost, sticky && styles.sticky]}>
      {slot && <View style={styles.slot}>{slot}</View>}
      {accessory && (
        <View style={styles.accessory}>
          <Checkbox selected={!!selected} onChange={onSelectedChange} label={accessoryLabel} />
        </View>
      )}
      <View style={[styles.actions, horizontal && styles.actionsHorizontal]}>
        {horizontal ? (
          <>
            <View style={styles.flexButton}>{secondaryButton}</View>
            <View style={styles.flexButton}>{primaryButton}</View>
          </>
        ) : (
          <>
            {primaryButton}
            {secondaryButton}
            {type === "triple" && (
              <Button variant="tertiary" size="md" disabled={tertiaryDisabled} onPress={onTertiary}>
                {tertiaryLabel}
              </Button>
            )}
          </>
        )}
      </View>
    </View>
  );
}
