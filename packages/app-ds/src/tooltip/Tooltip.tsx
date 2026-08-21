import React from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import Svg, { Path } from "react-native-svg";
import { styles, bubbleColors } from "./Tooltip.styles";

export type TooltipArrow = "none" | "top" | "bottom" | "bottom-left" | "bottom-right" | "left" | "right";

export interface TooltipProps {
  title: string;
  /** Supporting text under the title — enables the wide two-line layout. */
  description?: string;
  /** Dark bubble for light surfaces (default beige bubble is for dark surfaces). */
  inverse?: boolean;
  /** Which side the arrow sits on / points toward. */
  arrow?: TooltipArrow;
}

// Rounded 16×8.5 triangle from Figma, drawn pointing down; rotated per direction.
const ARROW_PATH =
  "M14.0711 0C14.962 0 15.4081 1.07714 14.7782 1.70711L8.70711 7.77818C8.31658 8.16871 7.68342 8.16871 7.29289 7.77818L1.22183 1.70711C0.591867 1.07714 1.03803 0 1.92894 0H14.0711Z";

function Arrow({ dir, fill, style }: { dir: "up" | "down" | "left" | "right"; fill: string; style?: StyleProp<ViewStyle> }) {
  const sideways = dir === "left" || dir === "right";
  const transform =
    dir === "up"
      ? "rotate(180 8 4.2574)"
      : dir === "left"
        ? "translate(8.5147 0) rotate(90)"
        : dir === "right"
          ? "translate(0 16) rotate(-90)"
          : undefined;
  return (
    <View style={style}>
      <Svg width={sideways ? 8.5147 : 16} height={sideways ? 16 : 8.5147} viewBox={sideways ? "0 0 8.5147 16" : "0 0 16 8.5147"} fill="none">
        <Path d={ARROW_PATH} fill={fill} transform={transform} />
      </Svg>
    </View>
  );
}

// Static display component — the bubble + arrow only; positioning next to
// the target element is the caller's job. Web's `filter: shadow.tooltip` is
// a 2-layer drop-shadow; RN's shadow* props support only one layer, so this
// approximates with just the larger of the two (documented in Tooltip.styles.ts).
export function Tooltip({ title, description, inverse = false, arrow = "none" }: TooltipProps) {
  const colors = bubbleColors(inverse);
  const arrowBefore = arrow === "top" || arrow === "left";
  const arrowDir = arrow === "top" ? "up" : arrow === "left" ? "left" : arrow === "right" ? "right" : "down";
  const sideways = arrow === "left" || arrow === "right";

  const arrowMarginStyle = [
    arrow === "top" && styles.arrowMarginTop,
    (arrow === "bottom" || arrow === "bottom-left" || arrow === "bottom-right") && styles.arrowMarginBottom,
    arrow === "left" && styles.arrowMarginLeft,
    arrow === "right" && styles.arrowMarginRight,
    arrow === "bottom-left" && styles.arrowOffsetLeft,
    arrow === "bottom-right" && styles.arrowOffsetRight,
  ];

  return (
    <View style={[styles.root, sideways && styles.rootRow, arrow === "bottom-left" && styles.alignStart, arrow === "bottom-right" && styles.alignEnd]}>
      {arrowBefore && <Arrow dir={arrowDir} fill={colors.bg} style={arrowMarginStyle} />}
      <View style={[styles.bubble, { backgroundColor: colors.bg }, description ? styles.bubbleWithDescription : null]}>
        <Text style={[styles.title, { color: colors.title }]}>{title}</Text>
        {description && <Text style={[styles.description, { color: colors.text }]}>{description}</Text>}
      </View>
      {!arrowBefore && arrow !== "none" && <Arrow dir={arrowDir} fill={colors.bg} style={arrowMarginStyle} />}
    </View>
  );
}
