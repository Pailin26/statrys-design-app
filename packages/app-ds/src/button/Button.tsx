import React from "react";
import { Pressable, Text, View, PressableProps } from "react-native";
import { styles, containerColors, labelColors } from "./Button.styles";

type ButtonBaseProps = {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  onPress?: PressableProps["onPress"];
};

type ButtonRecProps = ButtonBaseProps & {
  /** Figma Shape=Rec (default) or Rounded — a labeled button. */
  shape?: "rec" | "rounded";
  children: string;
};

type ButtonIconProps = ButtonBaseProps & {
  /** Figma Shape=Square or Circle — an icon-only button, no label. */
  shape: "square" | "circle";
  icon: React.ReactNode;
  accessibilityLabel: string;
};

export type ButtonProps = ButtonRecProps | ButtonIconProps;

const CONTAINER_SIZE = { sm: styles.containerSm, md: styles.containerMd, lg: styles.containerLg };
const TEXT_SIZE = { sm: styles.textSm, md: styles.textMd, lg: styles.textLg };
const SQUARE_SIZE = { sm: styles.squareSm, md: styles.squareMd, lg: styles.squareLg };
const CIRCLE_SIZE = { sm: styles.circleSm, md: styles.circleMd, lg: styles.circleLg };

function isIconShape(props: ButtonProps): props is ButtonIconProps {
  return props.shape === "square" || props.shape === "circle";
}

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", disabled = false, onPress } = props;
  const shape = props.shape ?? "rec";
  const container = containerColors[variant];
  const label = labelColors[variant];

  const shapeStyle =
    shape === "rounded" ? styles.rounded
    : shape === "square" ? [styles.square, SQUARE_SIZE[size]]
    : shape === "circle" ? [styles.circle, CIRCLE_SIZE[size]]
    : null;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        isIconShape(props) ? null : CONTAINER_SIZE[size],
        shapeStyle,
        container.base,
        pressed && !disabled && "pressed" in container ? container.pressed : null,
        disabled ? container.disabled : null,
      ]}
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={isIconShape(props) ? props.accessibilityLabel : undefined}
    >
      {({ pressed }) =>
        isIconShape(props) ? (
          <View>{props.icon}</View>
        ) : (
          <Text
            style={[
              styles.label,
              TEXT_SIZE[size],
              { color: label.base },
              pressed && !disabled && "pressed" in label ? { color: label.pressed } : null,
              disabled && "disabled" in label ? { color: label.disabled } : null,
            ]}
          >
            {props.children}
          </Text>
        )
      }
    </Pressable>
  );
}
