import React from "react";
import { Image, Text, View, ViewStyle } from "react-native";
import { styles, SIZES, SQUARE_BG, INITIALS_COLOR } from "./Avatar.styles";
import type { AvatarSize } from "./Avatar.styles";

export type { AvatarSize };
export type AvatarStyle = "square" | "photo";

export interface AvatarProps {
  size?: AvatarSize;
  style?: AvatarStyle;
  /** style="square" only — the initials shown, e.g. "OR". */
  initials?: string;
  /** style="photo" only — the image source. */
  src?: string;
  /** Background tint (style="square" only) — defaults to Bg/Beige/primary. */
  color?: string;
  /** Initials text color (style="square" only) — defaults to Text/text-primary. */
  textColor?: string;
  containerStyle?: ViewStyle;
}

export function Avatar({ size = "md", style = "square", initials, src, color, textColor, containerStyle }: AvatarProps) {
  const { box, radius, fontSize, letterSpacing } = SIZES[size];
  const isPhoto = style === "photo";

  return (
    <View
      style={[
        styles.root,
        { width: box, height: box, borderRadius: isPhoto ? box / 2 : radius },
        !isPhoto && { backgroundColor: color ?? SQUARE_BG },
        containerStyle,
      ]}
    >
      {isPhoto ? (
        <Image style={styles.image} source={{ uri: src }} />
      ) : (
        <Text style={[styles.initials, { fontSize, letterSpacing, lineHeight: fontSize, color: textColor ?? INITIALS_COLOR }]}>
          {initials}
        </Text>
      )}
    </View>
  );
}
