#!/bin/bash
# PreToolUse hook: protect sensitive files from being directly modified by AI
# Triggered on: Write | Edit | MultiEdit
# exit 2 = block; exit 0 = allow

FILE_PATH="$1"

SENSITIVE_PATTERNS=(
  "\.env"
  "\.env\."
  "\.git/"
  "package-lock\.json"
  "yarn\.lock"
  "pnpm-lock\.yaml"
  "Cargo\.lock"
)

for pattern in "${SENSITIVE_PATTERNS[@]}"; do
  if echo "$FILE_PATH" | grep -qE "$pattern"; then
    echo "🔒 Sensitive file protected: $FILE_PATH" >&2
    echo "Please edit this file manually, or explicitly tell me you need to modify it." >&2
    exit 2
  fi
done

exit 0
