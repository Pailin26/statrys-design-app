import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "@statrys/app-ds";

const VARIANTS = ["primary", "secondary", "tertiary"] as const;
const SIZES = ["sm", "md", "lg"] as const;

function ButtonDemo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Button</Text>
      {VARIANTS.map((variant) => (
        <View key={variant} style={styles.row}>
          {SIZES.map((size) => (
            <Button key={size} variant={variant} size={size}>
              {`${variant} / ${size}`}
            </Button>
          ))}
          <Button variant={variant} disabled>
            disabled
          </Button>
        </View>
      ))}
    </View>
  );
}

// `item` selects which component demo to show — only "button" exists today,
// but the nav (App.tsx's NAV.components) is already structured to grow.
export function Components({ item }: { item: string }) {
  if (item === "button") return <ButtonDemo />;
  return <Text>Unknown component: {item}</Text>;
}

const styles = StyleSheet.create({
  container: { gap: 16 },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 8 },
  row: { flexDirection: "row", gap: 8, alignItems: "center", marginBottom: 8, flexWrap: "wrap" },
});
