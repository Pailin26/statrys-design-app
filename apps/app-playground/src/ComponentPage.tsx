import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { HorizontalTabs } from "@statrys/app-ds";

// Mirrors apps/web-playground/src/ComponentPage.tsx's shell and content
// shape (same tab order, same whatItIs/whenToUse/useInstead/goodToKnow
// split) so both playgrounds document components the same way. Built from
// app-ds's own HorizontalTabs rather than a hand-rolled tab row — same
// "dogfood the DS" reasoning as the web shell using its own Radio.
const SECTIONS = ["Examples", "Usage", "Code", "Changelog"] as const;
type Section = (typeof SECTIONS)[number];

export type UseInstead = { label: string; because: string };

export type ComponentPageProps = {
  title: string;
  /** One plain-language sentence: what this component is, no jargon. */
  whatItIs: string;
  /** Plain-language scenarios where this is the right choice — short, concrete, no prop names. */
  whenToUse: string[];
  /** "Reach for X instead when..." — the other component + the plain-language reason. */
  useInstead?: UseInstead[];
  /** Extra tips worth knowing, still in plain language — accessibility notes, common mistakes, etc. */
  goodToKnow?: string[];
  code: string;
  children: React.ReactNode;
};

function UsageHeading({ children }: { children: string }) {
  return <Text style={styles.usageHeading}>{children}</Text>;
}

function UsageList({ items }: { items: string[] }) {
  return (
    <View style={styles.usageList}>
      {items.map((item, i) => (
        <View key={i} style={styles.usageRow}>
          <Text style={styles.usageBullet}>{"•"}</Text>
          <Text style={styles.usageText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

export function ComponentPage({ title, whatItIs, whenToUse, useInstead, goodToKnow, code, children }: ComponentPageProps) {
  const [section, setSection] = useState<Section>("Examples");

  return (
    <View style={styles.page}>
      <Text style={styles.title}>{title}</Text>
      <HorizontalTabs
        tabs={[...SECTIONS]}
        activeIndex={SECTIONS.indexOf(section)}
        onChange={(i: number) => setSection(SECTIONS[i])}
        variant="underline"
      />

      {section === "Examples" && <View style={styles.examples}>{children}</View>}

      {section === "Usage" && (
        <View style={styles.usage}>
          <Text style={styles.whatItIs}>{whatItIs}</Text>

          <View style={styles.usageSection}>
            <UsageHeading>When to use it</UsageHeading>
            <UsageList items={whenToUse} />
          </View>

          {useInstead && useInstead.length > 0 && (
            <View style={styles.usageSection}>
              <UsageHeading>Use something else when...</UsageHeading>
              <UsageList items={useInstead.map((item) => `Reach for ${item.label} instead — ${item.because}`)} />
            </View>
          )}

          {goodToKnow && goodToKnow.length > 0 && (
            <View style={styles.usageSection}>
              <UsageHeading>Good to know</UsageHeading>
              <UsageList items={goodToKnow} />
            </View>
          )}
        </View>
      )}

      {section === "Code" && (
        <ScrollView horizontal>
          <Text style={styles.code}>{code}</Text>
        </ScrollView>
      )}

      {section === "Changelog" && (
        <Text style={styles.note}>No commit history tracking is wired up for this playground yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: { gap: 16 },
  title: { fontSize: 20, fontWeight: "700" },
  examples: { gap: 16 },
  usage: { gap: 28, maxWidth: 560 },
  usageSection: { gap: 8 },
  whatItIs: { fontSize: 16, fontWeight: "500", color: "#1b1b1b", lineHeight: 22 },
  usageHeading: { fontSize: 15, fontWeight: "700", color: "#1b1b1b" },
  usageList: { gap: 6 },
  usageRow: { flexDirection: "row", gap: 6, alignItems: "flex-start" },
  usageBullet: { color: "#666", fontSize: 14, lineHeight: 20 },
  usageText: { flex: 1, fontSize: 14, color: "#666", lineHeight: 20 },
  code: { fontFamily: "monospace", fontSize: 12, color: "#1b1b1b", backgroundColor: "#f5f4f1", padding: 12, borderRadius: 8 },
  note: { fontSize: 14, color: "#666" },
});
