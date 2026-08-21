import React from "react";
import { Pressable, Text, View } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { ListText } from "../listText/ListText";
import { SwipeActions } from "../swipeActions/SwipeActions";
import { Toggle } from "../toggle/Toggle";
import { styles, chevronColor } from "./ListRow.styles";

export type ListRowTrailing = "none" | "chevron" | "toggle";

export interface ListRowProps {
  label: string;
  /** Second line under the label — also switches the label to medium weight. */
  description?: string;
  /** Full-width line below the row (Figma "showCaption"). */
  caption?: string;
  trailing?: ListRowTrailing;
  /** Value text rendered via ListText, before the chevron (ignored for trailing="toggle"). */
  value?: string;
  /** Second line under `value`, right-aligned (ListText's "+description" layout). */
  valueDescription?: string;
  /** Leading icon before `value` (ListText's "Currency" layout, e.g. a country flag). */
  valueFlag?: React.ReactNode;
  /** Render `value` as a muted placeholder (e.g. an unset "Select issue date"). */
  placeholder?: boolean;
  /** Flag the row as invalid — red value; pairs with `caption` for the inline error message. */
  error?: boolean;
  /** Soft attention state (e.g. a value that must be re-picked) — amber value. */
  warning?: boolean;
  selected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  /** Hides the bottom divider — pass on the last row in a ListCard. */
  last?: boolean;
  onPress?: () => void;
  /** Shows the Figma "onSwipe" revealed state instead of the row's normal trailing content. */
  swiped?: boolean;
  onDelete?: () => void;
  onMore?: () => void;
  showMoreAction?: boolean;
}

// Sits inside ListCard. Layout is inferred from props rather than a
// separate Simple/with-Description axis: no `description` → a single
// regular-weight label; with `description` → a medium-weight label +
// secondary description line.
export function ListRow({
  label,
  description,
  caption,
  trailing = "none",
  value,
  valueDescription,
  valueFlag,
  placeholder = false,
  error = false,
  warning = false,
  selected,
  onSelectedChange,
  last = false,
  onPress,
  swiped = false,
  onDelete,
  onMore,
  showMoreAction = true,
}: ListRowProps) {
  const labelBlock = description ? (
    <View style={styles.labelBlock}>
      <Text style={styles.labelMedium} numberOfLines={1}>
        {label}
      </Text>
      <Text style={styles.description} numberOfLines={1}>
        {description}
      </Text>
    </View>
  ) : (
    <Text style={styles.labelInline} numberOfLines={1}>
      {label}
    </Text>
  );

  const valueNode = value ? (
    <ListText text={value} description={valueDescription} flag={valueFlag} placeholder={placeholder} error={error} warning={warning} />
  ) : null;

  const trailingNode =
    trailing === "toggle" ? (
      <Toggle selected={!!selected} onChange={onSelectedChange} accessibilityLabel={label} />
    ) : (
      (valueNode || trailing === "chevron") && (
        <View style={styles.trailingGroup}>
          {valueNode}
          {trailing === "chevron" && (
            <View style={styles.chevron}>
              <ChevronRight size={20} strokeWidth={1} color={chevronColor} />
            </View>
          )}
        </View>
      )
    );

  const rootStyle = [styles.root, last && styles.noBorder, swiped && styles.swiped];

  if (swiped) {
    // "with Description" layout stacks the peek into a column so the
    // caption can sit full-width below the label/trailing row; "Simple"
    // (no description) keeps the single-line row peek.
    return (
      <View style={rootStyle}>
        <View style={description ? styles.swipePeekStacked : styles.swipePeek}>
          {description ? (
            <>
              <View style={styles.swipePeekRow}>
                {labelBlock}
                {trailing !== "toggle" && trailingNode}
              </View>
              {caption && <Text style={styles.caption}>{caption}</Text>}
            </>
          ) : (
            <>
              {labelBlock}
              {trailing !== "toggle" && trailingNode}
            </>
          )}
        </View>
        <SwipeActions showMore={showMoreAction} onMore={onMore} onDelete={onDelete} />
      </View>
    );
  }

  const body = (
    <>
      <View style={styles.row}>
        {labelBlock}
        {trailingNode}
      </View>
      {caption && <Text style={[styles.caption, error && styles.captionError]}>{caption}</Text>}
    </>
  );

  return onPress ? (
    <Pressable onPress={onPress} style={rootStyle}>
      {body}
    </Pressable>
  ) : (
    <View style={rootStyle}>{body}</View>
  );
}
