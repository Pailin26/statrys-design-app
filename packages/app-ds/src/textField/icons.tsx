import React from "react";
import Svg, { Path } from "react-native-svg";

// The DS's own thin-stroke chevron — used for the mobile/currency/unit
// selector and the dropdown/date-picker types. Exported so other trailing
// "value + chevron" controls reuse this exact glyph instead of a
// differently-weighted icon library (see accounting ui/TextField's comment).
export function Chevron({ size, color }: { size: 16 | 24; color: string }) {
  return size === 16 ? (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path d="M4 6L8 10L12 6" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  ) : (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M6 9L12 15L18 9" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function CalendarIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path
        d="M6.66667 1.66667V5M13.3333 1.66667V5M2.5 8.33333H17.5M4.16667 3.33333H15.8333C16.7538 3.33333 17.5 4.07953 17.5 5V16.6667C17.5 17.5871 16.7538 18.3333 15.8333 18.3333H4.16667C3.24619 18.3333 2.5 17.5871 2.5 16.6667V5C2.5 4.07953 3.24619 3.33333 4.16667 3.33333Z"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
