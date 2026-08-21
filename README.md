# Statrys Design System — App (`statrys-design-app`)

Mobile-app half of the Statrys Design System, split by platform out of the
`statrys-design` monorepo. History for the paths below was preserved across
the split.

```
Foundation          →  @statrys/tokens (separate repo: statrys-tokens)
Core DS (App)       →  @statrys/app-ds     (React Native)
```

## Packages

| Package | Consumes | Platform |
|---|---|---|
| `@statrys/tokens` | — | color, spacing, radius, typography — lives in [statrys-tokens](https://github.com/Pailin26/statrys-tokens), installed as a git dependency |
| `@statrys/app-ds` | tokens | React Native — same component set as `web-ds`, native implementation |

## Local dev

```bash
npm install
npm run dev
```

`npm install` triggers `@statrys/tokens`' own `prepare` script (it's a git
dependency), which builds its `dist/`.

`apps/app-playground` is a dev-only Expo app for browsing Foundation tokens
and `app-ds` components on a simulator/device/web — not published, not a
product prototype (see `docs/contributing.md` for that boundary).

**`apps/app-playground` is *not* part of the root npm workspaces** and has
its own `package-lock.json`, installed standalone (`npm install` from inside
that folder) — `app-ds` needs React 19 (Expo SDK 57 / React Native), which
would otherwise fight the root workspace's dependency hoisting. Its
`metro.config.js` aliases `@statrys/app-ds` to source and forces
`react`/`react-native` to resolve from its own `node_modules`; it also
depends on `@statrys/tokens` directly (as a git dependency, same as
`app-ds`) since its Foundation page imports token JSON straight from the
package.

```bash
cd apps/app-playground && npm install
npm run web    # or ios / android
```

## Docs

- `docs/contributing.md` — component/token conventions (the component-level-token
  rule, headless component pattern, playground vs. product-prototype boundary)
- `docs/versioning.md` — semver policy
- `docs/figma-sync.md` — working notes for the Figma Dev Mode MCP server
