#!/usr/bin/env bash
set -euo pipefail
cd '/mnt/d/My Company site'
rm -f _cleanup.sh
printf '\n# local helper scripts\npush-fix.sh\n.git-commit-push.sh\n_cleanup.sh\n' >> .gitignore
git add -A
git commit --trailer "Co-authored-by: Cursor <cursoragent@cursor.com>" -m 'Ignore local helper scripts and drop leftover cleanup file.'
git push origin HEAD