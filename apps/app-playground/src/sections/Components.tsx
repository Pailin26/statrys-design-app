import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ArrowUpRight } from "lucide-react-native";
import { Button } from "@statrys/app-ds";

const VARIANTS = ["primary", "secondary", "tertiary"] as const;
const SHAPES = ["square", "circle"] as const;
const SIZES = ["sm", "md", "lg"] as const;
const ICON_SIZE = { sm: 16, md: 20, lg: 24 };

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

      <Text style={styles.subtitle}>Shape=Square / Circle (icon-only)</Text>
      <Text style={styles.note}>
        icon is a consumer-supplied ReactNode — no re-export layer in @statrys/app-ds. Here it's Lucide's
        ArrowUpRight, matching Figma's own icon.
      </Text>
      {SHAPES.map((shape) => (
        <View key={shape}>
          <Text style={styles.subtitle2}>{shape}</Text>
          {VARIANTS.map((variant) => (
            <View key={variant} style={styles.row}>
              {SIZES.map((size) => (
                <Button
                  key={size}
                  variant={variant}
                  size={size}
                  shape={shape}
                  icon={<ArrowUpRight size={ICON_SIZE[size]} />}
                  accessibilityLabel={`${variant} ${shape} ${size}`}
                />
              ))}
              <Button
                variant={variant}
                shape={shape}
                icon={<ArrowUpRight size={20} />}
                accessibilityLabel={`${variant} ${shape} disabled`}
                disabled
              />
            </View>
          ))}
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
  subtitle: { fontSize: 16, fontWeight: "700", marginTop: 8 },
  subtitle2: { fontSize: 14, fontWeight: "600", textTransform: "capitalize", marginTop: 4 },
  note: { fontSize: 13, color: "#666", maxWidth: 560 },
  row: { flexDirection: "row", gap: 8, alignItems: "center", marginBottom: 8, flexWrap: "wrap" },
});
