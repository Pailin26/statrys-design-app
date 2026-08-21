import React from "react";
import { ScrollView, View } from "react-native";
import { TabsBase, TabsBaseVariant } from "../tabsBase/TabsBase";
import { styles } from "./HorizontalTabs.styles";

export interface HorizontalTabsProps {
  tabs: string[];
  activeIndex: number;
  onChange: (index: number) => void;
  variant?: TabsBaseVariant;
  /** Per-tab unread count, aligned by index to `tabs` — omit an entry to leave that tab's badge off. */
  unread?: Array<string | undefined>;
}

// A row of TabsBase items. Scrolls horizontally when tabs overflow.
export function HorizontalTabs({ tabs, activeIndex, onChange, variant = "button", unread }: HorizontalTabsProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={[styles.row, variant === "button" ? styles.buttonRow : styles.underlineRow]}>
        {variant === "underline" && <View style={styles.track} />}
        {tabs.map((label, i) => (
          <TabsBase key={i} label={label} variant={variant} active={i === activeIndex} onPress={() => onChange(i)} unread={unread?.[i]} />
        ))}
      </View>
    </ScrollView>
  );
}
