import React from "react";
import { Text, View } from "react-native";
import type { BadgeColor } from "../badge/Badge";
import { styles, labelColor } from "./InvoiceStatus.styles";

export interface InvoiceStatusProps {
  label: string;
  color?: BadgeColor;
  /** Usually a date, e.g. "12 Jun 2026" or "Due 30 Jun 2026" — hidden when omitted. */
  caption?: string;
}

// Figma models `status` as a fixed enum with a baked-in color/label/caption
// per value; this app's real usage needs more labels than that, so this
// takes a free `label` + `color` (the shared Badge palette) instead, same
// convention as ui/InvoiceRow's status props.
export function InvoiceStatus({ label, color = "success", caption }: InvoiceStatusProps) {
  return (
    <View style={styles.row}>
      <Text style={[styles.label, { color: labelColor(color) }]}>{label}</Text>
      {caption && (
        <Text style={styles.caption} numberOfLines={1}>
          {caption}
        </Text>
      )}
    </View>
  );
}
