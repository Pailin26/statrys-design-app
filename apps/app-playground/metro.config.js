const { getDefaultConfig } = require("expo/metro-config");
const path = require("node:path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// Let Metro see the rest of the npm workspace (packages/*) and resolve
// hoisted deps from the workspace root, same shape as most monorepo setups.
config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

// Metro's default assetExts only covers ttf/otf, not woff2 — but
// packages/tokens/fonts/*.woff2 (GT Walsheim LC) is all we have, since
// accounting only ships a web build of this font. On the web target this is
// fine (woff2 becomes a real @font-face src, same as the browser everywhere
// else); on true native (iOS/Android) it'll still fail to render since RN
// itself has no woff2 decoder — a genuine ttf/otf would be needed there.
config.resolver.assetExts = [...config.resolver.assetExts, "woff2", "woff"];

// @statrys/app-ds has no build step yet (see docs/contributing.md), so its
// package.json "main" points at a dist/ that doesn't exist — redirect the
// bare specifier straight to source until packages/app-ds gets a real build.
const appDsEntry = path.resolve(workspaceRoot, "packages/app-ds/src/index.ts");

// packages/app-ds/src physically lives outside this project (under the
// workspace root), so Metro's default resolution would otherwise look up
// "react"/"react-native" relative to *that* location and find the web
// playgrounds' separate React 18 copy at the workspace root — causing a
// "multiple copies of React" crash. Force these to always resolve from this
// project's own node_modules, regardless of which file is importing them.
const SINGLETONS = ["react", "react-dom", "react-native", "scheduler"];
function isSingleton(moduleName) {
  return SINGLETONS.some((name) => moduleName === name || moduleName.startsWith(`${name}/`));
}

const defaultResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "@statrys/app-ds") {
    return context.resolveRequest(context, appDsEntry, platform);
  }
  if (isSingleton(moduleName)) {
    return {
      type: "sourceFile",
      filePath: require.resolve(moduleName, { paths: [projectRoot] }),
    };
  }
  return defaultResolveRequest
    ? defaultResolveRequest(context, moduleName, platform)
    : context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
