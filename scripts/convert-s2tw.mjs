/**
 * Bulk OpenCC conversion: Simplified Chinese → Traditional (Taiwan standard).
 * Excludes vendor bundles and pinyin-pro source (internal maps expect original forms).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import OpenCC from "opencc-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const converter = OpenCC.Converter({ from: "cn", to: "tw" });

const SKIP_BASENAMES = new Set([
	"vue.esm-browser.js",
	"core-js-bundle.js",
	"codemirror.js",
	"compiler-sfc.esm-browser.js",
]);

const SKIP_REL = new Set(["noname/get/pinyins/index.js"]);

const EXT = new Set([".js", ".vue", ".css", ".html"]);

function shouldSkipFile(relPosix) {
	if (SKIP_REL.has(relPosix)) return true;
	const base = path.posix.basename(relPosix);
	if (SKIP_BASENAMES.has(base)) return true;
	return false;
}

function walk(dir, acc) {
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	for (const ent of entries) {
		if (ent.name === "node_modules" || ent.name === ".git") continue;
		const full = path.join(dir, ent.name);
		const rel = path.relative(root, full).split(path.sep).join("/");
		if (ent.isDirectory()) walk(full, acc);
		else if (EXT.has(path.extname(ent.name)) && !shouldSkipFile(rel)) acc.push(full);
	}
}

const roots = ["noname", "game", "character", "card", "mode", "layout", "theme", "extension"];
const files = [];
for (const r of roots) {
	const p = path.join(root, r);
	if (fs.existsSync(p)) walk(p, files);
}
for (const f of ["noname-compatible.js", "noname-server.js", "index.html"]) {
	const full = path.join(root, f);
	if (fs.existsSync(full)) files.push(full);
}

let changed = 0;
for (const full of files) {
	const before = fs.readFileSync(full, "utf8");
	const after = converter(before);
	if (after !== before) {
		fs.writeFileSync(full, after, "utf8");
		changed++;
		console.log("updated", path.relative(root, full).split(path.sep).join("/"));
	}
}
console.log(`Done. ${changed} file(s) modified, ${files.length} scanned.`);
