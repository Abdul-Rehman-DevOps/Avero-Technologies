#!/usr/bin/env bash
set -euo pipefail
cd "/mnt/d/My Company site"
# Prefer WSL node if present
if ! command -v node >/dev/null 2>&1; then
  export PATH="/mnt/c/Program Files/nodejs:$PATH"
fi
npm run typecheck
npm test
