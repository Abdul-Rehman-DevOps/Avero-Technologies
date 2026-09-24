#!/usr/bin/env bash
set -euo pipefail
cd "/mnt/d/My Company site"
rm -f .git-commit-push.sh
git add src/app/globals.css
git commit -m "Fix CSS build: replace invalid bg-paper/95 @apply."
git push origin HEAD
git status
