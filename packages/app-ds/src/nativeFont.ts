// Unlike CSS, React Native can't select a font weight *within* one
// registered family — each weight must be its own registered name (the
// standard Expo pattern: register "GTWalsheimLC-Medium" as its own family,
// not "GT Walsheim LC" + fontWeight: 500). This maps {bare CSS family,
// numeric weight} -> the alias a consuming app must register via
// expo-font (see apps/app-playground/src/fonts.ts for the actual
// require()'d font files). Hardcoded rather than sourced from
// @statrys/tokens since it's an RN asset-loading detail, not a design
// decision — extend this map if a second custom font is ever added.
const NATIVE_WEIGHT_ALIASES: Record<string, Record<number, string>> = {
  "GT Walsheim LC": {
    400: "GTWalsheimLC-Regular",
    500: "GTWalsheimLC-Medium",
    700: "GTWalsheimLC-Bold",
    800: "GTWalsheimLC-Black",
  },
};

export function nativeFontFamily(family: string, weight: number): string {
  return NATIVE_WEIGHT_ALIASES[family]?.[weight] ?? family;
}
