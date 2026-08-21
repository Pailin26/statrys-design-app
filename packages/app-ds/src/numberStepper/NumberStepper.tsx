import React from "react";
import { Pressable, Text, View } from "react-native";
import { Minus, Plus } from "lucide-react-native";
import { styles, btnColor } from "./NumberStepper.styles";

export interface NumberStepperProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  /** Describes what's being stepped, for the button accessibility labels — "Decrease {label}" /
   *  "Increase {label}", e.g. label="quantity". Defaults to "value". */
  label?: string;
}

export function NumberStepper({
  value,
  onChange,
  min = 0,
  max = Infinity,
  step = 1,
  disabled = false,
  label = "value",
}: NumberStepperProps) {
  const decreaseDisabled = disabled || value <= min;
  const increaseDisabled = disabled || value >= max;

  return (
    <View style={[styles.root, disabled && styles.disabled]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Decrease ${label}`}
        disabled={decreaseDisabled}
        onPress={() => onChange(Math.max(min, value - step))}
        style={styles.btn}
      >
        <Minus size={16} strokeWidth={1.67} color={btnColor(decreaseDisabled)} />
      </Pressable>
      <Text style={styles.value}>{value}</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Increase ${label}`}
        disabled={increaseDisabled}
        onPress={() => onChange(Math.min(max, value + step))}
        style={styles.btn}
      >
        <Plus size={16} strokeWidth={1.67} color={btnColor(increaseDisabled)} />
      </Pressable>
    </View>
  );
}
