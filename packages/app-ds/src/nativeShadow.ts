// Token shadows (semantic/*.json + primitives/effect.json's `type: "shadow"`)
// store a raw CSS `box-shadow` value, unchanged by the tokens build for
// either platform — web applies it directly, native has no such property
// and instead needs shadowColor/shadowOffset/shadowOpacity/shadowRadius
// (iOS) + elevation (Android, a single number with no offset/spread
// concept). This parses the common single-layer `Xpx Ypx BLURpx SPREADpx
// color` shape into those props at render time. Spread has no RN
// equivalent and is dropped; elevation is a rough blur-radius-based stand-in
// since Android has no separate blur/opacity control.
export interface NativeShadow {
  shadowColor: string;
  shadowOpacity: number;
  shadowOffset: { width: number; height: number };
  shadowRadius: number;
  elevation: number;
}

const RGBA_RE = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\)$/;
const LENGTH_RE = /^-?\d+(\.\d+)?px$/;

export function parseCssBoxShadow(css: string): NativeShadow {
  const trimmed = css.trim();
  const parts = trimmed.split(/\s+(?![^(]*\))/); // split on whitespace not inside parens (keeps rgba(...) intact)
  const color = parts.pop();
  if (!color) throw new Error(`parseCssBoxShadow: unrecognized shadow "${css}"`);

  const lengths = parts.filter((p) => LENGTH_RE.test(p)).map((p) => parseFloat(p));
  const [offsetX = 0, offsetY = 0, blur = 0] = lengths;

  const rgbaMatch = RGBA_RE.exec(color);
  const shadowColor = rgbaMatch ? `rgb(${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]})` : color;
  const shadowOpacity = rgbaMatch?.[4] !== undefined ? Number(rgbaMatch[4]) : 1;

  return {
    shadowColor,
    shadowOpacity,
    shadowOffset: { width: offsetX, height: offsetY },
    shadowRadius: blur,
    elevation: Math.max(1, Math.round(blur / 2)),
  };
}
