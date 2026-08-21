import React from "react";
import { Text, View } from "react-native";
import { Button } from "../button/Button";
import { styles } from "./ActionRequired.styles";

export interface ActionRequiredProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

// Stack it (see NeedAttentionStack, not part of this DS package) for a dashboard preview.
export function ActionRequired({ title, description, actionLabel = "Proceed", onAction }: ActionRequiredProps) {
  return (
    <View style={styles.card}>
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {description && (
          <Text style={styles.description} numberOfLines={1}>
            {description}
          </Text>
        )}
      </View>
      <Button variant="secondary" size="sm" onPress={onAction}>
        {actionLabel}
      </Button>
    </View>
  );
}
