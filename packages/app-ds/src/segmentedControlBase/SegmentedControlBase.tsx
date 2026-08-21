import React from "react";
import { Pressable, Text, View } from "react-native";
import { styles } from "./SegmentedControlBase.styles";

export interface SegmentedControlBaseProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
  /** Optional leading icon slot (Figma iconSwap), 16px. */
  icon?: React.ReactNode;
}

// Web slides the active pill between segments via a shared framer-motion
// `layoutId` element; ported as a plain static View behind the active
// segment's content — no react-native-reanimated dependency for a single
// shared-element transition. Compose several via SegmentedControls.
export function SegmentedControlBase({ label, active = false, onPress, icon }: SegmentedControlBaseProps) {
  return (
    <Pressable accessibilityRole="tab" accessibilityState={{ selected: active }} onPress={onPress} style={styles.segment}>
      {active && <View style={styles.thumb} />}
      <View style={styles.content}>
        {icon}
        <Text style={[styles.label, active && styles.labelActive]} numberOfLines={1}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}
