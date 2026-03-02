#!/usr/bin/env node

// >> $ ./index.js ./example/ --include "**/example/*.js"
// >> $ ./index.js ./example/ --base "./example/" --include "**/*.txt"

// >> $ ./index.js . --include "**/*.js" > ./index.html
// >> $ ./index.js . --include "**/*.json" > ./index.html
// >> $ ./index.js . --include "**/*.js" --ignore "**/node_modules/**" > ./index.html

import { argv, path, glob } from "zx";

const parseBool = (val, defaultVal) => {
	if (val === undefined || val === null) return defaultVal;
	if (typeof val === "boolean") return val;
	if (val === "true") return true;
	if (val === "false") return false;
	return !!val;
};

const target = argv._[0] || ".";
const base = argv.base || "./";
const includePattern = argv.include || "**/*";
const ignorePattern = argv.ignore ? [argv.ignore] : [];
const dot = parseBool(argv?.dot, false);

const files = await glob(includePattern, {
	cwd: target,
	nodir: true,
	dot: dot,
	ignore: ignorePattern,
});
if (files.length === 0) {
	process.exit(1);
}

files.sort();

const listItems = files
	.map((filePath) => {
		const relativePath = filePath.split(path.sep).join(path.posix.sep);

		const cleanBase = base.split(path.sep).join(path.posix.sep);

		let linkPath = path.posix.join(cleanBase, relativePath);
		if (base.startsWith("./") && !linkPath.startsWith("./")) {
			linkPath = "./" + linkPath;
		}

		return `
<li>
	<a href="${encodeURI(linkPath)}">${linkPath}</a>
</li>
		`;
	})
	.join("");

const finalHtml = `
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Index of ${target}</title>
		<style>
			body { font-family: monospace; }
			ul { list-style-type: none; padding: 0; margin: 0; }
		</style>
	</head>
	<body>
		<h1>Index of ${target}</h1>
		<ul>
			${listItems}
		</ul>
	</body>
</html>
`;

console.log(finalHtml);
