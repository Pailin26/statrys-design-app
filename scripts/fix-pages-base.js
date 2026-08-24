// Expo's static web export (unlike Vite) has no base-path flag — it always
// emits root-absolute URLs ("/favicon.ico", "/_expo/...", "/assets/...").
// That breaks when served from a GitHub Pages project subpath
// (https://<user>.github.io/statrys-design-app/). Rewrite those three
// absolute-path prefixes in every emitted file to carry the subpath prefix.
const fs = require("node:fs");
const path = require("node:path");

const distDir = process.argv[2];
const base = process.argv[3];

if (!distDir || !base) {
  console.error("Usage: node fix-pages-base.js <dist-dir> </base-path/>");
  process.exit(1);
}

const PREFIXES = ["/assets/", "/_expo/", "/favicon.ico"];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(html|js)$/.test(entry.name)) rewrite(full);
  }
}

function rewrite(file) {
  let text = fs.readFileSync(file, "utf8");
  let changed = false;
  for (const prefix of PREFIXES) {
    const from = `"${prefix}`;
    const to = `"${base}${prefix.slice(1)}`;
    if (text.includes(from)) {
      text = text.split(from).join(to);
      changed = true;
    }
  }
  if (changed) fs.writeFileSync(file, text);
}

walk(distDir);
console.log(`Rewrote absolute paths in ${distDir} to use base ${base}`);
