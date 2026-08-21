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
//
// Same problem, same fix, for lucide-react-native: IconProvider (in
// packages/app-ds/src/icon) and this app's own Components.tsx both import
// it, but from two different physical locations — without forcing a single
// resolution, they'd get two separate module instances with two separate
// React Contexts, so the Provider's strokeWidth override silently wouldn't
// reach icons rendered from the other copy (confirmed: every icon rendered
// at strokeWidth=2, Lucide's own default, until this was added).
const SINGLETONS = ["react", "react-dom", "react-native", "scheduler", "lucide-react-native", "react-native-svg"];
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
