// TODO: this reads packages/tokens/{primitives,semantic} source JSON directly
// since the build pipeline (tokens.css / tokens.js) isn't wired up yet — swap
// to importing the built output once packages/tokens/dist exists for real.
//
// This is the React Native counterpart of apps/web-playground's
// sections/Foundation.tsx — same data, same token-resolution logic, but
// rendered with View/Text instead of div/CSS since RN has no DOM. Kept as a
// separate file (some duplication) rather than a shared package, since it's
// small glue code and the two apps render fundamentally differently.
import React from "react";
import { Platform, Text, View } from "react-native";
import neutralTokens from "../../../../packages/tokens/primitives/color/neutral.json";
import brandTokens from "../../../../packages/tokens/primitives/color/brand.json";
import statusTokens from "../../../../packages/tokens/primitives/color/status.json";
import alphaBlack from "../../../../packages/tokens/primitives/color/alpha/alpha-black.json";
import alphaBrand from "../../../../packages/tokens/primitives/color/alpha/alpha-brand.json";
import alphaWhite from "../../../../packages/tokens/primitives/color/alpha/alpha-white.json";
import spacingTokens from "../../../../packages/tokens/primitives/spacing.json";
import radiusTokens from "../../../../packages/tokens/primitives/radius.json";
import effectTokens from "../../../../packages/tokens/primitives/effect.json";
import motionTokens from "../../../../packages/tokens/primitives/motion.json";
import zIndexTokens from "../../../../packages/tokens/primitives/z-index.json";
import typographyTokens from "../../../../packages/tokens/primitives/typography.json";
import bgTokens from "../../../../packages/tokens/semantic/bg.json";
import typographySemanticTokens from "../../../../packages/tokens/semantic/typography.json";
import textTokens from "../../../../packages/tokens/semantic/text.json";
import iconTokens from "../../../../packages/tokens/semantic/icon.json";
import borderTokens from "../../../../packages/tokens/semantic/border.json";
import buttonTokens from "../../../../packages/tokens/semantic/button.json";
import linkTokens from "../../../../packages/tokens/semantic/link.json";
import fieldTokens from "../../../../packages/tokens/semantic/field.json";
import focusTokens from "../../../../packages/tokens/semantic/focus.json";
import scrollbarTokens from "../../../../packages/tokens/semantic/scrollbar.json";
import gradientTokens from "../../../../packages/tokens/semantic/gradient.json";
import miscTokens from "../../../../packages/tokens/semantic/misc.json";

type TokenLeaf = { value: string | number; type: string; comment?: string };
type TokenTree = { [key: string]: TokenTree | TokenLeaf };

function isLeaf(node: unknown): node is TokenLeaf {
  return !!node && typeof node === "object" && "value" in (node as object) && "type" in (node as object);
}

function flatten(tree: TokenTree, prefix: string[], out: Record<string, TokenLeaf>) {
  for (const [key, node] of Object.entries(tree)) {
    if (isLeaf(node)) out[[...prefix, key].join(".")] = node;
    else flatten(node as TokenTree, [...prefix, key], out);
  }
  return out;
}

const PRIMITIVES: Record<string, TokenLeaf> = {};
flatten(neutralTokens as unknown as TokenTree, [], PRIMITIVES);
flatten(brandTokens as unknown as TokenTree, [], PRIMITIVES);
flatten(statusTokens as unknown as TokenTree, [], PRIMITIVES);
flatten({ alpha: { black: alphaBlack.alpha.black, brand: alphaBrand.alpha.brand, white: alphaWhite.alpha.white } } as unknown as TokenTree, [], PRIMITIVES);
flatten(typographyTokens as unknown as TokenTree, [], PRIMITIVES);

const SEMANTICS: Record<string, TokenLeaf> = {};
flatten(bgTokens as unknown as TokenTree, [], SEMANTICS);
flatten(textTokens as unknown as TokenTree, [], SEMANTICS);
flatten(iconTokens as unknown as TokenTree, [], SEMANTICS);
flatten(borderTokens as unknown as TokenTree, [], SEMANTICS);
flatten(buttonTokens as unknown as TokenTree, [], SEMANTICS);
flatten(linkTokens as unknown as TokenTree, [], SEMANTICS);
flatten(fieldTokens as unknown as TokenTree, [], SEMANTICS);
flatten(focusTokens as unknown as TokenTree, [], SEMANTICS);
flatten(scrollbarTokens as unknown as TokenTree, [], SEMANTICS);
flatten(gradientTokens as unknown as TokenTree, [], SEMANTICS);
flatten(miscTokens as unknown as TokenTree, [], SEMANTICS);
flatten(typographySemanticTokens as unknown as TokenTree, [], SEMANTICS);

function resolve(value: string | number): string {
  if (typeof value !== "string") return String(value);
  const ref = /^\{(.+)\}$/.exec(value);
  if (!ref) return value;
  const hit = PRIMITIVES[ref[1]] ?? SEMANTICS[ref[1]];
  return hit ? resolve(hit.value) : value;
}

// RN's fontFamily has no fallback-list concept — take just the first,
// unquoted name from a CSS font stack (mirrors build/build.js's
// fontFamily/native transform, which only applies to the *built* tokens.js,
// not this raw-JSON read).
function nativeFontFamily(css: string): string {
  return css.split(",")[0].trim().replace(/^["']|["']$/g, "");
}

const MONOSPACE = Platform.select({ ios: "Courier", android: "monospace", default: "monospace" });

// Best-effort parse of our shadow strings ("0 4px 4px 0 rgba(0,0,0,0.06)")
// into RN shadow props. The one filter-based "tooltip" drop-shadow doesn't
// match this shape and falls back to a text-only row (see Leaf below).
function parseBoxShadow(css: string) {
  const colorMatch = css.match(/rgba?\([^)]+\)/);
  const color = colorMatch ? colorMatch[0] : "#000";
  const rest = css.replace(color, "").trim();
  const [x, y, blur] = rest.split(/\s+/).map((p) => parseFloat(p) || 0);
  return { shadowColor: color, shadowOffset: { width: x ?? 0, height: y ?? 0 }, shadowOpacity: 1, shadowRadius: (blur ?? 0) / 2 };
}

function firstColor(css: string): string {
  const m = css.match(/#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)/);
  return m ? m[0] : "#ccc";
}

function Label({ path, token, resolved }: { path: string; token: TokenLeaf; resolved: string }) {
  return (
    <View>
      <Text style={{ fontWeight: "600", fontFamily: MONOSPACE, fontSize: 13 }}>{path}</Text>
      <Text style={{ fontFamily: MONOSPACE, fontSize: 12, color: "#666" }}>
        {String(token.value) === resolved ? String(token.value) : `${token.value} -> ${resolved}`}
      </Text>
      {token.comment ? <Text style={{ fontSize: 11, color: "#999" }}>{token.comment}</Text> : null}
    </View>
  );
}

function Leaf({ path, token }: { path: string; token: TokenLeaf }) {
  const resolved = resolve(token.value);

  if (token.type === "color") {
    return (
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <View style={{ width: 40, height: 40, borderRadius: 6, borderWidth: 1, borderColor: "#e5e5e5", backgroundColor: resolved }} />
        <Label path={path} token={token} resolved={resolved} />
      </View>
    );
  }
  if (token.type === "gradient") {
    // No built-in RN gradient primitive — approximate with the first color stop.
    return (
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <View style={{ width: 96, height: 40, borderRadius: 6, borderWidth: 1, borderColor: "#e5e5e5", backgroundColor: firstColor(resolved) }} />
        <Label path={path} token={token} resolved={resolved} />
      </View>
    );
  }
  if (token.type === "shadow" && !resolved.startsWith("drop-shadow")) {
    return (
      <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
        <View style={{ width: 60, height: 40, borderRadius: 6, backgroundColor: "#fff", ...parseBoxShadow(resolved) }} />
        <Label path={path} token={token} resolved={resolved} />
      </View>
    );
  }
  if (token.type === "dimension") {
    const px = parseFloat(resolved) || 0;
    return (
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <View style={{ width: Math.min(px, 200), height: 12, backgroundColor: "#ff4a15", borderRadius: 2 }} />
        <Label path={path} token={token} resolved={resolved} />
      </View>
    );
  }
  if (token.type === "fontFamily") {
    return (
      <View>
        <Text style={{ fontFamily: nativeFontFamily(resolved), fontSize: 22 }}>The quick brown fox — Ag</Text>
        <Label path={path} token={token} resolved={resolved} />
      </View>
    );
  }
  if (token.type === "fontWeight") {
    return (
      <View>
        <Text style={{ fontFamily: nativeFontFamily(resolve("{font.primary}")), fontWeight: String(resolved) as "400", fontSize: 22 }}>
          The quick brown fox
        </Text>
        <Label path={path} token={token} resolved={resolved} />
      </View>
    );
  }
  if (token.type === "fontSize") {
    const size = parseFloat(resolved) || 16;
    return (
      <View>
        <Text style={{ fontFamily: nativeFontFamily(resolve("{font.primary}")), fontSize: size, lineHeight: size * 1.2 }}>
          Ag Statrys
        </Text>
        <Label path={path} token={token} resolved={resolved} />
      </View>
    );
  }
  return <Label path={path} token={token} resolved={resolved} />;
}

function TokenNodes({ prefix, tree }: { prefix: string; tree: TokenTree }) {
  return (
    <>
      {Object.entries(tree).map(([key, node]) => {
        const path = `${prefix}.${key}`;
        return isLeaf(node) ? <Leaf key={path} path={path} token={node} /> : <TokenNodes key={path} prefix={path} tree={node as TokenTree} />;
      })}
    </>
  );
}

function Section({ title, prefix, tree }: { title: string; prefix: string; tree: TokenTree }) {
  return (
    <View style={{ marginBottom: 32 }}>
      <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 12, borderBottomWidth: 1, borderBottomColor: "#eee", paddingBottom: 6 }}>
        {title}
      </Text>
      <View style={{ flexDirection: "column", gap: 10 }}>
        <TokenNodes prefix={prefix} tree={tree} />
      </View>
    </View>
  );
}

// App has no desktop/tablet context — a phone is always the "mobile"
// breakpoint, so unlike the web playground this always shows the *Mobile
// variants (see packages/tokens/semantic/typography.json) under the plain
// h0/h1/h2/... display name, not accounting's desktop default.
const MOBILE_TYPOGRAPHY_KEYS: Record<string, string> = {
  h0: "h0Mobile",
  h1: "h1Mobile",
  h2: "h2Mobile",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  h0Hl: "h0HlMobile",
  h1Hl: "h1HlMobile",
  h2Hl: "h2HlMobile",
  h3Hl: "h3Hl",
  h4Hl: "h4Hl",
  h5Hl: "h5Hl",
  h6Hl: "h6Hl",
  bodyXl: "bodyXl",
  bodyLg: "bodyLg",
  bodyMd: "bodyMd",
  bodySm: "bodySm",
  caption: "caption",
  captionSm: "captionSm",
  cardTitle2xl: "cardTitle2xlMobile",
  cardTitleXl: "cardTitleXlMobile",
  cardTitleLg: "cardTitleLgMobile",
  cardTitleMd: "cardTitleMdMobile",
  cardTitleSm: "cardTitleSmMobile",
};

function mobileTypographyTree(): TokenTree {
  const source = typographySemanticTokens.typography as unknown as Record<string, TokenLeaf>;
  const out: TokenTree = {};
  for (const [displayKey, sourceKey] of Object.entries(MOBILE_TYPOGRAPHY_KEYS)) {
    out[displayKey] = source[sourceKey];
  }
  return out;
}

function Intro() {
  return (
    <Text style={{ color: "#666", marginBottom: 8 }}>
      Values sourced from apa-statrys/accounting, shared across web-ds and app-ds — see
      packages/tokens. Typography here always uses the mobile size (no desktop/tablet context on a
      phone).
    </Text>
  );
}

const PAGES: Record<string, { title: string; render: () => React.ReactElement }> = {
  colors: {
    title: "Colors",
    render: () => (
      <>
        <Section title="Neutral" prefix="neutral" tree={neutralTokens.neutral} />
        <Section title="Beige" prefix="beige" tree={neutralTokens.beige} />
        <Section title="Brand" prefix="brand" tree={brandTokens.brand} />
        <Section title="Green (success)" prefix="green" tree={statusTokens.green} />
        <Section title="Red (error)" prefix="red" tree={statusTokens.red} />
        <Section title="Yellow (warning)" prefix="yellow" tree={statusTokens.yellow} />
        <Section title="Blue (info)" prefix="blue" tree={statusTokens.blue} />
        <Section title="Alpha — Black" prefix="alpha.black" tree={alphaBlack.alpha.black} />
        <Section title="Alpha — White" prefix="alpha.white" tree={alphaWhite.alpha.white} />
        <Section title="Alpha — Brand" prefix="alpha.brand" tree={alphaBrand.alpha.brand} />
      </>
    ),
  },
  spacing: {
    title: "Spacing",
    render: () => <Section title="Spacing" prefix="space" tree={spacingTokens.space} />,
  },
  radius: {
    title: "Radius",
    render: () => (
      <>
        <Section title="Radius" prefix="radius" tree={radiusTokens.radius} />
        <Section title="Border width" prefix="borderWidth" tree={radiusTokens.borderWidth} />
      </>
    ),
  },
  effects: {
    title: "Effects",
    render: () => (
      <>
        <Section title="Shadow" prefix="shadow" tree={effectTokens.shadow} />
        <Section title="Blur" prefix="blur" tree={{ blur: effectTokens.blur } as unknown as TokenTree} />
      </>
    ),
  },
  motion: {
    title: "Motion",
    render: () => (
      <>
        <Section title="Duration" prefix="duration" tree={motionTokens.duration} />
        <Section title="Easing" prefix="easing" tree={motionTokens.easing} />
        <Section title="Transition" prefix="transition" tree={motionTokens.transition} />
      </>
    ),
  },
  "z-index": {
    title: "Z-index",
    render: () => <Section title="Z-index" prefix="zIndex" tree={zIndexTokens.zIndex} />,
  },
  typography: {
    title: "Typography",
    render: () => (
      <>
        <Section title="Font family" prefix="font" tree={typographyTokens.font} />
        <Section title="Font weight" prefix="fontWeight" tree={typographyTokens.fontWeight} />
        <Section title="Font size" prefix="fontSize" tree={typographyTokens.fontSize} />
      </>
    ),
  },
  bg: { title: "Background", render: () => <Section title="Background" prefix="bg" tree={bgTokens.bg} /> },
  text: { title: "Text", render: () => <Section title="Text" prefix="text" tree={textTokens.text} /> },
  icon: { title: "Icon", render: () => <Section title="Icon" prefix="icon" tree={iconTokens.icon} /> },
  border: { title: "Border", render: () => <Section title="Border" prefix="border" tree={borderTokens.border} /> },
  button: { title: "Button", render: () => <Section title="Button" prefix="button" tree={buttonTokens.button} /> },
  link: { title: "Link", render: () => <Section title="Link" prefix="link" tree={linkTokens.link} /> },
  field: { title: "Field", render: () => <Section title="Field" prefix="field" tree={fieldTokens.field} /> },
  focus: { title: "Focus", render: () => <Section title="Focus" prefix="focus" tree={focusTokens.focus} /> },
  scrollbar: { title: "Scrollbar", render: () => <Section title="Scrollbar" prefix="scrollbar" tree={scrollbarTokens.scrollbar} /> },
  gradient: { title: "Gradient", render: () => <Section title="Gradient" prefix="gradient" tree={gradientTokens.gradient} /> },
  misc: { title: "Misc", render: () => <Section title="Misc" prefix="misc" tree={miscTokens.misc} /> },
  "typography-semantic": {
    title: "Typography (mobile)",
    render: () => <Section title="Typography — mobile size" prefix="typography" tree={mobileTypographyTree()} />,
  },
};

export function Foundation({ item }: { item: string }) {
  const page = PAGES[item];
  if (!page) return <Text>Unknown page: {item}</Text>;
  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: "800", marginBottom: 8 }}>{page.title}</Text>
      <Intro />
      {page.render()}
    </View>
  );
}
