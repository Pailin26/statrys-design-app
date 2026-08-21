import { StyleSheet } from "react-native";
import {
  ToggleTrackBorderWidth,
  ToggleKnobOffset,
  ToggleKnobOffsetWithBorder,
  ToggleTrackWidth,
  ToggleTrackHeight,
  ToggleKnobSize,
  ToggleTrackBg,
  ToggleTrackBgSelected,
  ToggleTrackBgSelectedDisabled,
  ToggleTrackBorderDisabled,
  ToggleKnobBg,
  ToggleKnobBgDisabled,
} from "@statrys/tokens";

// Every value here comes from semantic/toggle.json. Knob position is computed
// (not a fixed style) since it depends on both selected and disabled — see
// knobLeft below, mirrors accounting ui/Toggle's left-offset math (kept
// exact rather than re-deriving, per that file's own comment).
export const styles = StyleSheet.create({
  track: {
    width: ToggleTrackWidth,
    height: ToggleTrackHeight,
    borderRadius: ToggleTrackHeight,
    backgroundColor: ToggleTrackBg,
  },
  trackSelected: { backgroundColor: ToggleTrackBgSelected },
  trackDisabled: { backgroundColor: "transparent", borderWidth: ToggleTrackBorderWidth, borderColor: ToggleTrackBorderDisabled },
  trackSelectedDisabled: { backgroundColor: ToggleTrackBgSelectedDisabled, borderWidth: ToggleTrackBorderWidth, borderColor: ToggleTrackBorderDisabled },
  knob: {
    position: "absolute",
    top: (ToggleTrackHeight - ToggleKnobSize) / 2,
    width: ToggleKnobSize,
    height: ToggleKnobSize,
    borderRadius: ToggleKnobSize,
    backgroundColor: ToggleKnobBg,
  },
  knobDisabled: { backgroundColor: ToggleKnobBgDisabled },
});

export function knobLeft(selected: boolean, disabled: boolean): number {
  const offset = disabled ? ToggleKnobOffsetWithBorder : ToggleKnobOffset;
  return selected ? ToggleTrackWidth - ToggleKnobSize - offset : offset;
}
