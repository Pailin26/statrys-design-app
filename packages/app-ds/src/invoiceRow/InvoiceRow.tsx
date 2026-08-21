import React from "react";
import { Pressable, Text, View } from "react-native";
import { FileText } from "lucide-react-native";
import type { BadgeColor } from "../badge/Badge";
import { InvoiceStatus } from "../invoiceStatus/InvoiceStatus";
import { styles, fileIconColor } from "./InvoiceRow.styles";

export interface InvoiceRowProps {
  title: string;
  /** Hidden when omitted (Figma showInvoiceNo). */
  invoiceNo?: string;
  /** Status label, e.g. "Paid" — colored via the Badge palette (InvoiceStatus). */
  status?: string;
  statusColor?: BadgeColor;
  /** Plain text after the status label, e.g. "12 Jun 2026" (bare date, no "on"). */
  statusCaption?: string;
  /** Arbitrary node rendered right after the title — title still truncates, this doesn't. */
  titleBadge?: React.ReactNode;
  /** Preformatted, e.g. "USD 6,430.05". */
  amount: string;
  /** Preformatted credited total — shows the credited strip when set. */
  creditedAmount?: string;
  /** Leading label on the credited strip; e.g. "Refund amount". Pass an empty string to show
   *  `creditedAmount` alone with no "label:" prefix (e.g. a credit-note number). */
  creditedLabel?: string;
  onCreditedPress?: () => void;
  /** Last row of the list — no bottom divider. */
  lastItem?: boolean;
  onPress?: () => void;
}

// Title + invoice number, the amount, and an optional "Credited amount"
// strip. Web animates titleBadge's mount/unmount (fade+scale); ported as a
// plain conditional render, same call as Tile's titleBadge.
export function InvoiceRow({
  title,
  invoiceNo,
  status,
  statusColor = "success",
  statusCaption,
  titleBadge,
  amount,
  creditedAmount,
  creditedLabel = "Credited amount",
  onCreditedPress,
  lastItem = false,
  onPress,
}: InvoiceRowProps) {
  const credited = creditedAmount && (
    <>
      <FileText size={16} color={fileIconColor} />
      {/* "<label>: <value>" normally; when creditedLabel is empty the strip
          shows the value alone (e.g. a credit-note number). No trailing
          chevron here even when tappable — the strip hugs its content. */}
      <Text style={styles.creditedText} numberOfLines={1}>
        {creditedLabel ? `${creditedLabel}: ${creditedAmount}` : creditedAmount}
      </Text>
    </>
  );

  const Root = onPress ? Pressable : View;

  return (
    <Root style={[styles.row, !lastItem && styles.rowBorder]} {...(onPress ? { onPress } : {})}>
      <View style={styles.topGroup}>
        {status && <InvoiceStatus label={status} color={statusColor} caption={statusCaption} />}
        <View style={styles.main}>
          <View style={styles.info}>
            {titleBadge ? (
              <View style={styles.titleRow}>
                <Text style={styles.title} numberOfLines={1}>
                  {title}
                </Text>
                {titleBadge}
              </View>
            ) : (
              <Text style={styles.title} numberOfLines={1}>
                {title}
              </Text>
            )}
            {invoiceNo && (
              <Text style={styles.invoiceNo} numberOfLines={1}>
                {invoiceNo}
              </Text>
            )}
          </View>
          <View style={styles.amountCol}>
            <Text style={styles.amount}>{amount}</Text>
          </View>
        </View>
      </View>
      {creditedAmount &&
        (onCreditedPress ? (
          <Pressable onPress={onCreditedPress} style={styles.credited}>
            {credited}
          </Pressable>
        ) : (
          <View style={styles.credited}>{credited}</View>
        ))}
    </Root>
  );
}
