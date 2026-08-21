import React from "react";
import { Pressable, View } from "react-native";
import { MoreVertical, Trash2 } from "lucide-react-native";
import { styles, MORE_ICON_COLOR, DELETE_ICON_COLOR } from "./SwipeActions.styles";

export interface SwipeActionsProps {
  onMore?: () => void;
  onDelete?: () => void;
  /** Hide the "more" button — some rows only ever offer delete. */
  showMore?: boolean;
}

// Purely presentational — this renders the revealed buttons only; wiring up
// the actual swipe/drag gesture that reveals them is the caller's job (see
// ListRow's `swiped` prop for how it's composed into a row).
export function SwipeActions({ onMore, onDelete, showMore = true }: SwipeActionsProps) {
  return (
    <View style={styles.root}>
      {showMore && (
        <Pressable accessibilityRole="button" accessibilityLabel="More actions" onPress={onMore} style={styles.more}>
          <MoreVertical size={20} color={MORE_ICON_COLOR} />
        </Pressable>
      )}
      <Pressable accessibilityRole="button" accessibilityLabel="Delete" onPress={onDelete} style={styles.delete}>
        <Trash2 size={20} color={DELETE_ICON_COLOR} />
      </Pressable>
    </View>
  );
}
