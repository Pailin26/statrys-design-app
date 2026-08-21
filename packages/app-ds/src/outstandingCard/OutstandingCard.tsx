import React from "react";
import { Pressable, Text, View } from "react-native";
import { CreditCard, Rocket, ChevronRight } from "lucide-react-native";
import { styles, INVERSE_TEXT_COLOR, LINK_COLOR } from "./OutstandingCard.styles";

export interface OutstandingCardProps {
  /** Card heading, e.g. "Expected this month". */
  label?: string;
  currency?: string;
  /** Preformatted amounts, e.g. "20,000.00". */
  expected: string;
  collected: string;
  outstanding: string;
  /** Collected percentage 0–100 — drives the bar; 100 turns it success green. */
  percent: number;
  /** Rocket line under the bar; omit to hide (Figma hides it at 0%). */
  encouragement?: string;
  /** Bottom-right link, e.g. "2 invoices" / "1 overdue out of 2 invoices". */
  linkLabel?: string;
  onLinkPress?: () => void;
  /** Makes the whole Collected box tappable (app: opens the Paid list). */
  onCollectedPress?: () => void;
  /** Caption after the outstanding amount, e.g. "to collect" (Figma 0% variant). */
  outstandingSuffix?: string;
}

export function OutstandingCard({
  label = "Expected this month",
  currency = "HKD",
  expected,
  collected,
  outstanding,
  percent,
  encouragement,
  linkLabel,
  onLinkPress,
  onCollectedPress,
  outstandingSuffix,
}: OutstandingCardProps) {
  const clamped = Math.max(0, Math.min(100, percent));
  const CollectedBox = onCollectedPress ? Pressable : View;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.headerText}>
          <Text style={styles.label}>{label}</Text>
          <View style={styles.amountRow}>
            <Text style={styles.currency}>{currency}</Text>
            <Text style={styles.expected}>{expected}</Text>
          </View>
        </View>
        <CreditCard size={32} color={INVERSE_TEXT_COLOR} />
      </View>

      <CollectedBox
        {...(onCollectedPress ? { onPress: onCollectedPress, accessibilityRole: "button" as const } : {})}
        style={styles.collectedBox}
      >
        <Text style={styles.boxLabel}>Collected</Text>
        <View style={styles.amountRow}>
          <Text style={styles.currency}>{currency}</Text>
          <Text style={styles.collected}>{collected}</Text>
        </View>
        <View style={styles.barRow}>
          <View style={styles.track}>
            {clamped > 0 && (
              <View style={[clamped === 100 ? styles.fillFull : styles.fill, { width: `${clamped}%` }]} />
            )}
          </View>
          <Text style={styles.percent}>{clamped}%</Text>
        </View>
        {encouragement && (
          <View style={styles.encouragement}>
            <Rocket size={14} strokeWidth={0.67} color={INVERSE_TEXT_COLOR} />
            <Text style={styles.encouragementText}>{encouragement}</Text>
          </View>
        )}
      </CollectedBox>

      <View style={styles.divider} />

      <View style={styles.footer}>
        <View style={styles.outstandingBlock}>
          <Text style={styles.boxLabel}>Outstanding</Text>
          <View style={styles.amountRow}>
            <Text style={styles.currency}>{currency}</Text>
            <Text style={styles.outstanding}>{outstanding}</Text>
            {outstandingSuffix && <Text style={styles.suffix}>{outstandingSuffix}</Text>}
          </View>
        </View>
        {linkLabel && (
          <Pressable accessibilityRole="button" onPress={onLinkPress} style={styles.link}>
            <Text style={styles.linkText}>{linkLabel}</Text>
            <ChevronRight size={16} color={LINK_COLOR} />
          </Pressable>
        )}
      </View>
    </View>
  );
}
