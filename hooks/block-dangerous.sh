#!/bin/bash
# PreToolUse hook: intercept high-risk bash commands
# exit 2 = block execution; exit 0 = allow

COMMAND="$1"

DANGEROUS_PATTERNS=(
  "rm -rf /"
  "rm -rf ~"
  "git push --force"
  "git push -f"
  "DROP TABLE"
  "DROP DATABASE"
  "format c:"
  "mkfs"
  "> /dev/sda"
)

for pattern in "${DANGEROUS_PATTERNS[@]}"; do
  if echo "$COMMAND" | grep -qi "$pattern"; then
    echo "🚫 Dangerous command blocked: $pattern" >&2
    echo "To run this manually, execute it directly in your terminal." >&2
    exit 2
  fi
done

exit 0
