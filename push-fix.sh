#!/usr/bin/env bash
set -euo pipefail
cd '/mnt/d/My Company site'
git add -A
git commit --trailer "Co-authored-by: Cursor <cursoragent@cursor.com>" -m 'Improve hero readability and homepage UI/UX composition.' -m 'Add a hero content plate, stronger veil, and bento services layout based on the redesign script. Verified with typecheck, tests, and production build.'
git push origin HEAD