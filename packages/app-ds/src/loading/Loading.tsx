import React, { useEffect, useRef, useState } from "react";
import { AccessibilityInfo, Animated, Easing, View } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from "react-native-svg";
import { styles, SIZES, LOGO_COLOR, TRACK_COLOR, GRADIENT_START, GRADIENT_MID, GRADIENT_END } from "./Loading.styles";
import type { LoadingSize } from "./Loading.styles";

export type { LoadingSize };

export interface LoadingProps {
  size?: LoadingSize;
  accessibilityLabel?: string;
}

// Statrys "S" mark (Figma StatrysLogo, node 537-2699) — same path data as
// accounting ui/Loading's StatrysMark, ported from <path fill/stroke
// "currentColor"> to explicit color props (no currentColor concept in
// react-native-svg).
function StatrysMark({ height }: { height: number }) {
  const width = height * (30.4896 / 43.3753);
  return (
    <Svg width={width} height={height} viewBox="0 0 30.4896 43.3753" fill="none">
      <Path
        d="M19.4316 12.0674L9.12695 15.709L9.0332 15.7422L9.01172 15.8389L7.11133 24.4277H7.11035L7.10938 24.4385L7.1084 24.4443L7.08203 24.6094L7.24512 24.6455L10.1162 25.2822L10.5771 25.3838L11.7646 25.6465L10.6582 30.6533L10.5967 30.9307L0.901367 31.3145L0.859375 30.2314L0.180664 13.0977L18.9658 0.327148L19.4316 12.0674Z"
        fill={LOGO_COLOR}
        stroke={LOGO_COLOR}
        strokeWidth="0.35637"
      />
      <Path
        d="M30.3033 30.1591L30.2867 30.1601L30.2906 30.2802L11.5025 43.0468L11.0376 31.2822L11.0728 31.2705L21.1031 27.7236L21.2349 27.7529L21.273 27.579L23.1763 18.9873L23.2144 18.8134L23.0406 18.7753L20.2593 18.1591L19.9 18.079L18.5054 17.7705L19.6968 12.4003L29.5845 12.0078L30.3033 30.1591Z"
        fill={LOGO_COLOR}
        stroke={LOGO_COLOR}
        strokeWidth="0.35637"
      />
    </Svg>
  );
}

// Web's ring spins via a CSS @keyframes animation on a static SVG, disabled
// under prefers-reduced-motion; ported to RN's Animated (already used by
// Overlay for the same "no new dependency" reason) with the same
// AccessibilityInfo-driven reduced-motion opt-out.
export function Loading({ size = "lg", accessibilityLabel = "Loading" }: LoadingProps) {
  const { box, r, stroke, logo } = SIZES[size];
  const rotation = useRef(new Animated.Value(0)).current;
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled?.().then(setReduceMotion);
    const sub = AccessibilityInfo.addEventListener?.("reduceMotionChanged", setReduceMotion);
    return () => sub?.remove();
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const loop = Animated.loop(
      Animated.timing(rotation, { toValue: 1, duration: 1000, easing: Easing.linear, useNativeDriver: true })
    );
    loop.start();
    return () => loop.stop();
  }, [reduceMotion, rotation]);

  const c = box / 2;
  const circumference = 2 * Math.PI * r;
  const spin = rotation.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });

  return (
    <View style={[styles.root, { width: box, height: box }]} accessibilityRole="progressbar" accessibilityLabel={accessibilityLabel}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Svg width={box} height={box} viewBox={`0 0 ${box} ${box}`} fill="none">
          <Circle cx={c} cy={c} r={r} stroke={TRACK_COLOR} strokeOpacity={0.2} strokeWidth={stroke} />
          {/* quarter arc, 12 → 3 o'clock (dash offset starts at 3 o'clock, so rotate -90) */}
          <Circle
            cx={c}
            cy={c}
            r={r}
            stroke="url(#loadingArcGradient)"
            strokeWidth={stroke}
            strokeDasharray={`${circumference / 4} ${circumference}`}
            transform={`rotate(-90 ${c} ${c})`}
          />
          <Defs>
            <LinearGradient
              id="loadingArcGradient"
              x1={-0.0548 * box}
              y1={1.2498 * box}
              x2={1.5516 * box}
              y2={-0.5186 * box}
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0" stopColor={GRADIENT_START} />
              <Stop offset="0.350962" stopColor={GRADIENT_MID} />
              <Stop offset="1" stopColor={GRADIENT_END} />
            </LinearGradient>
          </Defs>
        </Svg>
      </Animated.View>
      {logo && (
        <View style={styles.logo}>
          <StatrysMark height={box * 0.374} />
        </View>
      )}
    </View>
  );
}
