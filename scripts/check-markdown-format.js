const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
let failures = 0;

function fail(file, rule, detail) {
  console.error(`FAIL [${rule}] ${file}: ${detail}`);
  failures += 1;
}

function collectMdFiles(dir, base) {
  const out = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (
      entry.name === "node_modules" ||
      entry.name === ".git" ||
      entry.name === ".next" ||
      entry.name === "dist" ||
      entry.name === "build" ||
      entry.name === "coverage"
    ) {
      continue;
    }

    const full = path.join(dir, entry.name);
    const rel = path.relative(base, full).replace(/\\/g, "/");

    if (entry.isDirectory()) {
      out.push(...collectMdFiles(full, base));
    } else if (entry.name.endsWith(".md")) {
      out.push({ rel, full });
    }
  }

  return out.sort((a, b) => a.rel.localeCompare(b.rel));
}

function lineNumberForIndex(text, index) {
  return text.slice(0, index).split("\n").length;
}

function nonEmptyLines(text) {
  return text.split(/\r?\n/).filter((line) => line.trim().length > 0);
}

function isInsideCodeFence(text, index) {
  const before = text.slice(0, index);
  const fenceMatches = before.match(/^```/gm);
  return Boolean(fenceMatches && fenceMatches.length % 2 === 1);
}

const mdFiles = collectMdFiles(ROOT, ROOT);

// ---- 1. No escaped Markdown list markers anywhere outside code fences ----
// This catches both normal broken lines and one-line compressed documents:
//   1\. item
//   \- item
//   # /start ... 1\. Inspect ... \- Do not ...
for (const { rel, full } of mdFiles) {
  const text = fs.readFileSync(full, "utf-8");
  const escapedListPattern = /(?:^|\s)(\\\d+\\\.|\\-)(?=\s)/gm;
  let match;

  while ((match = escapedListPattern.exec(text)) !== null) {
    const marker = match[1];
    const markerIndex = match.index + match[0].indexOf(marker);

    if (isInsideCodeFence(text, markerIndex)) {
      continue;
    }

    fail(
      rel,
      "escaped-list-marker",
      `line ${lineNumberForIndex(text, markerIndex)}: found escaped Markdown list marker '${marker}'`,
    );
  }
}

// ---- 2. Fenced code blocks must be paired ----
// Counts only fences that start a line, avoiding accidental inline triple-backticks.
for (const { rel, full } of mdFiles) {
  const text = fs.readFileSync(full, "utf-8");
  const matches = text.match(/^```/gm);

  if (matches && matches.length % 2 !== 0) {
    fail(rel, "fence-pair", `unclosed fenced code block (${matches.length} opening/closing markers)`);
  }
}

// ---- 3. Markdown headings must not be compressed together on one physical line ----
// Prettier cannot reliably recover a document that was serialized into one long line.
for (const { rel, full } of mdFiles) {
  const text = fs.readFileSync(full, "utf-8");
  const lines = text.split(/\r?\n/);

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];

    if (!line.trimStart().startsWith("#")) {
      continue;
    }

    const headingMatches = line.match(/(?:^|\s)#{1,6}\s+\S+/g) || [];

    if (headingMatches.length > 1) {
      fail(
        rel,
        "multiple-headings-one-line",
        `line ${i + 1}: contains ${headingMatches.length} heading markers on one line`,
      );
    }
  }
}

// ---- 4. No Markdown file should be compressed into one non-empty line ----
for (const { rel, full } of mdFiles) {
  const text = fs.readFileSync(full, "utf-8");
  const count = nonEmptyLines(text).length;

  if (count <= 1) {
    fail(rel, "single-non-empty-line", `file has only ${count} non-empty line(s)`);
  }
}

// ---- 5. Each commands/*.md first line must be exactly '# /command-name' ----
for (const { rel, full } of mdFiles) {
  if (!rel.startsWith("commands/")) {
    continue;
  }

  const text = fs.readFileSync(full, "utf-8");
  const firstLine = text.split(/\r?\n/)[0].trim();
  const fname = path.basename(rel, ".md");
  const expected = `# /${fname}`;

  if (firstLine !== expected) {
    fail(rel, "cmd-heading", `first line '${firstLine}' expected '${expected}'`);
  }
}

// ---- 6. Each commands/*.md must have enough non-empty structure ----
// Count non-empty lines, not physical split lines, so a trailing newline cannot hide compression.
for (const { rel, full } of mdFiles) {
  if (!rel.startsWith("commands/")) {
    continue;
  }

  const text = fs.readFileSync(full, "utf-8");
  const count = nonEmptyLines(text).length;

  if (count < 20) {
    fail(rel, "cmd-short", `only ${count} non-empty line(s), minimum 20`);
  }
}

// ---- 7. Commands should contain multiple section headings ----
// This is still a format/structure check, not a content-policy check.
for (const { rel, full } of mdFiles) {
  if (!rel.startsWith("commands/")) {
    continue;
  }

  const text = fs.readFileSync(full, "utf-8");
  const headingCount = (text.match(/^#{1,6}\s+\S+/gm) || []).length;

  if (headingCount < 3) {
    fail(rel, "cmd-few-headings", `only ${headingCount} heading(s), expected at least 3`);
  }
}

if (failures > 0) {
  console.error(`\n${failures} Markdown format check(s) failed.`);
  process.exit(1);
}

console.log(`All Markdown format checks passed (${mdFiles.length} file(s)).`);
