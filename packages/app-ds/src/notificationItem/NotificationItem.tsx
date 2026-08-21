import React from "react";
import { Text, View } from "react-native";
import { Clock } from "lucide-react-native";
import { Button } from "../button/Button";
import { styles, timeIconColor } from "./NotificationItem.styles";

export interface NotificationItemProps {
  title: string;
  text: string;
  time: string;
  amount?: string;
  showAmount?: boolean;
  showAction?: boolean;
  actionLabel?: string;
  onAction?: () => void;
  read?: boolean;
  /** Removes the hairline divider (for the final row in a list). */
  lastItem?: boolean;
}

// A single row in a notification list: unread dot, title, description, a
// small clock + relative time, an optional amount (always success-green),
// and an optional CTA button. Unread rows bold the title/amount and show
// the brand-orange dot; read rows drop both.
export function NotificationItem({
  title,
  text,
  time,
  amount,
  showAmount = true,
  showAction = true,
  actionLabel,
  onAction,
  read = false,
  lastItem = false,
}: NotificationItemProps) {
  return (
    <View style={[styles.item, !lastItem && styles.itemBorder]}>
      <View style={styles.row}>
        <View style={styles.iconCol}>{!read && <View style={styles.dot} />}</View>
        <View style={styles.textCol}>
          <View style={styles.headRow}>
            <View style={styles.titleStack}>
              <Text style={read ? styles.title : styles.titleBold} numberOfLines={2}>
                {title}
              </Text>
              <Text style={styles.text}>{text}</Text>
              <View style={styles.timeRow}>
                <Clock size={12} strokeWidth={1} color={timeIconColor} />
                <Text style={styles.time} numberOfLines={1}>
                  {time}
                </Text>
              </View>
            </View>
            {showAmount && amount && (
              <View style={styles.amountCol}>
                <Text style={read ? styles.amount : styles.amountBold}>{amount}</Text>
              </View>
            )}
          </View>
          {showAction && actionLabel && <Button variant="primary" size="sm" onPress={onAction}>{actionLabel}</Button>}
        </View>
      </View>
    </View>
  );
}
