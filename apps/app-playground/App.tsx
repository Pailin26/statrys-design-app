import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { IconProvider } from "@statrys/app-ds";
import { Foundation } from "./src/sections/Foundation";
import { Components } from "./src/sections/Components";
import { useAppFonts } from "./src/fonts";

type Tab = "foundation" | "components";
type NavGroup = { group: string; items: { id: string; label: string }[] };

const TABS: { id: Tab; label: string }[] = [
  { id: "foundation", label: "Foundation" },
  { id: "components", label: "Components" },
];

// Mirrors apps/web-playground/src/App.tsx's NAV — same ids, so the two
// playgrounds' sections/Foundation.tsx PAGES stay in lockstep.
const NAV: Record<Tab, NavGroup[]> = {
  foundation: [
    {
      group: "Primitives",
      items: [
        { id: "colors", label: "Colors" },
        { id: "spacing", label: "Spacing" },
        { id: "radius", label: "Radius" },
        { id: "effects", label: "Effects" },
        { id: "motion", label: "Motion" },
        { id: "z-index", label: "Z-index" },
        { id: "typography", label: "Typography" },
      ],
    },
    {
      group: "Semantic",
      items: [
        { id: "bg", label: "Background" },
        { id: "text", label: "Text" },
        { id: "icon", label: "Icon" },
        { id: "border", label: "Border" },
        { id: "button", label: "Button" },
        { id: "link", label: "Link" },
        { id: "field", label: "Field" },
        { id: "focus", label: "Focus" },
        { id: "scrollbar", label: "Scrollbar" },
        { id: "gradient", label: "Gradient" },
        { id: "misc", label: "Misc" },
        { id: "typography-semantic", label: "Typography (mobile)" },
      ],
    },
  ],
  components: [
    {
      group: "Forms and input",
      items: [
        { id: "button", label: "Button" },
        { id: "checkbox", label: "Checkbox" },
        { id: "toggle", label: "Toggle" },
        { id: "text-field", label: "TextField" },
        { id: "text-area", label: "TextArea" },
        { id: "search", label: "Search" },
        { id: "number-stepper", label: "NumberStepper" },
      ],
    },
    {
      group: "Feedback",
      items: [
        { id: "badge", label: "Badge" },
        { id: "noti-badge", label: "NotiBadge" },
        { id: "banner", label: "Banner" },
        { id: "tooltip", label: "Tooltip" },
        { id: "loading", label: "Loading" },
        { id: "overlay", label: "Overlay" },
      ],
    },
    {
      group: "Layout",
      items: [
        { id: "list-card", label: "ListCard" },
        { id: "bottom-sheet", label: "BottomSheet" },
        { id: "page-header", label: "PageHeader" },
        { id: "segmented-control-base", label: "SegmentedControlBase" },
        { id: "tabs-base", label: "TabsBase" },
        { id: "tile", label: "Tile" },
        { id: "file-item-base", label: "FileItemBase" },
        { id: "notification-item", label: "NotificationItem" },
        { id: "list-text", label: "ListText" },
      ],
    },
    {
      group: "Actions",
      items: [
        { id: "chips", label: "Chips" },
        { id: "x-close", label: "XClose" },
        { id: "swipe-actions", label: "SwipeActions" },
        { id: "fab", label: "FAB" },
        { id: "action-required", label: "ActionRequired" },
      ],
    },
    {
      group: "Data display",
      items: [
        { id: "avatar", label: "Avatar" },
        { id: "outstanding-card", label: "OutstandingCard" },
        { id: "invoice-status", label: "InvoiceStatus" },
      ],
    },
  ],
};

function firstItem(tab: Tab): string {
  return NAV[tab][0].items[0].id;
}

export default function App() {
  const [fontsLoaded] = useAppFonts();
  const [tab, setTab] = useState<Tab>("foundation");
  const [item, setItem] = useState<string>(firstItem("foundation"));

  const go = (nextTab: Tab, nextItem?: string) => {
    setTab(nextTab);
    setItem(nextItem ?? firstItem(nextTab));
  };

  if (!fontsLoaded) return null;

  return (
    <IconProvider>
      <View style={styles.shell}>
        <View style={styles.topnav}>
          <Text style={styles.topnavTitle}>Statrys Design System — App</Text>
          {TABS.map((t) => (
            <Pressable key={t.id} onPress={() => go(t.id)} style={styles.topnavTab}>
              <Text style={[styles.topnavTabLabel, tab === t.id && styles.topnavTabLabelActive]}>{t.label}</Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.body}>
          <ScrollView style={styles.sidebar} contentContainerStyle={styles.sidebarContent}>
            {NAV[tab].map((g) => (
              <View key={g.group} style={styles.navGroup}>
                <Text style={styles.navGroupLabel}>{g.group}</Text>
                {g.items.map((navItem) => (
                  <Pressable
                    key={navItem.id}
                    onPress={() => go(tab, navItem.id)}
                    style={[styles.navItem, item === navItem.id && styles.navItemActive]}
                  >
                    <Text style={[styles.navItemLabel, item === navItem.id && styles.navItemLabelActive]}>
                      {navItem.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            ))}
          </ScrollView>
          <ScrollView style={styles.content} contentContainerStyle={styles.contentPadding}>
            {tab === "foundation" && <Foundation item={item} />}
            {tab === "components" && <Components item={item} />}
          </ScrollView>
        </View>
        <StatusBar style="auto" />
      </View>
    </IconProvider>
  );
}

const styles = StyleSheet.create({
  shell: { flex: 1 },
  topnav: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
    gap: 4,
  },
  topnavTitle: { fontWeight: "800", fontSize: 14, marginRight: 16 },
  topnavTab: { height: 56, paddingHorizontal: 12, justifyContent: "center" },
  topnavTabLabel: { fontSize: 14, fontWeight: "600", color: "#666" },
  topnavTabLabelActive: { color: "#da0000" },
  body: { flex: 1, flexDirection: "row" },
  sidebar: { width: 150, borderRightWidth: 1, borderRightColor: "#e5e5e5", backgroundColor: "#faf9f4" },
  sidebarContent: { padding: 12 },
  navGroup: { marginBottom: 8 },
  navGroupLabel: { fontSize: 10, fontWeight: "700", color: "#808080", paddingVertical: 6, textTransform: "uppercase" },
  navItem: { paddingVertical: 8, paddingHorizontal: 6, borderRadius: 4 },
  navItemActive: { backgroundColor: "#fff0ea" },
  navItemLabel: { fontSize: 13 },
  navItemLabelActive: { color: "#da0000", fontWeight: "600" },
  content: { flex: 1 },
  contentPadding: { padding: 20, paddingBottom: 60 },
});
