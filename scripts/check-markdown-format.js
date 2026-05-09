const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
let failures = 0;

function fail(file, rule, detail) {
  console.error(`FAIL [${rule}] ${file}: ${detail}`);
  failures++;
}

// Collect all .md files, excluding node_modules and .git
function collectMdFiles(dir, base) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git") continue;
    const full = path.join(dir, entry.name);
    const rel = path.relative(base, full);
    if (entry.isDirectory()) {
      out.push(...collectMdFiles(full, base));
    } else if (entry.name.endsWith(".md")) {
      out.push({ rel, full });
    }
  }
  return out;
}

const mdFiles = collectMdFiles(ROOT, ROOT);

// ---- 1. No escaped list markers ----
for (const { rel, full } of mdFiles) {
  const text = fs.readFileSync(full, "utf-8");
  const lines = text.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^\\\d+\\\./.test(line)) {
      fail(rel, "escaped-list", `line ${i + 1}: escaped numbered list '${line.trim()}'`);
    }
    if (/^\\\- /.test(line)) {
      fail(rel, "escaped-list", `line ${i + 1}: escaped unordered list '${line.trim()}'`);
    }
  }
}

// ---- 2. Fenced code blocks must be paired ----
for (const { rel, full } of mdFiles) {
  const text = fs.readFileSync(full, "utf-8");
  const matches = text.match(/```/g);
  if (matches && matches.length % 2 !== 0) {
    fail(rel, "fence-pair", `unclosed fenced code block (${matches.length} markers)`);
  }
}

// ---- 3. ATX headings must be on their own line ----
for (const { rel, full } of mdFiles) {
  const text = fs.readFileSync(full, "utf-8");
  const lines = text.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Match lines that start with # heading followed by non-heading content
    // Allow: "# Heading" alone, or "# Heading <!-- comment -->"
    const m = line.match(/^(#{1,6}\s+[^#\s].*)$/);
    if (m) {
      const after = m[1];
      // Split on heading pattern: look for text after the heading that starts another heading
      // e.g. "# /fix Use this command" is bad — the heading spills into description
      // Check if line starts a heading but also contains a second heading-like pattern
      const headingCount = (after.match(/#{1,6}\s+\S+/g) || []).length;
      if (headingCount >= 2) {
        fail(rel, "heading-own-line", `line ${i + 1}: multiple headings on one line '${line.trim()}'`);
      }
    }
  }
}

// ---- 4. No .md file compressed to a single line ----
// A healthy .md file has multiple lines. Single-line .md files are likely corrupted.
for (const { rel, full } of mdFiles) {
  const text = fs.readFileSync(full, "utf-8");
  const lines = text.split("\n");
  if (lines.length <= 1) {
    fail(rel, "single-line", `file is compressed to ${lines.length} line(s)`);
  }
}

// ---- 5. Each commands/*.md first line must be '# /command-name' ----
for (const { rel, full } of mdFiles) {
  if (!rel.startsWith("commands/")) continue;
  const text = fs.readFileSync(full, "utf-8");
  const firstLine = text.split("\n")[0].trim();
  const fname = path.basename(rel, ".md");
  const expected = `# /${fname}`;
  if (firstLine !== expected) {
    fail(rel, "cmd-heading", `first line '${firstLine}' expected '${expected}'`);
  }
}

// ---- 6. Each commands/*.md must have at least 20 lines ----
for (const { rel, full } of mdFiles) {
  if (!rel.startsWith("commands/")) continue;
  const text = fs.readFileSync(full, "utf-8");
  const count = text.split("\n").length;
  if (count < 20) {
    fail(rel, "cmd-short", `only ${count} lines (minimum 20)`);
  }
}

// ---- Result ----
if (failures > 0) {
  console.error(`\n${failures} check(s) failed.`);
  process.exit(1);
} else {
  console.log("All Markdown format checks passed.");
}
