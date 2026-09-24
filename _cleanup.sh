#!/usr/bin/env bash
set -euo pipefail
cd '/mnt/d/My Company site'
rm -f push-fix.sh .git-commit-push.sh
git add -A
git status --short
git commit --trailer "Co-authored-by: Cursor <cursoragent@cursor.com>" -m 'Remove accidental local push helper scripts from repo.'
git push origin HEAD