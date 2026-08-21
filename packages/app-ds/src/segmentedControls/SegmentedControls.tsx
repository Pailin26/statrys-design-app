import React from "react";
import { View } from "react-native";
import { SegmentedControlBase } from "../segmentedControlBase/SegmentedControlBase";
import { styles } from "./SegmentedControls.styles";

export interface SegmentedControlsProps {
  /** 2-4 segment labels. */
  segments: string[];
  activeIndex: number;
  onChange: (index: number) => void;
}

// A beige track of 2-4 SegmentedControlBase segments; a hairline separator
// appears between two adjacent segments that are both inactive (never next
// to the active one).
export function SegmentedControls({ segments, activeIndex, onChange }: SegmentedControlsProps) {
  const items: React.ReactNode[] = [];
  segments.forEach((label, i) => {
    const active = i === activeIndex;
    const prevActive = i - 1 === activeIndex;
    if (i > 0 && !active && !prevActive) {
      items.push(<View key={`sep-${i}`} style={styles.separator} />);
    }
    items.push(<SegmentedControlBase key={i} label={label} active={active} onPress={() => onChange(i)} />);
  });
  return <View style={styles.track}>{items}</View>;
}
